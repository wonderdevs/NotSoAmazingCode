//This component is used to display detailed information about a specific monster.
import { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import './Detail.css';
import { MonsterContext } from "./App";
import placeholder from "./comingSoon.jpg";

export default function Detail() {
    //The Detail function component uses the useParams hook to get the detailId from the route parameters. It uses the useContext hook to access the setLoading function from the MonsterContext. It also uses the useState hook to create a state variable details for storing the monster details.
    const {detailId} = useParams();
    const {setLoading} = useContext(MonsterContext);
    const [details, setDetails] = useState();

    useEffect(() => {
        //The useEffect hook is used to fetch the monster details from an API when the component mounts or when the detailId changes. The setLoading function is called to display the loading spinner while the API request is being processed.
        setLoading(true);
        fetch(`https://api.open5e.com/v1/monsters/?slug=${detailId}`)
            .then(response => response.json())
            .then(data => {
                setDetails(data.results[0]);
            })
            .finally(() => {
                setLoading(false)
            })
    }, [detailId, setLoading])

    return (
        //This return checks if details is truthy and if so, it renders a div with the class "details". This div includes a link to go back, a heading with the monster's name, and several divs displaying the monster's alignment, actions, environments, and an image. The actions and environments are mapped to create multiple elements. If the monster does not have a main image, the placeholder image is used.
        <>
        {details &&
            <div className="details">
                <Link to="/" className="navbackHeader"><h2><svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-arrow-left" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M5 12l14 0" /><path d="M5 12l6 6" /><path d="M5 12l6 -6" /></svg>Back</h2></Link>
                <h1>{details.name}</h1>
                <div>
                    <div>
                        <div>Alignment: {details.alignment}</div>
                        <h3>Actions</h3>
                        <div>
                            {details.actions.map((action) => (
                                <p>
                                    <b>{action.name}</b>: <i>{action.desc}</i>
                                </p>
                            ))}
                        </div>
                        <h3>Environments</h3>
                        <ul>
                        {details.environments.map(env => (
                            <li key={env}><small>{env}</small></li>
                        ))}
                        </ul>
                        <div>
                            <img src={details.img_main || placeholder} alt="cover" width={'100%'} />
                        </div>
                    </div>
                </div>
            </div>
        }
        </>
    )
}