import { useEffect, useState } from "react";
import Input from "../../components/Input";
import axios from "axios";
import { useParams } from "react-router-dom"; 

const Edit = () => {
  const { id } = useParams(); 
  const [product, setProduct] = useState(null); 
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [status, setStatus] = useState(false);

  useEffect(() => {
    if (id) {
      axios.put(`http://localhost:3000/api/v4/product/${id}`)
        .then((res) => {
          console.log(res.data); 
          setProduct(res.data); 
          setName(res.data.name);
          setPrice(res.data.price);
          setStock(res.data.stock);
          setStatus(res.data.status);
        })
        .catch((err) => {
          console.error('Error fetching product:', err);
        });
    }
  }, [id]); 

  if (!product) {
    return <div>Loading...</div>; 
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    const updatedProduct = {
      name,
      price,
      stock,
      status,
    }
    axios.put(`http://localhost:3000/api/v4/product/${id}`, updatedProduct)
    .then((res) => {
      alert("Update Berhasil");
    })
    .catch((err) => {
      alert.error("Error updating product:", err);
    });
};

  return (
    <div className="main">
      <div className="card">
        <h2>Edit Produk</h2>
        <br />
        <form onSubmit={handleSubmit}>
          <Input 
            name="name" 
            type="text" 
            placeholder="Nama Produk..." 
            label="Nama" 
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <Input 
            name="price" 
            type="number" 
            placeholder="Harga Produk..." 
            label="Harga" 
            value={price} 
            onChange={(e) => setPrice(e.target.value)}
          />
          <Input 
            name="stock" 
            type="number" 
            placeholder="Stock Produk..." 
            label="Stock" 
            value={stock}
            onChange={(e)=>setStock(e.target.value)}
          />
          <Input 
            name="status" 
            type="checkbox" 
            label="Active" 
            checked={status}
            onChange={(e)=>setStatus(e.target.checked)}
          />
          <button type="submit" className="btn btn-primary">Simpan</button>
        </form>
      </div>
    </div>
  );
};

export default Edit;
