// src/client/app.js
const socket = io("http://localhost:3001");  // Ensure the port matches the server

// Log connection confirmation
socket.on("connect", () => {
    console.log("Connected to server with ID:", socket.id);
});

// Elements for message handling
const messageContainer = document.getElementById("message-container");
const messageInput = document.getElementById("message-input");
const sendButton = document.getElementById("send-button");

// Function to send a message
function sendMessage() {
    const message = messageInput.value;
    if (message) {
        console.log("Sending message:", message); // Log the outgoing message
        socket.emit("message", message);          // Send message to server
        messageInput.value = "";                  // Clear input after sending
        appendMessage(`You: ${message}`, "outgoing");  // Display the message locally
    }
}

// Send message on button click
sendButton.addEventListener("click", sendMessage);

// Send message on Enter key press
messageInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        event.preventDefault(); // Prevent newline in the input box
        sendMessage();          // Call send message function
    }
});

// Listen for messages from the server
socket.on("message", (data) => {
    console.log("Received message:", data);       // Log incoming messages
    appendMessage(data, "incoming");
});

// Display messages in the chat container
function appendMessage(message, type) {
    const messageElement = document.createElement("div");
    messageElement.textContent = message;
    messageElement.classList.add("message", type);
    messageContainer.appendChild(messageElement);
    messageContainer.scrollTop = messageContainer.scrollHeight; // Auto-scroll to bottom
}
