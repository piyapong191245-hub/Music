const image = document.getElementById('cover'),
    title = document.getElementById('music-title'),
    artist = document.getElementById('music-artist'),
    currentTimeEl = document.getElementById('current-time'),
    durationEl = document.getElementById('duration'),
    progress = document.getElementById('progress'),
    playerProgress = document.getElementById('player-progress'),
    prevBtn = document.getElementById('prev'),
    nextBtn = document.getElementById('next'),
    playBtn = document.getElementById('play'),
    background = document.getElementById('bg-img');

const music = new Audio();

const songs = [
    {
        path: 'assets/1.mp3', 
        displayName: 'รักให้เธอได้รู้',
        cover: 'assets/1.jpg',
        artist: 'PUN',
    },
    {
        path: 'assets/2.mp3', 
        displayName: 'เธอคือกาแฟในตอนเช้า',
        cover: 'assets/2.jpg',
        artist: 'No One Else',
    },
    {
        path: 'assets/3.mp3', 
        displayName: 'ดอกไม้ที่รอฝน',
        cover: 'assets/3.jpg',
        artist: 'THE TOYS x NONT TANONT',
    },
    {
        path: 'assets/4.mp3', 
        displayName: 'เมื่อไหร่จะมี (มีใจให้กัน)',
        cover: 'assets/4.jpg',
        artist: 'BLVCKHEART',
    }
];

let musicIndex = 0;
let isPlaying = false;

function togglePlay() {
    if (isPlaying) {
        pauseMusic();
    } else {
        playMusic();
    }
}

function playMusic() {
    isPlaying = true;
    playBtn.classList.replace('fa-play', 'fa-pause');
    playBtn.setAttribute('title', 'Pause');
    music.play();
}

function pauseMusic() {
    isPlaying = false;
    playBtn.classList.replace('fa-pause', 'fa-play');
    playBtn.setAttribute('title', 'Play');
    music.pause();
}

function loadMusic(song) {
    music.src = song.path;
    title.textContent = song.displayName;
    artist.textContent = song.artist;
    image.src = song.cover;
    background.src = song.cover;
}

function changeMusic(direction) {
    musicIndex = (musicIndex + direction + songs.length) % songs.length;
    loadMusic(songs[musicIndex]);
    playMusic();
}

function updateProgressBar() {
    const { duration, currentTime } = music;
    
    if (duration) {
        // อัปเดตความกว้างของ Progress Bar
        const progressPercent = (currentTime / duration) * 100;
        progress.style.width = `${progressPercent}%`;

        // ฟังก์ชันแปลงเวลาเป็นรูปแบบ M:SS
        const formatTime = (time) => {
            const minutes = Math.floor(time / 60);
            const seconds = String(Math.floor(time % 60)).padStart(2, '0');
            return `${minutes}:${seconds}`;
        };

        durationEl.textContent = formatTime(duration);
        currentTimeEl.textContent = formatTime(currentTime);
    }
}

function setProgressBar(e) {
    const width = playerProgress.clientWidth;
    const clickX = e.offsetX;
    if (music.duration) {
        music.currentTime = (clickX / width) * music.duration;
    }
}

playBtn.addEventListener('click', togglePlay);
prevBtn.addEventListener('click', () => changeMusic(-1));
nextBtn.addEventListener('click', () => changeMusic(1));
music.addEventListener('ended', () => changeMusic(1));
music.addEventListener('timeupdate', updateProgressBar);
playerProgress.addEventListener('click', setProgressBar);

loadMusic(songs[musicIndex]);