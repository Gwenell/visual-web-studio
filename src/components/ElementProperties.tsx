import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { motion as framerMotion } from 'framer-motion';
import { useAppState } from '../contexts/AppContext';
import { CSSFramework } from '../types/types';

interface ElementPropertiesProps {
  onToggle: () => void;
}

// Styled components
const PropertiesContainer = styled.div`
  padding: 1rem;
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  background-color: white;
  box-shadow: -2px 0 10px rgba(0, 0, 0, 0.1);
  position: relative;
  padding-bottom: 80px; /* Espace pour le bouton fixe en bas */
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

const ElementTypeBadge = styled.div`
  display: inline-block;
  padding: 0.3rem 0.6rem;
  background-color: #f0f0f0;
  border-radius: 4px;
  font-size: 0.8rem;
  margin-bottom: 1rem;
  font-family: monospace;
`;

const TabsContainer = styled.div`
  display: flex;
  margin-bottom: 1.5rem;
  border-bottom: 1px solid #e0e0e0;
`;

const Tab = styled.div<{ active: boolean }>`
  padding: 0.7rem 1.2rem;
  cursor: pointer;
  border-bottom: ${props => props.active ? '2px solid var(--accent-color)' : 'none'};
  color: ${props => props.active ? 'var(--accent-color)' : 'inherit'};
  font-weight: ${props => props.active ? 'bold' : 'normal'};
`;

const SettingsContainer = styled.div`
  margin-bottom: 1rem;
  padding: 0.5rem;
  background-color: #f9f9f9;
  border-radius: 4px;
`;

const PropertiesSection = styled.div`
  margin-bottom: 1.5rem;
`;

const SectionTitle = styled.h3`
  font-size: 1.1rem;
  margin-bottom: 0.8rem;
  color: var(--secondary-color);
  border-bottom: 1px solid #eaeaea;
  padding-bottom: 0.5rem;
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

const HelpText = styled.p`
  font-size: 0.85rem;
  color: #666;
  margin-bottom: 1rem;
`;

const PropertyGroup = styled.div`
  margin-bottom: 1.2rem;
  padding: 0.8rem;
  background-color: #f9f9f9;
  border-radius: 6px;
  border-left: 3px solid var(--accent-color);
  transition: all 0.2s ease;
  
  &:hover {
    background-color: #f0f7ff;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);
  }
`;

const PropertyLabel = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  font-weight: bold;
  font-size: 0.9rem;
  display: flex;
  align-items: center;
  color: var(--secondary-color);
`;

const PropertyInfoIcon = styled.span`
  margin-left: 0.3rem;
  font-size: 0.8rem;
  cursor: help;
`;

const PropertyDescription = styled.div`
  font-size: 0.85rem;
  color: #666;
  margin-bottom: 0.8rem;
  padding: 0.5rem 0.7rem;
  background-color: rgba(255, 255, 255, 0.7);
  border-radius: 4px;
  line-height: 1.4;
  border-left: 2px solid #e0e0e0;
`;

const PropertyInput = styled.input`
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 0.9rem;
  
  &:focus {
    outline: none;
    border-color: var(--accent-color);
  }
`;

const PropertySelect = styled.select`
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 0.9rem;
  
  &:focus {
    outline: none;
    border-color: var(--accent-color);
  }
`;

const PropertyTextarea = styled.textarea`
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 0.9rem;
  min-height: 100px;
  resize: vertical;
  
  &:focus {
    outline: none;
    border-color: var(--accent-color);
  }
`;

const ColorInputContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 1rem;
`;

const ColorPreviewRow = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 0.8rem;
`;

const ColorPreview = styled.div<{ color: string }>`
  width: 32px;
  height: 32px;
  border-radius: 4px;
  background-color: ${props => props.color || '#ffffff'};
  border: 1px solid #ddd;
  margin-right: 0.8rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const ColorCode = styled.div`
  font-size: 0.9rem;
  font-family: monospace;
  color: #555;
  background-color: #f5f5f5;
  padding: 0.3rem 0.5rem;
  border-radius: 4px;
  border: 1px solid #e0e0e0;
`;

const ColorPickerContainer = styled.div`
  margin: 0.5rem 0;
  display: flex;
  flex-direction: column;
`;

