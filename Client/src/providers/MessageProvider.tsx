import { AlertColor } from '@mui/material';
import React, { createContext, ReactNode, useContext, useState } from 'react';

interface MessageContextType {
  message: string;
  severity: AlertColor;
  handleChange: (message: string, severity?: AlertColor) => void;
  handleClose: () => void;
}

const MessageContext = createContext<MessageContextType | undefined>(undefined);

const MessageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [message, setMessage] = useState('');
  const [severity, setSeverity] = useState<AlertColor>('info');

  const handleClose = () => {
    setSeverity('info');
    setMessage('');
  };

  const handleChange = (message: string, severity: AlertColor = 'info') => {
    setMessage(message);
    setSeverity(severity);
  };

  return (
    <MessageContext.Provider value={{ message, severity, handleChange, handleClose }}>
      {children}
    </MessageContext.Provider>
  );
};

const useMessage = (): MessageContextType => {
  const context = useContext(MessageContext);
  if (!context) {
    throw new Error('useMessage must be used within a MessageProvider');
  }
  return context;
};

export { MessageProvider, useMessage };
