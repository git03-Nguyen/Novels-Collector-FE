import React, { useEffect, useState } from 'react';
import PluginSourceService from '../services/pluginSource.s';
import _ from 'lodash';

const NovelContext = React.createContext({
    searchKeyword: '',
    novelContext: {},
    pluginSources: {},
    isLoadingNovel: false,
})

function NovelProvider(props) {
    const { children } = props;
    const [isLoadingNovel, setIsLoadingNovel] = useState(true);
    const [novelContext, setNovelContext] = useState({});
    const [chapterContext, setChapterContext] = useState({});
    const [pluginSources, setPluginSources] = useState([{ name: 'TruyenFullVn' }]);
    const [searchKeyword, setSearchKeyword] = useState('');


    // PLUGIN
    const fetchPluginSources = async () => {
        try {
            let response = await PluginSourceService.fetchPluginSources();
            if (response && response.data && parseInt(response.statusCode) === 200) {
                let sourceList = response.data.map((source) => {
                    return {
                        ...source,
                        prior: 1,
                    }
                });
                sourceList.sort((a, b) => b.prior - a.prior)

                setPluginSources(sourceList);
                console.log("Plugin source: ");
                console.log(sourceList);
                setIsLoadingNovel(false);
            } else {
                console.log("Error fetching plugin sources: " + response?.message);
            }
        } catch (error) {
            console.error("Error fetching plugin sources: " + error.message);
        }
    }

    const addNewPluginSource = () => {
        // TODO: Calling API from server here 
    }

    useEffect(() => {
        fetchPluginSources()
    }, [])

    return (
        <NovelContext.Provider value={{
            searchKeyword, novelContext, chapterContext, pluginSources, isLoadingNovel,
            setSearchKeyword, setNovelContext, setChapterContext, setPluginSources, addNewPluginSource, setIsLoadingNovel
        }}>
            {children}
        </NovelContext.Provider>
    );
}

export { NovelProvider, NovelContext };