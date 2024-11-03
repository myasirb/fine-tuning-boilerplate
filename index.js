// Import the dotenv package
import dotenv from "dotenv";

import ExampleFineTuning from "./Example_FineTuning.js";
import ExampleModelUsage from "./Example_ModelUsage.js";

// Load the environment variables from .env file
dotenv.config();

// Call the ExampleFineTuning method with exception handling
// Uncomment to use this method
/*
try {
  const trainingFilePath = "";
  const validationFilePath = "";
  const query = "";

  const response = await ExampleFineTuning(
    trainingFilePath,
    validationFilePath,
    query
  );

  console.log(response);
} catch (error) {
  console.error("An error occurred while calling ExampleFineTuning:", error);
}
*/

// Call the ExampleFineTuning method with exception handling
try {
  const query = "What color is the sky?";

  const response = await ExampleModelUsage(query);

  console.log(response);
} catch (error) {
  console.error("An error occurred while calling ExampleFineTuning:", error);
}
