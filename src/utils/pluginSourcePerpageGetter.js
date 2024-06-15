
const getChaptersPerpageByPluginSource = (source) => {
    switch (source) {
        case 'TruyenFullVn': return 50;
        case 'TruyenTangThuVienVn': return 75;
        case 'DTruyenCom': return 30;
        case 'SSTruyenVn': return 32;
        // TODO: fix or add more plugin sources if needed
        default: return 50;
    }
}

const PluginSourcePerpageGetter = {
    getChaptersPerpageByPluginSource,
}

export default PluginSourcePerpageGetter;