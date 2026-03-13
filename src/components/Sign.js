// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";

// function SignUpForm() {
//   const navigate = useNavigate();

//   const [data, setData] = useState({
//     name: "",
//     email: "",
//     phone: "",
//     password: "",
//     confirmPassword: "",
//     role: "member", // default role
//   });

//   const [errors, setErrors] = useState({});

//   const handleChange = (e) => {
//     setData({ ...data, [e.target.name]: e.target.value });
//   };

//   const validate = () => {
//     const newErrors = {};

//     if (!data.name) newErrors.name = "Full name is required";

//     if (!data.email) {
//       newErrors.email = "Email is required";
//     } else if (!/\S+@\S+\.\S+/.test(data.email)) {
//       newErrors.email = "Invalid email format";
//     }

//     if (!data.phone) {
//       newErrors.phone = "Phone number is required";
//     } else if (!/^\d{10,15}$/.test(data.phone)) {
//       newErrors.phone = "Phone must be 10–15 digits";
//     }

//     if (!data.password) {
//       newErrors.password = "Password is required";
//     } else if (data.password.length < 6) {
//       newErrors.password = "Password must be at least 6 characters";
//     }

//     if (data.confirmPassword !== data.password) {
//       newErrors.confirmPassword = "Passwords do not match";
//     }

//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const handleSubmit = async(e) => {
//     e.preventDefault();
//     if (!validate()) return;

//     const newUser = {
//       name: data.name,
//       email: data.email,
//       phone: data.phone,
//       password: data.password,
//       role: data.role,
//     };

//     const response = await axios.post("http://localhost:8080/api/users/register", newUser)
//     console.log("the response is " , response.data)
//     if(response.data.status==="00"){
//       alert(response.data.message)

//         // Redirect to login
//     navigate("/login");
//     }
//     else{
//       alert(response.data.message)
//     }
//   };

//   const styles = {
//     container: {
//       maxWidth: "20%",
//       marginTop: "50px",
//       margin: "40px auto",
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
//     },
//     footerNote: {
//       textAlign: "center",
//       fontSize: "20px",
//       color: "#ffffff",
//       marginTop: "20px",
//     },
//   };

//   return (
//     <div style={styles.container}>
//       <div style={styles.title}>Create Account</div>

//       <form onSubmit={handleSubmit}>
//         <div style={styles.field}>
//           <label>Enter your fullName</label>
//           <input
//             style={styles.input}
//             name="name"
//             value={data.name}
//             onChange={handleChange}
//           />
//           <div style={styles.error}>{errors.name}</div>
//         </div>

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
//           <label>Enter your Phone Number</label>
//           <input
//             style={styles.input}
//             name="phone"
//             value={data.phone}
//             onChange={handleChange}
//           />
//           <div style={styles.error}>{errors.phone}</div>
//         </div>

//         {/* Role Selection */}
//         <div style={styles.field}>
//           <label>Select Role</label>
//           <select
//             name="role"
//             value={data.role}
//             onChange={handleChange}
//             style={styles.input}
//           >
//             <option value="member">Member</option>
//             <option value="admin">Admin</option>
//             <option value="treasurer">Treasurer</option>
//           </select>
//         </div>

//         <div style={styles.field}>
//           <label>Enter your password</label>
//           <input
//             style={styles.input}
//             type="password"
//             name="password"
//             value={data.password}
//             onChange={handleChange}
//           />
//           <div style={styles.error}>{errors.password}</div>
//         </div>

//         <div style={styles.field}>
//           <label>Confirm your password</label>
//           <input
//             style={styles.input}
//             type="password"
//             name="confirmPassword"
//             value={data.confirmPassword}
//             onChange={handleChange}
//           />
//           <div style={styles.error}>{errors.confirmPassword}</div>
//         </div>

//         <button onClick = {handleSubmit}  type="submit" style={styles.button}>
//           Register
//         </button>
//       </form>

//       <p style={styles.footerNote}>
//         We value your communication and will respond as soon as possible.
//       </p>
//     </div>
//   );
// }

// export default SignUpForm;




