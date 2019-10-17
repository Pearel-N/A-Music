let state = ( function() {
    let currentSong = 0;
	return {
        nextSong: function(){
            currentSong = (currentSong != 9)?currentSong + 1 : 0;
            return currentSong;
        },
        prevSong: function(){
            currentSong = (currentSong != 0)?currentSong - 1 : 9;
            return currentSong;
        },
        getCurrentSong: function(){
            return currentSong;
        }
    }
})();

document.addEventListener('DOMContentLoaded', function() {
    //first function to be called when page loads
    document.getElementById('player').load();
    loadTrack(0); //load the first track
})


let loadTrack = function(songIndex) {
    console.log(playlist.tracks[songIndex]);
    var track = playlist.tracks[songIndex];
    document.getElementById('player-source').src = track.url;
    document.getElementById('albmart').src = track.albumArt;
    document.getElementById('song-title').innerHTML = track.name;
}

let nextTrack = function() {
    pause();
    loadTrack(state.nextSong());
    document.getElementById('player').load(); 
    play();
}

let prevTrack = function() {
    pause();
    loadTrack(state.prevSong());
    document.getElementById('player').load(); 
    play();
}

function play(){
    document.getElementById('player').play();
    document.getElementById('play').style.visibility = 'hidden';
    document.getElementById('pause').style.visibility = 'visible';
}

function pause(){
    document.getElementById('player').pause();
    document.getElementById('play').style.visibility = 'visible';
    document.getElementById('pause').style.visibility = 'hidden';
}

function initProgressBar() {
    var player = document.getElementById('player');
    var length = player.duration
    var current_time = player.currentTime;
  
    var totalLength = calculateTotalValue(length)
    document.getElementById("end-time").innerHTML = totalLength;
  
    var currentTime = calculateCurrentValue(current_time);
    document.getElementById("start-time").innerHTML = currentTime;
  
    var progressbar = document.getElementById('seek-obj');
    progressbar.value = (player.currentTime / player.duration);
    progressbar.addEventListener("click", seek);
  
    if (player.currentTime == player.duration) {
      document.getElementById('play').className = "";
    }
    function seek(event) {
        var percent = event.offsetX / this.offsetWidth;
        player.currentTime = percent * player.duration;
        progressbar.value = percent / 100;
    }
};
function calculateTotalValue(length) {
    var minutes = Math.floor(length / 60),
      seconds_int = length - minutes * 60,
      seconds_str = seconds_int.toString(),
      seconds = seconds_str.substr(0, 2),
      time = minutes + ':' + seconds
  
    return time;
}
  
function calculateCurrentValue(currentTime) {
    var current_hour = parseInt(currentTime / 3600) % 24,
        current_minute = parseInt(currentTime / 60) % 60,
        current_seconds_long = currentTime % 60,
        current_seconds = current_seconds_long.toFixed(),
        current_time = (current_minute < 10 ? "0" + current_minute : current_minute) + ":" + (current_seconds < 10 ? "0" + current_seconds : current_seconds);

    return current_time;
}