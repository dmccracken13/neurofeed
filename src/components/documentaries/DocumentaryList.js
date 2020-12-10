import React, { useState, useContext, useEffect } from "react"
import { DocumentaryContext } from "./DocumentaryProvider"
import { Documentary } from "./Documentary"
import { CategoryContext } from "../categories/CategoryProvider"
import { WatchStatusContext } from "../watchStatuses/WatchStatusProvider"
import { DocCategoryContext } from "../docCategories/DocCategoryProvider"

// function responsible for rendering lists of ducmentaries to the dom

export const DocumentaryList = ({ props }) => {
// declaration of variables that will be used, the coresponding functions that set them, and the contexts that
// they were assigned to in their providers

    const { documentaries, getDocumentaries } = useContext(DocumentaryContext)
    const { categories, getCategories } = useContext(CategoryContext)
    const { watchStatuses, getWatchStatuses } = useContext(WatchStatusContext)
    const { docCategories, getDocCategories } = useContext(DocCategoryContext)

// React hook used to invoke functions to get the data that will be used 

    useEffect(()=>{
        getWatchStatuses()
        .then(getCategories)
        .then(getDocCategories)
        .then(getDocumentaries)
    }, [])
    // console.log(docCategories)
    return (
        <>
            <h1>Watch Lists</h1>
            <div className="documentaries">
                <h2>Want To Watch</h2>
                <div className="documentaries_wantToWatch">
                    {documentaries       // array of documentaries set by the getDocumentaries function 
                    .filter(d => d.watchStatusId === 1)     // here we are filtering the documentary array by the watch status id of 1
                    .map(documentary => {
                        const filteredDocCats = docCategories.filter(dc => dc.documentaryId === documentary.id)
                        // console.log(filteredDocCats)
                        const watchStat = watchStatuses.find(w => w.id === documentary.watchStatusId)

                            return <Documentary key={documentary.id} 
                            documentary={documentary} 
                            docCats={filteredDocCats}
                            watchStatus={watchStat}
                            />
                    })
                    }
                </div>
                <h2>Watched</h2>
                <div className="documentaries_watched">
                    {documentaries
                        .filter(d => d.watchStatusId === 3)
                        .map(documentary => {
                            const filteredDocCats = docCategories.filter(dc => dc.documentaryId === documentary.id)
                            // console.log(filteredDocCats)
                            const watchStat = watchStatuses.find(w => w.id === documentary.watchStatusId)

                                return <Documentary key={documentary.id} 
                                documentary={documentary} 
                                docCats={filteredDocCats}
                                watchStatus={watchStat}
                                />
                        })
                        }
                </div>
            </div>
        </>
    )
}