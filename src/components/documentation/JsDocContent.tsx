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

export const JsDocContent: React.FC = () => {
  return (
    <Container>
      <Section>
        <SectionTitle>Introduction à JavaScript</SectionTitle>
        <Paragraph>
          JavaScript est un langage de programmation qui permet d'ajouter de l'interactivité aux pages web.
          Il s'exécute côté client, directement dans le navigateur web de l'utilisateur.
        </Paragraph>
        <Paragraph>
          JavaScript permet de manipuler le contenu HTML, modifier les styles CSS, réagir aux événements utilisateur, 
          communiquer avec des serveurs, et bien plus encore.
        </Paragraph>
      </Section>

      <Section>
        <SectionTitle>Intégration de JavaScript</SectionTitle>
        <SubSection>
          <SubTitle>1. JavaScript interne</SubTitle>
          <Paragraph>
            Placez le code JavaScript dans une balise <CodeInline>{'<script>'}</CodeInline> dans votre document HTML.
          </Paragraph>
          <CodeBlock>{`<script>
  // Votre code JavaScript ici
  console.log("Bonjour depuis JavaScript!");
</script>`}</CodeBlock>
        </SubSection>
        
        <SubSection>
          <SubTitle>2. JavaScript externe (recommandé)</SubTitle>
          <Paragraph>
            Créez un fichier JavaScript séparé et liez-le à votre HTML.
          </Paragraph>
          <CodeBlock>{`<script src="script.js"></script>`}</CodeBlock>
          <Paragraph>
            Contenu du fichier "script.js" :
          </Paragraph>
          <CodeBlock>{`// Votre code JavaScript
console.log("Bonjour depuis un fichier externe!");`}</CodeBlock>
        </SubSection>
        
        <SubSection>
          <SubTitle>3. Attributs d'événement en ligne</SubTitle>
          <Paragraph>
            Ajoutez directement du code JavaScript aux attributs d'événement des éléments HTML.
          </Paragraph>
          <CodeBlock>{`<button onclick="alert('Bouton cliqué!')">Cliquez-moi</button>`}</CodeBlock>
          <Paragraph>
            Cette méthode n'est généralement pas recommandée car elle mélange le HTML et le JavaScript.
          </Paragraph>
        </SubSection>
      </Section>

      <Section>
        <SectionTitle>Syntaxe de base</SectionTitle>
        
        <SubSection>
          <SubTitle>Variables et constantes</SubTitle>
          <CodeBlock>{`// Déclaration de variables avec let (recommandé)
let nom = "Jean";
let age = 25;
let estEtudiant = true;

// Constantes (valeurs qui ne changent pas)
const PI = 3.14159;
const COULEUR_PRINCIPALE = "#333";

// Variable avec var (ancien, moins recommandé)
var ancienneVariable = "ancienne façon";`}</CodeBlock>
        </SubSection>
        
        <SubSection>
          <SubTitle>Types de données</SubTitle>
          <CodeBlock>{`// Chaîne de caractères (string)
let texte = "Bonjour";
let texte2 = 'Monde';
let texte3 = \`Bonjour \${nom}\`; // Template string avec interpolation

// Nombres (number)
let entier = 42;
let decimal = 3.14;

// Booléen (boolean)
let vrai = true;
let faux = false;

// Tableau (array)
let fruits = ["pomme", "banane", "orange"];

// Objet (object)
let personne = {
  nom: "Dupont",
  prenom: "Jean",
  age: 30
};

// Valeurs spéciales
let valeurNulle = null;
let valeurNonDefinie = undefined;`}</CodeBlock>
        </SubSection>
        
        <SubSection>
          <SubTitle>Opérateurs</SubTitle>
          <CodeBlock>{`// Opérateurs arithmétiques
let somme = 5 + 3;      // Addition
let difference = 10 - 4; // Soustraction
let produit = 7 * 2;     // Multiplication
let quotient = 8 / 2;    // Division
let reste = 10 % 3;      // Modulo (reste de la division)
let puissance = 2 ** 3;  // Exponentiation (2 à la puissance 3)

// Opérateurs d'assignation
let x = 5;
x += 3;  // Équivalent à x = x + 3
x -= 2;  // Équivalent à x = x - 2
x *= 4;  // Équivalent à x = x * 4
x /= 2;  // Équivalent à x = x / 2

// Opérateurs de comparaison
let egal = 5 == "5";          // Égalité de valeur (true)
let strictementEgal = 5 === "5"; // Égalité de valeur et de type (false)
let different = 5 != "6";      // Différence de valeur (true)
let strictementDifferent = 5 !== "5"; // Différence de valeur ou de type (true)
let superieur = 10 > 5;        // Supérieur à (true)
let inferieur = 5 < 10;        // Inférieur à (true)

// Opérateurs logiques
let et = (5 > 3) && (10 > 5);  // ET logique (true si les deux conditions sont vraies)
let ou = (5 > 10) || (10 > 5); // OU logique (true si au moins une condition est vraie)
let non = !(5 > 10);           // NON logique (inverse la condition)`}</CodeBlock>
        </SubSection>
      </Section>

      <Section>
        <SectionTitle>Structures de contrôle</SectionTitle>
        
        <SubSection>
          <SubTitle>Conditions</SubTitle>
          <CodeBlock>{`// If, else if, else
let age = 18;

if (age < 13) {
  console.log("Enfant");
} else if (age < 18) {
  console.log("Adolescent");
} else {
  console.log("Adulte");
}

// Opérateur ternaire (condition ? valeurSiVrai : valeurSiFaux)
let message = age >= 18 ? "Majeur" : "Mineur";

// Switch
let jour = "Lundi";

switch (jour) {
  case "Lundi":
    console.log("Début de semaine");
    break;
  case "Vendredi":
    console.log("Fin de semaine");
    break;
  case "Samedi":
  case "Dimanche":
    console.log("Weekend");
    break;
  default:
    console.log("Milieu de semaine");
}`}</CodeBlock>
        </SubSection>
        
        <SubSection>
          <SubTitle>Boucles</SubTitle>
          <CodeBlock>{`// Boucle for
for (let i = 0; i < 5; i++) {
  console.log("Itération " + i);
}

// Boucle while
let compteur = 0;
while (compteur < 5) {
  console.log("Compteur: " + compteur);
  compteur++;
}

// Boucle do-while (s'exécute au moins une fois)
let j = 0;
do {
  console.log("Valeur de j: " + j);
  j++;
} while (j < 3);

// Boucle for...of (pour les tableaux et autres itérables)
let couleurs = ["rouge", "vert", "bleu"];
for (let couleur of couleurs) {
  console.log(couleur);
}

// Boucle for...in (pour les propriétés d'un objet)
let personne = { nom: "Dupont", prenom: "Jean", age: 30 };
for (let propriete in personne) {
  console.log(propriete + ": " + personne[propriete]);
}`}</CodeBlock>
        </SubSection>
      </Section>

      <Section>
        <SectionTitle>Fonctions</SectionTitle>
        
        <SubSection>
          <SubTitle>Déclaration de fonctions</SubTitle>
          <CodeBlock>{`// Fonction déclarée
function saluer(nom) {
  return "Bonjour, " + nom + "!";
}

// Fonction anonyme et expression de fonction
let dire = function(message) {
  console.log(message);
};

// Fonction fléchée (arrow function)
const additionner = (a, b) => a + b;

// Fonction fléchée avec plusieurs instructions
const calculer = (a, b) => {
  let resultat = a * b;
  return resultat + 10;
};

// Appeler une fonction
let message = saluer("Marie");
console.log(message);  // Affiche: Bonjour, Marie!

dire("Hello");  // Affiche: Hello

let somme = additionner(5, 3);  // somme = 8`}</CodeBlock>
        </SubSection>
        
        <SubSection>
          <SubTitle>Paramètres et arguments</SubTitle>
          <CodeBlock>{`// Paramètres par défaut
function afficherInfo(nom, age = 30) {
  console.log(\`Nom: \${nom}, Age: \${age}\`);
}

afficherInfo("Jean");  // Affiche: Nom: Jean, Age: 30
afficherInfo("Marie", 25);  // Affiche: Nom: Marie, Age: 25

// Paramètres du reste (rest parameters)
function somme(...nombres) {
  return nombres.reduce((total, nombre) => total + nombre, 0);
}

console.log(somme(1, 2, 3, 4));  // Affiche: 10`}</CodeBlock>
        </SubSection>
      </Section>

      <Section>
        <SectionTitle>Objets et tableaux</SectionTitle>
        
        <SubSection>
          <SubTitle>Objets</SubTitle>
          <CodeBlock>{`// Création d'un objet
let personne = {
  nom: "Dupont",
  prenom: "Jean",
  age: 30,
  adresse: {
    rue: "123 Rue Principale",
    ville: "Paris"
  },
  // Méthode dans un objet
  sePresenter: function() {
    return \`Je m'appelle \${this.prenom} \${this.nom} et j'ai \${this.age} ans.\`;
  }
};

// Accéder aux propriétés
console.log(personne.nom);  // Dupont
console.log(personne["prenom"]);  // Jean
console.log(personne.adresse.ville);  // Paris

// Appeler une méthode
console.log(personne.sePresenter());  // Je m'appelle Jean Dupont et j'ai 30 ans.

// Ajouter une propriété
personne.email = "jean.dupont@example.com";

// Supprimer une propriété
delete personne.age;`}</CodeBlock>
        </SubSection>
        
        <SubSection>
          <SubTitle>Tableaux</SubTitle>
          <CodeBlock>{`// Création d'un tableau
let fruits = ["pomme", "banane", "orange"];

// Accéder aux éléments
console.log(fruits[0]);  // pomme

// Longueur du tableau
console.log(fruits.length);  // 3

// Méthodes des tableaux
fruits.push("fraise");  // Ajoute à la fin
fruits.unshift("kiwi");  // Ajoute au début
let dernierFruit = fruits.pop();  // Supprime et retourne le dernier élément
let premierFruit = fruits.shift();  // Supprime et retourne le premier élément

// Trouver un élément
let index = fruits.indexOf("banane");  // Retourne l'index ou -1 si non trouvé

// Découpage
let portion = fruits.slice(1, 3);  // Extrait de l'index 1 à 2 (exclu)

// Fusion
let legumes = ["carotte", "poivron"];
let aliments = fruits.concat(legumes);

// Itération avec forEach
fruits.forEach(function(fruit, index) {
  console.log(index + ": " + fruit);
});

// Filtrage
let fruitsCourts = fruits.filter(fruit => fruit.length < 6);

// Transformation
let fruitsEnMajuscules = fruits.map(fruit => fruit.toUpperCase());

// Réduction
let total = [1, 2, 3, 4].reduce((acc, val) => acc + val, 0);  // 10`}</CodeBlock>
        </SubSection>
      </Section>

      <Section>
        <SectionTitle>Manipulation du DOM</SectionTitle>
        <Paragraph>
          Le DOM (Document Object Model) est une représentation en mémoire de la structure HTML d'une page web.
          JavaScript peut manipuler cette structure pour modifier dynamiquement le contenu et le comportement de la page.
        </Paragraph>
        
        <SubSection>
          <SubTitle>Sélection d'éléments</SubTitle>
          <CodeBlock>{`// Sélectionner par ID
let titre = document.getElementById("titre");

// Sélectionner par classe (retourne une collection)
let paragraphes = document.getElementsByClassName("paragraphe");

// Sélectionner par nom de balise (retourne une collection)
let boutons = document.getElementsByTagName("button");

// Sélectionner avec des sélecteurs CSS (retourne le premier élément correspondant)
let premierParagraphe = document.querySelector("p");

// Sélectionner tous les éléments correspondant à un sélecteur CSS
let tousLesParagraphes = document.querySelectorAll("p");`}</CodeBlock>
        </SubSection>
        
        <SubSection>
          <SubTitle>Modification du contenu</SubTitle>
          <CodeBlock>{`// Modifier le texte
titre.textContent = "Nouveau titre";

// Modifier le HTML
paragraphe.innerHTML = "Texte avec <strong>formatage</strong>";

// Manipuler les attributs
let lien = document.querySelector("a");
lien.setAttribute("href", "https://example.com");
let hrefAttribute = lien.getAttribute("href");
lien.removeAttribute("target");

// Manipuler les classes
let element = document.querySelector(".item");
element.classList.add("active");
element.classList.remove("inactive");
element.classList.toggle("visible");
let contientClasse = element.classList.contains("active");

// Manipuler les styles
element.style.color = "red";
element.style.fontSize = "16px";
element.style.display = "none";`}</CodeBlock>
        </SubSection>
        
        <SubSection>
          <SubTitle>Création et manipulation d'éléments</SubTitle>
          <CodeBlock>{`// Créer un nouvel élément
let nouveauParagraphe = document.createElement("p");
nouveauParagraphe.textContent = "Ceci est un nouveau paragraphe.";

// Ajouter l'élément au DOM
let container = document.querySelector(".container");
container.appendChild(nouveauParagraphe);

// Insérer avant un élément
let reference = document.querySelector(".reference");
container.insertBefore(nouveauParagraphe, reference);

// Remplacer un élément
container.replaceChild(nouveauParagraphe, ancienParagraphe);

// Supprimer un élément
container.removeChild(paragrapheASupprimer);
// ou
paragrapheASupprimer.remove();

// Cloner un élément
let clone = element.cloneNode(true);  // true pour cloner également les descendants`}</CodeBlock>
        </SubSection>
      </Section>

      <Section>
        <SectionTitle>Événements</SectionTitle>
        <Paragraph>
          Les événements permettent à JavaScript de réagir aux actions de l'utilisateur ou à d'autres déclencheurs.
        </Paragraph>
        
        <SubSection>
          <SubTitle>Ajout d'écouteurs d'événements</SubTitle>
          <CodeBlock>{`// Méthode addEventListener (recommandée)
let bouton = document.querySelector("#monBouton");

bouton.addEventListener("click", function(event) {
  console.log("Bouton cliqué!");
  console.log(event);  // Objet événement
});

// Avec une fonction nommée
function handleClick(event) {
  console.log("Fonction de gestionnaire nommée");
}

bouton.addEventListener("click", handleClick);

// Supprimer un écouteur
bouton.removeEventListener("click", handleClick);`}</CodeBlock>
        </SubSection>
        
        <SubSection>
          <SubTitle>Types d'événements courants</SubTitle>
          <CodeBlock>{`// Événements de souris
element.addEventListener("click", handleClick);      // Clic
element.addEventListener("dblclick", handleDblClick); // Double-clic
element.addEventListener("mouseenter", handleMouseEnter); // Souris entre
element.addEventListener("mouseleave", handleMouseLeave); // Souris sort
element.addEventListener("mousemove", handleMouseMove);   // Souris se déplace

// Événements de clavier
document.addEventListener("keydown", handleKeyDown);  // Touche enfoncée
document.addEventListener("keyup", handleKeyUp);      // Touche relâchée
document.addEventListener("keypress", handleKeyPress); // Touche pressée (caractère)

// Événements de formulaire
form.addEventListener("submit", handleSubmit);        // Soumission
input.addEventListener("focus", handleFocus);         // Élément obtient le focus
input.addEventListener("blur", handleBlur);           // Élément perd le focus
input.addEventListener("change", handleChange);       // Valeur modifiée
input.addEventListener("input", handleInput);         // Entrée en temps réel

// Événements de document
window.addEventListener("load", handleLoad);          // Page chargée
window.addEventListener("resize", handleResize);      // Fenêtre redimensionnée
window.addEventListener("scroll", handleScroll);      // Défilement`}</CodeBlock>
        </SubSection>
        
        <SubSection>
          <SubTitle>L'objet événement</SubTitle>
          <CodeBlock>{`function handleEvent(event) {
  // Informations générales
  console.log(event.type);            // Type d'événement (ex: "click")
  console.log(event.target);          // Élément qui a déclenché l'événement
  console.log(event.currentTarget);   // Élément auquel l'écouteur est attaché
  
  // Pour les événements de souris
  console.log(event.clientX, event.clientY);  // Coordonnées dans la fenêtre
  console.log(event.pageX, event.pageY);      // Coordonnées dans le document
  
  // Pour les événements de clavier
  console.log(event.key);             // Touche pressée
  console.log(event.keyCode);         // Code de la touche (obsolète)
  console.log(event.ctrlKey);         // Si Ctrl est enfoncé
  
  // Empêcher le comportement par défaut
  event.preventDefault();
  
  // Arrêter la propagation de l'événement
  event.stopPropagation();
}`}</CodeBlock>
        </SubSection>
      </Section>

      <Section>
        <SectionTitle>Asynchrone en JavaScript</SectionTitle>
        
        <SubSection>
          <SubTitle>Callbacks</SubTitle>
          <CodeBlock>{`// Exemple avec setTimeout
function afficherMessage(message) {
  console.log(message);
}

setTimeout(function() {
  afficherMessage("Ce message s'affiche après 2 secondes");
}, 2000);

// Callback hell (problème de lisibilité)
getData(function(a) {
  getMoreData(a, function(b) {
    getEvenMoreData(b, function(c) {
      console.log(c);
    });
  });
});`}</CodeBlock>
        </SubSection>
        
        <SubSection>
          <SubTitle>Promesses</SubTitle>
          <CodeBlock>{`// Création d'une promesse
let maPromesse = new Promise(function(resolve, reject) {
  // Opération asynchrone
  let succes = true;
  
  if (succes) {
    resolve("Opération réussie!");  // Succès
  } else {
    reject("Erreur lors de l'opération");  // Échec
  }
});

// Utilisation d'une promesse
maPromesse
  .then(function(resultat) {
    console.log(resultat);  // Succès
    return "Nouvelle valeur";
  })
  .then(function(nouvelleValeur) {
    console.log(nouvelleValeur);
  })
  .catch(function(erreur) {
    console.error(erreur);  // Gestion des erreurs
  })
  .finally(function() {
    console.log("Exécuté quoi qu'il arrive");
  });

// Exemple avec fetch (API réseau basée sur les promesses)
fetch('https://api.example.com/data')
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error('Erreur:', error));`}</CodeBlock>
        </SubSection>
        
        <SubSection>
          <SubTitle>Async/Await</SubTitle>
          <CodeBlock>{`// Fonction asynchrone
async function getData() {
  try {
    // await suspend l'exécution jusqu'à ce que la promesse soit résolue
    let response = await fetch('https://api.example.com/data');
    let data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.error('Erreur:', error);
  }
}

// Appel d'une fonction async
getData().then(data => {
  console.log('Données traitées:', data);
});

// Avec une fonction fléchée
const fetchUsers = async () => {
  const response = await fetch('https://api.example.com/users');
  const users = await response.json();
  return users;
};`}</CodeBlock>
        </SubSection>
      </Section>

      <Section>
        <SectionTitle>Bonnes pratiques JavaScript</SectionTitle>
        <List>
          <li>Utilisez les versions modernes de JavaScript (ES6+) pour profiter des fonctionnalités avancées</li>
          <li>Préférez <CodeInline>let</CodeInline> et <CodeInline>const</CodeInline> à <CodeInline>var</CodeInline> pour la déclaration de variables</li>
          <li>Utilisez des fonctions fléchées pour les fonctions courtes et les callbacks</li>
          <li>Évitez la modification de variables globales</li>
          <li>Préférez <CodeInline>===</CodeInline> (égalité stricte) à <CodeInline>==</CodeInline></li>
          <li>Utilisez des commentaires pour expliquer votre code, surtout les parties complexes</li>
          <li>Séparez votre code en fonctions réutilisables avec une seule responsabilité</li>
          <li>Gérez toujours les erreurs, surtout dans le code asynchrone</li>
          <li>Évitez les boucles imbriquées et les conditions trop complexes</li>
          <li>Utilisez des noms de variables et de fonctions descriptifs</li>
          <li>Testez votre code régulièrement</li>
          <li>Utilisez des outils comme ESLint pour maintenir un code propre et cohérent</li>
        </List>
      </Section>
    </Container>
  );
}; 