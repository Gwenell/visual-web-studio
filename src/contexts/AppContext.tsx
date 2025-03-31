import React, { createContext, useState, useContext, useEffect, useRef } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Project, CSSFramework, EditorTheme, AppState } from '../types/types';
import { MockApiService } from '../services/mockApi';
import { useNotification, NotificationType } from '../components/Notification';
import JSZip from 'jszip';
import { saveAs } from 'file-saver';

// Définition des valeurs par défaut pour les nouveaux projets
export const DEFAULT_HTML = `<div class="container">
  <h1>Mon Site Web</h1>
  <p>Bienvenue sur mon site créé avec Web IDE.</p>
</div>`;

export const DEFAULT_CSS = `body {
  font-family: 'Poppins', sans-serif;
  line-height: 1.6;
  color: #333;
  background-color: #f8f9fa;
  margin: 0;
  padding: 0;
}

.container {
  width: 80%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
}

h1 {
  color: #4a5568;
  margin-bottom: 1rem;
}

p {
  margin-bottom: 1.5rem;
}`;

export const DEFAULT_JS = `// Votre code JavaScript ici
document.addEventListener('DOMContentLoaded', () => {
  console.log('Le site est chargé !');
});`;

// Template avec des exemples d'éléments HTML
export const EXAMPLE_HTML = `<!DOCTYPE html>
<html lang="fr">
<head>
  <!-- Les balises meta et title sont normalement dans le <head> mais sont ici à titre d'exemple -->
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Exemples d'éléments HTML</title>
</head>
<body>
  <div class="container">
  <header>
      <h1>Galerie d'Éléments HTML</h1>
      <p>Découvrez et expérimentez avec les différents éléments HTML disponibles.</p>
      <nav>
        <ul>
          <li><a href="#texte">Texte</a></li>
          <li><a href="#tableaux">Tableaux</a></li>
          <li><a href="#formulaires">Formulaires</a></li>
          <li><a href="#media">Média</a></li>
        </ul>
      </nav>
  </header>
  
    <main>
      <section id="texte">
        <h2>Éléments de texte</h2>
        <p>Le HTML offre plusieurs niveaux de titres :</p>
        <h1>Titre H1</h1>
        <h2>Titre H2</h2>
        <h3>Titre H3</h3>
        <h4>Titre H4</h4>
        <h5>Titre H5</h5>
        <h6>Titre H6</h6>
        
        <p>On peut utiliser différentes <em>mises en forme</em> comme <strong>gras</strong>, <em>italique</em>, <u>souligné</u> ou <s>barré</s>.</p>
        
        <blockquote>
          Les citations sont présentées avec l'élément blockquote.
          <cite>- Source de la citation</cite>
        </blockquote>
        
        <pre><code>// L'élément pre préserve les espaces et sauts de ligne
function exemple() {
  return "Code formaté";
}</code></pre>
      </section>

      <section id="listes">
        <h2>Types de listes</h2>
        
        <h3>Liste non ordonnée</h3>
        <ul>
          <li>Élément 1</li>
          <li>Élément 2</li>
          <li>Élément 3 avec sous-liste
            <ul>
              <li>Sous-élément A</li>
              <li>Sous-élément B</li>
            </ul>
          </li>
    </ul>
    
        <h3>Liste ordonnée</h3>
        <ol>
          <li>Première étape</li>
          <li>Deuxième étape</li>
          <li>Troisième étape</li>
        </ol>
        
        <h3>Liste de définitions</h3>
        <dl>
          <dt>HTML</dt>
          <dd>HyperText Markup Language - Langage de balisage pour les pages web</dd>
          <dt>CSS</dt>
          <dd>Cascading Style Sheets - Langage pour styliser les pages HTML</dd>
        </dl>
      </section>

      <section id="tableaux">
        <h2>Tableaux</h2>
        <table border="1">
          <caption>Exemple de tableau</caption>
          <thead>
            <tr>
              <th>En-tête 1</th>
              <th>En-tête 2</th>
              <th>En-tête 3</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Cellule 1,1</td>
              <td>Cellule 1,2</td>
              <td>Cellule 1,3</td>
            </tr>
            <tr>
              <td>Cellule 2,1</td>
              <td>Cellule 2,2</td>
              <td>Cellule 2,3</td>
            </tr>
          </tbody>
          <tfoot>
            <tr>
              <td colspan="3">Pied de tableau</td>
            </tr>
          </tfoot>
        </table>
      </section>

      <section id="formulaires">
        <h2>Formulaires</h2>
        <form action="#" method="post">
          <fieldset>
            <legend>Informations personnelles</legend>
            
            <div class="form-group">
              <label for="name">Nom:</label>
              <input type="text" id="name" name="name" placeholder="Votre nom">
            </div>
            
            <div class="form-group">
              <label for="email">Email:</label>
              <input type="email" id="email" name="email" placeholder="votre@email.com" required>
            </div>
            
            <div class="form-group">
              <label for="password">Mot de passe:</label>
              <input type="password" id="password" name="password">
            </div>
            
            <div class="form-group">
              <label>Genre:</label>
              <label><input type="radio" name="gender" value="male"> Homme</label>
              <label><input type="radio" name="gender" value="female"> Femme</label>
              <label><input type="radio" name="gender" value="other"> Autre</label>
            </div>
            
            <div class="form-group">
              <label>Intérêts:</label>
              <label><input type="checkbox" name="interests" value="html"> HTML</label>
              <label><input type="checkbox" name="interests" value="css"> CSS</label>
              <label><input type="checkbox" name="interests" value="js"> JavaScript</label>
            </div>
            
            <div class="form-group">
              <label for="country">Pays:</label>
              <select id="country" name="country">
                <option value="">Choisir un pays</option>
                <option value="fr">France</option>
                <option value="ca">Canada</option>
                <option value="be">Belgique</option>
                <option value="ch">Suisse</option>
              </select>
            </div>
            
            <div class="form-group">
              <label for="message">Message:</label>
              <textarea id="message" name="message" rows="4" placeholder="Votre message"></textarea>
            </div>
            
            <div class="form-group">
              <label for="color">Couleur préférée:</label>
              <input type="color" id="color" name="color" value="#3498db">
            </div>
            
            <div class="form-group">
              <label for="date">Date:</label>
              <input type="date" id="date" name="date">
            </div>
            
            <div class="form-group">
              <label for="range">Niveau de satisfaction (1-10):</label>
              <input type="range" id="range" name="range" min="1" max="10" value="5">
            </div>
            
            <div class="form-group">
              <button type="submit">Envoyer</button>
              <button type="reset">Réinitialiser</button>
    </div>
          </fieldset>
        </form>
      </section>

      <section id="media">
        <h2>Éléments multimédia</h2>
        
        <h3>Images</h3>
        <figure>
          <img src="https://via.placeholder.com/300x200" alt="Image d'exemple" width="300" height="200">
          <figcaption>Une image d'exemple avec élément figure et figcaption</figcaption>
        </figure>
        
        <h3>Audio</h3>
        <audio controls>
          <source src="#" type="audio/mpeg">
          Votre navigateur ne supporte pas l'élément audio.
        </audio>
        
        <h3>Vidéo</h3>
        <video width="300" height="200" controls>
          <source src="#" type="video/mp4">
          Votre navigateur ne supporte pas l'élément vidéo.
        </video>
        
        <h3>Iframe</h3>
        <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2624.9914410323883!2d2.2922926!3d48.858370699999996!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47e66e2964e34e2d%3A0x8ddca9ee380ef7e0!2sTour%20Eiffel!5e0!3m2!1sfr!2sfr!4v1647263744376!5m2!1sfr!2sfr" width="300" height="200" style="border:0;" allowfullscreen="" loading="lazy"></iframe>
  </section>

      <section id="semantique">
        <h2>Éléments sémantiques</h2>
        <p>Le HTML5 a introduit de nombreux éléments sémantiques comme:</p>
        <ul>
          <li>&lt;header&gt; - En-tête de page ou de section</li>
          <li>&lt;nav&gt; - Navigation</li>
          <li>&lt;main&gt; - Contenu principal</li>
          <li>&lt;section&gt; - Section de contenu</li>
          <li>&lt;article&gt; - Contenu autonome</li>
          <li>&lt;aside&gt; - Contenu secondaire</li>
          <li>&lt;footer&gt; - Pied de page</li>
          <li>&lt;figure&gt; et &lt;figcaption&gt; - Images avec légende</li>
          <li>&lt;time&gt; - Date ou heure</li>
          <li>&lt;mark&gt; - Texte <mark>surligné</mark></li>
          <li>&lt;details&gt; et &lt;summary&gt; - Contenu dépliable</li>
        </ul>
        
        <details>
          <summary>Cliquez pour voir plus d'informations</summary>
          <p>Ce contenu est masqué par défaut et s'affiche lorsque l'utilisateur clique sur le résumé.</p>
        </details>
      </section>
    </main>

    <footer>
      <p>&copy; 2023 Galerie d'Exemples HTML - Créée avec Web IDE</p>
      <address>
        Contact: <a href="mailto:exemple@domaine.com">exemple@domaine.com</a>
      </address>
    </footer>
  </div>
</body>
</html>`;

