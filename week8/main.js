import {Component, createElement} from "./framework.js"
import {Carousel} from "./carousel.js"
import {Timeline, Animation} from "./animation.js"

let d = [
    "https://news.fate-go.jp/wp-content/uploads/2021/re_2020summer_pgtwo/top_banner.png",
    "https://news.fate-go.jp/wp-content/uploads/2020/holy_grail_war_full_rehvk/top_banner.png",
    "https://news.fate-go.jp/wp-content/uploads/2019/fate-15th_cp_xpdai/top_banner.png",
    "https://news.fate-go.jp/wp-content/uploads/2020/5th_anniversary_eklac/top_banner.png"
];

let a = <Carousel src={d} />
a.mountTo(document.body);