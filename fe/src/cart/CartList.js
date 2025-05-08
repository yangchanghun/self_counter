function CartList({ form = [], setForm }) {
  if (form.length > 0) {
    console.log(form);
  }

  const handleIncrease = (index) => {
    const updatedForm = [...form];
    updatedForm[index].stock += 1;
    setForm(updatedForm);
  };

  const handleDecrease = (index) => {
    const updatedForm = [...form];
    if (updatedForm[index].stock > 1) {
      updatedForm[index].stock -= 1;
    } else {
      updatedForm.splice(index, 1); // stock 1 이하면 삭제
    }
    setForm(updatedForm);
  };

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
            <button onClick={() => handleDecrease(index)} style={{ marginLeft: "10px" }}>-</button>
            <button onClick={() => handleIncrease(index)} style={{ marginLeft: "5px" }}>+</button>
          </div>
        </li>
      ))}
    </ul>
  );
}

export default CartList;
