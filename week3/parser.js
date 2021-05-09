const css = require('css');

const layout = require('./layout.js');

const EOF = Symbol('EOF');

const emptyRegex = /^[\t\n\f ]$/;
const letterRegex = /^[a-zA-Z]$/;

let currentToken = null;
let currentAttribute = null;

let stack = [{type: 'document', children:[]}];
// 当前正在处理的文本节点, 文本的每个字符会依次追加至节点中
let currentTextNode = null;

let rules = [];
// 把文档中所有 css rules 都加入数组
function addCssRules(text) {
    const ast = css.parse(text);
    rules.push(...ast.stylesheet.rules);
}

// 判断指定简单选择器是否匹配指定元素
function match(element, selector) {
    if (!selector || !element.attributes) {
        return false;
    }

    if (selector.charAt(0) == '#') {
        let attr = element.attributes.filter(attr => attr.name === 'id')[0];
        if (attr && attr.value === selector.replace('#', '')) {
            return true;
        }
    } else if (selector.charAt(0) == '.') {
        let attr = element.attributes.filter(attr => attr.name === 'class')[0];
        if (attr && attr.value === selector.replace('.', '')) {
            return true;
        }
    } else {
        if (element.tagName === selector) {
            return true;
        }
    }
}

// 判断指定复杂选择器的"专指度"
function specificity(selector) {
    let p = [0, 0, 0, 0];
    let selectorParts = selector.split(' ');
    for (let part of selectorParts) {
        if (part.charAt(0) === '#') {
            p[1] += 1;
        } else if (part.charAt(0) === '.') {
            p[2] += 1;
        } else {
            p[3] += 1;
        }
    }
    return p;
}

// 返回正数说明 sp1 大
function compare(sp1, sp2) {
    if (sp1[0] != sp2[0]) {
        return sp1[0] - sp2[0];
    } else if (sp1[1] != sp2[1]) {
        return sp1[1] - sp2[1];
    } else if (sp1[2] != sp2[2]) {
        return sp1[2] - sp2[2];
    } else {
        return sp1[3] - sp2[3];
    }
}

// 收集并筛选该元素应应用的样式
function computeCss(element) {
    // 获得由当前元素至祖先元素的序列
    let elements = stack.slice().reverse();

    if (!element.computedStyle) {
        element.computedStyle = {};
    }

    for (let rule of rules) {
        let selectorParts = rule.selectors[0].split(' ').reverse();
        if (!match(element, selectorParts[0])) {
            continue;
        }

        let j = 1;
        for (let i = 0 ; i != elements.length ; ++i) {
            if (match(elements[i], selectorParts[j])) {
                ++ j;
            }
        }
        if (j >= selectorParts.length) {  // 所有 selector 均已找到对应元素
            matched = true;
        }

        if (matched) {
            let sp = specificity(rule.selectors[0]);
            let computedStyle = element.computedStyle;
            for (let declaration of rule.declarations) {
                if (!computedStyle[declaration.property]) {
                    computedStyle[declaration.property] = {};
                }
                if (!computedStyle[declaration.property].specificity) {
                    computedStyle[declaration.property].value = declaration.value;
                    computedStyle[declaration.property].specificity = sp;
                } else if (compare(computedStyle[declaration.property].specificity, sp) < 0) {
                    computedStyle[declaration.property].value = declaration.value;
                    computedStyle[declaration.property].specificity = sp;
                }
            }
        }
    }
}

function emit(token) {
    // 当前栈顶元素
    let top = stack[stack.length - 1];

    switch (token.type) {
        case 'startTag':
            
            let element = {
                type: 'element',
                tagName: token.tagName,
                children: [],
                attributes: []
            };

            for (let prop in token) {
                // 这里原文为 ||, 但 || 等同于恒为真
                if (prop != 'type' && prop != 'tagName') {
                    element.attributes.push({
                        name: prop,
                        value: token[prop]
                    });
                }
            }

            computeCss(element);

            top.children.push(element);
            if (!token.isSelfClosing) {
                stack.push(element);
            }

            currentTextNode = null;

            break;
        case 'endTag':

            if (top.tagName != token.tagName) {
                throw new Error('Tag start end doesn\'t match!');
            } else {
                if (top.tagName === 'style') {
                    // 取出其中文本节点的 content 进行处理
                    addCssRules(top.children[0].content);
                }
                layout(top);
                // 弹出对应的开始标签
                stack.pop();
            }
            currentTextNode = null;

            break;
        case 'text':

            if (currentTextNode == null) {
                currentTextNode = {
                    type: 'text',
                    content: ''
                };
                top.children.push(currentTextNode);
            }
            currentTextNode.content += token.content;

            break;
    }
}

function e(type, content) {
    let obj = {};
    obj.type = type;
    if (content) {
        obj.content = content;
    }
    emit(obj);
}

function t(type, tagName) {
    let obj = {};
    obj.type = type;
    obj.tagName = tagName ? tagName : '';
    currentToken = obj;
}

function a(name, value) {
    let obj = {};
    obj.name = name ? name : '';
    obj.value = value ? value : '';
    currentAttribute = obj;
}

// 初始状态, 或刚处理完一个标签后的状态: 等待标签
function data(c) {
    if (c === '<') {
        return tagOpen;
    } else if (c == EOF) {
        e('EOF');
        return;
    } else {
        e('text', c);
        // 继续等待
        return data;
    }
}

