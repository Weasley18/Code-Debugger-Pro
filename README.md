# AI Code Debugger

An interactive web application that debugs code using Groq's AI models (Llama 4 and Deepseek R1).

## Features

- Debug code in multiple programming languages (Python, JavaScript, Java, C++)
- Choose between Llama 4 and Deepseek R1 models
- Get detailed explanations of errors
- Learn how to fix issues with step-by-step guidance
- Beautiful and responsive UI with syntax highlighting

## Installation

1. Clone this repository
2. Install the dependencies:

```bash
pip install -r requirements.txt
```

3. Set up your environment variables:

```bash
export GROQ_API_KEY="your_groq_api_key_here"
```

## Usage

1. Start the application:

```bash
python app.py
```

2. Open your web browser and navigate to `http://127.0.0.1:5000`

3. Paste your code into the editor

4. Select the desired AI model (Llama 4 or Deepseek R1)

5. Choose the programming language

6. Click "Debug Code" to get AI-powered debugging insights

## Technologies Used

- **Backend**: Flask (Python)
- **Frontend**: HTML, CSS, JavaScript
- **Code Editor**: CodeMirror
- **AI Models**: Groq API (Llama 4, Deepseek R1)
- **Markdown Rendering**: Marked.js

## License

This project is open source and available under the MIT License.
