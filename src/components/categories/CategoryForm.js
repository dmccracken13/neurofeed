import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { CategoryContext } from "./CategoryProvider"

export const CategoryForm = (props) => {
    const { register, handleSubmit } = useForm();
    const { addCategory } = useContext(CategoryContext)
    
    
    const onSubmit = (data) => {
        const newCatObj = {
            userId: parseInt(localStorage.getItem("app_user_id")),
            name: data.category
        }
        addCategory(newCatObj)
    }

    return(
        <form className="category_form" onSubmit={handleSubmit(onSubmit)}>
            <label>Add new cateogries</label>
            <input name="category" type="text" defaultValue="" ref={register} />
            <button type="submit">Submit</button>
        </form>
    )

}