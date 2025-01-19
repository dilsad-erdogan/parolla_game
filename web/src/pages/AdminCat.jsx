import { useNavigate } from "react-router-dom"

const AdminCat = () => {
  const navigate = useNavigate();

  return (
    <div className="container text-white text-2xl">
      {/* Options */}
      <div className="flex justify-center items-center w-full gap-6 mt-5">
        <div className='px-6 py-2 text-2xl font-semibold text-white duration-200'>Category</div>
        <div className='px-6 py-2 text-lg font-semibold text-white duration-200' onClick={() => {navigate('/admin-questions')}}>Question</div>
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
            <tr className="border-b bg-gray-800 border-gray-700 hover:bg-gray-600">
              <th className="px-6 py-4 font-medium whitespace-nowrap text-white">A</th>
              <td className="px-6 py-4 flex gap-4 items-center justify-center">
                <a href="#" className="font-medium text-red-500 hover:underline">Delete</a>
                <a href="#" className="font-medium text-blue-500 hover:underline">Edit</a>
              </td>
            </tr>

            <tr className="border-b bg-gray-800 border-gray-700 hover:bg-gray-600">
              <th className="px-6 py-4 font-medium whitespace-nowrap text-white">B</th>
              <td className="px-6 py-4 flex gap-4 items-center justify-center">
                <a href="#" className="font-medium text-red-500 hover:underline">Delete</a>
                <a href="#" className="font-medium text-blue-500 hover:underline">Edit</a>
              </td>
            </tr>

            <tr className="border-b bg-gray-800 border-gray-700 hover:bg-gray-600">
              <th className="px-6 py-4 font-medium whitespace-nowrap text-white">C</th>
              <td className="px-6 py-4 flex gap-4 items-center justify-center">
                <a href="#" className="font-medium text-red-500 hover:underline">Delete</a>
                <a href="#" className="font-medium text-blue-500 hover:underline">Edit</a>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default AdminCat