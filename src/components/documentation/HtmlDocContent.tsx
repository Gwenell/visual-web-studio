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

export const HtmlDocContent: React.FC = () => {
  return (
    <Container>
      <Section>
        <SectionTitle>Introduction à HTML</SectionTitle>
        <Paragraph>
          HTML (HyperText Markup Language) est le langage standard pour créer des pages web.
          Il décrit la structure d'une page web en utilisant des balises pour définir différents éléments.
        </Paragraph>
        <Paragraph>
          Les fichiers HTML sont interprétés par les navigateurs web pour afficher le contenu aux utilisateurs.
        </Paragraph>
      </Section>

      <Section>
        <SectionTitle>Structure de base d'un document HTML</SectionTitle>
        <CodeBlock>{`<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Titre de la page</title>
</head>
<body>
  <!-- Contenu de la page -->
</body>
</html>`}</CodeBlock>
        <List>
          <li><CodeInline>{'<!DOCTYPE html>'}</CodeInline> : Déclaration du type de document (HTML5)</li>
          <li><CodeInline>{'<html>'}</CodeInline> : Élément racine qui contient tout le contenu HTML</li>
          <li><CodeInline>{'<head>'}</CodeInline> : Contient les métadonnées comme le titre, les liens CSS, etc.</li>
          <li><CodeInline>{'<meta>'}</CodeInline> : Définit les métadonnées comme l'encodage des caractères</li>
          <li><CodeInline>{'<title>'}</CodeInline> : Définit le titre de la page (affiché dans l'onglet du navigateur)</li>
          <li><CodeInline>{'<body>'}</CodeInline> : Contient tout le contenu visible de la page</li>
        </List>
      </Section>

      <Section>
        <SectionTitle>Éléments HTML de base</SectionTitle>
        
        <SubSection>
          <SubTitle>Titres</SubTitle>
          <Paragraph>
            HTML propose six niveaux de titres, de <CodeInline>{'<h1>'}</CodeInline> (le plus important) à <CodeInline>{'<h6>'}</CodeInline> (le moins important).
          </Paragraph>
          <CodeBlock>{`<h1>Titre principal</h1>
<h2>Sous-titre</h2>
<h3>Titre de niveau 3</h3>
<h4>Titre de niveau 4</h4>
<h5>Titre de niveau 5</h5>
<h6>Titre de niveau 6</h6>`}</CodeBlock>
        </SubSection>
        
        <SubSection>
          <SubTitle>Paragraphes et sauts de ligne</SubTitle>
          <Paragraph>
            Les paragraphes sont définis avec la balise <CodeInline>{'<p>'}</CodeInline> et les sauts de ligne avec <CodeInline>{'<br>'}</CodeInline>.
          </Paragraph>
          <CodeBlock>{`<p>Ceci est un paragraphe. Il peut contenir du texte, des liens, des images, etc.</p>
<p>Ceci est un autre paragraphe.<br>Avec un saut de ligne.</p>`}</CodeBlock>
        </SubSection>
        
        <SubSection>
          <SubTitle>Formatage de texte</SubTitle>
          <Paragraph>
            HTML permet de mettre en forme le texte avec différentes balises.
          </Paragraph>
          <CodeBlock>{`<strong>Texte en gras</strong>
<em>Texte en italique</em>
<u>Texte souligné</u>
<mark>Texte surligné</mark>
<small>Texte plus petit</small>
<del>Texte barré</del>
<sub>Texte en indice</sub>
<sup>Texte en exposant</sup>`}</CodeBlock>
        </SubSection>
        
        <SubSection>
          <SubTitle>Listes</SubTitle>
          <Paragraph>
            HTML propose des listes ordonnées, non ordonnées et de définition.
          </Paragraph>
          <CodeBlock>{`<!-- Liste non ordonnée -->
<ul>
  <li>Élément 1</li>
  <li>Élément 2</li>
</ul>

<!-- Liste ordonnée -->
<ol>
  <li>Première étape</li>
  <li>Deuxième étape</li>
</ol>

<!-- Liste de définition -->
<dl>
  <dt>HTML</dt>
  <dd>HyperText Markup Language</dd>
  <dt>CSS</dt>
  <dd>Cascading Style Sheets</dd>
</dl>`}</CodeBlock>
        </SubSection>
        
        <SubSection>
          <SubTitle>Liens</SubTitle>
          <Paragraph>
            Les liens sont créés avec la balise <CodeInline>{'<a>'}</CodeInline> et l'attribut <CodeInline>href</CodeInline>.
          </Paragraph>
          <CodeBlock>{`<a href="https://example.com">Visiter Example.com</a>
<a href="page2.html">Lien vers une autre page</a>
<a href="mailto:contact@example.com">Envoyer un email</a>
<a href="tel:+33123456789">Appeler</a>
<a href="#section1">Lien vers une section de la page</a>`}</CodeBlock>
        </SubSection>
        
        <SubSection>
          <SubTitle>Images</SubTitle>
          <Paragraph>
            Les images sont insérées avec la balise <CodeInline>{'<img>'}</CodeInline>.
          </Paragraph>
          <CodeBlock>{`<img src="image.jpg" alt="Description de l'image" width="300" height="200">`}</CodeBlock>
          <Paragraph>
            L'attribut <CodeInline>alt</CodeInline> est important pour l'accessibilité et le référencement.
          </Paragraph>
        </SubSection>
      </Section>

      <Section>
        <SectionTitle>Tableaux</SectionTitle>
        <Paragraph>
          Les tableaux sont utilisés pour présenter des données sous forme de lignes et de colonnes.
        </Paragraph>
        <CodeBlock>{`<table>
  <thead>
    <tr>
      <th>En-tête 1</th>
      <th>En-tête 2</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Donnée 1</td>
      <td>Donnée 2</td>
    </tr>
    <tr>
      <td>Donnée 3</td>
      <td>Donnée 4</td>
    </tr>
  </tbody>
</table>`}</CodeBlock>
      </Section>

      <Section>
        <SectionTitle>Formulaires</SectionTitle>
        <Paragraph>
          Les formulaires permettent aux utilisateurs d'envoyer des données.
        </Paragraph>
        <CodeBlock>{`<form action="/submit" method="post">
  <div>
    <label for="name">Nom:</label>
    <input type="text" id="name" name="name" required>
  </div>
  
  <div>
    <label for="email">Email:</label>
    <input type="email" id="email" name="email" required>
  </div>
  
  <div>
    <label for="message">Message:</label>
    <textarea id="message" name="message" rows="4"></textarea>
  </div>
  
  <div>
    <label>
      <input type="checkbox" name="subscribe"> S'abonner à la newsletter
    </label>
  </div>
  
  <div>
    <button type="submit">Envoyer</button>
  </div>
</form>`}</CodeBlock>
        <Paragraph>
          HTML5 propose de nombreux types d'entrées: text, email, number, date, color, etc.
        </Paragraph>
      </Section>

      <Section>
        <SectionTitle>HTML sémantique</SectionTitle>
        <Paragraph>
          Le HTML sémantique utilise des balises qui décrivent clairement leur contenu, améliorant l'accessibilité et le référencement.
        </Paragraph>
        <CodeBlock>{`<header>En-tête du site</header>
<nav>Navigation principale</nav>
<main>
  <article>
    <header>En-tête de l'article</header>
    <section>Section de l'article</section>
    <footer>Pied de l'article</footer>
  </article>
  <aside>Contenu complémentaire</aside>
</main>
<footer>Pied de page du site</footer>`}</CodeBlock>
      </Section>

      <Section>
        <SectionTitle>Bonnes pratiques HTML</SectionTitle>
        <List>
          <li>Utilisez des balises sémantiques pour décrire le contenu</li>
          <li>Validez votre HTML avec des outils comme le validateur W3C</li>
          <li>Utilisez des attributs alt pour les images</li>
          <li>Assurez-vous que votre site est accessible (ARIA, structure logique)</li>
          <li>Optimisez pour les appareils mobiles avec des meta viewports adaptés</li>
          <li>Organisez votre code avec une indentation claire</li>
          <li>Séparez le contenu (HTML) de la présentation (CSS) et du comportement (JS)</li>
        </List>
      </Section>
    </Container>
  );
}; 