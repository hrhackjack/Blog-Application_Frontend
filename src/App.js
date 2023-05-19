import React from 'react';
import "./styles/App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import Login from "./pages/LogIn/Login";
import Signup from "./pages/SignUp/Signup";
import About from "./pages/Other/About";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AdminPanel from './components/AdminPanel/AdminPanel';
import Userdashboard from "./pages/User-Routes/Userdashboard";
import Privateroute from "./components/Privateroute";
import ProfileInfo from "./pages/User-Routes/ProfileInfo";
import PostPage from "./pages/Posts/PostPage";
import UserProvider from "./context/UserProvider";
import Categories from "./pages/Categories/Categories";
import UpdateBlog from "./pages/Posts/UpdateBlog";
import ContactUs from './pages/Other/ContactUs';
import UserList from './pages/Users/UserList';
import Chat from './pages/Chat/Chat';
import ResetPassword from "./components/ResetPassword/ResetPassword";


function App() {
  return (
    <UserProvider>        
        <ToastContainer position="bottom-center" />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/adminPanel" element={<AdminPanel />} />
          <Route path="/login" element={<Login />} />
          <Route path="/reset-pass" element={<ResetPassword />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/explore" element={<UserList />} />
          <Route path="/chat" element={<Chat />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact-us" element={<ContactUs />} />
          <Route path="/posts/:postId" element={<PostPage />} />
          <Route path="/categories/:categoryId" element={<Categories />} />
          <Route path="/user" element={<Privateroute />}>
            <Route path="dashboard" element={<Userdashboard />} />
            <Route path="profile-info/:userId" element={<ProfileInfo />} />
            <Route path="update-blog/:blogId" element={<UpdateBlog />} />
          </Route>
        </Routes>
    </UserProvider>
  );
}

export default App;
