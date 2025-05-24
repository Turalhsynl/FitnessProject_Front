import { useEffect, useState } from "react";
import { FaUser, FaCog, FaSignOutAlt } from "react-icons/fa";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

const ProfileDropdown = ({ userData, setUserData }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [profileImageUrl, setProfileImageUrl] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfileImage = async () => {
      try {
        const response = await fetch(
          `https://localhost:7298/api/File/${userData?.profileImageId}`
        );
        if (!response.ok) throw new Error("Şəkil tapılmadı");

        const data = await response.json();
        setProfileImageUrl(data.url);
      } catch (error) {
        console.error("Şəkil yüklənə bilmədi:", error);
        setProfileImageUrl(null);
      }
    };

    if (userData?.profileImageId) {
      fetchProfileImage();
    }
  }, [userData?.profileImageId]);

  const handleLogout = () => {
    Cookies.remove("accessToken");
    setUserData(null);
    setIsOpen(false);
    navigate("/login");
  };

  return (
    <div className="relative">
      <img
        src={profileImageUrl}
        alt="Profile"
        className="w-12 h-12 rounded-full cursor-pointer border-2 border-purple-500 shadow-lg hover:scale-110 transition-transform"
        onClick={() => setIsOpen(!isOpen)}
      />

      {isOpen && (
        <div className="absolute right-0 mt-3 w-80 bg-black/60 backdrop-blur-xl border border-white rounded-2xl shadow-xl overflow-hidden z-10 animate-fade-in">
          <div className="p-5 text-white flex items-center gap-4">
            <img
              src={profileImageUrl}
              alt="Profile"
              className="w-14 h-14 rounded-full border-2 border-white shadow-md"
            />
            <div>
              <p className="font-bold text-lg">
                {userData.firstname} {userData.lastname}
              </p>
              <p className="text-sm text-gray-300">{userData.email}</p>
            </div>
          </div>

          <div className="p-4 space-y-2 text-white">
            <button
              onClick={() => navigate("/userprofile")}
              className="flex items-center text-left p-3 cursor-pointer transition-all"
            >
              <FaUser className="mr-3 text-lg" /> My Account
            </button>
            <button className="flex items-center text-left p-3 cursor-pointer transition-all">
              <i className="fa-solid fa-dumbbell mr-3"></i> Plans
            </button>
            <button className="flex items-center text-left p-3 cursor-pointer transition-all">
              <FaCog className="mr-3 text-lg" /> Settings
            </button>
            <button className="flex items-center text-left p-3 cursor-pointer transition-all">
              <i className="fa-solid fa-heart mr-3"></i> Favorites
            </button>
            <button
              onClick={handleLogout}
              className="flex items-center font-bold text-left p-3 transition-all text-[#7032ff] cursor-pointer"
            >
              <FaSignOutAlt className="text-lg mr-[10px] text-[#7337ff]" /> Logout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileDropdown;
