import "./App.scss";

import {
  HashRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

import { useAuth } from "./context/AuthContext";

import Header from "./pages/Header/Header";

import Landing from "./pages/Landing/Landing";

import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";

import Dashboard from "./pages/Dashboard/Dashboard";
import ApplicationsPage from "./pages/Application/ApplicationsPage";
import CalendarPage from "./pages/Calendar/CalendarPage";
import SavedJobsPage from "./pages/SaveJobs/SavedJobsPage";
import SettingsPage from "./pages/Settings/SettingsPage";

import ProtectedRoute from "./routes/ProtectedRoute";
import PublicRoute from "./routes/PublicRoute";

function AppContent() {
  const { user } = useAuth();

  return (
    <section className="app-container">

      {user && <Header />}

      <Routes>

        {/* Landing */}
        <Route
          path="/"
          element={
            <PublicRoute>
              <Landing />
            </PublicRoute>
          }
        />

        {/* Login */}
        <Route
          path="/login"
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        />

        {/* Register */}
        <Route
          path="/register"
          element={
            <PublicRoute>
              <Register />
            </PublicRoute>
          }
        />

        {/* Dashboard */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        {/* Applications */}
        <Route
          path="/application"
          element={
            <ProtectedRoute>
              <ApplicationsPage />
            </ProtectedRoute>
          }
        />

        {/* Calendar */}
        <Route
          path="/calendar"
          element={
            <ProtectedRoute>
              <CalendarPage />
            </ProtectedRoute>
          }
        />

        {/* Saved Jobs */}
        <Route
          path="/saved-jobs"
          element={
            <ProtectedRoute>
              <SavedJobsPage />
            </ProtectedRoute>
          }
        />

        {/* Settings */}
        <Route
          path="/settings"
          element={
            <ProtectedRoute>
              <SettingsPage />
            </ProtectedRoute>
          }
        />

      </Routes>
    </section>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;