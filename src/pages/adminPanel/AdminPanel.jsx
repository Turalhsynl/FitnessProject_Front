
import { useState } from 'react';
import Users from './components/Users';
import Recipes from './components/Recipes';
import Products from './components/Products';
import Categories from './components/Categories';

export default function AdminPanel() {
  const [activeTab, setActiveTab] = useState('users');

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-2xl font-bold mb-6">Admin Panel</h1>

      <div className="flex gap-4 mb-6">
        <button onClick={() => setActiveTab('users')} className={`px-4 py-2 rounded ${activeTab === 'users' ? 'bg-purple-600 text-white' : 'bg-white border'}`}>Users</button>
        <button onClick={() => setActiveTab('recipes')} className={`px-4 py-2 rounded ${activeTab === 'recipes' ? 'bg-purple-600 text-white' : 'bg-white border'}`}>Recipes</button>
        <button onClick={() => setActiveTab('products')} className={`px-4 py-2 rounded ${activeTab === 'products' ? 'bg-purple-600 text-white' : 'bg-white border'}`}>Products</button>
        <button onClick={() => setActiveTab('categories')} className={`px-4 py-2 rounded ${activeTab === 'categories' ? 'bg-purple-600 text-white' : 'bg-white border'}`}>Categories</button>
      </div>

      <div className="bg-white p-6 rounded shadow">
        {activeTab === 'users' && <Users />}
        {activeTab === 'recipes' && <Recipes />}
        {activeTab === 'products' && <Products />}
        {activeTab === 'categories' && <Categories />}
      </div>
    </div>
  );
}
