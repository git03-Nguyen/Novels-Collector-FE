import { CUSTOM_USER_STORAGE_EXPIRE_TIME_IN_DAYS, setItemWithExpiration, getItemWithExpiration } from './config';

const USER_LOCAL_STORAGE_KEY = process.env.REACT_APP_USER_LATEST_NOVELS_KEY;
const MAX_NOVELS = parseInt(process.env.REACT_APP_MAX_USER_LATEST_NOVELS);

const validateNovel = (novel) => {
    return {
        source: novel?.source,
        novelSlug: novel?.slug,
        cover: novel?.cover,
        title: novel?.title,
        chapter: {
            id: novel?.chapterID,
            slug: novel?.chapterSlug,
            number: novel?.chapterNumber,
        }
    }
}


const getUserLatestNovels = () => {
    const novels = getItemWithExpiration(USER_LOCAL_STORAGE_KEY);
    return novels ? novels : [];
}

const saveNovelToUserStorage = (newNovel) => {
    let savedNovel = validateNovel(newNovel);

    const novels = getUserLatestNovels();
    const novelIndex = novels.findIndex(n => n.novelSlug === savedNovel.novelSlug);

    if (novelIndex === -1) {
        console.log('Add new novel into user latest novel');
    } else {
        console.log('Update novel in user latest novel');
        if (!savedNovel?.chapter?.slug) {
            console.log("New novel status is no chapter ==> get the previous chapter");
            savedNovel.chapter = novels[novelIndex].chapter;
        }
        novels.splice(novelIndex, 1);
    }

    novels.unshift(savedNovel);

    if (novels.length > MAX_NOVELS) {
        novels.pop();
    }


    setItemWithExpiration(USER_LOCAL_STORAGE_KEY, novels, CUSTOM_USER_STORAGE_EXPIRE_TIME_IN_DAYS);
    return novels;
}

const removeNovelFromUserStorage = (novelSlug) => {
    let novels = getUserLatestNovels();

    const novelIndex = novels.findIndex(n => n.novelSlug === novelSlug);

    if (novelIndex !== -1) {
        novels.splice(novelIndex, 1);
        setItemWithExpiration(USER_LOCAL_STORAGE_KEY, novels, CUSTOM_USER_STORAGE_EXPIRE_TIME_IN_DAYS);
    }

    return novels;
}

const UserLatestNovelGetter = {
    getUserLatestNovels,
    saveNovelToUserStorage,
    removeNovelFromUserStorage,
}

export default UserLatestNovelGetter;