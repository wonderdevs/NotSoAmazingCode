import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import './Game.css';

const gameDetailApiUrl = `https://api.rawg.io/api/games/[GAMEID]?key=e6b23a2e2bce45a0b66b109bf056dc04`;

export default function Game() {
    const {gameId} = useParams();
    const [details, setDetails] = useState();

    useEffect(() => {
        
        fetch(gameDetailApiUrl.replace('[GAMEID]', gameId))
        .then(response => response.json())
        .then(data => {
            console.log(data);
            data.description = { __html: data.description };
            setDetails(data);
        })
    }, [gameId])

    return (
        <>
        {details &&
            <div className="details">
                <div className="cover-image">
                    <img src={details.background_image} alt="background" />
                    <h1>{details.name}</h1>
                </div>
                <div>
                    <div dangerouslySetInnerHTML={details.description}></div>
                    <div>
                        <h4>Details</h4>
                        <div>Achievements: {details.achievements_count}</div>
                        <div>Developers: {details.developers.map((developer) => (
                                <>{developer.name}, </>
                        ))}</div>
                        <div>Publishers: {details.publishers.map((publisher) => (
                                <>{publisher.name}, </>
                        ))}</div>
                        <div>Rating: {details.esrb_rating.name}</div>
                        <ul>
                        {details.ratings.map(rating => (
                            <li><small>{rating.title} ({rating.count})</small></li>
                        ))}
                        </ul>
                    </div>
                </div>
                <p>Metacritic: {details.metacritic}</p>
            </div>
        }
        </>
    )
}