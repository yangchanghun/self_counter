function CartList({ form = [] }) {
    if (form.length > 0) {
      console.log(form);
    }
  
    return (
      <ul style={{ padding: 0, margin: 0 }}>
        {form.map((item, index) => (
          <li key={index} style={{
            listStyleType: "none",
            marginBottom: "20px",
            fontSize: "24px",
            fontWeight: "bold",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center"
          }}>
            <div>
              {item.name}
            </div>
            <div>
              {item.price.toLocaleString()}원 × {item.stock}개
            </div>
          </li>
        ))}
      </ul>
    );
  }
  
  export default CartList;
  