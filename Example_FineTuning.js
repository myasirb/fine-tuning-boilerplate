import OpenAIClient from "./OpenAI_Helper/OpenAIClient.js";

/**
 * ExampleFineTuning function to initiate fine-tuning of a model with provided training and validation file paths,
 * and then query the trained model.
 *
 * @param {string} traingFilePath - The file path to the training data.
 * @param {string} validationFilePath - The file path to the validation data.
 * @param {string} query - The query to test the model.
 * @returns {Promise<any>} - The response from the model.
 * @throws {Error} - Throws an error if training file path, validation file path, or query is not provided,
 *                   or if an error occurs during the fine-tuning process.
 */
const ExampleFineTuning = async (traingFilePath, validationFilePath, query) => {
  // Ensure that you replace 'OPENAI_API_KEY' with your actual OpenAI API key in .env file and file paths below.
  const client = new OpenAIClient();

  // Check if training file path and validation file path are provided
  if (!traingFilePath || !validationFilePath) {
    throw new Error(
      "Training file path and validation file path must be provided."
    );
  }

  // Check if query is provided
  if (!query) {
    throw new Error("A query to test the model must be provided.");
  }

  try {
    // Initiate fine-tuning with the provided file paths and get the trained model ID
    const trainedModelId = await client.initiateFineTuning(
      traingFilePath,
      validationFilePath
    );

    // If a trained model ID is returned, use it to ask the model with the provided query
    if (trainedModelId) {
      const response = await client.askModel(query, trainedModelId);
      return response; // Return the response from the model
    }
  } catch (error) {
    // Throw any errors that occur during the process
    throw error;
  }
};

export default ExampleFineTuning;