const FixedButtonContainer = styled.div`
  position: fixed;
  bottom: 0;
  right: 0;
  width: 300px; /* Largeur du RightSidebar */
  background-color: white;
  box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.1);
  padding: 15px;
  z-index: 100;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;
`;

// Style du bouton avec une largeur fixe
const UpdateButton = styled.button`
  background-color: var(--accent-color);
  color: white;
  border: none;
  padding: 0.8rem 1rem;
  border-radius: 4px;
  cursor: pointer;
  font-weight: bold;
  width: 80%;
  transition: all 0.2s ease;
  
  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
  
  &:hover:not(:disabled) {
    background-color: #b30f32;
    transform: translateY(-2px);
  }
  
  &:active:not(:disabled) {
    transform: translateY(0);
  }
`;

const ButtonFeedback = styled.div<{ visible: boolean }>`
  position: fixed;
  bottom: 65px;
  left: 50%;
  transform: translateX(-50%);
  background-color: rgba(0, 0, 0, 0.7);
  color: white;
  padding: 8px 12px;
  border-radius: 4px;
  font-size: 0.8rem;
  opacity: ${props => props.visible ? 1 : 0};
  transition: opacity 0.3s ease;
  pointer-events: none;
  z-index: 20;
`;

const NoElementSelected = styled.div`
  text-align: center;
  padding: 2rem;
  color: #666;
  
  & h3 {
  margin: 1rem 0 0.5rem;
  }
  
  & p {
  margin: 0;
  font-size: 0.9rem;
  }
`;

// Add this new component for CSS classes
const CdnClassBadge = styled.div<{ selected?: boolean }>`
  display: inline-block;
  padding: 3px 8px;
  background-color: ${props => props.selected ? 'var(--accent-color)' : '#f0f0f0'};
  color: ${props => props.selected ? 'white' : '#333'};
  border-radius: 4px;
  font-size: 0.8rem;
  margin: 2px;
  cursor: pointer;
  transition: all 0.2s;
  
  &:hover {
    background-color: ${props => props.selected ? 'var(--accent-color)' : '#e0e0e0'};
  }
`;

const CdnClassesContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-top: 0.5rem;
`;

const CdnClassCategory = styled.div`
  margin-bottom: 1.2rem;
`;

const CategoryTitle = styled.h4`
  font-size: 0.95rem;
  color: var(--secondary-color);
  margin-bottom: 0.5rem;
  padding-bottom: 0.3rem;
  border-bottom: 1px solid #eaeaea;
`;

// Nouveaux composants styled pour l'affichage des informations
const InfoBox = styled.div`
  padding: 0.8rem;
  background-color: #f9f9f9;
  border-radius: 6px;
  border-left: 3px solid var(--accent-color);
  margin-bottom: 1.2rem;
`;

const CodeExample = styled.pre`
  background-color: #f5f5f5;
  padding: 0.5rem;
  border-radius: 4px;
  font-family: monospace;
  font-size: 0.9rem;
  overflow-x: auto;
  margin: 0.5rem 0;
`;

const PropertyValue = styled.div`
  font-family: monospace;
  background-color: #f5f5f5;
  padding: 0.5rem;
  border-radius: 4px;
  margin-top: 0.5rem;
  border: 1px solid #ddd;
`;

const SuggestionList = styled.ul`
  margin: 0.5rem 0;
  padding-left: 1.5rem;
