# Visual Web Studio

Un environnement de développement web intégré (IDE) visuel qui permet de créer, éditer et prévisualiser des projets web en temps réel. Visual Web Studio offre une approche pédagogique et intuitive du développement web, avec des guides interactifs et une prévisualisation instantanée.


## Fonctionnalités principales

- **Éditeur de code intégré** pour HTML, CSS et JavaScript
- **Prévisualisation en temps réel** de vos modifications
- **Bibliothèque d'éléments** pour ajouter rapidement des composants HTML
- **Panneau de propriétés intelligent** qui affiche des informations détaillées sur les éléments sélectionnés
- **Mode visuel et mode code** pour alterner entre approche visuelle et édition directe
- **Sauvegarde automatique** et gestion des projets
- **Guides intégrés** pour apprendre les bonnes pratiques HTML, CSS et JavaScript

## Guide d'utilisation

### Création d'un projet

1. Sur la page d'accueil, cliquez sur "Nouveau projet"
2. Donnez un nom à votre projet
3. Choisissez un modèle de départ (facultatif)
4. Commencez à éditer!

### Interface de l'éditeur

L'éditeur est divisé en trois sections principales:

- **Panneau gauche**: Bibliothèque d'éléments que vous pouvez glisser-déposer dans votre projet
- **Zone centrale**: Éditeur de code et prévisualisation
- **Panneau droit**: Propriétés de l'élément sélectionné avec guides détaillés

### Édition visuelle vs. code

- Pour ajouter des éléments visuellement, faites glisser les éléments depuis la bibliothèque
- Pour éditer directement le code, cliquez sur les onglets HTML, CSS ou JavaScript
- Tous les changements sont synchronisés entre les modes

### Guide des propriétés

Lorsque vous sélectionnez un élément dans la prévisualisation:

1. Le panneau de propriétés affiche les attributs HTML, styles CSS et interactions JavaScript de l'élément
2. Des explications détaillées et exemples de code sont fournis pour chaque propriété
3. Des suggestions adaptées au type d'élément vous aident à améliorer votre code

### Sauvegarde et exportation

- Vos projets sont automatiquement sauvegardés dans le stockage local du navigateur
- Utilisez le bouton "Sauvegarder" pour enregistrer manuellement
- Exportez votre projet pour télécharger les fichiers HTML, CSS et JavaScript

## Installation et déploiement

### Prérequis

- Node.js 14.x ou supérieur
- npm 6.x ou supérieur

### Installation locale

```bash
# Cloner le dépôt
git clone https://github.com/VOTRE-USERNAME/visual-web-studio.git
cd visual-web-studio

# Installer les dépendances
npm install

# Lancer en mode développement
npm start
```

### Déploiement

```bash
# Créer une version de production
npm run build

# Le résultat se trouve dans le dossier /build
```

## Technologies utilisées

- **React** pour l'interface utilisateur
- **CodeMirror** pour l'éditeur de code
- **styled-components** pour les styles
- **localStorage** pour la sauvegarde des projets

## Public cible

- **Débutants en développement web** souhaitant apprendre HTML, CSS et JavaScript
- **Enseignants et formateurs** cherchant un outil pédagogique pour le développement web
- **Développeurs** souhaitant prototyper rapidement des interfaces
- **Designers web** voulant concrétiser leurs maquettes sans coder

## Contribution

Les contributions sont bienvenues! N'hésitez pas à:
1. Fork le projet
2. Créer une branche pour votre fonctionnalité (`git checkout -b feature/amazing-feature`)
3. Commit vos changements (`git commit -m 'Add some amazing feature'`)
4. Push vers la branche (`git push origin feature/amazing-feature`)
5. Ouvrir une Pull Request

