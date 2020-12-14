import React from "react"

// component responsible for rendering a single documentary representation or "card"

export const Documentary = ({ documentary, docCats, watchStatus }) => (
    <section className="documentary">
        <div className="documentary__user">User Name</div>
        <div className="documentary__name">Title: {documentary.title}</div>
        <div className="documentary__poster">Poster</div>
        <div className="documentary__status">Watch Status: {watchStatus.name}</div>
        <button>
                Update
        </button>
        <div className="documentary__synapsis">Synapsis: {documentary.synapsis}</div>
        <div className="documentary__rating">Rating: {documentary.rating} stars</div>
        <div className="documentary__categories">Categories: { docCats.map(dc => dc.category.name) }</div>
        <div className="documentary__review">Review: {documentary.review}</div>
    </section>
)