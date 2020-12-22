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

export const Neurofeed = (props) => (
    <>
                <Route render={() => {
             // The user id is saved under the key app_user_id in local Storage. Change below if needed!
            if (localStorage.getItem("app_user_id")) {
                return (
                    <>
                    <h2>Neurofeed</h2>
                    <small>Feed Your Head!</small>
                    
                        <FriendProvider>
                            <DocCategoryProvider>
                                <WatchStatusProvider>
                                    <CategoryProvider>
                                        <DocumentaryProvider>
                                        <Route exact path="/" render={
                                            props => 
                                                <>  
                                                    <Link className="logout" to="/login" onClick={()=>{Logout()}}>logout</Link>
                                                    <CategoryList />
                                                    <DocumentaryList {...props} />
                                                </>
                                        } />   
                                        </DocumentaryProvider>
                                    </CategoryProvider>
                                </WatchStatusProvider>
                            </DocCategoryProvider>
                        </FriendProvider>

                        <DocCategoryProvider>
                            <WatchStatusProvider>
                                <CategoryProvider>
                                    <DocumentaryProvider>
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