import { CUSTOM_USER_STORAGE_EXPIRE_TIME_IN_DAYS, setItemWithExpiration, getItemWithExpiration, deleteStorage } from './config';


const USER_PLUGIN_SOURCES_KEY = process.env.REACT_APP_USER_PLUGIN_SOURCES_KEY;

const getUserPluginSources = () => {
    const sources = getItemWithExpiration(USER_PLUGIN_SOURCES_KEY);
    return sources ? sources : [];
}

const savePluginSources = (sources) => {
    setItemWithExpiration(USER_PLUGIN_SOURCES_KEY, sources, CUSTOM_USER_STORAGE_EXPIRE_TIME_IN_DAYS);
    return sources;
}

const removeUserPluginSources = () => {
    deleteStorage(USER_PLUGIN_SOURCES_KEY)
}


const UserPluginSourcesManager = {
    getUserPluginSources,
    savePluginSources,
    removeUserPluginSources,
}

export default UserPluginSourcesManager;