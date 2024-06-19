import LocalStorageConfig from './config';

const USER_LOCAL_STORAGE_KEY = process.env.REACT_APP_USER_LATEST_NOVELS_KEY;
const MAX_NOVELS = parseInt(process.env.REACT_APP_MAX_USER_LATEST_NOVELS);

class UserLatestNovelsManager extends LocalStorageConfig {
    constructor() {
        super(USER_LOCAL_STORAGE_KEY, MAX_NOVELS);
    }

    validateNovel = (novel) => {
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


    getUserLatestNovels = () => {
        const novels = this.getItemWithExpiration(USER_LOCAL_STORAGE_KEY);
        return novels ? novels : [];
    }

    saveNovelToUserStorage = (newNovel) => {
        let savedNovel = this.validateNovel(newNovel);

        const novels = this.getUserLatestNovels();
        const novelIndex = novels.findIndex(n => (n.novelSlug === savedNovel.novelSlug && n.source === savedNovel.source));

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


        this.setItemWithExpiration(USER_LOCAL_STORAGE_KEY, novels);
        return novels;
    }

    removeNovelFromUserStorage = (novelSlug) => {
        let novels = this.getUserLatestNovels();

        const novelIndex = novels.findIndex(n => n.novelSlug === novelSlug);

        if (novelIndex !== -1) {
            novels.splice(novelIndex, 1);
            this.setItemWithExpiration(USER_LOCAL_STORAGE_KEY, novels);
        }

        return novels;
    }

    resetUserNovelStorage = () => {
        console.log("Rest user latest novels to empty array !");
        this.setItemWithExpiration(USER_LOCAL_STORAGE_KEY, [])
    }
}

const UserLatestNovelsManagerInstance = new UserLatestNovelsManager();

export default UserLatestNovelsManagerInstance;