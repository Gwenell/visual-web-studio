import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useAppState } from '../contexts/AppContext';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { Project } from '../types/types';

const HomeContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  position: relative;
`;

const Header = styled.header`
  text-align: center;
  margin-bottom: 3rem;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  margin-bottom: 0.5rem;
  color: var(--primary-color);
`;

const Subtitle = styled.p`
  font-size: 1.2rem;
  color: var(--text-color-secondary);
  margin-bottom: 2rem;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin: 2rem 0;
`;

const Button = styled(motion.button)`
  padding: 0.8rem 1.5rem;
  font-size: 1rem;
  border-radius: var(--border-radius);
  cursor: pointer;
  
  &.primary {
    background-color: var(--accent-color);
    color: white;
    border: none;
  }
  
  &.secondary {
    background-color: transparent;
    color: var(--secondary-color);
    border: 1px solid var(--secondary-color);
  }
`;

// Ajout d'un composant modal pour le choix du type de projet
const ProjectChoiceModal = styled.div<{ isVisible: boolean }>`
  display: ${props => props.isVisible ? 'flex' : 'none'};
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background-color: white;
  padding: 2rem;
  border-radius: 8px;
  width: 500px;
  max-width: 90%;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
`;

const ModalTitle = styled.h2`
  margin-top: 0;
  color: #333;
  font-size: 1.5rem;
  margin-bottom: 1.5rem;
`;

const ProjectOptionContainer = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
`;

const ProjectOption = styled.div`
  flex: 1;
  padding: 1.5rem;
  border: 2px solid #e0e0e0;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s;
  text-align: center;

  &:hover {
    border-color: #4caf50;
    background-color: #f5f5f5;
  }
`;

const OptionTitle = styled.h3`
  margin-top: 0;
  color: #333;
  font-size: 1.2rem;
`;

const OptionDescription = styled.p`
  color: #666;
  margin-bottom: 0;
`;

const CloseButton = styled.button`
  background-color: #f5f5f5;
  color: #333;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;
  margin-right: 1rem;

  &:hover {
    background-color: #e0e0e0;
  }
`;

const ProjectsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
  margin-top: 2rem;
`;

const ProjectCard = styled.div`
  background-color: white;
  border-radius: 8px;
  padding: 1.5rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  transition: transform 0.2s, box-shadow 0.2s;
  position: relative;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
  }
`;

const ProjectTitle = styled.h3`
  margin-top: 0;
  color: #000000;
  font-size: 1.2rem;
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 1rem;
`;

const ActionButton = styled(motion.button)`
  padding: 0.8rem 1.5rem;
  font-size: 1rem;
  border-radius: var(--border-radius);
  cursor: pointer;
  
  &.secondary {
    background-color: transparent;
    color: var(--secondary-color);
    border: 1px solid var(--secondary-color);
  }
  
  &.danger {
    background-color: transparent;
    color: #f44336;
    border: 1px solid #f44336;
  }
`;

const EmptyProjectsMessage = styled.div`
  text-align: center;
  color: var(--text-color-secondary);
  margin: 3rem 0;
  grid-column: 1 / -1;
`;

// Add a new styled component for the drag overlay
const DragOverlay = styled.div<{ isActive: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: 2000;
  opacity: ${props => props.isActive ? 1 : 0};
  visibility: ${props => props.isActive ? 'visible' : 'hidden'};
  transition: opacity 0.3s, visibility 0.3s;
  color: white;
  font-size: 1.5rem;
  text-align: center;
  
  & svg {
    font-size: 4rem;
    margin-bottom: 1rem;
  }
`;

// Add a styled component for the file input (hidden)
const HiddenFileInput = styled.input`
  display: none;
`;

// Composants pour la confirmation de suppression
const DeleteConfirmation = styled.div<{ isVisible: boolean }>`
  display: ${props => props.isVisible ? 'block' : 'none'};
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  z-index: 1000;
  width: 350px;
  max-width: 90%;
`;

const DeleteOverlay = styled.div<{ isVisible: boolean }>`
  display: ${props => props.isVisible ? 'block' : 'none'};
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 999;
`;

