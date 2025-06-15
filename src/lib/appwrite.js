import { Client, Databases, Storage, ID } from "appwrite";

const client = new Client()
  .setEndpoint(import.meta.env.VITE_APPWRITE_ENDPOINT)
  .setProject(import.meta.env.VITE_APPWRITE_PROJECT_ID)
  .setKey(import.meta.env.VITE_APPWRITE_API_KEY); // Optionnel côté client

// Initialiser les services
const databases = new Databases(client);
const storage = new Storage(client);

// Exemple de fonction utilitaire
const createDocument = (collectionId, data) =>
