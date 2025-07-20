import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get("http://localhost:5001/api/products")
      .then(res => {
        if (Array.isArray(res.data)) {
          setProducts(res.data);
        } else {
          setProducts([]);
        }
      })
      .catch(err => {
        console.error("Error fetching products:", err);
        setError("Failed to fetch products. Please try again later.");
      });
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Delete this product?")) {
      try {
        await axios.delete(`http://localhost:5001/api/products/${id}`);
        setProducts(products.filter(p => p._id !== id));
      } catch (err) {
        console.error("Error deleting product:", err);
        setError("Failed to delete product. Please try again.");
      }
    }
  };

  return (
    <div className="sb2-2">
      <div className="sb2-2-2">
        <ul>
          <li><Link to="#"><i className="fa fa-home"></i> Home</Link></li>
          <li className="active-bre"><Link to="#">Product</Link></li>
        </ul>
      </div>

      <div className="sb2-2-3">
        <div className="row">
          <div className="col-md-12">
            <div className="box-inn-sp">
              <div className="inn-title">
                <h3>Products</h3>
              </div>
              <div className="tab-inn">
                {error && <div style={{ color: "red" }}>{error}</div>}
                <div className="table-responsive table-desi">
                  <table className="table table-hover">
                    <thead>
                      <tr>
                        <th>Product img</th>
                        <th>Product Name</th>
                        <th>Price</th>
                        <th>Description</th>
                        <th>View</th>
                        <th>Edit</th>
                        <th>Delete</th>
                      </tr>
                    </thead>
                    <tbody>
                      {products.length > 0 ? products.map(product => (
                        <tr key={product._id}>
                          <td>
                            <img
                              src={product.image || "https://via.placeholder.com/100"}
                              alt={product.name || "Product"}
                              className="product-icn"
                              style={{ width: "100px", height: "auto" }}
                              onError={(e) => { e.target.src = "https://via.placeholder.com/100"; }}
                            />
                          </td>
                          <td><span className="list-enq-name">{product.name || "N/A"}</span></td>
                          <td>₹{product.sellPrice ?? "N/A"}</td>
                          <td className="wc-50">{product.description || "N/A"}</td>
                          <td><Link to={`/product-view/${product._id}`}><i className="fa fa-eye"></i></Link></td>
                          <td><Link to={`/product-edit/${product._id}`}><i className="fa fa-pencil-square-o"></i></Link></td>
                          <td><Link to="#" onClick={() => handleDelete(product._id)}><i className="fa fa-trash-o"></i></Link></td>
                        </tr>
                      )) : (
                        <tr><td colSpan="7">{error || "No products found."}</td></tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>      
    </div>
  );
};

export default ProductList;