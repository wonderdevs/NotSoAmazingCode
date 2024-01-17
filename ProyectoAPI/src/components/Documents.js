import React, {useContext, useEffect, useState} from 'react';
import { MonsterContext } from '../App';

export default function Documents() {
    const {setLoading} = useContext(MonsterContext);
    const [documents, setDocuments] = useState(null);

    useEffect(() => {
        //The useEffect hook is used to fetch the list of monsters from an API when the component mounts.
        setLoading(true);
        fetch('https://api.open5e.com/v1/documents/')
            .then(response => { return response.json() })
            .then(setDocuments)
            .finally(() => {
                setLoading(false)
            })
      }, [setLoading])
    return (
        <>
            <h1>Documents</h1>
            {documents && documents.results.map(document => 
                <div key={document.slug}>
                    <p>______________________</p>
                    <h2>Title: {document.title}</h2>
                    <p>Organization: {document.organization}</p>
                    <p>Author: {document.author}</p>
                    <p>URL: {document.url}</p>   
                </div>
            )}
        </>
    )
}