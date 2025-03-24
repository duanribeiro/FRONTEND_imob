import React from "react";
import StripeLogo from "./../../public/assets/subscription.png";
import Image from "next/image";

export function StripeButton() {
  const handleClick = () => {
    const url = `https://billing.stripe.com/p/login/00g3dIfygdHv2bubII`;
    window.open(url, "_blank");
  };

  return (
    <button
      onClick={handleClick}
      style={{
        background: "none",
        border: "none",
        padding: 0,
        cursor: "pointer",
        transition: "transform 0.2s ease",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "scale(1.1)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "scale(1)";
      }}
    >
      <Image src={StripeLogo} alt="Stripe" width={30} height={30} />
    </button>
  );
}
