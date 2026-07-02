document.addEventListener('DOMContentLoaded', () => {
    const chatForm = document.getElementById('chat-form');
    const chatInput = document.getElementById('chat-input');
    const sendBtn = document.getElementById('send-btn');
    const chatMessages = document.getElementById('chat-messages');
    const welcomeScreen = document.getElementById('welcome-screen');
    const menuBtn = document.getElementById('menu-btn');
    const sidebar = document.getElementById('sidebar');
    const newChatBtn = document.getElementById('new-chat-btn');

    // Conversation history to send to API
    let conversationHistory = [];

    // Configure marked with highlight.js
    marked.setOptions({
        highlight: function(code, lang) {
            if (lang && hljs.getLanguage(lang)) {
                return hljs.highlight(code, { language: lang }).value;
            }
            return hljs.highlightAuto(code).value;
        },
        breaks: true,
        gfm: true
    });

    // Auto-resize textarea
    chatInput.addEventListener('input', function() {
        this.style.height = 'auto';
        this.style.height = (this.scrollHeight) + 'px';
        
        // Enable/disable send button
        if (this.value.trim().length > 0) {
            sendBtn.disabled = false;
            sendBtn.style.backgroundColor = 'var(--text-primary)';
            sendBtn.style.color = 'var(--bg-main)';
        } else {
            sendBtn.disabled = true;
            sendBtn.style.backgroundColor = 'var(--bg-surface-hover)';
            sendBtn.style.color = 'var(--text-muted)';
        }
    });

    // Handle Enter key (Shift+Enter for new line)
    chatInput.addEventListener('keydown', function(e) {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            if (!sendBtn.disabled) {
                chatForm.dispatchEvent(new Event('submit'));
            }
        }
    });

    // Toggle sidebar on mobile
    menuBtn.addEventListener('click', () => {
        sidebar.classList.toggle('open');
    });

    // Close sidebar when clicking outside on mobile
    document.addEventListener('click', (e) => {
        if (window.innerWidth <= 768 && 
            !sidebar.contains(e.target) && 
            !menuBtn.contains(e.target) && 
            sidebar.classList.contains('open')) {
            sidebar.classList.remove('open');
        }
    });

    // New Chat button
    newChatBtn.addEventListener('click', () => {
        // Clear history
        conversationHistory = [];
        
        // Remove all messages
        const messages = chatMessages.querySelectorAll('.message');
        messages.forEach(msg => msg.remove());
        
        // Show welcome screen
        welcomeScreen.style.display = 'flex';
        
        // Reset input
        chatInput.value = '';
        chatInput.style.height = 'auto';
        sendBtn.disabled = true;
        chatInput.focus();
    });

    // Handle form submission
    chatForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const messageText = chatInput.value.trim();
        if (!messageText) return;

        // Hide welcome screen on first message
        if (welcomeScreen.style.display !== 'none') {
            welcomeScreen.style.display = 'none';
        }

        // Add user message to UI
        appendMessage('user', messageText);
        
        // Add to history
        conversationHistory.push({ role: 'user', content: messageText });

        // Reset input
        chatInput.value = '';
        chatInput.style.height = 'auto';
        sendBtn.disabled = true;

        // Scroll to bottom
        scrollToBottom();

        // Add loading indicator
        const loadingId = addTypingIndicator();
        scrollToBottom();

        try {
            // Call our Node.js backend
            const response = await fetch('http://localhost:3000/api/chat', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ messages: conversationHistory })
            });

            const data = await response.json();
            
            // Remove loading indicator
            removeElement(loadingId);

            if (!response.ok) {
                throw new Error(data.error || 'Failed to fetch response');
            }

            const aiResponse = data.choices[0].message.content;
            
            // Add to history
            conversationHistory.push({ role: 'assistant', content: aiResponse });
            
            // Add AI message to UI
            appendMessage('assistant', aiResponse);
            
        } catch (error) {
            console.error('Error:', error);
            removeElement(loadingId);
            appendMessage('error', 'Sorry, I encountered an error. Please check your API key and connection, then try again.');
        }

        scrollToBottom();
        chatInput.focus();
    });

    function appendMessage(role, text) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${role === 'user' ? 'user-message' : 'bot-message'}`;
        
        let avatar, author;
        if (role === 'user') {
            avatar = 'U';
            author = 'You';
        } else if (role === 'assistant') {
            avatar = '<i class="fa-solid fa-layer-group"></i>';
            author = 'Nexus AI';
        } else {
            avatar = '<i class="fa-solid fa-triangle-exclamation"></i>';
            author = 'System';
            messageDiv.style.color = '#ef4444';
        }

        // Convert markdown for bot messages
        const contentHtml = role === 'assistant' ? marked.parse(text) : `<p>${escapeHTML(text)}</p>`;

        messageDiv.innerHTML = `
            <div class="message-avatar">
                ${avatar}
            </div>
            <div class="message-content">
                <div class="message-author">${author}</div>
                <div class="message-text">
                    ${contentHtml}
                </div>
            </div>
        `;
        
        chatMessages.appendChild(messageDiv);
        
        // Apply syntax highlighting to new code blocks
        if (role === 'assistant') {
            messageDiv.querySelectorAll('pre code').forEach((block) => {
                hljs.highlightElement(block);
            });
        }
    }

    function addTypingIndicator() {
        const id = 'typing-' + Date.now();
        const messageDiv = document.createElement('div');
        messageDiv.className = 'message bot-message';
        messageDiv.id = id;
        
        messageDiv.innerHTML = `
            <div class="message-avatar">
                <i class="fa-solid fa-layer-group"></i>
            </div>
            <div class="message-content">
                <div class="message-author">Nexus AI</div>
                <div class="message-text">
                    <div class="typing-indicator">
                        <div class="typing-dot"></div>
                        <div class="typing-dot"></div>
                        <div class="typing-dot"></div>
                    </div>
                </div>
            </div>
        `;
        
        chatMessages.appendChild(messageDiv);
        return id;
    }

    function removeElement(id) {
        const el = document.getElementById(id);
        if (el) el.remove();
    }

    function scrollToBottom() {
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    function escapeHTML(str) {
        return str
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#039;');
    }
});
