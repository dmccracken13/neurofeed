import React, { useState } from "react"

/*
    The context is imported and used by individual components
    that need data
*/
export const DocCategoryContext = React.createContext()

/*
 This component establishes what data can be used.
 */
export const DocCategoryProvider = (props) => {
    const [docCategories, setDocCategories] = useState([])

    const getDocCategories = () => {
        return fetch("http://localhost:8088/docCategories?_expand=category")
            .then(res => res.json())
            .then(setDocCategories)
    }

    const addDocCategory = docCategory => {
        return fetch("http://localhost:8088/docCategories", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(docCategory)
        })
            .then(getDocCategories)
    }

    /*
        You return a context provider which has the
        `categories` state, the `addDocCategories` function,
        and the `getDocCategory` function as keys. This
        allows any child elements to access them.
    */
    return (
        <DocCategoryContext.Provider value={{
            docCategories, addDocCategory, getDocCategories
        }}>
            {props.children}
        </DocCategoryContext.Provider>
    )
}