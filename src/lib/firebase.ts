
import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, getDocs, query, orderBy } from "firebase/firestore";

// Firebase project configuration
const firebaseConfig = {
    apiKey: "AIzaSyCFnfprqaFi9VkUOxtxlMdQUp7bNa-rsmY",
    authDomain: "item-finder-board.firebaseapp.com",
    projectId: "item-finder-board",
    storageBucket: "item-finder-board.appspot.com",
    messagingSenderId: "649971619774",
    appId: "1:649971619774:web:45f3d4f56d954b6f800bef",
};

// Initialize Firebase services
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Updated Item type definition
export type Item = {
    id?: string;
    item_name: string;
    item_type: "Lost" | "Found";
    description: string;
    location: string;
    date: string; // Storing date as ISO string
    imageData?: string; // Optional field for the image data as a base64 string
};

// --- Helper function to read an image file as a data URL ---
const readFileAsDataURL = (imageFile: File): Promise<string | null> => {
    return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onloadend = () => {
            resolve(reader.result as string);
        };
        reader.onerror = (error) => {
            console.error("Error reading file: ", error);
            resolve(null);
        };
        reader.readAsDataURL(imageFile);
    });
};

// --- Updated addItem function ---
const addItem = async (item: Omit<Item, 'id' | 'imageData'>, imageFile?: File) => {
    try {
        let imageData: string | undefined = undefined;

        // If an image file is provided and the item type is "Found", read it as a data URL
        if (imageFile && item.item_type === 'Found') {
            const dataUrl = await readFileAsDataURL(imageFile);
            if (dataUrl) {
                imageData = dataUrl;
            }
        }

        // Add the new item document to the Firestore collection
        const docRef = await addDoc(collection(db, "lost_found_items"), {
            ...item,
            date: new Date(item.date).toISOString(),
            // Conditionally add the imageData to the document
            ...(imageData && { imageData }),
        });
        
        console.log("Document written with ID: ", docRef.id);
        return docRef.id;
    } catch (e) {
        console.error("Error adding document: ", e);
        return null;
    }
};

// --- getAllItems function (no changes needed in implementation) ---
const getAllItems = async (): Promise<Item[]> => {
    try {
        const itemsCollection = collection(db, "lost_found_items");
        const q = query(itemsCollection, orderBy("date", "desc"));
        const querySnapshot = await getDocs(q);
        const items: Item[] = [];
        querySnapshot.forEach((doc) => {
            items.push({ id: doc.id, ...doc.data() } as Item);
        });
        return items;
    } catch (e) {
        console.error("Error getting documents: ", e);
        return [];
    }
};

export { db, addItem, getAllItems };
