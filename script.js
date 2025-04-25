//musiikki
const music = document.getElementById("bg-music");
let isMusicPlaying = true;
let isMonsterDying = false

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

    //noita
    let witch = {
        hitPower: 1,
        normal: "gif/witch.gif",
        hit: "gif/witch_hit.gif"
    }

    //Kaikki hirviöt ja niiden eri muodot
    let grass = {
        isOn: true,
        health: 5,
        h: 5,
        power: 1,
        normal: "gif/grass_monster.gif",
        hit: "gif/grass_monster_hit.gif",
        start: "gif/grass_monster_start.gif"
    }

    let mushroom = {
        isOn: false,
        health: 500,
        h: 500,
        power: 2,
        normal: "gif/mushroom_monster.gif",
        hit: "gif/mushroom_monster_hit.gif",
        start: "gif/mushroom_monster_start.gif"
    }


    let cat = {
        isOn: false,
        health: 1000,
        h: 1000,
        power: 5,
        hit: "gif/cat_monster_hit.gif",
        normal: "gif/cat_monster.gif",
        start: "gif/cat_monster_start.gif"
    };

    let fire = {
        isOn: false,
        health: 10000,
        h: 10000,
        power: 10,
        normal: "gif/fire_monster.gif",
        hit: "gif/fire_monster_hit.gif",
        start: "gif/fire_monster_start.gif"
    }

    let pumpkin= {
        isOn: false,
        health: 500000,
        h: 500000,
        power: 20,
        normal: "gif/pumpkin_monster.gif",
        hit: "gif/pumpkin_monster_hit.gif",
        start: "gif/pumpkin_monster_start.gif"
    }

    const stars = "gif/stars.gif"

    let monsters = [grass, mushroom, cat, fire, pumpkin]


    //peli
    let score = 0;
    const healthDisplay = document.getElementById("monster_health");
    const monster = document.getElementById("monster");
    const witchDisplay = document.getElementById("witch")
    const witchPower = document.getElementById("witch_power")
    monster.style.display = "none";
    healthDisplay.style.display = "none";
    witchPower.style.display = "none";

    function showMonster() {
        if (isMonsterDying) {
            return;
        }

        for (let m of monsters) {
            if (m.isOn) {

                if (!isMonsterDying) {
                    //odottaa, ennen kun hirviö ilmestyy
                    setTimeout(function(){
                        monster.src = m.start
                        monster.style.display ="block";
                        healthDisplay.textContent = m.health;

                    //sen jälkeen odottaa vielä sekunnin
                        setTimeout(function(){
                            if (!isMonsterDying) {
                                monster.src = m.normal;
                            }

                        }, 1000);
                    }, 500);
                
                }
                
                //jos klikkaa hirviötä hänen terveys pienenee
                monster.onclick = function() { 
                    if (isMonsterDying) {
                        return;
                    };

                    let hitSound = document.getElementById("hit-sound");

                    hitSound.currentTime = 0;
                    hitSound.play();
                    
                    monster.src = m.hit;
                    m.health -= witch.hitPower;
                    healthDisplay.textContent = m.health;
                    healthDisplay.style.display = "block";
                    witchDisplay.src = witch.hit;


                    //animaatio, jotta pelaaja näkee, että jotain tapahtui
                    setTimeout(function() {
                        if (!isMonsterDying) {
                            monster.src = m.normal;
                        }
                    }, 300);

                    //näyttää puoli sekunttia hirviön terveys määrää
                    setTimeout(function(){
                        healthDisplay.style.display = "none";
                    },500);

                    //näyttää, että noita käyttää omia voimia
                    setTimeout(function() {
                        witchDisplay.src = witch.normal;
                    },800);
                

                    //jos hirviö kuoli
                    if (m.health <= 0) {
                        isMonsterDying = true;
                        witch.hitPower += m.power;
                        witchPower.textContent = witch.hitPower;
                        witchPower.style.display = "block";
                        
                        monster.style.pointerEvents = "none";
                        monster.src = stars;

                        setTimeout(function() {
                            monster.style.display = "none";
                            healthDisplay.style.display = "none";
                            witchPower.style.display = "none";
                            monster.style.pointerEvents = "auto";
                            isMonsterDying = false;
                        }, 2000);
                    };
                }
            };
        }
    }



    const grass_icon = document.getElementById("grass_icon")
    const mushroom_icon = document.getElementById("mushroom_icon")
    const cat_icon = document.getElementById("cat_icon")
    const fire_icon = document.getElementById("fire_icon")
    const pumpkin_icon = document.getElementById("pumpkin_icon")

    const icons  = [grass_icon, mushroom_icon, cat_icon, fire_icon, pumpkin_icon]

    for (let ic of icons) {
        ic.onclick = function() { //jos painaa jonkun hirviön vaihto näppäimistä
            if (isMonsterDying) {
                return;
            }
            const changingSound = document.getElementById("changing_sound");
            changingSound.currentTime = 0;
            changingSound.play();

            ic.style.transition = "transform 0.2s ease";
            ic.style.transform = "scale(1.3)";

            setTimeout(function() {
                ic.style.transform = "scale(1)";
            }, 200);


            //laittaa kaikille arvoksi false
            for (let mo of monsters){
                mo.isOn = false;
                mo.health = mo.h;
                monster.style.display = "none";
            }

            //etsii mitä näppäintä painettiin ja laittaa sille hirviölle true arvon
            if (ic === grass_icon) {
                grass.isOn = true;
            } else if (ic === mushroom_icon) {
                mushroom.isOn = true;
            } else if (ic === cat_icon) {
                cat.isOn = true;
            } else if (ic === fire_icon) {
                fire.isOn = true;
            } else if (ic === pumpkin_icon) {
                pumpkin.isOn = true;
            }

            showMonster();
        }; 
    }
}
