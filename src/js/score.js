import Rx from 'rx';
import {ctx} from './values';

export let ScoreSubject = new Rx.BehaviorSubject(0);
export let score = ScoreSubject
    .scan((prev, cur) => prev + cur, 0);
export function paintScore(score) {
  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 26px sans-serif';
  ctx.fillText('Score: ' + score, 40, 43);
}