import { createCamera } from './components/camera.js';
import { createLights } from './components/lights.js';
import { createScene } from './components/scene.js';
import { createSphere } from './components/sphere.js';
import { createGround } from './components/ground.js';
import { createWorld } from './components/world.js';
import { createCircle } from './components/circle.js';
import { createBorder } from './components/border.js';
import { createResult } from './components/results.js';

import { createRenderer } from './systems/renderer.js';
import { Resizer } from './systems/Resizer.js';
import { Loop } from './systems/Loop.js';

let camera;
let renderer;
let scene;
let world;
let loop;
let spheres;
let posis;
let sresult = [];
let pickResults = [];
let results = [];

let circle;

class Game {
  constructor(container) {
    camera = createCamera();
    scene = createScene();
    renderer = createRenderer();
    world = createWorld();
    loop = new Loop(camera, scene, renderer, world);
    container.append(renderer.domElement);
    camera.lookAt(scene.position);


    var light;

    light = new THREE.DirectionalLight('white', 3);
    light.position.set(12,12,12);
    scene.add(light);

    light = new THREE.DirectionalLight('white', 2);
    light.position.set(-12,-12,12);
    scene.add(light);

    var ground = createGround({x:30,y:30,z:1},{x:0,y:0,z:-2});
    scene.add(ground.threejs);
    world.addBody(ground.cannonjs);
    loop.bodydatatables.push(ground.cannonjs);

    ground = createGround({x:30,y:30,z:1},{x:0,y:0,z:2});
    scene.add(ground.threejs);
    world.addBody(ground.cannonjs);
    loop.bodydatatables.push(ground.cannonjs);

    var r = 13.5;
    for(var i=0;i<=360;i++){
      var x = r * Math.sin(i);
      var y = r * Math.cos(i);
      ground = createGround({x:1,y:1,z:4},{x:x,y:y,z:0},0.0);
      scene.add(ground.threejs);
      world.addBody(ground.cannonjs);
      loop.bodydatatables.push(ground.cannonjs);
    }

 

    circle = createCircle();
    scene.add(circle.threejs);
    loop.updatables.push(circle.threejs);
    

    const material = new THREE.MeshPhysicalMaterial({
        metalness: 0.1,
        roughness: 0.1,
        transparent: true,
        transmission: 1.0
    });

    const geometry = new THREE.RingGeometry( 13, 13.5, 360 );
    const circle2 = new THREE.Mesh( geometry, material );
    scene.add( circle2 );

    spheres = [];
    var ballset = [1,40];
    if(getAllUrlParams().ballset != undefined){
      ballset = JSON.parse(getAllUrlParams().ballset);
    }
    for(var i=parseInt(ballset[0])-1;i<parseInt(ballset[1]);i++){
      var sphere = createSphere(i+1);
      scene.add(sphere.threejs);
      world.addBody(sphere.cannonjs);
      loop.updatables.push(sphere.threejs);
      loop.bodydatatables.push(sphere.cannonjs);
      var mat_ground2 = new CANNON.ContactMaterial(ground.material, sphere.material, { friction: 0.0, restitution: 1 });
      world.addContactMaterial(mat_ground2);
      spheres.push(sphere);
    }

    pickResults = [1,2,3,4,5,6];

    if(getAllUrlParams().results != undefined){
      pickResults = JSON.parse(getAllUrlParams().results);
    }
    
    posis = [];

    var totalPoints = pickResults.length;

    for (var i = 1; i <= totalPoints  ; i++) {
        posis.push(drawPoint(16, i, totalPoints));
    }
    
    function drawPoint(r, currentPoint, totalPoints) {  
        var theta = ((Math.PI*2) / totalPoints);
        var angle = (theta * currentPoint);

        return {x: (r * Math.cos(angle)), y: (r * Math.sin(angle))};
    }


    // posis = [
    //   {x:-15,y:10},
    //   {x:-18,y:0},
    //   {x:-15,y:-10},
    //   {x:15,y:10},
    //   {x:18,y:0},
    //   {x:15,y:-10}
    // ];

    const textureLoader = new THREE.TextureLoader();
    const texture = textureLoader.load(
        '/assets/textures/cglass2.png',
    );

    new THREE.MeshBasicMaterial( { color: 0xffff00, wireframe: true } );
    const bmaterial = new THREE.MeshBasicMaterial({
        map: texture,
        transparent: true,
    });

    for(var p=0;p<posis.length;p++){
      var pgeometry = new THREE.RingGeometry( 0, 2, 360 );

      var pcircle2 = new THREE.Mesh( pgeometry, bmaterial );


      pcircle2.castShadow = true; 
      pcircle2.receiveShadow = false; 

      pcircle2.position.z=15;
      pcircle2.position.x=posis[p].x;
      pcircle2.position.y=posis[p].y;
      scene.add( pcircle2 );
    }

    circle.threejs.draw(false);
    for(var s=0;s<spheres.length;s++){
      spheres[s].cannonjs.draw(false);
    }

    setTimeout(()=>{
      this.result();
    },5500);

  
    let viewSize = 80;

    window.addEventListener('resize', ()=>{
      if(window.innerWidth>450){
        viewSize = 50;
      }
      var aspect = window.innerWidth / window.innerHeight;
      camera.left = -aspect * viewSize / 2;
      camera.right = aspect * viewSize  / 2;
      camera.top = viewSize / 2;
      camera.bottom = -viewSize / 2;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    }, false);
  }


  result(){
    circle.threejs.draw(true);
    for(var s=0;s<spheres.length;s++){
      spheres[s].cannonjs.draw(true);
    }
    for(var r=0;r<sresult.length;r++){
      scene.remove( sresult[r].threejs );
    }
    sresult = [];
    results = [];


    let numresults = pickResults.length;
    setTimeout(()=>{
      // return false;
      for (let i = 1; i <= numresults; i++) {
        setTimeout(() => { 
          // var sphere_num = Math.floor(Math.random() * (1 - 40) + (40));
          // while(results.includes(sphere_num)){
          //   sphere_num = Math.floor(Math.random() * (1 - 40) + (40));
          // }
          var sphere_num = pickResults[i-1];
          results.push(sphere_num);
  
          let sphere = createResult(sphere_num,posis[i-1].x,posis[i-1].y);
          sphere.name = 'result_'+sphere_num
          sresult.push(sphere);
          scene.add(sphere.threejs);
          loop.updatables.push(sphere.threejs);

          if(i==numresults){
            setTimeout(()=>{
              circle.threejs.draw(false);
              for(var s=0;s<spheres.length;s++){
                spheres[s].cannonjs.draw(false);
              }
              setTimeout(()=>{
                // this.result();
              },4000)
            },2000);
          }
  
         }, i*3000);
    }
    },4000)
  }

  render() {
    renderer.render(scene, camera);
  }

  start() {
    loop.start();
  }

  stop() {
    loop.stop();
  }
}

export { Game };
