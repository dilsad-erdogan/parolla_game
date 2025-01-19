import { addDoc, collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { firestore } from "./firebase";
import toast from "react-hot-toast";

export const setCategory = async (name) => {
    try {
        const doc = {
            name: name,
        };
        await addDoc(collection(firestore, "category"), doc);
        toast.success("Category created successfully!");
    } catch (error) {
        console.error(error.message);
        toast.error("Failed to create category.");
    }
};

export const fetchCategory = async () => {
    try {
        const categoryCollection = collection(firestore, "category");
        const querySnapshot = await getDocs(categoryCollection);
        if (querySnapshot.empty) {
            console.log("No categories found in Firestore.");
            return [];
        }
        const category = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
        }));
        console.log("Fetched categories:", category);
        return category;
    } catch (error) {
        console.error("Error fetching categories:", error.message);
        toast.error("Failed to fetch categories.");
        throw error;
    }
};

export const deleteCategory = async (categoryId) => {
    try {
        const categoryDoc = doc(firestore, "category", categoryId);
        await deleteDoc(categoryDoc);
        toast.success("Category deleted successfully!");
    } catch (error) {
        console.error(error.message);
        toast.error("Failed to delete category.");
    }
};