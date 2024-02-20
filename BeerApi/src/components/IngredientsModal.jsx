import React from "react";
import "./Ingredients.css";

const IngredientsModal = ({ beer, onClose }) => {
  if (!beer) return null;

  return (
    <div className="modal-backdrop">
      <div className="modal">
        <h2>{beer.name} Ingredients</h2>
        <ul className="modal-ul">
          Malt:
          <li>{beer.ingredients.malt.map((malt) => malt.name).join(", ")}</li>
          Hops:
          <li>{beer.ingredients.hops.map((hop) => hop.name).join(", ")}</li>
          Yeast:
          <li>{beer.ingredients.yeast}</li>
        </ul>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default IngredientsModal;
