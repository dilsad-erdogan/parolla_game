import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { deleteQuestion, fetchQuestion, setQuestion as setQue } from "../firebase/question";
import { fetchCategory } from "../firebase/category";

const AdminQue = () => {
    const navigate = useNavigate();
    const [questions, setQuestions] = useState([]);
    const [categories, setCategories] = useState([]);
    const [catId, setCatId] = useState('');
    const [question, setQuestion] = useState('');
    const [answer, setAnswer] = useState('');

    const loadQuestions = async () => {
        try{
            const data = await fetchQuestion();
            setQuestions(data);
        } catch (error) {
            console.error("Error loading questions: ", error.message);
            toast.error("Failed to load questions.");
        }
    };

    const loadCategories = async () => {
        try {
            const data = await fetchCategory();
            setCategories(data);
        } catch (error) {
            console.error("Error loading categories:", error.message);
            toast.error("Failed to load categories.");
        }
      };

    useEffect(() => {
        loadQuestions();
        loadCategories();
    }, []);

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this category?")) {
          try {
            await deleteQuestion(id);
            loadQuestions();
          } catch (error) {
            toast.error("Failed to delete question: ", error);
          }
        }
    };

    const saveQuestion = async () => {
        try{
            await setQue(catId, question, answer);
            loadQuestions();
            setCatId('');
            setQuestion('');
            setAnswer('');
        } catch (error) {
            toast.error("Failed to add questions: ", error);
        }
    };

    return (
        <div className="container text-white text-2xl">
            <Toaster position="top-right" />

            {/* Options */}
            <div className="flex justify-center items-center w-full gap-6 mt-5 border-b">
                <div className='px-6 py-2 text-lg font-semibold text-white duration-200' onClick={() => {navigate('/admin-category')}}>Category</div>
                <div className='px-6 py-2 text-2xl font-semibold text-white duration-200'>Question</div>
            </div>

            {/* Add Question */}
            <div className="mt-10 w-full flex justify-center">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 w-2/4">
                    <select className="bg-gray-700 border p-2 rounded-lg" value={catId} onChange={(e) => setCatId(e.target.value)}>
                        <option value="" disabled>Select category</option>
                        {categories.map((category) => (
                            <option key={category.id} value={category.id}>
                                {category.name}
                            </option>
                        ))}
                    </select>
                    <input type="text" placeholder="Enter question" className="bg-gray-700 border p-2 rounded-lg" value={question} onChange={(e) => {setQuestion(e.target.value)}} />
                    <input type="text" placeholder="Enter answer" className="bg-gray-700 border p-2 rounded-lg" value={answer} onChange={(e) => {setAnswer(e.target.value)}} />
                    <button className="bg-yellow-500 hover:bg-yellow-600 text-white py-2 px-4 rounded-lg" onClick={saveQuestion}>Add Question</button>
                </div>
            </div>

            {/* Table */}
            <div className="w-full mt-6 max-w-screen-lg mx-auto shadow-md sm:rounded-lg">
                <table className="w-full text-sm text-gray-400">
                    <thead className="text-xs uppercase bg-gray-700 text-gray-400">
                        <tr>
                            <th scope="col" className="px-6 py-3">Category</th>
                            <th scope="col" className="px-6 py-3">Question</th>
                            <th scope="col" className="px-6 py-3">Answer</th>
                            <th scope="col" className="px-6 py-3">Action</th>
                        </tr>
                    </thead>

                    <tbody>
                        {questions.map((question) => (
                            <tr key={question.id} className="border-b bg-gray-800 border-gray-700 hover:bg-gray-600">
                                <th className="px-6 py-4 font-medium whitespace-nowrap text-white">{categories.find((cat) => cat.id === question.cat_id)?.name || "Unknown"}</th>
                                <th className="px-6 py-4 font-medium whitespace-nowrap text-white">{question.question}</th>
                                <th className="px-6 py-4 font-medium whitespace-nowrap text-white">{question.answer}</th>
                                <th className="font-medium text-red-500 hover:underline" onClick={() => handleDelete(question.id)}>Delete</th>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
  }
  
  export default AdminQue