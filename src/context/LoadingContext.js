import React, { useEffect, useState } from 'react';

const LoadingContext = React.createContext({
    isLoading: false
})

function LoadingProvider(props) {
    const { children } = props;

    const [isLoadingContext, setIsLoadingContext] = useState(false);

    return (
        <div>
            <LoadingContext.Provider value={{
                isLoadingContext,
                setIsLoadingContext,
            }}>
                {children}
            </LoadingContext.Provider>
        </div>
    );
}

export { LoadingProvider, LoadingContext };