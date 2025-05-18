# Code Debugger Pro

An advanced AI-powered code analysis and debugging tool that helps developers identify and fix issues in their code.

## Features

- **AI-Powered Analysis**: Leverages Groq's advanced AI models to analyze code and provide detailed debugging information
- **Multi-Language Support**: Supports Python, JavaScript, Java, and C++
- **Comprehensive Analysis**: Provides detailed breakdown of errors, solutions, and fixed code
- **Modern UI**: Clean and professional interface for code input and analysis results
- **Code Examples**: Built-in examples for each supported language to demonstrate the tool

## Technology Stack

- **Backend**: Flask (Python)
- **Frontend**: HTML, CSS, JavaScript
- **Code Editing**: CodeMirror
- **AI Models**: Powered by Groq API (Llama 3 and Mistral Large)
- **Syntax Highlighting**: highlight.js

## Getting Started

### Prerequisites

- Python 3.8+
- pip
- Groq API key

### Installation

1. Clone this repository
   ```
   git clone https://github.com/yourusername/code-debugger.git
   cd code-debugger
   ```

2. Create and activate a virtual environment
   ```
   python -m venv .venv
   source .venv/bin/activate  # On Windows: .venv\Scripts\activate
   ```

3. Install dependencies
   ```
   pip install -r requirements.txt
   ```

4. Create a `.env` file in the project root and add your Groq API key
   ```
   GROQ_API_KEY=your_groq_api_key_here
   ```

5. Run the application
   ```
   python app.py
   ```

6. Access the application at `http://localhost:5000`

## Usage

1. Select the AI model and programming language from the dropdown menus
2. Enter or paste your code in the editor
3. Click "Analyze and Debug Code"
4. View the detailed analysis, including:
   - Summary of issues
   - Detailed breakdown of each error
   - Solutions for each error
   - Fixed code
   - Learning points

## License

MIT License

## Acknowledgments

- Groq API for providing the AI models
- CodeMirror for the code editor
- highlight.js for syntax highlighting
