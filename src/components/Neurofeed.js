import React from "react"
import { Route, Redirect } from "react-router-dom"
import "bootstrap/dist/css/bootstrap.min.css"
import { Link } from "react-router-dom"
import { DocumentaryProvider } from "./documentaries/DocumentaryProvider"
import { DocumentaryList } from "./documentaries/DocumentaryList"
import { Login } from "./auth/Login"
import { Logout } from "./auth/Login"
import { Register } from "./auth/Register"
import { CategoryProvider } from "./categories/CategoryProvider"
import { WatchStatusProvider } from "./watchStatuses/WatchStatusProvider"
import { DocCategoryProvider } from "./docCategories/DocCategoryProvider"
import { CategoryList } from "./categories/CategoryList"
import { DocumentaryForm } from "./documentaries/DocumentaryForm"
import { DocumentarySearch } from "./documentaries/DocumentarySearch"
import { FriendProvider} from "./friends/FriendProvider"
import "./Neurofeed.css"

export const Neurofeed = (props) => (
    <>
        <div className="mainContainer">
                <Route render={() => {
             // The user id is saved under the key app_user_id in local Storage. Change below if needed!
            if (localStorage.getItem("app_user_id")) {
                return (
                    <>
                    <div className="header" id="myHeader">
                        <h2>Neurofeed</h2>
                        <medium>Feed Your Head!</medium>
                        <br></br>
                        <Link className="logout" to="/login" onClick={()=>{Logout()}}>logout</Link>
                    </div>
                        <FriendProvider>
                            <DocCategoryProvider>
                                <WatchStatusProvider>
                                    <CategoryProvider>
                                        <DocumentaryProvider>
                                            <div className="list-group">
                                            <Route exact path="/" render={
                                            props => 
                                                <>  
                                                    <CategoryList className="list-group-item" />
                                                    <DocumentaryList className="list-group-item" {...props} />
                                                </>
                                            } />   
                                            </div>
                                        </DocumentaryProvider>
                                    </CategoryProvider>
                                </WatchStatusProvider>
                            </DocCategoryProvider>
                        </FriendProvider>

                        <DocCategoryProvider>
                            <WatchStatusProvider>
                                <CategoryProvider>
                                    <DocumentaryProvider>
                                        <div className="container">
                                        <Route exact path="/form" render={
                                            props => 
                                                <>
                                                    <DocumentarySearch />
                                                    <DocumentaryForm {...props} />
                                                    
                                                </>
                                        } /> 
                                        <Route exact path="/documentaries/edit/:documentaryId(\d+)" render={
                                            props => <DocumentaryForm {...props} />
                                        } /> 
                                        </div>
                                    </DocumentaryProvider>
                                </CategoryProvider>
                            </WatchStatusProvider>
                        </DocCategoryProvider>
                </>
                )
            } else {
                return <Redirect to="/login" />
            }
        }} />

        <Route path="/login" render={props => <Login {...props} />} />
        <Route path="/register" render={props => <Register {...props} />} />
        </div>
    </>
)