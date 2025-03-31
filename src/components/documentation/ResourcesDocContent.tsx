import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  line-height: 1.6;
`;

const Section = styled.section`
  margin-bottom: 2rem;
`;

const SectionTitle = styled.h2`
  font-size: 1.8rem;
  color: var(--secondary-color);
  margin-bottom: 1rem;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid #e0e0e0;
`;

const ResourceList = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
  margin: 1.5rem 0;
`;

const ResourceCard = styled.div`
  background: white;
  border-radius: var(--border-radius);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  transition: transform 0.3s, box-shadow 0.3s;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  }
`;

const ResourceHeader = styled.div`
  background-color: var(--secondary-color);
  color: white;
  padding: 1rem;
`;

const ResourceTitle = styled.h3`
  margin: 0;
  font-size: 1.2rem;
`;

const ResourceType = styled.span`
  display: inline-block;
  font-size: 0.8rem;
  background-color: var(--accent-color);
  color: white;
  padding: 0.2rem 0.5rem;
  border-radius: 3px;
  margin-top: 0.5rem;
`;

const ResourceContent = styled.div`
  padding: 1rem;
`;

const ResourceDescription = styled.p`
  margin-bottom: 1rem;
  font-size: 0.9rem;
`;

const ResourceLink = styled.a`
  display: inline-block;
  background-color: var(--accent-color);
  color: white;
  padding: 0.5rem 1rem;
  border-radius: var(--border-radius);
  text-decoration: none;
  font-weight: bold;
  transition: background-color 0.3s;
  
  &:hover {
    background-color: #B30F32;
  }
`;

const Introduction = styled.p`
  margin-bottom: 1.5rem;
  font-size: 1.1rem;
`;

interface Resource {
  title: string;
  type: 'site' | 'video' | 'tutoriel' | 'documentation' | 'outil';
  description: string;
  url: string;
}

