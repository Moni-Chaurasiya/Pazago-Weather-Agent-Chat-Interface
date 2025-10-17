// import React,{createContext,useContext,useReducer,useEffect,useState} from "react";

// const STORAGE_KEY="weatherchatMessages";
// const loadMessagesFromStorage = () => {
//   try {
//     const savedMessages = localStorage.getItem(STORAGE_KEY);
//     return savedMessages ? JSON.parse(savedMessages) : [];
//   } catch (error) {
//     console.error('Failed to load messages from localStorage:', error);
//     return [];
//   }
// };


// const saveMessagesToStorage = (messages) => {
//   try {
//     localStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
//   } catch (error) {
//     console.error('Failed to save messages to localStorage:', error);
//   }
// };

// const initialState = {
//   messages: loadMessagesFromStorage(),
//   isLoading: false,
//   error: null,
//   searchQuery: '',
//   filteredMessages: []
// };
// const CHAT_ACTIONS = {
//   ADD_MESSAGE: 'ADD_MESSAGE',
//   SET_LOADING: 'SET_LOADING',
//   SET_ERROR: 'SET_ERROR',
//   SET_SEARCH_QUERY: 'SET_SEARCH_QUERY',
//   SET_FILTERED_MESSAGES: 'SET_FILTERED_MESSAGES',
//   CLEAR_MESSAGES: 'CLEAR_MESSAGES'  ,
//   LOAD_MESSAGES: 'LOAD_MESSAGES'
// }


// function chatReducer(state, action) {
//   switch (action.type) {
//     case CHAT_ACTIONS.ADD_MESSAGE:
//       { const updatedMessages = [...state.messages, action.payload];
  
//       saveMessagesToStorage(updatedMessages);
//       return {
//         ...state,
//         messages: updatedMessages,
//         error: null
//       }; }
    
//     case CHAT_ACTIONS.SET_LOADING:
//       return {
//         ...state,
//         isLoading: action.payload
//       };
    
//     case CHAT_ACTIONS.SET_ERROR:
//       return {
//         ...state,
//         error: action.payload,
//         isLoading: false
//       };
    
//     case CHAT_ACTIONS.CLEAR_CHAT:
//       saveMessagesToStorage([]);
//       return {
//         ...state,
//         messages: [],
//         error: null,
//         searchQuery: '',
//         filteredMessages: []
//       };
    
//     case CHAT_ACTIONS.SET_SEARCH_QUERY:
//       return {
//         ...state,
//         searchQuery: action.payload
//       };
    
//     case CHAT_ACTIONS.SET_FILTERED_MESSAGES:
//       return {
//         ...state,
//         filteredMessages: action.payload
//       };
    
//     case CHAT_ACTIONS.LOAD_MESSAGES:
//       return {
//         ...state,
//         messages: action.payload
//       };
    
//     default:
//       return state;
//   }
// }


// const ChatContext = createContext();


// export function ChatProvider({ children }) {
//   const [state, dispatch] = useReducer(chatReducer, initialState);

//   useEffect(() => {
//     const savedMessages = loadMessagesFromStorage();
//     if (savedMessages.length > 0) {
//       dispatch({ type: CHAT_ACTIONS.LOAD_MESSAGES, payload: savedMessages });
//     }
//   }, []);

//   useEffect(() => {
//     if (state.messages.length > 0) {
//       saveMessagesToStorage(state.messages);
//     }
//   }, [state.messages]);


//   const addMessage = (message) => {
//     dispatch({ type: CHAT_ACTIONS.ADD_MESSAGE, payload: message });
//   };

//   const setLoading = (isLoading) => {
//     dispatch({ type: CHAT_ACTIONS.SET_LOADING, payload: isLoading });
//   };

//   const setError = (error) => {
//     dispatch({ type: CHAT_ACTIONS.SET_ERROR, payload: error });
//   };

//   const clearChat = () => {
//     dispatch({ type: CHAT_ACTIONS.CLEAR_CHAT });
//   };

//   const setSearchQuery = (query) => {
//     dispatch({ type: CHAT_ACTIONS.SET_SEARCH_QUERY, payload: query });
    
//     if (query.trim() === '') {
//       dispatch({ type: CHAT_ACTIONS.SET_FILTERED_MESSAGES, payload: [] });
//     } else {
//       const filtered = state.messages.filter(message =>
//         message.content.toLowerCase().includes(query.toLowerCase())
//       );
//       dispatch({ type: CHAT_ACTIONS.SET_FILTERED_MESSAGES, payload: filtered });
//     }
//   };


//   const value = {
//     ...state,
//     addMessage,
//     setLoading,
//     setError,
//     clearChat,
//     setSearchQuery,

//   };

//   return (
//     <ChatContext.Provider value={value}>
//       {children}
//     </ChatContext.Provider>
//   );
// }

// export function useChat() {
//   const context = useContext(ChatContext);
//   if (!context) {
//     throw new Error('useChat must be used within a ChatProvider');
//   }
//   return context;
// }


