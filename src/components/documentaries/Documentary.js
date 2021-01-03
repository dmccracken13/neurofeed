import React, { useContext } from "react"
import { DocumentaryContext } from "./DocumentaryProvider"
import "./Documentary.css"

// component responsible for rendering a single documentary representation or "card"
export const Documentary = ({ documentary, docCats, watchStatus, user, props }) => {
    const { removeDocumentary } = useContext(DocumentaryContext)


    return(
        <div className="card text-light border-light" style={{ width: '18rem' }}>
                <h4 className="card-header">Watcher: {user.name}</h4>
                {documentary.poster === `https://image.tmdb.org/t/p/w500null` ? "No Poster Available" : <img className="card-img-top" src={documentary.poster} style={{ width: '18rem', height: '24rem' }} alt="Poster"></img>}
                <div className="card-body">
                    <ul className="list-group-flush">
                        <h3 className="card-title">{documentary.title}</h3>
                        <li className="list-group-item text-white">Synopsis: {documentary.synapsis}</li>
                        <li className="list-group-item text-white">Watch Status: {watchStatus.name}</li>
                        {documentary.rating === "" ? "" : <li className="list-group-item text-white">Rating: {documentary.rating}</li>}
                        <li className="list-group-item text-white">Categories: #{docCats.map(dc => dc.category.name) }</li>
                        {documentary.review === "" ? "" :<li className="list-group-item text-white">Review: {documentary.review}</li>}
                    </ul>
                </div>  
                <button className="btn btn-secondary" onClick={() => {
                    props.history.push(`/documentaries/edit/${documentary.id}`)
                }}>Update
                </button>
                <button type="button"className="btn btn-danger" id={documentary.id}
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
        </div>
)}