import OpenAIClient from "./OpenAI_Helper/OpenAIClient.js";

/**
 * ExampleModelUsage function to query a model,
 * and then query the trained model.
 *
 * @param {string} query - The query to test the model.
 * @returns {Promise<any>} - The response from the model.
 * @throws {Error} - Throws an error if training file path, validation file path, or query is not provided,
 *                   or if an error occurs during the fine-tuning process.
 */
const ExampleModelUsage = async (query) => {
  // Ensure that you replace 'OPENAI_API_KEY' with your actual OpenAI API key in .env file and file paths below.
  const client = new OpenAIClient();

  // Check if query is provided
  if (!query) {
    throw new Error("A query to test the model must be provided.");
  }

  try {
    const response = await client.askModel(query);
    return response; // Return the response from the model
  } catch (error) {
    // Throw any errors that occur during the process
    throw error;
  }
};

export default ExampleModelUsage;
