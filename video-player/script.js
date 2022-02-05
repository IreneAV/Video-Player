document.getElementById('file-input').addEventListener('change', (e) => {
    const file = document.getElementById('file-input').files[0];
    if (file) {
      processFile(file);
    }
  })

  const processFile = (file) => {
    // we define fr as a new instance of FileReader
    const fr = new FileReader();

    fr.readAsDataURL(file);
    // Handle progress, success, and errors
    // fr.onprogress = updateProgress;
    fr.onerror = errorHandler;
    fr.onabort = () => changeStatus('Cargando tu video...');
    fr.onloadstart =   () => changeStatus('Cargando tu video...');
    fr.onload = ()=> {changeStatus('Cargado!')};
    fr.onloadend = () => loaded;
    // Here you can perform some operations on the data asynchronously
    fr.onprogress = setProgress;
  }

  // Updates the value of the progress bar
  const setProgress = (e) => {
    // The target is the file reader
    const fr = e.target;
    const loadingPercentage =  100 * e.loaded / e.total;
    document.getElementById('progress-bar').value = loadingPercentage;
  }

  const changeStatus = (status) => {
    document.getElementById('status').innerHTML = status
  }

  const loaded = (e) => {
    changeStatus('Load ended!');
    const fr = e.target
    var result = fr.result;
    console.log('result:')
    console.log(result)
    // Here we can send the result to a server for example
  }

  const errorHandler = (e) => {
    changeStatus("Error: " + e.target.error.name)
  }

////////////////////////////////////////////////////////////////


const video = document.getElementById("video");
const play = document.getElementById("play");
const stop = document.getElementById("stop");
const progress = document.getElementById("progress");
const timestamp = document.getElementById("timestamp");

//Play/Pause video
function toggleVideoStatus() {
  console.log("clicked");
  if (video.paused) {
    video.play();
  } else {
    video.pause();
  }
}

//update Play/Pause Icon
function updatePlayIcon() {
  if (video.paused) {
    play.innerHTML = "<i class='fa fa-play fa-2x'><i/>";
  } else {
    play.innerHTML = "<i class='fa fa-pause fa-2x'><i/>";
  }
}

//Stop Video
function stopVideo() {
  video.currentTime = 0;
  video.pause();
}

//Update Progress and Timestamp
function updateProgress() {
  progress.value = (video.currentTime / video.duration) * 100;

  //Get Minutes
  let mins = Math.floor(video.currentTime / 60);
  if (mins < 10) {
    mins = "0" + String(mins);
  }

  //Get Seconds
  let secs = Math.floor(video.currentTime % 60);
  if (secs < 10) {
    secs = "0" + String(secs);
  }

  timestamp.innerHTML = `${mins}:${secs}`;
}

//Set Progress Value
function seteProgressValue() {
  video.currentTime = (+progress.value * video.duration) / 100;
}

// Event Listeners
video.addEventListener("click", toggleVideoStatus);
video.addEventListener("play", updatePlayIcon);
video.addEventListener("pause", updatePlayIcon);
video.addEventListener("timeupdate", updateProgress);

play.addEventListener("click", toggleVideoStatus);

stop.addEventListener("click", stopVideo);

progress.addEventListener("change", seteProgressValue);



//Below Js is provided by CodePen.io to upload and play video
const input = document.getElementById('file-input');

const videoSource = document.createElement('source');

input.addEventListener('change', function() {
  const files = this.files || [];

  if (!files.length) return;

  const reader = new FileReader();

  reader.onload = function (e) {
    videoSource.setAttribute('src', e.target.result);
    video.appendChild(videoSource);
    video.load();
    video.play();
  };

  reader.onprogress = function (e) {
    console.log('progress: ', Math.round((e.loaded * 100) / e.total));
  };

  reader.readAsDataURL(files[0]);
});

$(function() {
  var current_progress = 0;
  var interval = setInterval(function() {
      current_progress += 10;
      $("#dynamic")
      .css("width", current_progress + "%")
      .attr("aria-valuenow", current_progress)
      .text(current_progress + "% Complete");
      if (current_progress >= 100)
          clearInterval(interval);
  }, 1000);
});
