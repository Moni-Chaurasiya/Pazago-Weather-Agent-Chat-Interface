import { ChatProvider } from "./context/ChatContext";
import ThemeProvider from "./theme/themeProvider";
import ChatInterface from "./components/ChatInterface";
import "./App.css";
function App() {
  return (
    <ThemeProvider>
      <ChatProvider>
        <div className="App min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
          <ChatInterface />
        </div>
      </ChatProvider>
    </ThemeProvider>
  );
}