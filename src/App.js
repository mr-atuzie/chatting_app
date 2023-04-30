import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";
import Chat from "./components/Chat";
import Allusers from "./components/Allusers";

function App() {
  const { currentUser } = useContext(AuthContext);

  const ProctectedRoute = ({ children }) => {
    if (!currentUser) {
      return <Navigate to={"/login"} />;
    }

    return children;
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/">
          <Route
            index
            element={
              <ProctectedRoute>
                <Home />
              </ProctectedRoute>
            }
          />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/chats" element={<Chat />} />
          <Route path="/users" element={<Allusers />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
