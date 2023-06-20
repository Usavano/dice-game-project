/**SET ITEMS */
let computerChoise = [];
let userChoise = [];
let inGameFlag = false;
let level = 1;
let speed = 700;
const btns = document.querySelectorAll('.btn');
const gameTitle = document.querySelector('.game-area__title');

/**EVENTS */
window.addEventListener('keydown', (e) => {
    if (!inGameFlag) {
        inGameFlag = true;
        gameTitle.textContent = `Level: ${level}`;
        // adding random color
        addingRandomColorByComp();
        // show computer pattern
        computerPattern();
        // adding first sound
    }
});

btns.forEach(item => {
    item.addEventListener('click', () => {
        if (computerChoise.length > 3) {
            speed = 600;
        }
        if (computerChoise.length > 6) {
            speed = 400;
        }
        if (inGameFlag) {
            const itemColor = item.dataset.color;
            lightTheButton(item);
            addSound(itemColor);
            userChoise.push(itemColor);
            const checked = userChoise.every((el,index) => {
                return el === computerChoise[index];
            });
            if (checked && userChoise.length === computerChoise.length) {
                level++;
                gameTitle.textContent = `Level: ${level}`;
                // adding random color
                addingRandomColorByComp();
                // show computer pattern
                computerPattern();
                // null user choise each iteration
                userChoise = [];
            }
            if (!checked) {
                const bgColor = window.getComputedStyle(document.body, null).getPropertyValue('background-color');
                gameOverStyle(bgColor);
                addSound('wrong');
                gameOverStyle();
                gameTitle.textContent = 'Game over! press a to restart';
                nullGame();
            }
        }
    });
});


/**FUNCTIONS */

// add random color to computer choise array
function addingRandomColorByComp() {
    const mainColorsArray = ['red', 'yellow', 'blue', 'green'];
    const index = Math.floor(Math.random() * 4);
    computerChoise.push(mainColorsArray[index]);
}
// adding active class to buttons (Lightning)
function lightTheButton(btn) {
    btn.classList.add('active');
    setTimeout(() => {
        btn.classList.remove('active');
    }, 200);
}
//adding sounds
function addSound(color) {
    const sound = new Audio (`../sounds/${color}.mp3`);
    sound.play();
}
// show computer pattern
function computerPattern() {
    btns.forEach(el => {
        computerChoise.forEach((item,index) => {
            setTimeout (() => {
                const elColor = el.dataset.color;
                if (item === elColor) {
                    lightTheButton(el);
                    addSound(elColor);
                }
            }, (index + 1) * speed)
        });
    });
}
// null all the game
function nullGame() {
    computerChoise = [];
    userChoise = [];
    inGameFlag = false;
    level = 0;
    speed = 700;
}
// gameover style
function gameOverStyle(bg) {
    document.body.style.background = '#FF7474';
    setTimeout(() => {
        document.body.style.background = bg;
    }, 600);
}
