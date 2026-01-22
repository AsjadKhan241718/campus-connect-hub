import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { CartProvider } from "@/contexts/CartContext";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Events from "./pages/Events";
import EventDetail from "./pages/EventDetail";
import Clubs from "./pages/Clubs";
import ClubDetail from "./pages/ClubDetail";
import About from "./pages/About";
import Cart from "./pages/Cart";
import Profile from "./pages/Profile";
import StudentDashboard from "./pages/StudentDashboard";
import ClubDashboard from "./pages/ClubDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import Unauthorized from "./pages/Unauthorized";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <CartProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<Index />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/events" element={<Events />} />
              <Route path="/events/:id" element={<EventDetail />} />
              <Route path="/clubs" element={<Clubs />} />
              <Route path="/clubs/:id" element={<ClubDetail />} />
              <Route path="/about" element={<About />} />
              <Route path="/cart" element={<Cart />} />
              
              {/* Protected Routes - All authenticated users */}
              <Route path="/profile" element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              } />
              
              {/* Protected Routes - Students */}
              <Route path="/dashboard" element={
                <ProtectedRoute allowedRoles={['student']}>
                  <StudentDashboard />
                </ProtectedRoute>
              } />
              
              {/* Protected Routes - Club Coordinators */}
              <Route path="/club-dashboard" element={
                <ProtectedRoute allowedRoles={['club_coordinator']}>
                  <ClubDashboard />
                </ProtectedRoute>
              } />
              
              {/* Protected Routes - Admin */}
              <Route path="/admin" element={
                <ProtectedRoute allowedRoles={['admin']}>
                  <AdminDashboard />
                </ProtectedRoute>
              } />
              
              {/* Error Routes */}
              <Route path="/unauthorized" element={<Unauthorized />} />
              
              {/* Fallback routes - show Coming Soon instead of 404 */}
              <Route path="/contact" element={<NotFound />} />
              <Route path="/help" element={<NotFound />} />
              <Route path="/privacy" element={<NotFound />} />
              <Route path="/terms" element={<NotFound />} />
              <Route path="/settings" element={<NotFound />} />
              <Route path="/checkout" element={<NotFound />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </CartProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
