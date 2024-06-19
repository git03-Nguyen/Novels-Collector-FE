import LocalStorageConfig from './config';

const USER_PLUGIN_SOURCES_KEY = process.env.REACT_APP_USER_PLUGIN_SOURCES_KEY;

class UserPluginSourcesManager extends LocalStorageConfig {
    constructor() {
        super(USER_PLUGIN_SOURCES_KEY, Number.MAX_SAFE_INTEGER);
    }

    getUserPluginSources = () => {
        const sources = this.getItemWithExpiration(USER_PLUGIN_SOURCES_KEY);
        return sources ? sources : [];
    }

    savePluginSources = (sources) => {
        this.setItemWithExpiration(USER_PLUGIN_SOURCES_KEY, sources);
        return sources;
    }

    removeUserPluginSources = () => {
        this.deleteStorage(USER_PLUGIN_SOURCES_KEY)
    }
}

const UserPluginSourcesManagerInstance = new UserPluginSourcesManager();

export default UserPluginSourcesManagerInstance;