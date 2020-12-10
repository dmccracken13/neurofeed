import React, { useState, useContext, useEffect } from "react";
import { useForm } from "react-hook-form";
import { CategoryContext } from "../categories/CategoryProvider"
import { WatchStatusContext } from "../watchStatuses/WatchStatusProvider"

export const DocumentaryForm = () => {
    const { register, handleSubmit, watch, errors } = useForm();
    const onSubmit = data => console.log(data);

    const { categories, getCategories } = useContext(CategoryContext)
    const { watchStatuses, getWatchStatuses } = useContext(WatchStatusContext)
  
    useEffect(()=>{
        getWatchStatuses()
        .then(getCategories)
    }, [])
  
    return (
        <>
            {/* "handleSubmit" will validate your inputs before invoking "onSubmit" */}
            <form className="documentary_form" onSubmit={handleSubmit(onSubmit)}>
            {/* register your input into the hook by invoking the "register" function */}
                <label>Search for a documentary</label>
                <input name="docForm_search" defaultValue="" ref={register} />
                {/* include validation with required or other standard HTML validation rules */}
                <label>Select from results</label>
                <select name="docForm_results" ref={register({ required: true })}>
                    <option value="">Select...</option>
                    <option value="test">Test</option>
                </select>
                
                <label>Choose a watch list</label>
                <select name="docForm_list" ref={register({ required: true })}>
                    <option value="0">Select...</option>
                    {watchStatuses.map(ws => (
                            <option key={ws.id} value={ws.id}>
                                {ws.name}
                            </option>
                        ))}
                </select>

                <label>Choose your rating</label>
                <select name="docForm_list" ref={register({ required: true })}>
                    <option value="">Select...</option>
                    <option value="oneStar">1 Star</option>
                    <option value="twoStars">2 Stars</option>
                    <option value="threeStars">3 Stars</option>
                    <option value="threeStars">4 Stars</option>
                    <option value="threeStars">5 Stars</option>
                </select>

                
                <label>Write a review</label>
                <input name="docForm_review" defaultValue="" ref={register} />
                <input type="submit" />

                <label>Choose your categories</label>
                <select name="docForm_categories" ref={register({ required: true })}>
                    <option value="0">Select...</option>
                    {categories.map(c => (
                            <option key={c.id} value={c.id}>
                                {c.name}
                            </option>
                        ))}
                </select>


            </form>
        </>
    );
}