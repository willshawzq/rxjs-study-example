import Rx from 'rx';
import {STAR_NUMBER, SPEED, canvas, ctx} from './values';

export let StarStream = Rx.Observable.range(1, STAR_NUMBER)
    .map(() => ({
        x: parseInt(Math.random() * canvas.width),
        y: parseInt(Math.random() * canvas.height),
        size: Math.random() * 3 + 1
    }))
    .toArray()
    .flatMap(function(starArr) {
        return Rx.Observable.interval(SPEED)
            .map(function() {
                starArr.forEach(function(star) {
                    // 如果超过可视区，重置到顶部
                    if(star.y >= canvas.height) {
                        star.y = 0;
                    }
                    star.y += 3;
                });
                return starArr;
            });
    });

export function paintStars(stars) {
    ctx.fillStyle = '#000';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = '#fff';
    stars.forEach(
        star => ctx.fillRect(star.x, star.y, star.size, star.size)
    );
}