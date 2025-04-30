import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';

export default function Categories() {
  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState({
    name: '',
    description: '',
    imageUrl: ''
  });
  const [editingCategory, setEditingCategory] = useState(null);

  const accessToken = Cookies.get('accessToken');

  function getCategories() {
    fetch('https://fitgym.com.az/api/Category/GetAllCategory', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
      .then(res => res.json())
      .then(data => setCategories(data));
  }

  function addCategory() {
    fetch('https://fitgym.com.az/api/Category/CreateCategory', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(newCategory),
    }).then(() => {
      setNewCategory({ name: '', description: '', imageUrl: '' });
      getCategories();
    });
  }

  function deleteCategory(id) {
    fetch(`https://fitgym.com.az/api/Category/${id}?deletedBy=${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }).then(() => getCategories());
  }

  function updateCategory() {
    fetch(`https://fitgym.com.az/api/Category/UpdateCategory`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(editingCategory),
    }).then(() => {
      setEditingCategory(null);
      getCategories();
    });
  }

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Categories</h2>

      <div className="mb-4 flex gap-2">
        <input
          type="text"
          placeholder="Name"
          className="border p-2"
          value={newCategory.name}
          onChange={e => setNewCategory({ ...newCategory, name: e.target.value })}
        />
        <input
          type="text"
          placeholder="Description"
          className="border p-2"
          value={newCategory.description}
          onChange={e => setNewCategory({ ...newCategory, description: e.target.value })}
        />
        <input
          type="text"
          placeholder="Image URL"
          className="border p-2"
          value={newCategory.imageUrl}
          onChange={e => setNewCategory({ ...newCategory, imageUrl: e.target.value })}
        />
        <button onClick={addCategory} className="bg-green-500 text-white px-4 py-2 rounded">Add</button>
      </div>


      {editingCategory && (
        <div className="mb-4 flex gap-2">
          <input
            type="text"
            placeholder="Name"
            className="border p-2"
            value={editingCategory.name}
            onChange={e => setEditingCategory({ ...editingCategory, name: e.target.value })}
          />
          <input
            type="text"
            placeholder="Description"
            className="border p-2"
            value={editingCategory.description}
            onChange={e => setEditingCategory({ ...editingCategory, description: e.target.value })}
          />
          <input
            type="text"
            placeholder="Image URL"
            className="border p-2"
            value={editingCategory.imageUrl}
            onChange={e => setEditingCategory({ ...editingCategory, imageUrl: e.target.value })}
          />
          <button onClick={updateCategory} className="bg-blue-500 text-white px-4 py-2 rounded">Update</button>
          <button onClick={() => setEditingCategory(null)} className="bg-gray-500 text-white px-4 py-2 rounded">Cancel</button>
        </div>
      )}


      <table className="w-full border">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-2 border">ID</th>
            <th className="p-2 border">Name</th>
            <th className="p-2 border">Description</th>
            <th className="p-2 border">Image</th>
            <th className="p-2 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {categories.map(category => (
            <tr key={category.id} className="border-t">
              <td className="p-2 border">{category.id}</td>
              <td className="p-2 border">{category.name}</td>
              <td className="p-2 border">{category.description}</td>
              <td className="p-2 border">
                <img src={category.imageUrl} alt="" className="w-16 h-16 object-cover" />
              </td>
              <td className="p-2 border flex gap-2">
                <button onClick={() => setEditingCategory(category)} className="bg-yellow-500 text-white px-2 py-1 rounded">Edit</button>
                <button onClick={() => deleteCategory(category.id)} className="bg-red-500 text-white px-2 py-1 rounded">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
