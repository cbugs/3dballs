function createGround(size, position, opacity=0.0) {
    // ground
    var groundGeometry = new THREE.BoxGeometry(size.x,size.y,size.z);
    var groundMaterial = new THREE.MeshBasicMaterial( { color: 0xcccccc, side: THREE.DoubleSide, opacity: opacity, transparent: true, depthWrite: false } );
    var ground = new THREE.Mesh(groundGeometry, groundMaterial);
    ground.receiveShadow = true;

    // ground body
    var groundShape = new CANNON.Box(new CANNON.Vec3(size.x,size.y,size.z));
    var groundBody = new CANNON.Body({ mass: 0, material: groundMaterial });
    groundBody.addShape(groundShape);
    groundBody.position.set(position.x,position.y,position.z);

    ground.tick = (delta) => {
    };

    groundBody.updatePhysics = () => {
        ground.position.copy(groundBody.position);
        ground.quaternion.copy(groundBody.quaternion);
    }

    return {
        threejs: ground,
        cannonjs: groundBody,
        material: groundMaterial
    }
}

export { createGround };