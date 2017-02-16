import Rx from 'rx';
import {ENEMY_FREQ, canvas, ENEMY_SHOOTING_FREQ, SHOOTING_SPEED} from './values';
import {drawTriangle, getRandomNum, isVisible} from './util';

export let Enemies = Rx.Observable
    .interval(ENEMY_FREQ)
    .scan(function(enemyArr) {
        let enemy = {
            x: parseInt(Math.random() * canvas.width),
            y: -30,
            shots: []
        };

        Rx.Observable
          .interval(ENEMY_SHOOTING_FREQ)
          .subscribe(function() {
              if(!enemy.isDead) {
                enemy.shots.push({
                    x: enemy.x,
                    y: enemy.y
                });
              }
              enemy.shots = enemy.shots.filter(isVisible);
          })

        enemyArr.push(enemy);
        return enemyArr.filter(isVisible)
            .filter(enemy => !(enemy.isDead && enemy.shots.length === 0));
    }, []);

export function paintEnemies(enemies) {
    enemies.forEach(function(enemy) {
        enemy.y += 5;
        enemy.x += getRandomNum(-15, 15);

        if(!enemy.isDead) {
            drawTriangle(enemy.x, enemy.y, 20, '#00ff00', 'down');
        }

        enemy.shots.forEach(function(shot) {
            shot.y += SHOOTING_SPEED;
            drawTriangle(shot.x, shot.y, 5, '#00ffff', 'down');
        })
    });
}