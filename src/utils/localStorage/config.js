const CUSTOM_USER_STORAGE_EXPIRE_TIME_IN_DAYS = parseInt(process.env.REACT_APP_CUSTOM_USER_STORAGE_EXPIRE_TIME); //7 days

class LocalStorageConfig {
    constructor(key, maxSize, ttl = CUSTOM_USER_STORAGE_EXPIRE_TIME_IN_DAYS) {
        this.key = key;
        this.maxSize = maxSize;
        this.ttl = ttl;
    }

    setItemWithExpiration = (key, value, ttl = this.ttl) => {
        const now = new Date();
        const item = {
            value: value,
            expiredAt: now.getTime() + ttl,
        };
        localStorage.setItem(key, JSON.stringify(item));
    };

    deleteStorage = (key) => {
        localStorage.removeItem(key);
        return null;
    }

    getItemWithExpiration = (key) => {
        const itemStr = localStorage.getItem(key);
        if (!itemStr) {
            return null;
        }
        const item = JSON.parse(itemStr);
        const now = new Date();
        if (now.getTime() > item.expiredAt) {
            return this.deleteStorage(key);
        }
        return item.value;
    };



}


export default LocalStorageConfig;