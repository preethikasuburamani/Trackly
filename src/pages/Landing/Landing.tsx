import { useNavigate } from "react-router-dom";
import "./Landing.scss";

export default function Landing() {
  const navigate = useNavigate();

  return (
    <div className="landing">

      <section className="hero">

        <div className="hero-content">

          <h1>
            Track Your Job Search Like A Pro
          </h1>

          <p>
            Organize applications,
            schedule interviews,
            save opportunities,
            and land your dream job.
          </p>

          <div className="hero-actions">

            <button
              className="primary-btn"
              onClick={() =>
                navigate("/register")
              }
            >
              Get Started Free
            </button>

            <button
              className="secondary-btn"
              onClick={() =>
                navigate("/login")
              }
            >
              Login
            </button>

          </div>

        </div>

      </section>

      <section className="features">

        <div className="feature-card">
          <h3>📄 Applications</h3>
          <p>
            Manage all job applications
            in one place.
          </p>
        </div>

        <div className="feature-card">
          <h3>📅 Calendar</h3>
          <p>
            Never miss an interview.
          </p>
        </div>

        <div className="feature-card">
          <h3>⭐ Saved Jobs</h3>
          <p>
            Store jobs for later.
          </p>
        </div>

        <div className="feature-card">
          <h3>📊 Dashboard</h3>
          <p>
            Visualize your progress.
          </p>
        </div>

      </section>

    </div>
  );
}