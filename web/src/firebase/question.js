import { addDoc, collection, deleteDoc, doc, getDocs } from "firebase/firestore";
import { firestore } from "./firebase";
import toast from "react-hot-toast";

export const setQuestion = async (cat_id, question, answer) => {
    try{
        const doc = {
            cat_id: cat_id,
            question: question,
            answer: answer
        };

        await addDoc(collection(firestore, "question"), doc);
        toast.success("Question created successfully!");
    } catch (error) {
        console.error(error.message);
        toast.error("Failed to create question.");
    }
};

export const fetchQuestion = async () => {
    try{
        const questionCollection = collection(firestore, "question");
        const querySnapshot = await getDocs(questionCollection);
        if(querySnapshot.empty) {
            console.log("No questions found in firestore.");
            return [];
        }
        const question = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
        }));
        return question;
    } catch (error) {
        console.error("Error fetching questions: ", error.message);
        toast.error("Failed to fetch question.");
        throw error;
    }
}

export const deleteQuestion = async (questionId) => {
    try{
        const questionDoc = doc(firestore, "question", questionId);
        await deleteDoc(questionDoc);
        toast.success("Question deleted successfully!");
    } catch (error) {
        console.error(error.message);
        toast.error("Failed to delete question.");
    }
};