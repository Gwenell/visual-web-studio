import { HTMLElement, ElementCategory } from '../types/types';

const htmlElements: HTMLElement[] = [
  // Éléments de structure
  {
    tag: 'div',
    category: ElementCategory.STRUCTURE,
    description: 'Conteneur générique pour regrouper et styliser des éléments',
    selfClosing: false,
    attributes: ['id', 'class', 'style'],
    example: '<div class="container">\n  Contenu ici\n</div>',
    defaultContent: 'Contenu du div'
  },
  {
    tag: 'section',
    category: ElementCategory.STRUCTURE,
    description: 'Section thématique de contenu',
    selfClosing: false,
    attributes: ['id', 'class', 'style'],
    example: '<section>\n  <h2>Titre de section</h2>\n  <p>Contenu...</p>\n</section>',
    defaultContent: '<h2>Titre de section</h2>\n<p>Contenu de la section...</p>'
  },
  {
    tag: 'article',
    category: ElementCategory.STRUCTURE,
    description: 'Contenu indépendant et autonome',
    selfClosing: false,
    attributes: ['id', 'class', 'style'],
    example: '<article>\n  <h2>Titre d\'article</h2>\n  <p>Contenu...</p>\n</article>',
    defaultContent: '<h2>Titre d\'article</h2>\n<p>Contenu de l\'article...</p>'
  },
  {
    tag: 'header',
    category: ElementCategory.STRUCTURE,
    description: 'En-tête d\'une page ou d\'une section',
    selfClosing: false,
    attributes: ['id', 'class', 'style'],
    example: '<header>\n  <h1>Titre principal</h1>\n  <nav>Navigation...</nav>\n</header>',
    defaultContent: '<h1>Titre principal</h1>'
  },
  {
    tag: 'footer',
    category: ElementCategory.STRUCTURE,
    description: 'Pied de page d\'une page ou d\'une section',
    selfClosing: false,
    attributes: ['id', 'class', 'style'],
    example: '<footer>\n  <p>Copyright 2023</p>\n</footer>',
    defaultContent: '<p>Copyright 2023</p>'
  },
  {
    tag: 'nav',
    category: ElementCategory.STRUCTURE,
    description: 'Section de navigation (menu)',
    selfClosing: false,
    attributes: ['id', 'class', 'style'],
    example: '<nav>\n  <ul>\n    <li><a href="#">Accueil</a></li>\n    <li><a href="#">À propos</a></li>\n  </ul>\n</nav>',
    defaultContent: '<ul>\n  <li><a href="#">Accueil</a></li>\n  <li><a href="#">À propos</a></li>\n</ul>'
  },
  {
    tag: 'aside',
    category: ElementCategory.STRUCTURE,
    description: 'Contenu secondaire ou annexe',
    selfClosing: false,
    attributes: ['id', 'class', 'style'],
    example: '<aside>\n  <h3>Note</h3>\n  <p>Information complémentaire...</p>\n</aside>',
    defaultContent: '<h3>Note</h3>\n<p>Information complémentaire...</p>'
  },
  {
    tag: 'main',
    category: ElementCategory.STRUCTURE,
    description: 'Contenu principal de la page',
    selfClosing: false,
    attributes: ['id', 'class', 'style'],
    example: '<main>\n  <h1>Titre principal</h1>\n  <p>Contenu principal...</p>\n</main>',
    defaultContent: '<h1>Titre principal</h1>\n<p>Contenu principal...</p>'
  },
  
  // Éléments textuels
  {
    tag: 'h1',
    category: ElementCategory.TEXT,
    description: 'Titre de premier niveau (le plus important)',
    selfClosing: false,
    attributes: ['id', 'class', 'style'],
    example: '<h1>Titre principal</h1>',
    defaultContent: 'Titre principal'
  },
  {
    tag: 'h2',
    category: ElementCategory.TEXT,
    description: 'Titre de deuxième niveau',
    selfClosing: false,
    attributes: ['id', 'class', 'style'],
    example: '<h2>Sous-titre</h2>',
    defaultContent: 'Sous-titre'
  },
  {
    tag: 'h3',
    category: ElementCategory.TEXT,
    description: 'Titre de troisième niveau',
    selfClosing: false,
    attributes: ['id', 'class', 'style'],
    example: '<h3>Titre de section</h3>',
    defaultContent: 'Titre de section'
  },
  {
    tag: 'p',
    category: ElementCategory.TEXT,
    description: 'Paragraphe de texte',
    selfClosing: false,
    attributes: ['id', 'class', 'style'],
    example: '<p>Ceci est un paragraphe de texte.</p>',
    defaultContent: 'Ceci est un paragraphe de texte.'
  },
  {
    tag: 'span',
    category: ElementCategory.TEXT,
    description: 'Conteneur en ligne pour du texte ou des éléments',
    selfClosing: false,
    attributes: ['id', 'class', 'style'],
    example: '<p>Voici un <span style="color: red;">texte en rouge</span> dans un paragraphe.</p>',
    defaultContent: 'texte en ligne'
  },
  {
    tag: 'strong',
    category: ElementCategory.TEXT,
    description: 'Texte important (généralement en gras)',
    selfClosing: false,
    attributes: ['id', 'class', 'style'],
    example: '<p>Ceci est <strong>très important</strong>.</p>',
    defaultContent: 'texte important'
  },
  {
    tag: 'em',
    category: ElementCategory.TEXT,
    description: 'Texte accentué (généralement en italique)',
    selfClosing: false,
    attributes: ['id', 'class', 'style'],
    example: '<p>Ceci est <em>accentué</em>.</p>',
    defaultContent: 'texte accentué'
  },
  {
    tag: 'ul',
    category: ElementCategory.TEXT,
    description: 'Liste non ordonnée (à puces)',
    selfClosing: false,
    attributes: ['id', 'class', 'style'],
    example: '<ul>\n  <li>Premier élément</li>\n  <li>Deuxième élément</li>\n</ul>',
    defaultContent: '<li>Premier élément</li>\n<li>Deuxième élément</li>'
  },
  {
    tag: 'ol',
    category: ElementCategory.TEXT,
    description: 'Liste ordonnée (numérotée)',
    selfClosing: false,
    attributes: ['id', 'class', 'style', 'start', 'type'],
    example: '<ol>\n  <li>Premier élément</li>\n  <li>Deuxième élément</li>\n</ol>',
    defaultContent: '<li>Premier élément</li>\n<li>Deuxième élément</li>'
  },
  {
    tag: 'li',
    category: ElementCategory.TEXT,
    description: 'Élément de liste',
    selfClosing: false,
    attributes: ['id', 'class', 'style', 'value'],
    example: '<li>Élément de liste</li>',
    defaultContent: 'Élément de liste'
  },
  {
    tag: 'a',
    category: ElementCategory.TEXT,
    description: 'Lien hypertexte',
    selfClosing: false,
    attributes: ['href', 'target', 'rel', 'id', 'class', 'style'],
    example: '<a href="https://example.com">Visiter le site</a>',
    defaultContent: 'Lien hypertexte'
  },
  
  // Éléments de formulaire
  {
    tag: 'form',
    category: ElementCategory.FORM,
    description: 'Formulaire pour collecter des données utilisateur',
    selfClosing: false,
    attributes: ['action', 'method', 'id', 'class', 'style'],
    example: '<form action="/submit" method="post">\n  <!-- Éléments du formulaire -->\n</form>',
    defaultContent: '<!-- Éléments du formulaire -->'
  },
  {
    tag: 'input',
    category: ElementCategory.FORM,
    description: 'Champ de saisie pour formulaire',
    selfClosing: true,
    attributes: ['type', 'name', 'value', 'placeholder', 'required', 'id', 'class', 'style'],
    example: '<input type="text" name="username" placeholder="Nom d\'utilisateur">'
  },
  {
    tag: 'textarea',
    category: ElementCategory.FORM,
    description: 'Zone de texte multiligne',
    selfClosing: false,
    attributes: ['name', 'rows', 'cols', 'placeholder', 'required', 'id', 'class', 'style'],
    example: '<textarea name="message" rows="4" cols="50">Écrivez votre message ici</textarea>',
    defaultContent: 'Écrivez votre message ici'
  },
  {
    tag: 'button',
    category: ElementCategory.FORM,
    description: 'Bouton cliquable',
    selfClosing: false,
    attributes: ['type', 'id', 'class', 'style'],
    example: '<button type="submit">Envoyer</button>',
    defaultContent: 'Bouton'
  },
  {
    tag: 'select',
    category: ElementCategory.FORM,
    description: 'Liste déroulante de sélection',
    selfClosing: false,
    attributes: ['name', 'id', 'class', 'style', 'multiple', 'required'],
    example: '<select name="pays">\n  <option value="fr">France</option>\n  <option value="ca">Canada</option>\n</select>',
    defaultContent: '<option value="option1">Option 1</option>\n<option value="option2">Option 2</option>'
  },
  {
    tag: 'option',
    category: ElementCategory.FORM,
    description: 'Option dans une liste déroulante',
    selfClosing: false,
    attributes: ['value', 'selected', 'id', 'class', 'style'],
    example: '<option value="fr">France</option>',
    defaultContent: 'Option'
  },
  {
    tag: 'label',
    category: ElementCategory.FORM,
    description: 'Étiquette pour un élément de formulaire',
    selfClosing: false,
    attributes: ['for', 'id', 'class', 'style'],
    example: '<label for="username">Nom d\'utilisateur :</label>',
    defaultContent: 'Étiquette'
  },
  {
    tag: 'fieldset',
    category: ElementCategory.FORM,
    description: 'Groupe d\'éléments de formulaire',
    selfClosing: false,
    attributes: ['id', 'class', 'style'],
    example: '<fieldset>\n  <legend>Informations personnelles</legend>\n  <!-- Champs du formulaire -->\n</fieldset>',
    defaultContent: '<legend>Groupe de champs</legend>\n<!-- Champs du formulaire -->'
  },
  
  // Éléments multimédias et interactifs
  {
    tag: 'img',
    category: ElementCategory.MEDIA,
    description: 'Image',
    selfClosing: true,
    attributes: ['src', 'alt', 'width', 'height', 'id', 'class', 'style'],
    example: '<img src="image.jpg" alt="Description de l\'image">'
  },
  {
    tag: 'video',
    category: ElementCategory.MEDIA,
    description: 'Vidéo',
    selfClosing: false,
    attributes: ['src', 'controls', 'autoplay', 'loop', 'muted', 'width', 'height', 'id', 'class', 'style'],
    example: '<video src="video.mp4" controls></video>',
    defaultContent: 'Votre navigateur ne supporte pas la vidéo HTML5.'
  },
  {
    tag: 'audio',
    category: ElementCategory.MEDIA,
    description: 'Audio',
    selfClosing: false,
    attributes: ['src', 'controls', 'autoplay', 'loop', 'muted', 'id', 'class', 'style'],
    example: '<audio src="audio.mp3" controls></audio>',
    defaultContent: 'Votre navigateur ne supporte pas l\'audio HTML5.'
  },
  {
    tag: 'iframe',
    category: ElementCategory.MEDIA,
    description: 'Cadre intégré (page web dans une page)',
    selfClosing: false,
    attributes: ['src', 'width', 'height', 'frameborder', 'allowfullscreen', 'id', 'class', 'style'],
    example: '<iframe src="https://www.example.com" width="500" height="300"></iframe>',
    defaultContent: ''
  },
  {
    tag: 'canvas',
    category: ElementCategory.MEDIA,
    description: 'Zone de dessin pour JavaScript',
    selfClosing: false,
    attributes: ['width', 'height', 'id', 'class', 'style'],
    example: '<canvas id="monCanvas" width="200" height="200"></canvas>',
    defaultContent: ''
  },
  {
    tag: 'table',
    category: ElementCategory.MEDIA,
    description: 'Tableau de données',
    selfClosing: false,
    attributes: ['id', 'class', 'style', 'border'],
    example: '<table>\n  <tr>\n    <th>En-tête 1</th>\n    <th>En-tête 2</th>\n  </tr>\n  <tr>\n    <td>Donnée 1</td>\n    <td>Donnée 2</td>\n  </tr>\n</table>',
    defaultContent: '<tr>\n  <th>En-tête 1</th>\n  <th>En-tête 2</th>\n</tr>\n<tr>\n  <td>Donnée 1</td>\n  <td>Donnée 2</td>\n</tr>'
  },
  {
    tag: 'details',
    category: ElementCategory.MEDIA,
    description: 'Contrôle qui révèle des informations additionnelles',
    selfClosing: false,
    attributes: ['open', 'id', 'class', 'style'],
    example: '<details>\n  <summary>Cliquez pour plus d\'infos</summary>\n  <p>Informations détaillées ici...</p>\n</details>',
    defaultContent: '<summary>Cliquez pour plus d\'infos</summary>\n<p>Informations détaillées ici...</p>'
  }
];

export default htmlElements; 