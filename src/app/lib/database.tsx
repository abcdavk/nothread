// Import the necessary Firebase SDKs
import { getDatabase, ref, onValue } from "firebase/database";
import { initializeApp } from "firebase/app";

export interface IDatabase {
  id: number
  name: string
  content: string
  date: string
}

// Your Firebase configuration
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_AUTH_DOMAIN,
  databaseURL: process.env.NEXT_PUBLIC_DATABASE_URL,
  projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_MEASUREMENT_ID,
};

// Initialize Firebase only once
const app = initializeApp(firebaseConfig);

const db = getDatabase(app);

/**
 * Fetch data from a specified Firebase Realtime Database reference.
 * @param path The database path to fetch data from (e.g., "posts/").
 * @returns A Promise resolving to the data at the specified path.
 */
export async function fetchDatabase(path: string): Promise<IDatabase[]> {
  return new Promise((resolve, reject) => {
    const dataRef = ref(db, path);
    onValue(
      dataRef,
      (snapshot) => {
        const data = snapshot.val();
        if (data) {
          resolve(data);
          console.warn(data[0].content)
        } else {
          resolve([]); 
        }
      },
      (error) => {
        reject(error);
      }
    );
  });
}
