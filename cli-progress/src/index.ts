import { clearTimeout } from "timers";
import { ProgressBar } from "./progressBar.js";

const bar = new ProgressBar();

bar.start(200, 0);

let value = 0

const timer = setInterval(() => {
  value++
  bar.update(value)
  if (value >= bar.getTotalSize()) {
    clearTimeout(timer)
    bar.stop()
  }
}, 20)