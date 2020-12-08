import React from "react"

// component responsible for rendering a single documentary representation or "card"

export const Documentary = ({ documentary, category, watchStatus }) => (
    <section className="documentary">
        <div className="documentary__user">User Name</div>
        <div className="documentary__name">Doc Title{documentary.name}</div>
        <div className="documentary__poster">Poster</div>
        <div className="documentary__status">Watch Status: {watchStatus.name}</div>
        <button>
                Update
        </button>
        <div className="documentary__rating">Rating: {documentary.rating}</div>
        <div className="documentary__categories">Categories: {category.name}</div>
        <div className="documentary__review">Review</div>
    </section>
)