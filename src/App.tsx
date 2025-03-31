import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import GlobalStyles from './styles/GlobalStyles';
import { AppStateProvider } from './contexts/AppContext';
import EditorPage from './pages/EditorPage';
import HomePage from './pages/HomePage';
import DocumentationPage from './pages/DocumentationPage';
import { NotificationProvider } from './components/Notification';

const theme = {
  colors: {
    primary: '#F2F0E3',
    secondary: '#2E2E2E',
    accent: '#DC143C', // Crimson Red
    success: '#4CAF50',
    warning: '#FF9800',
    error: '#F44336',
    background: '#FFFFFF',
    text: '#2E2E2E',
  },
  fonts: {
    main: "'Roboto', 'Arial', sans-serif",
  },
  breakpoints: {
    mobile: '480px',
    tablet: '768px',
    desktop: '1024px',
    largeDesktop: '1440px',
  },
  spacing: {
    xs: '0.25rem',
    sm: '0.5rem',
    md: '1rem',
    lg: '1.5rem',
    xl: '2rem',
    xxl: '3rem',
  },
  borderRadius: '4px',
  transition: '0.3s',
};

function App() {
  return (
    <ThemeProvider theme={theme}>
      <NotificationProvider>
        <AppStateProvider>
          <GlobalStyles />
          <Router>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/editor" element={<EditorPage />} />
              <Route path="/editor/:projectId" element={<EditorPage />} />
              <Route path="/documentation" element={<DocumentationPage />} />
            </Routes>
          </Router>
        </AppStateProvider>
      </NotificationProvider>
    </ThemeProvider>
  );
}

export default App;
