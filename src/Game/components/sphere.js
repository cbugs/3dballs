function createMaterial(id) {
    const textureLoader = new THREE.TextureLoader();
    const texture = textureLoader.load(
        '/assets/textures/balls/ball'+id+'-min.png',
    );

    const material = new THREE.MeshPhongMaterial({
        map: texture,
        shininess: 1000,
    });
    return material;
}

function createSphere(id) {

    var geometry = new THREE.SphereBufferGeometry(1.2, 60, 60);
    const material = createMaterial(id);
    let sphere = new THREE.Mesh(geometry, material);
    let check = true;

    var shape = new CANNON.Sphere(1);
    let sphereBody = new CANNON.Body({ mass: 1, material: material });
    sphereBody.addShape(shape);
    sphereBody.position.set(Math.random() * (5 - (-5)) + (-5),Math.random() * (5 - (-5)) + (-5),0);

    const radiansPerSecond = THREE.MathUtils.degToRad(Math.random() * (1 - 30) + 30);
    sphere.tick = (delta) => {

        if(!check){
        } else {
            sphere.rotation.z += radiansPerSecond * delta;
            sphere.rotation.x += radiansPerSecond * delta;
            sphere.rotation.y += radiansPerSecond * delta;
        }
    };

    sphereBody.updatePhysics = () => {
        if(check){
            sphereBody.mass = 1;
            var worldPoint = new CANNON.Vec3(0,0,1);
            var force = new CANNON.Vec3(0,100,-100);
            sphereBody.applyForce(force,worldPoint);

            var worldPoint1 = new CANNON.Vec3(0,0,-1);
            var force1 = new CANNON.Vec3(0,0,-2);
            sphereBody.applyImpulse(force1,worldPoint1);

            sphere.position.copy(sphereBody.position);
        }else{
            sphereBody.mass = 30;
            sphere.position.copy(sphereBody.position);
        }
    }

    sphereBody.draw = (c) => {
        check=c;
    }

    return {
        threejs: sphere,
        cannonjs: sphereBody,
        material: material
    }
}

export { createSphere };