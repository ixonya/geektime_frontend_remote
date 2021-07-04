const EOF = Symbol('EOF');

const emptyRegex = /^[\t\n\f ]$/;
const letterRegex = /^[a-zA-Z]$/;

let currentToken;
let currentAttribute;

let stack;
// 当前正在处理的文本节点, 文本的每个字符会依次追加至节点中
let currentTextNode;

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
                //layout(top);
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
        return data;
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
        throw new Error("unexpected character \"" + c + "\"");
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

export function parseHTML(html) {
    currentToken = null;
    currentAttribute = null;
    stack = [{type: 'document', children:[]}];
    currentTextNode = null;
    let state = data;
    for (let c of html) {
        state = state(c);
    }
    state = state(EOF);
    return stack[0];
}