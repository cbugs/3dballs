function createLights() {
  // Create a directional light
  const light = new THREE.DirectionalLight('white', 8);

  // move the light right, up, and towards us
  light.position.set(40, 40, 40);

  return light;
}

export { createLights };
