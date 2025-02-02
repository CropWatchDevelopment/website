// animated-lines.js
function randomInRange(min, max) {
    return min + (max - min) * Math.random();
  }
  
  // Exported constructor
  export default function LinkedParticles(ctx) {
    const that = this;
  
    that.ctx = ctx;
    that.points = [];
    that.force_point_enabled = false;
    that.currentCursorPosition = { x: 0, y: 0 };
  
    // Background settings
    that.transparent_background = false;
    that.background_color = '#e2f7ff';
  
    // Points settings
    that.points_count = 150;
    that.point_color = '#791787';
    that.point_size = 1.5;
  
    // Motion settings
    that.velocity_ratio = 1;
    that.velocity_decay = 0.8;
    that.gravity = 0;
    that.bounce = 1;
  
    // Lines settings
    that.line_width = 0.2;
    that.line_distance = 45;
    that.lines_color = '#595959';
    that.lines_gradient_enabled = false;
    that.lines_gradient_start_color = '#ffa700';
    that.lines_gradient_middle_color = '#f00f0f';
    that.lines_gradient_end_color = '#ff00ff';
  
    that.ctx.lineCap = 'round';
  
    // -------------------------
    // 1) Initialization
    // -------------------------
    that.init = function () {
      that.points = [];
      for (let i = 0; i < that.points_count; i++) {
        that.points[i] = {
          mass: 50,
          x: randomInRange(5, that.ctx.canvas.width - 5),
          y: randomInRange(5, that.ctx.canvas.height - 5),
          vx: randomInRange(-1, 1),
          vy: randomInRange(-1, 1),
          ax: 0,
          ay: 0
        };
      }
    };
  
    // -------------------------
    // 2) Update
    // -------------------------
    that.update = function () {
      // apply force point if enabled
      that.forcePoint();
  
      for (let i = 0; i < that.points.length; i++) {
        const pt = that.points[i];
        pt.ax *= 0.1;
        pt.vx += pt.ax * that.velocity_ratio * that.velocity_decay;
        pt.x += pt.vx;
  
        pt.ay *= 0.1;
        pt.vy += (pt.ay + that.gravity) * that.velocity_ratio * that.velocity_decay;
        pt.y += pt.vy;
  
        // collide with canvas edges
        if (pt.x > that.ctx.canvas.width - that.point_size) {
          pt.x = that.ctx.canvas.width - that.point_size;
          pt.vx = -pt.vx * that.bounce;
        }
        if (pt.x < that.point_size) {
          pt.x = that.point_size;
          pt.vx = -pt.vx * that.bounce;
        }
        if (pt.y > that.ctx.canvas.height - that.point_size) {
          pt.y = that.ctx.canvas.height - that.point_size;
          pt.vy = -pt.vy * that.bounce;
        }
        if (pt.y < that.point_size) {
          pt.y = that.point_size;
          pt.vy = -pt.vy * that.bounce;
        }
      }
    };
  
    // -------------------------
    // 3) Draw
    // -------------------------
    that.draw = function () {
      that.ctx.clearRect(0, 0, that.ctx.canvas.width, that.ctx.canvas.height);
      if (!that.transparent_background) {
        that.ctx.fillStyle = that.background_color;
        that.ctx.fillRect(0, 0, that.ctx.canvas.width, that.ctx.canvas.height);
      }
  
      that.ctx.lineWidth = that.line_width;
      // Draw lines
      for (let i = 0; i < that.points.length; i++) {
        const pt = that.points[i];
        for (let j = i + 1; j < that.points.length; j++) {
          const pt2 = that.points[j];
          if (Math.abs(pt2.x - pt.x) <= that.line_distance &&
              Math.abs(pt2.y - pt.y) <= that.line_distance) {
            if (that.lines_gradient_enabled) {
              const gradient = that.ctx.createLinearGradient(pt.x, pt.y, pt2.x, pt2.y);
              gradient.addColorStop(0, that.lines_gradient_start_color);
              gradient.addColorStop(0.5, that.lines_gradient_middle_color);
              gradient.addColorStop(1, that.lines_gradient_end_color);
              that.ctx.strokeStyle = gradient;
            } else {
              that.ctx.strokeStyle = that.lines_color;
            }
            that.ctx.beginPath();
            that.ctx.moveTo(pt.x, pt.y);
            that.ctx.lineTo(pt2.x, pt2.y);
            that.ctx.stroke();
            that.ctx.closePath();
          }
        }
      }
  
      // Draw points
      for (let i = 0; i < that.points.length; i++) {
        const pt = that.points[i];
        that.ctx.fillStyle = that.point_color;
        that.ctx.beginPath();
        that.ctx.arc(pt.x, pt.y, that.point_size, 0, 2 * Math.PI);
        that.ctx.fill();
        that.ctx.closePath();
      }
    };
  
    // -------------------------
    // 4) Force point
    // -------------------------
    that.forcePoint = function () {
      if (!that.force_point_enabled) return;
  
      for (let i = 0; i < that.points.length; i++) {
        const pt = that.points[i];
        const dx = that.currentCursorPosition.x - pt.x;
        // NOTE: There's a bug in the original snippet here:
        // it uses `that.currentCursorPosition.x - pt.y` instead of y. Fixing:
        const dy = that.currentCursorPosition.y - pt.y;
        const d = Math.hypot(dx, dy);
        const ang = Math.atan2(dy, dx);
  
        if (d < 100) {
          pt.ax = 0.5 * d * Math.cos(ang);
          pt.ay = 0.5 * d * Math.sin(ang);
        }
      }
    };
  
    // -------------------------
    // 5) Resize
    // -------------------------
    that.onresize = function () {
      // Optional: If you want your canvas to fill the entire window:
      // that.ctx.canvas.width = window.innerWidth;
      // that.ctx.canvas.height = window.innerHeight;
      //
      // Or comment this out if you want to control the canvas size yourself.
    };
  
    // Attach events
    window.addEventListener('resize', that.onresize, false);
  
    that.ctx.canvas.addEventListener('mousemove', function (e) {
      that.currentCursorPosition.x = e.offsetX;
      that.currentCursorPosition.y = e.offsetY;
    });
  
    // Init
    that.init();
  }
  