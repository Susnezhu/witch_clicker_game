//musiikki
const music = document.getElementById("bg-music");
isMusicPlaying = true;

function startMusic() {
    music.play().catch(function(error) {
      console.log("Music can't be played", error); //jos on joku virhe
    });
}

function stopMusic() {
  music.pause();
  music.currentTime = 0;
}



const startBtn = document.getElementById("start-btn");
const startScreen = document.getElementById("start-screen");
const gameWindow = document.getElementById("game_window");
gameWindow.style.display ="none";


startBtn.addEventListener("click", () => {
  //piilottaa start screen ja laittaa esille pelin
  startScreen.style.display = "none";
  gameWindow.style.display = "block";

  //laittaa musiikin päälle
  startMusic();

  //aloittaa pelin
  startGame();
});



function startGame() {
    //musiikki näppäin
    let songButton = document.getElementById("song_button");
    songButton.onclick = function() {
        if (isMusicPlaying) {
            stopMusic()
            songButton.src = "gif/song_off.png";
            isMusicPlaying = false;
        }else {
            startMusic()
            songButton.src = "gif/song_on.png";
            isMusicPlaying = true
        }
    };

    //Kaikki hirviöt ja niiden eri muodot
    let witch = {
        hitPower: 1,
        normal: "gif/witch.gif",
        hit: "gif/witch_hit.gif"
    }

    let grass = {
        health: 100,
        normal: "gif/grass_monster.gif",
        hit: "gif/grass_monster_hit.gif",
        start: "gif/grass_monster_start.gif"
    }

    let mushroom = {
        health: 500,
        normal: "gif/mushroom_monster.gif",
        hit: "gif/mushroom_monster_hit.gif",
        start: "gif/mushroom_monster_start.gif"
    }


    let cat = {
        health: 1000,
        hit: "gif/cat_monster_hit.gif",
        normal: "gif/cat_monster.gif",
        start: "gif/cat_monster_start.gif"
    };

    let fire = {
        health: 10000,
        normal: "gif/fire_monster.gif",
        hit: "gif/fire_monster_hit.gif",
        start: "gif/fire_monster_start.gif"
    }

    let pumpkin= {
        health: 500000,
        normal: "gif/pumpkin_monster.gif",
        hit: "gif/pumpkin_monster_hit.gif", //puuttuu!
        start: "gif/pumpkin_monster_start.gif"
    }

    const stars = "gif/stars.gif"



    //peli
    let score = 0;
    const healthDisplay = document.getElementById("monster_health");
    const monster = document.getElementById("monster");
    monster.style.display = "none";
    healthDisplay.style.display = "none";

    //odottaa 2 sekunttia, ennen kun hirviö ilmestyy
    setTimeout(function(){
        monster.src = grass.start
        monster.style.display ="block";
        healthDisplay.textContent = grass.health;

        //2 sekunnin jälkeen odottaa vielä sekunnin
        setTimeout(function(){
            monster.src = grass.normal;
        }, 1000);
    }, 2000);



    //jos klikkaa hirviötä hänen terveys pienenee
    monster.onclick = function() {
        monster.src = grass.hit
        grass.health--;
        healthDisplay.textContent = grass.health;
        healthDisplay.style.display = "block";

        //animaatio, jotta pelaaja näkee, että jotain tapahtui
        setTimeout(function() {
            monster.src = grass.normal;
          }, 300);

        //näyttää puoli sekunttia hirviön terveys määrää
        setTimeout(function(){
            healthDisplay.style.display = "none";
        },500)
    };
}
