import LocalStorageConfig from './config';

const USER_SEARCH_TARGET_KEY = process.env.REACT_APP_USER_SEARCH_TARGET_OPTIONS_KEY;

class UserSearchTargetManager extends LocalStorageConfig {
    constructor() {
        super(USER_SEARCH_TARGET_KEY, Number.MAX_SAFE_INTEGER);
    }

    getUserSearchTarget = () => {
        const searchTarget = this.getItemWithExpiration(USER_SEARCH_TARGET_KEY);
        return searchTarget ? searchTarget : [];
    }

    saveSearchTarget = (newSearchTarget) => {
        this.setItemWithExpiration(USER_SEARCH_TARGET_KEY, newSearchTarget);
        return newSearchTarget;
    }

    removeUserSearchTarget = () => {
        this.deleteStorage(USER_SEARCH_TARGET_KEY)
    }


}

const UserSearchTargetManagerInstance = new UserSearchTargetManager();

export default UserSearchTargetManagerInstance;