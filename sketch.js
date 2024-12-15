
// using instance mode

const s = (sketch) => {
   
   
    class Particle {
      constructor(x, y, hu, firework) {
        this.firework = firework;
        this.pos = sketch.createVector(x, y);
        this.vel = sketch.createVector(0, -25);
        this.lifespan = 255;
        this.hu = hu;
        this.acc = sketch.createVector(0, 0);
  
        if (this.firework) {
          this.vel = sketch.createVector(0, sketch.random(-15, -10));
        } else {
          this.vel = p5.Vector.random2D();
          this.vel.mult(sketch.random(2, 10));
        }
      }
  
      applyForce(force) {
        this.acc.add(force);
      }
  
      update() {
        if (!this.firework) {
          this.vel.mult(0.9);
          this.lifespan -= 4;
        }
        this.vel.add(this.acc);
        this.pos.add(this.vel);
        this.acc.set(0, 0);
      }
  
      isDone() {
        return this.lifespan < 0;
      }
  
      show() {
        sketch.colorMode(sketch.HSB); // Use sketch.HSB here as well
        if (!this.firework) {
          sketch.strokeWeight(5);
          sketch.stroke(this.hu, 255, 255, this.lifespan);
        } else {
          sketch.strokeWeight(5);
          sketch.stroke(this.hu, 255, 255);
        }
        sketch.point(this.pos.x, this.pos.y);
      }
    }

    class FireWork {
        constructor() {
          this.hu = sketch.random(255);
          this.firework = new Particle(sketch.random(sketch.width), sketch.height, this.hu, true);
          this.exploded = false;
          this.particles = [];
        }
    
        isDone() {
          return this.exploded && this.particles.length === 0;
        }
    
        update() {
          if (!this.exploded) {
            this.firework.applyForce(gravity);
            this.firework.update();
    
            if (this.firework.vel.y >= 0) {
              this.exploded = true;
              this.explode();
            }
          }
    
          for (let i = this.particles.length - 1; i >= 0; i--) {
            this.particles[i].applyForce(gravity);
            this.particles[i].update();
            if (this.particles[i].isDone()) {
              this.particles.splice(i, 1);
            }
          }
        }
    
        explode() {
          for (let i = 0; i < 100; i++) {
            const p = new Particle(this.firework.pos.x, this.firework.pos.y, this.hu, false);
            this.particles.push(p);
          }
        }
    
        show() {
          if (!this.exploded) {
            this.firework.show();
          }
          for (let i = 0; i < this.particles.length; i++) {
            this.particles[i].show();
          }
        }
      }

      let fireworks = [];
      let gravity;
    
      sketch.setup = () => {
        document.body.style['userSelect'] = 'none';
        let c = sketch.createCanvas(sketch.windowWidth, sketch.windowHeight);
       
        c.position(0, 0);
        c.style('pointer-events', 'none');
        // fix it to viewport
        c.style('position', 'fixed'); 
        sketch.colorMode(sketch.HSB); // Use sketch.HSB instead of HSB
        sketch.stroke(255);
        sketch.strokeWeight(4);
        gravity = sketch.createVector(0, 0.2);
        sketch.clear();
      };
    
      sketch.draw = () => {
        sketch.clear()
        sketch.colorMode(sketch.RGB); // Use sketch.RGB instead of RGB
    
        if (sketch.random(1) < 0.04) {
          fireworks.push(new FireWork());
        }
    
        for (let i = fireworks.length - 1; i >= 0; i--) {
          fireworks[i].update();
          fireworks[i].show();
          // if firework is over remove it from the fireworks array
          if (fireworks[i].isDone()) {
            fireworks.splice(i, 1);
          }
        }
      };
   
  };
  
  new p5(s);
  