document.addEventListener('DOMContentLoaded', () => {
    const formatButton = document.getElementById('formatButton');
    const copyButton = document.getElementById('copyButton');
    const jsonInput = document.getElementById('jsonInput');
    const formattedJson = document.getElementById('formattedJson');
    const indentationSelect = document.getElementById('indentation');

    // Function to format JSON
    function formatJson() {
        const jsonString = jsonInput.value;
        const indentation = parseInt(indentationSelect.value);

        try {
            const parsedJson = JSON.parse(jsonString);
            const formatted = JSON.stringify(parsedJson, null, indentation);
            formattedJson.textContent = formatted;
            formattedJson.classList.remove('invalid');
        } catch (e) {
            formattedJson.textContent = "Invalid JSON input. Please check the syntax.";
            formattedJson.classList.add('invalid');
        }
    }

    // Format JSON when the user clicks the "Format JSON" button
    formatButton.addEventListener('click', formatJson);

    // Automatically format when the user pastes JSON into the textarea
    jsonInput.addEventListener('input', formatJson);

    // Copy formatted JSON to clipboard
    copyButton.addEventListener('click', () => {
        const text = formattedJson.textContent;
        if (text && text !== "Invalid JSON input. Please check the syntax.") {
            navigator.clipboard.writeText(text).then(() => {
                alert("Formatted JSON copied to clipboard!");
            }, () => {
                alert("Failed to copy to clipboard.");
            });
        } else {
            alert("There is no valid formatted JSON to copy.");
        }
    });
});

