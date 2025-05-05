import { useEffect, useState } from 'react';
import jwt_decode from "jwt-decode";
import Cookies from "js-cookie";
export default function Recipes() {
  const [recipes, setRecipes] = useState([]);
  const [newRecipe, setNewRecipe] = useState({ title: '', description: '', imageUrl: '' });
  const [editingRecipe, setEditingRecipe] = useState(null);

const accessToken = Cookies.get("accessToken");
  const decodedToken = jwt_decode(accessToken);
  const userId = decodedToken["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"];


  function getRecipes() {
    fetch('https://localhost:7298/api/Recipe', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
      .then(res => res.json())
      .then(data => setRecipes(data));
  }

  function addRecipe() {
    fetch('https://localhost:7298/api/Recipe/add', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(newRecipe),
    }).then(() => {
      setNewRecipe({ title: '', description: '', imageUrl: '' });
      getRecipes();
    });
  }

  function deleteRecipe(id) {
    fetch(`https://localhost:7298/api/Recipe/${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }).then(() => getRecipes());
  }

  function updateRecipe() {
    fetch(`https://localhost:7298/api/Recipe/${editingRecipe.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(editingRecipe),
    }).then(() => {
      setEditingRecipe(null);
      getRecipes();
    });
  }

  useEffect(() => {
    getRecipes();
  }, []);

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Recipes</h2>
      <div className="mb-4 flex gap-2">
        <input type="text" placeholder="name" className="border p-2" value={newRecipe.name} onChange={e => setNewRecipe({ ...newRecipe, name: e.target.value })} />
        <input type="text" placeholder="Description" className="border p-2" value={newRecipe.description} onChange={e => setNewRecipe({ ...newRecipe, description: e.target.value })} />
        <input type="text" placeholder="Image URL" className="border p-2" value={newRecipe.imageUrl} onChange={e => setNewRecipe({ ...newRecipe, imageUrl: e.target.value })} />
        <input type="text" placeholder="ingredients" className="border p-2" value={newRecipe.ingredients} onChange={e => setNewRecipe({ ...newRecipe, ingredients: e.target.value })} />
        <input type="text" placeholder="calories" className="border p-2" value={newRecipe.calories} onChange={e => setNewRecipe({ ...newRecipe, calories: e.target.value })} />
        <input type="text" placeholder="mealType" className="border p-2" value={newRecipe.mealType} onChange={e => setNewRecipe({ ...newRecipe, mealType: e.target.value })} />
        
       
       
        <button onClick={addRecipe} className="bg-green-500 text-white px-4 py-2 rounded">Add</button>
      </div>

      {editingRecipe && (
        <div className="mb-4 flex gap-2">
          <input type="text" placeholder="name" className="border p-2" value={editingRecipe.name} onChange={e => setEditingRecipe({ ...editingRecipe, name: e.target.value })} />
          <input type="text" placeholder="Description" className="border p-2" value={editingRecipe.description} onChange={e => setEditingRecipe({ ...editingRecipe, description: e.target.value })} />
          <input type="text" placeholder="Image URL" className="border p-2" value={editingRecipe.imageUrl} onChange={e => setEditingRecipe({ ...editingRecipe, imageUrl: e.target.value })} />
          <input type="text" placeholder="ingredients" className="border p-2" value={editingRecipe.ingredients} onChange={e => setEditingRecipe({ ...editingRecipe, ingredients: e.target.value })} />
          <input type="text" placeholder="calories" className="border p-2" value={editingRecipe.calories} onChange={e => setEditingRecipe({ ...editingRecipe, calories: e.target.value })} />
          <input type="text" placeholder="mealType" className="border p-2" value={editingRecipe.mealType} onChange={e => setEditingRecipe({ ...editingRecipe, mealType: e.target.value })} />
          <button onClick={updateRecipe} className="bg-blue-500 text-white px-4 py-2 rounded">Update</button>
          <button onClick={() => setEditingRecipe(null)} className="bg-gray-500 text-white px-4 py-2 rounded">Cancel</button>
        </div>
      )}

      <table className="w-full border">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-2 border">ID</th>
            <th className="p-2 border">Name</th>
            <th className="p-2 border">Description</th>
            <th className="p-2 border">Image</th>
            <th className="p-2 border">ingredients</th>
            <th className="p-2 border">calories</th>
            <th className="p-2 border">mealType</th>
            <th className="p-2 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {recipes.map(recipe => (
            <tr key={recipe.id} className="border-t">
              <td className="p-2 border">{recipe.id}</td>
              <td className="p-2 border">{recipe.name}</td>
              <td className="p-2 border">{recipe.description}</td>
              <td className="p-2 border">
                <img src={recipe.imageUrl} alt="" className="w-16 h-16 object-cover" />
              </td>
              <td className="p-2 border">{recipe.ingredients}</td>
              <td className="p-2 border">{recipe.calories}</td>
              <td className="p-2 border">{recipe.mealType}</td>
              
              <td className="p-2 border flex gap-2">
                <button onClick={() => setEditingRecipe(recipe)} className="bg-yellow-500 text-white px-2 py-1 rounded">Edit</button>
                <button onClick={() => deleteRecipe(recipe.id)} className="bg-red-500 text-white px-2 py-1 rounded">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
