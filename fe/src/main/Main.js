import './Main.css';
import { useNavigate } from 'react-router-dom';

function Main() {
  const navigate = useNavigate();

  return (
    <div className="main-wrapper">
      <button className="buy-button"
        onClick={()=>{
          navigate('cart')
        }}
      >
        셀프계산 시작하기
      </button>


    </div>
  );
}

export default Main;
