import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router";
import App from "./App";
import "./index.css";
import Users from "@/pages/users/Users";
import Layout from "@/components/Layout";
import Posts from "@/pages/posts/Posts";
import { Toaster } from "react-hot-toast";

const root = document.getElementById("root")!;

ReactDOM.createRoot(root).render(
  <BrowserRouter>
    <Toaster />
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<App />} />
        <Route path="users" element={<Users />} />
        <Route path="posts" element={<Posts />} />
      </Route>
    </Routes>
  </BrowserRouter>
);
