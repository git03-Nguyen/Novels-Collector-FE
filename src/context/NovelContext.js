import React, { useEffect, useState } from 'react';
import PluginSourceService from '../services/pluginSource.s';
import _ from 'lodash';
import UserPluginSourcesManager from '../utils/localStorage/userPluginSourcesManager';
import UserSearchTargetManager from '../utils/localStorage/userSearchTargetManager';

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
    const [searchTarget, setSearchTarget] = useState(UserSearchTargetManager?.getUserSearchTarget() ?? 'keyword');


    // SEARCH

    const handleSetSearchTarget = (newSearchTarget) => {
        setSearchTarget(newSearchTarget);
        UserSearchTargetManager?.saveSearchTarget(newSearchTarget);
    }

    // PLUGIN
    const refreshPluginSources = (sourceList) => {
        const curUserSources = UserPluginSourcesManager.getUserPluginSources();
        if (sourceList?.length > (curUserSources?.length ?? 0)) {
            sourceList?.forEach((source) => {
                const position = curUserSources?.findIndex(src => src?.name === source?.name);
                if (position === -1) {
                    curUserSources?.push(source);
                }
            })
        }

        curUserSources.sort((a, b) => b.prior - a.prior);
        const newSourceList = curUserSources?.length > 0
            ? curUserSources?.map((curSrc) => {
                const newSrcFromAPI = sourceList?.find(newSrc => newSrc?.name === curSrc?.name);
                if (newSrcFromAPI) {
                    return newSrcFromAPI;
                } else {
                    return;
                }
            })
            : sourceList;

        newSourceList?.forEach((src, index) => {
            if (!src || !src?.name) {
                newSourceList.splice(index, 1);
            }
            return;
        });

        return newSourceList;
    }

    const fetchPluginSources = async () => {
        try {
            let response = await PluginSourceService.fetchPluginSources();
            if (response && response.data && parseInt(response.statusCode) === 200) {
                let sourceList = response.data?.map((source, index) => {
                    return source?.isLoaded === true
                        ? {
                            ...source,
                            prior: response.data?.length - index,
                        }
                        : undefined;
                });
                sourceList.sort((a, b) => b.prior - a.prior)

                const newSourceList = refreshPluginSources(sourceList);
                console.log("New plugin sources from novel context: ");
                console.log(newSourceList);
                handleSetPluginSources(newSourceList);

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
            setSearchValue, setNovelContext, setChapterContext, handleSetPluginSources, setIsLoadingNovel, handleSetSearchTarget
        }}>
            {children}
        </NovelContext.Provider>
    );
}

export { NovelProvider, NovelContext };