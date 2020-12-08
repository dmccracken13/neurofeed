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

    return (
        <>
            <h1>Watched</h1>

            <div className="documentaries">
                {documentaries.map(documentary => {
                    const matchedDocCat = docCategories.map(dc => dc.documentaryId === documentary.id)
                    console.log(matchedDocCat)
                    debugger 
                    const cat = categories.map(c => c.id === matchedDocCat.categoryId)
                    const watchStat = watchStatuses.find(w => w.id === documentary.watchStatusId)

                        return <Documentary key={documentary.id} 
                        documentary={documentary} 
                        category={cat}
                        watchStatus={watchStat}
                        />
                })
                }
            </div>
        </>
    )
}