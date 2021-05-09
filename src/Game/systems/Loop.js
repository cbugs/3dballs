const clock = new THREE.Clock();

class Loop {
  constructor(camera, scene, renderer, world) {
    this.camera = camera;
    this.scene = scene;
    this.renderer = renderer;
    this.world = world;
    this.updatables = [];
    this.bodydatatables = [];
  }

  start() {
    this.renderer.setAnimationLoop(() => {
      
      // tell every animated object to tick forward one frame
      this.tick();
      
      // Step the physics world
      this.world.step(1/60);

      this.updatePhysics();
      
      // render a frame
      this.renderer.render(this.scene, this.camera);

    });
  }

  stop() {
    this.renderer.setAnimationLoop(null);
  }

  tick() {
    // only call the getDelta function once per frame!
    const delta = clock.getDelta();
    for (const object of this.updatables) {
      object.tick(delta);
    }
  }

  updatePhysics() {
    for (const object of this.bodydatatables) {
      object.updatePhysics();
    }
  }
}

export { Loop };
