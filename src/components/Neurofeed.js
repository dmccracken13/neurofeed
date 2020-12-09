import React from "react"
import { Route, Redirect } from "react-router-dom"
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

export const Neurofeed = () => (
    <>
                <Route render={() => {
          // The user id is saved under the key app_user_id in local Storage. Change below if needed!
            if (localStorage.getItem("app_user_id")) {
                return (
                    <>
                    <h2>Neurofeed</h2>
                    <small>Feed Your Head!</small>
                    
                    <DocCategoryProvider>
                        <WatchStatusProvider>
                            <CategoryProvider>
                                <DocumentaryProvider>
                                    <CategoryList /> 
                                    <DocumentaryList />
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