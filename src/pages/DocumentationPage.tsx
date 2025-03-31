import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { HtmlDocContent } from '../components/documentation/HtmlDocContent';
import { CssDocContent } from '../components/documentation/CssDocContent';
import { JsDocContent } from '../components/documentation/JsDocContent';
import { ResourcesDocContent } from '../components/documentation/ResourcesDocContent';

const DocContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
`;

const Title = styled.h1`
  font-size: 2rem;
  color: var(--secondary-color);
`;

// Définir un composant pour les boutons de navigation
interface LinkHomeButtonProps {
  to: string;
  children: React.ReactNode;
}

const LinkHomeButton: React.FC<LinkHomeButtonProps> = ({ to, children }) => {
  const buttonStyle = {
    padding: '0.5rem 1rem',
    backgroundColor: 'var(--accent-color)',
    color: 'white', 
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '0.9rem',
    display: 'inline-block',
    marginBottom: '1rem'
  };

  return (
    <motion.div
      style={{ display: 'inline-block' }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <Link 
        to={to}
        style={buttonStyle}
      >
        {children}
      </Link>
    </motion.div>
  );
};

const TabsContainer = styled.div`
  display: flex;
  border-bottom: 1px solid #e0e0e0;
  margin-bottom: 2rem;
`;

const Tab = styled.button<{ $active: boolean }>`
  padding: 0.8rem 1.5rem;
  background: none;
  border: none;
  border-bottom: ${(props) => (props.$active ? '3px solid var(--accent-color)' : 'none')};
  color: ${(props) => (props.$active ? 'var(--accent-color)' : 'var(--secondary-color)')};
  font-weight: ${(props) => (props.$active ? 'bold' : 'normal')};
  cursor: pointer;
  margin-right: 1rem;
  transition: all 0.3s;
  
  &:hover {
    color: var(--accent-color);
  }
`;

const ContentContainer = styled.div`
  flex: 1;
  overflow-y: auto;
`;

type TabType = 'html' | 'css' | 'js' | 'resources';

const DocumentationPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>('html');
  
  // Render content based on active tab
  const renderContent = () => {
    switch (activeTab) {
      case 'html':
        return <HtmlDocContent />;
      case 'css':
        return <CssDocContent />;
      case 'js':
        return <JsDocContent />;
      case 'resources':
        return <ResourcesDocContent />;
      default:
        return <HtmlDocContent />;
    }
  };
  
  return (
    <DocContainer>
      <Header>
        <Title>Documentation</Title>
        <LinkHomeButton to="/">
          Retour à l'accueil
        </LinkHomeButton>
      </Header>
      
      <TabsContainer>
        <Tab 
          $active={activeTab === 'html'} 
          onClick={() => setActiveTab('html')}
        >
          HTML
        </Tab>
        <Tab 
          $active={activeTab === 'css'} 
          onClick={() => setActiveTab('css')}
        >
          CSS
        </Tab>
        <Tab 
          $active={activeTab === 'js'} 
          onClick={() => setActiveTab('js')}
        >
          JavaScript
        </Tab>
        <Tab 
          $active={activeTab === 'resources'} 
          onClick={() => setActiveTab('resources')}
        >
          Ressources
        </Tab>
      </TabsContainer>
      
      <ContentContainer>
        {renderContent()}
      </ContentContainer>
    </DocContainer>
  );
};

export default DocumentationPage; 