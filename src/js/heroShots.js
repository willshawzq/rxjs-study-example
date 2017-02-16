import Rx from 'rx';
import {canvas, HERO_Y, SHOOTING_SPEED, SCORE_INCREASE} from './values';
import {SpaceShip} from './heroShip';
import {drawTriangle, collision} from './util';
import {ScoreSubject} from './score';

let playerFiring = Rx.Observable
    .merge(
        Rx.Observable.fromEvent(canvas, 'click'),
        Rx.Observable.fromEvent(canvas, 'keydown').filter(ev => ev.keycode === 32)
    )
    .sample(200)
    .timestamp();

export let HeroShots = Rx.Observable
    .combineLatest(
        playerFiring, SpaceShip,
        (shotEvents, spaceShip) => ({
            x: spaceShip.x,
            timestamp: shotEvents.timestamp
        })
    )
    .distinctUntilChanged(shot => shot.timestamp)
    .scan(function(shotArr, shot) {
        shotArr.push({
            x: shot.x,
            y: HERO_Y
        });
        return shotArr;
    }, []);

export function paintHeroShots(heroShots, enemies) {
    heroShots.forEach(function(shot) {
        for(let i = 0; i < enemies.length; i++) {
            let enemy = enemies[i];
            if(!enemy.isDead && collision(shot, enemy)) {
                enemy.isDead = true;
                shot.x = shot.y = -100;
                ScoreSubject.onNext(SCORE_INCREASE);
                break;
            }
        }
        shot.y -= SHOOTING_SPEED;
        drawTriangle(shot.x, shot.y, 5, '#ffff00', 'up');
    })
}