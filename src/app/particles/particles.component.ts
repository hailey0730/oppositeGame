import {
  Component,
  OnInit,
  AfterViewInit,
} from '@angular/core';
export interface particle {
  x: number;
  y: number;
  r: number;
  c: string;
  s: number;
  d: number;
}
declare global {
  interface Window { requestAnimFrame: any; }
}
@Component({
  selector: 'app-particles',
  templateUrl: './particles.component.html',
  styleUrls: ['./particles.component.scss'],
})
export class ParticlesComponent implements OnInit, AfterViewInit {
  ctx: any;
  canvas: any;
  // Configuration, Play with these
  config = {
    particleNumber: 200,
    maxParticleSize: 5,
    maxSpeed: 40,
    colorVariation: 50,
  };

  // Colors
  colorPalette = {
    bg: { r: 12, g: 9, b: 29 },
    matter: [
      { r: 106, g: 117, b: 186 }, // light blue
      { r: 44, g: 51, b: 95 }, // dark blue
      { r: 178, g: 96, b: 252 }, // purple
      { r: 237, g: 153, b: 251 }, // pink
    ],
  };
  // Some Variables hanging out
  particles: particle[] = [];
  centerX: number = 0;
  centerY: number = 0;
  constructor() {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.canvas = document.querySelector('#canvas');
    this.ctx = this.canvas.getContext('2d');

    // Set Canvas to be window size
    this.canvas.width = 123; //window.innerWidth;
    this.canvas.height = 163; //window.innerHeight;
    this.centerX = this.canvas.width / 2;
    this.centerY = this.canvas.height / 2;

    // First Frame
    this.frame();
  }

  onEvent(direction: string) {
    let x = 55;
    let y = 0;
    switch (direction) {
      case 'up':
        y = 35;
        break;
      case 'left':
        y = 75;
        break;
      case 'right':
        y = 115;
        break;
      case 'down':
        y = 155;
        break;
    }
    this.cleanUpArray();
    this.initParticles(this.config.particleNumber, x, y);
  }

  // Draws the background for the canvas, because space
  drawBg(ctx: any, color: any) {
    ctx.fillStyle = 'transparent'; //'rgb(' + color.r + ',' + color.g + ',' + color.b + ')';
    ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
  }

  // Particle Constructor
  Particle(x: number, y: number) {
    let particle: particle = {
      x: 0,
      y: 0,
      r: 0,
      c: '',
      s: 0,
      d: 0,
    };
    // X Coordinate
    particle.x = x || Math.round(Math.random() * this.canvas.width);
    // Y Coordinate
    particle.y = y || Math.round(Math.random() * this.canvas.height);
    // Radius of the space dust
    particle.r = Math.ceil(Math.random() * this.config.maxParticleSize);
    // Color of the rock, given some randomness
    particle.c = this.colorVariation(
      this.colorPalette.matter[
        Math.floor(Math.random() * this.colorPalette.matter.length)
      ],
      true
    );
    // Speed of which the rock travels
    particle.s = Math.pow(Math.ceil(Math.random() * this.config.maxSpeed), 0.7);
    // Direction the Rock flies
    particle.d = Math.round(Math.random() * 360);
    return particle;
  }

  // Provides some nice color variation
  // Accepts an rgba object
  // returns a modified rgba object or a rgba string if true is passed in for argument 2
  colorVariation(color: any, returnString: any) {
    var r, g, b, a, variation;
    r = Math.round(
      Math.random() * this.config.colorVariation -
        this.config.colorVariation / 2 +
        color.r
    );
    g = Math.round(
      Math.random() * this.config.colorVariation -
        this.config.colorVariation / 2 +
        color.g
    );
    b = Math.round(
      Math.random() * this.config.colorVariation -
        this.config.colorVariation / 2 +
        color.b
    );
    a = Math.random() + 0.5;
    if (returnString) {
      return 'rgba(' + r + ',' + g + ',' + b + ',' + a + ')';
    } else {
      return { r, g, b, a }.toString();
    }
  }

  // Used to find the rocks next point in space, accounting for speed and direction
  updateParticleModel(p: any) {
    var a = 180 - (p.d + 90); // find the 3rd angle
    p.d > 0 && p.d < 180
      ? (p.x += (p.s * Math.sin(p.d)) / Math.sin(p.s))
      : (p.x -= (p.s * Math.sin(p.d)) / Math.sin(p.s));
    p.d > 90 && p.d < 270
      ? (p.y += (p.s * Math.sin(a)) / Math.sin(p.s))
      : (p.y -= (p.s * Math.sin(a)) / Math.sin(p.s));
    return p;
  }

  // Just the function that physically draws the particles
  // Physically? sure why not, physically.
  drawParticle(x: number, y: number, r: number, c: string) {
    this.ctx.beginPath();
    this.ctx.fillStyle = c;
    this.ctx.arc(x, y, r, 0, 2 * Math.PI, false);
    this.ctx.fill();
    this.ctx.closePath();
  }

  // Remove particles that aren't on the canvas
  cleanUpArray() {
    this.particles = this.particles.filter((p: particle) => {
      return p.x > -100 && p.y > -100;
    });
  }

  initParticles(numParticles: number, x: number, y: number) {
    for (let i = 0; i < numParticles; i++) {
      this.particles.push(this.Particle(x, y));
    }
    this.particles.forEach((p: particle) => {
      this.drawParticle(p.x, p.y, p.r, p.c);
    });
  }

  // Our Frame function
  frame() {
    // Draw background first
    this.drawBg(this.ctx, this.colorPalette.bg);
    // Update Particle models to new position
    this.particles.map((p) => {
      return this.updateParticleModel(p);
    });
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    // Draw em'
    this.particles.forEach((p: particle) => {
      this.drawParticle(p.x, p.y, p.r, p.c);
    });
    // Play the same song? Ok!
    window.requestAnimationFrame(()=>this.frame());
  }
}
