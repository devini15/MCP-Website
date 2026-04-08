(function () {
    const songs = [
        "/assets/music/Airborne Isles.ogg",
        "/assets/music/Airborne Isles (Last 5 Turns).ogg",
        "/assets/music/All-Out Strike.ogg",
        "/assets/music/Arcane Atoll.ogg",
        "/assets/music/Arcane Atoll (Last 5 Turns).ogg",
        "/assets/music/Candyland.ogg",
        "/assets/music/Candyland (Last 5 Turns).ogg",
        "/assets/music/Center Park.ogg",
        "/assets/music/Center Park (Last 5 Turns).ogg",
        "/assets/music/Cut Through the Wind.ogg",
        "/assets/music/Dusty Dunes Day.ogg",
        "/assets/music/Dusty Dunes Day (Last 5 Turns).ogg",
        "/assets/music/Dusty Dunes Night.ogg",
        "/assets/music/Dusty Dunes Night (Last 5 Turns).ogg",
        "/assets/music/Fort Suits.ogg",
        "/assets/music/Fort Suits (Last 5 Turns).ogg",
        "/assets/music/Grand Prix.ogg",
        "/assets/music/Happier Together.ogg",
        "/assets/music/Hurry! Hurry!.ogg",
        "/assets/music/Hurry-Scurry.ogg",
        "/assets/music/Keep Going!.ogg",
        "/assets/music/Last Minute Thrills.ogg",
        "/assets/music/Let's Make Some Money.ogg",
        "/assets/music/Lofty Luncheon.ogg",
        "/assets/music/Lofty Luncheon (Last 5 Turns).ogg",
        "/assets/music/Lost City Day.ogg",
        "/assets/music/Lost City Day (Last 5 Turns).ogg",
        "/assets/music/Lost City Night.ogg",
        "/assets/music/Lost City Night (Last 5 Turns).ogg",
        "/assets/music/Main Theme.ogg",
        "/assets/music/Mooshroom Grotto.ogg",
        "/assets/music/Mooshroom Grotto (Last 5 Turns).ogg",
        "/assets/music/No Time to Worry.ogg",
        "/assets/music/Pac-Maze.ogg",
        "/assets/music/Pac-Maze (Last 5 Turns).ogg",
        "/assets/music/Panic, but Carefully.ogg",
        "/assets/music/Pipe Canyon.ogg",
        "/assets/music/Pipe Canyon (Last 5 Turns).ogg",
        "/assets/music/Port Town.ogg",
        "/assets/music/Port Town (Last 5 Turns).ogg",
        "/assets/music/Present Palace.ogg",
        "/assets/music/Present Palace (Last 5 Turns).ogg",
        "/assets/music/Proceed with Caution.ogg",
        "/assets/music/Quickplay Room.ogg",
        "/assets/music/Quickplay Room Night.ogg",
        "/assets/music/Rhythmic Room.ogg",
        "/assets/music/Rhythmic Room (Last 5 Turns).ogg",
        "/assets/music/Roll Off.ogg",
        "/assets/music/Rolling in the Dough.ogg",
        "/assets/music/Run Away! Run Away!.ogg",
        "/assets/music/Slowly Yet Surely.ogg",
        "/assets/music/Suburbia Scramble.ogg",
        "/assets/music/Suburbia Scramble (Last 5 Turns).ogg",
        "/assets/music/Waltzing Round and Round.ogg",
        "/assets/music/Zen Garden.ogg",
        "/assets/music/Zen Garden (Last 5 Turns).ogg",
    ];

    function shuffle(arr) {
        const a = [...arr];
        for (let i = a.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [a[i], a[j]] = [a[j], a[i]];
        }
        return a;
    }

    const audio = document.getElementById("bg-audio");
    const titleEl = document.getElementById("song-title");
    const btnMute = document.getElementById("btn-mute");
    const btnPlay = document.getElementById("btn-play");
    const slider = document.getElementById("volume-slider");

    let queue = JSON.parse(localStorage.getItem("musicQueue") || "null");
    let index = parseInt(localStorage.getItem("musicIndex") || "0");
    if (!queue) {
        queue = shuffle(songs);
        localStorage.setItem("musicQueue", JSON.stringify(queue));
    }

    let isPlaying = localStorage.getItem("musicPlaying") === "true";
    let isMuted = localStorage.getItem("musicMuted") === "true";
    let volume = parseFloat(localStorage.getItem("musicVolume") ?? "1");

    audio.volume = volume;
    audio.muted = isMuted;
    slider.value = volume;
    slider.style.opacity = isMuted ? "0.4" : "1";
    btnMute.textContent = isMuted ? "🔊" : "🔇";
    btnPlay.textContent = isPlaying ? "⏸" : "▶";

    function getSongName(path) {
        return path.split("/").pop().replace(".ogg", "");
    }

    function loadSong(idx, resume) {
        index = ((idx % queue.length) + queue.length) % queue.length;
        localStorage.setItem("musicIndex", index);
        audio.src = queue[index];
        titleEl.textContent = "♪ " + getSongName(queue[index]);
        audio.load();

        if (resume) {
            const t = parseFloat(localStorage.getItem("musicTime") || "0");
            audio.currentTime = t;
        }

        if (isPlaying) {
            audio.play().catch(() => {
                isPlaying = false;
                localStorage.setItem("musicPlaying", "false");
                btnPlay.textContent = "▶";
            });
        }
    }

    loadSong(index, true);

    setInterval(() => {
        if (!audio.paused) localStorage.setItem("musicTime", audio.currentTime);
    }, 1000);

    audio.addEventListener("ended", () => {
        const next = index + 1;
        if (next >= queue.length) {
            queue = shuffle(songs);
            localStorage.setItem("musicQueue", JSON.stringify(queue));
            loadSong(0, false);
        } else {
            loadSong(next, false);
        }
        localStorage.setItem("musicTime", 0);
    });

    btnPlay.addEventListener("click", () => {
        if (audio.paused) {
            audio.play().catch(() => {});
            isPlaying = true;
            btnPlay.textContent = "⏸";
        } else {
            audio.pause();
            isPlaying = false;
            btnPlay.textContent = "▶";
        }
        localStorage.setItem("musicPlaying", isPlaying);
    });

    document.getElementById("btn-next").addEventListener("click", () => {
        loadSong(index + 1, false);
        localStorage.setItem("musicTime", 0);
    });

    document.getElementById("btn-prev").addEventListener("click", () => {
        if (audio.currentTime > 3) {
            audio.currentTime = 0;
        } else {
            loadSong(index - 1, false);
            localStorage.setItem("musicTime", 0);
        }
    });

    btnMute.addEventListener("click", () => {
        isMuted = !isMuted;
        audio.muted = isMuted;
        btnMute.textContent = isMuted ? "🔊" : "🔇";
        slider.style.opacity = isMuted ? "0.4" : "1";
        localStorage.setItem("musicMuted", isMuted);
    });

    slider.addEventListener("input", () => {
        volume = parseFloat(slider.value);
        audio.volume = volume;
        localStorage.setItem("musicVolume", volume);
        if (isMuted && volume > 0) {
            isMuted = false;
            audio.muted = false;
            btnMute.textContent = "🔇";
            slider.style.opacity = "1";
            localStorage.setItem("musicMuted", false);
        }
    });
})();