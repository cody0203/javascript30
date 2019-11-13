const player = document.querySelector(".player");
const video = player.querySelector(".viewer");
const progress = player.querySelector(".progress");
const progressBar = player.querySelector(".progress__filled");
const toggle = player.querySelector(".toggle");
const skipButtons = player.querySelectorAll("[data-skip]");
const ranges = player.querySelectorAll(".player__slider");

function togglePlay() {
  if (video.paused) {
    video.play();
  } else {
    video.pause();
  }
}

function updateButton() {
  const icon = this.paused ? "►" : "❚ ❚";
  toggle.textContent = icon;
}

function skip() {
  const value = this.dataset.skip;
  video.currentTime += parseFloat(value);
}

function handleRangeUpdate() {
  const value = this.value;
  const name = this.name;
  video[name] = value;
}

function handleProgress() {
  const percent = (video.currentTime / video.duration) * 100;
  progressBar.style.flexBasis = `${percent}%`;
}

function scrub(e) {
  const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
  video.currentTime = scrubTime;
}

video.addEventListener("click", togglePlay);
video.addEventListener("play", updateButton);
video.addEventListener("pause", updateButton);
video.addEventListener("timeupdate", handleProgress);

toggle.addEventListener("click", togglePlay);

skipButtons.forEach(button => {
  button.addEventListener("click", skip);
});

ranges.forEach(range => {
  range.addEventListener("input", handleRangeUpdate);
});

document.addEventListener("keydown", e => {
  if (e.keyCode === 32) {
    togglePlay();
  }
});

let mousedown = false;
progress.addEventListener("click", scrub);
progress.addEventListener("mousemove", e => {
  if (mousedown) {
    scrub(e);
  }
});
progress.addEventListener("mousedown", () => (mousedown = true));
progress.addEventListener("mouseup", () => (mousedown = false));
