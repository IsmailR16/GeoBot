import { renderNewMessage } from "./dom"

document.getElementById("form").addEventListener("submit", async function (event) {
    event.preventDefault();

    const inputElement = document.getElementById("user-input");
    inputElement.focus();
    const formData = new FormData(event.target);
    const query = formData.get("user-input");
    event.target.reset();

    renderNewMessage(query, "user"); // Show user message in UI

    try {
        const response = await fetch("https://ai-agent.ismaelalhoran585.workers.dev/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ query })
        });

        const data = await response.json();
        renderNewMessage(data.answer, "assistant"); // Show AI response in UI
    } catch (error) {
        console.error("Error:", error);
        renderNewMessage("Sorry, something went wrong.", "assistant");
    }
});
