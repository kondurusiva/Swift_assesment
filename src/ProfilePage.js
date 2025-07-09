import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./ProfilePage.css";

export default function ProfilePage() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((res) => res.json())
      .then((data) => setUser(data[0]));
  }, []);

  if (!user) return <div className="center">Loading...</div>;

  return (
    <div className="profile-wrapper">
      <div className="navbar">
        <div className="logo"><img alt="logo" src="https://res.cloudinary.com/dfll49x4h/image/upload/v1752037272/swift_logo.png"/></div>
        <div className="profile-initials">{getInitials(user.name)}</div>
      </div>
      <div className="profile-content">
        <button className="back-btn" onClick={() => navigate("/")}>← Back to Dashboard</button>
        <h2>Welcome, {user.name}</h2>
        <div className="profile-card">
          <div className="profile-avatar">{getInitials(user.name)}</div>
          <div className="profile-info">
            <div><b>User ID:</b> {user.id}</div>
            <div><b>Name:</b> {user.name}</div>
            <div><b>Email ID:</b> {user.email}</div>
            <div><b>Address:</b> {user.address.street}, {user.address.city}</div>
            <div><b>Phone:</b> {user.phone}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Helper function to get initials from name
function getInitials(name) {
  if (!name) {
    return "";
  }
  const words = name.trim().split(" ");
  if (words.length === 1) {
    return words[0][0].toUpperCase();
  }
  return (words[0][0] + words[words.length - 1][0]).toUpperCase();
}