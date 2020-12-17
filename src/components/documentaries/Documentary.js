import React, { useContext } from "react"
import { DocumentaryContext } from "./DocumentaryProvider"

// component responsible for rendering a single documentary representation or "card"
export const Documentary = ({ documentary, docCats, watchStatus, user, props }) => {
    const { removeDocumentary } = useContext(DocumentaryContext)


    return(
        <section className="documentary">
            <div className="documentary__user">Watcher: {user.name}</div>
            <div className="documentary__name">Title: {documentary.title}</div>
            <img src={documentary.poster} alt="Poster"></img>
            <div className="documentary__status">Watch Status: {watchStatus.name}</div>
            <button onClick={() => {
                props.history.push(`/documentaries/edit/${documentary.id}`)
            }}>Update
            </button>
            <div className="documentary__synapsis">Synapsis: {documentary.synapsis}</div>
            <div className="documentary__rating">Rating: {documentary.rating}</div>
            <div className="documentary__categories">Categories: { docCats.map(dc => dc.category.name) }</div>
            <div className="documentary__review">Review: {documentary.review}</div>
            <button type="button"className="remove_button" id={documentary.id}
                onClick={
                    () => {
                    removeDocumentary(+documentary.id)  
                                    .then(() => {
                                    props.history.push("/")
                                    })
                    }
                }>
                Remove
            </button>                        
        </section>
)}