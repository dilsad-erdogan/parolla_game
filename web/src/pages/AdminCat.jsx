import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom"
import { deleteCategory, fetchCategory, setCategory } from "../firebase/category";
import { useEffect, useState } from "react";

const AdminCat = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState('');

  const loadCategories = async () => {
    try {
        const data = await fetchCategory();
        setCategories(data);
    } catch (error) {
        console.error("Error loading categories:", error.message);
        toast.error("Failed to load categories.");
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this category?")) {
      try {
        await deleteCategory(id);
        loadCategories();
      } catch (error) {
        toast.error("Failed to delete category: ", error);
      }
    }
  };

  useEffect(() => {
    loadCategories();
  }, []);

  const saveName = async () => {
    try{
      await setCategory(name);
      loadCategories();
    } catch (error) {
      toast.error("Failed to add categories: ", error);
    }
  };

  return (
    <div className="container text-white text-2xl">
      <Toaster position="top-right" />

      {/* Options */}
      <div className="flex justify-center items-center w-full gap-6 mt-5 border-b">
        <div className='px-6 py-2 text-2xl font-semibold text-white duration-200'>Category</div>
        <div className='px-6 py-2 text-lg font-semibold text-white duration-200' onClick={() => {navigate('/admin-questions')}}>Question</div>
      </div>

      {/* Add Category */}
      <div className="mt-10 w-full flex justify-center">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 w-2/4">
          <input type="text" placeholder="Enter new category" className="bg-gray-700 border p-2 rounded-lg" value={name} onChange={(e) => {setName(e.target.value)}} />
          <button className="bg-yellow-500 hover:bg-yellow-600 text-white py-2 px-4 rounded-lg" onClick={saveName}>Add Name</button>
        </div>
      </div>

      {/* Table */}
      <div className="w-full mt-6 max-w-screen-lg mx-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-gray-400">
          <thead className="text-xs uppercase bg-gray-700 text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">Name</th>
              <th scope="col" className="px-6 py-3">Action</th>
            </tr>
          </thead>

          <tbody>
            {categories.map((category) => (
              <tr key={category.id} className="border-b bg-gray-800 border-gray-700 hover:bg-gray-600">
                <th className="px-6 py-4 font-medium whitespace-nowrap text-white">{category.name}</th>
                <th className="px-6 py-4 font-medium whitespace-nowrap text-red-500 hover:underline" onClick={() => handleDelete(category.id)}>Delete</th>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default AdminCat