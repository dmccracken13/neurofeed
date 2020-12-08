import React, { useState, useContext, useEffect } from "react"
import { DocumentaryContext } from "./DocumentaryProvider"
import { Documentary } from "./Documentary"

export const DocumentaryList = ({ props }) => {
    const { documentaries, getDocumentaries } = useContext(DocumentaryContext)

    useEffect(()=>{
        getDocumentaries()
    }, [])

    return (
        <>
            <h1>Documentaries</h1>

            <div className="animals">
                {
                    documentaries.map(documentary => {
                        return <Documentary key={documentary.id} documentary={documentary} />
                    })
                }
            </div>
        </>
    )
}