export const EXAMPLE_CSS = `/* Styles globaux */
body {
  font-family: 'Poppins', sans-serif;
  line-height: 1.6;
  color: #333;
  background-color: #f5f7fa;
  margin: 0;
  padding: 0;
}

.container {
  width: 85%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  background-color: white;
  box-shadow: 0 0 20px rgba(0,0,0,0.1);
  border-radius: 8px;
}

/* En-tête */
header {
  text-align: center;
  margin-bottom: 2rem;
  padding-bottom: 1rem;
  border-bottom: 2px solid #eaeaea;
}

header h1 {
  color: #3498db;
  margin-bottom: 0.5rem;
}

nav ul {
  display: flex;
  justify-content: center;
  list-style: none;
  padding: 0;
  margin: 1.5rem 0;
}

nav li {
  margin: 0 1rem;
}

nav a {
  color: #3498db;
  text-decoration: none;
  font-weight: 600;
  padding: 5px 10px;
  border-radius: 4px;
  transition: background-color 0.3s;
}

nav a:hover {
  background-color: #f0f7ff;
}

/* Sections */
section {
  margin-bottom: 3rem;
  padding: 1.5rem;
  background-color: #f9f9f9;
  border-radius: 6px;
  border-left: 4px solid #3498db;
}

section h2 {
  color: #2c3e50;
  border-bottom: 1px solid #eaeaea;
  padding-bottom: 0.5rem;
  margin-top: 0;
}

section h3 {
  color: #3498db;
}

/* Texte */
blockquote {
  background-color: #f0f7ff;
  border-left: 4px solid #3498db;
  padding: 1rem;
  margin: 1rem 0;
  font-style: italic;
}

cite {
  display: block;
  text-align: right;
  font-weight: bold;
  margin-top: 0.5rem;
}

pre {
  background-color: #2c3e50;
  color: #f5f5f5;
  padding: 1rem;
  border-radius: 4px;
  overflow-x: auto;
}

code {
  font-family: 'Courier New', monospace;
}

/* Listes */
ul, ol {
  padding-left: 2rem;
}

dl dt {
  font-weight: bold;
  color: #3498db;
  margin-top: 1rem;
}

dl dd {
  margin-left: 1rem;
}

/* Tableaux */
table {
  width: 100%;
  border-collapse: collapse;
  margin: 1rem 0;
}

caption {
  font-weight: bold;
  margin-bottom: 0.5rem;
}

th, td {
  padding: 0.75rem;
  text-align: left;
  border: 1px solid #ddd;
}

th {
  background-color: #3498db;
  color: white;
}

tbody tr:nth-child(even) {
  background-color: #f2f2f2;
}

tfoot {
  background-color: #f9f9f9;
  font-style: italic;
}

/* Formulaires */
form {
  max-width: 600px;
  margin: 0 auto;
}

fieldset {
  border: 1px solid #ddd;
  border-radius: 6px;
  padding: 1.5rem;
  margin-bottom: 1.5rem;
}

legend {
  font-weight: bold;
  padding: 0 10px;
  color: #3498db;
}

.form-group {
  margin-bottom: 1.5rem;
}

label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 600;
}

input[type="text"],
input[type="email"],
input[type="password"],
select,
textarea {
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-family: inherit;
  font-size: 1rem;
}

input[type="radio"],
input[type="checkbox"] {
  margin-right: 5px;
}

label + label {
  margin-left: 1rem;
}

button {
  background-color: #3498db;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;
  transition: background-color 0.3s;
}

button[type="reset"] {
  background-color: #7f8c8d;
  margin-left: 10px;
}

button:hover {
  background-color: #2980b9;
}

button[type="reset"]:hover {
  background-color: #6c7a7b;
}

/* Médias */
figure {
  text-align: center;
  margin: 1.5rem 0;
}

figcaption {
  font-style: italic;
  margin-top: 0.5rem;
  color: #666;
}

img, video, iframe {
  max-width: 100%;
  height: auto;
  border-radius: 4px;
}

/* Éléments sémantiques */
details {
  background-color: #f0f7ff;
  padding: 1rem;
  border-radius: 4px;
  margin: 1rem 0;
}

summary {
  font-weight: bold;
  cursor: pointer;
  color: #3498db;
}

mark {
  background-color: #ffffc0;
  padding: 0 5px;
  border-radius: 3px;
}

/* Pied de page */
footer {
  text-align: center;
  margin-top: 3rem;
  padding-top: 1.5rem;
  border-top: 2px solid #eaeaea;
  color: #7f8c8d;
}

address {
  font-style: normal;
  margin-top: 0.5rem;
}`;

