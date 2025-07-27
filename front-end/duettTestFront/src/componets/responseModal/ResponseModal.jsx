import React from "react";
import "./responseModal.css";

export default function ResponseModal({ responseMsg, status }) {
  function checkStatus() {
    switch (status) {
      case "200":
        return "pass";
      case "400":
        return "erro";
      default:
        return "neutral";
    }
  }
  return (
    <div className={`${200 == status ? "pass" : "erro"} modal`}>
      <h2>{responseMsg}</h2>
      <span></span>
    </div>
  );
}