`;

// Define attribute descriptions
const DESCRIPTIONS: Record<string, string> = {
  'id': "Identifiant unique pour l'élément. Utile pour le ciblage CSS et JavaScript.",
  'class': "Classes CSS pour appliquer des styles. Peut contenir plusieurs classes séparées par des espaces.",
  'href': "Adresse vers laquelle le lien pointe. Peut être une URL ou un lien interne (#section).",
  'target': "Définit où ouvrir le lien. '_blank' pour une nouvelle fenêtre.",
  'src': "Source de l'image ou de la vidéo. URL vers le fichier.",
  'alt': "Texte alternatif décrivant l'image. Important pour l'accessibilité.",
  'type': "Type de l'élément input ou du bouton (text, number, submit, etc).",
  'placeholder': "Texte d'exemple affiché dans les champs de formulaire vides.",
  'value': "Valeur par défaut pour les éléments de formulaire.",
  'name': "Nom de l'élément, utilisé lors de la soumission de formulaires.",
  'required': "Indique si un champ de formulaire doit être obligatoirement rempli.",
  'disabled': "Désactive un élément interactif comme un bouton ou un input.",
  'rows': "Nombre de lignes visibles dans un textarea.",
  'cols': "Nombre de colonnes visibles dans un textarea."
};

// Style properties organized by category
const STYLE_PROPERTIES: Record<string, string[]> = {
  'Dimensions': [
    'width', 
    'height', 
    'min-width', 
    'max-width', 
    'min-height', 
    'max-height'
  ],
  'Marges et espacement': [
    'margin', 
    'margin-top', 
    'margin-right', 
    'margin-bottom', 
    'margin-left',
    'padding', 
    'padding-top', 
    'padding-right', 
    'padding-bottom', 
    'padding-left'
  ],
  'Bordure': [
    'border', 
    'border-width', 
    'border-style', 
    'border-color',
    'border-radius',
    'border-top', 
    'border-right', 
    'border-bottom', 
    'border-left'
  ],
  'Positionnement': [
    'position', 
    'top', 
    'right', 
    'bottom', 
    'left',
    'z-index',
    'display',
    'float',
    'clear'
  ],
  'Arrière-plan': [
    'background-color', 
    'background-image', 
    'background-repeat', 
    'background-position',
    'background-size'
  ],
  'Typographie': [
    'color', 
    'font-family', 
    'font-size', 
    'font-weight', 
    'line-height',
    'text-align', 
    'text-decoration', 
    'text-transform'
  ],
  'Flexbox': [
    'flex-direction', 
    'justify-content', 
    'align-items', 
    'flex-wrap',
    'gap'
  ],
  'Effets': [
    'opacity', 
    'box-shadow', 
    'text-shadow', 
    'transform',
    'transition'
  ]
};

const PREDEFINED_OPTIONS: Record<string, string[]> = {
  display: ["block", "inline", "inline-block", "flex", "grid", "none"],
  position: ["static", "relative", "absolute", "fixed", "sticky"],
  "text-align": ["left", "center", "right", "justify"],
  "font-weight": ["normal", "bold", "lighter", "bolder", "100", "200", "300", "400", "500", "600", "700", "800", "900"],
  "font-family": [
    "Arial, sans-serif", 
    "Helvetica, sans-serif", 
    "Times New Roman, serif", 
    "Georgia, serif", 
    "Courier New, monospace", 
    "Verdana, sans-serif"
  ],
  "border-style": ["none", "solid", "dashed", "dotted", "double"],
  target: ["_blank", "_self", "_parent", "_top"],
  type: ["button", "submit", "reset", "text", "checkbox", "radio", "number", "email", "password"]
};

// Helper functions
const hexToRgb = (hex: string) => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
      }
    : { r: 0, g: 0, b: 0 };
};

// Définir une interface pour le type des interactions de classe
interface ClassInteraction {
  class: string;
  count: number;
}

const ElementProperties: React.FC<ElementPropertiesProps> = ({ onToggle }) => {
  const { state, updateSelectedElement, updateHTML, saveProject, updateCSS, updateJS } = useAppState();
  const selectedElement = state.selectedElement;
  const [activeTab, setActiveTab] = useState<'html' | 'css' | 'js'>('html');
  const [showDescriptions, setShowDescriptions] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);

  // Fonction qui analyse et extrait les propriétés HTML de l'élément
  const getHtmlProperties = () => {
    if (!selectedElement) return {};
    return selectedElement.properties || {};
  };

  // Fonction qui analyse le CSS et extrait les styles appliqués à l'élément
  const getCssProperties = () => {
    if (!selectedElement || !state.currentProject) return { inline: {}, external: {} };
    
    // Styles inline
      const styleAttr = selectedElement.properties.style || '';
      const extractedStyles: Record<string, string> = {};
      
      // Analyser l'attribut style
      styleAttr.split(';').forEach(declaration => {
        const [property, value] = declaration.split(':').map(s => s.trim());
        if (property && value) {
          extractedStyles[property] = value;
        }
      });
      
    // Styles depuis le CSS du projet
    const cssRules = parseCSS(state.currentProject.css);
    const cssStyles = findStylesForElement(cssRules, selectedElement);
    
    return { inline: extractedStyles, external: cssStyles };
  };

  // Fonction qui analyse les possibles interactions JS avec l'élément
  const getJsInteractions = () => {
    if (!selectedElement || !state.currentProject) return [];
    
    const interactions = [];
    
    // Rechercher des attributs d'événements
    const eventAttributes = Object.entries(selectedElement.properties || {})
      .filter(([key]) => key.startsWith('on'))
      .map(([key, value]) => ({ event: key, handler: value }));
    
    if (eventAttributes.length > 0) {
      interactions.push({
        type: 'eventAttributes',
        details: eventAttributes
      });
    }
    
    // Rechercher des sélecteurs potentiels dans le JS
    const jsCode = state.currentProject.javascript || '';
    
    // Chercher des sélecteurs par ID
    if (selectedElement.properties.id) {
      const idPattern = new RegExp(`getElementById\\(['"']${selectedElement.properties.id}['"']\\)|querySelector\\(['"']#${selectedElement.properties.id}['"']\\)`, 'g');
      const idMatches = jsCode.match(idPattern);
      
      if (idMatches && idMatches.length > 0) {
        interactions.push({
          type: 'idSelector',
          count: idMatches.length,
          id: selectedElement.properties.id
        });
      }
    }
    
    // Chercher des sélecteurs par classe
    if (selectedElement.properties.class) {
      const classes = selectedElement.properties.class.split(' ');
      const classInteractions: ClassInteraction[] = []; // Spécifier le type
      
      classes.forEach(cls => {
        const classPattern = new RegExp(`getElementsByClassName\\(['"']${cls}['"']\\)|querySelector\\(['"']\\.${cls}['"']\\)`, 'g');
        const classMatches = jsCode.match(classPattern);
        
        if (classMatches && classMatches.length > 0) {
          classInteractions.push({
            class: cls,
            count: classMatches.length
          });
        }
      });
      
      if (classInteractions.length > 0) {
        interactions.push({
          type: 'classSelector',
          details: classInteractions
        });
      }
    }
    
    return interactions;
  };

  // Fonction pour extraire les styles CSS (existante)
  const parseCSS = (cssText: string): Record<string, Record<string, string>> => {
    const result: Record<string, Record<string, string>> = {};
    
    // Regex simplifiée pour extraire les sélecteurs et les règles
    const regex = /([^{]+)\s*{\s*([^}]+)\s*}/g;
    let match;
    
    while ((match = regex.exec(cssText)) !== null) {
      const selector = match[1].trim();
      const rulesText = match[2].trim();
      
      // Analyser les règles
      const rules: Record<string, string> = {};
      rulesText.split(';').forEach(rule => {
        const [property, value] = rule.split(':').map(s => s.trim());
        if (property && value) {
          rules[property] = value;
        }
      });
      
      result[selector] = rules;
    }
    
    return result;
  };
  
  // Fonction pour trouver les styles correspondant à un élément (existante)
  const findStylesForElement = (cssRules: Record<string, Record<string, string>>, element: any): Record<string, string> => {
    const styles: Record<string, string> = {};
    
    // Vérifier les sélecteurs qui pourraient correspondre à l'élément
    Object.entries(cssRules).forEach(([selector, rules]) => {
      let matches = false;
      
      // Vérifier si le sélecteur correspond à l'élément
      if (selector.startsWith('.') && element.properties.class) {
        // Sélecteur de classe
        const className = selector.substring(1);
        const classes = element.properties.class.split(' ');
        if (classes.includes(className)) {
          matches = true;
        }
      } else if (selector.startsWith('#') && element.properties.id) {
        // Sélecteur d'ID
        const id = selector.substring(1);
        if (element.properties.id === id) {
          matches = true;
        }
      } else if (selector.toLowerCase() === element.type.toLowerCase()) {
        // Sélecteur de type
        matches = true;
      }
      
      // Si le sélecteur correspond, ajouter ses règles
      if (matches) {
        Object.assign(styles, rules);
      }
    });
    
    return styles;
  };
  
  if (!selectedElement) {
    return (
      <PropertiesContainer>
        <Header>
          <Title>Guide des propriétés</Title>
        </Header>
        
        <NoElementSelected>
          <svg width="100" height="100" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 16.99V17M12 7V14M12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21Z" stroke="#9ca3af" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <h3>Aucun élément sélectionné</h3>
          <p>Cliquez sur un élément dans l'aperçu pour afficher ses propriétés et les explications associées.</p>
        </NoElementSelected>
      </PropertiesContainer>
    );
  }
  
  return (
    <PropertiesContainer ref={containerRef}>
      <Header>
        <Title>Guide des propriétés</Title>
      </Header>
      
      <ElementTypeBadge>{selectedElement.type}</ElementTypeBadge>
      
      <TabsContainer>
        <Tab active={activeTab === 'html'} onClick={() => setActiveTab('html')}>
          HTML
        </Tab>
        <Tab active={activeTab === 'css'} onClick={() => setActiveTab('css')}>
          CSS
        </Tab>
        <Tab active={activeTab === 'js'} onClick={() => setActiveTab('js')}>
          JavaScript
        </Tab>
      </TabsContainer>
      
      <SettingsContainer>
        <PropertyLabel>
          <input 
            type="checkbox" 
            checked={showDescriptions} 
            onChange={(e) => setShowDescriptions(e.target.checked)}
          />
          <span style={{ marginLeft: '5px' }}>Afficher les explications détaillées</span>
        </PropertyLabel>
      </SettingsContainer>
      
      {activeTab === 'html' && (
        <PropertiesSection>
          <SectionTitle>Propriétés HTML</SectionTitle>
          <HelpText>
            Les attributs HTML définissent le comportement et les fonctionnalités de l'élément sélectionné.
            Voici les attributs actuellement définis pour cet élément de type <strong>{selectedElement.type}</strong>.
          </HelpText>
          
          {Object.entries(getHtmlProperties()).length > 0 ? (
            <>
              {Object.entries(getHtmlProperties()).map(([attr, value]) => (
            <PropertyGroup key={attr}>
              <PropertyLabel htmlFor={`attr-${attr}`}>
                {attr}
                {attr in DESCRIPTIONS && (
                  <PropertyInfoIcon title={DESCRIPTIONS[attr as keyof typeof DESCRIPTIONS]}>ℹ️</PropertyInfoIcon>
                )}
              </PropertyLabel>
              
              {showDescriptions && attr in DESCRIPTIONS && (
                <PropertyDescription>
                  {DESCRIPTIONS[attr as keyof typeof DESCRIPTIONS]}
                </PropertyDescription>
              )}
              
                  <PropertyValue>
                    {value as string}
                  </PropertyValue>
                </PropertyGroup>
              ))}
            </>
          ) : (
            <InfoBox>
              Cet élément n'a pas d'attributs HTML définis actuellement.
            </InfoBox>
          )}
          
          <InfoBox>
            <CategoryTitle>Comment ajouter des attributs HTML</CategoryTitle>
            <PropertyDescription>
              Pour ajouter des attributs HTML à cet élément, modifiez directement le code HTML dans l'éditeur. 
              Par exemple, pour ajouter un attribut id à cet élément {selectedElement.type}, ajoutez:
            </PropertyDescription>
            <CodeExample>{`<${selectedElement.type} id="mon-id" ...>`}</CodeExample>
            
            <CategoryTitle>Attributs recommandés pour les éléments {selectedElement.type}</CategoryTitle>
            <SuggestionList>
              {getRelevantAttributeSuggestions(selectedElement.type).map((attr, index) => (
                <li key={index}>
                  <strong>{attr.name}</strong>: {attr.description}
                  {attr.example && <CodeExample>{attr.example}</CodeExample>}
                </li>
              ))}
            </SuggestionList>
          </InfoBox>
        </PropertiesSection>
      )}
      
      {activeTab === 'css' && (
        <PropertiesSection>
          <SectionTitle>Styles CSS</SectionTitle>
          <HelpText>
            Les propriétés CSS définissent l'apparence et la mise en page de l'élément sélectionné.
            Voici les styles actuellement appliqués à cet élément.
          </HelpText>
          
          <div style={{ marginBottom: '1.5rem' }}>
            <CategoryTitle>Styles inline (attribut style)</CategoryTitle>
            {Object.entries(getCssProperties().inline).length > 0 ? (
              <>
                {Object.entries(getCssProperties().inline).map(([property, value]) => (
                <PropertyGroup key={property}>
                    <PropertyLabel>{property}</PropertyLabel>
                    <PropertyValue>{value}</PropertyValue>
              </PropertyGroup>
            ))}
                <CodeExample>{`<${selectedElement.type} style="${Object.entries(getCssProperties().inline).map(([prop, val]) => `${prop}: ${val}`).join('; ')}">`}</CodeExample>
              </>
            ) : (
              <InfoBox>
                Cet élément n'a pas de styles inline définis.
              </InfoBox>
            )}
          </div>
          
          <div style={{ marginBottom: '1.5rem' }}>
            <CategoryTitle>Styles externes (fichier CSS)</CategoryTitle>
            {Object.entries(getCssProperties().external).length > 0 ? (
              <>
                {Object.entries(getCssProperties().external).map(([property, value]) => (
                  <PropertyGroup key={property}>
                    <PropertyLabel>{property}</PropertyLabel>
                    <PropertyValue>{value}</PropertyValue>
                  </PropertyGroup>
                ))}
                
            <PropertyDescription>
                  Ces styles sont appliqués via des sélecteurs dans le fichier CSS.
            </PropertyDescription>
              </>
            ) : (
              <InfoBox>
                Cet élément n'a pas de styles définis dans le fichier CSS.
              </InfoBox>
            )}
                          </div>
                          
          <InfoBox>
            <CategoryTitle>Comment ajouter des styles CSS</CategoryTitle>
            <PropertyDescription>
              <strong>1. Style inline :</strong> Ajoutez directement l'attribut style dans le HTML.
            </PropertyDescription>
            <CodeExample>{`<${selectedElement.type} style="color: blue; font-size: 16px;">`}</CodeExample>
            
            <PropertyDescription>
              <strong>2. Style externe :</strong> Utilisez un sélecteur et définissez les propriétés dans le fichier CSS.
            </PropertyDescription>
            {selectedElement.properties.id ? (
              <CodeExample>{`#${selectedElement.properties.id} {
  color: blue;
  font-size: 16px;
}`}</CodeExample>
            ) : selectedElement.properties.class ? (
              <CodeExample>{`.${selectedElement.properties.class.split(' ')[0]} {
  color: blue;
  font-size: 16px;
}`}</CodeExample>
            ) : (
              <CodeExample>{`${selectedElement.type} {
  color: blue;
  font-size: 16px;
}`}</CodeExample>
            )}
            
            <CategoryTitle>Propriétés CSS recommandées pour les éléments {selectedElement.type}</CategoryTitle>
            <SuggestionList>
              {getRelevantCssSuggestions(selectedElement.type).map((prop, index) => (
                <li key={index}>
                  <strong>{prop.name}</strong>: {prop.description}
                  {prop.example && <CodeExample>{prop.example}</CodeExample>}
                </li>
              ))}
            </SuggestionList>
          </InfoBox>
        </PropertiesSection>
      )}
      
      {activeTab === 'js' && (
        <PropertiesSection>
          <SectionTitle>Interactions JavaScript</SectionTitle>
          <HelpText>
            Le JavaScript permet d'ajouter de l'interactivité à votre page web.
            Voici comment vous pouvez interagir avec cet élément {selectedElement.type} via JavaScript.
          </HelpText>
          
          <div style={{ marginBottom: '1.5rem' }}>
            <CategoryTitle>Interactions JavaScript actuelles</CategoryTitle>
            {getJsInteractions().length > 0 ? (
              <>
                {getJsInteractions().map((interaction, index) => (
                  <PropertyGroup key={index}>
                    {interaction.type === 'eventAttributes' && interaction.details && (
                      <>
                        <PropertyLabel>Attributs d'événements</PropertyLabel>
                        <PropertyDescription>
                          Cet élément possède les gestionnaires d'événements suivants définis directement dans le HTML:
                        </PropertyDescription>
                        {interaction.details.map((event: any, idx: number) => (
                          <div key={idx}>
                            <CodeExample>{`<${selectedElement.type} ${event.event}="${event.handler}">`}</CodeExample>
                          </div>
                        ))}
                      </>
                    )}
                    
                    {interaction.type === 'idSelector' && (
                      <>
                        <PropertyLabel>Sélection par ID</PropertyLabel>
                        <PropertyDescription>
                          Cet élément est probablement sélectionné {interaction.count} fois dans le JavaScript via son ID:
                        </PropertyDescription>
                        <CodeExample>{`document.getElementById("${interaction.id}")`}</CodeExample>
                      </>
                    )}
                    
                    {interaction.type === 'classSelector' && interaction.details && (
                      <>
                        <PropertyLabel>Sélection par classe</PropertyLabel>
                        <PropertyDescription>
                          Cet élément est probablement sélectionné via ses classes CSS:
                        </PropertyDescription>
                        {interaction.details.map((classInfo: any, idx: number) => (
                          <div key={idx}>
                            <CodeExample>{`document.getElementsByClassName("${classInfo.class}")`}</CodeExample>
                          </div>
                        ))}
                      </>
                    )}
                  </PropertyGroup>
                ))}
              </>
            ) : (
              <InfoBox>
                Aucune interaction JavaScript n'a été détectée pour cet élément.
              </InfoBox>
            )}
          </div>
          
          <InfoBox>
            <CategoryTitle>Comment ajouter des interactions JavaScript</CategoryTitle>
            <PropertyDescription>
              <strong>1. Via attributs d'événements :</strong> Ajoutez des attributs commençant par "on" directement dans le HTML.
            </PropertyDescription>
            <CodeExample>{`<${selectedElement.type} onclick="maFonction()">`}</CodeExample>
            
            <PropertyDescription>
              <strong>2. Via sélecteurs JavaScript :</strong> Utilisez des méthodes pour sélectionner l'élément dans votre code JavaScript.
            </PropertyDescription>
            
            {selectedElement.properties.id ? (
              <CodeExample>{`// Sélectionner par ID
const element = document.getElementById("${selectedElement.properties.id}");
element.addEventListener("click", function() {
  // Code à exécuter
});`}</CodeExample>
            ) : selectedElement.properties.class ? (
              <CodeExample>{`// Sélectionner par classe
const elements = document.getElementsByClassName("${selectedElement.properties.class.split(' ')[0]}");
elements[0].addEventListener("click", function() {
  // Code à exécuter
});`}</CodeExample>
            ) : (
              <CodeExample>{`// Sélectionner par type d'élément
const elements = document.getElementsByTagName("${selectedElement.type}");
elements[0].addEventListener("click", function() {
  // Code à exécuter
});`}</CodeExample>
            )}
            
            <CategoryTitle>Événements recommandés pour les éléments {selectedElement.type}</CategoryTitle>
            <SuggestionList>
              {getRelevantJsSuggestions(selectedElement.type).map((event, index) => (
                <li key={index}>
                  <strong>{event.name}</strong>: {event.description}
                  {event.example && <CodeExample>{event.example}</CodeExample>}
                </li>
              ))}
            </SuggestionList>
          </InfoBox>
        </PropertiesSection>
      )}
    </PropertiesContainer>
  );
};

