function createBorder(size, position, opacity=0.0) {
    var groundGeometry = new THREE.BoxGeometry(size.x,size.y,size.z);

    const groundMaterial = new THREE.MeshBasicMaterial({
        color: 0x008744,
        shininess: 10
    });

    var ground = new THREE.Mesh(groundGeometry, groundMaterial);
    ground.position.x = position.x;
    ground.position.y = position.y;
    ground.position.z=position.z;
    return {
        threejs: ground,
        material: groundMaterial
    }
}

export { createBorder };