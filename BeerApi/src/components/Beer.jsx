import "./Beer.css";
export default function Beer({ beers }) {
  return (
    <ul className="beer-list">
      {beers &&
        beers.map((beer) => (
          <li className="beer">
            <section key={beer.id}>
              <header>
                <img
                  className="beer-picture"
                  src={beer.image_url}
                  alt={`This is a picture of ${beer.name}`}
                />
                <h2 className="beer-name">
                  {beer.name} {beer.tagline}
                </h2>
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
  );
}