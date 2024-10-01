# QuizQuiz

QuizQuiz is an interactive quiz application built with modern web technologies. It provides users with a seamless experience to test their knowledge across various categories and difficulty levels.

## Table of Contents

1. [Features](#features)
2. [Architecture](#architecture)
3. [Tech Stack](#tech-stack)
4. [Getting Started](#getting-started)
5. [Development](#development)
6. [How to Play](#how-to-play)
7. [Contributing](#contributing)
8. [License](#license)

## Features

- Dynamic quiz generation based on user preferences
- Multiple choice and true/false questions
- Difficulty selection (Easy, Medium, Hard)
- Category selection
- User authentication and registration
- Score tracking and historical data
- Responsive design for mobile and desktop
- Dark mode support

## Architecture

QuizQuiz employs a modern Redux architecture, leveraging the power of Redux Toolkit for efficient state management. The application is structured around feature-based modules, each containing its own slice of the Redux store, components, and API interactions.

### Key Architectural Components:

1. **Redux Store**: The central state management system, configured using Redux Toolkit's `configureStore`.

2. **Slices**: Feature-specific reducers and actions, created using `createSlice` from Redux Toolkit. Key slices include:
   - `quizSlice`: Manages the state of the current quiz
   - `newGameAPISlice`: Handles API interactions for starting a new game
   - `loginAPISlice`: Manages user authentication state
   - `registerAPISlice`: Handles user registration
   - `historicScoreAPISlice`: Manages historical score data

3. **API Integration**: The app uses Redux Toolkit Query (RTK Query) for efficient API calls and caching. This is particularly evident in the `newGameAPISlice` for fetching quiz questions.

4. **Firebase Integration**: The app uses Firebase as a Backend-as-a-Service (BaaS) for user authentication and data storage. Firebase Authentication is used for user login and registration, while Firestore is used to store user data and quiz scores.

5. **Asynchronous Actions**: Leverages Redux Toolkit's `createAsyncThunk` for handling asynchronous operations like user registration, login, and score updates.

6. **Routing**: React Router is used for client-side routing, allowing for a single-page application experience.

7. **Theming**: Material-UI's theming solution is used to provide a consistent look and feel, with support for both light and dark modes.

## Tech Stack

- **Frontend Framework**: React
- **State Management**: Redux (Redux Toolkit)
- **API Calls**: RTK Query
- **Routing**: React Router
- **UI Framework**: Material-UI
- **CSS Utility**: Tailwind CSS
- **Backend**: Firebase (Authentication and Firestore)
- **Build Tool**: Vite
- **Language**: TypeScript
- **HTTP Client**: Axios (via RTK Query)
- **Toast Notifications**: React-Toastify
- **Charts**: Recharts

## Getting Started

To get started with QuizQuiz, follow these steps:

1. Clone the repository:
   ```
   git clone https://github.com/yourusername/quizquiz.git
   ```

2. Install dependencies:
   ```
   cd quizquiz
   npm install
   ```

3. Set up Firebase:
   - Create a Firebase project at [firebase.google.com](https://firebase.google.com)
   - Enable Authentication and Firestore in your Firebase project
   - Copy your Firebase configuration and update the `firebaseConfig.ts` file

4. Start the development server:
   ```
   npm run dev
   ```

5. Open your browser and navigate to `http://localhost:5173`

## Development

To develop QuizQuiz further:

1. Familiarize yourself with the project structure:
   ```
   src/
   ├── app/
   │   ├── hooks.ts
   │   └── store.ts
   ├── features/
   │   ├── currentScore/
   │   ├── historicScore/
   │   ├── login/
   │   ├── logout/
   │   ├── newGame/
   │   ├── quiz/
   │   ├── register/
   │   └── themeToggle/
   ├── utils/
   ├── App.tsx
   ├── index.tsx
   └── theme.ts
   ```

2. Each feature folder contains its own components, slices, and API interactions.

3. To add a new feature:
   - Create a new folder in the `features` directory
   - Create necessary components, slices, and API files
   - Update the root reducer in `app/store.ts` if needed
   - Add routing in `App.tsx` if required

4. Use the custom hooks in `app/hooks.ts` for typed `useSelector` and `useDispatch`.

5. Leverage the `createAppSlice` utility for creating new slices with pre-configured async thunk creators.

## How to Play

1. Start a new game by selecting difficulty, category, and question type.
2. Answer the questions presented to you.
3. Your current score is displayed at the top of the screen.
4. After completing the quiz, your score will be saved if you're logged in.
5. View your historical scores in the bottom section of the app.

## Contributing

Contributions to QuizQuiz are welcome! Please follow these steps:

1. Fork the repository
2. Create a new branch: `git checkout -b feature-branch-name`
3. Make your changes and commit them: `git commit -m 'Add some feature'`
4. Push to the branch: `git push origin feature-branch-name`
5. Submit a pull request

## License

This project is licensed under the GPL License. See the [LICENSE](LICENSE) file for details.