import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function SignUpForm() {
  const navigate = useNavigate();

  const [isLogin, setIsLogin] = useState(true);

  const [data, setData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    role: "member",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const validateLogin = () => {
    const newErrors = {};

    if (!data.email) newErrors.email = "Email is required";
    if (!data.password) newErrors.password = "Password is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateSignup = () => {
    const newErrors = {};

    if (!data.name) newErrors.name = "Full name required";
    if (!data.phone) newErrors.phone = "Phone required";
    if (!data.email) newErrors.email = "Email required";

    if (data.password.length < 6)
      newErrors.password = "Password must be 6 characters";

    if (data.password !== data.confirmPassword)
      newErrors.confirmPassword = "Passwords do not match";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!validateLogin()) return;

    try {
      const response = await axios.post(
        "http://localhost:8080/api/users/login",
        {
          email: data.email,
          password: data.password,
        }
      );

      if (response.data.status === "00") {
        const { token, user } = response.data;

        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(user));

        const role = user.role.toLowerCase();

        if (role === "admin") navigate("/admin");
        else if (role === "treasurer") navigate("/treasurer");
        else navigate("/dashboard");
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      alert("Login failed");
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    if (!validateSignup()) return;

    try {
      const response = await axios.post(
        "http://localhost:8080/api/users/register",
        {
          name: data.name,
          email: data.email,
          phone: data.phone,
          password: data.password,
          role: data.role,
        }
      );

      if (response.data.status === "00") {
        alert("Account created successfully");
        setIsLogin(true);
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      alert("Signup failed");
    }
  };

  const styles = {
    container: {
      maxWidth: "400px",
      margin: "80px auto",
      padding: "30px",
      borderRadius: "10px",
      background: "#bbc5bc",
      boxShadow: "0 10px 25px rgba(0,0,0,0.2)",
    },
    input: {
      width: "100%",
      padding: "10px",
      marginBottom: "10px",
      borderRadius: "5px",
      border: "1px solid #ccc",
    },
    button: {
      width: "100%",
      padding: "12px",
      background: "#198754",
      color: "#fff",
      border: "none",
      borderRadius: "6px",
      fontWeight: "bold",
      cursor: "pointer",
    },
    switch: {
      marginTop: "15px",
      textAlign: "center",
      cursor: "pointer",
      color: "blue",
    },
    error: {
      color: "red",
      fontSize: "12px",
    },
  };

  return (
    <div style={styles.container}>
      {isLogin ? (
        <>
          <h2>Sign In</h2>

          <form onSubmit={handleLogin}>
            <input
              style={styles.input}
              placeholder="Email"
              name="email"
              onChange={handleChange}
            />
            <div style={styles.error}>{errors.email}</div>

            <input
              style={styles.input}
              type="password"
              placeholder="Password"
              name="password"
              onChange={handleChange}
            />
            <div style={styles.error}>{errors.password}</div>

            <button type="submit" style={styles.button}>
              Login
            </button>

            <p
  style={{ textAlign: "center", marginTop: "10px", cursor: "pointer", color: "blue" }}
  onClick={() => navigate("/forgot-password")}
>
  Forgot Password?
</p>
          </form>

          <p style={styles.switch} onClick={() => setIsLogin(false)}>
            Create Account
          </p>
        </>
      ) : (
        <>
          <h2>Create Account</h2>

          <form onSubmit={handleSignup}>
            <input
              style={styles.input}
              placeholder="Full Name"
              name="name"
              onChange={handleChange}
            />
            <div style={styles.error}>{errors.name}</div>

            <input
              style={styles.input}
              placeholder="Email"
              name="email"
              onChange={handleChange}
            />

            <input
              style={styles.input}
              placeholder="Phone"
              name="phone"
              onChange={handleChange}
            />

            <select
              style={styles.input}
              name="role"
              onChange={handleChange}
            >
              <option value="member">Member</option>
              <option value="admin">Admin</option>
              <option value="treasurer">Treasurer</option>
            </select>

            <input
              style={styles.input}
              type="password"
              placeholder="Password"
              name="password"
              onChange={handleChange}
            />

            <input
              style={styles.input}
              type="password"
              placeholder="Confirm Password"
              name="confirmPassword"
              onChange={handleChange}
            />

            <button type="submit" style={styles.button}>
              Register
            </button>
          </form>

          <p style={styles.switch} onClick={() => setIsLogin(true)}>
            Already have an account? Sign In
          </p>
        </>
      )}
    </div>
  );
}

export default SignUpForm;