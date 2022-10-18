function createMaterial() {
    const textureLoader = new THREE.TextureLoader();
    const texture = textureLoader.load(
        '/assets/textures/glass2.png',
    );
    
    const material = new THREE.MeshBasicMaterial({
        map: texture,
        transparent: true,
         depthWrite: false
    });
    return material;
}

function createCircle() {
    const geometry = new THREE.SphereBufferGeometry(15, 50, 50);
    const material = createMaterial();
    const circle = new THREE.Mesh( geometry, material );
  
    const radiansPerSecond = THREE.MathUtils.degToRad(30);
    circle.tick = (delta) => {
        circle.rotation.z += radiansPerSecond * delta;
        circle.rotation.x += radiansPerSecond * delta;
        circle.rotation.y += radiansPerSecond * delta;
    };

    return {
        threejs: circle,
        cannonjs: null,
        material: material
    }
  }
  
  export { createCircle };