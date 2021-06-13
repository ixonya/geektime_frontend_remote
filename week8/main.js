import {Component, createElement} from "./framework.js"

class Carousel extends Component {
    constructor() {
        super();
        this.attributes = Object.create(null);
    }
    setAttribute(name, value) {
        this.attributes[name] = value;
    }
    render() {
        this.root = document.createElement("div");
        this.root.classList.add("carousel");
        for (let record of this.attributes.src) {
            let child = document.createElement("div");
            child.style.backgroundImage = `url('${record}')`;
            this.root.appendChild(child);
        }

        let position = 0;

        this.root.addEventListener("mousedown", event => {
            let children = this.root.children;
            let startX = event.clientX;
            let move = event => {
                let x = event.clientX - startX;

                let current = position - Math.round((x - x % 800) / 800);

                for (let offset of [-1, 0, 1]) {
                    let pos = current + offset;
                    pos = (pos + children.length) % children.length;
                    children[pos].style.transition = "none";
                    children[pos].style.transform = `translateX(${- pos * 800 + offset * 800 + x % 800}px)`;
                }
            };
            let up = event => {
                let x = event.clientX - startX;
                position = position - Math.round(x / 800);
                for (let offset of [0, - Math.sign(Math.round(x / 800) - x + 400 * Math.sign(x))]) {
                    let pos = position + offset;
                    pos = (pos + children.length) % children.length;
                    if (offset === 0) {
                        position = pos;
                    }
                    children[pos].style.transition = "";
                    children[pos].style.transform = `translateX(${- pos * 800 + offset * 800}px)`;
                }
                document.removeEventListener("mousemove", move);
                document.removeEventListener("mouseup", up);
            }
            document.addEventListener("mousemove", move);
            document.addEventListener("mouseup", up);
        });
        /*let currentIndex = 0;
        setInterval(() => {
            let children = this.root.children;
            let nextIndex = (currentIndex + 1) % children.length;
            let current = children[currentIndex];
            let next = children[nextIndex];
            next.style.transition = "none";
            next.style.transform = `translateX(${100 - nextIndex * 100}%)`;

            setTimeout(() => {
                next.style.transition = "";
                current.style.transform = `translateX(${-100 - currentIndex * 100}%)`;
                next.style.transform = `translateX(${- nextIndex * 100}%)`;
                currentIndex = nextIndex;
            }, 16);
        }, 3000);*/
        return this.root;
    }
    mountTo(parent) {
        parent.appendChild(this.render());
    }    
}

let d = [
    "https://news.fate-go.jp/wp-content/uploads/2021/re_2020summer_pgtwo/top_banner.png",
    "https://news.fate-go.jp/wp-content/uploads/2020/holy_grail_war_full_rehvk/top_banner.png",
    "https://news.fate-go.jp/wp-content/uploads/2019/fate-15th_cp_xpdai/top_banner.png",
    "https://news.fate-go.jp/wp-content/uploads/2020/5th_anniversary_eklac/top_banner.png"
];

let a = <Carousel src={d} />
a.mountTo(document.body);