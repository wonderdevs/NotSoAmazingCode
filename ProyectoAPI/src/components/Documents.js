import React, {useContext, useEffect, useState} from 'react';
import { MonsterContext } from '../App';

export default function Documents() {
    //This is the Documents component. It is used to display the documents used from the API.
    const {setLoading} = useContext(MonsterContext);
    const [documents, setDocuments] = useState(null);

    useEffect(() => {
        // This function is used to fetch the documents from the API.
        setLoading(true);
        fetch('https://api.open5e.com/v1/documents/')
            .then(response => { return response.json() })
            .then(setDocuments)
            .finally(() => {
                setLoading(false)
            })
      }, [setLoading])
    return (
        // This returns the documents from the API with their title, organization, author, and url.
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