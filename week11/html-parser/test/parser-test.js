const assert = require('assert');

import { parseHTML } from "../src/parser.js";

describe("parse html:", function () {
    {
        let caseName = "<a></a>";
        it(caseName, function () {
            let tree = parseHTML(caseName);
            assert.strictEqual(tree.children[0].tagName, "a");
            assert.strictEqual(tree.children[0].children.length, 0);
        });
    }

    {
        let caseName = "<a href=\"//time.geekbang.org\"></a>";
        it(caseName, function () {
            let tree = parseHTML(caseName);
            assert.strictEqual(tree.children[0].tagName, "a");
            assert.strictEqual(tree.children.length, 1);
            assert.strictEqual(tree.children[0].children.length, 0);
        });
    }

    {
        let caseName = "<a href ></a>";
        it(caseName, function () {
            let tree = parseHTML(caseName);
            assert.strictEqual(tree.children[0].tagName, "a");
            assert.strictEqual(tree.children.length, 1);
            assert.strictEqual(tree.children[0].children.length, 0);
        });
    }

    {
        let caseName = "<a href id></a>";
        it(caseName, function () {
            let tree = parseHTML(caseName);
            assert.strictEqual(tree.children[0].tagName, "a");
            assert.strictEqual(tree.children.length, 1);
            assert.strictEqual(tree.children[0].children.length, 0);
        });
    }

    {
        let caseName = "<a href=\"abc\" id></a>";
        it(caseName, function () {
            let tree = parseHTML(caseName);
            assert.strictEqual(tree.children[0].tagName, "a");
            assert.strictEqual(tree.children.length, 1);
            assert.strictEqual(tree.children[0].children.length, 0);
        });
    }

    {
        let caseName = "<a id=abc ></a>";
        it(caseName, function () {
            let tree = parseHTML(caseName);
            assert.strictEqual(tree.children[0].tagName, "a");
            assert.strictEqual(tree.children.length, 1);
            assert.strictEqual(tree.children[0].children.length, 0);
        });
    }

    {
        let caseName = "<a id=abc />";
        it(caseName, function () {
            let tree = parseHTML(caseName);
            assert.strictEqual(tree.children[0].tagName, "a");
            assert.strictEqual(tree.children.length, 1);
            assert.strictEqual(tree.children[0].children.length, 0);
        });
    }

    {
        let caseName = "<a id='abc' />";
        it(caseName, function () {
            let tree = parseHTML(caseName);
            assert.strictEqual(tree.children[0].tagName, "a");
            assert.strictEqual(tree.children.length, 1);
            assert.strictEqual(tree.children[0].children.length, 0);
        });
    }

    {
        let caseName = "<a />";
        it(caseName, function () {
            let tree = parseHTML(caseName);
            assert.strictEqual(tree.children[0].tagName, "a");
            assert.strictEqual(tree.children.length, 1);
            assert.strictEqual(tree.children[0].children.length, 0);
        });
    }

    {
        let caseName = "<INPUT />";
        it(caseName, function () {
            let tree = parseHTML(caseName);
            assert.strictEqual(tree.children[0].tagName, "INPUT");
            assert.strictEqual(tree.children.length, 1);
            assert.strictEqual(tree.children[0].children.length, 0);
        });
    }

    {
        let caseName = "<>";
        it(caseName, function () {
            let tree = parseHTML(caseName);
            assert.strictEqual(tree.children.length, 1);
            assert.strictEqual(tree.children[0].type, "text");
        });
    }
});