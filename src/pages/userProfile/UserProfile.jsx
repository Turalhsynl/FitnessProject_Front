import React, { useState } from "react";

function EditableCard({ label, value, color, onChange }) {
  const [isEditing, setIsEditing] = useState(false);
  const [tempValue, setTempValue] = useState(value);

  const handleBlur = () => {
    setIsEditing(false);
    onChange(tempValue);
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
  const [user, setUser] = useState({
    firstname: "Alyssa",
    lastname: "Jones",
    gender: "Qadın",
    age: "28",
    height: "1.70 m",
    weight: "65 kg",
    email: "alyssa@example.com",
    image: "https://i.pravatar.cc/150?img=12"
  });

  const updateUserField = (field, value) => {
    setUser((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen bg-[#FDF7F0] text-[#1F1F1F] font-sans flex flex-col mt-20">
      {/* Top Bar */}
      <div className="flex justify-between items-center px-6 py-4 bg-white shadow-md z-10">
        <h1 className="text-lg font-semibold">Dashboard</h1>
        <div className="flex items-center gap-3">
          <span className="font-medium">{user.firstname} {user.lastname}</span>
          <img
            src={user.image}
            alt="Avatar"
            className="w-10 h-10 rounded-full border-2 border-purple-500"
          />
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-1">
        {/* Sidebar */}
        <div className="w-64 bg-[#1E2E50] text-white p-6 flex flex-col justify-between min-h-full">
          <div>
            <h1 className="text-2xl font-bold mb-10">FITZONE</h1>
            <ul className="space-y-4">
              {["Profil", "Məşq Planı", "Nailiyyətlər", "Qidalanma", "İstatistikalar", "Qrafik", "Mesajlar"].map((item, i) => (
                <li
                  key={i}
                  className={`px-4 py-2 rounded-lg cursor-pointer ${item === "Profil" ? "bg-[#3E60A1]" : "hover:bg-[#2C3F64]"}`}
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="flex justify-center mt-10">
            <div className="bg-[#3E60A1] p-4 rounded-full">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18V6M18 6v12M9 18V6m6 0v12"
                />
              </svg>
            </div>
          </div>
        </div>

        {/* Main Section */}
        <div className="flex-1 p-6 overflow-y-auto">
          {/* Welcome Card */}
          <div className="bg-[#E8E6FF] rounded-xl p-6 flex flex-col lg:flex-row justify-between items-center mb-6">
            <div className="mb-4 lg:mb-0">
              <h2 className="text-2xl font-bold mb-1">Hi, {user.firstname}</h2>
              <p className="text-sm text-gray-600">
                Ready to start your day with some pitch decks?
              </p>
            </div>
            <img
              src="https://cdn-icons-png.flaticon.com/512/4140/4140048.png"
              className="w-32 h-32 object-contain"
              alt="Welcome Illustration"
            />
          </div>

          {/* Editable Info Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mb-6">
            <EditableCard
              label="Ad"
              value={user.firstname}
              color="bg-yellow-300"
              onChange={(val) => updateUserField("firstname", val)}
            />
            <EditableCard
              label="Soyad"
              value={user.lastname}
              color="bg-purple-300"
              onChange={(val) => updateUserField("lastname", val)}
            />
            <EditableCard
              label="Cinsiyyət"
              value={user.gender}
              color="bg-pink-300"
              onChange={(val) => updateUserField("gender", val)}
            />
            <EditableCard
              label="Yaş"
              value={user.age}
              color="bg-indigo-200"
              onChange={(val) => updateUserField("age", val)}
            />
            <EditableCard
              label="Boy"
              value={user.height}
              color="bg-green-200"
              onChange={(val) => updateUserField("height", val)}
            />
            <EditableCard
              label="Çəki"
              value={user.weight}
              color="bg-red-200"
              onChange={(val) => updateUserField("weight", val)}
            />
            <EditableCard
              label="Email"
              value={user.email}
              color="bg-blue-200 col-span-2 sm:col-span-1 md:col-span-2"
              onChange={(val) => updateUserField("email", val)}
            />
          </div>

          {/* Projects */}
          <div className="space-y-4">
            {[{
              title: 'Next in Fashion',
              desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
              slides: 10,
              status: 'Public',
              image: 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png'
            }, {
              title: 'Digital Marketing Today',
              desc: 'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
              slides: 10,
              status: 'Private',
              image: 'https://cdn-icons-png.flaticon.com/512/3135/3135789.png'
            }].map((item, i) => (
              <div key={i} className="bg-white p-4 rounded-xl shadow-md flex flex-col sm:flex-row items-center justify-between">
                <div className="flex gap-4 items-center mb-4 sm:mb-0">
                  <img src={item.image} className="w-14 h-14" alt="icon" />
                  <div>
                    <h4 className="font-semibold">{item.title}</h4>
                    <p className="text-xs text-gray-500">{item.desc}</p>
                    <p className="text-sm mt-1">{item.slides} Slides</p>
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
  );
}