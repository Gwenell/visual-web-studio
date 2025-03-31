import { Project, CSSFramework } from '../types/types';

// Interface pour le stockage local qui utilise des chaînes pour les dates
interface StorageProject extends Omit<Project, 'createdAt' | 'updatedAt'> {
  createdAt: string;
  updatedAt: string;
}

// Helper to interact with localStorage
const localStorageKey = 'web-ide-projects';

// Simulate network delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export class MockApi {
  // Get all projects from local storage
  static async getProjects(): Promise<Project[]> {
    await delay(300); // Simulate network latency
    
    try {
      const projectsJSON = localStorage.getItem(localStorageKey);
      if (projectsJSON) {
        const projects: StorageProject[] = JSON.parse(projectsJSON);
        // Convert string dates back to Date objects
        return projects.map((project: StorageProject) => ({
          ...project,
          createdAt: new Date(project.createdAt),
          updatedAt: new Date(project.updatedAt)
        }));
      }
      
      // Initialize empty array if no projects exist
      localStorage.setItem(localStorageKey, JSON.stringify([]));
      return [];
    } catch (error) {
      console.error('Error fetching projects:', error);
      return [];
    }
  }
  
  // Get a single project by ID
  static async getProject(id: string): Promise<Project | null> {
    await delay(200);
    
    try {
      const projectsJSON = localStorage.getItem(localStorageKey);
      if (!projectsJSON) return null;
      
      const projects: StorageProject[] = JSON.parse(projectsJSON);
      const project = projects.find((p: StorageProject) => p.id === id);
      
      if (!project) return null;
      
      // Convert string dates back to Date objects
      return {
        ...project,
        createdAt: new Date(project.createdAt),
        updatedAt: new Date(project.updatedAt)
      };
    } catch (error) {
      console.error(`Error fetching project ${id}:`, error);
      return null;
    }
  }
  
  // Create a new project
  static async createProject(project: Project): Promise<Project> {
    await delay(400);
    
    try {
      const projectsJSON = localStorage.getItem(localStorageKey);
      const projects: StorageProject[] = projectsJSON ? JSON.parse(projectsJSON) : [];
      
      // Convert Date objects to strings for storage
      const projectToStore: StorageProject = {
        ...project,
        createdAt: project.createdAt.toISOString(),
        updatedAt: project.updatedAt.toISOString()
      };
      
      // Add new project
      projects.push(projectToStore);
      
      // Save to localStorage
      localStorage.setItem(localStorageKey, JSON.stringify(projects));
      
      return project;
    } catch (error) {
      console.error('Error creating project:', error);
      throw new Error('Failed to create project');
    }
  }
  
  // Update an existing project
  static async updateProject(project: Project): Promise<Project> {
    await delay(400);
    
    try {
      const projectsJSON = localStorage.getItem(localStorageKey);
      if (!projectsJSON) {
        throw new Error('No projects found');
      }
      
      let projects: StorageProject[] = JSON.parse(projectsJSON);
      
      // Find project by ID
      const index = projects.findIndex(p => p.id === project.id);
      
      // Si le projet n'existe pas, l'ajouter comme nouveau
      if (index === -1) {
        // Préparer le projet pour le stockage
        const projectForStorage: StorageProject = {
          ...project,
          createdAt: project.createdAt.toISOString(),
          updatedAt: new Date().toISOString()
        };
        
        // Ajouter le nouveau projet
        projects.push(projectForStorage);
        
        // Sauvegarder dans localStorage
        localStorage.setItem(localStorageKey, JSON.stringify(projects));
        
        // Retourner le projet avec les objets Date pour l'API
        return {
          ...project,
          updatedAt: new Date()
        };
      }
      
      // Préparer les dates pour le stockage
      const now = new Date();
      const updatedAtString = now.toISOString();
      const createdAtString = projects[index].createdAt;
      
      // Pour le stockage (avec des chaînes)
      const projectForStorage: StorageProject = {
        ...project,
        createdAt: createdAtString,
        updatedAt: updatedAtString
      };
      
      // Update project
      projects[index] = projectForStorage;
      
      // Save to localStorage
      localStorage.setItem(localStorageKey, JSON.stringify(projects));
      
      // Retourner le projet avec des objets Date pour l'API
      return {
        ...project,
        createdAt: new Date(createdAtString),
        updatedAt: now
      };
    } catch (error) {
      console.error(`Error updating project ${project.id}:`, error);
      throw new Error('Failed to update project');
    }
  }
  
  // Delete a project
  static async deleteProject(id: string): Promise<boolean> {
    await delay(300);
    
    try {
      const projectsJSON = localStorage.getItem(localStorageKey);
      if (!projectsJSON) {
        return false;
      }
      
      let projects: StorageProject[] = JSON.parse(projectsJSON);
      
      // Filter out the project to delete
      const filteredProjects = projects.filter((p) => p.id !== id);
      
      // Check if project was found and removed
      if (filteredProjects.length === projects.length) {
        return false;
      }
      
      // Save to localStorage
      localStorage.setItem(localStorageKey, JSON.stringify(filteredProjects));
      
      return true;
    } catch (error) {
      console.error(`Error deleting project ${id}:`, error);
      return false;
    }
  }
  
  // Export a project to HTML file
  static async exportProject(project: Project): Promise<string> {
    await delay(200);
    
    try {
      // Construct the HTML document
      const htmlTemplate = `
<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${project.name}</title>
  ${project.cssFramework !== CSSFramework.PURE_CSS ? 
    `<!-- ${project.cssFramework} Framework -->
    ${MockApiService.getFrameworkLink(project.cssFramework)}` : ''}
  <style>
${project.css}
  </style>
</head>
<body>
${project.html}

  <script>
${project.javascript}
  </script>
</body>
</html>`;
      
      return htmlTemplate;
    } catch (error) {
      console.error(`Error exporting project ${project.id}:`, error);
      throw new Error('Failed to export project');
    }
  }
  
  // Helper to get the correct CSS framework link
  private static getFrameworkLink(framework: CSSFramework): string {
    switch (framework) {
      case CSSFramework.BOOTSTRAP:
        return '<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">';
      case CSSFramework.TAILWIND:
        return '<script src="https://cdn.tailwindcss.com"></script>';
      default:
        return '';
    }
  }
}

// Alias for backward compatibility
export const MockApiService = MockApi; 