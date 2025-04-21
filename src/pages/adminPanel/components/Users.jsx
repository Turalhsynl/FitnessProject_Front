import { useEffect, useState } from 'react';
import jwt_decode from "jwt-decode";
import Cookies from "js-cookie";

export default function Users() {
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({
    firstname: '', lastname: '', gender: '', age: '', email: '', 
  });
  const [editingUser, setEditingUser] = useState(null);

  const accessToken = Cookies.get("accessToken");
  const decodedToken = jwt_decode(accessToken);
  const userId = decodedToken["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"];

  const getUsers = () => {
    fetch('https://localhost:7298/api/User/GetAll', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
      .then(res => res.json())
      .then(data => setUsers(data))
      .catch(error => console.error('Error fetching users:', error));
  };

  useEffect(() => {
    if (accessToken) {
      getUsers();
    }
  }, [accessToken]);

  const addUser = () => {
    fetch('https://localhost:7298/api/User/Register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newUser),
    })
      .then(() => {
        setNewUser({ firstname: '', lastname: '', gender: '', age: '', email: '', });
        getUsers();
      })
      .catch(error => console.error('Error adding user:', error));
  };

  const deleteUser = (id) => {
    fetch(`https://localhost:7298/api/User/Delete?id=${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
      .then(() => getUsers())
      .catch(error => console.error('Error deleting user:', error));
  };

  const updateUser = () => {
    fetch('https://localhost:7298/api/User/Update', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${accessToken}` },
      body: JSON.stringify(editingUser),
    })
      .then(() => {
        setEditingUser(null);
        getUsers();
      })
      .catch(error => console.error('Error updating user:', error));
  };

  return (
    <div className=''>
      <h2 className="text-xl font-bold mb-4">Users</h2>

      <div className="mb-4 flex gap-2">
        <input
          type="text"
          placeholder="Firstname"
          className="border p-2"
          value={newUser.firstname}
          onChange={e => setNewUser({ ...newUser, firstname: e.target.value })}
        />
        <input
          type="text"
          placeholder="Lastname"
          className="border p-2"
          value={newUser.lastname}
          onChange={e => setNewUser({ ...newUser, lastname: e.target.value })}
        />
        <input
          type="text"
          placeholder="Gender"
          className="border p-2"
          value={newUser.gender}
          onChange={e => setNewUser({ ...newUser, gender: e.target.value })}
        />
        <input
          type="number"
          placeholder="Age"
          className="border p-2"
          value={newUser.age}
          onChange={e => setNewUser({ ...newUser, age: e.target.value })}
        />
        <input
          type="email"
          placeholder="Email"
          className="border p-2"
          value={newUser.email}
          onChange={e => setNewUser({ ...newUser, email: e.target.value })}
        />
       
        <button onClick={addUser} className="bg-green-500 text-white px-4 py-2 rounded">Add</button>
      </div>

      {editingUser && (
        <div className="mb-4 gap-2 ">
          <input
            type="number"
            placeholder="UserRole"
            className="border p-2"
            value={editingUser.userRole}
            onChange={e => setEditingUser({ ...editingUser, userRole: e.target.value })}
          />

        <input
            type="text"
            placeholder="Username"
            className="border p-2"
            value={editingUser.firstname}
            onChange={e => setEditingUser({ ...editingUser, firstname: e.target.value })}
          />

        <input
            type="text"
            placeholder="lastname"
            className="border p-2"
            value={editingUser.lastname}
            onChange={e => setEditingUser({ ...editingUser, lastname: e.target.value })}
          />

        <input
            type="text"
            placeholder="age"
            className="border p-2"
            value={editingUser.age}
            onChange={e => setEditingUser({ ...editingUser, age: e.target.value })}
          />

        <input
            type="text"
            placeholder="gender"
            className="border p-2"
            value={editingUser.gender}
            onChange={e => setEditingUser({ ...editingUser, gender: e.target.value })}
          />

        <input
            type="text"
            placeholder="email"
            className="border p-2"
            value={editingUser.email}
            onChange={e => setEditingUser({ ...editingUser, email: e.target.value })}
          />

        <input
            type="text"
            placeholder="height"
            className="border p-2"
            value={editingUser.height}
            onChange={e => setEditingUser({ ...editingUser, height: e.target.value })}
          />

        <input
            type="text"
            placeholder="weight"
            className="border p-2"
            value={editingUser.weight}
            onChange={e => setEditingUser({ ...editingUser, weight: e.target.value })}
          />
          <button onClick={updateUser} className="bg-blue-500 text-white px-4 py-2 rounded">Update</button>
          <button onClick={() => setEditingUser(null)} className="bg-gray-500 text-white px-4 py-2 rounded">Cancel</button>
        </div>
      )}

      <table className="w-full border">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-2 border">ID</th>
            <th className="p-2 border">User Role</th>
            <th className="p-2 border">Username</th>
            <th className="p-2 border">Lastname</th>
            <th className="p-2 border">Age</th>
            <th className="p-2 border">Gender</th>
            <th className="p-2 border">Email</th>
            <th className="p-2 border">Height</th>
            <th className="p-2 border">Weight</th>
            <th className="p-2 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id} className="border-t">
              <td className="p-2 border">{user.id}</td>
              <td className="p-2 border">{user.userRole}</td>
              <td className="p-2 border">{user.firstname}</td>
              <td className="p-2 border">{user.lastname}</td>
              <td className="p-2 border">{user.age}</td>
              <td className="p-2 border">{user.gender}</td>
              <td className="p-2 border">{user.email}</td>
              <td className="p-2 border">{user.height}</td>
              <td className="p-2 border">{user.weight}</td>
              <td className="p-2 border flex gap-2">
                <button onClick={() => setEditingUser(user)} className="bg-yellow-500 text-white px-2 py-1 rounded">Edit</button>
                <button onClick={() => deleteUser(user.id)} className="bg-red-500 text-white px-2 py-1 rounded">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
