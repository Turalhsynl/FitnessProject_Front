// import { useEffect, useState } from 'react';
// import Cookies from 'js-cookie';
// import jwt_decode from 'jwt-decode';

// export default function Products() {
//   const [products, setProducts] = useState([]);
//   const [newProduct, setNewProduct] = useState({ name: '', quantity: '', description: '', price: '', imageUrl: '', color: '', categoryId: '' });
//   const [editingProduct, setEditingProduct] = useState(null);

//   const colorOptions = [
//     { id: 1, name: 'Black' },
//     { id: 2, name: 'Grey' },
//     { id: 3, name: 'Pink' },
//     { id: 4, name: 'Green' },
//     { id: 5, name: 'Brown' },
//     { id: 6, name: 'Blue' },
//   ];

//   const accessToken = Cookies.get("accessToken");

//   function getProducts() {
//     fetch('https://localhost:7298/api/Product/GetAll', {
//       method: 'GET',
//       headers: {
//         Authorization: `Bearer ${accessToken}`,
//       },
//     })
//       .then(res => res.json())
//       .then(data => setProducts(data));
//   }

//   function addProduct() {
//     fetch('https://localhost:7298/api/Product/Add', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//         Authorization: `Bearer ${accessToken}`,
//       },
//       body: JSON.stringify({ ...newProduct, quantity: parseInt(newProduct.quantity), price: parseFloat(newProduct.price), color: parseInt(newProduct.color), categoryId: parseInt(newProduct.categoryId) }),
//     }).then(() => {
//       setNewProduct({ name: '', quantity: '', description: '', price: '', imageUrl: '', color: '', categoryId: '' });
//       getProducts();
//     });
//   }

//   function deleteProduct(id) {
//     fetch(`https://localhost:7298/api/Product/Delete?id=${id}`, {
//       method: 'DELETE',
//       headers: {
//         Authorization: `Bearer ${accessToken}`,
//       },
//     }).then(() => getProducts());
//   }

//   function updateProduct() {
//     fetch(`https://localhost:7298/api/Product/Update`, {
//       method: 'PUT',
//       headers: {
//         'Content-Type': 'application/json',
//         Authorization: `Bearer ${accessToken}`,
//       },
//       body: JSON.stringify({ ...editingProduct, quantity: parseInt(editingProduct.quantity), price: parseFloat(editingProduct.price), color: parseInt(editingProduct.color), categoryId: parseInt(editingProduct.categoryId) }),
//     }).then(() => {
//       setEditingProduct(null);
//       getProducts();
//     });
//   }

//   useEffect(() => {
//     getProducts();
//   }, []);

//   return (
//     <div>
//       <h2 className="text-xl font-bold mb-4">Products</h2>
      
//       <div className="mb-4 flex flex-wrap gap-2">
//         <input type="text" placeholder="Name" className="border p-2" value={newProduct.name} onChange={e => setNewProduct({ ...newProduct, name: e.target.value })} />
//         <input type="text" placeholder="Quantity" className="border p-2" value={newProduct.quantity} onChange={e => setNewProduct({ ...newProduct, quantity: e.target.value })} />
//         <input type="text" placeholder="Description" className="border p-2" value={newProduct.description} onChange={e => setNewProduct({ ...newProduct, description: e.target.value })} />
//         <input type="text" placeholder="Price" className="border p-2" value={newProduct.price} onChange={e => setNewProduct({ ...newProduct, price: e.target.value })} />
//         <input type="text" placeholder="Image URL" className="border p-2" value={newProduct.imageUrl} onChange={e => setNewProduct({ ...newProduct, imageUrl: e.target.value })} />
//         <select className="border p-2" value={newProduct.color} onChange={e => setNewProduct({ ...newProduct, color: e.target.value })}>
//           <option value="">Select Color</option>
//           {colorOptions.map(opt => (
//             <option key={opt.id} value={opt.id}>{opt.name}</option>
//           ))}
//         </select>
//         <input type="text" placeholder="Category ID" className="border p-2" value={newProduct.categoryId} onChange={e => setNewProduct({ ...newProduct, categoryId: e.target.value })} />
//         <button onClick={addProduct} className="bg-green-500 text-white px-4 py-2 rounded">Add</button>
//       </div>