// Fonction pour obtenir des suggestions d'attributs HTML pertinents pour un type d'élément
const getRelevantAttributeSuggestions = (elementType: string) => {
  const commonSuggestions = [
    { name: 'id', description: 'Identifiant unique pour l\'élément', example: `<${elementType} id="monId">` },
    { name: 'class', description: 'Classes CSS pour appliquer des styles', example: `<${elementType} class="maClasse">` },
  ];
  
  const specificSuggestions: Record<string, Array<{name: string, description: string, example?: string}>> = {
    'a': [
      { name: 'href', description: 'URL de destination du lien', example: '<a href="https://exemple.com">' },
      { name: 'target', description: 'Où ouvrir le lien', example: '<a target="_blank">' },
      { name: 'rel', description: 'Relation avec la page liée', example: '<a rel="noopener noreferrer">' },
    ],
    'img': [
      { name: 'src', description: 'URL de l\'image', example: '<img src="image.jpg">' },
      { name: 'alt', description: 'Texte alternatif décrivant l\'image', example: '<img alt="Description">' },
      { name: 'width', description: 'Largeur de l\'image en pixels', example: '<img width="300">' },
      { name: 'height', description: 'Hauteur de l\'image en pixels', example: '<img height="200">' },
    ],
    'input': [
      { name: 'type', description: 'Type de champ (text, email, number...)', example: '<input type="text">' },
      { name: 'name', description: 'Nom du champ pour les formulaires', example: '<input name="username">' },
      { name: 'placeholder', description: 'Texte d\'aide affiché quand le champ est vide', example: '<input placeholder="Entrez votre nom">' },
      { name: 'required', description: 'Rend le champ obligatoire', example: '<input required>' },
    ],
    'button': [
      { name: 'type', description: 'Type de bouton (button, submit, reset)', example: '<button type="submit">' },
      { name: 'disabled', description: 'Désactive le bouton', example: '<button disabled>' },
    ],
    'form': [
      { name: 'action', description: 'URL où envoyer les données du formulaire', example: '<form action="/submit">' },
      { name: 'method', description: 'Méthode HTTP à utiliser (GET ou POST)', example: '<form method="post">' },
    ],
  };
  
  return [...commonSuggestions, ...(specificSuggestions[elementType] || [])];
};

