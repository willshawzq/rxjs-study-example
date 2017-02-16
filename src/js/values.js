export const SPEED = 40;
export const STAR_NUMBER = 250;
export const ENEMY_FREQ = 1500;
export const ENEMY_SHOOTING_FREQ = 750;
export const SHOOTING_SPEED = 15;

export const SCORE_INCREASE = 10;

export let canvas = document.createElement('canvas');
export let ctx = canvas.getContext('2d');

document.body.appendChild(canvas);
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

export const HERO_Y = canvas.height - 30;