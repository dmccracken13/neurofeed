import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { CategoryContext } from "./CategoryProvider"
import "./Category.css"

export const CategoryForm = (props) => {
    const { register, handleSubmit, reset } = useForm();
    const { addCategory } = useContext(CategoryContext)
    
    
    const onSubmit = (data) => {
        if (data) {
        const newCatObj = {
            userId: parseInt(localStorage.getItem("app_user_id")),
            name: data.category
        }
        addCategory(newCatObj)
        }
        reset("")
    }

    return(
        <form className="category_form" onSubmit={handleSubmit(onSubmit)}>
            <div className="column">
                <h5>Add new cateogries </h5>
                <input name="category" type="text" defaultValue="" ref={register({ required: true })} />
                <button className="btn btn-dark" type="submit">Submit</button>
            </div>
        </form>
    )

}