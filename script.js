// Example: Toggle sidebar or show alert for icons
document.querySelectorAll('.footer-strip i, .header-right i').forEach(icon => {
    icon.addEventListener('click', () => {
        alert('This is a placeholder action for ' + icon.className);
    });
});


// Toggle the sidebar visibility
function toggleSidebar() {
    const sidebar = document.getElementById("sidebar");
    sidebar.classList.toggle("hidden");
}

// Show home content and hide feed content
function showHome() {
    document.getElementById("home-content").style.display = "block";
    document.getElementById("chat-content").style.display = "none";
    document.getElementById("feed-content").style.display = "none";
    document.getElementById("calender-content").style.display = "none";
    
}

// Show feed content and hide home content
function showFeed() {
    document.getElementById("home-content").style.display = "none";
    document.getElementById("chat-content").style.display = "none";
    document.getElementById("feed-content").style.display = "block";
    document.getElementById("calender-content").style.display = "none";
}




// Show the Discuss (Chat) Content
function showDiscuss() {
    document.getElementById("home-content").style.display = "none";
    document.getElementById("feed-content").style.display = "none";
    document.getElementById("chat-content").style.display = "block";
    document.getElementById("calender-content").style.display = "none";
}

// Send a Message in the Chat
function sendMessage() {
    const messageInput = document.getElementById("messageInput");
    const messageText = messageInput.value.trim();

    if (messageText) {
        const chatBox = document.querySelector(".chat-box");
        const messageDiv = document.createElement("div");
        messageDiv.className = "message";
        messageDiv.innerHTML = `<strong>You:</strong> ${messageText}`;
        chatBox.appendChild(messageDiv);
        
        // Clear the input field after sending
        messageInput.value = "";
        
        // Scroll to the bottom of the chat box
        chatBox.scrollTop = chatBox.scrollHeight;
    }
}
function showCalendarSection() {
    document.getElementById("home-content").style.display = "none";
    document.getElementById("chat-content").style.display = "none";
    document.getElementById("feed-content").style.display = "none";
    document.getElementById("calender-content").style.display = "block";
    
}

