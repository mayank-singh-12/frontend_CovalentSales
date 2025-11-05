import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import "bootstrap/dist/css/bootstrap.min.css";
import "./styles.css";

// PAGES
import AddNewAgent from "./pages/AddNewAgent";
import SalesAgentsManagement from "./pages/SalesAgentsManagement";

export default function App() {
  return (
    <>
      <BrowserRouter>
        <ToastContainer position="bottom-right" pauseOnHover theme="colored" />
        <Routes>
          <Route path="/" Component={AddNewAgent} />
          <Route path="/salesAgents" Component={SalesAgentsManagement} />
        </Routes>
      </BrowserRouter>
    </>
  );
}
