import React from "react";
import dynamic from "next/dynamic";

// Will only import `react-p5` on client-side
const Sketch = dynamic(() => import("react-p5").then((mod) => mod.default), {
  ssr: false,
});

export default function Terrain() {
  let cols, rows;
  const w = 2500,
    h = 1200,
    scl = 32;
  let flying = 0;
  let terrain = [];
  const PI = 3.14;

  const setup = (p5, canvasParentRef) => {
    p5.createCanvas(
      document.getElementById("visualizer-container").offsetWidth,
      document.getElementById("visualizer-container").offsetHeight,
      p5.WEBGL
    ).parent(canvasParentRef);

    cols = w / scl;
    rows = h / scl;

    for (let x = 0; x < cols; x++) {
      terrain[x] = [];
      for (let y = 0; y < rows; y++) {
        terrain[x].push(0);
      }
    }
  };

  const draw = (p5) => {
    flying -= 0.05;
    let yoff = flying;

    for (let y = 0; y < rows; y++) {
      let xoff = 0;
      for (let x = 0; x < cols; x++) {
        terrain[x][y] = p5.map(p5.noise(xoff, yoff), 0, 1, -350, 350);
        xoff += 0.15;
      }
      yoff += 0.15;
    }

    p5.background(10, 15, 30);
    p5.translate(0, 300);
    p5.frameRate(30);
    p5.rotateX(PI / 3);
    p5.strokeWeight(1);
    p5.stroke(50, 150, 250, 150);
    p5.fill(20, 50, p5.map(p5.sin(flying), -1, 1, 100, 255), 200);
    p5.translate(-w / 2, -h / 2);

    for (let y = 0; y < rows - 1; y++) {
      p5.beginShape(p5.TRIANGLE_STRIP);
      for (let x = 0; x < cols; x++) {
        const z = terrain[x][y];
        const zNext = terrain[x][y + 1];

        // Dynamic coloring based on height
        p5.fill(20, p5.map(z, -350, 350, 50, 255), 200, 200);
        p5.vertex(x * scl, y * scl, z);
        p5.vertex(x * scl, (y + 1) * scl, zNext);
      }
      p5.endShape();
    }
  };

  return <Sketch className="z-10" setup={setup} draw={draw} />;
}
