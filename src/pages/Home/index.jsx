import { Link } from 'react-router-dom';
import axios from 'axios';
import './index.scss';
import { useEffect, useState } from 'react';

const Home = () => {

  const [product, setProduct] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);


  useEffect(()=>{
    axios.get('http://localhost:3000/api/v4/product')
    .then(response =>{
      setProduct(response.data);
      setLoading(false)
    })
    .catch(error =>{
      console.log('There was an error fetching the product!',error)
    })
  },[]);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
};

const handleDeleteProduct = (id) => {
  axios.delete(`http://localhost:3000/api/v4/product/${id}`, {
      })
      .then(() => {
          axios.get('http://localhost:3000/api/v4/product')
              .then(response => {
                  setProduct(response.data);
              })
              .catch(error => {
                  console.error('There was an error fetching the product!', error);
              });
      })
      .catch(error => {
          console.error(error)
      })
  };


  return(
    <div className="main">
      <Link to="/tambah" className="btn btn-primary">Tamah Produk</Link>
      <div className="search">
        <input type="text" placeholder="Masukan kata kunci..." value={searchTerm} onChange={handleSearch}/>
      </div>
      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th className="text-right">Price</th>
            <th className="text-center">Action</th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr>
              <td colSpan="4" className="text-center">
                <div className="spinner-border text-primary" role="status">
                  <span className="sr-only">Loading...</span>
                </div>
              </td>
            </tr>
          ) : (
            product
            .filter((prod) =>
              prod.name.toLowerCase().includes(searchTerm.toLowerCase())
            )
            .map((prod, index) => (
              <tr key={index}>
                <td>{prod._id}</td>
                <td>{prod.name}</td>
                <td className="text-right">RP. {prod.price.toLocaleString()}</td>
                <td className="text-center">
                  <Link to={`/detail/${prod._id}`} className="btn btn-sm btn-info">Detail</Link>
                  <Link to={`/edit/${prod._id}`} className="btn btn-sm btn-warning">Edit</Link>
                  <button className="btn btn-sm btn-danger" 
                          onClick={() => handleDeleteProduct(prod._id)}>
                          Delete</button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  )
}

export default Home;