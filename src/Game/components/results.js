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

function animate(time) {
    window.requestAnimationFrame(animate);
    TWEEN.update(time);
}
var points;

function createResult(id,xfin,yfin) {

    var geometry = new THREE.SphereBufferGeometry(1, 50, 50);
    const material = createMaterial(id);
    let sphere = new THREE.Mesh(geometry, material);
    let check = true;
    let done=false;

    var shape = new CANNON.Sphere(1);
    let sphereBody = new CANNON.Body({ mass: 1, material: material });
    sphereBody.addShape(shape);
    sphere.position.z=15;
    sphere.position.y=-5;

      
    const curve = new THREE.SplineCurve( [
        new THREE.Vector2( 0, -10 ),
        new THREE.Vector2( -5, -5 ),
        new THREE.Vector2( -5, 0 ),
        new THREE.Vector2( 0, 0 )
    ] );
    
    points = curve.getPoints( 50 );

    var tween = new TWEEN.Tween({ v:0, z:15, s:1, r:0 })
      .to({ v: 50, z:15, s:13, r:180 }, 1000)
      .onUpdate(function() {
        sphere.position.z = this.z;
        sphere.position.y = points[Math.floor(this.v)].y;
        sphere.position.x = points[Math.floor(this.v)].x;
        sphere.scale.z = this.s;
        sphere.scale.y = this.s;
        sphere.scale.x = this.s;
        sphere.rotation.y = THREE.MathUtils.degToRad(this.r);
        
      })
      .start().onComplete(() => {

        setTimeout(()=>{
            new TWEEN.Tween({ x: 0, y: 0, z:15, s:13 })
            .to({ x: xfin, y: yfin, z:15, s:2.5 }, 1000)
            .onUpdate(function() {
                sphere.position.z = this.z;
                sphere.position.y = this.y;
                sphere.position.x = this.x;
                sphere.scale.z = this.s;
                sphere.scale.y = this.s;
                sphere.scale.x = this.s;
              })
              .start()
        },300);
 
    });

    animate();

    sphere.tick = (delta) => {
        sphereBody.collisionResponse = 0;
    };

    sphereBody.updatePhysics = () => {;
    }

    sphereBody.draw = () => {
    }

    return {
        threejs: sphere,
        cannonjs: sphereBody,
        material: material
    }
}

export { createResult };