import React, { useState, useContext, useEffect } from "react"
import { CategoryContext } from "../categories/CategoryProvider"
import { Category } from "./Category"

export const CategoryList = ({  }) => {
    const { categories, getCategories } = useContext(CategoryContext)
    const userId =  parseInt(localStorage.getItem("app_user_id"))
    // console.log(userId)
    useEffect(()=>{
        getCategories()
    }, [])

    return (
        <>
            <h1>Categories</h1>

            <div className="categories">
                {categories
                .filter(c => c.userId === userId)
                .map(category => {
                        return <Category key={category.id} 
                        category={category} 
                    
                        />
                })
                }
            </div>
        </>
    )
}