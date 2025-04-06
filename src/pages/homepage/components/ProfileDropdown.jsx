// import { FaUserCircle } from "react-icons/fa";
// import Cookies from "js-cookie";

// const ProfileDropdown = ({ userData, setUserData, setIsProfileOpen, isProfileOpen }) => (
//   <div className="relative">
//     <FaUserCircle
//       className="text-3xl cursor-pointer"
//       title="Profile"
//       onClick={() => setIsProfileOpen(!isProfileOpen)}
//     />

//     {isProfileOpen && userData && (
//       <div className="absolute right-0 mt-2 w-48 bg-white text-black shadow-md rounded-md p-3">
//         <p className="text-lg font-bold text-center">{userData.firstname} {userData.lastname}</p>
//         <p className="text-sm text-gray-500 text-center">{userData.email}</p>
//         <hr className="my-2" />
//         <button
//           onClick={() => {
//             Cookies.remove("accessToken");
//             setUserData(null);
//             setIsProfileOpen(false);
//           }}
//           className="w-full bg-red-600 text-white py-2 rounded-md text-center"
//         >
//           Logout
//         </button>
//       </div>
//     )}
//   </div>
// );

// export default ProfileDropdown;



import { useState } from "react";
import { FaUser, FaCog, FaSignOutAlt, FaUsers, FaLifeRing } from "react-icons/fa";
import Cookies from "js-cookie";

const ProfileDropdown = ({ userData, setUserData }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <img
        src={userData?.avatar || "https://via.placeholder.com/40"}
        alt="Profile"
        className="w-12 h-12 rounded-full cursor-pointer border-2 border-purple-500 shadow-lg hover:scale-110 transition-transform"
        onClick={() => setIsOpen(!isOpen)}
      />

      {isOpen && (
        <div className="absolute right-0 mt-3 w-80 bg-black/60 backdrop-blur-xl border border-white rounded-2xl shadow-xl overflow-hidden z-10 animate-fade-in">
          <div className="p-5  text-white flex items-center gap-4">
            <img
              src={userData?.avatar || "https://via.placeholder.com/50"}
              alt="Profile"
              className="w-14 h-14 rounded-full border-2 border-white shadow-md"
            />
            <div>
              <p className="font-bold text-lg">{userData.firstname} {userData.lastname}</p>
              <p className="text-sm text-gray-300">{userData.email}</p>
            </div>
          </div>

          <div className="p-4 space-y-2 ">
            <button className="flex items-center text-left p-3 cursor-pointer   transition-all text-white">
              <FaUser className="mr-3 text-lg" /> My Account
            </button>
            <button className="flex items-center  text-left p-3 cursor-pointer  transition-all text-white">
            <i class="fa-solid fa-dumbbell mr-3"></i> Plans
            </button>
            <button className="flex items-center  text-left p-3 cursor-pointer   transition-all text-white">
              <FaCog className="mr-3  text-lg" /> Settings
            </button>
            <button className="flex items-center  text-left p-3 cursor-pointer  transition-all text-white">
            <i class="fa-solid fa-heart mr-3 "></i> Favorites
            </button>
            <button
            onClick={() => {
              Cookies.remove("accessToken");
              setUserData(null);
              setIsOpen(false);
            }}
            className="flex items-center font-bold text-left p-3  transition-all text-[#7032ff] cursor-pointer"
          >
            <FaSignOutAlt className="text-lg mr-[10px] text-[#7337ff]" />Logout
          </button>
          </div>
         
        </div>
      )}
    </div>
  );
};

export default ProfileDropdown;

