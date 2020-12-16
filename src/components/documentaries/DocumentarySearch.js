import React, { useContext } from "react"
import { DocumentaryContext } from "./DocumentaryProvider"

export const DocumentarySearch = () => {
    const { searchDocumentary, setFilteredDocs } = useContext(DocumentaryContext)

return (
    <>
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
    </>
)
}