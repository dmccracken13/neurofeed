import React, { useState } from "react"

/*
    The context is imported and used by individual components
    that need data
*/
export const CategoryContext = React.createContext()

/*
 This component establishes what data can be used.
 */
export const CategoryProvider = (props) => {
    const [categories, setCategories] = useState([])

    const getCategories = () => {
        return fetch("http://localhost:8088/categories")
            .then(res => res.json())
            .then(setCategories)
    }

    const addCategory = category => {
        return fetch("http://localhost:8088/categories", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(category)
        })
            .then(getCategories)
    }

    /*
        You return a context provider which has the
        `categories` state, the `addcategories` function,
        and the `getCategory` function as keys. This
        allows any child elements to access them.
    */
    return (
        <CategoryContext.Provider value={{
            categories, addCategory, getCategories
        }}>
            {props.children}
        </CategoryContext.Provider>
    )
}