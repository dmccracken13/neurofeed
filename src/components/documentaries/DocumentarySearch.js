import React, { useContext } from "react"
import { DocumentaryContext } from "./DocumentaryProvider"

export const DocumentarySearch = () => {
    const { searchDocumentary } = useContext(DocumentaryContext)

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
                } else {keyEvent.target.value = ""
            }
            }}
            placeholder="Search for a documentary... " />
    </>
)
}