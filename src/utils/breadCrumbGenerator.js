
const convertPathToBreadCrumb = (path) => {
    // Path format: '/foo/bar' ==> ignore the first slash
    if (path === '/') {
        return [];
    }
    const subsetOfPath = path.split('/').slice(1);
    let result = [];

    for (let i = 0; i < subsetOfPath.length; i += 2) {
        result[i / 2] = {
            path: '/',
            name: '',
            title: '',
        };

        result[i / 2].title = convertPathToMeaningfulSegment(subsetOfPath[i]);

        if (i > 0) {
            result[i / 2].path = result[i / 2 - 1].path + '/' + subsetOfPath[i];
        } else {
            result[i / 2].path = subsetOfPath[i];
        }

        result[i / 2].name = subsetOfPath[i + 1] ?? '';

        result[i / 2].path += `/${result[i / 2].name}`;
    }
    console.log(result);
    return result;
}

const convertPathToMeaningfulSegment = (path) => {
    switch (path) {
        case 'novel': return 'Truyện';
        case 'chapter': return 'Chương';
        case 'source': return 'Nguồn';
        case 'admin': return 'Quản trị';
        case 'novel-list': return 'Danh sách';
        case 'login': return 'Đăng nhập';
        // TODO: Add new role for displaying breadcrumb if needed

        default: return '';
    }
}

const BreadCrumbGenerator = {
    convertPathToBreadCrumb,
}

export default BreadCrumbGenerator;