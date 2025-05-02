import { useEffect,useState,useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import './Cart.css'
import CartList from "./CartList";
import PayPage from "./PayPage"
function Cart() {
    const REACT_APP_BASE_URL = process.env.REACT_APP_BASE_URL;
    // Modal 온오프
    const [onModal,setOnModal] = useState(false)

    // input 참조하기
    const inputRef = useRef(null);

    const navigate = useNavigate();

    // qr찍을때 들어오는 json데이터
    const [data, setData] = useState("");

    // 상품데이터폼
    const [form, setForm] = useState([]);

    // 테스트용도 TEXT
    const [text,setText] = useState("");

    // QR데이터 넣기
    const onData = (e) => {
        const value = e.target.value;
      setData(value);
    };

    // 아무곳이나 터치해도 input 향하게
    useEffect(() => {
        if (inputRef.current) {
          inputRef.current.focus();
        }
    
        const handleClickAnywhere = () => {
          if (inputRef.current) {
            inputRef.current.focus();
          }
        };
    
        document.addEventListener("click", handleClickAnywhere);
    
        return () => {
          document.removeEventListener("click", handleClickAnywhere);
        };
      }, []);


    // qr스캔시 이벤트
    const onKeyDown = (e) =>{
    
      if (e.key === "Enter"){

        if (/[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/.test(data)) {
            setData("")
            alert("영어로 바꿔주세요");
            return; // 이후 코드 실행 중단
          }
          let parsed
        try{
           parsed = JSON.parse(data);
        }
        catch(err){
          console.log(err)
          setData("");
          return;
        }
        const scannedBarcode = parsed.barcode_number;
        setData("")
        axios.get(`${REACT_APP_BASE_URL}/api/product/search/?barcode_number=${scannedBarcode}`)
        .then((res)=>{
          console.log("들어옵니다")
            const { name, price, id } = res.data;
            const existingIndex = form.findIndex(
                (item) => item.barcode_number === scannedBarcode
              ); // 중복상품 index찾기
            if (existingIndex !== -1){// 중복된 상품이 있다면
                const updatedForm = [...form];
                updatedForm[existingIndex].stock += 1;
                setForm(updatedForm); 
            }else{ // 상품시작이라면
                setForm([...form,{
                    id,name,price,barcode_number:scannedBarcode,
                    stock:1
                }])
            }
      }).catch(()=>{
        alert("등록되지 않은 상품입니다.")
      })
    }}

    const handleCheck = () => { //상품 체크
        if (form.length === 0) {
          alert("상품을 스캔해주세요.");
          return false;
        }
        return true;
      };

      // const handlePay = () =>{
      //   setText("구매가 완료되었습니다")
      //   navigate('/receipt', { state: { form } });
      // }
    return(


      <div className="main-wrapper">
        
        <input
        className="qr_input"
        ref={inputRef}
        type="text"
        value={data}
        onChange={onData}
        onKeyDown={onKeyDown}
      />
      <div className="box-frame">
      <div className="inner-box">
            <CartList form = {form}/>    
        </div>    
        </div>


          <button  className="buy-btn" onClick={()=>{
            if(handleCheck()){
              setOnModal(true);  // 모달 열기
            }
          }}>구매하기</button>
          <div>
          {text}
          </div>
          {onModal && (
            <div className="modal-backdrop" onClick={() => setOnModal(false)}>
              <div className="modal-content" onClick={e => e.stopPropagation()}>
                <PayPage form={form} onClose={() => setOnModal(false)} />
              </div>
            </div>
          )}
          <div className="link-button" onClick={() => navigate('/')}>
            처음으로
          </div>
        </div>
    )
}

export default Cart



// import { useState } from "react";
// import axios from "axios";

// function Cart() {
//   const [data, setData] = useState("");
//   const [form, setForm] = useState([]);
//   const [text, setText] = useState("");

//   const onData = (e) => {
//     setData(e.target.value);
//   };

//   const onKeyDown = (e) => {
//     if (e.key === "Enter") {
//       try {
//         const parsed = JSON.parse(data);
//         const scannedBarcode = parsed.barcode_number;
//         setData("");

//         axios
//           .get(`http://3.39.230.147/api/product/search/?barcode_number=${scannedBarcode}`)
//           .then((res) => {
//             const { name, price, id } = res.data;
//             const existingIndex = form.findIndex(
//               (item) => item.barcode_number === scannedBarcode
//             );

//             if (existingIndex !== -1) {
//               const updatedForm = [...form];
//               updatedForm[existingIndex].stock += 1;
//               setForm(updatedForm);
//             } else {
//               setForm([
//                 ...form,
//                 {
//                   id,
//                   name,
//                   price,
//                   barcode_number: scannedBarcode,
//                   stock: 1,
//                 },
//               ]);
//             }
//           });
//       } catch (error) {
//         console.error("JSON 파싱 에러:", error);
//       }
//     }
//   };

//   const handleCheck = () => {
//     if (form.length === 0) {
//       alert("상품을 스캔해주세요.");
//       return false;
//     }
//     return true;
//   };

//   const handlePay = () => {
//     setText("구매가 완료되었습니다");
//     setForm([]);
//   };

//   return (
//     <div>
//       <input
//         type="text"
//         value={data}
//         onChange={onData}
//         onKeyDown={onKeyDown}
//       />
//       <div>
//         <ul>
//           {form.map((product, index) => (
//             <dt key={index}>
//               {product.name} // {product.price}원 // {product.stock}개
//             </dt>
//           ))}
//         </ul>
//       </div>
//       <button
//         onClick={() => {
//           if (handleCheck()) {
//             handlePay();
//           }
//         }}
//       >
//         구매하기
//       </button>
//       <div>{text}</div>
//     </div>
//   );
// }

// export default Cart;
