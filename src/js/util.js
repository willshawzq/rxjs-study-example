import {ctx, canvas} from './values';

export function drawTriangle(x, y, width, color, direction) {
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.moveTo(x - width, y);
    ctx.lineTo(x, direction === 'up' ? y - width : y + width);
    ctx.lineTo(x + width, y);
    ctx.lineTo(x - width, y);
    ctx.fill();
}

export function getRandomNum(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function isVisible(obj) {
  return obj.x > -40 && obj.x < canvas.width + 40 &&
    obj.y > -40 && obj.y < canvas.height + 40;
}

export function collision(target1, target2) {
  return (target1.x > target2.x - 20 && target1.x < target2.x + 20) &&
         (target1.y > target2.y - 20 && target1.y < target2.y + 20);
}

export function gameOver(ship, enemies) {
    return enemies.some(function(enemy) {
        if(collision(ship, enemy)) {
            return true;
        }
        return enemy.shots.some(shot => collision(ship, shot));
    })
}