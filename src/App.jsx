import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "./context/ThemeContext";
import Home from "./pages/Home";
import UserPosts from "./pages/UserPosts";
import "./styles.css";

export default function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/posts/:id" element={<UserPosts />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}
