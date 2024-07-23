import { Route, Routes } from "react-router";
import LandingPage from "./pages/LandingPage";
import CardGenerator from "./pages/CardGenerator";
import { Toaster } from "sonner";

const App = () => (
  <div className="font-poppins">
    <Toaster />
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="card-generator" element={<CardGenerator />} />
    </Routes>
  </div>
);

export default App;
