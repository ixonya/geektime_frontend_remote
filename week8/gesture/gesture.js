export class Dispatcher {
    constructor(element) {
        this.element = element;
    }
    dispatch(type, properties) {
        let event = new Event(type);
        for (let name in properties) {
            event[name] = properties[name];
        }
        this.element.dispatchEvent(event);
    }
}

export class Listener {
    constructor(element, recognizer) {
        let isListeningMouse = false;
        let contexts = new Map();

        element.addEventListener("mousedown", (event) => {
            let context = Object.create(null);
            contexts.set("mouse" + (1 << event.button), context);
            recognizer.start(event, context);
            let mousemove = (event) => {
                let button = 1;
                while (button <= event.buttons) {
                    if (button & event.buttons) {
                        let key;
                        if (button === 2) {
                            key = 4;
                        } else if (button === 4) {
                            key = 2;
                        } else {
                            key = button;
                        }
                        let context = contexts.get("mouse" + key);
                        recognizer.move(event, context);
                    }
                    button = button << 1;
                }
            };
            let mouseup = (event) => {
                let context = contexts.get("mouse" + (1 << event.button));
                recognizer.end(event, context);
                contexts.delete("mouse" + (1 << event.button));
                if (event.buttons === 0) {
                    document.removeEventListener("mousemove", mousemove);
                    document.removeEventListener("mouseup", mouseup);
                    isListeningMouse = false;
                }
            };
            if (!isListeningMouse) {
                document.addEventListener("mousemove", mousemove);
                document.addEventListener("mouseup", mouseup);
                isListeningMouse = true;
            }
        });
        element.addEventListener("touchstart", (event) => {
            for (let touch of event.changedTouches) {
                let context = Object.create(null);
                contexts.set(touch.identifier, context);
                recognizer.start(touch, context);
            }
        });
        element.addEventListener("touchmove", (event) => {
            for (let touch of event.changedTouches) {
                recognizer.move(touch, contexts.get(touch.identifier));
            }
        });

        element.addEventListener("touchend", (event) => {
            for (let touch of event.changedTouches) {
                recognizer.end(touch, contexts.get(touch.identifier));
                contexts.delete(touch.identifier);
            }
        });
        element.addEventListener("touchcancel", (event) => {
            for (let touch of event.changedTouches) {
                recognizer.cancel(touch, contexts.get(touch.identifier));
                contexts.delete(touch.identifier);
            }
        });
    }
}

export class Recognizer {
    constructor(dispatcher) {
        this.dispatcher = dispatcher;
    }
    start(point, context) {
        context.startX = point.clientX;
        context.startY = point.clientY;
        context.points = [
            {
                t: Date.now(),
                x: point.clientX,
                y: point.clientY,
            },
        ];
        context.isPan = false;
        context.isTap = true;
        context.isPress = false;
        context.handler = setTimeout(() => {
            context.isPress = true;
            context.isTap = false;
            context.isPan = false;
            context.handler = null;
            this.dispatcher.dispatch("press", {});
        }, 500);
    }

    move(point, context) {
        let dx = point.clientX - context.startX;
        let dy = point.clientY - context.startY;

        context.points = context.points.filter(
            (point) => Date.now() - point.t < 500
        );
        context.points.push({
            t: Date.now(),
            x: point.clientX,
            y: point.clientY,
        });

        if (!context.isPan && dx ** 2 + dy ** 2 > 100) {
            context.isPan = true;
            context.isTap = false;
            context.isPress = false;
            context.isVertical = Math.abs(dx) < Math.abs(dy);
            this.dispatcher.dispatch("panstart", {
                startX: context.startX,
                startY: context.startY,
                clientX: point.clientX,
                clientY: point.clientY,
                isVertical: context.isVertical,
            });
            clearTimeout(context.handler);
        }

        if (context.isPan) {
            this.dispatcher.dispatch("pan", {
                startX: context.startX,
                startY: context.startY,
                clientX: point.clientX,
                clientY: point.clientY,
                isVertical: context.isVertical,
            });
        }
    }

    end(point, context) {
        if (context.isTap) {
            this.dispatcher.dispatch("tap", {});
            clearTimeout(context.handler);
        }

        if (context.isPress) {
            this.dispatcher.dispatch("pressend", {});
        }

        context.points = context.points.filter(
            (point) => Date.now() - point.t < 500
        );
        let d, v;
        if (context.points.length) {
            d = Math.sqrt(
                (point.clientX - context.points[0].x) ** 2 +
                (point.clientY - context.points[0].y) ** 2
            );
            v = d / (Date.now() - context.points[0].t);
        } else {
            v = 0;
        }
        if (v > 1.5) {
            context.isFlick = true;
            this.dispatcher.dispatch("flick", {
                startX: context.startX,
                startY: context.startY,
                clientX: point.clientX,
                clientY: point.clientY,
                isVertical: context.isVertical,
                isFlick: context.isFlick,
                velocity: v,
            });
        } else {
            context.isFlick = false;
        }

        if (context.isPan) {
            this.dispatcher.dispatch("panend", {
                startX: context.startX,
                startY: context.startY,
                clientX: point.clientX,
                clientY: point.clientY,
                isVertical: context.isVertical,
                isFlick: context.isFlick,
            });
        }
    }

    cancel(point, context) {
        clearTimeout(context.handler);
        this.dispatcher.dispatch("cancel", {});
    }
}

export function enableGesture(element) {
    new Listener(element, new Recognizer(new Dispatcher(element)));
}