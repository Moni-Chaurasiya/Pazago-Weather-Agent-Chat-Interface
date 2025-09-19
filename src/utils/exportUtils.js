import { formatDateForExport } from './dateUtils';
export function exportChatAsText(messages) {
  let textContent = `Weather Chat History\n`;
  textContent += `Exported on: ${new Date().toLocaleString()}\n`;
  textContent += `Total Messages: ${messages.length}\n`;
  textContent += `${'='.repeat(50)}\n\n`;

  messages.forEach(message => {
    const timestamp = formatDateForExport(message.timestamp);
    const role = message.role === 'user' ? 'You' : 'Weather Agent';
    
    textContent += `[${timestamp}] ${role}:\n`;
    textContent += `${message.content}\n\n`;
  });

  const dataUri = 'data:text/plain;charset=utf-8,' + encodeURIComponent(textContent);
  const exportFileDefaultName = `weather-chat-${new Date().toISOString().split('T')[0]}.txt`;
  
  const linkElement = document.createElement('a');
  linkElement.setAttribute('href', dataUri);
  linkElement.setAttribute('download', exportFileDefaultName);
  linkElement.click();
}