import React, { createContext, useContext, useReducer, useEffect } from "react";

const STORAGE_KEY = "weatherchatMessages";

// Load saved messages
const loadMessagesFromStorage = () => {
  try {
    const savedMessages = localStorage.getItem(STORAGE_KEY);
    return savedMessages ? JSON.parse(savedMessages) : [];
  } catch (error) {
    console.error("Failed to load messages from localStorage:", error);
    return [];
  }
};

// Save messages
const saveMessagesToStorage = (messages) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
  } catch (error) {
    console.error("Failed to save messages to localStorage:", error);
  }
};

// Initial state
const initialState = {
  messages: loadMessagesFromStorage(),
  isLoading: false,
  error: null,
  searchQuery: "",
  filteredMessages: [],
};

const CHAT_ACTIONS = {
  ADD_MESSAGE: "ADD_MESSAGE",
  UPDATE_MESSAGE: "UPDATE_MESSAGE", // 🆕
  SET_LOADING: "SET_LOADING",
  SET_ERROR: "SET_ERROR",
  SET_SEARCH_QUERY: "SET_SEARCH_QUERY",
  SET_FILTERED_MESSAGES: "SET_FILTERED_MESSAGES",
  CLEAR_MESSAGES: "CLEAR_MESSAGES",
  LOAD_MESSAGES: "LOAD_MESSAGES",
};

// Reducer
function chatReducer(state, action) {
  switch (action.type) {
    case CHAT_ACTIONS.ADD_MESSAGE: {
      const updatedMessages = [...state.messages, action.payload];
      saveMessagesToStorage(updatedMessages);
      return { ...state, messages: updatedMessages, error: null };
    }

    case CHAT_ACTIONS.UPDATE_MESSAGE: { // 🆕
      const updatedMessages = state.messages.map((msg) =>
        msg.id === action.payload.id ? { ...msg, ...action.payload } : msg
      );
      saveMessagesToStorage(updatedMessages);
      return { ...state, messages: updatedMessages };
    }

    case CHAT_ACTIONS.SET_LOADING:
      return { ...state, isLoading: action.payload };

    case CHAT_ACTIONS.SET_ERROR:
      return { ...state, error: action.payload, isLoading: false };

    case CHAT_ACTIONS.CLEAR_MESSAGES:
      saveMessagesToStorage([]);
      return {
        ...state,
        messages: [],
        error: null,
        searchQuery: "",
        filteredMessages: [],
      };

    case CHAT_ACTIONS.SET_SEARCH_QUERY:
      return { ...state, searchQuery: action.payload };

    case CHAT_ACTIONS.SET_FILTERED_MESSAGES:
      return { ...state, filteredMessages: action.payload };

    case CHAT_ACTIONS.LOAD_MESSAGES:
      return { ...state, messages: action.payload };

    default:
      return state;
  }
}

const ChatContext = createContext();

// Provider
export function ChatProvider({ children }) {
  const [state, dispatch] = useReducer(chatReducer, initialState);

  useEffect(() => {
    const savedMessages = loadMessagesFromStorage();
    if (savedMessages.length > 0) {
      dispatch({ type: CHAT_ACTIONS.LOAD_MESSAGES, payload: savedMessages });
    }
  }, []);

  useEffect(() => {
    if (state.messages.length > 0) {
      saveMessagesToStorage(state.messages);
    }
  }, [state.messages]);

  const addMessage = (message) =>
    dispatch({ type: CHAT_ACTIONS.ADD_MESSAGE, payload: message });

  const updateMessage = (updatedMessage) => // 🆕
    dispatch({ type: CHAT_ACTIONS.UPDATE_MESSAGE, payload: updatedMessage });

  const setLoading = (isLoading) =>
    dispatch({ type: CHAT_ACTIONS.SET_LOADING, payload: isLoading });

  const setError = (error) =>
    dispatch({ type: CHAT_ACTIONS.SET_ERROR, payload: error });

  const clearChat = () =>
    dispatch({ type: CHAT_ACTIONS.CLEAR_MESSAGES });

  const setSearchQuery = (query) => {
    dispatch({ type: CHAT_ACTIONS.SET_SEARCH_QUERY, payload: query });
    if (query.trim() === "") {
      dispatch({ type: CHAT_ACTIONS.SET_FILTERED_MESSAGES, payload: [] });
    } else {
      const filtered = state.messages.filter((message) =>
        message.content.toLowerCase().includes(query.toLowerCase())
      );
      dispatch({ type: CHAT_ACTIONS.SET_FILTERED_MESSAGES, payload: filtered });
    }
  };

  const value = {
    ...state,
    addMessage,
    updateMessage, // 🆕 exported
    setLoading,
    setError,
    clearChat,
    setSearchQuery,
  };

  return (
    <ChatContext.Provider value={value}>
      {children}
    </ChatContext.Provider>
  );
}

// Hook
export function useChat() {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error("useChat must be used within a ChatProvider");
  }
  return context;
}
