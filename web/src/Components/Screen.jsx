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
        <div>
            {currentQuestion ? (
                <div>
                    <h2 className="text-lg font-semibold">
                        Category: {currentQuestion.categoryName}
                    </h2>
                    <p>Question: {currentQuestion.question}</p>
                    <input
                        type="text"
                        className="bg-gray-700 border p-2 rounded-lg mt-4"
                        placeholder="Your answer"
                        value={userAnswer}
                        onChange={(e) => setUserAnswer(e.target.value)}
                    />
                    <button
                        className="bg-yellow-500 hover:bg-yellow-600 text-white py-2 px-4 rounded-lg mt-4"
                        onClick={handleAnswer}
                    >
                        Submit Answer
                    </button>
                </div>
            ) : (
                <p>No more questions available.</p>
            )}

            {/* Modal */}
            <Modal
                isOpen={showModal}
                onRequestClose={() => setShowModal(false)}
                className="bg-gray-800 text-white p-8 rounded-lg max-w-md mx-auto mt-20"
                overlayClassName="fixed inset-0 bg-black bg-opacity-50"
            >
                <h2 className="text-xl font-bold mb-4">Game Over</h2>
                <p className="mb-4">Your Results:</p>
                <ul className="mb-4">
                    {questions.map((question, index) => (
                        <li key={index} className="mb-2">
                            <span>
                                {index + 1}. {question.question} -{" "}
                                {isCorrect[index] ? "Correct" : "Wrong"}
                            </span>
                        </li>
                    ))}
                </ul>
                <button
                    className="bg-yellow-500 hover:bg-yellow-600 text-white py-2 px-4 rounded-lg"
                    onClick={() => setShowModal(false)}
                >
                    Close
                </button>
            </Modal>
        </div>
    );
};

export default Screen;