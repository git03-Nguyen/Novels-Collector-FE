const CUSTOM_USER_STORAGE_EXPIRE_TIME_IN_DAYS = parseInt(process.env.REACT_APP_CUSTOM_USER_STORAGE_EXPIRE_TIME); //7 days

const setItemWithExpiration = (key, value, ttl) => {
    const now = new Date();
    const item = {
        value: value,
        expiredAt: now.getTime() + ttl,
    };
    localStorage.setItem(key, JSON.stringify(item));
};

const getItemWithExpiration = (key) => {
    const itemStr = localStorage.getItem(key);
    if (!itemStr) {
        return null;
    }
    const item = JSON.parse(itemStr);
    const now = new Date();
    if (now.getTime() > item.expiredAt) {
        return deleteStorage(key);
    }
    return item.value;
};

const deleteStorage = (key) => {
    localStorage.removeItem(key);
    return null;
}

export { CUSTOM_USER_STORAGE_EXPIRE_TIME_IN_DAYS, setItemWithExpiration, getItemWithExpiration, deleteStorage };