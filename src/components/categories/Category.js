import React from "react"

// component responsible for rendering a single category

export const Category = ({ category }) => (
    <section className="category">
        <div className="category__name">#{category.name}</div>
    </section>
)