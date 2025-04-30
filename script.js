let isMonsterDying = false;
let isMonsterChoosed = false;
let isFrogBought = false;
let win_checker = false;

console.log("Hello");

//sammakon tasot
const levelBtn = document.getElementById("level_btn");
const levelPrice = document.getElementById("level_price");
let level_checker = 1;
let level_status = "level" + 1;
let value = 5;
let cost = 10;

const healthDisplay = document.getElementById("monster_health");
const witchPower = document.getElementById("witch_power");

//noita, samakko ja hirviö
const monster = document.getElementById("monster");
const witchDisplay = document.getElementById("witch");
const frogDisplay = document.getElementById("frog");

//näppäimet, ikkunat ja valikot
const startBtn = document.getElementById("start-btn");
const startScreen = document.getElementById("start-screen");
const gameWindow = document.getElementById("game_window");
const yesBtn = document.getElementById("yes-btn");
const noBtn = document.getElementById("no-btn");
const noUpdate = document.getElementById("no_update");
const frog_menu = document.getElementById("frog_menu");
const frog_level = document.getElementById("frog_level");
const info_menu = document.getElementById("info_menu");

//viesti käyttäjälle
const warning_msg = document.getElementById("warning");

monster.style.display = "none";
healthDisplay.style.display = "none";
witchPower.style.display = "none";

gameWindow.style.display ="none";
frog_menu.style.display = "none";
frog_level.style.display = "none";
warning_msg.style.display = "none";
info_menu.style.display = "none";


//musiikki
const music = document.getElementById("bg-music");
let isMusicPlaying = true;

function startMusic() {
    music.play().catch(function(error) {
        console.log("Music can't be played", error); //jos on joku virhe
    })
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
const frog_sound = document.getElementById("frog_sound");
const game_win = document.getElementById("game_win");



//noita
let witch = {
    hitPower: 1,
    normal: "gif/witch.gif",
    hit: "gif/witch_hit.gif"
};

//sammakko
let frog = {
    hitPower: 1,
    normal:"gif/frog_normal.gif",
    hit: "gif/frog_attack.gif",
};

//Kaikki hirviöt ja niiden eri muodot
let grass = {
    isOn: true,
    health: 100,
    h: 100,
    power: 1,
    normal: "gif/grass_monster.gif",
    hit: "gif/grass_monster_hit.gif",
    start: "gif/grass_monster_start.gif"
};

let mushroom = {
    isOn: false,
    health: 500,
    h: 500,
    power: 2,
    normal: "gif/mushroom_monster.gif",
    hit: "gif/mushroom_monster_hit.gif",
    start: "gif/mushroom_monster_start.gif"
};


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
};

let pumpkin= {
    isOn: false,
    health: 500000,
    h: 500000,
    power: 20,
    normal: "gif/pumpkin_monster.gif",
    hit: "gif/pumpkin_monster_hit.gif",
    start: "gif/pumpkin_monster_start.gif"
};

const stars = "gif/stars.gif";

const monsters = [grass, mushroom, cat, fire, pumpkin];



//hirviöiden valinta näppäimet:
const grass_icon = document.getElementById("grass_icon");
const mushroom_icon = document.getElementById("mushroom_icon");
const cat_icon = document.getElementById("cat_icon");
const fire_icon = document.getElementById("fire_icon");
const pumpkin_icon = document.getElementById("pumpkin_icon");

const icons  = [grass_icon, mushroom_icon, cat_icon, fire_icon, pumpkin_icon];

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




//aloitusnäyttö
startBtn.onclick = function() {
  //piilottaa start screen ja laittaa esille pelin
  startScreen.style.display = "none";
  gameWindow.style.display = "block";
  info_menu.style.display = "block";

  //laittaa musiikin päälle
  startMusic();

  //aloittaa pelin
  startGame();
}



