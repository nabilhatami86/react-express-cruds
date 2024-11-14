import { Link, useParams } from "react-router-dom";
import './index.scss';
import { useEffect, useState } from "react";
import axios from "axios";

const Detail = () => {
  const { id } = useParams(); 
  const [product, setProduct] = useState(null); 

  useEffect(() => {
    axios.get(`http://localhost:3000/api/v4/product/${id}`)
      .then((res) => {
        setProduct(res.data); 
      })
      .catch(error => {
        console.error('There was an error fetching the product!', error);
      });
  }, [id]); 

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div className="main">
      <Link to="/" className="btn btn-primary">Kembali</Link>

      <table className="table">
        <tbody>
          <tr>
            <td>ID</td>
            <td>{product._id}</td>
          </tr>
          <tr>
            <td>Name</td>
            <td>{product.name}</td>
          </tr>
          <tr>
            <td>Price</td>
            <td>: Rp. {product.price}</td>
          </tr>
          <tr>
            <td>Stock</td>
            <td>: {product.stock}</td>
          </tr>
          <tr>
            <td>Status</td>
            <td>: {product.status ? 'Active' : 'Inactive'}</td>
          </tr>
          {product.image_url && (
            <tr>
              <td>Image</td>
              <td><img src={product.image_url} alt={product.name} width={100} /></td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default Detail;
