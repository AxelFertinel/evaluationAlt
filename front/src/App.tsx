import { Routes, Route } from "react-router";
import "./App.css";
import Home from "./pages/home";
import Tools from "./pages/tools/Tools";
import Analytics from "./pages/analytics/Analytics";
import Settings from "./pages/settings/Settings";
import Profil from "./pages/profil/Profil";

function App() {
  return (
    <>
      <Routes>
        <Route index path="/" element={<Home />} />
        <Route index path="/tools" element={<Tools />} />
        <Route index path="/analytics" element={<Analytics />} />
        <Route index path="/settings" element={<Settings />} />
        <Route index path="/profil" element={<Profil />} />
      </Routes>
    </>
  );
}

export default App;
