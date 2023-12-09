# MTG-Marketplace

## Project Overview

The application is a mock online marketplace for Magic: The Gathering (MTG) cards.
It is hosted online here - https://mtg-marketplace-110b0.web.app/

- without authentication, any guest user can see all of the MTG cards available for purchase on the website, and can Login or Register.
- after successful authentication, registered users can upload their own MTG cards and put them up for sale, with all CRUD operations (create, read, update, delete) available, and they can "buy" cards uploaded by other users.

The application is deployed on Firebase, and interacts with the MTG Gatherer API.

This is a student project created by Sava Stoyanov for the SoftUni ReactJS Oct-Dec 2023 class.

## Future Improvements

- improve the UI and UX of the application, making it fully responsive, making the navbar sticky, fixing visual bugs, etc.
- improve the UX by making the error handling and data validation messages more user-friendly
- write Unit Tests for the application, and test it
- use a state management solution (React Redux) instead of the Context API
- take full advantage of the Gatherer API by making a more user-friendly card search function

## Project Structure

src:
/components: Contains React components used throughout the application.

- Card.jsx: Represents a card component.
- Catalog.jsx: Displays a catalog of Magic: The Gathering cards.
- Details.jsx: Displays detailed information about a card.
- Edit.jsx: Allows editing card details.
- Home.jsx: Home page component.
- Navbar.jsx: Navigation bar component.
- Sell.jsx: Allows users to sell Magic: The Gathering cards, and connects to the Gatherer API.

/services: Contains utility functions for interfacing with Firebase, as well as the React context provider:

- AuthContext.jsx: Manages user authentication state.
- firebaseUtils.js: Functions for CRUD operations on the Firestore database.
- firebase.js: Firebase configuration.
- dateUtils.js: Date formatting.
  useSearch.jsx: Search functionality hook.

App.jsx: Root component that sets up the router and wraps the entire application.

## Technologies Used

This is a Single Page Application (SPA) created with the following tech stack:

- React for the frontend (w/ Vite).
- Firebase for the authentication.
- Firestore for the database.
