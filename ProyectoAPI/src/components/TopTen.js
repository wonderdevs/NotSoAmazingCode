import { useEffect, useState } from "react"
import { Link } from "react-router-dom";

export default function TopTen({term, order}) {
    const [topTen, setTopTen] = useState([]);

    useEffect(() => {
        let orderTerm = (order === 'desc')? '-' : '';

        fetch(`https://api.open5e.com/v1/monsters/?ordering=${orderTerm}${term}&limit=10`)
            .then(response => { return response.json() })
            .then((results) => {
                setTopTen(results.results)
            })
      }, [term, order, setTopTen]);

    return (
        <div>
            <h3>Top 10: {term}</h3>
            <hr/>
            <ul>
                {topTen.map(monster => 
                    <li key={monster.slug}><Link to={'/detail/'+monster.slug}>{monster.name}</Link></li>
                )}
            </ul>
        </div>
    )
}