import { FaUserCircle } from "react-icons/fa";
import Cookies from "js-cookie";

const ProfileDropdown = ({ userData, setUserData, setIsProfileOpen, isProfileOpen }) => (
  <div className="relative">
    <FaUserCircle
      className="text-3xl cursor-pointer"
      title="Profile"
      onClick={() => setIsProfileOpen(!isProfileOpen)}
    />

    {isProfileOpen && userData && (
      <div className="absolute right-0 mt-2 w-48 bg-white text-black shadow-md rounded-md p-3">
        <p className="text-lg font-bold text-center">{userData.firstname} {userData.lastname}</p>
        <p className="text-sm text-gray-500 text-center">{userData.email}</p>
        <hr className="my-2" />
        <button
          onClick={() => {
            Cookies.remove("accessToken");
            setUserData(null);
            setIsProfileOpen(false);
          }}
          className="w-full bg-red-600 text-white py-2 rounded-md text-center"
        >
          Logout
        </button>
      </div>
    )}
  </div>
);

export default ProfileDropdown;
