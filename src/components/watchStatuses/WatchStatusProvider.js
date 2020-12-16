import React, { useState } from "react"

/*
    The context is imported and used by individual components
    that need data
*/
export const WatchStatusContext = React.createContext()

/*
 This component establishes what data can be used.
 */
export const WatchStatusProvider = (props) => {
    const [watchStatuses, setWatchStatuses] = useState([])

    const getWatchStatuses = () => {
        return fetch("http://localhost:8088/watchStatuses")
            .then(res => res.json())
            .then(setWatchStatuses)
    }

    const addWatchStatus = watchStatus => {
        return fetch("http://localhost:8088/watchStatuses", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(watchStatus)
        })
            .then(getWatchStatuses)
    }

    /*
        You return a context provider which has the
        `watchStatuses` state, the `addwatchStatuses` function,
        and the `getWatchStatus` function as keys. This
        allows any child elements to access them.
    */
    return (
        <WatchStatusContext.Provider value={{
            watchStatuses, addWatchStatus, getWatchStatuses
        }}>
            {props.children}
        </WatchStatusContext.Provider>
    )
}