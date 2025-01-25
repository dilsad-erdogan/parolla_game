import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { answerQuestion } from "../redux/questionSlice";
import Modal from "react-modal";

const Screen = () => {
    const dispatch = useDispatch();
    const { questions, currentQuestionIndex, isCorrect } = useSelector((state) => state.question);
    const [userAnswer, setUserAnswer] = useState("");
    const [showModal, setShowModal] = useState(false);

    const currentQuestion = questions[currentQuestionIndex];

    const handleAnswer = () => {
        if (!currentQuestion) return;

        const correct = userAnswer.trim().toLowerCase() === currentQuestion.answer.trim().toLowerCase();
        dispatch(answerQuestion({ isCorrect: correct }));
        setUserAnswer("");

        if (currentQuestionIndex + 1 >= questions.length) {
            setShowModal(true);
        }
    };

    return (
        <div className="container mx-auto mt-10">
            {currentQuestion ? (
                <div className="h-[900px] flex flex-col items-center justify-between">
                    <div className="bg-gray-700 rounded-full max-w-32 max-h-32 w-24 h-24 p-5">
                        <h2 className="text-center text-5xl font-bold">{currentQuestion.categoryName}</h2>
                    </div>

                    <div className="text-2xl font-bold">
                        <p>{currentQuestion.question}</p>
                    </div>

                    <div className="flex gap-5 w-full justify-center">
                        <input type="text" className="bg-gray-700 border p-2 rounded-lg mt-4" placeholder="Your answer" value={userAnswer} onChange={(e) => setUserAnswer(e.target.value)} />
                        <button className="bg-yellow-500 hover:bg-yellow-600 text-white py-2 px-4 rounded-lg mt-4" onClick={handleAnswer}>Pas</button>
                    </div>
                </div>
            ) : (
                <p>Your test is done.</p>
            )}

            {/* Modal */}
            <Modal isOpen={showModal} onRequestClose={() => setShowModal(false)} className="bg-gray-800 text-white flex-1 overflow-y-auto p-8 rounded-lg max-w-3xl mx-auto mt-20" overlayClassName="fixed inset-0 bg-black bg-opacity-50">
                <h2 className="text-xl font-bold mb-4">Game Over</h2>
                <ul className="mb-4">
                    {questions.map((question, index) => (
                        <li key={index} className="mb-2">
                            <span className={`${isCorrect[index] ? 'text-green-500' : 'text-red-500'}`}>
                                {index + 1}. {question.question} -{" "}
                                {isCorrect[index] ? "Correct" : "Wrong"}
                            </span>
                        </li>
                    ))}
                </ul>
                <button className="bg-yellow-500 hover:bg-yellow-600 text-white py-2 px-4 rounded-lg" onClick={() => setShowModal(false)}>Close</button>
            </Modal>
        </div>
    );
};

export default Screen;