// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import {useStore} from 'zustand'
// import download from "../../assets/download.png";
// import { themeStore } from '../../common/Store'

// const Register = () => {
//     const { addAccesToken } = useStore(themeStore);
//   const navigate = useNavigate();
//   const [formData, setFormData] = useState({
//     firstname: "",
//     lastname: "",
//     gender: "",
//     age: "",
//     email: "",
//     password: "",
//   });

//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value.trim(),
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await fetch("https://localhost:7298/api/User/Register", {
//         method: "POST",
//         headers: {
//           "Accept": "application/json",
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(formData),
//       });

//       const data = await response.json();
//       console.log(data);

//       if (!response.ok) {
//         throw new Error(data.message || "Registration failed");
//       }

//       addAccesToken(data.token);
//       navigate("/login");
//     } catch (error) {
//       console.error("Register error:", error.message);
//     }
//   };

//   return (
//     <div
//       className="flex bg-center h-screen items-center justify-center min-h-screen bg-black/55 bg-blend-overlay"
//       style={{ backgroundImage: `url(${download})` }}
//     >
//       <div className="bg-gray-800/40 p-8 rounded-2xl shadow-lg w-96">
//         <h2 className="text-2xl font-bold text-white text-center mb-6">Register</h2>
//         <form onSubmit={handleSubmit}>
//           <div className="mb-4">
//             <label className="block text-gray-400 text-sm mb-2">First Name</label>
//             <input
//               type="text"
//               name="firstname"
//               value={formData.firstname}
//               onChange={handleChange}
//               className="w-full p-3 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
//               placeholder="Enter your first name"
//               required
//             />
//           </div>
//           <div className="mb-4">
//             <label className="block text-gray-400 text-sm mb-2">Last Name</label>
//             <input
//               type="text"
//               name="lastname"
//               value={formData.lastname}
//               onChange={handleChange}
//               className="w-full p-3 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
//               placeholder="Enter your last name"
//               required
//             />
//           </div>
//           <div className="mb-4">
//             <label className="block text-gray-400 text-sm mb-2">Gender</label>
//             <select
//               name="gender"
//               value={formData.gender}
//               onChange={handleChange}
//               className="w-full p-3 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
//               required
//             >
//               <option value="">Select gender</option>
//               <option value="Male">Male</option>
//               <option value="Female">Female</option>
//               <option value="Other">Other</option>
//             </select>
//           </div>
//           <div className="mb-4">
//             <label className="block text-gray-400 text-sm mb-2">Age</label>
//             <input
//               type="number"
//               name="age"
//               value={formData.age}
//               onChange={handleChange}
//               className="w-full p-3 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
//               placeholder="Enter your age"
//               required
//               min="0"
//             />
//           </div>
//           <div className="mb-4">
//             <label className="block text-gray-400 text-sm mb-2">Email</label>
//             <input
//               type="email"
//               name="email"
//               value={formData.email}
//               onChange={handleChange}
//               className="w-full p-3 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
//               placeholder="Enter your email"
//               required
//             />
//           </div>
//           <div className="mb-4">
//             <label className="block text-gray-400 text-sm mb-2">Password</label>
//             <input
//               type="password"
//               name="password"
//               value={formData.password}
//               onChange={handleChange}
//               className="w-full p-3 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
//               placeholder="Enter your password"
//               required
//             />
//           </div>
//           <button
//             type="submit"
//             className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 rounded-lg transition"
//           >
//             Register
//           </button>
//           <p className="text-gray-400 text-sm text-center mt-4">
//             Already have an account?{" "}
//             <span className="text-purple-400 hover:underline cursor-pointer" onClick={() => navigate("/login")}>
//               Login
//             </span>
//           </p>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default Register;
