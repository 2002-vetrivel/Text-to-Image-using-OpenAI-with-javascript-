document.addEventListener("DOMContentLoaded", function() {
    const generate = document.getElementById('submit');
    const image = document.getElementById('image');
    const errorDiv = document.getElementById('error');
    const loadingDiv = document.getElementById('loading');
    const downloadText = document.getElementById('download-text');

    const API_TOKEN = "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";

    generate.addEventListener('click', async () => {
        const input = document.getElementById('input').value;

        if (input.trim() === "") {
            errorDiv.textContent = "Please enter something";
            errorDiv.style.display = 'block';
            image.style.display = 'none';
            downloadText.style.display = 'none';
            return;
        }

        loadingDiv.style.cssText = "display: flex; justify-content: center; align-items: center; margin: 10px;";
        errorDiv.style.display = 'none';
        image.style.display = 'none';
        downloadText.style.display = 'none'; // Hide download text while loading

        try {
            const response = await fetch("https://api-inference.huggingface.co/models/prompthero/openjourney", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${API_TOKEN}`,
                },
                body: JSON.stringify({ inputs: input }),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const blob = await response.blob();
            const generatedImage = URL.createObjectURL(blob);
            image.src = generatedImage;
            image.style.display = 'block';

            
            downloadText.style.display = 'block';

            image.addEventListener('dblclick', () => {
                const a = document.createElement('a');
                a.href = generatedImage;
                a.download = 'generated-image.png';
                a.click();
            });

        } catch (error) {
            console.error('Error:', error);
            errorDiv.textContent = 'An error occurred while generating the image. Please try again.';
            errorDiv.style.display = 'block';
            image.style.display = 'none';
            downloadText.style.display = 'none'; 
        } finally {
            loadingDiv.style.display = 'none'; 
        }
    });
});
