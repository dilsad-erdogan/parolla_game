import { useSelector } from "react-redux"

const Screen = () => {
    const { questions } = useSelector(state => state.question);
    
    return (
        <div>
            {questions.length > 0 ? (
                <div>
                    {questions.map((question) => (
                        <div key={question.id} className="mb-4">
                            <h2 className="text-lg font-semibold">
                                Category: {question.categoryName}
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

export default Screen