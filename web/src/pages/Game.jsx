import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { fetchCategory } from "../firebase/category";
import { collection, getDocs, query, where } from "firebase/firestore";
import { firestore } from "../firebase/firebase";

const Game = () => {
    const [questions, setQuestions] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchRandomQuestions = async () => {
        try {
            setLoading(true);
            const categories = await fetchCategory();
            const randomQuestions = [];

            for (const category of categories) {
                const questionCollection = collection(firestore, "question");
                const q = query(questionCollection, where("cat_id", "==", category.id));
                const querySnapshot = await getDocs(q);

                if (!querySnapshot.empty) {
                    const questionsInCategory = querySnapshot.docs.map((doc) => ({
                        id: doc.id,
                        ...doc.data(),
                    }));

                    // Rastgele bir soru seç
                    const randomQuestion = questionsInCategory[Math.floor(Math.random() * questionsInCategory.length)];
                    randomQuestions.push(randomQuestion);
                }
            }

            setQuestions(randomQuestions);
        } catch (error) {
            console.error("Error fetching random questions:", error.message);
            toast.error("Failed to load questions.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchRandomQuestions();
    }, []);

    if (loading) {
        return <div className="text-white">Loading...</div>;
    }

    return (
        <div className="container text-white text-2xl">
            <Toaster position="top-right" />

            <h1 className="text-2xl font-bold mb-4">Game</h1>
            {questions.length > 0 ? (
                <div>
                    {questions.map((question) => (
                        <div key={question.id} className="mb-4">
                            <h2 className="text-lg font-semibold">
                                Category: {question.cat_id}
                            </h2>
                            <p>Question: {question.question}</p>
                            <p>Answer: {question.answer}</p>
                        </div>
                    ))}
                </div>
            ) : (
                <p>No questions available.</p>
            )}
        </div>
    )
}

export default Game