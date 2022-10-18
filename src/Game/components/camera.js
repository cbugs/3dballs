function createCamera() {
  const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 1, 100 );
  camera.position.set(0, 0, 30); 
  return camera;
}

export { createCamera };