import Rx from 'rx';
import {drawTriangle} from './util';
import {HERO_Y, canvas, ctx} from './values';

let mouseMove = Rx.Observable.fromEvent(canvas, 'mousemove');
export let SpaceShip = mouseMove
    .map(event => ({x: event.clientX, y: HERO_Y}))
    // this sets the first value in the Observable
    .startWith({x: canvas.width / 2, y: HERO_Y});

export function paintSpaceShip(x, y) {
    drawTriangle(x, y, 20, '#ff0000', 'up');
}