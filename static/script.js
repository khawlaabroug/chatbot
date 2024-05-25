document.getElementById('chat-form').addEventListener('submit', async function(e) {
    e.preventDefault();
    
    const userInput = document.getElementById('user-input').value;
    const chatBox = document.getElementById('chat-box');

    const userImagePath = document.body.getAttribute('data-user-image');
    const botImagePath = document.body.getAttribute('data-bot-image');
    
    const userMessageContainer = document.createElement('div');
    userMessageContainer.classList.add('user-message-container');
    
    const userImage = document.createElement('img');
    userImage.src = userImagePath;   
    userImage.classList.add('user-profile');
    
    const userMessage = document.createElement('div');
    userMessage.classList.add('user-message');
    userMessage.innerText = userInput;
    
    userMessageContainer.appendChild(userMessage);
    userMessageContainer.appendChild(userImage);
    chatBox.appendChild(userMessageContainer);
    
    document.getElementById('user-input').value = '';

    try {
        const response = await fetch('/generate', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: `user_input=${encodeURIComponent(userInput)}`
        });
        const responseData = await response.text();
        
        const botMessageContainer = document.createElement('div');
        botMessageContainer.classList.add('bot-message-container');

        const botImage = document.createElement('img');
        botImage.src = botImagePath;  
        botImage.classList.add('bot-profile');

        const botMessage = document.createElement('div');
        botMessage.classList.add('bot-message');
        botMessage.innerText = responseData;

        botMessageContainer.appendChild(botImage);
        botMessageContainer.appendChild(botMessage);
        chatBox.appendChild(botMessageContainer);

        chatBox.scrollTop = chatBox.scrollHeight;
    } catch (error) {
        console.error('Error:', error);
    }
});
