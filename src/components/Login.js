// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";

// function LoginForm() {
//   const navigate = useNavigate();

//   const [data, setData] = useState({
//     email: "",
//     password: "",
//   });

//   const [errors, setErrors] = useState({});
//   const [loading, setLoading] = useState(false);

//     const handleChange = (e) => {
//     setData({ ...data, [e.target.name]: e.target.value });
//   };

//   const validate = () => {
//     const newErrors = {};
//     if (!data.email) {
//       newErrors.email = "Email is required";
//     } else if (!/\S+@\S+\.\S+/.test(data.email)) {
//       newErrors.email = "Invalid email format";
//     }

//     if (!data.password) {
//       newErrors.password = "Password is required";
//     } else if (data.password.length < 6) {
//       newErrors.password = "Password must be at least 6 characters";
//     }

//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };


//  const handleSubmit = async (e) => {
//   e.preventDefault();
//   if (!validate()) return;

//   try {
//     setLoading(true);
//     const response = await axios.post("http://localhost:8080/api/users/login", {
//       email: data.email,
//       password: data.password,
//     });

//     if (response.data.status === "00") {
//       const { token, user } = response.data;

//       // Store data
//       localStorage.setItem("token", token);
//       localStorage.setItem("user", JSON.stringify(user));

//       // Extract role safely
//       const role = user?.role?.toLowerCase(); 

//       // Redirect based on role
//       if (role === "admin") {
//         navigate("/admin");
//       } else if (role === "treasurer") {
//         navigate("/treasurer");
//       } else if (role === "member") {
//         navigate("/dashboard");
//       } else {
//         navigate("/");
//       }
//     } else {
//       alert(response.data.message || "Login failed");
//     }
//   } catch (error) {
//     console.error("Login error:", error);
//     alert(error.response?.data?.message || "An error occurred during login");
//   } finally {
//     setLoading(false);
//   }
// };


//   const styles = {
//     container: {
//       maxWidth: "50%",
//       margin: "40px auto",
//       marginTop: "100px",
//       padding: "30px",
//       borderRadius: "12px",
//       background: "#bbc5bc",
//       boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
//       fontSize: "20px",
//     },
//     title: {
//       textAlign: "center",
//       marginBottom: "20px",
//       fontSize: "22px",
//       fontWeight: "bold",
//       color: "#333",
//     },
//     field: { marginBottom: "14px" },
//     input: {
//       width: "100%",
//       padding: "10px 12px",
//       borderRadius: "6px",
//       border: "1px solid #ccc",
//       fontSize: "20px",
//       outline: "none",
//     },
//     error: {
//       color: "red",
//       fontSize: "12px",
//       marginTop: "4px",
//     },
//     button: {
//       width: "100%",
//       padding: "12px",
//       backgroundColor: "#198754",
//       color: "#fff",
//       border: "none",
//       borderRadius: "6px",
//       cursor: "pointer",
//       fontSize: "20px",
//       fontWeight: "bold",
//       marginTop: "10px",
//       opacity: loading ? 0.7 : 1,
//     },
//   };

//   return (
//     <div style={styles.container}>
//       <div style={styles.title}>Login</div>

//       <form onSubmit={handleSubmit}>
//         <div style={styles.field}>
//           <label>Enter your Email</label>
//           <input
//             style={styles.input}
//             name="email"
//             value={data.email}
//             onChange={handleChange}
//           />
//           <div style={styles.error}>{errors.email}</div>
//         </div>

//         <div style={styles.field}>
//           <label>Enter your Password</label>
//           <input
//             style={styles.input}
//             type="password"
//             name="password"
//             value={data.password}
//             onChange={handleChange}
//           />
//           <div style={styles.error}>{errors.password}</div>
//         </div>

//         <button type="submit" style={styles.button}>
//           { "Login"}
//         </button>
//       </form>
//     </div>
//   );
// }

// export default LoginForm;