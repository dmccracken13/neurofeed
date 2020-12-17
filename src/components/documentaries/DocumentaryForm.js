import React, { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom"
import { CategoryContext } from "../categories/CategoryProvider"
import { WatchStatusContext } from "../watchStatuses/WatchStatusProvider"
import { DocumentaryContext } from "./DocumentaryProvider"
import { DocCategoryContext } from "../docCategories/DocCategoryProvider"

export const DocumentaryForm = (props) => {
    const { register, handleSubmit } = useForm();

    // all the arrays and functions that get, set, and add them are declared for the contexts they will be used in
    // after their context providers are imported

    const { categories, getCategories } = useContext(CategoryContext)
    const { watchStatuses, getWatchStatuses } = useContext(WatchStatusContext)
    const { addDocumentary, filteredDocs, documentaries, getDocumentaries, updateDoc } = useContext(DocumentaryContext)
    const { addDocCategory } = useContext(DocCategoryContext)

    const [documentary, setDocumentary] = useState({})

    // array which will be used to populate the ratings options for the ratings drop down in the form

    const ratingsArray = ["1 Star", "2 Stars", "3 Stars", "3 Stars", "4 Stars", "5 Stars"]

    const userId =  parseInt(localStorage.getItem("app_user_id"))

    const editMode = props.match.params.hasOwnProperty("documentaryId")

    const getDocInEditMode = () => {
        if (editMode) {
            const docId = parseInt(props.match.params.documentaryId)
            const selectedDoc = documentaries.find(d => d.id === docId) || {}
            setDocumentary(selectedDoc)
        }
    }

// The on submit function takes in data from the form input field refs and invokes the 
// functions that will post the data to the local API
const createNewDoc= (data) => {
    // find a doc from the filtered array who's title matches the input field title
    const foundDoc = filteredDocs.find(doc => doc.title === data.title)
     // create a new documentary object to get passed through addDocumentary to be posted to the api
    const newDocObj = {
        userId: parseInt(localStorage.getItem("app_user_id")),
        title: foundDoc.title, 
        watchStatusId: parseInt(data.watchStatusId),
        poster: `https://image.tmdb.org/t/p/w500${foundDoc.poster_path}`,
        synapsis: foundDoc.overview,
        rating: data.rating,
        review: data.review 
    } 
    // addDocumentary is invoked with newDocObj being passed as the argument 
    addDocumentary(newDocObj)
    // Then, addDocumentary returns a newly created docObj, the reponses is parsed, and passed through 
    // addDocCategory so that the recently added documentary's id can be accessed and added to the new 
    // docCatObj before it is posted to the API
    .then(newlyCreatedDoc => {
        addDocCategory({
            documentaryId: newlyCreatedDoc.id,
            categoryId: parseInt(data.categoryId)
        })
    })
    .then(props.history.push(`/`))
}

const patchUpdatedDoc= (data) => {
     // create a new documentary object to get passed through addDocumentary to be posted to the api
    
    const editedDocObj = {
        id: documentary.id,
        watchStatusId: parseInt(data.watchStatusId),
        rating: data.rating,
        review: data.review 
    } 
    // addDocumentary is invoked with newDocObj being passed as the argument 
    updateDoc(editedDocObj)
    .then(props.history.push(`/`))
}

    // react hook responsible for envoking provider functions to get data to be used on the form
    useEffect(()=>{
        getWatchStatuses()
        .then(getDocumentaries)
        .then(getCategories)
    },  [])

    useEffect(()=>{
        getDocInEditMode()
    },  [documentaries])

    if(editMode) {
        return (
            <>
                <form className="documentary_form" onSubmit={handleSubmit(patchUpdatedDoc)}>
                    {/* Dropdown for selecting a watch list, which has it's options populated by envoking the 
                    getWatchStatuses function, and mapping through the watchStatuses array that it sets       */}
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
                    <select name="rating" ref={register({ required: false })}>
                            <option value="">Select...</option>
                            {ratingsArray.map((rating, i) => (
                                <option key={i} value={rating}>
                                    {rating}
                                </option>
                            ))}
                    </select>

                    
                    <label>Write a review</label>
                    <input name="review" type="text" defaultValue="" ref={register} />

                    <button type="submit">Submit</button> 

                    <Link to={`/`}>Back</Link>

                </form>
            </>
        );
    } else {
        // The DocumentaryForm returns the jsx representation for the form 
        return (
            <>
                <form className="documentary_form" onSubmit={handleSubmit(createNewDoc)}>
                {/* Drop down for selecting a documentary, which has it's options populated 
                by mapping through the array containing the resulte from what is typed into the 
                DocumentarySearch component  */}
                    <label>Select a documentary</label>
                    <select name="title" ref={register({ required: true })}>
                        <option value="0">Select...</option>
                        {filteredDocs.map(st => (
                                <option key={st.id} value={st.title}>
                                    {st.title}
                                </option>
                            ))}
                    </select>

                    {/* Dropdown for selecting a watch list, which has it's options populated by envoking the 
                    getWatchStatuses function, and mapping through the watchStatuses array that it sets       */}
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
                    <select name="rating" ref={register({ required: false })}>
                            <option value="">Select...</option>
                            {ratingsArray.map((rating, i) => (
                                <option key={i} value={rating}>
                                    {rating}
                                </option>
                            ))}
                    </select>

                    
                    <label>Write a review</label>
                    <input name="review" type="text" defaultValue="" ref={register} />

                    <label>Choose your categories</label>
                    <select name="categoryId" ref={register({ required: true })}>
                        <option value="0">Select...</option>
                        {categories
                        .filter(c => c.userId === userId)
                        .map(c => (
                                <option key={c.id} value={c.id}>
                                    {c.name}
                                </option>
                            ))}
                    </select>

                    <button type="submit">Submit</button> 

                    <Link to={`/`}>Back</Link>

                </form>
            </>
        );
    }
} 