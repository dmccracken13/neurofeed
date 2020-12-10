import React, { useContext } from "react"
import { DocumentaryContext } from "./DocumentaryProvider"

export const DocumentarySearch = (props) => {
    const { searchDocumentary } = useContext(DocumentaryContext)

    return (
        <>
            Search for a documentary:
            <input type="text"
                className="input--wide"
                onKeyUp={
                    (keyEvent) => searchDocumentary(keyEvent.target.value)
                }
                placeholder="Search for a documentary... " />
        </>
    )
}

// const searchDocumentary = (searchDoc) => { 
//     return fetch(`https://api.themoviedb.org/3/search/movie?api_key=${apiObject.tmdbKey}&language=en-US&query=${searchDoc}`)
//         .then(response => response.json())
//         .then(setTerms)
// }