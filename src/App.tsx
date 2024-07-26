import { Route, Routes } from "react-router";
import LandingPage from "./pages/LandingPage";
import CardGenerator from "./pages/CardGenerator";
import { Toaster } from "sonner";
import { Cookie } from "./components";

const App = () => (
  <div className="font-poppins bg-[#00000f]">
    <Toaster />
    <Cookie />
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="card-generator" element={<CardGenerator />} />
    </Routes>
  </div>
);

export default App;
