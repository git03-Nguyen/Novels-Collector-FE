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
    const [pluginSources, setPluginSources] = useState(UserPluginSourcesManager.getUserPluginSources() ?? []);

    const [searchValue, setSearchValue] = useState('');
    const [searchTarget, setSearchTarget] = useState('keyword');


    // PLUGIN
    const fetchPluginSources = async () => {
        try {
            let response = await PluginSourceService.fetchPluginSources();
            if (response && response.data && parseInt(response.statusCode) === 200) {
                let sourceList = response.data?.map((source) => {
                    return source?.isLoaded === true
                        ? {
                            ...source,
                            prior: 1,
                        }
                        : undefined;
                });
                sourceList.sort((a, b) => b.prior - a.prior)

                console.log("Plugin source after fetching API: ");
                console.log(sourceList);

                const isChangeSources = false;
                const curUserSources = UserPluginSourcesManager.getUserPluginSources();

                if (curUserSources?.length !== sourceList?.length) {
                    isChangeSources = true;
                } else {
                    for (let i = 0; i < curUserSources?.length; i++) {
                        const src = sourceList[i];
                        const newSrcIndex = sourceList?.findIndex(newSrc => newSrc?.name === src?.name);
                        if (newSrcIndex === -1 || (src?.isLoaded !== sourceList[newSrcIndex].isLoaded)) {
                            isChangeSources = true;
                            return;
                        }
                    }
                }
                if (isChangeSources === true) {
                    handleSetPluginSources(sourceList);
                }

                setIsLoadingNovel(false);
            } else {
                console.log("Error fetching plugin sources: " + response?.message);
            }
        } catch (error) {
            console.error("Error fetching plugin sources: " + error.message);
        }
    }

    const handleSetPluginSources = (newPluginSources) => {


        setPluginSources(newPluginSources);
        UserPluginSourcesManager.savePluginSources(newPluginSources);
    }

    useEffect(() => {
        fetchPluginSources()
    }, [])

    return (
        <NovelContext.Provider value={{
            searchValue, novelContext, chapterContext, pluginSources, isLoadingNovel, searchTarget,
            setSearchValue, setNovelContext, setChapterContext, handleSetPluginSources, setIsLoadingNovel, setSearchTarget
        }}>
            {children}
        </NovelContext.Provider>
    );
}

export { NovelProvider, NovelContext };