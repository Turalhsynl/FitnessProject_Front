import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
import jwt_decode from "jwt-decode";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

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
  const sidebarItems = [
    "Profil", "Məşq Planı", "Nailiyyətlər", "Qidalanma",
    "İstatistikalar", "Qrafik", "Mesajlar", "Şifrəni dəyiş"
  ];
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

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

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      toast.error("Yeni şifrələr uyğun gəlmir ❌");
      return;
    }
    try {
      const accessToken = Cookies.get("accessToken");
      if (!accessToken) return;

      const payload = {
        id: user.id,
        firstname: user.firstname,
        lastname: user.lastname,
        gender: user.gender,
        age: user.age,
        email: user.email,
        password: newPassword,
        height: user.height,
        weight: user.weight
      };

      const response = await fetch("https://localhost:7298/api/User/update", {
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
        toast.error(result.message || "Xəta baş verdi ❌");
      }
    } catch (err) {
      toast.error("Şifrə dəyişdirilə bilmədi ❌");
    }
  };

  const updateUserField = async (field, value) => {
    try {
      const accessToken = Cookies.get("accessToken");
      if (!accessToken) return;

      const updatedUser = {
        ...user,
        [field]: value,
        password: user.password || "default-password"
      };

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

  if (loading) return <div className="text-center mt-10">Yüklənir...</div>;
  if (!user) return <div className="text-center mt-10">İstifadəçi məlumatları mövcud deyil.</div>;

  return (
    <div className="min-h-screen bg-[#FDF7F0] text-[#1F1F1F] font-sans flex flex-col mt-20">
      <ToastContainer position="top-right" autoClose={3000} />
      <div className="flex flex-col lg:flex-row flex-1">
        {/* Sidebar */}
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

        {/* Main content */}
        <div className="flex-1 p-6">
          <div className="bg-[#E8E6FF] rounded-xl p-4 md:p-6 flex flex-col md:flex-row items-center justify-between mb-6 gap-4">
            <div>
              <h2 className="text-2xl font-bold mb-1">Salam, {user.firstname}!</h2>
              <p className="text-sm text-gray-600">Bugünkü hədəflərə hazırsanmı?</p>
            </div>
            <img
              src={user.image || "https://i.pravatar.cc/150?img=12"}
              alt="Profil şəkli"
              className="w-20 h-20 rounded-full border-4 border-white shadow-md"
            />
          </div>

          {/* Profile Editing */}
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

          {/* Change Password */}
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

          {/* Programs */}
          <div className="mt-10">
            <h3 className="text-xl font-semibold mb-4">Proqramlarım</h3>
            <div className="space-y-4">
              {[
                {
                  title: 'Əzələ Artırma Proqramı',
                  desc: 'Bu proqram əzələ kütləsini artırmaq üçün nəzərdə tutulub.',
                  slides: 12,
                  status: 'Public',
                  image: 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png'
                },
                {
                  title: 'Arıqlama Planı',
                  desc: 'Yağ yandırmaq və fit qalmaq üçün hazırlanan proqram.',
                  slides: 8,
                  status: 'Private',
                  image: 'https://cdn-icons-png.flaticon.com/512/3135/3135789.png'
                }
              ].map((item, i) => (
                <div key={i} className="bg-white p-4 rounded-xl shadow-md flex flex-col sm:flex-row items-center justify-between">
                  <div className="flex gap-4 items-center mb-4 sm:mb-0">
                    <img src={item.image} className="w-14 h-14" alt="icon" />
                    <div>
                      <h4 className="font-semibold">{item.title}</h4>
                      <p className="text-xs text-gray-500">{item.desc}</p>
                      <p className="text-sm mt-1">{item.slides} slayd</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-sm bg-gray-100 px-3 py-1 rounded-full">
                      {item.status}
                    </span>
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
