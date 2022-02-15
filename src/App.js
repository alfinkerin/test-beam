import Login from "./scenes/Auth";
import Home from "./scenes/Home";
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />

        <Route path="/dashboard" element={<Home />} />
      </Routes>
    </>
  );
}

export default App;
