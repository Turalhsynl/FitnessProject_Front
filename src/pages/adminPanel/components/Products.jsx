import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';

export default function Products() {
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({ name: '', quantity: '', description: '', price: '', color: '', categoryId: '' });
  const [editingProduct, setEditingProduct] = useState(null);
  const [imageUrls, setImageUrls] = useState({});

  const colorOptions = [
    { id: 1, name: 'Black' },
    { id: 2, name: 'Grey' },
    { id: 3, name: 'Pink' },
    { id: 4, name: 'Green' },
    { id: 5, name: 'Brown' },
    { id: 6, name: 'Blue' },
  ];

  const accessToken = Cookies.get("accessToken");

  function getProducts() {
    fetch('https://localhost:7298/api/Product/GetAll', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
      .then(res => res.json())
      .then(data => {
        setProducts(data);
        fetchImages(data);
      });
  }

  async function uploadProductImage(productId, image) {
    const formData = new FormData();
    formData.append('ProductImage', image);
    formData.append('ProductId', productId);
  
    const response = await fetch('https://localhost:7298/api/ProductImage/upload-image', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      body: formData,
    });
  
    if (!response.ok) {
      const errorText = await response.text();
      console.error("Image upload failed:", errorText);
      throw new Error('Image upload failed');
    }
  
    return await response.json();
  }
  
  function addProduct() {
    const productData = {
      name: newProduct.name,
      quantity: parseInt(newProduct.quantity),
      description: newProduct.description,
      price: parseFloat(newProduct.price),
      imageUrl: "string", // Formal olaraq
      color: parseInt(newProduct.color),
      categoryId: parseInt(newProduct.categoryId),
    };
  
    fetch('https://localhost:7298/api/Product/Add', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(productData),
    })
      .then(() => {
        // məhsullar yenidən yüklənir
        getProducts();
  
        // şəkil varsa, məhsul ID tapılmalıdır (ən sonuncunu götürək)
        if (newProduct.image) {
          setTimeout(() => {
            // Ən son məhsulu tapmaq üçün 500ms sonra products state-dən götürmək
            fetch('https://localhost:7298/api/Product/GetAll', {
              method: 'GET',
              headers: {
                Authorization: `Bearer ${accessToken}`,
              },
            })
              .then(res => res.json())
              .then(allProducts => {
                const lastProduct = allProducts[allProducts.length - 1];
                if (lastProduct && lastProduct.id) {
                  uploadProductImage(lastProduct.id, newProduct.image)
                    .then(() => getProducts())
                    .catch(err => console.error("Şəkil yüklənmədi:", err));
                }
              });
          }, 500);
        }
  
        setNewProduct({ name: '', quantity: '', description: '', price: '', image: null, color: '', categoryId: '' });
      })
      .catch(err => console.error("Məhsul əlavə olunmadı:", err));
  }
  

  async function updateProduct() {
    try {
      const updatedProduct = {
        id: editingProduct.id,
        name: editingProduct.name,
        quantity: parseInt(editingProduct.quantity),
        description: editingProduct.description,
        price: parseFloat(editingProduct.price),
        color: parseInt(editingProduct.color),
        categoryId: parseInt(editingProduct.categoryId),
        imageId: editingProduct.imageId || 0,
        imageUrl: "",
      };
  
      const response = await fetch('https://localhost:7298/api/Product/Update', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(updatedProduct),
      });
  
      if (!response.ok) {
        throw new Error("Product update failed");
      }
  
      if (editingProduct.image instanceof File) {
        const uploadResult = await uploadProductImage(editingProduct.id, editingProduct.image);
  
      }
  
      setEditingProduct(null);
      getProducts();
    } catch (error) {
      console.error('Product update failed:', error);
    }
  }

  function deleteProduct(id) {
    fetch(`https://localhost:7298/api/Product/Delete?id=${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }).then(() => getProducts());
  }

  async function fetchImages(products) {
    const urls = {};
    for (const product of products) {
      if (product.imageId) {
        try {
          const response = await fetch(`https://localhost:7298/api/File/${product.imageId}`);
          if (response.ok) {
            const data = await response.json();
            urls[product.id] = data.url;
          }
        } catch (error) {
          console.error('Şəkil yüklənərkən xəta baş verdi:', error);
        }
      }
    }
    setImageUrls(urls);
  }

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
          <input type="file" className='border' onChange={e => setEditingProduct({ ...editingProduct, image: e.target.files[0] })} />
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
              <td className="p-2 border">
                {imageUrls[product.id] && (
                  <img src={imageUrls[product.id]} alt="" className="w-16 h-16 object-cover" />
                )}
              </td>
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
