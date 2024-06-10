import Cookies from "js-cookie";

const USER_COOKIE_NAME = 'userCookie';
const MAX_NOVELS = 5;
const MAX_COOKIE_SIZE = 4000;
const EXPIRE_TIME_USER_COOKIE__IN_DAYS = 7; //count in days

const validateNovel = (novel) => {
    return {
        source: novel?.source,
        novelSlug: novel?.slug,
        cover: novel?.cover,
        title: novel?.title,
        chapter: {
            id: novel?.chapterID,
            slug: novel?.chapterSlug,
        }
    }
}


const getUserLatestNovels = () => {
    const novels = Cookies.get(USER_COOKIE_NAME);
    return novels ? JSON.parse(novels) : [];
}

const saveNovelToUserCookie = (newNovel) => {
    let savedNovel = validateNovel(newNovel);
    console.log("Save new novel to user cookie: ");
    console.log(savedNovel);

    const novels = getUserLatestNovels();
    const novelIndex = novels.findIndex(n => n.novelSlug === savedNovel.novelSlug);

    if (novelIndex !== -1) {
        if (!savedNovel?.chapter?.slug) {
            console.log('Add new novel into user latest novel');
            savedNovel.chapter = novels[novelIndex].chapter;
        }
        novels.splice(novelIndex, 1);
    }

    novels.unshift(savedNovel);

    if (novels.length > MAX_NOVELS) {
        novels.pop();
        Cookies.set(USER_COOKIE_NAME, JSON.stringify(novels), { expires: EXPIRE_TIME_USER_COOKIE__IN_DAYS });
        return;
    }

    if (JSON.stringify(novels).length > MAX_COOKIE_SIZE) {
        console.warn('Cookie size exceeds the maximum limit.');
        return;
    }

    Cookies.set(USER_COOKIE_NAME, JSON.stringify(novels), { expires: EXPIRE_TIME_USER_COOKIE__IN_DAYS });
    return novels;
}

const removeNovelFromUserCookie = (novelSlug) => {
    let novels = getUserLatestNovels();

    const novelIndex = novels.findIndex(n => n.novelSlug === novelSlug);

    if (novelIndex !== -1) {
        novels.splice(novelIndex, 1);

        const novelsString = JSON.stringify(novels);

        // Check if the size of the JSON string is within the allowable limit
        // if (novelsString.length > MAX_COOKIE_SIZE) {
        //     console.warn('Cookie size exceeds the maximum limit.');
        //     return;
        // }

        // Save the updated list back to cookies
        Cookies.set(USER_COOKIE_NAME, novelsString, { expires: EXPIRE_TIME_USER_COOKIE__IN_DAYS }); // Cookies expire in 7 days
    }

    return novels;
}

const UserCookieManager = {
    getUserLatestNovels,
    saveNovelToUserCookie,
    removeNovelFromUserCookie,
}

export default UserCookieManager;