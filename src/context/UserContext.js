import React, { useEffect, useState } from 'react';

const UserContext = React.createContext({
    token: '',
    isAdmin: true,

})

function UserProvider(props) {

    const { children } = props;
    const defaultUser = {
        email: '',
        token: '',
        uid: '',
        message: '',
        auth: false
    }
    const [user, setUser] = useState(defaultUser);
    const [userLatestNovels, setUserLatestNovels] = useState([]);

    const loginContext = (userData) => {
        let newData = {
            email: userData.email,
            token: userData.accesstoken,
            message: userData.message,
            uid: userData.uid,
            auth: true
        }
        localStorage.setItem('user', JSON.stringify(newData));
        setUser(newData);
    }

    const logoutContext = () => {
        let newData = {
            ...defaultUser,
        }
        setUser(newData);
        localStorage.removeItem('user');
    }


    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

    return (
        <div>
            <UserContext.Provider value={{
                user, userLatestNovels,
                loginContext, logoutContext, setUserLatestNovels,
            }}>
                {children}
            </UserContext.Provider>
        </div>
    );
}

export { UserProvider, UserContext };