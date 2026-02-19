import React, { useState } from "react";

function Profile() {
  const [profile, setProfile] = useState({
    fullName: "John Doe",
    email: "johndoe@email.com",
    phone: "+254700000000",
    memberId: "MBR-001",
  });

  const handleChange = (e) => {
    setProfile({
      ...profile,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Profile updated successfully!");
    // later: send data to backend API
  };

  const handleLogout = () => {
    localStorage.removeItem("token"); // if using token auth
    window.location.href = "/login";
  };

  return (
    <div className="profile-page">
      <h2>My Profile</h2>

      <div className="profile-card">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Full Name</label>
            <input
              type="text"
              name="fullName"
              value={profile.fullName}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={profile.email}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Phone</label>
            <input
              type="text"
              name="phone"
              value={profile.phone}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Member ID</label>
            <input
              type="text"
              value={profile.memberId}
              disabled
            />
          </div>

          <button type="submit" className="btn-primary">
            Update Profile
          </button>
        </form>

        <hr />

        <button onClick={handleLogout} className="btn-danger">
          Logout
        </button>
      </div>
    </div>
  );
}

export default Profile;