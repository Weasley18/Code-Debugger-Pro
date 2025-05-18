from flask import Flask, render_template, request, jsonify
import os
import json
import requests
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

app = Flask(__name__)

# Initialize API configuration from environment variables
GROQ_API_KEY = os.getenv("GROQ_API_KEY")
GROQ_API_URL = "https://api.groq.com/openai/v1/chat/completions"

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/debug', methods=['POST'])
def debug_code():
    data = request.json
    code = data.get('code')
    model = data.get('model', 'llama4')  # Default to llama4
    
    # Validate inputs
    if not code:
        return jsonify({"error": "No code provided"}), 400
    
    if model not in ["llama4", "deepseek-r1"]:
        return jsonify({"error": "Invalid model selection"}), 400
    
    # Map model names to their Groq identifiers
    model_map = {
        "llama4": "llama3-70b-8192",
        "deepseek-r1": "mistral-large-latest"
    }
    
    selected_model = model_map[model]
    
    # Create prompt for debugging
    prompt = f"""Please debug the following code and provide a detailed explanation of what's wrong. 
    Also provide guidance on how to fix the issues:
    
    ```
    {code}
    ```
    
    Please provide your analysis in the following format:
    1. Summary of issues
    2. Detailed breakdown of each error
    3. Solution for each error
    4. Fixed code
    5. Learning points
    """
    
    try:
        # Call the Groq API directly using requests
        headers = {
            "Authorization": f"Bearer {GROQ_API_KEY}",
            "Content-Type": "application/json"
        }
        
        payload = {
            "model": selected_model,
            "messages": [
                {"role": "system", "content": "You are an expert code debugger and programming instructor. Your task is to find bugs in code, explain what's wrong, and teach the user how to fix them."},
                {"role": "user", "content": prompt}
            ],
            "temperature": 0.3,
            "max_tokens": 4000
        }
        
        # Print request details for debugging (remove in production)
        print(f"Using model: {selected_model}")
        print(f"API URL: {GROQ_API_URL}")
        print(f"API Key (first few chars): {GROQ_API_KEY[:8]}...")
        
        response = requests.post(GROQ_API_URL, headers=headers, json=payload)
        
        # Check for HTTP errors
        if response.status_code != 200:
            error_detail = response.json() if response.text else "No error details provided"
            print(f"API Error: Status {response.status_code}, Details: {error_detail}")
            return jsonify({"error": f"API Error ({response.status_code}): {error_detail}"}), response.status_code
        
        # Parse the response JSON
        response_data = response.json()
        
        # Extract the assistant's response
        debug_result = response_data['choices'][0]['message']['content']
        
        return jsonify({
            "result": debug_result,
            "model": model
        })
        
    except Exception as e:
        print(f"Exception during API call: {str(e)}")
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
