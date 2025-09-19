// Generate unique message ID
export function generateMessageId() {
  return Date.now().toString() + Math.random().toString(36).substring(2, 9);
}

// Create user message object
export function createUserMessage(content) {
  return {
    id: generateMessageId(),
    role: 'user',
    content: content,
    timestamp: new Date(),
    status: 'sending'
  };
}

// Create agent message object
export function createAgentMessage(content, id = null) {
  return {
    id: id || generateMessageId(),
    role: 'agent',
    content: content,
    timestamp: new Date(),
    status: 'received'
  };
}

// Validate message content
export function validateMessage(message) {
  if (!message || typeof message !== 'string') {
    return false;
  }
  
  const trimmed = message.trim();
  return trimmed.length > 0 && trimmed.length <= 1000;
}

// Clean message content
export function cleanMessage(message) {
  return message.trim().replace(/\s+/g, ' ');
}