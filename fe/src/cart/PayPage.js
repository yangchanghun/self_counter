import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import card_mg from "./card_modal.gif";

function PayPage({ form }) {
  const navigate = useNavigate();

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Enter") {
        navigate("/receipt", { state: { form } });
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [form, navigate]);

  return (
    <div style={{ textAlign: "center" }}>
      <img style={{ width: "500px",height:"auto" }} src={card_mg} alt="카드 리더기" />
    </div>
  );
}

export default PayPage;