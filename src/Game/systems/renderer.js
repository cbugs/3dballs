function createRenderer() {
  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true  });

  renderer.physicallyCorrectLights = true;

  renderer.setSize(window.innerWidth, window.innerHeight);

  return renderer;
}

export { createRenderer };
