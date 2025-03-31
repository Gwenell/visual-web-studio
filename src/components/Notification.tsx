import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

// Types de notifications
export enum NotificationType {
  SUCCESS = 'success',
  ERROR = 'error',
  INFO = 'info'
}

interface NotificationProps {
  message: string;
  type: NotificationType;
  onClose: () => void;
  duration?: number;
}

// Container stylisé pour la notification
const NotificationContainer = styled.div<{ type: NotificationType }>`
  position: fixed;
  bottom: 20px;
  right: 20px;
  padding: 12px 20px;
  background-color: ${props => {
    switch (props.type) {
      case NotificationType.SUCCESS:
        return 'rgba(72, 187, 120, 0.95)';
      case NotificationType.ERROR:
        return 'rgba(245, 101, 101, 0.95)';
      case NotificationType.INFO:
        return 'rgba(66, 153, 225, 0.95)';
      default:
        return 'rgba(66, 153, 225, 0.95)';
    }
  }};
  border-radius: 6px;
  color: white;
  font-family: 'Poppins', sans-serif;
  font-size: 14px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.08);
  z-index: 9999;
  max-width: 400px;
  animation: slideIn 0.3s ease-out forwards;
  
  @keyframes slideIn {
    from {
      transform: translateX(100%);
      opacity: 0;
    }
    to {
      transform: translateX(0);
      opacity: 1;
    }
  }
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  color: white;
  font-size: 16px;
  cursor: pointer;
  margin-left: 15px;
  opacity: 0.7;
  
  &:hover {
    opacity: 1;
  }
`;

const MessageContent = styled.div`
  flex: 1;
`;

const IconWrapper = styled.div`
  margin-right: 10px;
  font-size: 18px;
`;

// Contexte de notification
interface NotificationContextType {
  showNotification: (message: string, type: NotificationType, duration?: number) => void;
}

export const NotificationContext = React.createContext<NotificationContextType | undefined>(undefined);

// Provider pour le contexte
export const NotificationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [notification, setNotification] = useState<{
    message: string;
    type: NotificationType;
    visible: boolean;
    duration: number;
  }>({
    message: '',
    type: NotificationType.INFO,
    visible: false,
    duration: 3000
  });

  const showNotification = (message: string, type: NotificationType, duration = 3000) => {
    setNotification({
      message,
      type,
      visible: true,
      duration
    });
  };

  const hideNotification = () => {
    setNotification(prev => ({ ...prev, visible: false }));
  };

  useEffect(() => {
    if (notification.visible && notification.duration > 0) {
      const timer = setTimeout(() => {
        hideNotification();
      }, notification.duration);
      
      return () => clearTimeout(timer);
    }
  }, [notification.visible, notification.duration]);

  return (
    <NotificationContext.Provider value={{ showNotification }}>
      {children}
      {notification.visible && (
        <Notification
          message={notification.message}
          type={notification.type}
          onClose={hideNotification}
          duration={notification.duration}
        />
      )}
    </NotificationContext.Provider>
  );
};

// Hook pour utiliser le contexte de notification
export const useNotification = () => {
  const context = React.useContext(NotificationContext);
  if (context === undefined) {
    throw new Error('useNotification doit être utilisé à l\'intérieur d\'un NotificationProvider');
  }
  return context;
};

// Composant de notification
export const Notification: React.FC<NotificationProps> = ({ message, type, onClose }) => {
  // Détermine l'icône en fonction du type
  const getIcon = () => {
    switch (type) {
      case NotificationType.SUCCESS:
        return '✓';
      case NotificationType.ERROR:
        return '✗';
      case NotificationType.INFO:
        return 'ℹ';
      default:
        return 'ℹ';
    }
  };

  return (
    <NotificationContainer type={type}>
      <IconWrapper>{getIcon()}</IconWrapper>
      <MessageContent>{message}</MessageContent>
      <CloseButton onClick={onClose}>×</CloseButton>
    </NotificationContainer>
  );
}; 