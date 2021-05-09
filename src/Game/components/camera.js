function createCamera() {

  let viewSize = 80;
  if(window.innerWidth>450){
    viewSize = 50;
  }

  var aspectRatio = window.innerWidth / window.innerHeight;
  var camera = new THREE.OrthographicCamera(-aspectRatio * viewSize / 2, aspectRatio * viewSize / 2, viewSize / 2, -viewSize / 2, 0.1, 1000);
  camera.position.set( 0, 0, 30 );

  return camera;
}

export { createCamera };