export const ResourcesDocContent: React.FC = () => {
  const htmlResources: Resource[] = [
    {
      title: 'MDN Web Docs - HTML',
      type: 'documentation',
      description: 'Documentation complète et à jour sur HTML par Mozilla.',
      url: 'https://developer.mozilla.org/fr/docs/Web/HTML'
    },
    {
      title: 'W3Schools HTML Tutorial',
      type: 'tutoriel',
      description: 'Tutoriels HTML avec exemples interactifs et exercices.',
      url: 'https://www.w3schools.com/html/'
    },
    {
      title: 'HTML.com',
      type: 'site',
      description: 'Guides, tutoriels et références pour apprendre HTML.',
      url: 'https://html.com/'
    },
    {
      title: 'HTML Crash Course For Absolute Beginners',
      type: 'video',
      description: 'Vidéo d\'introduction par Traversy Media sur YouTube.',
      url: 'https://www.youtube.com/watch?v=UB1O30fR-EE'
    },
    {
      title: 'HTML Validator',
      type: 'outil',
      description: 'Validateur de code HTML du W3C.',
      url: 'https://validator.w3.org/'
    }
  ];
  
  const cssResources: Resource[] = [
    {
      title: 'MDN Web Docs - CSS',
      type: 'documentation',
      description: 'Documentation complète et à jour sur CSS par Mozilla.',
      url: 'https://developer.mozilla.org/fr/docs/Web/CSS'
    },
    {
      title: 'CSS-Tricks',
      type: 'site',
      description: 'Articles, tutoriels et astuces sur CSS.',
      url: 'https://css-tricks.com/'
    },
    {
      title: 'Flexbox Froggy',
      type: 'outil',
      description: 'Jeu interactif pour apprendre CSS Flexbox.',
      url: 'https://flexboxfroggy.com/#fr'
    },
    {
      title: 'Grid Garden',
      type: 'outil',
      description: 'Jeu interactif pour apprendre CSS Grid.',
      url: 'https://cssgridgarden.com/#fr'
    },
    {
      title: 'CSS Crash Course For Absolute Beginners',
      type: 'video',
      description: 'Vidéo d\'introduction par Traversy Media sur YouTube.',
      url: 'https://www.youtube.com/watch?v=yfoY53QXEnI'
    }
  ];
  
  const jsResources: Resource[] = [
    {
      title: 'MDN Web Docs - JavaScript',
      type: 'documentation',
      description: 'Documentation complète et à jour sur JavaScript par Mozilla.',
      url: 'https://developer.mozilla.org/fr/docs/Web/JavaScript'
    },
    {
      title: 'JavaScript.info',
      type: 'tutoriel',
      description: 'Tutoriel moderne sur JavaScript, du niveau débutant à avancé.',
      url: 'https://fr.javascript.info/'
    },
    {
      title: 'Eloquent JavaScript',
      type: 'site',
      description: 'Livre en ligne gratuit pour apprendre JavaScript.',
      url: 'https://eloquentjavascript.net/'
    },
    {
      title: 'JavaScript Crash Course For Beginners',
      type: 'video',
      description: 'Vidéo d\'introduction par Traversy Media sur YouTube.',
      url: 'https://www.youtube.com/watch?v=hdI2bqOjy3c'
    },
    {
      title: 'JavaScript30',
      type: 'tutoriel',
      description: '30 projets JavaScript en 30 jours, sans frameworks.',
      url: 'https://javascript30.com/'
    }
  ];
  
  const platformResources: Resource[] = [
    {
      title: 'freeCodeCamp',
      type: 'site',
      description: 'Plateforme d\'apprentissage interactive avec certification gratuite.',
      url: 'https://www.freecodecamp.org/'
    },
    {
      title: 'Codecademy',
      type: 'site',
      description: 'Cours interactifs pour apprendre à coder (certains gratuits).',
      url: 'https://www.codecademy.com/'
    },
    {
      title: 'Khan Academy - Computing',
      type: 'site',
      description: 'Cours gratuits sur le développement web et la programmation.',
      url: 'https://www.khanacademy.org/computing/computer-programming'
    },
    {
      title: 'OpenClassrooms',
      type: 'site',
      description: 'Plateforme française d\'apprentissage en ligne avec de nombreux cours gratuits.',
      url: 'https://openclassrooms.com/'
    },
    {
      title: 'The Odin Project',
      type: 'site',
      description: 'Curriculum complet de développement web en open source.',
      url: 'https://www.theodinproject.com/'
    }
  ];
  
  const toolResources: Resource[] = [
    {
      title: 'CodePen',
      type: 'outil',
      description: 'Environnement de développement social pour le front-end.',
      url: 'https://codepen.io/'
    },
    {
      title: 'JSFiddle',
      type: 'outil',
      description: 'Éditeur de code en ligne pour tester HTML, CSS et JavaScript.',
      url: 'https://jsfiddle.net/'
    },
    {
      title: 'Can I Use',
      type: 'outil',
      description: 'Vérifiez la compatibilité des fonctionnalités web dans les navigateurs.',
      url: 'https://caniuse.com/'
    },
    {
      title: 'Visual Studio Code',
      type: 'outil',
      description: 'Éditeur de code gratuit et puissant de Microsoft.',
      url: 'https://code.visualstudio.com/'
    },
    {
      title: 'Chrome DevTools',
      type: 'outil',
      description: 'Outils de développement intégrés au navigateur Chrome.',
      url: 'https://developers.google.com/web/tools/chrome-devtools/'
    }
  ];
  
  return (
    <Container>
      <Section>
        <SectionTitle>Ressources d'apprentissage</SectionTitle>
        <Introduction>
          Nous avons compilé une liste de ressources gratuites de haute qualité pour vous aider à apprendre 
          le développement web. Ces ressources complètent les fonctionnalités de notre IDE et vous permettront 
          d'approfondir vos connaissances en HTML, CSS et JavaScript.
        </Introduction>
      </Section>
      
      <Section>
        <SectionTitle>HTML</SectionTitle>
        <ResourceList>
          {htmlResources.map((resource, index) => (
            <ResourceCard key={index}>
              <ResourceHeader>
                <ResourceTitle>{resource.title}</ResourceTitle>
                <ResourceType>{resource.type}</ResourceType>
              </ResourceHeader>
              <ResourceContent>
                <ResourceDescription>{resource.description}</ResourceDescription>
                <ResourceLink href={resource.url} target="_blank" rel="noopener noreferrer">
                  Accéder
                </ResourceLink>
              </ResourceContent>
            </ResourceCard>
          ))}
        </ResourceList>
      </Section>
      
      <Section>
        <SectionTitle>CSS</SectionTitle>
        <ResourceList>
          {cssResources.map((resource, index) => (
            <ResourceCard key={index}>
              <ResourceHeader>
                <ResourceTitle>{resource.title}</ResourceTitle>
                <ResourceType>{resource.type}</ResourceType>
              </ResourceHeader>
              <ResourceContent>
                <ResourceDescription>{resource.description}</ResourceDescription>
                <ResourceLink href={resource.url} target="_blank" rel="noopener noreferrer">
                  Accéder
                </ResourceLink>
              </ResourceContent>
            </ResourceCard>
          ))}
        </ResourceList>
      </Section>
      
      <Section>
        <SectionTitle>JavaScript</SectionTitle>
        <ResourceList>
          {jsResources.map((resource, index) => (
            <ResourceCard key={index}>
              <ResourceHeader>
                <ResourceTitle>{resource.title}</ResourceTitle>
                <ResourceType>{resource.type}</ResourceType>
              </ResourceHeader>
              <ResourceContent>
                <ResourceDescription>{resource.description}</ResourceDescription>
                <ResourceLink href={resource.url} target="_blank" rel="noopener noreferrer">
                  Accéder
                </ResourceLink>
              </ResourceContent>
            </ResourceCard>
          ))}
        </ResourceList>
      </Section>
      
      <Section>
        <SectionTitle>Plateformes d'apprentissage</SectionTitle>
        <ResourceList>
          {platformResources.map((resource, index) => (
            <ResourceCard key={index}>
              <ResourceHeader>
                <ResourceTitle>{resource.title}</ResourceTitle>
                <ResourceType>{resource.type}</ResourceType>
              </ResourceHeader>
              <ResourceContent>
                <ResourceDescription>{resource.description}</ResourceDescription>
                <ResourceLink href={resource.url} target="_blank" rel="noopener noreferrer">
                  Accéder
                </ResourceLink>
              </ResourceContent>
            </ResourceCard>
          ))}
        </ResourceList>
      </Section>
      
      <Section>
        <SectionTitle>Outils et ressources</SectionTitle>
        <ResourceList>
          {toolResources.map((resource, index) => (
            <ResourceCard key={index}>
              <ResourceHeader>
                <ResourceTitle>{resource.title}</ResourceTitle>
                <ResourceType>{resource.type}</ResourceType>
              </ResourceHeader>
              <ResourceContent>
                <ResourceDescription>{resource.description}</ResourceDescription>
                <ResourceLink href={resource.url} target="_blank" rel="noopener noreferrer">
                  Accéder
                </ResourceLink>
              </ResourceContent>
            </ResourceCard>
          ))}
        </ResourceList>
      </Section>
    </Container>
  );
}; 