export const EXAMPLE_JS = `// Script pour ajouter des interactions aux exemples HTML
document.addEventListener('DOMContentLoaded', () => {
  console.log('La page est chargée et prête!');
  
  // Ajout d'une classe active au lien de navigation lors du défilement
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('nav a');
  
  // Détecter le défilement pour activer les liens de navigation
  window.addEventListener('scroll', () => {
    const scrollPosition = window.scrollY + 100;
    
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute('id');
      
      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === '#' + sectionId) {
            link.classList.add('active');
          }
        });
      }
    });
  });
  
  // Défilement fluide pour les liens d'ancrage
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      
      document.querySelector(this.getAttribute('href')).scrollIntoView({
        behavior: 'smooth'
      });
    });
  });
  
  // Validation basique du formulaire
  const form = document.querySelector('form');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      alert('Formulaire soumis avec succès ! (Simulation)');
    });
  }
  
  // Animation pour les boutons
  const buttons = document.querySelectorAll('button');
  buttons.forEach(button => {
    button.addEventListener('mouseenter', () => {
      button.style.transform = 'scale(1.05)';
    });
    
    button.addEventListener('mouseleave', () => {
      button.style.transform = 'scale(1)';
    });
  });
  
  // Afficher la valeur actuelle du range input
  const rangeInput = document.querySelector('input[type="range"]');
  if (rangeInput) {
    const createOutput = () => {
      const output = document.createElement('output');
      output.textContent = rangeInput.value;
      rangeInput.parentNode.appendChild(output);
      return output;
    };
    
    const output = createOutput();
    
    rangeInput.addEventListener('input', () => {
      output.textContent = rangeInput.value;
    });
  }
});`;

