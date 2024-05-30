import React, { useState } from 'react';

const SearchContext = React.createContext({
    searchKeyword: '',
})

function SearchProvider(props) {
    const { children } = props;

    const [searchKeyword, setSearchKeyword] = useState('');

    return (
        <SearchContext.Provider value={{ searchKeyword, setSearchKeyword }}>
            {children}
        </SearchContext.Provider>
    );
}

export { SearchProvider, SearchContext };