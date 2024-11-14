import { useState, useEffect } from 'react';
import Input from '../../components/Input';
import './index.scss';
import axios from 'axios';

const Tambah = () => {
  const [nama, setNama] = useState('');
  const [price, setPrice] = useState('');
  const [stock, setStock] = useState('');
  const [status, setStatus] = useState(false);
  const [products, setProducts] = useState([]); // Tambahkan state untuk menyimpan daftar produk

  const handleAddProduct = (e) => {
    e.preventDefault();

    const newProduct = {
      name: nama,
      price: price,
      stock: stock,
      status: status,
    };

    axios.post('http://localhost:3000/api/v4/product', newProduct)
      .then(response => {
        setProducts(response.data); // Perbarui daftar produk
        alert("Berhasil ditambahkan");
      })
      .catch(error => {
        if (error.response) {
          console.error('Error:', error.response.status, error.response.data);
        } else {
          console.error('Error:', error.message);
        }
      });
  }

  // Ambil daftar produk saat pertama kali komponen dimuat
  useEffect(() => {
    axios.get('http://localhost:3000/api/v4/product')
      .then(response => {
        setProducts(response.data);
      })
      .catch(error => {
        console.error('Error fetching products:', error);
      });
  }, []);

  return (
    <div className="main">
      <div className="card">
        <h2>Tambah Produk</h2>
        <br />
        <form onSubmit={handleAddProduct}>
          <Input name="name" type="text" placeholder="Nama Produk..." label="Nama" value={nama} onChange={(e) => setNama(e.target.value)} />
          <Input name="price" type="number" placeholder="Harga Produk..." label="Harga" value={price} onChange={(e) => setPrice(e.target.value)} />
          <Input name="stock" type="number" placeholder="Stock Produk..." label="Stock" value={stock} onChange={(e) => setStock(e.target.value)} />
          <Input name="status" type="checkbox" label="Active" checked={status} onChange={(e) => setStatus(e.target.checked)} />
          <button type="submit" className="btn btn-primary">Simpan</button>
        </form>
        
      </div>
    </div>
  );
};

export default Tambah;
