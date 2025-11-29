import { BrowserRouter, Routes, Route, useParams } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "bootstrap-icons/font/bootstrap-icons.css";

// import "./styles.css";

// TODO: Add vercel.json

// PAGES
import Dashboard from "./pages/Dashboard";
import AddNewLead from "./pages/AddNewLead";
import LeadsList from "./pages/LeadsList";
import LeadManagement from "./pages/LeadManagement";
import LeadsByStatus from "./pages/LeadsByStatus";
import LeadsBySalesAgents from "./pages/LeadsBySalesAgents";
import AddNewAgent from "./pages/AddNewAgent";
import SalesAgentsManagement from "./pages/SalesAgentsManagement";
import Reports from "./pages/Reports";

// PROVIDERS
import { SalesAgentProvider } from "./contexts/SalesAgentsContext";
import { LeadsProvider } from "./contexts/LeadsContext";
import { ReportsProvider } from "./contexts/ReportsContext";
import { CommentsProvider } from "./contexts/CommentsContext";
import { SideBarProvider } from "./contexts/SideBarContext";

// Component
import Header from "./components/general/Header";

export default function App() {
  return (
    <>
      <BrowserRouter>
        <ToastContainer position="bottom-right" pauseOnHover theme="colored" />
        <SalesAgentProvider>
          <LeadsProvider>
            <ReportsProvider>
              <CommentsProvider>
                <SideBarProvider>
                  <Header/>
                  <Routes>
                    <Route path="/" element={<Dashboard />} />
                    <Route path="/agents" element={<SalesAgentsManagement />} />
                    <Route path="/agents/new" element={<AddNewAgent />} />
                    <Route path="/leads" element={<LeadsList />} />
                    <Route path="/leads/new" element={<AddNewLead />} />
                    <Route path="/leads/:id" element={<LeadManagement />} />
                    <Route path="/leads/status" element={<LeadsByStatus />} />
                    <Route
                      path="/leads/agents"
                      element={<LeadsBySalesAgents />}
                    />
                    <Route path="/reports" element={<Reports />} />
                  </Routes>
                </SideBarProvider>
              </CommentsProvider>
            </ReportsProvider>
          </LeadsProvider>
        </SalesAgentProvider>
      </BrowserRouter>
    </>
  );
}
