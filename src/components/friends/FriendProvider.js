import React, { useState } from "react"

/*
    The context is imported and used by individual components
    that need data
*/
export const FriendContext = React.createContext()

/*
    This component establishes what data can be used.
 */
export const FriendProvider = (props) => {
    const [users, setUsers] = useState([])

    const getUsers= () => {
        return fetch("http://localhost:8088/users")
            .then(res => res.json())
            .then(setUsers)
    }

    /*
        You return a context provider which has the
        `users` state and the `getUsers` function as keys. This
        allows any child elements to access them.
    */
    return (
        <FriendContext.Provider value={{
            users, setUsers, getUsers
        }}>
            {props.children}
        </FriendContext.Provider>
    )
}