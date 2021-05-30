class XRegExp {

    constructor(source, flag, root = 'root') {
        this.table = new Map();
        this.regexp = new RegExp(this.compileRegExp(source, root, 0).source, flag);
        //console.log(this.table);
    }

    compileRegExp(source, name, start) {
        if (source[name] instanceof RegExp) {
            return {
                source: source[name].source,
                length: 0,
            }
        }

        let length = 0;
        let regexp = source[name].replace(/\<([^>]+)\>/g, ($0, $1) => {
            this.table.set(start + length, $1);
            this.table.set($1, start + length);
            ++ length;                
            let r = this.compileRegExp(source, $1, start + length);
            length += r.length;
            return '(' + r.source + ')';
        });
        
        return {
            source: regexp,
            length: length
        }
    }

    exec(string) {
        let r = this.regexp.exec(string);
        if (r) {
            //console.log(JSON.stringify(r[0]));
            let types = [];
            for (let i = 1 ; i < r.length ; ++i) {
                if (r[i] !== void 0) {
                    r[this.table.get(i - 1)] = r[i];
                    types.push(this.table.get(i - 1));
                }
            }
        }
        return r;
    }

    get lastIndex() {
        return this.regexp.lastIndex;
    }

    set lastIndex(value) {
        return this.regexp.lastIndex = value;
    }
}

let source = {
    InputElement: "<Whitespace>|<LineTerminator>|<Comments>|<Token>",
    Whitespace: / /,
    LineTerminator: /\n/,
    Comments: "<MultiLineComments>|<SingleLineComments>",
    MultiLineComments: /\/\*(?:[^*]|\*(?!\/))*\*\//,
    SingleLineComments: /\/\/[^\n]*/,
    Token: "<Literal>|<Keywords>|<Identifier>|<Punctuator>",
    Literal: "<NumericLiteral>|<BooleanLiteral>|<StringLiteral>|<NullLiteral>",
    NumericLiteral: /0x[0-9A-Fa-f]+|0o[0-7]+|0b[01]+|(?:[1-9][0-9]*|0)(?:\.[0-9]*)?|\.[0-9]+/,
    BooleanLiteral: /true|false/,
    StringLiteral: /(?:"(?:[^"\n]|(?<=\\)")*")|'(?:[^'\n]|(?<=\\)')*'/,
    NullLiteral: /null/,
    Identifier: /[a-zA-Z_$][a-zA-Z_$0-9]*/,
    Keywords: /if|else|for|function|let|var|const|new|switch|case|break|continue/,
    Punctuator: /==>|===|!==|==|!=|=|\|\||\&\&|\(|\)|\[|\]|\{|\}|<|>|;|\:|,|\?|\.|\+\+|--|\+=|-=|\*=|\/=|\+|-|\*|\/|&&|\|\||!/,
}

let xregexp = new XRegExp(source, 'g', 'InputElement'); 

export function* scan(str) {
    let matched;
    while ((matched = xregexp.exec(str)) != null) {

        if (matched.Whitespace) {

        } else if (matched.LineTerminator) {
            
        } else if (matched.Comments) {
            
        } else if (matched.NumericLiteral) {
            yield {
                type: "NumericLiteral",
                value: matched[0]
            }
        } else if (matched.BooleanLiteral) {
            yield {
                type: "BooleanLiteral",
                value: matched[0]
            }
        } else if (matched.StringLiteral) {
            yield {
                type: "StringLiteral",
                value: matched[0]
            }
        } else if (matched.NullLiteral) {
            yield {
                type: "NullLiteral",
                value: null
            }
        } else if (matched.Identifier) {
            yield {
                type: "Identifier",
                name: matched[0]
            }
        } else if (matched.Keywords) {
            yield {
                type: matched[0]
            }
        } else if (matched.Punctuator) {
            yield {
                type: matched[0]
            }
        } else {
            throw new Error('unexpected token ' + r[0]);
        } 

        if (!matched[0].length) {
            break;
        }
    }

    yield {
        type: "EOF"
    }
}