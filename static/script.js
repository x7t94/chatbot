function toggleChatModal() {
    const modal = document.getElementById('chatModal');
    modal.style.display = modal.style.display === 'block' ? 'none' : 'block';
}

document.addEventListener('DOMContentLoaded', () => {
    const sendButton = document.getElementById('send-button');
    const chatMessages = document.getElementById('chat-messages');
    const chatInput = document.getElementById('chat-input');

    // Enhanced scroll function with a small delay to ensure it works
    function scrollToBottom() {
        setTimeout(() => {
            chatMessages.scrollTop = chatMessages.scrollHeight;
        }, 100); // Delay by 100ms for better reliability
    }

    sendButton.addEventListener('click', () => {
        const userInput = chatInput.value;

        if (userInput) {
            chatMessages.innerHTML += `<div class="user-message">${userInput}</div>`;
            scrollToBottom(); // Scroll after user's message
            chatInput.value = "";

            fetch("/chat", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ message: userInput }),
            })
                .then(response => response.json())
                .then(data => {
                    chatMessages.innerHTML += `<div class="bot-message">${data.response}</div>`;
                    scrollToBottom(); // Scroll after bot's response
                })
                .catch(error => {
                    console.error("Error during fetch:", error);
                    chatMessages.innerHTML += `<div class="bot-message">An error occurred. Please try again later.</div>`;
                    scrollToBottom(); // Scroll if there’s an error message
                });
        }
    });
});
