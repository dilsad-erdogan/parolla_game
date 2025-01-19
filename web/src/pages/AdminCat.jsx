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
    </div>
  )
}

export default AdminCat