import LocalStorageConfig from './config';

const USER_STYLE_SETTINGS_KEY = process.env.REACT_APP_USER_STYLE_SETTINGS_KEY;

class UserStyleSettingsManager extends LocalStorageConfig {
    constructor() {
        super(USER_STYLE_SETTINGS_KEY, Number.MAX_SAFE_INTEGER);
    }


    getUserStyleSettings = () => {
        const setting = this.getItemWithExpiration(USER_STYLE_SETTINGS_KEY);
        return setting ? setting : [];
    }

    saveStyleSettings = (newSettings) => {
        this.setItemWithExpiration(USER_STYLE_SETTINGS_KEY, newSettings);
        return newSettings;
    }

    removeUserStyleSettings = () => {
        this.deleteStorage(USER_STYLE_SETTINGS_KEY)
    }

}

const UserStyleSettingsManagerInstance = new UserStyleSettingsManager();

export default UserStyleSettingsManagerInstance;