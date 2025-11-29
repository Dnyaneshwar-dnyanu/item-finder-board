# Lost and Found Application

This is a modern, responsive web application designed to help people post and find lost or found items. It features a clean, dark-themed interface and a simple, intuitive user experience with real images.

## Key Features

- **Post Lost or Found Items**: Users can easily submit a form to report an item they have lost or found.
- **Image Uploads**: For found items, users are required to upload an image to help with identification.
- **Item Board**: A central dashboard that displays all the lost and found items, with clear labels and details.
- **Modern UI**: A sleek, dark-mode interface built with Tailwind CSS and shadcn-ui.
- **Responsive Design**: The application is designed to work seamlessly across desktops, tablets, and mobile devices.
- **Real-time Updates**: Built on Firebase, the item list updates in real-time.

## Technologies Used

This project is built with a modern technology stack:

- **Vite**: A next-generation front-end tooling for a fast development experience.
- **React**: A JavaScript library for building user interfaces.
- **TypeScript**: A statically typed superset of JavaScript that adds type safety.
- **Tailwind CSS**: A utility-first CSS framework for rapid UI development.
- **shadcn-ui**: A collection of re-usable components for building modern UIs.
- **Firebase**: A platform by Google for creating mobile and web applications, used here for database and storage.

## Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

You need to have [Node.js](https://nodejs.org/) and [npm](https://www.npmjs.com/) installed on your machine.

### Installation & Setup

1. **Clone the repository:**

   ```sh
   git clone <YOUR_GIT_URL>
   ```
2. **Navigate to the project directory:**

   ```sh
   cd <YOUR_PROJECT_NAME>
   ```
3. **Install NPM packages:**

   ```sh
   npm install
   ```
4. **Set up Firebase:**

   - Create a new Firebase project in the [Firebase Console](https://console.firebase.google.com/).
   - In your project settings, add a new web app and copy the `firebaseConfig` object.
   - Create a new file `src/lib/firebase.ts` and add your Firebase configuration like so:

   ```ts
   import { initializeApp } from "firebase/app";
   import { getFirestore } from "firebase/firestore";
   import { getStorage } from "firebase/storage";

   const firebaseConfig = {
     apiKey: "YOUR_API_KEY",
     authDomain: "YOUR_AUTH_DOMAIN",
     projectId: "YOUR_PROJECT_ID",
     storageBucket: "YOUR_STORAGE_BUCKET",
     messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
     appId: "YOUR_APP_ID"
   };

   const app = initializeApp(firebaseConfig);
   const db = getFirestore(app);
   const storage = getStorage(app);

   // Add your item management functions here...

   export { db, storage };
   ```

   - Make sure to enable Firestore and Storage in your Firebase project.
5. **Run the development server:**

   ```sh
   npm run dev
   ```

   This will start the application on a local development server, typically `http://localhost:5173`.

## Deployment

The application is configured to be deployed to any static hosting provider. You can build the application by running:

```sh
npm run build
```

This will create a `dist` folder with the production-ready files, which you can then deploy.
