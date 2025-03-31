import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useAppState } from '../contexts/AppContext';
import { HTMLElement, ElementCategory } from '../types/types';

const LibraryContainer = styled.div`
  padding: 1rem;
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
  border-bottom: 1px solid #eaeaea;
  padding-bottom: 1rem;
`;

const Title = styled.h2`
  font-size: 1.2rem;
  color: var(--secondary-color);
  margin: 0;
  font-weight: 600;
`;

const SearchBar = styled.input`
  width: 100%;
  padding: 0.7rem;
  border: 1px solid #e0e0e0;
  border-radius: var(--border-radius);
  margin-bottom: 1.5rem;
  font-size: 0.9rem;
  
  &:focus {
    outline: none;
    border-color: var(--accent-color);
  }
`;

const CategoryTitle = styled.h3`
  font-size: 1.1rem;
  color: var(--secondary-color);
  margin: 1rem 0 0.8rem;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid #eaeaea;
  display: flex;
  align-items: center;
  
  &::before {
    content: '';
    display: inline-block;
    width: 12px;
    height: 12px;
    background-color: var(--accent-color);
    margin-right: 8px;
    border-radius: 3px;
  }
`;

const ElementsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
  margin-bottom: 1.5rem;
`;

const ElementItem = styled(motion.div)<{ selected: boolean }>`
  padding: 0.8rem;
  background-color: ${props => props.selected ? '#f0f7ff' : '#f9f9f9'};
  border-radius: var(--border-radius);
  cursor: pointer;
  border-left: ${props => props.selected ? '3px solid var(--accent-color)' : 'none'};
  transition: all 0.2s ease;
  
  &:hover {
    background-color: ${props => props.selected ? '#e1f0ff' : '#f0f0f0'};
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);
  }
`;

const ElementName = styled.div`
  font-weight: bold;
  margin-bottom: 0.3rem;
`;

const ElementDescription = styled.div`
  font-size: 0.85rem;
  color: #666;
`;

const NoResults = styled.div`
  padding: 1rem;
  text-align: center;
  color: #666;
`;

const ElementInfo = styled.div`
  margin-top: 0.8rem;
  margin-bottom: 1.2rem;
  padding: 0.8rem;
  background-color: #f0f8ff;
  border-radius: var(--border-radius);
  border-left: 3px solid var(--accent-color);
  font-size: 0.9rem;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);
`;

const ElementInfoTitle = styled.h4`
  margin-top: 0;
  margin-bottom: 0.5rem;
  color: var(--accent-color);
`;

const ElementInfoContent = styled.div`
  font-size: 0.9rem;
  margin-bottom: 0.5rem;
`;

const ElementCode = styled.code`
  display: block;
  background-color: #f5f5f5;
  padding: 0.5rem;
  border-radius: 4px;
  margin: 0.5rem 0;
  font-family: monospace;
  white-space: pre-wrap;
`;

const InsertButton = styled.button`
  background-color: var(--accent-color);
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: var(--border-radius);
  cursor: pointer;
  font-size: 0.9rem;
  margin-top: 0.5rem;
  
  &:hover {
    background-color: #b30f32;
  }
`;

const AttributesList = styled.ul`
  margin: 0.5rem 0;
  padding-left: 1.5rem;
  font-size: 0.85rem;
`;

const AttributeItem = styled.li`
  margin-bottom: 0.2rem;
`;

interface ElementLibraryProps {
  elements: HTMLElement[];
  onToggle: () => void;
}

const ElementLibrary: React.FC<ElementLibraryProps> = ({ elements, onToggle }) => {
  const { state, updateHTML, setSelectedElement } = useAppState();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedElementInfo, setSelectedElementInfo] = useState<HTMLElement | null>(null);
  
  // Filter elements based on search term
  const filteredElements = elements.filter(element => 
    element.tag.toLowerCase().includes(searchTerm.toLowerCase()) || 
    element.description.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  // Group elements by category
  const groupedElements = filteredElements.reduce((acc, element) => {
    if (!acc[element.category]) {
      acc[element.category] = [];
    }
    acc[element.category].push(element);
    return acc;
  }, {} as Record<ElementCategory, HTMLElement[]>);
  
  // Handle element click to show details
  const handleElementClick = (element: HTMLElement) => {
    setSelectedElementInfo(prev => prev?.tag === element.tag ? null : element);
  };
  
  // Insert element into HTML editor at cursor position or intelligently
  const handleInsertElement = (element: HTMLElement) => {
    if (!state.currentProject) return;
    
    const currentHTML = state.currentProject.html;
    let elementContent = element.defaultContent || `<${element.tag}></${element.tag}>`;
    let updatedHTML = '';
    
    // Si le contenu HTML actuel contient un div, insérer à l'intérieur du dernier div
    if (currentHTML.includes('<div') && currentHTML.includes('</div>')) {
      updatedHTML = currentHTML.replace(
        /(<\/div>)(?![\s\S]*<\/div>)/i, // Match the last closing div
        `  ${elementContent}\n$1`
      );
    } else {
      // Otherwise append to the end
      updatedHTML = currentHTML + '\n' + elementContent;
    }
    
    updateHTML(state.currentProject.id, updatedHTML);
    
    // Select this element for editing properties
    setSelectedElement({
      type: element.tag,
      properties: element.attributes.reduce((acc, attr) => {
        acc[attr] = '';
        return acc;
      }, {} as Record<string, string>),
      content: element.defaultContent || ''
    });
  };

  // Rendu d'un élément avec ses informations si sélectionné
  const renderElement = (element: HTMLElement) => {
    const isSelected = selectedElementInfo?.tag === element.tag;
    
    return (
      <div key={element.tag}>
        <ElementItem 
          selected={isSelected}
          onClick={() => handleElementClick(element)}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <ElementName>{element.tag}</ElementName>
          <ElementDescription>{element.description}</ElementDescription>
        </ElementItem>
        
        {isSelected && (
          <ElementInfo>
            <ElementInfoTitle>
              &lt;{element.tag}&gt;
            </ElementInfoTitle>
            <ElementInfoContent>
              {element.description}
            </ElementInfoContent>
            <div>
              <strong>Attributs courants:</strong>
              <AttributesList>
                {element.attributes.map(attr => (
                  <AttributeItem key={attr}>{attr}</AttributeItem>
                ))}
              </AttributesList>
            </div>
            <div>
              <strong>Exemple:</strong>
              <ElementCode>{element.example}</ElementCode>
            </div>
            <InsertButton onClick={() => handleInsertElement(element)}>
              Insérer dans le code
            </InsertButton>
          </ElementInfo>
        )}
      </div>
    );
  };
  
  return (
    <LibraryContainer>
      <Header>
        <Title>Bibliothèque d'Éléments</Title>
      </Header>
      
      <SearchBar 
        type="text"
        placeholder="Rechercher un élément..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      
      {Object.entries(groupedElements).length > 0 ? (
        Object.entries(groupedElements).map(([category, categoryElements]) => (
          <div key={category}>
            <CategoryTitle>{category}</CategoryTitle>
            <ElementsList>
              {categoryElements.map(renderElement)}
            </ElementsList>
          </div>
        ))
      ) : (
        <NoResults>
          Aucun élément trouvé pour "{searchTerm}"
        </NoResults>
      )}
    </LibraryContainer>
  );
};

export default ElementLibrary; 