import React from "react"

// component responsible for rendering a single documentary representation or "card"

export const Documentary = ({ documentary }) => (
    <section className="documentary">
        <div className="documentary__user">User Name</div>
        <div className="documentary__name">Doc Title{documentary.name}</div>
        <div className="documentary__poster">Poster</div>
        <div className="documentary__status">Watch Status</div>
        <button>
                Update
        </button>
        <div className="documentary__rating">Rating{documentary.name}</div>
        <div className="documentary__categories"></div>
        <div className="documentary__review"></div>
    </section>
)