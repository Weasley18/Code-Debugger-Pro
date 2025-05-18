document.addEventListener('DOMContentLoaded', function() {
    // Initialize CodeMirror
    const codeEditor = CodeMirror.fromTextArea(document.getElementById('code-input'), {
        mode: 'python',
        theme: 'monokai',
        lineNumbers: true,
        indentUnit: 4,
        lineWrapping: true,
        autofocus: true
    });
    
    // Handle language selection
    const languageSelect = document.getElementById('language-select');
    languageSelect.addEventListener('change', function() {
        const mode = this.value === 'python' ? 'python' : 
                    this.value === 'javascript' ? 'javascript' : 
                    this.value === 'java' ? 'text/x-java' : 
                    this.value === 'cpp' ? 'text/x-c++src' : 'python';
        codeEditor.setOption('mode', mode);
    });
    
    // Debug button click event
    const debugButton = document.getElementById('debug-btn');
    const loadingIndicator = document.getElementById('loading');
    const resultsContainer = document.getElementById('results');
    
    debugButton.addEventListener('click', async function() {
        // Get the code and selected model
        const code = codeEditor.getValue();
        const model = document.getElementById('model-select').value;
        
        if (!code.trim()) {
            showError('Please enter some code to debug.');
            return;
        }
        
        // Show loading indicator
        loadingIndicator.classList.remove('hidden');
        resultsContainer.innerHTML = '';
        debugButton.disabled = true;
        debugButton.innerHTML = '<i class="fas fa-circle-notch fa-spin"></i> Analyzing...';
        
        try {
            // Send the code to the server for debugging
            const response = await fetch('/debug', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    code: code,
                    model: model
                })
            });
            
            // Parse the response
            const data = await response.json();
            
            if (data.error) {
                throw new Error(data.error);
            }
            
            // Process markdown content
            let htmlResult = marked.parse(data.result);
            
            // Display the results
            resultsContainer.innerHTML = `
                <div class="model-info">
                    <i class="fas fa-robot" style="margin-right: 8px; color: var(--primary-color);"></i>
                    <strong>Model:</strong> ${getModelDisplayName(data.model)}
                </div>
                <div class="debug-result">
                    ${htmlResult}
                </div>
            `;
            
            // Apply syntax highlighting to code blocks
            document.querySelectorAll('.markdown-content pre code').forEach((block) => {
                hljs.highlightElement(block);
            });
            
            // Scroll to top of results
            resultsContainer.scrollTop = 0;
            
        } catch (error) {
            showError(error.message);
        } finally {
            // Hide loading indicator
            loadingIndicator.classList.add('hidden');
            debugButton.disabled = false;
            debugButton.innerHTML = '<i class="fas fa-magnifying-glass"></i> Analyze and Debug Code';
        }
    });
    
    // Helper function to display error messages
    function showError(message) {
        resultsContainer.innerHTML = `
            <div class="error-message">
                <i class="fas fa-exclamation-circle"></i>
                <div>
                    <h3>Error Occurred</h3>
                    <p>${message}</p>
                </div>
            </div>
        `;
    }
    
    // Helper function to get human-readable model names
    function getModelDisplayName(modelKey) {
        const modelNames = {
            'llama4': 'Llama 3 (70B)',
            'deepseek-r1': 'Mistral Large'
        };
        return modelNames[modelKey] || modelKey;
    }
    
    // Sample code examples
    const sampleCode = {
        'python': `def calculate_average(numbers):
    total = 0
    for number in numbers:
        total += number
    return total / len(numbers)

# Test the function
test_numbers = [1, 2, 3, 4, 5, "6"]
result = calculate_average(test_numbers)
print(f"The average is: {result}")`,
        'javascript': `function calculateSum(numbers) {
    let sum = 0;
    for (let i = 0; i < numbers.length; i++) {
        sum += numbers[i];
    }
    return sum;
}

// Test the function
const testNumbers = [1, 2, 3, 4, "5"];
const result = calculateSum(testNumbers);
console.log("The sum is: " + results);`,
        'java': `public class Main {
    public static int findMax(int[] numbers) {
        int max = numbers[0];
        for (int i = 0; i < numbers.length; i++) {
            if (numbers[i] > max) {
                max = numbers[i];
            }
        }
        return max;
    }
    
    public static void main(String[] args) {
        int[] testArray = {5, 12, 9, 8, 16, 2};
        System.out.println("Max value: " + findMax(testArray));
    }
}`,
        'cpp': `#include <iostream>
#include <vector>
using namespace std;

int factorial(int n) {
    if (n < 0) {
        return -1; // Error
    }
    int result = 1;
    for (int i = 1; i <= n; i++) {
        result *= i;
    }
    return result;
}

int main() {
    int input = 5;
    cout << "Factorial of " << input << " is " << factorial(input) << endl;
    
    input = -2;
    cout << "Factorial of " << input << " is " << factorial(input) << endl;
    
    return 0;
}`
    };
    
    // Example button click event
    const exampleBtn = document.getElementById('example-btn');
    
    exampleBtn.addEventListener('click', function() {
        const language = languageSelect.value;
        if (sampleCode[language]) {
            codeEditor.setValue(sampleCode[language]);
            // Update CodeMirror mode if needed
            const mode = language === 'python' ? 'python' : 
                      language === 'javascript' ? 'javascript' : 
                      language === 'java' ? 'text/x-java' : 
                      language === 'cpp' ? 'text/x-c++src' : 'python';
            codeEditor.setOption('mode', mode);
        } else {
            showError('Example not available for the selected language');
        }
    });
    
    // Adjust height of the results container to match code container on window resize
    function adjustHeights() {
        const codeContainer = document.querySelector('.code-input-container');
        const resultsContainer = document.querySelector('.results-container');
        if (window.innerWidth >= 1024) {
            resultsContainer.style.height = `${codeContainer.offsetHeight}px`;
        } else {
            resultsContainer.style.height = 'auto';
        }
    }
    
    // Initial adjustment and on resize
    adjustHeights();
    window.addEventListener('resize', adjustHeights);
});
