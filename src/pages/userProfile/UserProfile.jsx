import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
import jwt_decode from "jwt-decode";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from "react-router-dom";
import Users from "../adminPanel/components/Users"
import Recipes from '../adminPanel/components/Recipes';
import Products from '../adminPanel/components/Products';
import Categories from '../adminPanel/components/Categories';

function EditableCard({ label, value, color, onChange }) {
  const [isEditing, setIsEditing] = useState(false);
  const [tempValue, setTempValue] = useState(value);


  useEffect(() => {
    setTempValue(value);
  }, [value]);

  const handleBlur = async () => {
    setIsEditing(false);
    await onChange(tempValue);
  };

  return (
    <div
      className={`p-4 rounded-xl ${color} text-[#1F1F1F] shadow-sm cursor-pointer`}
      onClick={() => setIsEditing(true)}
    >
      <p className="text-sm mb-1">{label}</p>
      {isEditing ? (
        <input
          type="text"
          className="w-full text-2xl font-bold bg-transparent focus:outline-none"
          value={tempValue}
          onChange={(e) => setTempValue(e.target.value)}
          onBlur={handleBlur}
          autoFocus
        />
      ) : (
        <p className="text-2xl font-bold">{value}</p>
      )}
    </div>
  );
}

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedItem, setSelectedItem] = useState("Profil");
  const isAdmin = user?.userRole === 1;

  const sidebarItems = [
    "Profil",
    "Məşq Planı",
    "Nailiyyətlər",
    "Qidalanma",
    "İstatistikalar",
    "Qrafik",
    "Mesajlar",
    "Şifrəni dəyiş",
    ...(isAdmin
      ? ["Product CRUD", "User CRUD", "Recipes CRUD", "Categories CRUD"]
      : []),
  ];
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [profileImageUrl, setProfileImageUrl] = useState(null);
  const [programs, setPrograms] = useState([]);
  const navigate = useNavigate();


  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const accessToken = Cookies.get("accessToken");
        if (!accessToken) return;

        const decodedToken = jwt_decode(accessToken);
        const userId = decodedToken["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"];

        const response = await fetch(`https://localhost:7298/api/User/GetById?Id=${userId}`, {
          headers: { Authorization: `Bearer ${accessToken}` },
        });

        if (!response.ok) throw new Error("İstifadəçi məlumatları gətirilə bilmədi");
        const data = await response.json();
        setUser(data.data);
        setLoading(false);
      } catch (err) {
        console.error("Xəta:", err.message);
        toast.error("İstifadəçi məlumatları yüklənə bilmədi");
        setLoading(false);
      }
    };
    fetchUserData();
  }, []);

  useEffect(() => {
    const fetchProfileImage = async () => {
      try {
        const response = await fetch(`https://localhost:7298/api/File/${user?.profileImageId}`);
        if (!response.ok) throw new Error("Şəkil tapılmadı");
        const data = await response.json();
        setProfileImageUrl(data.url);
      } catch (error) {
        console.error("Şəkil yüklənə bilmədi:", error);
        setProfileImageUrl(null);
      }
    };

    if (user?.profileImageId) {
      fetchProfileImage();
    }
  }, [user?.profileImageId]);
  

  const updateUserField = async (field, value) => {
    try {
      const accessToken = Cookies.get("accessToken");
      if (!accessToken) return;

      const updatedUser = { ...user, [field]: value };

      const response = await fetch("https://localhost:7298/api/User/Update", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(updatedUser),
      });

      const result = await response.json();
      if (result.isSuccess) {
        setUser(updatedUser);
        toast.success("Məlumat uğurla yeniləndi ✅");
      } else {
        toast.error("Xəta baş verdi ❌");
      }
    } catch (err) {
      toast.error("Yeniləmə zamanı xəta baş verdi ❌");
    }
  };

  const accessToken = Cookies.get("accessToken");
  const decodedToken = jwt_decode(accessToken);
  const userId = decodedToken["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"];

  const handlePasswordChange = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      toast.error("Yeni şifrələr uyğun gəlmir ❌");
      return;
    }

    try {
      const accessToken = Cookies.get("accessToken");
      if (!accessToken || !user?.id) return;

      const payload = {
        userId: userId,
        currentPassword: oldPassword,
        newPassword: newPassword,
      };

      const response = await fetch("https://localhost:7298/api/User/update-password", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(payload),
      });

      const result = await response.json();
      if (result.isSuccess) {
        toast.success("Şifrə uğurla dəyişdirildi ✅");
        setOldPassword("");
        setNewPassword("");
        setConfirmPassword("");
      } else {
        toast.error(result.message || "Şifrə dəyişdirilə bilmədi ❌");
      }
    } catch (error) {
      console.error("Şifrə dəyişmə xətası:", error);
      toast.error("Xəta baş verdi ❌");
    }
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) {
      toast.error("Şəkil seçilmədi ❌");
      return;
    }
  
    const formData = new FormData();
    formData.append("ProfileImage", file);
  
    try {
      const accessToken = Cookies.get("accessToken");
      if (!accessToken) return;
  
      const response = await fetch("https://localhost:7298/api/UserProfile/upload-profile-image", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        body: formData,
      });
  
      const data = await response.json();
      if (data.isSuccess) {
        setProfileImageUrl(data.imageUrl);
        toast.success("Şəkil uğurla yeniləndi ✅");
        
        setUser({ ...user, profileImageId: data.profileImageId });
  
      } else {
        toast.error("Şəkil yüklənə bilmədi ❌");
      }
    } catch (error) {
      console.error("Şəkil yükləmə xətası:", error);
      toast.error("Şəkil yüklənərkən xəta baş verdi ❌");
    }
  };
  
  

  useEffect(() => {
    fetch(`https://localhost:7298/api/UserProgram/programs-by-user?userId=${userId}`)
      .then(response => response.json())
      .then(data => {
        if (data.isSuccess) {
          setPrograms(data.data);
        }
      })
      .catch(error => console.error('API Error:', error));
  }, []);


  if (loading) return <div className="text-center mt-10">Yüklənir...</div>;
  if (!user) return <div className="text-center mt-10">İstifadəçi məlumatları mövcud deyil.</div>;

  return (
    <div className="min-h-screen bg-[#FDF7F0] text-[#1F1F1F] font-sans flex flex-col mt-20">
      <ToastContainer position="top-right" autoClose={3000} />
      <div className="flex flex-col lg:flex-row flex-1">
        <div className="w-full lg:w-64 bg-black text-white p-6">
          <h1 className="text-2xl font-bold mb-10">FITZONE</h1>
          <ul className="space-y-3">
            {sidebarItems.map((item, i) => (
              <li
                key={i}
                className={`px-4 py-2 cursor-pointer transition-all duration-300 
                ${item === selectedItem
                    ? "bg-[#FDF7F0] text-[#1F1F1F] rounded-l-lg -mr-6 z-10"
                    : "hover:bg-[#2a2b2e]  text-white rounded-lg"}`}
                onClick={() => setSelectedItem(item)}
              >
                {item}
              </li>
            ))}
          </ul>
        </div>
        <div className="flex-1 p-6">
        <div className="bg-[#E8E6FF] rounded-xl p-4 md:p-6 flex flex-col md:flex-row items-center justify-between mb-6 gap-4">
  <div>
    <h2 className="text-2xl font-bold mb-1">Salam, {user.firstname}!</h2>
    <p className="text-sm text-gray-600">Bugünkü hədəflərə hazırsanmı?</p>
  </div>
  <div className="relative w-20 h-20">
    <img
      src={profileImageUrl || "https://cdn-icons-png.flaticon.com/512/149/149071.png"}
      alt="Profil şəkli"
      className="w-20 h-20 rounded-full border-4 border-white shadow-md object-cover"
    />
    <label className="absolute bottom-0 right-0 bg-white p-1 rounded-full shadow cursor-pointer">
      <input
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleImageUpload}
      />
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-4 w-4 text-black"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536M9 13l3 3L20.485 7.515a2.121 2.121 0 00-3-3L9 13z" />
      </svg>
    </label>
  </div>
