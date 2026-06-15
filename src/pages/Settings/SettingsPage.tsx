import {
  useEffect,
  useState,
} from "react";

import "./Settings.scss";

import { useAuth } from "../../context/AuthContext";

import AuthService from "../../services/auth.service";
import SettingsService from "../../services/settings.service";

export default function SettingsPage() {

  const { user } =
    useAuth();

  const [settings, setSettings] =
    useState({
      fullName: "",
      email: "",

      targetRole: "",
      preferredLocation: "",
      expectedSalary: "",

      emailNotifications: true,
      interviewReminders: true,
      weeklyReports: true,
    });

  useEffect(() => {
    if (!user) return;

    loadSettings();
  }, [user]);

  const loadSettings =
    async () => {

      const data =
        await SettingsService.get(
          user!.uid
        );

      if (data) {
        setSettings(data as any);
      } else {

        setSettings({
          ...settings,

          fullName:
            user?.displayName ||
            "",

          email:
            user?.email ||
            "",
        });
      }
    };

  const handleChange = (
    e: any
  ) => {

    const {
      name,
      value,
      checked,
      type,
    } = e.target;

    setSettings(
      (prev) => ({
        ...prev,

        [name]:
          type === "checkbox"
            ? checked
            : value,
      })
    );
  };

  const saveSettings =
    async () => {

      await SettingsService.save(
        user!.uid,
        settings
      );

      alert(
        "Settings Saved"
      );
    };

  const logout =
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
          Account
        </h2>

        <input
          name="fullName"
          value={
            settings.fullName
          }
          onChange={
            handleChange
          }
          placeholder="Full Name"
        />

        <input
          name="email"
          value={
            settings.email
          }
          disabled
        />

      </div>

      <div className="settings-card">

        <h2>
          Job Preferences
        </h2>

        <input
          name="targetRole"
          value={
            settings.targetRole
          }
          onChange={
            handleChange
          }
          placeholder="Frontend Developer"
        />

        <input
          name="preferredLocation"
          value={
            settings.preferredLocation
          }
          onChange={
            handleChange
          }
          placeholder="London"
        />

        <input
          name="expectedSalary"
          value={
            settings.expectedSalary
          }
          onChange={
            handleChange
          }
          placeholder="£35,000"
        />

      </div>

      <div className="settings-card">

        <h2>
          Notifications
        </h2>

        <label>

          <input
            type="checkbox"
            name="emailNotifications"
            checked={
              settings.emailNotifications
            }
            onChange={
              handleChange
            }
          />

          Email Notifications

        </label>

        <label>

          <input
            type="checkbox"
            name="interviewReminders"
            checked={
              settings.interviewReminders
            }
            onChange={
              handleChange
            }
          />

          Interview Reminders

        </label>

        <label>

          <input
            type="checkbox"
            name="weeklyReports"
            checked={
              settings.weeklyReports
            }
            onChange={
              handleChange
            }
          />

          Weekly Reports

        </label>

      </div>

      <div className="settings-actions">

        <button
          className="save-btn"
          onClick={
            saveSettings
          }
        >
          Save Changes
        </button>

        <button
          className="logout-btn"
          onClick={logout}
        >
          Logout
        </button>

      </div>

    </div>
  );
}