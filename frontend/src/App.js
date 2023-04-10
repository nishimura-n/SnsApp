import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Profile from "./pages/profile/Profile";
import Register from "./pages/register/Register";
import Shop from "./pages/shop/Shop";
import Weather from "./pages/weather/Weather";
import {BrowserRouter as Router , Navigate, Route, Routes} from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./state/AuthContext";

function App() {
  const { user } = useContext(AuthContext);
  return (
    <Router>
      <Routes>
        <Route path="/" element={user ? < Home /> : <Register/>}/>
        <Route path="/login" element={user ? <Navigate to="/"/> : <Login />} />
        <Route path="/register" element={user ? <Navigate to="/" /> : <Register />}/>
        <Route path="/profile/:username" element={<Profile />}/>
        <Route path="/shop" element={<Shop />}/>
        <Route path="/weather" element={<Weather />}/>
      </Routes>
    </Router>
  );
}

export default App;
