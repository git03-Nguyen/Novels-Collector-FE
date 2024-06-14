import { CUSTOM_USER_STORAGE_EXPIRE_TIME_IN_DAYS, setItemWithExpiration, getItemWithExpiration, deleteStorage } from './config';


const USER_STYLE_SETTINGS_KEY = process.env.REACT_APP_USER_STYLE_SETTINGS_KEY;

const getUserStyleSettings = () => {
    const setting = getItemWithExpiration(USER_STYLE_SETTINGS_KEY);
    return setting ? setting : [];
}

const saveStyleSettings = (newSettings) => {
    setItemWithExpiration(USER_STYLE_SETTINGS_KEY, newSettings, CUSTOM_USER_STORAGE_EXPIRE_TIME_IN_DAYS);
    return newSettings;
}

const removeUserStyleSettings = () => {
    deleteStorage(USER_STYLE_SETTINGS_KEY)
}


const UserStyleSettingsGetter = {
    getUserStyleSettings,
    saveStyleSettings,
    removeUserStyleSettings,
}

export default UserStyleSettingsGetter;