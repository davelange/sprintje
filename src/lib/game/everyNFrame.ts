type FrameOp = {
  counter: number;
  interval: number;
  fn: () => void;
  duration?: number;
  age: number;
};

class EveryNFrame {
  onFrameOps: FrameOp[] = [];
  afterFrameOps: FrameOp[] = [];

  onFrame(interval: number, fn: () => void, duration?: number) {
    this.onFrameOps.push({
      interval,
      fn,
      duration,
      counter: 0,
      age: 0
    });
  }

  afterFrames(interval: number, fn: () => void) {
    this.afterFrameOps.push({
      interval,
      fn,
      counter: 0,
      age: 0
    });
  }

  runOnFrames() {
    const onFrOpsToRemove: number[] = [];

    this.onFrameOps.forEach((item, idx) => {
      if (item.counter === item.interval) {
        item.fn();
        item.counter = 0;
      } else {
        item.counter++;
      }

      item.age++;

      if (item.age === item.duration) {
        onFrOpsToRemove.push(idx);
      }
    });

    if (onFrOpsToRemove.length) {
      this.onFrameOps = this.onFrameOps.filter(
        (_, idx) => !onFrOpsToRemove.includes(idx)
      );
    }
  }

  runAfterFrames() {
    const itemsToRemove: number[] = [];

    this.afterFrameOps.forEach((item, idx) => {
      if (item.counter < item.interval) {
        item.counter++;
      } else {
        item.fn();
        itemsToRemove.push(idx);
      }
    });

    if (itemsToRemove.length) {
      this.afterFrameOps = this.afterFrameOps.filter(
        (_, idx) => !itemsToRemove.includes(idx)
      );
    }
  }

  runFrameOps() {
    this.runOnFrames();
    this.runAfterFrames();
  }
}

export default EveryNFrame;
