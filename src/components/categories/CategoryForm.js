import React, { useState, useContext, useEffect } from "react";
import { useForm } from "react-hook-form";
import { CategoryContext } from "./CategoryProvider"
import { CategoryList } from "./CategoryList"

export const CategoryForm = (props) => {
    const { register, handleSubmit } = useForm();
    const { categories, getCategories } = useContext(CategoryContext)
    const [categories, setCategories] = useState([])

    
    const { categories, addCategory, getCategories } = useContext(CategoryContext)
    const newCategories = []
    const category = data.category
    console.log(category)
    
    const onSubmit = (newCategory) => {
        newCategories.map(addCategory(newCategory))
    }

    useEffect(()=>{
        getCategories()
    },  [])

    // useEffect(()=>{
    //     // addCategory()
    // }, [])

    return(
        <form className="category_form" onSubmit={handleSubmit(onSubmit)}>
            <label>Add new cateogries</label>
            <input name="category" type="text" defaultValue="" ref={register} />
            <button type="button"className="addCat_button" 
                onClick={
                    () => {
                    newCategories.push(category)  
                    }
                }>
                Add Cat
            </button>

            <label>Current categories</label>
            <div>{categories.map(cat => {
                const catName=cat.name
                return <div>{catName}</div>
            })
            }
            </div>
        </form>
    )

}