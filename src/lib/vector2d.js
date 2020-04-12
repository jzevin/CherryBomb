export default class Vector2d {
  constructor(x = 0, y = 0) {
    this.x = x;
    this.y = y;
  }
  add(v2d) {
    this.x += v2d.x;
    this.y += v2d.y;
    return this;
  }
  sub(v2d) {
    this.x -= v2d.x;
    this.y -= v2d.y;
    return this;
  }
  mult(n) {
    this.x *= n;
    this.y *= n;
    return this;
  }
  div(n) {
    this.x /= n;
    this.y /= n;
    return this;
  }
  mag() {
    return Math.sqrt(this.x * this.x + this.y * this.y);
  }
  normalize() {
    const m = this.mag();
    if (m !== 0) {
      this.div(m);
    }
    return this;
  }
  limit(h, l) {
    const high = h || null,
      low = l || null;
    if (high && this.mag() > high) {
      this.normalize();
      this.mult(high);
    }
    if (low && this.mag() < low) {
      this.normalize();
      this.mult(low);
    }
    return this;
  }
  zero() {
    this.x = 0;
    this.y = 0;
    return this;
  }
  copy() {
    return new Vector2d(this.x, this.y);
  }
  rotate(angle) {
    const nx = this.x * Math.cos(angle) - this.y * Math.sin(angle);
    const ny = this.x * Math.sin(angle) + this.y * Math.cos(angle);
    this.x = nx;
    this.y = ny;
    return this;
  }
  rotateDeg(deg) {
    return this.rotate(Vector2d.deg2rad(deg));
  }
  heading() {
    return Math.atan2(this.y, this.x);
  }
  angleBetween(v2d) {
    return Math.atan2(v2d.y - this.y, v2d.x - this.x);
  }
  angleTo(v2d, angleOffset = 0) {
    return Math.atan2(v2d.y - this.y, v2d.x - this.x) + angleOffset;
  }
  dot(v2d) {
    return this.x * (v2d.x || 0) + this.y * (v2d.y || 0);
  }
  lerpTo(v2d, t) {
    const lx = Vector2d.lerp(this.x, v2d.x, t);
    const ly = Vector2d.lerp(this.y, v2d.y, t);
    return new Vector2d(lx, ly);
  }
  static lerp(a, b, t) {
    return a + (b - a) * t;
  }
  static rad2deg(rad) {
    return rad * (180 / Math.PI);
  }
  static deg2rad(deg) {
    return deg / (180 / Math.PI);
  }
}
