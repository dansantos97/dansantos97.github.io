let audio = document.getElementById("audio");
let audioSource = document.getElementById("audioSource");
let trackName = document.getElementById("trackName");
let artistName = document.getElementById("artistName");
let timeRange = document.getElementById("timeRange");
let timeLapse = document.getElementById("timeLapse");
let backward = document.getElementById("backward");
let playPause = document.getElementById("playPause");
let foward = document.getElementById("foward");
let back = document.getElementById("back");
let vol = document.getElementById("vol");
let volRange = document.getElementById("volRange");
let volValue = document.getElementById("volValue");

let tracks = [

    {
        title: "Plano Melhor",
        singer: "Renascer Praise",
        file: "./Assets/Tracks/Plano Melhor.mp3"
    },

    {
        title: "Promessa",
        singer: "Renascer Praise",
        file: "./Assets/Tracks/Promessa.mp3"
    },

    {
        title: "Amigo Fiel",
        singer: "Diante do Trono",
        file: "./Assets/Tracks/Amigo Fiel.mp3"
    },

    {
        title: "O Poder do Teu Amor",
        singer: "Diante do Trono",
        file: "./Assets/Tracks/O Poder do Teu Amor.mp3"
    },

    {
        title: "Preciso de Ti",
        singer: "Diante do Trono",
        file: "./Assets/Tracks/Preciso de Ti.mp3"
    },

    {
        title: "Incomparável",
        singer: "Comunidade Evangélica Zona Sul",
        file: "./Assets/Tracks/Incomparável.mp3"
    },

    {
        title: "Menina dos Olhos de Deus",
        singer: "Comunidade Evangélica Zona Sul",
        file: "./Assets/Tracks/Menina dos Olhos de Deus.mp3"
    },

    {
        title: "Descansarei",
        singer: "Comunidade Evangélica de Maringá",
        file: "./Assets/Tracks/Descansarei.mp3"
    },

    {
        title: "Abraço do Noivo",
        singer: "Cassiane",
        file: "./Assets/Tracks/Abraço do Noivo.mp3"
    }

]

let index = 0

function player(index) {

    trackName.innerText = tracks[index].title;
    artistName.innerText = tracks[index].singer;
    audioSource.src = tracks[index].file;

    audio.load();

}

player(index);

let playing = false

function previousTrack() {

    if (index == 0) {
        index = tracks.length;
        player(index);
        playing = false;
        play();
    }
    else {
        index--;
        player(index);
        playing = false;
        play();
    }

}

function nextTrack() {

    if (index == tracks.length) {
        index = 0;
        player(index);
        playing = false;
        play();
    } else {
        index++;
        player(index);
        playing = false;
        play();
    }

}

function autoMusic() {

    let totalTime = audio.duration;
    let currentTime = audio.currentTime;

    if (currentTime == totalTime) {

        nextTrack();
    }

}

function play() {

    if (playing == false) {
        audio.play();
        playPause.setAttribute("src", "./Assets/icons_pause.png");
        return playing = true;
    } else {
        audio.pause()
        playPause.setAttribute("src", "./Assets/icons_play.png")
        return playing = false;
    }

}

function stop() {

    audio.pause();
    playPause.setAttribute("src", "./Assets/icons_play.png");
    audio.currentTime = 0;
    return playing = false

}

function return10() {
    audio.currentTime -= 10;
}

timeRange.addEventListener("input", time);

function time() {
    audio.currentTime = timeRange.value;
}

function timeChange() {

    timeRange.max = audio.duration;
    timeRange.value = audio.currentTime;

    let min = Math.floor(audio.currentTime / 60);
    let sec = Math.round(audio.currentTime % 60);
    let minTotal = Math.floor(audio.duration / 60);
    let secTotal = Math.round(audio.duration % 60);

    if (min < 10) {
        min = "0" + min;
    }
    if (sec < 10) {
        sec = "0" + sec;
    }
    if (minTotal < 10) {
        minTotal = "0" + minTotal;
    }
    if (secTotal < 10) {
        secTotal = "0" + secTotal;
    }

    timeLapse.innerHTML = min + ":" + sec + " / " + minTotal + ":" + secTotal;

    autoMusic();

}

setInterval(timeChange, 1000);

let volMute = false

function mute() {

    if (volMute == false) {
        audio.volume = 0;
        vol.setAttribute("src", "./Assets/icons_mute.png");
        return volMute = true;

    } else {
        audio.volume = volRange.value / 100;
        vol.setAttribute("src", "./Assets/icons_volmax.png");
        return volMute = false;
    }

}

let volStatus;

volRange.addEventListener("input", volumeChange);

function volumeChange() {

    volStatus = volRange.value / 100;

    audio.volume = volStatus;

    volValue.innerText = Math.floor(volStatus * 100);

    if (volStatus == 0) {
        audio.volume = 0;
        vol.setAttribute("src", "./Assets/icons_mute.png");
    }
    else if (volStatus <= 30 / 100) {
        vol.setAttribute("src", "./Assets/icons_volmin.png")
    }
    else if (volStatus <= 70 / 100) {
        vol.setAttribute("src", "./Assets/icons_volmid.png")
    }
    else if (volStatus > 60 / 100) {
        vol.setAttribute("src", "./Assets/icons_volmax.png")
    }

}
