import React, { useState, useContext, useEffect } from "react";
import { useForm } from "react-hook-form";
import { CategoryContext } from "../categories/CategoryProvider"
import { WatchStatusContext } from "../watchStatuses/WatchStatusProvider"
import { DocumentaryContext } from "./DocumentaryProvider"

export const DocumentaryForm = () => {
    const { register, handleSubmit, watch, errors } = useForm();

    // include functionality to post other data points that arent in register 
// need to add synapsis and poster, asthey are not include in form 
    

        const onSubmit = (data) => {
        // create a new documentary object and a docCat object using data
    
        const foundDoc = filteredDocs.find(doc => doc.title === data.title)
        data.poster = `https://image.tmdb.org/t/p/w500${foundDoc.poster_path}`
        data.synapsis = foundDoc.overview
        data.watchStatusId = parseInt(data.watchStatusId)
        const newDataObj = data 


        addDocumentary(newDataObj)
        
        // then I need to post the selected category to the local api at the join table of docCats

    }

    const { categories, getCategories } = useContext(CategoryContext)
    const { watchStatuses, getWatchStatuses } = useContext(WatchStatusContext)
    const { addDocumentary, filteredDocs} = useContext(DocumentaryContext)

    const ratingsArray = ["1 Star", "2 Stars", "3 Stars", "3 Stars", "4 Stars", "5 Stars"]

// react hook responsible for envoking provider functions to get data to be used on the form
    useEffect(()=>{
        getWatchStatuses()
        .then(getCategories)
    }, [])
    // console.log(filteredDocs)

    return (
        <>
            <form className="documentary_form" onSubmit={handleSubmit(onSubmit)}>
            {/* register your input into the hook by invoking the "register" function */}
                <label>Select a documentary</label>
                <select name="title" ref={register({ required: true })}>
                    <option value="0">Select...</option>
                    {filteredDocs.map(st => (
                            <option key={st.id} value={st.title}>
                                {st.title}
                            </option>
                        ))}
                </select>

                {/* <input type="text" name="synapsis"  value={st.overview} /> */}
                
                <label>Choose a watch list</label>
                <select name="watchStatusId" ref={register({ required: true })}>
                    <option value="0">Select...</option>
                    {watchStatuses.map(ws => (
                            <option key={ws.id} value={ws.id}>
                                {ws.name}
                            </option>
                        ))}
                </select>

                <label>Choose your rating</label>
                <select name="rating" ref={register({ required: true })}>
                        <option value="">Select...</option>
                        {ratingsArray.map((rating, i) => (
                            <option key={i} value={i}>
                                {rating}
                            </option>
                        ))}
                </select>

                
                <label>Write a review</label>
                <input name="review" defaultValue="" ref={register} />
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