//       {editingProduct && (
//         <div className="mb-4 flex flex-wrap gap-2">
//           <input type="text" placeholder="Name" className="border p-2" value={editingProduct.name} onChange={e => setEditingProduct({ ...editingProduct, name: e.target.value })} />
//           <input type="text" placeholder="Quantity" className="border p-2" value={editingProduct.quantity} onChange={e => setEditingProduct({ ...editingProduct, quantity: e.target.value })} />
//           <input type="text" placeholder="Description" className="border p-2" value={editingProduct.description} onChange={e => setEditingProduct({ ...editingProduct, description: e.target.value })} />
//           <input type="text" placeholder="Price" className="border p-2" value={editingProduct.price} onChange={e => setEditingProduct({ ...editingProduct, price: e.target.value })} />
//           <input type="text" placeholder="Image URL" className="border p-2" value={editingProduct.imageUrl} onChange={e => setEditingProduct({ ...editingProduct, imageUrl: e.target.value })} />
//           <select className="border p-2" value={editingProduct.color} onChange={e => setEditingProduct({ ...editingProduct, color: e.target.value })}>
//             <option value="">Select Color</option>
//             {colorOptions.map(opt => (
//               <option key={opt.id} value={opt.id}>{opt.name}</option>
//             ))}
//           </select>
//           <input type="text" placeholder="Category ID" className="border p-2" value={editingProduct.categoryId} onChange={e => setEditingProduct({ ...editingProduct, categoryId: e.target.value })} />
//           <button onClick={updateProduct} className="bg-blue-500 text-white px-4 py-2 rounded">Update</button>
//           <button onClick={() => setEditingProduct(null)} className="bg-gray-500 text-white px-4 py-2 rounded">Cancel</button>
//         </div>
//       )}

//       <table className="w-full border">
//         <thead>
//           <tr className="bg-gray-200">
//             <th className="p-2 border">ID</th>
//             <th className="p-2 border">Name</th>
//             <th className="p-2 border">Description</th>
//             <th className="p-2 border">Quantity</th>
//             <th className="p-2 border">Price</th>
//             <th className="p-2 border">Color</th>
//             <th className="p-2 border">categoryId</th>
//             <th className="p-2 border">Image</th>
//             <th className="p-2 border">Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {products.map(product => (
//             <tr key={product.id} className="border-t">
//               <td className="p-2 border">{product.id}</td>
//               <td className="p-2 border">{product.name}</td>
//               <td className="p-2 border">{product.description}</td>
//               <td className="p-2 border">{product.quantity}</td>
//               <td className="p-2 border">{product.price}</td>
//               <td className="p-2 border">{product.color}</td>
//               <td className="p-2 border">{product.categoryId}</td>
//               <td className="p-2 border"><img src={product.imageUrl} alt="" className="w-16 h-16 object-cover" /></td>
//               <td className="p-2 border flex gap-2">
//                 <button onClick={() => setEditingProduct(product)} className="bg-yellow-500 text-white px-2 py-1 rounded">Edit</button>
//                 <button onClick={() => deleteProduct(product.id)} className="bg-red-500 text-white px-2 py-1 rounded">Delete</button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// }



import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';

