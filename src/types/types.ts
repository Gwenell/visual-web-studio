// Project type definition
export interface Project {
  id: string;
  name: string;
  html: string;
  css: string;
  javascript: string;
  cssFramework: CSSFramework;
  createdAt: Date;
  updatedAt: Date;
}

// CSS Framework options
export enum CSSFramework {
  PURE_CSS = 'Pure CSS',
  TAILWIND = 'Tailwind CSS',
  BOOTSTRAP = 'Bootstrap'
}

// HTML Element categories
export enum ElementCategory {
  STRUCTURE = 'Structures de Base',
  TEXT = 'Contenu Textuel',
  FORM = 'Formulaires',
  MEDIA = 'Éléments Multimédias et Interactifs'
}

// HTML Element definition for library
export interface HTMLElement {
  tag: string;
  category: ElementCategory;
  description: string;
  selfClosing: boolean;
  attributes: string[];
  example: string;
  defaultContent?: string;
}

// Selected Element definition for properties panel
export interface SelectedElement {
  type: string;
  properties: Record<string, string>;
  content: string;
}

// Attribute definition for configuration panel
export interface AttributeConfig {
  name: string;
  type: 'text' | 'number' | 'color' | 'select' | 'checkbox';
  options?: string[];
  defaultValue?: string | number | boolean;
  description: string;
}

// Editor Theme
export enum EditorTheme {
  LIGHT = 'light',
  DARK = 'dark'
}

// App State
export interface AppState {
  currentProject: Project | null;
  projects: Project[];
  selectedElement: SelectedElement | null;
  editorTheme: EditorTheme;
  isSidebarOpen: boolean;
} 