let isMonsterDying = false;
let isMonsterChoosed = false;

const frog_menu = document.getElementById("frog_menu");
frog_menu.style.display = "none";
let isFrogBought = false;

const frog_level = document.getElementById("frog_level");
frog_level.style.display = "none";

const warning_msg = document.getElementById("warning");
warning_msg.style.display = "none";

//musiikki
const music = document.getElementById("bg-music");
let isMusicPlaying = true;

function startMusic() {
    music.play().catch(function(error) {
        console.log("Music can't be played", error); //jos on joku virhe
    });
}

function stopMusic() {
    music.pause();
    music.currentTime = 0;
}

//ääniä
const songButton = document.getElementById("song_button");
const hitSound = document.getElementById("hit-sound");
const changingSound = document.getElementById("changing_sound");
const coin_sound = document.getElementById("coin_sound");
const warning_sound = document.getElementById("warning_sound");
const win_sound = document.getElementById("win-sound");


//noita
let witch = {
    hitPower: 1,
    normal: "gif/witch.gif",
    hit: "gif/witch_hit.gif"
}

//sammakko
let frog = {
    hitPower: 1,
    normal:"gif/frog_normal.gif",
    hit: "gif/frog_attack.gif",
}

//Kaikki hirviöt ja niiden eri muodot
let grass = {
    isOn: true,
    health: 100,
    h: 1,
    power: 19, //VAIHTAA TÄMÄ, KUN VIIMEISET TESTIT ON TEHTY
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



const grass_icon = document.getElementById("grass_icon")
const mushroom_icon = document.getElementById("mushroom_icon")
const cat_icon = document.getElementById("cat_icon")
const fire_icon = document.getElementById("fire_icon")
const pumpkin_icon = document.getElementById("pumpkin_icon")

const icons  = [grass_icon, mushroom_icon, cat_icon, fire_icon, pumpkin_icon]

function unlockIcons() {
    const unlocks = [
        { icon: mushroom_icon, neededValue: 10 },
        { icon: cat_icon, neededValue: 20 },
        { icon: fire_icon, neededValue: 30 },
        { icon: pumpkin_icon, neededValue: 40 }
    ];

    for (let { icon, neededValue } of unlocks) {
        if (witch.hitPower >= neededValue) {
            icon.style.filter = "brightness(100%)";
            icon.style.pointerEvents = "auto";
        } else {
            icon.style.filter = "brightness(50%)";
            icon.style.pointerEvents = "none";
        }
    }
}
unlockIcons()


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
                        win_sound.play()
                        isMonsterDying = true;
                        isMonsterChoosed = false;
                        witch.hitPower += m.power;
                        witchPower.textContent = witch.hitPower;
                        witchPower.style.display = "block";
                        
                        monster.style.pointerEvents = "none";
                        monster.src = stars;

                        unlockIcons() //avaa uuden hirviön, jos noidan voimat ovat riittävät

                        setTimeout(function() {
                            monster.style.display = "none";
                            healthDisplay.style.display = "none";
                            witchPower.style.display = "none";
                            monster.style.pointerEvents = "auto";
                            isMonsterDying = false;
                        }, 2000);
                    };
                };
            };
        };
    };



    for (let ic of icons) {
        ic.onclick = function() { //jos painaa jonkun hirviön vaihto näppäimistä
            if (isMonsterDying) {
                return;
            };

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
            };

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
            };

            isMonsterChoosed = true;
            showMonster();
        }; 
    };


    //sammakko level
    const level1 = document.getElementById("level1");
    const level2 = document.getElementById("level2");
    const level3 = document.getElementById("level3");
    const level4 = document.getElementById("level4");

    const levels = [
        {lvl: level1, value: 10},
        {lvl: level2, value: 20},
        {lvl: level3, value: 30},
        {lvl: level4, value: 40}
    ];

    function frogLevelBuy(level, power_value) {
        level.onclick = function() {
            if (witch.hitPower > power_value) {
                coin_sound.play();
                frog_level.style.display = "none";
                witch.hitPower -= power_value;
            } else {
                warning_msg.textContent = "Not enough power";
                frog_level.style.display = "none";
                warning_msg.style.display = "block";
                warning_sound.play()

                setTimeout(function() {
                    warning_msg.style.display = "none";
                }, 2000)
            };
        };
    };

    const frogDisplay = document.getElementById("frog");
    const yesBtn = document.getElementById("yes-btn");
    const noBtn = document.getElementById("no-btn");

    frogDisplay.onclick = function() {
        
        if (!isFrogBought) {
            frog_menu.style.display = "block";

            noBtn.onclick = function() {
                frog_menu.style.display = "none";
            }
            yesBtn.onclick = function() {
                if (witch.hitPower > 20) {
                    coin_sound.play()
                    frog_menu.style.display = "none";
                    isFrogBought = true;
                    witch.hitPower -= 20;
                } else {
                    warning_msg.textContent = "Not enough power";
                    frog_menu.style.display = "none";
                    warning_msg.style.display = "block";
                    warning_sound.play()

                    setTimeout(function() {
                        warning_msg.style.display = "none";
                    }, 2000)
                }

            }
        } else if (isFrogBought) {
            frog_level.style.display = "block";
        }

        for (let {lvl, value} of levels) {
            frogLevelBuy(lvl, value)
        }

    }
    
};
