import React, { useContext, useEffect } from "react"
import { CategoryContext } from "../categories/CategoryProvider"
import { Category } from "./Category"
import { CategoryForm } from "./CategoryForm"
import "./Category.css"

export const CategoryList = () => {
    const { categories, getCategories } = useContext(CategoryContext)
    const userId =  parseInt(localStorage.getItem("app_user_id"))
    // console.log(userId)
    useEffect(()=>{
        getCategories()
    }, [])

    return (
        <>
            <div className="column">
            <h1>Categories</h1>
                <CategoryForm  />
                <div className="column">
                    {categories
                    .filter(c => c.userId === userId)
                    .map(category => {
                            return <Category key={category.id} 
                            category={category} 
                        
                            />
                    })
                    }
                </div>
            </div>
        </>
    )
}