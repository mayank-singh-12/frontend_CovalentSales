import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import "bootstrap/dist/css/bootstrap.min.css";
import "./styles.css";

// PAGES
import AddNewLead from "./pages/AddNewLead";
import LeadsList from "./pages/LeadsList";
import LeadManagement from "./pages/LeadManagement";
import AddNewAgent from "./pages/AddNewAgent";
import SalesAgentsManagement from "./pages/SalesAgentsManagement";

// CONTEXT
import { SalesAgentProvider } from "./contexts/SalesAgentsContext";
import { LeadsProvider } from "./contexts/LeadsContext";

export default function App() {
  return (
    <>
      <SalesAgentProvider>
        <LeadsProvider>
          <BrowserRouter>
            <ToastContainer
              position="bottom-right"
              pauseOnHover
              theme="colored"
            />
            <Routes>
              <Route path="/agents" Component={SalesAgentsManagement} />
              <Route path="/agents/new" Component={AddNewAgent} />
              <Route path="/leads" Component={LeadsList} />
              <Route path="/leads/new" Component={AddNewLead} />
              <Route path="/leads/:id" Component={LeadManagement} />
            </Routes>
          </BrowserRouter>
        </LeadsProvider>
      </SalesAgentProvider>
    </>
  );
}
