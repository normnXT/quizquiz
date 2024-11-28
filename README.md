### Project Overview
A trivia web application built with React and Firebase, featuring real-time question fetching from the Open Trivia Database. The application showcases modern React patterns and state management practices.

### YouTube demo

Click the image below to be directed to YouTube to watch a quick, unedited, informal preview of the app in use:

[![Screenshot 2024-08-20 111630](https://github.com/user-attachments/assets/81b26af6-25e4-43ab-bf0c-ce0bd96fa042)](https://youtu.be/XLo0breKAqE "Preview")

### Technical Features
* Modern Redux implementation using Redux Toolkit and RTK Query
* Firebase Authentication and Firestore for user management and score tracking
* Responsive Material-UI design system with light/dark theme support
* Session token management to prevent question repetition
* Persistent authentication state and theme preference
* Real-time data visualization using Recharts
* TypeScript throughout for type safety

### Setup and Development
#### Prerequisites
* Node.js (v16 or later)
* npm or yarn
* A Firebase project with Authentication and Firestore enabled
#### Getting Started
1. Clone the repository:
```bash
git clone https://github.com/normnXT/quizquiz.git
```
Install dependencies:
```bash
npm install
```
2. Create a Firebase configuration file using this template with your Firebase credentials:
```typescript
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  // Your Firebase configuration object
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const analytics = getAnalytics(app);
```
3. Start the development server:
```bash
npm run dev
```
#### Development Notes
* The project uses Vite for fast development and building
* Files are organized by feature in the src/features directory
* Each feature typically contains its component and corresponding Redux slice