// 已遇到 <, 进入 tag
function tagOpen(c) {
    if (c === '/') {
        return endTagOpen;
    } else if (c.match(letterRegex)) {
        t('startTag');
        // 若遇到字母, 则开始解析 tag 名, 且将当前 c 再处理一遍
        return tagName(c);
    } else {
        e('text', c);
        return;
    }
}

// 已遇到 </, 进入结束标签
function endTagOpen(c) {
    if (c.match(letterRegex)) {
        t('endTag');
        // 若遇到字母, 则开始解析 tag 名, 且将当前 c 再处理一遍
        return tagName(c);
    } else if (c === '>') {
    } else if (c == EOF) {
    } else {
    }
}

// 准备开始或正在解析 tag name
function tagName(c) {
    if (c.match(emptyRegex)) {
        // tag name 后出现空白符, 说明要处理属性了
        return beforeAttributeName;
    } else if (c == '/') {
        // tag name 后出现 /, 说明是自封闭标签
        return selfClosingStartTag;
    } else if (c.match(letterRegex)) {
        currentToken.tagName += c;
        // 继续 tagName
        return tagName;
    } else if (c === '>') {
        emit(currentToken);
        // 处理完一个完整的 tag, 回到 data
        return data;
    } else {
        currentToken.tagName += c;
        return tagName;
    }
}

// 准备开始匹配属性名
function beforeAttributeName(c) {
    if (c.match(emptyRegex)) {
        // 没等到属性名, 继续等
        return beforeAttributeName;
    } else if (c === '/' || c === '>' || c == EOF) {
        return afterAttributeName(c);
    } else if (c === '=') {

    } else {
        a();
        return attributeName(c);
    }
}

// 已匹配到属性名的一部分，正在继续匹配属性名
function attributeName(c) {
    if (c.match(emptyRegex) || c === '/' || c === '>' || c == EOF) {
        return afterAttributeName(c);
    } else if (c === '=') {
        return beforeAttributeValue;
    } else if (c === '\u0000') {

    } else if (c === '"' || c === '\'' || c === '<') {

    } else {
        currentAttribute.name += c;
        return attributeName;
    }
}

// 已匹配到等号，准备开始匹配属性值
function beforeAttributeValue(c) {
    if (c.match(emptyRegex) || c === '/' || c === '>' || c == EOF) {
        return afterAttributeValue;
    } else if (c === '"') {
        return doubleQuotedAttributeValue;
    } else if (c === '\'') {
        return singleQuotedAttributeValue;
    } else {
        return unquotedAttributeValue(c);
    }
}

function doubleQuotedAttributeValue(c) {
    if (c === '"') {
        currentToken[currentAttribute.name] = currentAttribute.value;
        return afterQuotedAttributeValue;
    } else if (c === '\u0000') {

    } else if (c == EOF) {

    } else {
        currentAttribute.value += c;
        return doubleQuotedAttributeValue;
    }
}

function singleQuotedAttributeValue(c) {
    if (c === '\'') {
        currentToken[currentAttribute.name] = currentAttribute.value;
        return afterQuotedAttributeValue;
    } else if (c === '\u0000') {
        
    } else if (c == EOF) {
        
    } else {
        currentAttribute.value += c;
        return singleQuotedAttributeValue;
    }
}

// 已匹配到结束引号
function afterQuotedAttributeValue(c) {
    if (c.match(emptyRegex)) {
        // 遇到空格，可能为下一个属性
        return beforeAttributeName;
    } else if (c === '/') {
        return selfClosingStartTag;
    } else if (c === '>') {
        // 下面这句是不是有点多余，先注释掉
        // currentToken[currentAttribute.name] = currentAttribute.value;
        emit(currentToken);
        return data;
    } else if (c == EOF) {
        return;
    } else {
        // 下边这句显然有问题
        currentAttribute.value += c;
        return doubleQuotedAttributeValue;
    }
}

// 已匹配到等号, 且下一个字符不是引号
function unquotedAttributeValue(c) {
    if (c.match(emptyRegex)) {
        currentToken[currentAttribute.name] = currentAttribute.value;
        return beforeAttributeName;
    } else if (c === '/') {
        currentToken[currentAttribute.name] = currentAttribute.value;
        return selfClosingStartTag;
    } else if (c === '>') {
        currentToken[currentAttribute.name] = currentAttribute.value;
        emit(currentToken);
        return data;
    } else if (c === '\u0000') {

    } else if (c === '"' || c === '\'' || c === '<' || c === '=' || c === '`') {

    } else if (c == EOF) {
        return;
    } else {
        // 正常处理 value
        currentAttribute.value += c;
        return unquotedAttributeValue;
    }
}

// 已经发现是一个自封闭标签, 只等 >
function selfClosingStartTag(c) {
    if (c === '>') {
        currentToken.isSelfClosing = true;
        emit(currentToken);
        return data;
    } else if (c == EOF) {
    } else {
    }
}

// 准备, 或正在匹配属性名时即将遇到一些特定字符, 表示属性名匹配结束
function afterAttributeName(c) {
    if (c.match(emptyRegex)) {
        return afterAttributeName;
    } else if (c === '/') {
        return selfClosingStartTag;
    } else if (c === '=') {
        return beforeAttributeValue;
    } else if (c === '>') {
        currentToken[currentAttribute.name] = currentAttribute.value;
        emit(currentToken);
        return data;
    } else if (c == EOF) {

    } else {
        currentToken[currentAttribute.name] = currentAttribute.value;
        a();
        return attributeName(c);
    }
}

module.exports.parseHTML = function parseHTML(html) {
    let state = data;
    for (let c of html) {
        state = state(c);
    }
    state = state(EOF);
    return stack[0];
}