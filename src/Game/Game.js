import { createCamera } from './components/camera.js';
import { createLights } from './components/lights.js';
import { createScene } from './components/scene.js';
import { createSphere } from './components/sphere.js';
import { createGround } from './components/ground.js';
import { createWorld } from './components/world.js';
import { createCircle } from './components/circle.js';

import { createControls } from './systems/controls.js';
import { createRenderer } from './systems/renderer.js';
import { Resizer } from './systems/Resizer.js';
import { Loop } from './systems/Loop.js';

let camera;
let renderer;
let scene;
let world;
let loop;

class Game {
  constructor(container) {
    camera = createCamera();
    scene = createScene();
    renderer = createRenderer();
    world = createWorld();
    loop = new Loop(camera, scene, renderer, world);
    container.append(renderer.domElement);

    const light = createLights();
    scene.add(light);

    var planes = [
      [{x:30,y:1,z:30},{x:0,y:-10,z:0}],
      [{x:30,y:1,z:30},{x:0,y:10,z:0}],
      [{x:1,y:30,z:30},{x:-10,y:0,z:0}],
      [{x:1,y:30,z:30},{x:10,y:0,z:0}],
      [{x:30,y:30,z:1},{x:0,y:0,z:-10}],
      [{x:30,y:30,z:1},{x:0,y:0,z:10}]
    ];

    var ground;
    for(var p = 0;p<planes.length;p++){
      ground = createGround(planes[p][0],planes[p][1]);
      scene.add(ground.threejs);
      world.addBody(ground.cannonjs);
      loop.bodydatatables.push(ground.cannonjs);
    }

    var circle = createCircle();
    scene.add(circle.threejs);
    loop.updatables.push(circle.threejs);

    var spheres = this.generateSpheres(ground);

    this.run(spheres);

    setInterval(()=>{
      this.run(spheres);
    }, 25000);

    createControls(camera, container);
    
    const resizer = new Resizer(container, camera, renderer);
    // resizer.onResize = () => {
    //   this.render();
    // };
  }

  generateSpheres(ground){
    var spheres = [];
    for(var i=0;i<document.getElementById("ballset").value;i++){
      var sphere = createSphere(i+1);
      scene.add(sphere.threejs);
      world.addBody(sphere.cannonjs);
      loop.updatables.push(sphere.threejs);
      loop.bodydatatables.push(sphere.cannonjs);
      var mat_ground2 = new CANNON.ContactMaterial(ground.material, sphere.material, { friction: 0.0, restitution: 0.9 });
      world.addContactMaterial(mat_ground2);
      spheres.push(sphere);
    }
    return spheres;
  }

  run(spheres){
    var elements = document.getElementsByClassName('circle6');

    // reset before starting run
    for (let i = 0; i < elements.length; i++) {
      var element = elements[i];
      element.classList.add('circle6-animate');
      element.classList.remove('circle6-draw');
      element.innerHTML = '&nbsp;';
    }
    for(var j=0;j<spheres.length;j++){
      spheres[j].cannonjs.reset();
    }
  
    // animate results
    var results = [];
    for (let i = 1; i <= elements.length; i++) {
      setTimeout(() => { 
        var sphere_num = Math.floor(Math.random() * (1 - spheres.length) + (spheres.length));
        
        while(results.indexOf(sphere_num)>=0){
          sphere_num = Math.floor(Math.random() * (1 - spheres.length) + (spheres.length));
        }

        results.push(sphere_num);

        spheres[sphere_num-1].cannonjs.result();

        setTimeout(()=>{
          var elements = document.getElementsByClassName('circle6-animate'+i);
          var requiredElement = elements[0];
          requiredElement.classList.remove('circle6-animate');
          requiredElement.classList.add('circle6-draw');
          requiredElement.innerHTML = sphere_num;
        },2500);
  
       }, i*3000);
    }
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
