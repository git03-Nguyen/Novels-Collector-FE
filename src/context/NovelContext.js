import React, { useEffect, useState } from 'react';
import PluginSourceService from '../services/pluginSource.s';
import _ from 'lodash';
import UserPluginSourcesManager from '../utils/localStorage/userPluginSourcesManager';

const NovelContext = React.createContext({
    searchValue: '',
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

    const [searchValue, setSearchValue] = useState('');
    const [searchTarget, setSearchTarget] = useState('keyword');


    // PLUGIN
    const fetchPluginSources = async () => {
        const userPluginSources = UserPluginSourcesManager.getUserPluginSources();
        if (userPluginSources?.length > 0) {
            setIsLoadingNovel(false);

            setPluginSources(userPluginSources);
            return;
        }

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

                UserPluginSourcesManager.savePluginSources(sourceList);
            } else {
                console.log("Error fetching plugin sources: " + response?.message);
            }
        } catch (error) {
            console.error("Error fetching plugin sources: " + error.message);
        }
    }


    useEffect(() => {
        fetchPluginSources()
    }, [])

    return (
        <NovelContext.Provider value={{
            searchValue, novelContext, chapterContext, pluginSources, isLoadingNovel, searchTarget,
            setSearchValue, setNovelContext, setChapterContext, setPluginSources, setIsLoadingNovel, setSearchTarget
        }}>
            {children}
        </NovelContext.Provider>
    );
}

export { NovelProvider, NovelContext };