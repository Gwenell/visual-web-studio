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

const SubSection = styled.section`
  margin-bottom: 1.5rem;
`;

const SubTitle = styled.h3`
  font-size: 1.4rem;
  color: var(--secondary-color);
  margin-bottom: 0.8rem;
`;

const Paragraph = styled.p`
  margin-bottom: 1rem;
`;

const CodeBlock = styled.pre`
  background-color: #f5f5f5;
  padding: 1rem;
  border-radius: var(--border-radius);
  overflow-x: auto;
  margin-bottom: 1rem;
  font-family: 'Courier New', Courier, monospace;
`;

const CodeInline = styled.code`
  background-color: #f5f5f5;
  padding: 0.2rem 0.4rem;
  border-radius: 3px;
  font-family: 'Courier New', Courier, monospace;
`;

const List = styled.ul`
  margin-bottom: 1rem;
  padding-left: 2rem;
  
  li {
    margin-bottom: 0.5rem;
  }
`;

export const CssDocContent: React.FC = () => {
  return (
    <Container>
      <Section>
        <SectionTitle>Introduction à CSS</SectionTitle>
        <Paragraph>
          CSS (Cascading Style Sheets) est un langage de feuilles de style utilisé pour décrire la présentation d'un document écrit en HTML.
        </Paragraph>
        <Paragraph>
          CSS permet de séparer le contenu (HTML) de sa présentation visuelle, ce qui améliore la maintenabilité et la flexibilité des sites web.
        </Paragraph>
      </Section>

      <Section>
        <SectionTitle>Intégration du CSS</SectionTitle>
        <Paragraph>
          Il existe trois méthodes principales pour intégrer du CSS dans une page HTML :
        </Paragraph>
        
        <SubSection>
          <SubTitle>1. CSS externe (recommandé)</SubTitle>
          <Paragraph>
            Créez un fichier CSS séparé et liez-le à votre HTML.
          </Paragraph>
          <CodeBlock>{`<!-- Dans le <head> du fichier HTML -->
<link rel="stylesheet" href="styles.css">`}</CodeBlock>
          <Paragraph>
            Contenu du fichier "styles.css" :
          </Paragraph>
          <CodeBlock>{`body {
  font-family: Arial, sans-serif;
  margin: 0;
  padding: 20px;
}

h1 {
  color: #2c3e50;
}`}</CodeBlock>
        </SubSection>
        
        <SubSection>
          <SubTitle>2. CSS interne</SubTitle>
          <Paragraph>
            Placez les styles directement dans la section <CodeInline>{'<head>'}</CodeInline> du document HTML.
          </Paragraph>
          <CodeBlock>{`<head>
  <style>
    body {
      font-family: Arial, sans-serif;
      margin: 0;
      padding: 20px;
    }
    
    h1 {
      color: #2c3e50;
    }
  </style>
</head>`}</CodeBlock>
        </SubSection>
        
        <SubSection>
          <SubTitle>3. CSS en ligne</SubTitle>
          <Paragraph>
            Appliquez des styles directement à un élément HTML avec l'attribut <CodeInline>style</CodeInline>.
          </Paragraph>
          <CodeBlock>{`<h1 style="color: #2c3e50; font-size: 24px;">Titre</h1>`}</CodeBlock>
          <Paragraph>
            Cette méthode n'est généralement pas recommandée car elle mélange le contenu et la présentation.
          </Paragraph>
        </SubSection>
      </Section>

      <Section>
        <SectionTitle>Sélecteurs CSS</SectionTitle>
        <Paragraph>
          Les sélecteurs définissent quels éléments HTML seront stylisés par les règles CSS.
        </Paragraph>
        
        <SubSection>
          <SubTitle>Sélecteurs de base</SubTitle>
          <CodeBlock>{`/* Sélecteur d'élément (tag) */
p {
  color: blue;
}

/* Sélecteur de classe */
.container {
  max-width: 1200px;
  margin: 0 auto;
}

/* Sélecteur d'ID */
#header {
  background-color: #333;
  color: white;
}

/* Sélecteur universel */
* {
  box-sizing: border-box;
}`}</CodeBlock>
        </SubSection>
        
        <SubSection>
          <SubTitle>Sélecteurs combinés</SubTitle>
          <CodeBlock>{`/* Descendant (tous les p à l'intérieur d'un div) */
div p {
  margin-bottom: 10px;
}

/* Enfant direct (les p qui sont des enfants directs d'un div) */
div > p {
  font-weight: bold;
}

/* Adjacent (le premier p après un h2) */
h2 + p {
  font-size: 18px;
}

/* Frère (tous les p après un h2) */
h2 ~ p {
  color: gray;
}`}</CodeBlock>
        </SubSection>
        
        <SubSection>
          <SubTitle>Sélecteurs d'attributs</SubTitle>
          <CodeBlock>{`/* Éléments avec un attribut href */
[href] {
  color: purple;
}

/* Éléments avec un attribut href égal à une valeur */
[href="https://example.com"] {
  font-weight: bold;
}

/* Éléments avec un attribut href contenant "example" */
[href*="example"] {
  text-decoration: underline;
}`}</CodeBlock>
        </SubSection>
        
        <SubSection>
          <SubTitle>Pseudo-classes</SubTitle>
          <CodeBlock>{`/* Liens non visités */
a:link {
  color: blue;
}

/* Liens visités */
a:visited {
  color: purple;
}

/* Au survol */
a:hover {
  text-decoration: underline;
}

/* Pendant le clic */
a:active {
  color: red;
}

/* Premier enfant */
li:first-child {
  font-weight: bold;
}

/* Dernier enfant */
li:last-child {
  margin-bottom: 0;
}`}</CodeBlock>
        </SubSection>
      </Section>

      <Section>
        <SectionTitle>Propriétés CSS principales</SectionTitle>
        
        <SubSection>
          <SubTitle>Texte et typographie</SubTitle>
          <CodeBlock>{`p {
  color: #333;                /* Couleur du texte */
  font-family: Arial, sans-serif; /* Police */
  font-size: 16px;            /* Taille de police */
  font-weight: bold;          /* Graisse (normal, bold, 100-900) */
  font-style: italic;         /* Style (normal, italic, oblique) */
  text-align: center;         /* Alignement (left, right, center, justify) */
  text-decoration: underline; /* Décoration (none, underline, line-through) */
  line-height: 1.5;           /* Hauteur de ligne */
  letter-spacing: 1px;        /* Espacement des lettres */
  text-transform: uppercase;  /* Transformation (none, uppercase, lowercase, capitalize) */
}`}</CodeBlock>
        </SubSection>
        
        <SubSection>
          <SubTitle>Fond et couleurs</SubTitle>
          <CodeBlock>{`div {
  background-color: #f0f0f0;       /* Couleur de fond */
  background-image: url('bg.jpg');  /* Image de fond */
  background-repeat: no-repeat;     /* Répétition (repeat, no-repeat, repeat-x, repeat-y) */
  background-position: center;      /* Position */
  background-size: cover;           /* Taille (auto, cover, contain, 100% 100%) */
  
  /* Raccourci */
  background: #f0f0f0 url('bg.jpg') no-repeat center/cover;
  
  /* Couleur avec transparence (RGBA) */
  background-color: rgba(0, 0, 0, 0.5); /* Rouge, Vert, Bleu, Alpha (0-1) */
}`}</CodeBlock>
        </SubSection>
        
        <SubSection>
          <SubTitle>Boîte (Box Model)</SubTitle>
          <CodeBlock>{`div {
  width: 300px;              /* Largeur */
  height: 200px;             /* Hauteur */
  max-width: 100%;           /* Largeur maximale */
  min-height: 100px;         /* Hauteur minimale */
  
  padding: 20px;             /* Espacement interne */
  margin: 10px;              /* Espacement externe */
  border: 1px solid #333;    /* Bordure */
  
  /* Versions détaillées */
  padding-top: 10px;
  padding-right: 20px;
  padding-bottom: 10px;
  padding-left: 20px;
  
  /* Raccourci (haut droite bas gauche) */
  padding: 10px 20px 10px 20px;
  
  /* Raccourci pour valeurs identiques haut/bas et gauche/droite */
  padding: 10px 20px;
  
  /* Largeur incluant padding et bordure */
  box-sizing: border-box;
}`}</CodeBlock>
        </SubSection>
        
        <SubSection>
          <SubTitle>Disposition (Layout)</SubTitle>
          <CodeBlock>{`div {
  display: block;           /* Type d'affichage (block, inline, inline-block, flex, grid, none) */
  position: relative;       /* Positionnement (static, relative, absolute, fixed, sticky) */
  top: 10px;                /* Position depuis le haut (avec position: absolute/relative/fixed/sticky) */
  left: 20px;               /* Position depuis la gauche */
  z-index: 10;              /* Ordre d'empilement (plus grand = au-dessus) */
  float: left;              /* Flottement (left, right, none) */
  clear: both;              /* Effacement de flottement (left, right, both, none) */
  overflow: hidden;         /* Comportement du contenu dépassant (visible, hidden, scroll, auto) */
}`}</CodeBlock>
        </SubSection>
      </Section>

      <Section>
        <SectionTitle>Flexbox</SectionTitle>
        <Paragraph>
          Flexbox est un modèle de mise en page conçu pour faciliter la création de designs responsifs.
        </Paragraph>
        <CodeBlock>{`/* Conteneur flex */
.container {
  display: flex;
  flex-direction: row;          /* Direction (row, row-reverse, column, column-reverse) */
  justify-content: space-between; /* Alignement horizontal (flex-start, flex-end, center, space-between, space-around) */
  align-items: center;          /* Alignement vertical (flex-start, flex-end, center, stretch, baseline) */
  flex-wrap: wrap;              /* Comportement des lignes (nowrap, wrap, wrap-reverse) */
  gap: 10px;                    /* Espacement entre les éléments */
}

/* Éléments flex */
.item {
  flex: 1;                      /* Raccourci pour flex-grow, flex-shrink, flex-basis */
  flex-grow: 1;                 /* Facteur de croissance */
  flex-shrink: 0;               /* Facteur de rétrécissement */
  flex-basis: 200px;            /* Taille de base */
  align-self: flex-start;       /* Alignement individuel (remplace align-items pour cet élément) */
  order: 2;                     /* Ordre d'affichage */
}`}</CodeBlock>
      </Section>

      <Section>
        <SectionTitle>Grid Layout</SectionTitle>
        <Paragraph>
          Le système de grille CSS permet de créer des mises en page bidimensionnelles complexes.
        </Paragraph>
        <CodeBlock>{`/* Conteneur grid */
.grid-container {
  display: grid;
  grid-template-columns: 1fr 2fr 1fr;  /* 3 colonnes (1:2:1) */
  grid-template-rows: auto 300px auto; /* 3 lignes */
  gap: 20px;                           /* Espacement entre les lignes et colonnes */
  column-gap: 20px;                    /* Espacement entre colonnes uniquement */
  row-gap: 10px;                       /* Espacement entre lignes uniquement */
}

/* Élément grid */
.grid-item {
  grid-column: 1 / 3;                  /* Étendre de la colonne 1 à la colonne 3 */
  grid-row: 2 / 4;                     /* Étendre de la ligne 2 à la ligne 4 */
  
  /* Alternative */
  grid-column: 1 / span 2;             /* Commencer à 1 et s'étendre sur 2 colonnes */
  grid-row: 2 / span 2;                /* Commencer à 2 et s'étendre sur 2 lignes */
  
  /* Raccourcis */
  grid-area: 2 / 1 / 4 / 3;            /* ligne-début / colonne-début / ligne-fin / colonne-fin */
}`}</CodeBlock>
      </Section>

      <Section>
        <SectionTitle>Responsive Design</SectionTitle>
        
        <SubSection>
          <SubTitle>Media Queries</SubTitle>
          <Paragraph>
            Les media queries permettent d'appliquer des styles en fonction des caractéristiques de l'appareil.
          </Paragraph>
          <CodeBlock>{`/* Styles pour les écrans de moins de 768px de large (mobiles) */
@media (max-width: 768px) {
  body {
    font-size: 14px;
  }
  
  .container {
    flex-direction: column;
  }
}

/* Styles pour les écrans entre 768px et 1024px (tablettes) */
@media (min-width: 768px) and (max-width: 1024px) {
  .container {
    padding: 20px;
  }
}

/* Styles pour l'orientation paysage */
@media (orientation: landscape) {
  .header {
    height: 60px;
  }
}

/* Styles pour l'impression */
@media print {
  .no-print {
    display: none;
  }
}`}</CodeBlock>
        </SubSection>
        
        <SubSection>
          <SubTitle>Unités relatives</SubTitle>
          <CodeBlock>{`body {
  font-size: 16px;         /* Pixels (px) - Taille fixe */
}

h1 {
  font-size: 2em;          /* Em - Relatif à la taille de police de l'élément parent */
  margin-bottom: 1.5rem;   /* Rem - Relatif à la taille de police de l'élément racine (html) */
}

.container {
  width: 80%;              /* Pourcentage - Relatif à la largeur de l'élément parent */
  height: 100vh;           /* Viewport Height - 100% de la hauteur de la fenêtre */
  max-width: 50vw;         /* Viewport Width - 50% de la largeur de la fenêtre */
}`}</CodeBlock>
        </SubSection>
      </Section>

      <Section>
        <SectionTitle>Transformations et Transitions</SectionTitle>
        
        <SubSection>
          <SubTitle>Transformations</SubTitle>
          <CodeBlock>{`.box {
  transform: translateX(20px);          /* Déplacement horizontal */
  transform: translateY(20px);          /* Déplacement vertical */
  transform: translate(20px, 20px);     /* Déplacement X et Y */
  
  transform: scale(1.5);                /* Agrandissement */
  transform: scaleX(1.5);               /* Agrandissement horizontal */
  
  transform: rotate(45deg);             /* Rotation */
  
  transform: skew(10deg, 20deg);        /* Inclinaison */
  
  /* Combinaisons */
  transform: translate(20px, 20px) rotate(45deg) scale(1.5);
}`}</CodeBlock>
        </SubSection>
        
        <SubSection>
          <SubTitle>Transitions</SubTitle>
          <CodeBlock>{`.box {
  width: 100px;
  background-color: blue;
  transition: width 0.3s ease, background-color 0.5s linear;
}

.box:hover {
  width: 200px;
  background-color: red;
}

/* Propriétés de transition */
.element {
  transition-property: width, height;    /* Propriétés à animer */
  transition-duration: 0.3s, 0.5s;       /* Durées */
  transition-timing-function: ease-in-out; /* Fonction de timing (ease, linear, ease-in, ease-out, cubic-bezier) */
  transition-delay: 0.1s;                /* Délai avant le début */
  
  /* Raccourci */
  transition: width 0.3s ease-in-out 0.1s, height 0.5s linear;
}`}</CodeBlock>
        </SubSection>
      </Section>

      <Section>
        <SectionTitle>Bonnes pratiques CSS</SectionTitle>
        <List>
          <li>Utilisez une méthodologie de nommage cohérente (BEM, SMACSS, etc.)</li>
          <li>Organisez votre CSS en sections logiques</li>
          <li>Minimisez la spécificité des sélecteurs</li>
          <li>Utilisez des variables CSS pour les valeurs réutilisées</li>
          <li>Évitez l'utilisation excessive de !important</li>
          <li>Privilégiez les classes aux identifiants pour le stylisme</li>
          <li>Commentez votre code pour une meilleure maintenabilité</li>
          <li>Utilisez des préprocesseurs (Sass, Less) pour les projets complexes</li>
          <li>Optimisez le CSS pour la performance (minimisez, combinez les fichiers)</li>
          <li>Testez sur différents navigateurs et appareils</li>
        </List>
      </Section>
    </Container>
  );
}; 