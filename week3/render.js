const images = require('images');

function render(viewport, element) {
    if (element.style) {
        var img = images(element.style.width, element.style.height);

        if (element.style['background-color']) {
            let color = element.style['background-color'];
            let match = color.match(/rgb\((\d+),\s*(\d+),\s*(\d+)\)/);
            var r = Number(match[1]);
            var g = Number(match[2]);
            var b = Number(match[3]);
            img.fill(r, g, b, 1);
            viewport.draw(img, element.style.left || 0, element.style.top || 0);
        }
    }

    if (element.children) {
        for (var child of element.children) {
            render(viewport, child);
        }
    }
}

module.exports = render;