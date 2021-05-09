function createLights(x,y,z,i) {
  // Create a directional light
  const light = new THREE.DirectionalLight('white', i);

  // move the light right, up, and towards us
  light.position.set(x,y,z);

  return light;
}

export { createLights };
