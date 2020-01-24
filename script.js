class Gladiator {
    constructor() {
        this.name = faker.fake("{{name.lastName}} {{name.firstName}}");
        this.initialHealth = this.getGladiatorInitialHealth();
        this.health = this.initialHealth;
        this.power = this.getGladiatorInitialPower();
        this.initialSpeed = this.getGladiatorInitialSpeed();
        this.speed = this.initialSpeed * (this.health / this.initialHealth);
    }
    //speed = initial_speed * (health/initial_health)

    getGladiatorInitialHealth() {
        return Math.floor(Math.random() * 20) + 81;
    }

    getGladiatorInitialPower() {
        return ((Math.random() * 3) + 2).toFixed(1);
    }

    getGladiatorInitialSpeed() {
        return ((Math.random() * 4) + 1).toFixed(3);
    }
}

const startBtn = document.getElementById("start_btn");
startBtn.setAttribute("disabled", "disabled");
const countOfGladiatorsField = document.getElementById("count_of_gladiators");
const helpText = document.getElementById("help_text");
const wrapper = document.querySelector(".wrapper");
const startGameBtn = document.getElementById("start_game_btn");
const battleInfoWrapper = document.getElementById("battle_info_wrapper");
const gladiatorsArr = [];
let countOfGladiators;
showInfoAboutBattle();

countOfGladiatorsField.addEventListener("keyup", function() {
    helpText.innerText = "";
    validateCount(this.value);
});
/*validate Count of enemies in UI*/
function validateCount (count) {
    let re = "^[-+]?[0-9]*\?[0-9]+([eE][-+]?[0-9]+)?$";
    if (count.match(re)) {
        countOfGladiators = count;
        startBtn.removeAttribute("disabled");
    }else {
        startBtn.setAttribute("disabled", "disabled");
        helpText.innerText = "Please input valid number";
    }
}

startBtn.addEventListener("click", () => {
    startGame(countOfGladiators);
    $('#startGameInitialOptionModal').modal('hide');
    startGameBtn.style.display = "none";

});

function startGame(count) {
    for (let i = 0; i < count; i++) {
        gladiatorsArr.push(new Gladiator(count));
    }
    console.log(gladiatorsArr);
    startFightingRandomly(gladiatorsArr);
}

function startFightingRandomly(arr = []) {
    if (arr.length === 1) {
        console.log(arr, `${arr[0].name} won the battle with health x${arr[0].health}`);
    }
    else if (arr.length > 1) {
         let timerId = setInterval(() => {
            arr.map((elem, index, arr) => {
                let currentEnemy = Math.floor(Math.random() * arr.length);
                if (arr[currentEnemy].health < 30 && arr[currentEnemy].health > 0) {
                    if (arr[currentEnemy].speed <= arr[currentEnemy].initialSpeed) {
                        arr[currentEnemy].speed *= 3;
                    }
                    console.log(`[ ${elem.name} x ${elem.health} ] hits [${arr[currentEnemy].name} x ${arr[currentEnemy].health} ] with power ${elem.power}`);
                    arr[currentEnemy].health = Math.floor(arr[currentEnemy].health - elem.power);
                }else if (arr[currentEnemy].health > 0) {
                    console.log(`[ ${elem.name} x ${elem.health} ] hits [${arr[currentEnemy].name} x ${arr[currentEnemy].health} ] with power ${elem.power}`);
                    arr[currentEnemy].health = Math.floor(arr[currentEnemy].health - elem.power);
                }else {
                    clearInterval(timerId);
                    if (getCaesarDecision() ){
                        arr[currentEnemy].health += 50;
                        console.log("Caesar showed" + "👍" + `to [ ${arr[currentEnemy].name} ]`);
                        startFightingRandomly(arr);
                    }else {
                        console.log("Caesar showed" +  "👎" + `to [ ${arr[currentEnemy].name} ]`);
                        console.log(`[ ${arr[currentEnemy].name} ] dying`);
                        let removed = arr.splice(currentEnemy, 1);
                        startFightingRandomly(arr);
                    }
                }
            });
        }, 200);
    }
}

function getCaesarDecision() {
    return Math.floor(Math.random() * 2);
}

function showInfoAboutBattle() {
    console.log(battleInfoWrapper);
}