const HomePage: React.FC = () => {
  const { state, createNewProject, deleteProject, importProject } = useAppState();
  const navigate = useNavigate();

  // Add ref for file input
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  // Add state for drag & drop
  const [dragActive, setDragActive] = useState(false);

  // État pour gérer l'affichage de la modal
  const [modalVisible, setModalVisible] = useState(false);
  const [projectName, setProjectName] = useState('');
  const [projectType, setProjectType] = useState<'empty' | 'examples' | null>(null);
  const [nameError, setNameError] = useState('');
  const [projectTypeError, setProjectTypeError] = useState('');
  
  // Déplacer ici les états pour la confirmation de suppression
  const [projectToDelete, setProjectToDelete] = useState<string | null>(null);
  const [deleteConfirmVisible, setDeleteConfirmVisible] = useState(false);

  // Fonction pour ouvrir la modal
  const openProjectChoiceModal = () => {
    setModalVisible(true);
    setProjectName('');
    setProjectType(null);
    setNameError('');
    setProjectTypeError('');
  };

  // Fonction pour fermer la modal
  const closeProjectChoiceModal = () => {
    setModalVisible(false);
  };

  // Fonction pour sélectionner le type de projet
  const selectProjectType = (type: 'empty' | 'examples') => {
    setProjectType(type);
  };

  // Gérer la création d'un nouveau projet
  const handleCreateProject = async () => {
    if (!projectName.trim()) {
      setNameError('Veuillez entrer un nom de projet');
      return;
    }
    
    if (!projectType) {
      return;
    }
    
    const newProject = await createNewProject(projectName, projectType);
    if (newProject) {
      closeProjectChoiceModal();
      // Naviguer vers l'éditeur avec le bon projet spécifié dans l'URL
      navigate(`/editor?project=${newProject.id}`);
    }
  };

  // 2. Remplacer la fonction handleDeleteProject par une nouvelle version qui affiche une confirmation
  const handleDeleteProject = (projectId: string) => {
    setProjectToDelete(projectId);
    setDeleteConfirmVisible(true);
  };

  // 4. Ajouter une fonction pour confirmer la suppression
  const confirmDelete = () => {
    if (projectToDelete) {
      deleteProject(projectToDelete);
      setProjectToDelete(null);
      setDeleteConfirmVisible(false);
    }
  };

  // 5. Ajouter une fonction pour annuler la suppression
  const cancelDelete = () => {
    setProjectToDelete(null);
    setDeleteConfirmVisible(false);
  };

  // Add handler for file input change
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
  
  // Add handler for file import
  const handleFileImport = async (file: File) => {
    if (!file.name.endsWith('.zip')) {
      alert('Veuillez sélectionner un fichier .zip');
      return;
    }
    
    const success = await importProject(file);
    if (success) {
      navigate('/editor');
    }
  };
  
  // Add drag & drop handlers
  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(true);
  };
  
  const handleDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(true);
  };
  
  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
  };
  
  const handleDrop = async (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const file = e.dataTransfer.files[0];
      await handleFileImport(file);
    }
  };
  
  // Add global event listeners for drag & drop
  useEffect(() => {
    const handleWindowDragOver = (e: DragEvent) => {
      e.preventDefault();
    };
    
    const handleWindowDrop = (e: DragEvent) => {
      e.preventDefault();
    };
    
    window.addEventListener('dragover', handleWindowDragOver);
    window.addEventListener('drop', handleWindowDrop);
    
    return () => {
      window.removeEventListener('dragover', handleWindowDragOver);
      window.removeEventListener('drop', handleWindowDrop);
    };
  }, []);

  return (
    <HomeContainer
      onDragOver={handleDragOver}
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <Header>
        <Title>Web IDE</Title>
        <Subtitle>
          Créez, modifiez et prévisualisez vos projets web directement dans votre navigateur.
        </Subtitle>
        <ButtonContainer>
          <Button 
            className="primary"
            onClick={openProjectChoiceModal}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Créer un Nouveau Projet
          </Button>
          
          <HiddenFileInput 
            type="file" 
            ref={fileInputRef}
            accept=".zip"
            onChange={handleFileSelect}
          />
          
          <Button 
            className="secondary"
            onClick={() => fileInputRef.current?.click()}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            style={{ marginRight: '0.5rem' }}
          >
            Ouvrir un Projet
          </Button>
          
          <motion.div
            style={{ display: 'inline-block' }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link 
              to="/documentation" 
              className="secondary"
              style={{
                padding: '0.8rem 1.5rem',
                fontSize: '1rem',
                borderRadius: 'var(--border-radius)',
                cursor: 'pointer',
                backgroundColor: 'transparent',
                color: 'var(--secondary-color)',
                border: '1px solid var(--secondary-color)',
                textDecoration: 'none',
                display: 'inline-block'
              }}
            >
              Documentation
            </Link>
          </motion.div>
        </ButtonContainer>
      </Header>

      {/* Modal de choix du type de projet */}
      <ProjectChoiceModal isVisible={modalVisible}>
        <ModalContent>
          <ModalTitle>Créer un nouveau projet</ModalTitle>
          
          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>
              Nom du projet:
            </label>
            <input 
              type="text"
              value={projectName}
              onChange={(e) => {
                setProjectName(e.target.value);
                setNameError('');
              }}
              placeholder="Entrez un nom pour votre projet"
              style={{ 
                width: '100%', 
                padding: '0.8rem', 
                borderRadius: '4px',
                border: nameError ? '1px solid #f44336' : '1px solid #ddd'
              }}
            />
            {nameError && (
              <p style={{ color: '#f44336', margin: '0.5rem 0 0', fontSize: '0.9rem' }}>
                {nameError}
              </p>
            )}
          </div>
          
          <ProjectOptionContainer>
            <ProjectOption 
              onClick={() => selectProjectType('empty')}
              style={{ 
                borderColor: projectType === 'empty' ? 'var(--accent-color)' : '#e0e0e0',
                backgroundColor: projectType === 'empty' ? '#f9f9f9' : 'white'
              }}
            >
              <OptionTitle>Projet vide</OptionTitle>
              <OptionDescription>
                Commencez avec un template minimaliste contenant une structure HTML de base.
              </OptionDescription>
            </ProjectOption>
            <ProjectOption 
              onClick={() => selectProjectType('examples')}
              style={{ 
                borderColor: projectType === 'examples' ? 'var(--accent-color)' : '#e0e0e0',
                backgroundColor: projectType === 'examples' ? '#f9f9f9' : 'white'
              }}
            >
              <OptionTitle>Projet avec exemples</OptionTitle>
              <OptionDescription>
                Commencez avec un projet complet montrant divers éléments HTML et leurs styles.
              </OptionDescription>
            </ProjectOption>
          </ProjectOptionContainer>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <CloseButton onClick={closeProjectChoiceModal}>Annuler</CloseButton>
            <button
              onClick={handleCreateProject}
              disabled={!projectType || !projectName.trim()}
              style={{
                backgroundColor: (!projectType || !projectName.trim()) ? '#ccc' : 'var(--accent-color)',
                color: 'white',
                border: 'none',
                padding: '0.75rem 1.5rem',
                borderRadius: '4px',
                cursor: (!projectType || !projectName.trim()) ? 'not-allowed' : 'pointer',
                fontWeight: 'bold'
              }}
            >
              Créer
            </button>
          </div>
        </ModalContent>
      </ProjectChoiceModal>

      <h2>Mes Projets</h2>
      <ProjectsContainer>
        {state.projects.map((project: Project) => (
          <ProjectCard key={project.id}>
            <ProjectTitle>{project.name || 'Sans titre'}</ProjectTitle>
            <ButtonGroup>
              <ActionButton
                className="secondary"
                onClick={() => {
                  navigate(`/editor?project=${project.id}`);
                }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Ouvrir
              </ActionButton>
              <ActionButton
                className="danger"
                onClick={() => handleDeleteProject(project.id)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Supprimer
              </ActionButton>
            </ButtonGroup>
          </ProjectCard>
        ))}
        {state.projects.length === 0 && (
          <EmptyProjectsMessage>
            Aucun projet. Créez votre premier projet en cliquant sur le bouton "Créer un Nouveau Projet".
          </EmptyProjectsMessage>
        )}
      </ProjectsContainer>
      
      {/* Drag & Drop Overlay */}
      <DragOverlay isActive={dragActive}>
        <div>📂</div>
        <p>Déposez votre fichier .zip ici pour l'importer</p>
      </DragOverlay>
      
      {/* Modal de confirmation de suppression */}
      <DeleteOverlay isVisible={deleteConfirmVisible} onClick={cancelDelete} />
      <DeleteConfirmation isVisible={deleteConfirmVisible}>
        <h3 style={{ marginTop: 0, marginBottom: '1rem' }}>Confirmer la suppression</h3>
        <p>Êtes-vous sûr de vouloir supprimer ce projet ?</p>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '1.5rem' }}>
          <button
            onClick={cancelDelete}
            style={{
              backgroundColor: '#f5f5f5',
              color: '#333',
              border: 'none',
              padding: '0.75rem 1.5rem',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            Annuler
          </button>
          <button
            onClick={confirmDelete}
            style={{
              backgroundColor: '#f44336',
              color: 'white',
              border: 'none',
              padding: '0.75rem 1.5rem',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            Supprimer
          </button>
        </div>
      </DeleteConfirmation>
    </HomeContainer>
  );
};

export default HomePage; 