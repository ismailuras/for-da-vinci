import Layout from "./layout";
import Home from "@/pages/Home";
import Users from "@/pages/users/Users";
import Posts from "@/pages/posts/Posts";
import { Toaster } from "react-hot-toast";
import { BrowserRouter, Route, Routes } from "react-router";

function App() {
  return (
    <BrowserRouter>
      <Toaster />
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="users" element={<Users />} />
          <Route path="posts" element={<Posts />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
