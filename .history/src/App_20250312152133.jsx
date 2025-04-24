import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Checkout from "./components/Cart/checkout";
import MerchantDashboard from "./components/Dashboard/MerchantDashboard";
// ...existing code...

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/dashboard" element={<MerchantDashboard api="http://your-api-url.com" />} />
        {/* ...existing routes... */}
      </Routes>
    </Router>
  );
}

export default App;