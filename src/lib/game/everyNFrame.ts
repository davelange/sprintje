type FrameOp = {
  counter: number;
  interval: number;
  fn: () => void;
};

class EveryNFrame {
  onFrameOps: FrameOp[] = [];

  onFrame(interval: number, fn: () => void) {
    this.onFrameOps.push({
      interval,
      fn,
      counter: 0
    });
  }

  runFrameOps() {
    this.onFrameOps.forEach((item) => {
      if (item.counter === item.interval) {
        item.fn();
        item.counter = 0;
      } else {
        item.counter++;
      }
    });
  }
}

export default EveryNFrame;
