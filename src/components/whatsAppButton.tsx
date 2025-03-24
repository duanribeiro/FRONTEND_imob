import React from "react";
import WhatsAppLogo from "./../../public/assets/whastapp-logo.png";
import Image from "next/image";

export function WhatsAppButton() {
  const handleClick = () => {
    const url = `https://chat.whatsapp.com/F90jVGBKjL22hFiqOD29iM`;
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
      <Image src={WhatsAppLogo} alt="WhatsApp" width={35} height={35} />
    </button>
  );
}
