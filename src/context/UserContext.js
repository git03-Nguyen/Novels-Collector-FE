import React, { useEffect, useState } from 'react';

const UserContext = React.createContext({
    user: {
        email: '',
        token: '',
        uid: '',
        message: '',
        auth: false
    },
    userLatestNovels: [],
    loginContext: () => { },
    logoutContext: () => { },
    setUserLatestNovels: () => { },
    getUserData: () => ({})
});

function UserProvider(props) {
    const { children } = props;
    const defaultUser = {
        email: '',
        token: '',
        uid: '',
        message: '',
        auth: false
    };
    const [user, setUser] = useState(defaultUser);
    const [userLatestNovels, setUserLatestNovels] = useState([]);

    const loginContext = (userData) => {
        let newData = {
            email: userData.email,
            token: userData.accesstoken,
            message: userData.message,
            uid: userData.uid,
            auth: true
        };

        localStorage.setItem('token', newData.token);
        setUser(newData);
    };

    const logoutContext = () => {
        let newData = {
            ...defaultUser,
        };
        setUser(newData);
        localStorage.removeItem('token');
    };

    const getUserData = () => user;

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            setUser({
                ...user,
                token: token,
                auth: true
            });
        } else {
            setUser({
                ...user,
                auth: false
            });
        }
    }, []);

    return (
        <UserContext.Provider value={{
            user,
            userLatestNovels,
            loginContext,
            logoutContext,
            setUserLatestNovels,
            getUserData
        }}>
            {children}
        </UserContext.Provider>
    );
}

export { UserProvider, UserContext };
