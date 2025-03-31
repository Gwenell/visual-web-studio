import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate, useSearchParams } from 'react-router-dom';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import CodeMirror from '@uiw/react-codemirror';
import { html } from '@codemirror/lang-html';
import { css } from '@codemirror/lang-css';
import { javascript } from '@codemirror/lang-javascript';
import { useAppState } from '../contexts/AppContext';
import ElementLibrary from '../components/ElementLibrary';
import ElementProperties from '../components/ElementProperties';
import htmlElements from '../data/htmlElements';
import { CSSFramework, EditorTheme } from '../types/types';

const EditorContainer = styled.div`
  display: flex;
  height: 100vh;
  width: 100%;
  background-color: var(--primary-color);
`;

const Sidebar = styled(motion.div)<{ $isOpen: boolean }>`
  width: ${(props) => (props.$isOpen ? '300px' : '0')};
  height: 100%;
  background-color: white;
  box-shadow: 2px 0 10px rgba(0, 0, 0, 0.1);
  overflow-y: auto;
  transition: width 0.3s ease;
  z-index: 10;
`;

const MainContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  height: 100%;
`;

const TopBar = styled.div`
  height: 60px;
  background-color: white;
  border-bottom: 1px solid #e0e0e0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 1.5rem;
`;

const ProjectTitle = styled.h1`
  font-size: 1.2rem;
  color: var(--secondary-color);
  display: flex;
  align-items: center;
`;

const ProjectTitleInput = styled.input`
  font-size: 1.2rem;
  color: var(--secondary-color);
  font-weight: bold;
  border: 1px solid #ddd;
  border-radius: 4px;
  padding: 0.3rem 0.5rem;
  width: 300px;
`;

const EditButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  margin-left: 8px;
  color: #666;
  font-size: 0.9rem;
  display: flex;
  align-items: center;
  
  &:hover {
    color: var(--accent-color);
  }
`;

const ActionButtons = styled.div`
  display: flex;
  gap: 1rem;
`;

const Button = styled.button`
  padding: 0.5rem 1rem;
  border-radius: var(--border-radius);
  border: none;
  cursor: pointer;
  font-size: 0.9rem;
  background-color: var(--secondary-color);
  color: white;
  transition: background-color 0.3s;

  &:hover {
    background-color: #3e3e3e;
  }

  &.primary {
    background-color: var(--accent-color);
    
    &:hover {
      background-color: #b30f32;
    }
  }
`;

const EditorWorkspace = styled.div`
  display: flex;
  flex: 1;
  overflow: hidden;
`;

const CodeEditorContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow: hidden;
`;

const TabsContainer = styled.div`
  display: flex;
  background-color: #f5f5f5;
  border-bottom: 1px solid #e0e0e0;
`;

const Tab = styled.button<{ $active: boolean }>`
  padding: 0.8rem 1.5rem;
  border: none;
  background-color: ${(props) => (props.$active ? 'white' : 'transparent')};
  border-right: 1px solid #e0e0e0;
  font-weight: ${(props) => (props.$active ? 'bold' : 'normal')};
  color: var(--secondary-color);
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: ${(props) => (props.$active ? 'white' : '#e9e9e9')};
  }
`;

const CodeEditorWrapper = styled.div`
  flex: 1;
  overflow: auto;
  padding: 1rem;
  background-color: white;
`;

const PreviewContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  border-left: 1px solid #e0e0e0;
  background-color: white;
`;

const PreviewHeader = styled.div`
  padding: 0.8rem 1.5rem;
  font-weight: bold;
  background-color: #f5f5f5;
  border-bottom: 1px solid #e0e0e0;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const FrameworkSelector = styled.select`
  display: none; /* Caché - nous n'utilisons que CSS pur maintenant */
`;

const PreviewWrapper = styled.div`
  flex: 1;
  overflow: auto;
  position: relative;
`;

const PreviewFrame = styled.iframe`
  width: 100%;
  height: 100%;
  border: none;
`;

const PreviewError = styled.div`
  padding: 20px;
  color: #721c24;
  background-color: #f8d7da;
  border: 1px solid #f5c6cb;
  border-radius: 4px;
  margin: 15px;
`;

const PreviewFallback = styled.div`
  padding: 20px;
  height: 100%;
  overflow: auto;
  background-color: white;