// Fonction pour obtenir des suggestions de propriétés CSS pertinentes pour un type d'élément
const getRelevantCssSuggestions = (elementType: string) => {
  const commonSuggestions = [
    { name: 'color', description: 'Couleur du texte', example: 'color: #333;' },
    { name: 'font-size', description: 'Taille de police', example: 'font-size: 16px;' },
    { name: 'margin', description: 'Marge extérieure', example: 'margin: 10px;' },
    { name: 'padding', description: 'Marge intérieure', example: 'padding: 10px;' },
  ];
  
  const specificSuggestions: Record<string, Array<{name: string, description: string, example?: string}>> = {
    'div': [
      { name: 'display', description: 'Type d\'affichage (block, flex, grid...)', example: 'display: flex;' },
      { name: 'width', description: 'Largeur de l\'élément', example: 'width: 100%;' },
      { name: 'height', description: 'Hauteur de l\'élément', example: 'height: 200px;' },
    ],
    'a': [
      { name: 'text-decoration', description: 'Décoration du texte', example: 'text-decoration: none;' },
      { name: 'color', description: 'Couleur du lien', example: 'color: blue;' },
    ],
    'img': [
      { name: 'max-width', description: 'Largeur maximale', example: 'max-width: 100%;' },
      { name: 'border-radius', description: 'Arrondissement des coins', example: 'border-radius: 5px;' },
    ],
    'button': [
      { name: 'background-color', description: 'Couleur de fond', example: 'background-color: #007bff;' },
      { name: 'border', description: 'Bordure', example: 'border: none;' },
      { name: 'cursor', description: 'Type de curseur', example: 'cursor: pointer;' },
    ],
    'input': [
      { name: 'border', description: 'Bordure', example: 'border: 1px solid #ccc;' },
      { name: 'padding', description: 'Espacement interne', example: 'padding: 8px 12px;' },
      { name: 'outline', description: 'Contour lors du focus', example: 'outline: none;' },
    ],
  };
  
  return [...commonSuggestions, ...(specificSuggestions[elementType] || [])];
};

