import "./Settings.scss";

import {
  useAuth,
} from "../../context/AuthContext";

import AuthService from "../../services/auth.service";

export default function SettingsPage() {

  const { user } =
    useAuth();

  const handleLogout =
    async () => {
      await AuthService.logout();
    };

  return (
    <div className="settings-page">

      <h1>
        Settings
      </h1>

      <div className="settings-card">

        <h2>
          Profile
        </h2>

        <p>
          Name:
          {" "}
          {
            user?.displayName
          }
        </p>

        <p>
          Email:
          {" "}
          {
            user?.email
          }
        </p>

      </div>

      <div className="settings-card">

        <h2>
          Account
        </h2>

        <button
          onClick={
            handleLogout
          }
        >
          Logout
        </button>

      </div>

    </div>
  );
}