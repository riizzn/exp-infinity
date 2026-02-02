// TouchTexture.js
import * as THREE from "three";

export class TouchTexture {
  constructor(size = 64) {
    this.size = size;
    this.width = this.height = size;
    this.maxAge = 64;
    this.radius = 0.25 * size;
    this.speed = 1 / this.maxAge;
    this.trail = [];
    this.last = null;

    this.canvas = document.createElement("canvas");
    this.canvas.width = this.width;
    this.canvas.height = this.height;
    this.ctx = this.canvas.getContext("2d");

    this.ctx.fillStyle = "black";
    this.ctx.fillRect(0, 0, this.width, this.height);

    this.texture = new THREE.Texture(this.canvas);
  }

  update() {
    this.ctx.fillStyle = "black";
    this.ctx.fillRect(0, 0, this.width, this.height);

    for (let i = this.trail.length - 1; i >= 0; i--) {
      const p = this.trail[i];
      const f = p.force * this.speed * (1 - p.age / this.maxAge);

      p.x += p.vx * f;
      p.y += p.vy * f;
      p.age++;

      if (p.age > this.maxAge) {
        this.trail.splice(i, 1);
      } else {
        this.drawPoint(p);
      }
    }

    this.texture.needsUpdate = true;
  }

  addTouch({ x, y }) {
    let force = 0, vx = 0, vy = 0;

    if (this.last) {
      const dx = x - this.last.x;
      const dy = y - this.last.y;
      const d = Math.sqrt(dx * dx + dy * dy) || 1;

      vx = dx / d;
      vy = dy / d;
      force = Math.min(d * d * 20000, 2);
    }

    this.last = { x, y };
    this.trail.push({ x, y, age: 0, force, vx, vy });
  }

  drawPoint(p) {
    const x = p.x * this.width;
    const y = (1 - p.y) * this.height;

    this.ctx.beginPath();
    this.ctx.fillStyle = "red";
    this.ctx.arc(x, y, this.radius, 0, Math.PI * 2);
    this.ctx.fill();
  }
}
