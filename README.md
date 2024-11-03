# Fine-Tuning Boilerplate

A boilerplate for fine-tuning OpenAI models using Node.js.

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v18 or higher)
- **npm**
- **OpenAI API Key** (sign up at [OpenAI](https://www.openai.com/) to obtain your API key)

## Setup

Follow these steps to set up the project:

1. **Clone the repository:**

   ```bash
   git clone https://github.com/myasirb/fine-tuning-boilerplate.git
   cd fine-tuning-boilerplate
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Create a `.env` file in the root directory and add your OpenAI API key:**

   ```plaintext
   OPENAI_API_KEY=your_openai_api_key
   OPENAI_MODEL='gpt-4o-mini-2024-07-18'
   ```

   Replace `your_openai_api_key` with your actual API key.

## Dataset

Place your training and validation datasets in the `DataSet` directory. The datasets should be in JSONL format:

- **`DataSet/training.jsonl`**: Training dataset.
- **`DataSet/validation.jsonl`**: Validation dataset.

### JSONL Format

Each line in the JSONL files should be a valid JSON object. Ensure that your data follows the required structure for fine-tuning.

## Usage

### Run the Project

To start the application, run the following command:

```bash
npm start
```

## Project Structure

Here's a brief overview of the project files:

- **`index.js`**: Entry point of the application.
- **`OpenAI_Helper/OpenAIClient.js`**: Helper functions to interact with the OpenAI API.
- **`Example_FineTuning.js`**: Example script to fine-tune the OpenAI model.
- **`Example_ModelUsage.js`**: Example script to use the fine-tuned OpenAI model.
- **`DataSet/training.jsonl`**: Placeholder for your training dataset.
- **`DataSet/validation.jsonl`**: Placeholder for your validation dataset.

## Contributing

Contributions are welcome! If you have suggestions or improvements, feel free to open an issue or submit a pull request.
