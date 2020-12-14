import React, { useState } from "react"
import apiObject from "/home/dmccracken13/workspace/neurofeed/src/Settings.js"

/*Funtion defining the context in which the provider funtions will be used*/

export const DocumentaryContext = React.createContext()

// provider function that is exported and can be used in other modules 
// containing other funtions that perform state transitions to ensure the application stays in sync 

export const DocumentaryProvider = (props) => {
// declaration of the state variable for the useState hook. 
// useState will return the value of the state and a function that updates it
    
    const [documentaries, setDocumentaries] = useState([])
    const [filteredDocs, setFilteredDocs] = useState([])
    // const [docsById, setDocsById] = useState([])

    const [ searchTerms, setTerms ] = useState("")

// function responsible for getting documentaries from the local API, then updates the value 
// of the 'documentaries' variable with the reponse results by calling setDocumentaries 

    const getDocumentaries = () => {
        return fetch("http://localhost:8088/documentaries")
            .then(res => res.json())
            .then(setDocumentaries)
    }

// function responsible for adding a new documentary to the local API using the 'POST' method, 
// then invokes the getDocumentaries function to return the array of documentaries, including the newly added one 

    const addDocumentary = documentary => {
        return fetch("http://localhost:8088/documentaries", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(documentary)
        })
            .then(response => response.json())
            .then((newDocObj) => {
                getDocumentaries()
                return newDocObj
            })
    }

// function to search the tmdb API for a specific documentary, then store within the provider what the user 
// types into the search field 

    const searchDocumentary = (searchDoc) => { 
        return fetch(`https://api.themoviedb.org/3/search/movie?api_key=${apiObject.tmdbKey}&language=en-US&query=${searchDoc}`)
            .then(response => response.json())
            .then((parsedResponse) => {
            setFilteredDocs(parsedResponse.results )
        })
    }

// Return the context for usage, defining what this component will expose to other components 

    return (
        <DocumentaryContext.Provider value={{
            documentaries, addDocumentary, getDocumentaries, searchDocumentary, 
            searchTerms, setTerms, filteredDocs, setFilteredDocs
        }}>
            {props.children}
        </DocumentaryContext.Provider>
    )
}