import React, { useEffect, useState } from 'react';

const UserContext = React.createContext({
    token: '',
    isAdmin: true,
})

function UserProvider(props) {

    const { children } = props;
    const defaultUser = {
        token: '',
        account: {},
        isAdmin: false,
    }
    const [user, setUser] = useState(defaultUser);

    const loginContext = (userData) => {
        let newData = {
            isAdmin: true,
            token: userData.token,
            account: userData.account
        }
        setUser(newData);
    }

    const logoutContext = () => {
        let newData = {
            ...defaultUser,
        }
        setUser(newData);
    }


    const fetchUser = async () => {

    }

    return (
        <div>
            <UserContext.Provider value={{ user, loginContext, logoutContext }}>
                {children}
            </UserContext.Provider>
        </div>
    );
}

export { UserProvider, UserContext };