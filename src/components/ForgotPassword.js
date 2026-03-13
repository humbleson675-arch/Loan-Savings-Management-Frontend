// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";

// function ForgotPassword() {
//   const navigate = useNavigate();

//   const [identifier, setIdentifier] = useState("");
//   const [newPassword, setNewPassword] = useState("");

//   const handleReset = () => {
//     const users = JSON.parse(localStorage.getItem("users")) || [];

//     const userIndex = users.findIndex(
//       (user) =>
//         user.email === identifier || user.phone === identifier
//     );

//     if (userIndex === -1) {
//       alert("User not found");
//       return;
//     }

//     users[userIndex].password = newPassword;

//     localStorage.setItem("users", JSON.stringify(users));

//     alert("Password updated successfully!");
//     navigate("/login");
//   };

//   return (
//     <div style={{ maxWidth: "400px", margin: "100px auto" }}>
//       <h3>Reset Password</h3>

//       <input
//         placeholder="Email or Phone"
//         onChange={(e) => setIdentifier(e.target.value)}
//       />

//       <input
//         type="password"
//         placeholder="New Password"
//         onChange={(e) => setNewPassword(e.target.value)}
//       />

//       <button onClick={handleReset}>Update Password</button>
//     </div>
//   );
// }

// export default ForgotPassword;



import React, { useState } from "react";
import axios from "axios";

function ForgotPassword() {
  const [email, setEmail] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:8080/api/users/forgot-password",
        { email }
      );

      alert(response.data.message);
    } catch (error) {
      alert("Error resetting password");
    }
  };

  return (
    <div style={{ maxWidth: "400px", margin: "100px auto" }}>
      <h2>Reset Password</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{ width: "100%", padding: "10px", marginBottom: "10px" }}
        />

        <button
          type="submit"
          style={{
            width: "100%",
            padding: "10px",
            background: "green",
            color: "white",
            border: "none",
          }}
        >
          Reset Password
        </button>
      </form>
    </div>
  );
}

export default ForgotPassword;