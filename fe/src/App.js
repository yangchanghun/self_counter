
import { Routes,Route } from 'react-router-dom';
import Cart from './cart/Cart';
import Receipt from './receipt/Receipt';
import hd from './배너로고.png';
import Main from './main/Main';
import ProductList from './product/ProductList';
import ProductRegister from './product/ProductRegister';
function App() {


  return (
    <>
    <img style={{width:"100%",height:"150px",marginBottom:"100px"}} src={hd} ></img>
    <div style={{textAlign:'center'}}>
    {/* <img src={hd} style={{ width: "768px", height: "200px" }} alt="배너" /> */}
    <Routes>
      <Route path='' element={<Main/>}/>
      <Route path='cart' element={<Cart/>}/>
      <Route path='receipt' element={<Receipt/>}/>
      <Route path='product/register' element={<ProductRegister/>}/>
      <Route path='product/list' element={<ProductList/>}/>
    </Routes>
    </div>
    </>
  );
}

export default App;
