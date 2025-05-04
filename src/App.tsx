
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LanguageProvider } from "@/hooks/use-language";
import { AuthProvider } from "@/hooks/use-auth";
import { StrictMode } from "react";
import Index from "./pages/Index";
import Challenges from "./pages/Challenges";
import ChallengeDetail from "./pages/ChallengeDetail";
import Settings from "./pages/Settings";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";
import Admin from "./pages/Admin";
import Courses from "./pages/Courses";
import CourseDetail from "./pages/CourseDetail";
import CourseLessons from "./pages/CourseLessons";
import Books from "./pages/Books";
import BookDetail from "./pages/BookDetail";
import CodePlayground from "./pages/CodePlayground";
import Leaderboard from "./pages/Leaderboard";
import Auth from "./pages/Auth";
import Resources from "./pages/Resources";
import Contests from "./pages/Contests";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Terms from "./pages/Terms";

// Create a client
const queryClient = new QueryClient();

const App = () => {
  return (
    <StrictMode>
      <QueryClientProvider client={queryClient}>
        <LanguageProvider>
          <AuthProvider>
            <TooltipProvider>
              <Toaster />
              <Sonner />
              <BrowserRouter>
                <Routes>
                  <Route path="/" element={<Index />} />
                  <Route path="/challenges" element={<Challenges />} />
                  <Route path="/challenge/:id" element={<ChallengeDetail />} />
                  <Route path="/courses" element={<Courses />} />
                  <Route path="/course/:id" element={<CourseDetail />} />
                  <Route path="/course/:id/lessons" element={<CourseLessons />} />
                  <Route path="/books" element={<Books />} />
                  <Route path="/book/:id" element={<BookDetail />} />
                  <Route path="/code-playground" element={<CodePlayground />} />
                  <Route path="/leaderboard" element={<Leaderboard />} />
                  <Route path="/profile" element={<Profile />} />
                  <Route path="/settings" element={<Settings />} />
                  <Route path="/admin/*" element={<Admin />} />
                  <Route path="/auth" element={<Auth />} />
                  <Route path="/resources" element={<Resources />} />
                  <Route path="/contests" element={<Contests />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/contact" element={<Contact />} />
                  <Route path="/terms" element={<Terms />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </BrowserRouter>
            </TooltipProvider>
          </AuthProvider>
        </LanguageProvider>
      </QueryClientProvider>
    </StrictMode>
  );
};

export default App;
