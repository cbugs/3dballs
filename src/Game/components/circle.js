function createMaterial() {
    const textureLoader = new THREE.TextureLoader();
    const texture = textureLoader.load(
        '/assets/textures/cglass.png',
    );
    new THREE.MeshBasicMaterial( { color: 0xffff00, wireframe: true } );
    const material = new THREE.MeshBasicMaterial({
        map: texture,
        transparent: true
    });

    return material;
}

function createCircle() {
    const geometry = new THREE.RingGeometry( 0, 13.5, 360 );
    let check = true;

    const material = createMaterial();
    const circle = new THREE.Mesh( geometry, material );
  
    const radiansPerSecond = THREE.MathUtils.degToRad(180);
    circle.tick = (delta) => {
        if(check){
            circle.rotation.z -= radiansPerSecond * delta;
        }
    };

    circle.draw = (c) => {
        check=c;
    }

    return {
        threejs: circle,
        cannonjs: null,
        material: material
    }
  }
  
  export { createCircle };