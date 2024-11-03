import OpenAI from "openai";
import fs from "fs";

/**
 * OpenAIClient - A wrapper class for interacting with OpenAI API.
 * Provides methods to upload training data, create fine-tuning jobs, monitor jobs, and test fine-tuned models.
 */
export default class OpenAIClient {
  /**
   * Initializes the OpenAI client.
   * @param {string} apiKey - Your OpenAI API key. By Default it will pick from the env variable.
   * @param {string} model - The model to fine-tune. By Default it will pick from the env variable. If not available then it will set to (default: 'gpt-4o-mini-2024-07-18').
   */
  constructor(
    apiKey = process.env.OPENAI_API_KEY,
    model = process.env.OPENAI_MODEL
  ) {
    this.openai = new OpenAI({
      apiKey: apiKey,
    });

    this.model = model;
  }

  /**
   * Tests the fine-tuned model with a sample input and retrieves the response.
   * @param {string} modelId - The ID of the fine-tuned model.
   * @param {string} query - The input text to ask from the model.
   * @param {number} temperature - The temperature to pass with querying model.
   * @returns {Promise<string>} - Returns the model's response.
   */
  async askModel(query, modelId = this.model, temperature = 0) {
    try {
      const completion = await this.openai.chat.completions.create({
        model: modelId,
        messages: [
          {
            role: "user",
            content: query,
          },
        ],
        temperature: temperature,
      });

      return completion.choices[0].message.content;
    } catch (error) {
      console.error("Error testing the fine-tuned model:", error);
      throw error;
    }
  }

  /**
   * Starts the fine-tuning process by uploading files, creating a job, and monitoring it until completion.
   * @param {string} trainingFilePath - Path to the training file.
   * @param {string} validationFilePath - Path to the validation file.
   * @returns {Promise<string|null>} - Returns the fine-tuned model ID on success, or null on failure.
   */
  async initiateFineTuning(trainingFilePath, validationFilePath) {
    try {
      const trainingFileId = await this.uploadFile(trainingFilePath);
      console.log(
        `Training File Uploaded Successfully With Id : ${trainingFileId}`
      );

      const validationFileId = await this.uploadFile(validationFilePath);
      console.log(
        `Validation File Uploaded Successfully With Id : ${validationFileId}`
      );

      const jobId = await this.createFineTuningJob(
        trainingFileId,
        validationFileId
      );
      console.log(`Fine-tuning job created successfully. Job ID: ${jobId}`);

      const job = await this.monitorJob(jobId);

      if (job.status === "succeeded") {
        console.log(`Fine-tuning succeeded. Model ID: ${job.fine_tuned_model}`);
        return job.fine_tuned_model;
      } else {
        console.log("Fine-tuning failed.");
        return null;
      }
    } catch (error) {
      console.error(
        "An error occurred while starting the fine-tuning job:",
        error
      );
    }
  }

  /**
   * Uploads a file for fine-tuning to OpenAI.
   * @param {string} filePath - Path to the local file to be uploaded.
   * @returns {Promise<string>} - Returns the file ID for use in fine-tuning.
   */
  async uploadFile(filePath) {
    try {
      const file = fs.createReadStream(filePath);
      const response = await this.openai.files.create({
        file: file,
        purpose: "fine-tune",
      });
      return response.id;
    } catch (error) {
      console.error(`Error uploading file ${filePath}:`, error);
      throw error;
    }
  }

  /**
   * Creates a fine-tuning job with specified training and validation files.
   * @param {string} trainingFileId - The ID of the training file.
   * @param {string} validationFileId - The ID of the validation file.
   * @returns {Promise<string>} - Returns the job ID for tracking fine-tuning progress.
   */
  async createFineTuningJob(trainingFileId, validationFileId) {
    try {
      const response = await this.openai.fineTuning.jobs.create({
        training_file: trainingFileId,
        validation_file: validationFileId,
        model: this.model,
      });
      return response.id;
    } catch (error) {
      console.error("Error creating fine-tuning job:", error);
      throw error;
    }
  }

  /**
   * Monitors the status of a fine-tuning job by polling until completion.
   * @param {string} jobId - The ID of the fine-tuning job to monitor.
   * @returns {Promise<object>} - Returns the final job object with status information.
   */
  async monitorJob(jobId) {
    try {
      while (true) {
        const job = await this.openai.fineTuning.jobs.retrieve(jobId);
        console.log(`Status: ${job.status}`);

        // Check if the job has completed
        if (job.status === "succeeded" || job.status === "failed") {
          return job;
        }

        // List the latest events for the job
        const events = await this.openai.fineTuning.jobs.listEvents(jobId, {
          limit: 5,
        });

        // Print the latest events in reverse order
        events.data.reverse().forEach((event) => {
          console.log(`Event: ${event.message}`);
        });

        await this.sleep(30000); // Wait for 30 seconds
      }
    } catch (error) {
      console.error(
        "An error occurred while monitoring the fine-tuning job:",
        error
      );
      throw error;
    }
  }

  /**
   * Pauses execution for a specified time.
   * @param {number} ms - The number of milliseconds to sleep.
   * @returns {Promise<void>}
   */
  sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
}
