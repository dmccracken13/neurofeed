import React from "react";
import { useForm } from "react-hook-form";

export const DocumentaryForm = () => {
    const { register, handleSubmit, watch, errors } = useForm();
    const onSubmit = data => console.log(data);
  
    console.log(watch("example")); // watch input value by passing the name of it
  
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
                    <option value="">Select...</option>
                    <option value="wantToWatch">Want To Watch</option>
                    <option value="watching">Watching</option>
                    <option value="watched">Watched</option>
                </select>

                <label>Choose your rating</label>
                <select name="docForm_list" ref={register({ required: true })}>
                    <option value="">Select...</option>
                    <option value="oneStar">1 Star</option>
                    <option value="twoStars">2 Stars</option>
                    <option value="threeStars">3 Stars</option>
                </select>


                <input name="docForm_review" defaultValue="" ref={register} />
                <input type="submit" />
            </form>
        </>
    );
}