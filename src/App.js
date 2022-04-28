import "./App.css";
import { Routes, BrowserRouter, Route } from "react-router-dom";
import AddEditpage from "./pages/AddEditpage";
import Blog from "./pages/Blog";
import NotFoundPage from "./pages/NotFoundPage";
import Home from "./pages/Home";
import About from "./pages/About";

import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect } from "react";
import Header from "./components/Header";
import "antd/dist/antd.css";

function App() {
  useEffect(() => {
    toast("hello");
    // alert("test");
  }, []);

  return (
    <BrowserRouter>
      <div className="App">
        <ToastContainer
          position="top-right"
          autoClose={2000}
          hideProgressBar={false}
          closeOnClick
          rtl={false}
        />
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/addBlog" element={<AddEditpage />} />
          <Route path="/addBlog/:id" element={<AddEditpage />} />
          <Route path="/blog/:id" element={<Blog />} />
          <Route path="/about" element={<About />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
