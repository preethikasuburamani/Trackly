import {
  useEffect,
  useState,
} from "react";

import "./Profile.scss";

import { useAuth } from "../../context/AuthContext";

import ProfileService from "../../services/profile.service";

import type {
  Profile,
} from "../../types/profile.types";

export default function ProfilePage() {
  const { user } =
    useAuth();

  const [profile, setProfile] =
    useState<Profile>({
      uid: "",
      fullName: "",
      email: "",
      targetRole: "",
      location: "",
      github: "",
      linkedin: "",
      portfolio: "",
      about: "",
      createdAt:
        new Date().toISOString(),
    });

  useEffect(() => {
    if (!user) return;

    loadProfile();
  }, [user]);

  const loadProfile =
    async () => {
      const data =
        await ProfileService.getProfile(
          user!.uid
        );

      if (data) {
        setProfile(data);
      } else {
        setProfile(
          (prev) => ({
            ...prev,
            uid: user!.uid,
            email:
              user!.email || "",
          })
        );
      }
    };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement
    >
  ) => {
    setProfile({
      ...profile,
      [e.target.name]:
        e.target.value,
    });
  };

  const handleSave =
    async () => {
      await ProfileService.saveProfile(
        user!.uid,
        profile
      );

      alert(
        "Profile Updated"
      );
    };

  return (
    <div className="profile-page">

      <div className="profile-card">

        <div className="profile-header">

          <div className="avatar">
            {profile.fullName
              ?.charAt(0)
              ?.toUpperCase()}
          </div>

          <div>

            <h2>
              {profile.fullName ||
                "Your Name"}
            </h2>

            <p>
              {profile.email}
            </p>

          </div>

        </div>

        <div className="form-grid">

          <input
            name="fullName"
            placeholder="Full Name"
            value={
              profile.fullName
            }
            onChange={
              handleChange
            }
          />

          <input
            name="targetRole"
            placeholder="Target Role"
            value={
              profile.targetRole
            }
            onChange={
              handleChange
            }
          />

          <input
            name="location"
            placeholder="Location"
            value={
              profile.location
            }
            onChange={
              handleChange
            }
          />

          <input
            name="github"
            placeholder="GitHub URL"
            value={
              profile.github
            }
            onChange={
              handleChange
            }
          />

          <input
            name="linkedin"
            placeholder="LinkedIn URL"
            value={
              profile.linkedin
            }
            onChange={
              handleChange
            }
          />

          <input
            name="portfolio"
            placeholder="Portfolio URL"
            value={
              profile.portfolio
            }
            onChange={
              handleChange
            }
          />

        </div>

        <textarea
          name="about"
          placeholder="About Yourself"
          value={
            profile.about
          }
          onChange={
            handleChange
          }
        />

        <button
          onClick={handleSave}
          className="save-btn"
        >
          Save Profile
        </button>

      </div>
    </div>
  );
}