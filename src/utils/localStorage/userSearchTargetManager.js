import { CUSTOM_USER_STORAGE_EXPIRE_TIME_IN_DAYS, setItemWithExpiration, getItemWithExpiration, deleteStorage } from './config';


const USER_SEARCH_TARGET_KEY = process.env.REACT_APP_USER_SEARCH_TARGET_OPTIONS_KEY;

const getUserSearchTarget = () => {
    const searchTarget = getItemWithExpiration(USER_SEARCH_TARGET_KEY);
    return searchTarget ? searchTarget : [];
}

const saveSearchTarget = (newSearchTarget) => {
    setItemWithExpiration(USER_SEARCH_TARGET_KEY, newSearchTarget, CUSTOM_USER_STORAGE_EXPIRE_TIME_IN_DAYS);
    return newSearchTarget;
}

const removeUserSearchTarget = () => {
    deleteStorage(USER_SEARCH_TARGET_KEY)
}


const UserStyleSettingsGetter = {
    getUserSearchTarget,
    saveSearchTarget,
    removeUserSearchTarget,
}

export default UserStyleSettingsGetter;