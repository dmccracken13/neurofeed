import React, { useState, useContext, useEffect } from "react"
import { DocumentaryContext } from "./DocumentaryProvider"
import { Documentary } from "./Documentary"
import { CategoryContext } from "../categories/CategoryProvider"
import { WatchStatusContext } from "../watchStatuses/WatchStatusProvider"
import { DocCategoryContext } from "../docCategories/DocCategoryProvider"

export const DocumentaryList = ({ props }) => {
    const { documentaries, getDocumentaries } = useContext(DocumentaryContext)
    const { categories, getCategories } = useContext(CategoryContext)
    const { watchStatuses, getWatchStatuses } = useContext(WatchStatusContext)
    const { docCategories, getDocCategories } = useContext(DocCategoryContext)

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
                    {documentaries
                    .filter(d => d.watchStatusId === 1)
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