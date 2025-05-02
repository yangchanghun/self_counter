import { useNavigate,useLocation } from "react-router-dom"
import './Receipt.css'
function Receipt(){
    const naviage = useNavigate();
    const location = useLocation();
    const form = location.state.form;

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
                </div>
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