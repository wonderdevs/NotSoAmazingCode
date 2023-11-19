import { useParams } from "react-router-dom";

export default function Game() {
    const {gameId} = useParams();
    return (
        <>GAME {gameId}</>
    )
}