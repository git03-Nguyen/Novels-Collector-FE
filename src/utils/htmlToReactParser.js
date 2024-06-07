import parse from 'html-react-parser';

const truncateHtml = (inputHtml, maxLength) => {
    let currentLength = 0;
    const truncatedNodes = [];

    const processNode = (node) => {
        node.props.children.forEach((child) => {
            if (typeof child === 'string') {
                truncatedNodes.push(child);
                return child;
            }

            truncatedNodes.push("\t");
            return '\t';
        })
    };

    const dom = parse(inputHtml, { trim: true, lowerCaseTags: false });
    const nodes = Array.isArray(dom) ? dom : [dom];
    nodes.forEach(node => processNode(node));

    // Return the truncated HTML
    return truncatedNodes.join(' ');
};

const HTMLToReactParser = {
    truncateHtml,
}

export default HTMLToReactParser;