</div>
          {selectedItem === "Profil" && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
              <EditableCard label="Name" value={user.firstname} color="bg-yellow-300" onChange={(val) => updateUserField("firstname", val)} />
              <EditableCard label="Surname" value={user.lastname} color="bg-purple-300" onChange={(val) => updateUserField("lastname", val)} />
              <EditableCard label="Gender" value={user.gender} color={`${user.gender === "male" ? "bg-blue-300" : "bg-pink-300"}`} onChange={(val) => updateUserField("gender", val)} />
              <EditableCard label="Email" value={user.email} color="bg-blue-200 col-span-1 sm:col-span-2" onChange={(val) => updateUserField("email", val)} />
              <EditableCard label="Age" value={user.age} color="bg-indigo-200" onChange={(val) => updateUserField("age", val)} />
              <EditableCard label="Height" value={user.height} color="bg-green-200" onChange={(val) => updateUserField("height", val)} />
              <EditableCard label="Weight" value={user.weight} color="bg-red-200" onChange={(val) => updateUserField("weight", val)} />
            </div>
          )}
          {selectedItem === "Şifrəni dəyiş" && (
            <div className="bg-white p-6 rounded-xl shadow-md w-full max-w-md mx-auto">
              <h2 className="text-xl font-bold mb-4">Şifrəni Dəyiş</h2>
              <form className="space-y-4" onSubmit={handlePasswordChange}>
                <input
                  type="password"
                  placeholder="Köhnə şifrə"
                  className="w-full p-2 border rounded"
                  value={oldPassword}
                  onChange={(e) => setOldPassword(e.target.value)}
                  required
                />
                <input
                  type="password"
                  placeholder="Yeni şifrə"
                  className="w-full p-2 border rounded"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  required
                />
                <input
                  type="password"
                  placeholder="Yeni şifrə təkrar"
                  className="w-full p-2 border rounded"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
                <button
                  type="submit"
                  className="w-full bg-[#1E2E50] text-white py-2 rounded hover:bg-[#3E60A1]"
                >
                  Dəyiş
                </button>
              </form>
            </div>
          )}


          {selectedItem === "Product CRUD" && isAdmin && (
            <div className="bg-white p-6 rounded-xl shadow-md">
              <h2 className="text-xl font-bold mb-4">Product CRUD</h2>
              <p>Burada məhsulların idarə olunması olacaq.</p>
              <Products />

            </div>
          )}

          {selectedItem === "User CRUD" && isAdmin && (
            <div className="bg-white p-6 rounded-xl shadow-md">
              <h2 className="text-xl font-bold mb-4">User CRUD</h2>
              <p>Burada istifadəçilərin idarə olunması olacaq.</p>
              <Users />
            </div>
          )}

          {selectedItem === "Recipes CRUD" && isAdmin && (
            <div className="bg-white p-6 rounded-xl shadow-md">
              <h2 className="text-xl font-bold mb-4">Recipes CRUD</h2>
              <p>Burada reseptlərin idarə olunması olacaq.</p>
              <Recipes />
            </div>
          )}

          {selectedItem === "Categories CRUD" && isAdmin && (
            <div className="bg-white p-6 rounded-xl shadow-md">
              <h2 className="text-xl font-bold mb-4">Categories CRUD</h2>
              <p>Burada kateqoriyaların idarə olunması olacaq.</p>
              <Categories />
            </div>
          )}

          <div className="mt-10 max-w-7xl mx-auto px-4">
            <h3 className="text-3xl font-bold text-center text-gray-800 mb-8">Proqramlarım</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {programs.map((program, i) => (
                <div
                  key={i}
                  className="bg-white hover:shadow-xl transition-shadow duration-300 p-6 rounded-2xl border border-gray-200 flex flex-col justify-between"
                >
                  <img
                    src={program.imageUrl}
                    alt={program.name}
                    className="w-full h-40 object-cover rounded-xl mb-4"
                  />
                  <h4 className="text-xl font-semibold mb-2 text-gray-800">{program.name}</h4>
                  <p className="text-gray-600 text-sm mb-3 line-clamp-3">{program.description}</p>
                  <div className="flex justify-between text-sm text-gray-500 mb-4">
                    <span>Çətinlik: {program.level}</span>
                    <span>Müddət: {program.durationInWeeks} həftə</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-bold text-indigo-600">${program.price}</span>
                    <button
                      onClick={() =>
                        navigate(`/program-details/${program.id}`, { state: { program } })
                      }
                      className="bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-2 rounded-full text-sm transition duration-200"
                    >
                      Proqramı İzlə
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
