import { Route, Routes } from "react-router";
import { Toaster } from "sonner";
import { Cookie } from "./components";
import LandingPage from "./pages/LandingPage";
import CardGenerator from "./pages/CardGenerator";
import Card from "./pages/Card";

const App = () => (
  <div className="font-poppins bg-[#00000f]">
    <Toaster expand={true} position='top-right' />
    <Cookie />
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="card-generator" element={<CardGenerator />} />
      <Route path="card/:cardId" element={<Card />} />
    </Routes>
  </div>
);

export default App;
