import React, { useState } from "react";
import "./Beer.css";
import IngredientsModal from "./IngredientsModal";

export default function Beer({ beers }) {
  const [selectedBeer, setSelectedBeer] = useState(null);

  const handleBeerClick = (beer) => {
    setSelectedBeer(beer);
  };

  const handleCloseModal = () => {
    setSelectedBeer(null);
  };

  return (
    <>
      <ul className="beer-list">
        {beers &&
          beers.map((beer) => (
            <li
              className="beer"
              key={beer.id}
              onClick={() => handleBeerClick(beer)}
            >
              <section>
                <header>
                  <img
                    className="beer-picture"
                    src={beer.image_url}
                    alt={`This is a picture of ${beer.name}`}
                  />
                  <h2 className="beer-name">{`${beer.name}: ${beer.tagline}`}</h2>
                </header>
                <section>
                  <address className="beer-data">
                    <div className="beer-brewDate">{beer.first_brewed}</div>
                    <div className="beer-description">{beer.description}</div>
                    <div className="beer-ph">{beer.ph}</div>
                  </address>
                </section>
              </section>
            </li>
          ))}
      </ul>
      <IngredientsModal beer={selectedBeer} onClose={handleCloseModal} />
    </>
  );
}