function startGame() {
    //musiikki näppäin
    songButton.onclick = function() {
        if (isMusicPlaying) {
            stopMusic();
            songButton.src = "gif/song_off.png";
            isMusicPlaying = false;
        }else {
            startMusic();
            songButton.src = "gif/song_on.png";
            isMusicPlaying = true;
        }
    }

    //hirviöiden valinta näppäimet
    for (let ic of icons) {
        ic.onclick = function() { //jos painaa jonkun hirviön vaihto näppäimistä
            if (isMonsterDying) {
                return;
            }

            changingSound.currentTime = 0;
            changingSound.play();

            ic.style.transition = "transform 0.2s ease";
            ic.style.transform = "scale(1.3)";

            setTimeout(function() {
                ic.style.transform = "scale(1)";
            }, 200)


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

            isMonsterChoosed = true;
            showMonster();
        }
    }


    //peli
    function showMonster() {
        if (isMonsterDying) {
            return;
        }

        for (let m of monsters) {
            if (m.isOn) {

                if (!isMonsterDying) {
                    //odottaa, ennen kun hirviö ilmestyy
                    setTimeout(function(){
                        monster.src = m.start;
                        monster.style.display ="block";
                        healthDisplay.textContent = m.health;

                    //sen jälkeen odottaa vielä sekunnin
                        setTimeout(function(){
                            if (!isMonsterDying) {
                                monster.src = m.normal;
                            }

                        }, 1000);
                    }, 500)
                }
                
                //jos klikkaa hirviötä hänen terveys pienenee
                monster.onclick = function() { 
                    if (isMonsterDying) {
                        return;
                    }

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
                    }, 300)

                    //näyttää puoli sekunttia hirviön terveys määrää
                    setTimeout(function(){
                        healthDisplay.style.display = "none";
                    },500)

                    //näyttää, että noita käyttää omia voimia
                    setTimeout(function() {
                        witchDisplay.src = witch.normal;
                    },800)
                

                    //jos hirviö kuoli
                    if (m.health <= 0) {
                        win_sound.play();
                        isMonsterDying = true;
                        isMonsterChoosed = false;
                        witch.hitPower += m.power;
                        witchPower.textContent = witch.hitPower;
                        witchPower.style.display = "block";
                        
                        monster.style.pointerEvents = "none";
                        monster.src = stars;

                        unlockIcons(); //avaa uuden hirviön, jos noidan voimat ovat riittävät

                        setTimeout(function() {
                            monster.style.display = "none";
                            healthDisplay.style.display = "none";
                            witchPower.style.display = "none";
                            monster.style.pointerEvents = "auto";
                            isMonsterDying = false;
                        }, 2000)
                    }
                }
            }
        }
    }


    //jos painaa sammakkoa, avautuu valikko frog_menu, jos !isFrogBought
    frogDisplay.onclick = function() {

        if (!isFrogBought) {
            frog_menu.style.display = "block";

            noBtn.onclick = function() {
                frog_menu.style.display = "none";
            }
            yesBtn.onclick = function() {
                if (witch.hitPower > 20) {
                    coin_sound.play();
                    frog_menu.style.display = "none";
                    isFrogBought = true;
                    witch.hitPower -= 20;
                } else {
                    warning_msg.textContent = "Not enough power";
                    frog_menu.style.display = "none";
                    warning_msg.style.display = "block";
                    warning_sound.play();

                    setTimeout(function() {
                        warning_msg.style.display = "none";
                    }, 2000)
                }
            }
        } else if (isFrogBought) {      //jos sammakko on jo ostettu, avautuu frog_level valikko
            frog_level.style.display = "block";
        }

        noUpdate.onclick = function() {     //"no" näppäin, joka sulkee frog_level valikon
            frog_level.style.display = "none";
            changingSound.play();
        }
    }



    //funktio tarkistaa mitä näppäintä painettiin frog_level ikkunassa
    function frogLevelBuy() {
        levelBtn.onclick = function() {
            if(witch.hitPower > cost && level_checker <= 4) { //ostaa uuden tason, jos on tarpeeksi taika voimia
                coin_sound.play();
                frog_level.style.display = "none";
                witch.hitPower -= cost;
                frog.hitPower += value;
                level_checker += 1;
                value += 5;
                cost += 10;
                level_status = "level " + level_checker;

                levelPrice.textContent = "-" + cost;
                levelBtn.textContent = level_status;

            } else if (witch.hitPower < cost){
                warning_msg.textContent = "Not enough power";
                frog_level.style.display = "none";
                warning_msg.style.display = "block";
                warning_sound.play();

                setTimeout(function() {
                    warning_msg.style.display = "none";
                }, 2000);
            }

            if (level_checker > 4) {
                let text = "Full";
                levelBtn.textContent = text;
                levelBtn.disabled = true;
                levelBtn.style.pointerEvents = "none";
                levelPrice.style.display = "none";
                return;
            }
        }
    }
    frogLevelBuy();

    setInterval(function () {
        if (!isMonsterDying && isFrogBought && monster.style.display !== "none") {
            for (let monst of monsters) {
                if (monst.isOn) {
                    frogDisplay.src = frog.hit;
                    frog_sound.play();

                    monster.src = monst.hit;
                    monst.health -= frog.hitPower;
                    healthDisplay.textContent = monst.health;
                    healthDisplay.style.display = "block";
    
                    setTimeout(function() {
                        if (!isMonsterDying) {
                            monster.src = monst.normal;
                        }
                    }, 300)

                    setTimeout(function() {
                        frogDisplay.src = frog.normal;
                    },1500)
    
                    // näyttää puoli sekunttia hirviön terveys määrää
                    setTimeout(function() {
                        healthDisplay.style.display = "none";
                    }, 500)
    
                    // jos hirviö kuoli
                    if (monst.health <= 0) {
                        win_sound.play();
                        isMonsterDying = true;
                        isMonsterChoosed = false;
                        witch.hitPower += monst.power;
                        witchPower.textContent = witch.hitPower;
                        witchPower.style.display = "block";
    
                        monster.style.pointerEvents = "none";
                        monster.src = stars;
    
                        unlockIcons(); // avaa uuden hirviön, jos noidan voimat ovat riittävät
    
                        setTimeout(function() {
                            monster.style.display = "none";
                            healthDisplay.style.display = "none";
                            witchPower.style.display = "none";
                            monster.style.pointerEvents = "auto";
                            isMonsterDying = false;
                        }, 2000);
                    }
                }
            }
        }
    }, 5000)

    setInterval(function() {
        if (!win_checker && witch.hitPower >= pumpkin.health) {
            game_win.play();
            warning_msg.textContent = "Congrats! You are the strongest. Continue or restart";
            warning_msg.style.display = "block";
            win_checker = true;
            music.pause();
    
            setTimeout(function() {
                warning_msg.style.display = "none";
                music.play();
            }, 7000)
        };
    }, 1000)
}
