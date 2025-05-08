import { useNavigate,useLocation } from "react-router-dom"
import { useEffect } from "react";
import './Receipt.css'
import axios from "axios";
function Receipt(){
    const REACT_APP_BASE_URL = process.env.REACT_APP_BASE_URL;
    const naviage = useNavigate();
    const location = useLocation();
    const form = location.state.form;
    console.log("form:",form)
    // [
    //     {
    //         "id": 2,
    //         "name": "오레오",
    //         "price": 1500,
    //         "barcode_number": "5375582719598",
    //         "stock": 3
    //     },
    //     {
    //         "id": 1,
    //         "name": "죠리퐁",
    //         "price": 1500,
    //         "barcode_number": "8010700915085",
    //         "stock": 2
    //     }
    // ]
    useEffect(() => {
        axios.post(`${REACT_APP_BASE_URL}/api/receipt/power/`, form)
          .then(() => {
            console.log("영수증 출력 완료");
            // navigate("/complete"); // 필요 시 다음 페이지로 이동
          })
          .catch(() => {
            console.log("영수증 출력 실패");
          });
      }, [form]);

    const totalPrice = form.reduce((sum, item) => {
        return sum + item.price * item.stock;
      }, 0);
    return(
        <div className="receipt-container" onClick={()=>{
            naviage('/')
        }}>
            <div className="receipt-message-box">
            구매가 완료 되었습니다
            <br></br>
            수고하셨습니다
                <div className="receipt-touch-button">
                    touch👆
                    <br></br>
                </div>
            </div>
            <div>
            {form.map((product, index) => (
                    <dt key={index}>
                        {product.name} // {product.price}원 // {product.stock}개  {product.price * product.stock}원
                    </dt>
                ))}
            </div>
        </div>
    )
}

export default Receipt

// 결제가 완료되었습니다
// {form.map((product, index) => (
//         <dt key={index}>
//             {product.name} // {product.price}원 // {product.stock}개  {product.price * product.stock}원
//         </dt>
//     ))}