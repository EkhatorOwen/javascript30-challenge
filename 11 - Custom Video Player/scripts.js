/* get our element */
const player = document.querySelector('.player');
const video = document.querySelector('.viewer');
const progress = document.querySelector('.progress');
const progressBar = document.querySelector('.progress__filled');
const toggle = document.querySelector('.toggle');
const skipButtons = player.querySelectorAll('[data-skip]');
const ranges = player.querySelectorAll('.player__slider');

/*Built out functions*/
function togglePlay() {
  if(video.paused){
    video.play()
  } else {
    video.pause()
  }
}

function updateButton(){
  toggle.textContent = this.paused ? '►' : '❚ ❚';
}

function handleRangeUPdate() {
  
}

function skip(){
console.log(this.dataset.skip)
video.currentTime += parseFloat(this.dataset.skip)
}
function handlechange() {
 // console.log(this.name);
  video[this.name] = this.value;
  
}

function handleProgress(){
  const percent = (video.currentTime/video.duration) * 100;
  progressBar.style.flexBasis = `${percent}%`;
}

function scrub(e){
  const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
 // console.log(scrubTime);
  video.currentTime = scrubTime;
}


/*hook up the event listeners*/
video.addEventListener('click',togglePlay);
video.addEventListener('play',updateButton);
video.addEventListener('pause',updateButton);
video.addEventListener('timeupdate',handleProgress);
toggle.addEventListener('click',togglePlay);

skipButtons.forEach(button => button.addEventListener('click',skip))
ranges.forEach(range=>range.addEventListener('change',handlechange))
ranges.forEach(range=>range.addEventListener('mousemove',handlechange))

let mousedown = false;
progress.addEventListener('click',scrub)
progress.addEventListener('mousemove',(e)=>mousedown && scrub(e))
progress.addEventListener('mousedown',(scrub)=>mousedown = true)
progress.addEventListener('mouseup',(scrub)=>mousedown = false)