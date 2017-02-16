import Rx from 'rx';
import {SPEED} from './values';
import {StarStream, paintStars} from './starField';
import {SpaceShip, paintSpaceShip} from './heroShip';
import {Enemies, paintEnemies} from './enemy';
import {HeroShots, paintHeroShots} from './heroShots';
import {gameOver} from './util';
import {ScoreSubject, paintScore, score} from './score';

function renderScene(actors) {
  paintStars(actors.stars);
  paintEnemies(actors.enemies);
  paintSpaceShip(actors.spaceShip.x, actors.spaceShip.y);
  paintHeroShots(actors.heroShots, actors.enemies);
  paintScore(actors.score);
}

var Game = Rx.Observable
  .combineLatest(
    StarStream, SpaceShip, Enemies, HeroShots, score,
    function(stars, spaceShip, enemies, heroShots, score) {
      return {stars, spaceShip, enemies, heroShots, score};
    })
    .sample(SPEED)
    .takeWhile(actors => gameOver(actors.spaceShip, actors.enemies) === false)
    .subscribe(renderScene);