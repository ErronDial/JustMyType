const uppercaseKeyBoard = $("#keyboard-upper-container");
uppercaseKeyBoard.hide();
const lowerCaseKeyBoard = $("#keyboard-lower-container");
const body = $("body");
const highlighter = $("#yellow-block");
const startButton = $('#start-button');
let sentences = ['ten ate neite ate nee enet ite ate inet ent eate', 'Too ato too nOt enot one totA not anot tOO aNot', 'oat itain oat tain nate eate tea anne inant nean', 'itant eate anot eat nato inate eat anot tain eat', 'nee ene ate ite tent tiet ent ine ene ete ene ate'];
body.on("keypress", function (ev) {


    let keyStroke = $("#" + ev.keyCode);
    evaluateKeystroke(keyStroke);

})
body.on("keydown", function (ev) {
    if (ev.shiftKey) {
        lowerCaseKeyBoard.hide();
        uppercaseKeyBoard.show();
    }
})
body.on("keyup", function (ev) {

    if (ev.keyCode === 16) {
        lowerCaseKeyBoard.show();
        uppercaseKeyBoard.hide();
    }
})
let currentSentence = 0;
let currentLetterIndex = 0;
let currentLetter;
let numberOfMistakes = 0;

function nextSentence() {
    $("#sentence").html(sentences[currentSentence])
    currentLetterIndex = 0;

    expectedLetter()
}
function expectedLetter() {
    if (sentences[currentSentence].substring(currentLetterIndex, currentLetterIndex + 1).length < 1) {
        currentSentence++;
        if (typeof sentences[currentSentence] === "undefined") {
            endOfGame();
            return;
        }
        nextSentence();
        return;
    }
    currentLetter = sentences[currentSentence].substring(currentLetterIndex, currentLetterIndex + 1);
    if (currentLetter === " ") {
        $("#target-letter").text("Space")
        currentLetter = "Space"
    }
    else {
        $("#target-letter").text(currentLetter)
    }

}
function evaluateKeystroke(key) {
    console.log(key);
    if (key !== null && key.text() == currentLetter) {
        $("#feedback").text("check").css("color", "green");
        currentLetterIndex++;
        expectedLetter()
        highlighter.css("left", (19 * currentLetterIndex) + "px")
    }
    else {
        $("#feedback").text("X").css("color", "red");
        numberOfMistakes++
    }
}

let time = 0;
let timer;

function startTimer() {
    return setInterval(function () {
        time++;
        console.log(time)
    }, 1000);

}

function startGame() {
    currentLetterIndex = 0;
    currentSentence = 0;
    numberOfMistakes = 0;
    time = 0;
    timer = startTimer();
    nextSentence();
    startButton.hide();
}

function endOfGame() {
    clearInterval(timer);
    startButton.show();
    let numberOfWords = 0;
    sentences.forEach(function (sentence) {
        numberOfWords += sentence.split(' ').length;
    })
    let minutes = time / 60;
    let wpm = numberOfWords / minutes - 2 * numberOfMistakes;
    $("#feedback").text ("wpm : " + parseInt(wpm));
    $("#target-letter").text("");
    $("#sentence").text("");

}
startButton.click (startGame)

