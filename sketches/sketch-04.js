const canvasSketch = require('canvas-sketch');
const random = require('canvas-sketch-util/random');
const Tweakpane = require('tweakpane');

const settings = {
  dimensions: [1080, 1080],
  animate: true,
};

const params = {
  cols : 10,
  rows: 10
}

const sketch = () => {
  return ({ context, width, height, frame}) => {
    context.fillStyle = 'white';
    context.fillRect(0, 0, width, height);

    const cols = params.cols;
    const rows = params.rows;
    const numCells = cols * rows;

    const gridw = width * 0.8;
    const gridh = height * 0.8;
    const cellw = gridw / cols;
    const cellh = gridh / rows;
    const margx = (width - gridw) * 0.5;
    const margy = (height - gridh) * 0.5;

    for (let i = 0; i < numCells; i++) {
      const col = i % cols;
      const row = Math.floor(i / cols);

      const x = col * cellw;
      const y = row * cellh;

      const w = cellw * 0.8;
      const h = cellh * 0.8;
      const n = random.noise3D(x ,y, frame * 10,0.001);
      const angle = n * Math.PI * 0.2;
      console.log(x, y);
      context.lineWidth = 2;
      context.save();
      context.translate(x, y);
      context.translate(margx, margy);
      context.translate(cellw *0.5, cellh * 0.5);
      context.rotate(angle);
      context.beginPath();
      context.moveTo(w * -0.5, 0);
      context.lineTo(w * 0.5, 0);
      context.strokeStyle = 'black';
      context.stroke();

      context.restore();

    }

  };
};


const createPane = () => {
  const pane = new Tweakpane.Pane()
  let folder;
  folder = pane.addFolder({title:'Grid'});
  folder.addInput(params, 'cols', {min: 2 ,max:50,step :1});
  folder.addInput(params, 'rows', {min: 2 ,max:50,step :1});
}
createPane();
canvasSketch(sketch, settings);