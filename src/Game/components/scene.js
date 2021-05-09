import { Color, Scene } from 'https://unpkg.com/three@0.117.0/build/three.module.js';

function createScene() {
  const scene = new THREE.Scene();

  scene.background = null;
  return scene;
}

export { createScene };
