function createControls(camera, canvas) {
    const controls = new THREE.OrbitControls(camera, canvas);
    controls.enableDamping = true;
    controls.enableRotate = false;
    controls.enableZoom = false;
    controls.enablePan = false;
    controls.tick = () => controls.update();
    
    return controls;
}

export { createControls };