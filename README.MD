# Miaou - Application de Chat IA

Une application mobile de chat alimentée par l'API Mistral AI, construite avec React Native et Expo.

## 🚀 Fonctionnalités

- Interface de chat intuitive
- Intégration avec l'API Mistral AI
- Support des thèmes clair/sombre
- Stockage local des messages
- Interface utilisateur responsive

## 🛠 Technologies Utilisées

- React Native
- Expo
- TypeScript
- Zustand (Gestion d'état)
- React Navigation
- AsyncStorage
- API Mistral AI

## 📱 Prérequis

- Node.js (version 20.16.0)
- npm ou yarn
- Expo CLI
- Un compte Expo
- Une clé API Mistral AI

## 🔧 Installation

1. Clonez le dépôt :

```bash
git clone https://github.com/jcommaret/miaou.git
cd miaou
```

2. Installez les dépendances :

```bash
npm install
```

3. Créez un fichier `.env` à la racine du projet :

```plaintext
MISTRAL_API_KEY=votre_clé_api_mistral
MISTRAL_MODEL=votre_modèle_choisi
```

4. Lancez l'application :

```bash
npm start
```

## 📦 Scripts Disponibles

- `npm start` : Lance le serveur de développement Expo
- `npm run android` : Lance l'application sur Android
- `npm run ios` : Lance l'application sur iOS
- `npm run web` : Lance l'application en version web

## 🏗 Structure du Projet

```plaintext
src/
  ├── navigation/    # Configuration de la navigation
  ├── screens/       # Écrans de l'application
  ├── services/      # Services (API, stockage)
  ├── styles/        # Styles et thèmes
  ├── types/         # Types TypeScript
  └── config.js      # Configuration de l'application
```

## 🚀 Déploiement

Le déploiement est automatisé via GitHub Actions. Chaque push sur la branche principale déclenche un build sur EAS.

## 📄 Licence

MIT

## 👥 Contribution

Les contributions sont les bienvenues ! N'hésitez pas à ouvrir une issue ou soumettre une pull request.
