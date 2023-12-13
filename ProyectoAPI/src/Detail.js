import { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import './Detail.css';
import { MonsterContext } from "./App";
import placeholder from "./comingSoon.jpg";

export default function Detail() {
    const {detailId} = useParams();
    const {setLoading} = useContext(MonsterContext);
    const [details, setDetails] = useState();

    useEffect(() => {
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
        <>
        {details &&
            <div className="details">
                
                <Link to="/"><h2><svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-arrow-left" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M5 12l14 0" /><path d="M5 12l6 6" /><path d="M5 12l6 -6" /></svg>Back</h2></Link>
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