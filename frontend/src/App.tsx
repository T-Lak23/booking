import { Route, Routes } from "react-router";
import Home from "./pages/Home";
import Experience from "./pages/Experience";
import Checkout from "./pages/Checkout";
import Confirmation from "./pages/Confirmation";

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/:id" element={<Experience />} />
        <Route path="/:id/checkout" element={<Checkout />} />
        <Route path="/:id/confirmation" element={<Confirmation />} />
      </Routes>
    </div>
  );
};

export default App;
