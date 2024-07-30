import { Route, Routes } from "react-router";
import { Toaster } from "sonner";
import { Cookie, Navbar } from "./components";
import LandingPage from "./pages/LandingPage";
import CardGenerator from "./pages/CardGenerator";
import Card from "./pages/Card";
import { ProtectedRoute } from "./utils/ProtectedRoute";

const App = () => (
  <div className="font-poppins bg-[#00000f]">
    <Toaster expand={true} />
    <Navbar />
    <Cookie />
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route
        path="card-generator"
        element={
          <ProtectedRoute>
            <CardGenerator />
          </ProtectedRoute>
        }
      />
      <Route
        path="card/:cardId"
        element={
          <ProtectedRoute>
            <Card />
          </ProtectedRoute>
        }
      />
    </Routes>
  </div>
);

export default App;
