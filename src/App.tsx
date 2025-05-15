
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { VoteProvider } from "./contexts/VoteContext";
import { MainLayout } from "./components/layout/MainLayout";

// Pages
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import AdminDashboard from "./pages/admin/AdminDashboard";
import CandidatesPage from "./pages/admin/CandidatesPage";
import VotersPage from "./pages/admin/VotersPage";
import ResultsPage from "./pages/admin/ResultsPage";
import VoterDashboard from "./pages/voter/VoterDashboard";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <BrowserRouter>
        <AuthProvider>
          <VoteProvider>
            <Toaster />
            <Sonner />
            <Routes>
              {/* Public routes */}
              <Route path="/" element={<HomePage />} />
              <Route path="/login" element={<LoginPage />} />
              
              {/* Admin routes */}
              <Route element={<MainLayout requiredRole="admin" />}>
                <Route path="/admin" element={<AdminDashboard />} />
                <Route path="/admin/candidates" element={<CandidatesPage />} />
                <Route path="/admin/voters" element={<VotersPage />} />
                <Route path="/admin/results" element={<ResultsPage />} />
              </Route>
              
              {/* Voter routes */}
              <Route element={<MainLayout requiredRole="voter" />}>
                <Route path="/voter" element={<VoterDashboard />} />
              </Route>
              
              {/* Redirects */}
              <Route path="/index" element={<Navigate to="/" replace />} />
              
              {/* 404 */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </VoteProvider>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
