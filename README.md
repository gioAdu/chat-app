# Chat App

## Description

Chat App is a real-time chat application that allows users to seamlessly communicate with each other. It provides essential features such as user authentication, messaging, searching for users, viewing older conversations, and managing user profiles.

The application is built using Next.js for the frontend, Firebase for the backend and hosting, and Material-UI (MUI) for styling.

## Table of Contents

- [Getting Started](#getting-started)
- [Usage](#usage)
- [Features](#features)
- [Screenshots](#Screenshots)
- [License](#license)
- [Acknowledgments](#acknowledgments)

## Getting Started

To get started with Chat App, follow these steps:

1. Clone the GitHub repository:

   ```bash
   git clone https://github.com/your-username/chat-app.git
   ```

2. Change into the project directory:

   ```bash
   cd chat-app
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

4. Initialize Firebase:

   - Create a project on the [Firebase Console](https://console.firebase.google.com/).
   - Obtain your Firebase configuration object (usually found in your Firebase project settings).
   - Create a `.env` file in the project root and add the following variables:

      ```
      NEXT_PUBLIC_FIREBASE_API_KEY=your-api-key
      NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-auth-domain
      NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
      NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-storage-bucket
      NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your-messaging-sender-id
      NEXT_PUBLIC_FIREBASE_APP_ID=your-app-id
      ```
      
   - Replace the values with your Firebase project's configuration.

5. Start the development server:

   ```bash
   npm run dev
   ```

   Or, if you prefer to build and run the production version:

   ```bash
   npm run build
   npm start
   ```

6. run tests:
   ```bash
   npm test
   ```

## Usage

Chat App provides the following functionalities:

- **User Authentication:** Sign up and sign in securely to access the chat features.
- **Messaging:** Send and receive real-time messages with other users.
- **User Search:** Find other users to start conversations with.
- **Conversation History:** Search and view older conversations.
- **Profile Management:** View your profile, change your name, and update your password.

## Features

- Real-time messaging
- User authentication
- User search functionality
- Conversation history retrieval
- Profile management

## Screenshots

|               Sign in                |               Sign Up                |
| :----------------------------------: | :----------------------------------: |
| ![Sign in](public/screenshots/1.png) | ![Sign up](public/screenshots/2.png) |



|               Mobile Chat                |                Mobile Layout                |
| :--------------------------------------: | :-----------------------------------------: |
| ![Mobile Chat](public/screenshots/9.png) | ![Mobile layout](public/screenshots/10.png) |



|               Edit Button                |               Change name                |              Change Password               |
| :--------------------------------------: | :--------------------------------------: | :----------------------------------------: |
| ![Edit button](public/screenshots/6.png) | ![Mobile Chat](public/screenshots/7.png) | ![Mobile layout](public/screenshots/8.png) |



|             Home page             |               Chat open                |
| :-------------------------------: | :------------------------------------: |
| ![Home](public/screenshots/3.png) | ![Chat open](public/screenshots/4.png) |


## License

This project is licensed under the [MIT License](https://mit-license.org/).

## Acknowledgments

- [Next.js](https://nextjs.org/)
- [Firebase](https://firebase.google.com/)
- [Material-UI](https://mui.com/)
