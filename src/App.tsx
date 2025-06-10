import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner"; // Renamed to avoid conflict
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import LandingPage from "./pages/LandingPage";
import CloneEditorPage from "./pages/CloneEditorPage";
import MyClonesDashboardPage from "./pages/MyClonesDashboardPage";
import CloneInteractionPage from "./pages/CloneInteractionPage";
import AuthenticationPage from "./pages/AuthenticationPage";
import NotFound from "./pages/NotFound"; // Assuming NotFound.tsx exists

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner richColors position="top-right"/> {/* Added richColors and position */}
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/editor" element={<CloneEditorPage />} />
          <Route path="/dashboard" element={<MyClonesDashboardPage />} />
          <Route path="/clone/:id/interact" element={<CloneInteractionPage />} />
          <Route path="/auth" element={<AuthenticationPage />} />
          
          {/* Example additional routes if needed (not part of this request) */}
          {/* <Route path="/features" element={<FeaturesPage />} /> */}
          {/* <Route path="/about-us" element={<AboutUsPage />} /> */}

          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;