// 取得, 处理并返回指定元素的样式
function getStyle(element) {
    if (!element.style) {
        element.style = {};
    }

    for (let prop in element.computedStyle) {
        let value = element.computedStyle[prop].value;
        let match = value.toString().match(/(^[0-9\.]+)(px)?$/);
        if (match) {
            value = parseInt(match[1]);
        }
        element.style[prop] = value;
    }
    return element.style;
}

function layout(element) {
    if (!element.computedStyle) {
        return;
    }

    let elementStyle = getStyle(element);

    if (elementStyle.display !== 'flex') {
        return;
    }

    let items = element.children.filter(e => e.type === 'element');

    items.sort((a, b) => (a.order || 0) - (b.order || 0));

    let style = elementStyle;

    ['width', 'height'].forEach(size => {
        if (style[size] === 'auto' || style[size] === '') {
            style[size] = null;
        }
    });

    if (!style.flexDirection || style.flexDirection === 'auto') {
        style.flexDirection = 'row';
    }
    if (!style.alignItems || style.alignItems === 'auto') {
        style.alignItems = 'stretch';
    }
    if (!style.justifyContent || style.justifyContent === 'auto') {
        style.justifyContent = 'flex-start';
    }
    if (!style.flexWrap || style.flexWrap === 'auto') {
        style.flexWrap = 'nowrap';
    }
    if (!style.alignContent || style.alignContent === 'auto') {
        style.alignContent = 'stretch';
    }

    let mainSize;
    let mainStart;
    let mainEnd;
    let mainSign;
    let mainBase;

    let crossSize;
    let crossStart;
    let crossEnd;
    let crossSign;
    let crossBase;

    switch (style.flexDirection) {
        case 'row':
            mainSize = 'width';
            mainStart = 'left';
            mainEnd = 'right';
            mainSign = +1;
            mainBase = 0;

            crossSize = 'height';
            crossStart = 'top';
            crossEnd = 'bottom';
            
            break;
        case 'row-reverse':
            mainSize = 'width';
            mainStart = 'right';
            mainEnd = 'left';
            mainSign = -1;
            mainBase = style.width;

            crossSize = 'height';
            crossStart = 'top';
            crossEnd = 'bottom';
            
            break;
        case 'column':
            mainSize = 'height';
            mainStart = 'top';
            mainEnd = 'bottom';
            mainSign = +1;
            mainBase = 0;

            crossSize = 'width';
            crossStart = 'left';
            crossEnd = 'right';
            
            break;
        case 'column-reverse':
            mainSize = 'height';
            mainStart = 'bottom';
            mainEnd = 'top';
            mainSign = -1;
            mainBase = style.height;

            crossSize = 'width';
            crossStart = 'left';
            crossEnd = 'right';
            
            break;
    }

    if (style.flexWrap === 'wrap-reverse') {
        let tmp = crossStart;
        crossStart = crossEnd;
        crossEnd = tmp;
        crossSign = -1;
    } else {
        crossBase = 0;
        crossSign = 1;
    }
}

module.exports = layout;