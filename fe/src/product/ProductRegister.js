import React, { useEffect, useState } from "react";
import "./ProductRegister.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
function ProductRegister() {
    const REACT_APP_BASE_URL = process.env.REACT_APP_BASE_URL;
    const navigate = useNavigate();
    console.log(REACT_APP_BASE_URL)
  const [form, setForm] = useState({
    name: "",
    price: "",
    description: "",
    image: null,
    category_id:""
  });

  const [categoryList,setCategoryList] = useState([])

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      setForm({ ...form, image: files[0] });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  useEffect(()=>{
    axios.get(`${REACT_APP_BASE_URL}/api/product/category/list/`)
    .then((res)=>{
        console.log(res.data.category)
        setCategoryList(res.data.category)
    })
  },[])

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const formData = new FormData();
    formData.append("name", form.name);
    formData.append("price", form.price);
    formData.append("description", form.description);
    formData.append("product_image", form.image);
    formData.append("category_id", form.category_id);
  
    try {
      const res = await axios.post(
        `${REACT_APP_BASE_URL}/api/product/register/`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      alert("상품 등록 성공");
      navigate('/product/list')
    } catch (err) {
      console.error(err.response?.data || err.message);
      alert("상품 등록 실패");
    }
  };

  const handleCancel = () => {
    setForm({ name: "", price: "", description: "", image: null });
  };

  return (
    <form className="form-container" onSubmit={handleSubmit}>
      <div className="form-group">
        <label>상품명</label>
        <input type="text" name="name" value={form.name} onChange={handleChange} />
      </div>
      <div className="form-group">
        <label>상품가격</label>
        <input type="number" name="price" value={form.price} onChange={handleChange} />
      </div>
      <div className="form-group">
        <label>상품설명</label>
        <input type="text" name="description" value={form.description} onChange={handleChange} />
      </div>
      <div className="form-group">
        <label>기관명</label>
        {/* input 태그 대신 select 태그 사용 */}
        <select style={{flex:"2"}} name="category_id" value={form.category_id} onChange={handleChange}>
          {/* 기본 옵션 추가 (선택 안 함 또는 안내 문구) */}
          <option value="">카테고리 선택</option>
          {/* categoryList 상태에 저장된 카테고리 목록을 기반으로 option 목록 동적 생성 */}
          {categoryList.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name} {/* 사용자에게 보여줄 내용은 카테고리 이름 */}
            </option>
          ))}
        </select>
      </div>
      <div className="form-group">
        <label>상품이미지</label>
        <input style={{width:"10px"}} type="file" name="image" onChange={handleChange} />
      </div>

      <div className="button-group">
      <button type="button" className="btn cancel" onClick={handleCancel}>취소</button>
        <button type="submit" className="btn submit">등록</button>
      </div>
    </form>
  );
}

export default ProductRegister;
