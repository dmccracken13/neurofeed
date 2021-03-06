import React, { useContext, useEffect } from "react"
import { Link } from "react-router-dom"
import { DocumentaryContext } from "./DocumentaryProvider"
import { Documentary } from "./Documentary"
import { WatchStatusContext } from "../watchStatuses/WatchStatusProvider"
import { DocCategoryContext } from "../docCategories/DocCategoryProvider"
import { FriendContext } from "../friends/FriendProvider"
import "./Documentary.css"

// function responsible for rendering lists of ducmentaries to the dom

export const DocumentaryList = ( props ) => {
// declaration of variables that will be used, the coresponding functions that set them, and the contexts that
// they were assigned to in their providers

    const { documentaries, getDocumentaries } = useContext(DocumentaryContext)
    const { watchStatuses, getWatchStatuses } = useContext(WatchStatusContext)
    const { docCategories, getDocCategories } = useContext(DocCategoryContext)
    const { users, getUsers } = useContext(FriendContext)

    // Create a variable to hold the value of the current logged in user 
    const userId =  parseInt(localStorage.getItem("app_user_id"))
// React hook used to invoke functions to get the data that will be used 

    useEffect(()=>{
        getWatchStatuses()
        .then(getDocCategories)
        .then(getUsers)
        .then(getDocumentaries)
    }, [])

    return (
        <>
            <div className="container-fluid">   
                <h1 className="text-center">Watch Lists</h1>
                        <Link className="d-flex justify-content-center"to={`/form`}>Add Documentary</Link>
                <div className="row align-items-start d-flex justify-content-center">
                    <div className="col">
                        <h2>Want To Watch</h2>
                        {documentaries       // array of documentaries set by the getDocumentaries function 
                            .filter(d => d.watchStatusId === 1) 
                            .filter(d => d.userId === userId)
                            // here we are filtering the documentary array by the watch status id of 1
                            .map(documentary => {
                            const docCat = docCategories.find(dc => dc.documentaryId === documentary.id)
                            const watchStat = watchStatuses.find(w => w.id === documentary.watchStatusId)
                            const user = users.find(u => u.id === userId)
                                return <Documentary key={documentary.id} 
                                documentary={documentary} 
                                docCat={docCat}
                                watchStatus={watchStat}
                                props={props}
                                user={user}
                                />
                            }) 
                        }
                    </div>
                    <div className="col">
                        <h2>Watched</h2>
                        {documentaries
                            .filter(d => d.watchStatusId === 3)
                            .filter(d => d.userId === userId)
                            .map(documentary => {
                                const docCat = docCategories.find(dc => dc.documentaryId === documentary.id)
                                const watchStat = watchStatuses.find(w => w.id === documentary.watchStatusId)
                                const user = users.find(u => u.id === userId)
                                return<Documentary key={documentary.id} 
                                documentary={documentary} 
                                docCat={docCat}
                                watchStatus={watchStat}
                                props={props}
                                user={user}
                                />
                            })
                        }
                    </div>
                </div>
            </div>
        </>
    )
}