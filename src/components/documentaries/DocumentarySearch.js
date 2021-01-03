import React, { useContext } from "react"
import { DocumentaryContext } from "./DocumentaryProvider"
import "./Documentary.css"

export const DocumentarySearch = () => {
    const { searchDocumentary, setFilteredDocs } = useContext(DocumentaryContext)

return (
    <>
        <div className="docSearch">
            Search for a documentary:
            <input type="text"
                className="input--wide"
                onKeyUp={
                    (keyEvent) => {
                    if(keyEvent.target.value !== "") { 
                        searchDocumentary(keyEvent.target.value)
                        // console.log(keyEvent.target.value)
                    } else {setFilteredDocs([]) // Research more- Ideally have call back function injected into component 
                }
                }}
                placeholder="Search for a documentary... " />
        </div>
    </>
)
}