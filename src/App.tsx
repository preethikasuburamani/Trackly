import "./App.scss";
import {HashRouter as Router, Routes,Route,} from "react-router-dom";

import Header from "./pages/Header/Header";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";

import Dashboard from "./pages/Dashboard/Dashboard";
import ApplicationsPage from "./pages/Application/ApplicationsPage";
import CalendarPage from "./pages/Calendar/CalendarPage";

import ProtectedRoute from "./routes/ProtectedRoute";
import SavedJobsPage from "./pages/SaveJobs/SavedJobsPage";
import SettingsPage from "./pages/Settings/SettingsPage";

function App() {
  return (
    <Router>
      <section className="app-container">

        <Header />

        <Routes>

           <Route
            path="/"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="/login"
            element={<Login />}
          />

          <Route
            path="/register"
            element={<Register />}
          />

         

          <Route
            path="/application"
            element={
              <ProtectedRoute>
                <ApplicationsPage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/calendar"
            element={
              <ProtectedRoute>
                <CalendarPage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/saved-jobs"
            element={
              <ProtectedRoute>
                <SavedJobsPage />
              </ProtectedRoute>
            }
          />
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
    </Router>
  );
}

export default App;