// Fonction pour obtenir des suggestions d'événements JS pertinents pour un type d'élément
const getRelevantJsSuggestions = (elementType: string) => {
  const commonSuggestions = [
    { name: 'click', description: 'Déclenché lorsque l\'élément est cliqué', example: 'element.addEventListener("click", function() { /* code */ });' },
    { name: 'mouseover', description: 'Déclenché lorsque la souris passe sur l\'élément', example: 'element.addEventListener("mouseover", function() { /* code */ });' },
  ];
  
  const specificSuggestions: Record<string, Array<{name: string, description: string, example?: string}>> = {
    'a': [
      { name: 'click', description: 'Pour intercepter un clic sur le lien', example: 'element.addEventListener("click", function(e) { e.preventDefault(); /* code */ });' },
    ],
    'form': [
      { name: 'submit', description: 'Déclenché lors de la soumission du formulaire', example: 'element.addEventListener("submit", function(e) { e.preventDefault(); /* code */ });' },
    ],
    'input': [
      { name: 'input', description: 'Déclenché lors de la saisie', example: 'element.addEventListener("input", function() { /* code */ });' },
      { name: 'change', description: 'Déclenché lorsque la valeur est modifiée', example: 'element.addEventListener("change", function() { /* code */ });' },
      { name: 'focus', description: 'Déclenché lorsque l\'élément reçoit le focus', example: 'element.addEventListener("focus", function() { /* code */ });' },
      { name: 'blur', description: 'Déclenché lorsque l\'élément perd le focus', example: 'element.addEventListener("blur", function() { /* code */ });' },
    ],
    'button': [
      { name: 'click', description: 'Déclenché lorsque le bouton est cliqué', example: 'element.addEventListener("click", function() { /* code */ });' },
    ],
  };
  
  return [...commonSuggestions, ...(specificSuggestions[elementType] || [])];
};

export default ElementProperties; 