// Initial default state
const defaultState: AppState = {
  currentProject: null,
  projects: [],
  selectedElement: null,
  editorTheme: EditorTheme.LIGHT,
  isSidebarOpen: true,
};

// Create interface for storage format (with dates as strings)
interface StorageProject extends Omit<Project, 'createdAt' | 'updatedAt'> {
  createdAt: string;
  updatedAt: string;
}

// Define context type
export interface AppContextType {
  state: AppState;
  createNewProject: (name: string, type: 'empty' | 'examples') => Promise<Project | null>;
  saveProject: (projectId: string) => void;
  updateHTML: (projectId: string, html: string) => void;
  updateCSS: (projectId: string, css: string) => void;
  updateJS: (projectId: string, js: string) => void;
  updateCSSFramework: (projectId: string, cssFramework: string) => void;
  setEditorTheme: (theme: EditorTheme) => void;
  toggleSidebar: () => void;
  setSelectedElement: (element: any) => void;
  updateSelectedElement: (updatedElement: any) => void;
  loadProject: (projectId: string) => void;
  deleteProject: (projectId: string) => void;
  exportProject: () => Promise<void>;
  importProject: (file: File) => Promise<boolean>;
  isLoading: boolean;
}

// Create context
const AppContext = createContext<AppContextType | undefined>(undefined);