export default function Products() {
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({ name: '', quantity: '', description: '', price: '', image: null, color: '', categoryId: '' });
  const [editingProduct, setEditingProduct] = useState(null);

  const colorOptions = [
    { id: 1, name: 'Black' },
    { id: 2, name: 'Grey' },
    { id: 3, name: 'Pink' },
    { id: 4, name: 'Green' },
    { id: 5, name: 'Brown' },
    { id: 6, name: 'Blue' },
  ];

  const accessToken = Cookies.get("accessToken");

  // Get all products
  function getProducts() {
    fetch('https://localhost:7298/api/Product/GetAll', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
      .then(res => res.json())
      .then(data => setProducts(data));
  }

  // Upload image
  function uploadImage(image) {
    const formData = new FormData();
    formData.append('image', image);

    return fetch('https://localhost:7298/api/ProductImage/upload-image', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      body: formData,
    })
      .then(res => res.json())
      .then(data => {
        return data.fileName; // Return the filename of the uploaded image
      });
  }

  // Add new product
  function addProduct() {
    if (newProduct.image) {
      // If there is an image, upload it first
      uploadImage(newProduct.image)
        .then(fileName => {
          const productData = {
            ...newProduct,
            quantity: parseInt(newProduct.quantity),
            price: parseFloat(newProduct.price),
            color: parseInt(newProduct.color),
            categoryId: parseInt(newProduct.categoryId),
            imageUrl: fileName, // Add the image URL (filename)
          };

          // Add the product
          fetch('https://localhost:7298/api/Product/Add', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${accessToken}`,
            },
            body: JSON.stringify(productData),
          }).then(() => {
            // Reset the form and fetch the updated products
            setNewProduct({ name: '', quantity: '', description: '', price: '', image: null, color: '', categoryId: '' });
            getProducts();
          });
        })
        .catch(error => {
          console.error('Image upload failed:', error);
          // Handle image upload error
        });
    } else {
      // If no image, just add the product without the image
      const productData = {
        ...newProduct,
        quantity: parseInt(newProduct.quantity),
        price: parseFloat(newProduct.price),
        color: parseInt(newProduct.color),
        categoryId: parseInt(newProduct.categoryId),
      };

      // Add the product
      fetch('https://localhost:7298/api/Product/Add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(productData),
      }).then(() => {
        setNewProduct({ name: '', quantity: '', description: '', price: '', image: null, color: '', categoryId: '' });
        getProducts();
      });
    }
  }

  // Update existing product
  function updateProduct() {
    if (editingProduct.image) {
      uploadImage(editingProduct.image)
        .then(fileName => {
          const updatedProduct = {
            ...editingProduct,
            quantity: parseInt(editingProduct.quantity),
            price: parseFloat(editingProduct.price),
            color: parseInt(editingProduct.color),
            categoryId: parseInt(editingProduct.categoryId),
            imageUrl: fileName, // Add the image URL (filename)
          };

          fetch('https://localhost:7298/api/Product/Update', {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${accessToken}`,
            },
            body: JSON.stringify(updatedProduct),
          }).then(() => {
            setEditingProduct(null);
            getProducts();
          });
        });
    } else {
      const updatedProduct = {
        ...editingProduct,
        quantity: parseInt(editingProduct.quantity),
        price: parseFloat(editingProduct.price),
        color: parseInt(editingProduct.color),
        categoryId: parseInt(editingProduct.categoryId),
      };

      fetch('https://localhost:7298/api/Product/Update', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(updatedProduct),
      }).then(() => {
        setEditingProduct(null);
        getProducts();
      });
    }
  }

  // Delete product
  function deleteProduct(id) {
    fetch(`https://localhost:7298/api/Product/Delete?id=${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }).then(() => getProducts());
  }

  // Fetch all products on mount
  useEffect(() => {
    getProducts();
  }, []);

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Products</h2>

      {/* New Product Form */}
      <div className="mb-4 flex flex-wrap gap-2">
        <input type="text" placeholder="Name" className="border p-2" value={newProduct.name} onChange={e => setNewProduct({ ...newProduct, name: e.target.value })} />
        <input type="text" placeholder="Quantity" className="border p-2" value={newProduct.quantity} onChange={e => setNewProduct({ ...newProduct, quantity: e.target.value })} />
        <input type="text" placeholder="Description" className="border p-2" value={newProduct.description} onChange={e => setNewProduct({ ...newProduct, description: e.target.value })} />
        <input type="text" placeholder="Price" className="border p-2" value={newProduct.price} onChange={e => setNewProduct({ ...newProduct, price: e.target.value })} />
        <input type="file" onChange={e => setNewProduct({ ...newProduct, image: e.target.files[0] })} />
        <select className="border p-2" value={newProduct.color} onChange={e => setNewProduct({ ...newProduct, color: e.target.value })}>
          <option value="">Select Color</option>
          {colorOptions.map(opt => (
            <option key={opt.id} value={opt.id}>{opt.name}</option>
          ))}
        </select>
        <input type="text" placeholder="Category ID" className="border p-2" value={newProduct.categoryId} onChange={e => setNewProduct({ ...newProduct, categoryId: e.target.value })} />
        <button onClick={addProduct} className="bg-green-500 text-white px-4 py-2 rounded">Add</button>
      </div>

      {/* Edit Product Form */}
      {editingProduct && (
        <div className="mb-4 flex flex-wrap gap-2">
          <input type="text" placeholder="Name" className="border p-2" value={editingProduct.name} onChange={e => setEditingProduct({ ...editingProduct, name: e.target.value })} />
          <input type="text" placeholder="Quantity" className="border p-2" value={editingProduct.quantity} onChange={e => setEditingProduct({ ...editingProduct, quantity: e.target.value })} />
          <input type="text" placeholder="Description" className="border p-2" value={editingProduct.description} onChange={e => setEditingProduct({ ...editingProduct, description: e.target.value })} />
          <input type="text" placeholder="Price" className="border p-2" value={editingProduct.price} onChange={e => setEditingProduct({ ...editingProduct, price: e.target.value })} />
          <input type="file" onChange={e => setEditingProduct({ ...editingProduct, image: e.target.files[0] })} />
          <select className="border p-2" value={editingProduct.color} onChange={e => setEditingProduct({ ...editingProduct, color: e.target.value })}>
            <option value="">Select Color</option>
            {colorOptions.map(opt => (
              <option key={opt.id} value={opt.id}>{opt.name}</option>
            ))}
          </select>
          <input type="text" placeholder="Category ID" className="border p-2" value={editingProduct.categoryId} onChange={e => setEditingProduct({ ...editingProduct, categoryId: e.target.value })} />
          <button onClick={updateProduct} className="bg-blue-500 text-white px-4 py-2 rounded">Update</button>
          <button onClick={() => setEditingProduct(null)} className="bg-gray-500 text-white px-4 py-2 rounded">Cancel</button>
        </div>
      )}

      {/* Products Table */}
      <table className="w-full border">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-2 border">ID</th>
            <th className="p-2 border">Name</th>
            <th className="p-2 border">Description</th>
            <th className="p-2 border">Quantity</th>
            <th className="p-2 border">Price</th>
            <th className="p-2 border">Color</th>
            <th className="p-2 border">Category ID</th>
            <th className="p-2 border">Image</th>
            <th className="p-2 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map(product => (
            <tr key={product.id} className="border-t">
              <td className="p-2 border">{product.id}</td>
              <td className="p-2 border">{product.name}</td>
              <td className="p-2 border">{product.description}</td>
              <td className="p-2 border">{product.quantity}</td>
              <td className="p-2 border">{product.price}</td>
              <td className="p-2 border">{product.color}</td>
              <td className="p-2 border">{product.categoryId}</td>
              <td className="p-2 border"><img src={product.imageUrl} alt="" className="w-16 h-16 object-cover" /></td>
              <td className="p-2 border flex gap-2">
                <button onClick={() => setEditingProduct(product)} className="bg-yellow-500 text-white px-2 py-1 rounded">Edit</button>
                <button onClick={() => deleteProduct(product.id)} className="bg-red-500 text-white px-2 py-1 rounded">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
