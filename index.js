import { renderNewMessage } from "./dom"


// Initialize chat history from sessionStorage
let chatHistory = JSON.parse(sessionStorage.getItem('chatHistory')) || [];

document.getElementById("form").addEventListener("submit", async function (event) {
    event.preventDefault();

    const inputElement = document.getElementById("user-input");
    const query = inputElement.value.trim();
    inputElement.value = "";

    if (!query) return;

    chatHistory.push({ role: "user", content: query });
    renderNewMessage(query, "user");

    try {
        const response = await fetch("https://ai-agent.ismaelalhoran585.workers.dev/", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ 
                query,
                history: chatHistory.filter(m => m.role !== 'system') // Exclude system messages
            })
        });

        const data = await response.json();

        // Update chat history with assistant response
        chatHistory.push({ role: "assistant", content: data.answer });
        sessionStorage.setItem('chatHistory', JSON.stringify(chatHistory));
        
        renderNewMessage(data.answer, "assistant");

    } catch (error) {
        console.error("Error:", error);
        renderNewMessage("Sorry, something went wrong.", "assistant");
    }
});

// Clear history on page refresh
window.addEventListener('beforeunload', () => {
    sessionStorage.removeItem('chatHistory');
});
