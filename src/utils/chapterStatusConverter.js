
const convertCodeToStatus = (statusCode) => {
    const code = parseInt(statusCode);
    switch (code) {
        case 0: return 'Sớm phát hành';
        case 1: return 'Đang phát hành';
        case 2: return 'Đã hoàn thành';
        case 3: return 'Ngừng phát hành';
        // TODO: add new chapter status code here if needed

        default: return '';

    }
}

const ChapterStatusConverter = {
    convertCodeToStatus,
}

export default ChapterStatusConverter;