// Provider component
export const AppStateProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, setState] = useState<AppState>(defaultState);
  const [isLoading, setIsLoading] = useState(true);
  const { showNotification } = useNotification();
  const [autoSaveEnabled, setAutoSaveEnabled] = useState(true);

  // Load initial data when component mounts
  useEffect(() => {
    const loadInitialData = async () => {
      try {
        setIsLoading(true);
        const projects = await MockApiService.getProjects();
        
        setState(prevState => ({
          ...prevState,
          projects: projects || []
        }));
      } catch (error) {
        console.error('Error loading initial data:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    loadInitialData();
  }, []);

  // Create a new project
  const createNewProject = async (name: string, type: 'empty' | 'examples'): Promise<Project | null> => {
    try {
      if (type === 'empty') {
        const newProject: Project = {
          id: uuidv4(),
          name,
          html: DEFAULT_HTML,
          css: DEFAULT_CSS,
          javascript: DEFAULT_JS,
          cssFramework: CSSFramework.PURE_CSS,
          createdAt: new Date(),
          updatedAt: new Date(),
        };

        const createdProject = await MockApiService.createProject(newProject);
        
        setState((prevState) => ({
          ...prevState,
          currentProject: createdProject,
          projects: [...prevState.projects, createdProject],
        }));
        
        // Afficher une notification de succès
        showNotification(`Projet "${createdProject.name}" créé avec succès`, NotificationType.SUCCESS);
        
        return createdProject;
      } else if (type === 'examples') {
        const newProject: Project = {
          id: uuidv4(),
          name,
          html: EXAMPLE_HTML,
          css: EXAMPLE_CSS,
          javascript: EXAMPLE_JS,
          cssFramework: CSSFramework.PURE_CSS,
          createdAt: new Date(),
          updatedAt: new Date(),
        };

        const createdProject = await MockApiService.createProject(newProject);
        
        setState((prevState) => ({
          ...prevState,
          currentProject: createdProject,
          projects: [...prevState.projects, createdProject],
        }));
        
        // Afficher une notification de succès
        showNotification(`Projet "${createdProject.name}" créé avec succès`, NotificationType.SUCCESS);
        
        return createdProject;
      }
      
      return null;
    } catch (error) {
      console.error('Error creating project:', error);
      showNotification('Erreur lors de la création du projet', NotificationType.ERROR);
      return null;
    }
  };

  // Save the current project
  const saveProject = async (projectId: string) => {
    // Use the currentProject from the state directly, as it has the latest updates
    const projectToSave = state.currentProject;
    
    if (!projectToSave || projectToSave.id !== projectId) {
      console.error('Project mismatch or not found, cannot save');
      return;
    }

    // Update the last updated time before saving
    const updatedProjectData = { ...projectToSave, updatedAt: new Date() };

    try {
      // Simulate saving to API
      const updatedProject = await MockApiService.updateProject(updatedProjectData);
      
      // Update state with saved project
      setState(prevState => ({
        ...prevState,
        currentProject: updatedProject,
        projects: prevState.projects.map(p => 
          p.id === updatedProject.id ? updatedProject : p
        )
      }));
      
      // Show success notification on manual save
      showNotification(`Projet "${updatedProject.name}" sauvegardé avec succès`, NotificationType.SUCCESS);
    } catch (error) {
      console.error('Error saving project:', error);
      showNotification('Erreur lors de la sauvegarde du projet', NotificationType.ERROR);
    }
  };

  // Update HTML content
  const updateHTML = (projectId: string, html: string) => {
    if (!state.currentProject) return;

    setState((prevState: AppState) => ({
      ...prevState,
      currentProject: {
        ...prevState.currentProject!,
        html,
        updatedAt: new Date(),
      },
    }));
  };

  // Update CSS content
  const updateCSS = (projectId: string, css: string) => {
    if (!state.currentProject) return;

    setState((prevState: AppState) => ({
      ...prevState,
      currentProject: {
        ...prevState.currentProject!,
        css,
        updatedAt: new Date(),
      },
    }));
  };

  // Update JavaScript content
  const updateJS = (projectId: string, js: string) => {
    if (!state.currentProject) return;

    setState((prevState: AppState) => ({
      ...prevState,
      currentProject: {
        ...prevState.currentProject!,
        javascript: js,
        updatedAt: new Date(),
      },
    }));
  };

  // Set CSS framework
  const updateCSSFramework = (projectId: string, cssFramework: string) => {
    // Ne rien faire, nous n'utilisons que CSS pur
    return;
  };

  // Set editor theme
  const setEditorTheme = (editorTheme: EditorTheme) => {
    setState((prevState: AppState) => ({
      ...prevState,
      editorTheme,
    }));
  };

  // Toggle sidebar
  const toggleSidebar = () => {
    setState((prevState: AppState) => ({
      ...prevState,
      isSidebarOpen: !prevState.isSidebarOpen,
    }));
  };

  // Set selected element
  const setSelectedElement = (element: any) => {
    setState((prev: AppState) => ({
      ...prev,
      selectedElement: element
    }));
  };

  // Update selected element
  const updateSelectedElement = (updatedElement: any) => {
    setState((prev: AppState) => {
      if (!prev.selectedElement) return prev;
      
      // Handle properties updates
      let properties = prev.selectedElement.properties;
      if (updatedElement.properties) {
        properties = {
          ...properties,
          ...updatedElement.properties
        };
      }
      
      // Create the updated element
      const newSelectedElement = {
        ...prev.selectedElement,
        properties,
        content: updatedElement.content !== undefined 
          ? updatedElement.content 
          : prev.selectedElement.content
      };
      
      return {
        ...prev,
        selectedElement: newSelectedElement
      };
    });
  };

  // Load a specific project
  const loadProject = async (projectId: string) => {
    try {
      const project = await MockApiService.getProject(projectId);
      
      if (project) {
        setState((prevState) => ({
          ...prevState,
          currentProject: project,
        }));
      }
    } catch (error) {
      console.error(`Error loading project ${projectId}:`, error);
    }
  };

  // Delete a project
  const deleteProject = async (projectId: string) => {
    try {
      const success = await MockApiService.deleteProject(projectId);
      
      if (success) {
        setState((prevState) => ({
          ...prevState,
          projects: prevState.projects.filter((p) => p.id !== projectId),
          currentProject:
            prevState.currentProject?.id === projectId
              ? null
              : prevState.currentProject,
        }));
      }
    } catch (error) {
      console.error(`Error deleting project ${projectId}:`, error);
    }
  };

  // Export the current project as a zip file
  const exportProject = async (): Promise<void> => {
    if (!state.currentProject) {
      console.error('No project to export');
      return;
    }

    try {
      const zip = new JSZip();
      
      // Create sanitized filename
      const sanitizedName = state.currentProject.name
        .replace(/[^a-z0-9]/gi, '_')
        .toLowerCase();
      
      // Add HTML file with proper links to CSS and JS
      zip.file(
        "index.html", 
        getHTMLDocumentWithLinks(state.currentProject.html)
      );
      
      // Add CSS file
      zip.file("styles.css", state.currentProject.css);
      
      // Add JavaScript file
      zip.file("script.js", state.currentProject.javascript);
      
      // Generate zip file and trigger download
      const content = await zip.generateAsync({ type: "blob" });
      saveAs(content, `${sanitizedName}.zip`);
    } catch (error) {
      console.error('Error exporting project:', error);
      throw error;
    }
  };
  
  // Helper function to create a complete HTML document with proper links
  const getHTMLDocumentWithLinks = (htmlContent: string): string => {
    // Extract just the body content if there's a full HTML document
    let bodyContent = htmlContent;
    if (htmlContent.includes('<body>') && htmlContent.includes('</body>')) {
      const bodyStart = htmlContent.indexOf('<body>') + 6;
      const bodyEnd = htmlContent.indexOf('</body>');
      bodyContent = htmlContent.substring(bodyStart, bodyEnd).trim();
    }
    
    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${state.currentProject?.name || 'Web IDE Project'}</title>
    <link rel="stylesheet" href="styles.css">
</head>
<body>
${bodyContent}
    <script src="script.js"></script>
</body>
</html>`;
  };
  
  // Import a project from a zip file
  const importProject = async (file: File): Promise<boolean> => {
    try {
      // Check if it's a zip file
      if (!file.name.endsWith('.zip')) {
        alert('Please select a ZIP file');
        return false;
      }
      
      const zip = new JSZip();
      const zipContent = await zip.loadAsync(file);
      
      // Extract HTML, CSS, and JS content
      let html = '';
      let css = '';
      let js = '';
      let projectName = file.name.replace('.zip', '');
      
      // Find and read the HTML file
      const htmlFile = Object.keys(zipContent.files).find(name => 
        name.endsWith('.html') || name.endsWith('.htm')
      );
      
      if (htmlFile) {
        const htmlContent = await zipContent.files[htmlFile].async('text');
        html = extractBodyContent(htmlContent);
      }
      
      // Find and read the CSS file
      const cssFile = Object.keys(zipContent.files).find(name => 
        name.endsWith('.css')
      );
      
      if (cssFile) {
        css = await zipContent.files[cssFile].async('text');
      }
      
      // Find and read the JS file
      const jsFile = Object.keys(zipContent.files).find(name => 
        name.endsWith('.js') && !name.endsWith('.min.js')
      );
      
      if (jsFile) {
        js = await zipContent.files[jsFile].async('text');
      }
      
      // Toujours utiliser CSS pur, indépendamment du contenu
      let cssFramework = CSSFramework.PURE_CSS;
      
      // Create a new project with the imported content
      const newProject: Project = {
        id: uuidv4(),
        name: projectName,
        html: html || DEFAULT_HTML,
        css: css || DEFAULT_CSS,
        javascript: js || DEFAULT_JS,
        cssFramework: cssFramework,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      
      const createdProject = await MockApiService.createProject(newProject);
      
      setState((prevState) => ({
        ...prevState,
        currentProject: createdProject,
        projects: [...prevState.projects, createdProject],
      }));
      
      // Show success notification
      showNotification(`Project "${createdProject.name}" imported successfully`, NotificationType.SUCCESS);
      
      return true;
    } catch (error) {
      console.error('Error importing project:', error);
      alert(`Error importing project: ${error instanceof Error ? error.message : 'Unknown error'}`);
      return false;
    }
  };
  
  // Helper function to extract the body content from HTML
  const extractBodyContent = (htmlContent: string): string => {
    if (htmlContent.includes('<body>') && htmlContent.includes('</body>')) {
      const bodyStart = htmlContent.indexOf('<body>') + 6;
      const bodyEnd = htmlContent.indexOf('</body>');
      return htmlContent.substring(bodyStart, bodyEnd).trim();
    }
    return htmlContent;
  };

  // Context value
  const contextValue: AppContextType = {
    state,
    createNewProject,
    saveProject,
    updateHTML,
    updateCSS,
    updateJS,
    updateCSSFramework,
    setEditorTheme,
    toggleSidebar,
    setSelectedElement,
    updateSelectedElement,
    loadProject,
    deleteProject,
    exportProject,
    importProject,
    isLoading
  };

  return <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>;
};

// Custom hook to use the context
export const useAppState = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppState must be used within an AppStateProvider');
  }
  return context;
}; 