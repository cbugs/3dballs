function createMaterial(id) {
    const textureLoader = new THREE.TextureLoader();
    const texture = textureLoader.load(
        '/assets/textures/balls/ball'+id+'.png',
    );
    const material = new THREE.MeshBasicMaterial({
        map: texture,
    });
    return material;
}

function createSphere(id) {

    var geometry = new THREE.SphereBufferGeometry(1, 50, 50);
    const material = createMaterial(id);
    let sphere = new THREE.Mesh(geometry, material);
    let resulting = false;

    var shape = new CANNON.Sphere(1);
    let sphereBody = new CANNON.Body({ mass: 1, material: material });
    sphereBody.addShape(shape);
    sphereBody.position.set(Math.random() * (5 - (-5)) + (-5),Math.random() * (5 - (-5)) + (-5),0);

    const radiansPerSecond = THREE.MathUtils.degToRad(Math.random() * (1 - 30) + 30);
    sphere.tick = (delta) => {
        if(resulting){
            sphereBody.collisionResponse = 0;
            sphereBody.position.set(0,0,3);
            var worldPoint = new CANNON.Vec3(0,0,1);
            var force = new CANNON.Vec3(0,0,500);
            sphereBody.applyForce(force,worldPoint);
            sphere.rotation.z =0;
            sphere.rotation.x += THREE.MathUtils.degToRad(180) * delta;
            sphere.rotation.y = 0;
        } else {
            sphere.rotation.z += radiansPerSecond * delta;
            sphere.rotation.x += radiansPerSecond * delta;
            sphere.rotation.y += radiansPerSecond * delta;
        }
    }

    sphereBody.updatePhysics = () => {
        var worldPoint = new CANNON.Vec3(0,0,1);
        var force = new CANNON.Vec3(0,10,200);
        sphereBody.applyForce(force,worldPoint);
        sphere.position.copy(sphereBody.position);
    }

    sphereBody.result = () => {
        resulting=true;
    }

    sphereBody.reset = () => {
        resulting = false;
        sphereBody.collisionResponse = 1;
        sphereBody.position.set(Math.random() * (5 - (-5)) + (-5),Math.random() * (5 - (-5)) + (-5),0);
        sphereBody.velocity.set(0, 0, 0);
        sphereBody.angularVelocity.set(0, 0, 0);
    }

    return {
        threejs: sphere,
        cannonjs: sphereBody,
        material: material
    }
}

export { createSphere };