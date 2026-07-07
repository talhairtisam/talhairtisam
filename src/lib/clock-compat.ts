/**
 * Drop-in replacement for deprecated THREE.Clock (r183+).
 * Re-exported as `Clock` from `src/lib/three-shim.ts` for @react-three/fiber.
 */
export class ClockCompat {
  autoStart = true;
  startTime = 0;
  oldTime = 0;
  elapsedTime = 0;
  running = false;
  private lastTime = 0;

  constructor(autoStart = true) {
    this.autoStart = autoStart;
  }

  start() {
    this.startTime = performance.now();
    this.oldTime = this.startTime;
    this.lastTime = this.startTime;
    this.elapsedTime = 0;
    this.running = true;
  }

  stop() {
    this.getElapsedTime();
    this.running = false;
    this.autoStart = false;
  }

  getElapsedTime() {
    this.getDelta();
    return this.elapsedTime;
  }

  getDelta() {
    if (this.autoStart && !this.running) {
      this.start();
      return 0;
    }

    if (!this.running) return 0;

    const now = performance.now();
    const diff = (now - this.lastTime) / 1000;
    this.lastTime = now;
    this.oldTime = now;
    this.elapsedTime += diff;
    return diff;
  }
}
