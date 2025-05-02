import React, { useEffect, useState } from "react";
import "./ProductList.css";
import axios from "axios";

function ProductList() {
    const [products,setProducts] = useState([])
    const REACT_APP_BASE_URL = process.env.REACT_APP_BASE_URL;
    useEffect(()=>{
        axios.get(`${REACT_APP_BASE_URL}/api/product/list/`)
        .then((res)=>{
            setProducts(res.data.product);
            console.log(res)
        })
        .catch((err)=>{
            console.log(err)
        })
    },[])

    if (products.length === 0) {
        return(
            <div>
                상품이없습니다
            </div>
        )
    }

  return (
    <div className="product-list-container">
      <table className="product-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>상품이미지</th>
            <th>상품명</th>
            <th>상품가격</th>
            <th>바코드 숫자</th>
            <th>바코드 이미지</th>
            <th>기관명</th>
          </tr>
        </thead>
        <tbody>
          {products.length === 0 ? (
            <tr>
              <td colSpan="6" style={{ textAlign: "center" }}>
                등록된 상품이 없습니다.
              </td>
            </tr>
          ) : (
            products.map((product) => (
              <tr key={product.id}>
                <td>{product.id}</td>
                <td>
                  <img src={`${REACT_APP_BASE_URL}${product.product_image}`} alt="상품" className="thumbnail" />
                </td>
                <td>{product.name}</td>
                <td>{product.price}원</td>
                <td>{product.barcode_number}</td>
                <td>
                  <img src={`${REACT_APP_BASE_URL}${product.barcode_image}`} alt="바코드" className="thumbnail" />
                </td>
                <td>{product.category}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      <div className="btn-container">
      </div>
    </div>
  );
}

export default ProductList;
