import React from "react"
import ReactDOM from "react-dom"
import { BrowserRouter as Router } from "react-router-dom"
import { Neurofeed } from "./components/Neurofeed.js"
import "./index.css"

ReactDOM.render(
    <React.StrictMode>
        <Router>
            <Neurofeed />
        </Router>
    </React.StrictMode>,
    document.getElementById("root")
)