`;

const RightSidebar = styled(motion.div)<{ $isOpen: boolean }>`
  width: ${(props) => (props.$isOpen ? '300px' : '0')};
  height: 100%;
  background-color: white;
  box-shadow: -2px 0 10px rgba(0, 0, 0, 0.1);
  overflow-y: auto;
  transition: width 0.3s ease;
  z-index: 10;
`;

type TabType = 'html' | 'css' | 'javascript';

const EditorPage: React.FC = () => {
  const { projectId: paramProjectId } = useParams<{ projectId: string }>();
  const [searchParams] = useSearchParams();
  const queryProjectId = searchParams.get('project');
  
  const { 
    state, 
    updateHTML, 
    updateCSS, 
    updateJS, 
    updateCSSFramework,
    setEditorTheme, 
    toggleSidebar, 
    saveProject,
    exportProject,
    setSelectedElement,
    importProject,
    loadProject,
    createNewProject
  } = useAppState();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<TabType>('html');
  const [showLibrary, setShowLibrary] = useState(true);
  const [showProperties, setShowProperties] = useState(true);
  const previewFrameRef = useRef<HTMLIFrameElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [previewError, setPreviewError] = useState<string | null>(null);
  const [previewKey, setPreviewKey] = useState(0); // Force re-render of iframe
  
  // Nouveaux états pour l'édition du nom du projet
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [projectName, setProjectName] = useState('');
  const titleInputRef = useRef<HTMLInputElement>(null);
  
  // Ajouter un état pour le mode d'interaction/sélection
  const [interactionMode, setInteractionMode] = useState<'selection' | 'interaction'>('selection');
  
  // State to track unsaved changes
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  
  // Load the project when component mounts or projectId changes
  useEffect(() => {
    // Priorité : URL param > query param
    const projectIdToLoad = paramProjectId || queryProjectId;
    
    if (projectIdToLoad && (!state.currentProject || state.currentProject.id !== projectIdToLoad)) {
      // Vérifier si le projet existe
      const exists = state.projects.some(p => p.id === projectIdToLoad);
      if (exists) {
        // Charger le projet spécifié seulement s'il n'est pas déjà chargé
        loadProject(projectIdToLoad);
        
        // Ne pas utiliser localStorage pour éviter les conflits
        // Uniquement mettre à jour l'URL si nécessaire pour la cohérence
        if (!paramProjectId && queryProjectId) {
          navigate(`/editor?project=${projectIdToLoad}`, { replace: true });
        }
      } else {
        // Si le projet n'existe pas, rediriger vers la page d'accueil
        navigate('/');
      }
    } else if (!state.currentProject) {
      // Créer un nouveau projet uniquement si aucun n'est spécifié et aucun n'est chargé
      createNewProject("Nouveau projet", "empty");
    }
  }, [paramProjectId, queryProjectId, loadProject, navigate, state.projects, createNewProject, state.currentProject]);
  
  // Update the preview whenever the code or framework changes
  useEffect(() => {
    if (!state.currentProject) return;
    
    // Check if the editor is focused
    const editorFocused = document.activeElement?.closest('.cm-editor') !== null;
    
    if (!editorFocused) {
      try {
        updatePreview();
        setPreviewError(null);
      } catch (error) {
        console.error('Erreur de mise à jour de la prévisualisation:', error);
        setPreviewError('Impossible d\'afficher la prévisualisation. Vérifiez votre code pour des erreurs de syntaxe.');
      }
    }
  }, [state.currentProject?.html, state.currentProject?.css, state.currentProject?.javascript, state.currentProject?.cssFramework]);
  
  // Effect pour initialiser le nom du projet quand il change
  useEffect(() => {
    if (state.currentProject?.name) {
      setProjectName(state.currentProject.name);
    }
  }, [state.currentProject?.name]);
  
  // Function to clean HTML to make it more resilient to user syntax errors
  const sanitizeHtml = (htmlContent: string): string => {
    // Make a simple sanitization to help with common syntax errors
    let cleaned = htmlContent;
    
    // Remove any script tags with src attribute to prevent external scripts for security
    cleaned = cleaned.replace(/<script[^>]+src[^>]+>.*?<\/script>/gi, '');
    
    return cleaned;
  };
  
  // Function to update the preview iframe
  const updatePreview = () => {
    if (!previewFrameRef.current || !state.currentProject) return;
    
    const { html, css, javascript, cssFramework } = state.currentProject;
    
    // Clean the HTML
    const cleanedHtml = sanitizeHtml(html);
    
    // Frame content with srcdoc attribute for better browser compatibility
    const frameContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          ${getCSSFrameworkLink(cssFramework)}
          <style>
            ${css}
          </style>
          <style>
            /* Styles de base pour garantir une visualisation minimale */
            body { 
              padding: 15px; 
              font-family: sans-serif; 
              line-height: 1.5;
            }
            /* Style pour les éléments survolés ou sélectionnés */
            .element-highlight {
              outline: 2px dashed #f06292 !important;
              outline-offset: 2px !important;
              position: relative;
            }
            .element-selected {
              outline: 2px solid #dc143c !important;
              outline-offset: 2px !important;
              position: relative;
            }
          </style>
        </head>
        <body>
          ${cleanedHtml}
          <script>
            try {
              ${javascript}
            } catch(error) {
              console.error('Erreur JavaScript:', error);
            }

            // Script pour la sélection d'éléments et la mise à jour
            (function() {
              // Mode d'interaction courant
              const interactionMode = "${interactionMode}";
              
              // Communication avec le parent (IDE)
              const sendMessageToIDE = (type, data) => {
                window.parent.postMessage({ type, data }, '*');
              };

              // Variable pour stocker l'élément actuellement sélectionné
              let selectedElement = null;

              // Ajouter les listeners pour tous les éléments
              const setupElementSelection = () => {
                const allElements = document.querySelectorAll('body *');
                
                allElements.forEach(el => {
                  // Survol de l'élément
                  el.addEventListener('mouseover', (e) => {
                    if (interactionMode === 'selection') {
                      e.stopPropagation();
                      document.querySelectorAll('.element-highlight').forEach(el => 
                        el.classList.remove('element-highlight'));
                      el.classList.add('element-highlight');
                    }
                  });
                  
                  // Sortie du survol
                  el.addEventListener('mouseout', () => {
                    if (interactionMode === 'selection') {
                      el.classList.remove('element-highlight');
                    }
                  });
                  
                  // Clic sur l'élément
                  el.addEventListener('click', (e) => {
                    if (interactionMode === 'selection') {
                      e.stopPropagation();
                      e.preventDefault();
                      
                      document.querySelectorAll('.element-selected').forEach(el => 
                        el.classList.remove('element-selected'));
                      el.classList.add('element-selected');
                      
                      // Stocker l'élément sélectionné
                      selectedElement = el;
                      
                      // Récupérer les informations de l'élément
                      const tagName = el.tagName.toLowerCase();
                      const attributes = {};
                      
                      Array.from(el.attributes).forEach(attr => {
                        attributes[attr.name] = attr.value;
                      });
                      
                      // Envoyer les informations à l'IDE
                      sendMessageToIDE('element-selected', {
                        type: tagName,
                        properties: attributes,
                        content: el.innerHTML
                      });
                    }
                    // En mode interaction, on laisse le comportement normal des éléments
                  });
                });
                
                // Clic sur le body pour désélectionner
                document.body.addEventListener('click', (e) => {
                  if (interactionMode === 'selection' && e.target === document.body) {
                    document.querySelectorAll('.element-selected').forEach(el => 
                      el.classList.remove('element-selected'));
                    selectedElement = null;
                    sendMessageToIDE('element-deselected', {});
                  }
                });
              };
              
              // Gestionnaire de messages pour recevoir les mises à jour depuis l'IDE
              window.addEventListener('message', (event) => {
                if (event.data && event.data.type === 'update-element') {
                  // Si un élément est sélectionné, appliquer les modifications
                  if (selectedElement) {
                    const { attributes, styles, content } = event.data.data;
                    
                    // Mettre à jour les attributs
                    if (attributes) {
                      // Supprimer tous les attributs existants sauf ceux qui sont essentiels
                      Array.from(selectedElement.attributes).forEach(attr => {
                        // Garder les attributs essentiels comme id, class, etc.
                        if (!['id', 'class'].includes(attr.name)) {
                          selectedElement.removeAttribute(attr.name);
                        }
                      });
                      
                      // Ajouter/mettre à jour les nouveaux attributs
                      Object.entries(attributes).forEach(([name, value]) => {
                        selectedElement.setAttribute(name, value);
                      });
                    }
                    
                    // Mettre à jour les styles
                    if (styles) {
                      Object.entries(styles).forEach(([property, value]) => {
                        selectedElement.style[property] = value;
                      });
                    }
                    
                    // Mettre à jour le contenu (si fourni)
                    if (content !== undefined) {
                      selectedElement.innerHTML = content;
                    }
                    
                    // Envoyer une confirmation à l'IDE
                    sendMessageToIDE('update-element-result', { success: true });
                  }
                }
              });
              
              // Exécuter après le chargement complet
              if (document.readyState === 'complete') {
                setupElementSelection();
              } else {
                window.addEventListener('load', setupElementSelection);
              }
            })();
          </script>
        </body>
      </html>
    `;
    
    // Use srcdoc attribute instead of contentDocument for better compatibility
    previewFrameRef.current.srcdoc = frameContent;
  };
  
  // Get the appropriate CSS framework CDN link
  const getCSSFrameworkLink = (framework: CSSFramework): string => {
    switch (framework) {
      case CSSFramework.BOOTSTRAP:
        return '<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">';
      case CSSFramework.TAILWIND:
        return '<link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet">';
      default:
        return '';
    }
  };
  
  // Handle code change by editor tab
  const handleCodeChange = (value: string) => {
    switch (activeTab) {
      case 'html':
        handleHTMLChange(value);
        break;
      case 'css':
        handleCSSChange(value);
        break;
      case 'javascript':
        handleJSChange(value);
        break;
    }
  };
  
  // Get code for the active tab
  const getCodeForActiveTab = (): string => {
    if (!state.currentProject) return '';
    
    switch (activeTab) {
      case 'html':
        return state.currentProject.html;
      case 'css':
        return state.currentProject.css;
      case 'javascript':
        return state.currentProject.javascript;
      default:
        return '';
    }
  };
  
  // Get language extension for CodeMirror based on the active tab
  const getLanguageExtension = () => {
    switch (activeTab) {
      case 'html':
        return html();
      case 'css':
        return css();
      case 'javascript':
        return javascript();
      default:
        return html();
    }
  };
  
  // Handle CSS framework change
  const handleFrameworkChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (state.currentProject) {
      // Toujours définir à PURE_CSS quelle que soit la valeur de l'événement
      updateCSSFramework(state.currentProject.id, CSSFramework.PURE_CSS);
    }
  };
  
  // Export the current project
  const handleExport = async () => {
    try {
      await exportProject();
    } catch (error) {
      console.error('Error exporting project:', error);
      alert('Une erreur est survenue lors de l\'export du projet');
    }
  };
  
  // Toggle element library sidebar
  const toggleLibrary = () => {
    setShowLibrary(!showLibrary);
  };
  
  // Toggle properties sidebar
  const toggleProperties = () => {
    setShowProperties(!showProperties);
  };
  
  // Return to the home page
  const handleHome = () => {
    navigate('/');
  };
  
  const handleDocumentation = () => {
    navigate('/documentation');
  };
  
  // Force refresh the preview
  const handleRefreshPreview = () => {
    setPreviewKey(prevKey => prevKey + 1);
    setTimeout(updatePreview, 100); // Small delay to ensure iframe is reset
  };
  
  // Mettre à jour le gestionnaire de messages pour gérer les mises à jour d'éléments
  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.data && event.data.type) {
        switch (event.data.type) {
          case 'element-selected':
            // Update state with selected element information
            setSelectedElement(event.data.data);
            break;
          case 'element-deselected':
            // Clear selected element
            setSelectedElement(null);
            break;
          case 'update-element-result':
            // Recevoir la confirmation que l'élément a été mis à jour
            console.log('Element updated successfully:', event.data.data);
            break;
          case 'update-editor-code':
            // NOUVEAU: Mettre à jour le code dans l'éditeur pour HTML, CSS et JS
            if (state.currentProject) {
              if (event.data.data.html) {
                updateHTML(state.currentProject.id, event.data.data.html);
                setHasUnsavedChanges(true);
              }
              if (event.data.data.css) {
                updateCSS(state.currentProject.id, event.data.data.css);
                setHasUnsavedChanges(true);
              }
              if (event.data.data.js) {
                updateJS(state.currentProject.id, event.data.data.js);
                setHasUnsavedChanges(true);
              }
              
              // Mettre à jour la prévisualisation après les modifications
              updatePreview();
            }
            break;
        }
      }
    };

    window.addEventListener('message', handleMessage);
    return () => {
      window.removeEventListener('message', handleMessage);
    };
  }, [setSelectedElement, state.currentProject, updateHTML, updateCSS, updateJS, updatePreview]);
  
  // Fonction pour commencer l'édition du titre
  const startEditingTitle = () => {
    setIsEditingTitle(true);
    // Focus l'input après le rendu
    setTimeout(() => {
      if (titleInputRef.current) {
        titleInputRef.current.focus();
        titleInputRef.current.select();
      }
    }, 50);
  };

  // Fonction pour terminer l'édition du titre
  const finishEditingTitle = () => {
    setIsEditingTitle(false);
    // Ne pas sauvegarder si le titre est vide
    if (!projectName.trim()) {
      setProjectName(state.currentProject?.name || '');
      return;
    }
    
    // Mettre à jour le projet si le nom a changé
    if (state.currentProject && projectName !== state.currentProject.name) {
      // Mettre à jour le nom du projet localement
      state.currentProject.name = projectName;
      // Sauvegarder le projet
      saveProject(state.currentProject.id);
    }
  };

  // Gérer la touche Entrée pour confirmer l'édition
  const handleTitleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      finishEditingTitle();
    } else if (e.key === 'Escape') {
      setProjectName(state.currentProject?.name || '');
      setIsEditingTitle(false);
    }
  };
  
  // Save the current project with custom name
  const handleSave = () => {
    if (state.currentProject) {
      // Mettre à jour le nom du projet localement si nécessaire
      if (projectName !== state.currentProject.name) {
        state.currentProject.name = projectName;
      }
      // Sauvegarder le projet
      saveProject(state.currentProject.id);
      setHasUnsavedChanges(false); // Reset unsaved changes flag
    }
  };
  
  // Update the HTML code change handler
  const handleHTMLChange = (value: string) => {
    if (state.currentProject) {
      updateHTML(state.currentProject.id, value);
      setHasUnsavedChanges(true);
    }
  };

  // Update the CSS code change handler
  const handleCSSChange = (value: string) => {
    if (state.currentProject) {
      updateCSS(state.currentProject.id, value);
      setHasUnsavedChanges(true);
    }
  };

  // Update the JS code change handler
  const handleJSChange = (value: string) => {
    if (state.currentProject) {
      updateJS(state.currentProject.id, value);
      setHasUnsavedChanges(true);
    }
  };

  // Update the CSS framework change handler
  const handleCSSFrameworkChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (state.currentProject) {
      // Toujours définir à PURE_CSS quelle que soit la valeur de l'événement
      updateCSSFramework(state.currentProject.id, CSSFramework.PURE_CSS);
    }
  };
  
  // Add a handler for file selection
  const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      await handleFileImport(file);
    }
    
    // Reset the input value to allow selecting the same file again
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  // Add a handler for file import
  const handleFileImport = async (file: File) => {
    if (!file.name.endsWith('.zip')) {
      alert('Veuillez sélectionner un fichier .zip');
      return;
    }
    
    const success = await importProject(file);
    if (success) {
      // Reload the page to show the newly imported project
      window.location.reload();
    }
  };
  
  // Ajouter une fonction pour basculer le mode d'interaction
  const toggleInteractionMode = () => {
    const newMode = interactionMode === 'selection' ? 'interaction' : 'selection';
    setInteractionMode(newMode);
    updatePreview();
  };
  
  // Mise à jour de useEffect pour écouter les changements de mode d'interaction
  useEffect(() => {
    updatePreview();
  }, [interactionMode, state.currentProject?.html, state.currentProject?.css, state.currentProject?.javascript, state.currentProject?.cssFramework]);
  
  // Warn user if they try to leave with unsaved changes
  useEffect(() => {
    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      if (hasUnsavedChanges) {
        event.preventDefault();
        event.returnValue = ''; // Required for Chrome
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [hasUnsavedChanges]);
  
  return (
    <EditorContainer>
      {/* Left sidebar - Element Library */}
      <Sidebar 
        $isOpen={showLibrary}
        initial={{ width: showLibrary ? '300px' : '0' }}
        animate={{ width: showLibrary ? '300px' : '0' }}
      >
        <ElementLibrary elements={htmlElements} onToggle={toggleLibrary} />
      </Sidebar>
      
      {/* Main editor area */}
      <MainContent>
        {/* Top bar with project title and actions */}
        <TopBar>
          <ProjectTitle>
            {isEditingTitle ? (
              <ProjectTitleInput
                ref={titleInputRef}
                value={projectName}
                onChange={(e) => setProjectName(e.target.value)}
                onBlur={finishEditingTitle}
                onKeyDown={handleTitleKeyDown}
                placeholder="Nom du projet"
              />
            ) : (
              <>
                {state.currentProject ? projectName : 'Chargement...'}
                {hasUnsavedChanges && <span style={{ color: 'orange', marginLeft: '5px' }}>*</span>}
                {state.currentProject && (
                  <EditButton onClick={startEditingTitle} title="Modifier le nom">
                    ✏️
                  </EditButton>
                )}
              </>
            )}
          </ProjectTitle>
          <ActionButtons>
            <Button onClick={handleSave}>Sauvegarder</Button>
            <Button onClick={handleExport}>Exporter</Button>
            <Button onClick={handleDocumentation}>Documentation</Button>
            <Button className="primary" onClick={handleHome}>Accueil</Button>
            
            {/* Hidden file input for imports */}
            <input 
              type="file" 
              ref={fileInputRef}
              accept=".zip"
              onChange={handleFileSelect}
              style={{ display: 'none' }}
            />
            
            <Button onClick={() => fileInputRef.current?.click()}>
              Importer
            </Button>
          </ActionButtons>
        </TopBar>
        
        {/* Editor workspace */}
        <EditorWorkspace>
          {/* Code editor */}
          <CodeEditorContainer>
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
                $active={activeTab === 'javascript'} 
                onClick={() => setActiveTab('javascript')}
              >
                JavaScript
              </Tab>
            </TabsContainer>
            <CodeEditorWrapper>
              <CodeMirror
                value={getCodeForActiveTab()}
                height="100%"
                extensions={[getLanguageExtension()]}
                onChange={handleCodeChange}
                theme={state.editorTheme === EditorTheme.DARK ? 'dark' : 'light'}
              />
            </CodeEditorWrapper>
          </CodeEditorContainer>
          
          {/* Preview panel */}
          <PreviewContainer>
            <PreviewHeader>
              <span>Prévisualisation</span>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div style={{ display: 'flex', alignItems: 'center', marginRight: '10px' }}>
                  <input 
                    type="checkbox" 
                    id="interactionToggle" 
                    checked={interactionMode === 'interaction'} 
                    onChange={toggleInteractionMode}
                    style={{ marginRight: '5px' }}
                  />
                  <label htmlFor="interactionToggle">
                    {interactionMode === 'interaction' ? 'Mode interaction' : 'Mode sélection'}
                  </label>
                </div>
                <Button onClick={handleRefreshPreview}>
                  Actualiser
                </Button>
                {/* Framework CSS défini sur Pure CSS uniquement */}
              </div>
            </PreviewHeader>
            <PreviewWrapper>
              {previewError ? (
                <PreviewError>
                  {previewError}
                  <div style={{ marginTop: '10px' }}>
                    <Button onClick={handleRefreshPreview}>Réessayer</Button>
                  </div>
                </PreviewError>
              ) : (
                <PreviewFrame 
                  key={previewKey}
                  ref={previewFrameRef}
                  title="Prévisualisation"
                  sandbox="allow-scripts allow-same-origin"
                />
              )}
            </PreviewWrapper>
          </PreviewContainer>
        </EditorWorkspace>
      </MainContent>
      
      {/* Right sidebar - Element Properties */}
      <RightSidebar 
        $isOpen={showProperties}
        initial={{ width: showProperties ? '300px' : '0' }}
        animate={{ width: showProperties ? '300px' : '0' }}
      >
        <ElementProperties onToggle={toggleProperties} />
      </RightSidebar>
    </EditorContainer>
  );
};

export default EditorPage; 