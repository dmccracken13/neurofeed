import React from "react"
import { Route, Redirect } from "react-router-dom"
import { Link } from "react-router-dom"
// import { ApplicationViews } from "./ApplicationViews"
// import { NavBar } from "./nav/NavBar"
import { DocumentaryProvider } from "./documentaries/DocumentaryProvider"
import { DocumentaryList } from "./documentaries/DocumentaryList"
import { Login } from "./auth/Login"
import { Register } from "./auth/Register"
import { CategoryProvider } from "./categories/CategoryProvider"
import { WatchStatusProvider } from "./watchStatuses/WatchStatusProvider"
import { DocCategoryProvider } from "./docCategories/DocCategoryProvider"
import { CategoryList } from "./categories/CategoryList"
import { DocumentaryForm } from "./documentaries/DocumentaryForm"
import { DocumentarySearch } from "./documentaries/DocumentarySearch"

export const Neurofeed = (props) => (
    <>
                <Route render={() => {
             // The user id is saved under the key app_user_id in local Storage. Change below if needed!
            if (localStorage.getItem("app_user_id")) {
                return (
                    <>
                    <h2>Neurofeed</h2>
                    <small>Feed Your Head!</small>
                    
                        {/* <DocCategoryProvider>
                            <WatchStatusProvider>
                                <CategoryProvider>
                                    <DocumentaryProvider>
                                    <Route path="/" render={
                                        props => 
                                            <>
                                                <Link to={`/form`}>Add Documentary</Link>
                                                <CategoryList />
                                                <DocumentaryList {...props} />
                                            </>
                                    } />   
                                    </DocumentaryProvider>
                                </CategoryProvider>
                            </WatchStatusProvider>
                        </DocCategoryProvider> */}

                        <Route exact path="/">
                            <DocCategoryProvider>
                                <WatchStatusProvider>
                                    <CategoryProvider>
                                        <DocumentaryProvider>
                                            <Link to={`/form`}>Add Documentary</Link>
                                            <CategoryList /> 
                                            <DocumentaryList />
                                        </DocumentaryProvider>
                                    </CategoryProvider>
                                </WatchStatusProvider>
                            </DocCategoryProvider>
                        </Route>

                        <DocCategoryProvider>
                            <WatchStatusProvider>
                                <CategoryProvider>
                                    <DocumentaryProvider>
                                    <Route path="/form" render={
                                        props => 
                                            <>
                                                <DocumentarySearch />
                                                <DocumentaryForm {...props} />
                                            </>
                                    } />   
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
    </>
)