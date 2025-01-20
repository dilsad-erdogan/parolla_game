import { BrowserRouter, Routes, Route } from "react-router-dom"
import AdminCat from "./pages/AdminCat"
import AdminQue from "./pages/AdminQue"
import Game from "./pages/Game"

function App() {
  return (
    <div className="w-full h-full min-h-screen bg-black flex justify-center">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Game />} />
          <Route path="/admin-category" element={<AdminCat />} />
          <Route path="/admin-questions" element={<AdminQue />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
