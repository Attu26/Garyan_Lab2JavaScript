function Question(text, choices, answer) {
    this.answer = answer;
    this.choices = choices;
    this.text = text;
}
Question.prototype.isCorrectAnswer = function (choice) {
    return this.answer === choice;
}
// create questions here
var questions = [
    new Question("Who invented Java Programming?", ["Guido van Rossum", "James GoslingL", "Dennis Ritchie", "Bjarne Stroustrup"], "James Gosling"),
    new Question("Which component is used to compile, debug and execute the java programs?", ["JRE", "JIT", "JDK", "JVM"], "JDK"),
    new Question("What is the extension of java code files?", [".js", ".txt", ".class", ".java"], ".java"),
    new Question("Which environment variable is used to set the java path?", ["MAVEN_Path", "JavaPATH", "JAVA", "JAVA_HOME"], "JAVA_HOME"),
    new Question("JavaScript is a", ["Language", "Programming Language", "Development", "All"], "Programming Language"),
];
//we will play a quiz
//initial score 0, starting point is q1 =>index 0
//load all the questions in the quiz

function Quiz(questions) {
    this.score = 0;
    this.questions = questions;
    this.questionIndex = 0;
}
Quiz.prototype.getQuestionByIndex = function () {
    return this.questions[this.questionIndex];
}
Quiz.prototype.isEnded = function () {
    return this.questionIndex === this.questions.length;
}
Quiz.prototype.checkOptionWithAnswer = function (answer) {
    if (this.getQuestionByIndex().isCorrectAnswer(answer)) {
        this.score++;
    }
    this.questionIndex++;
}

function handleOptionButton(id, choice) {
    var button = document.getElementById(id);
    button.onclick = function () {
        // check the answer
        quiz.checkOptionWithAnswer(choice);
        //look for next q
        loadQuestions();

        //console.log(id);
    }

}
function loadQuestions() {
    if (quiz.isEnded()) {
        showscores();

    } else {
    var element = document.getElementById("question");
    element.innerHTML = quiz.getQuestionByIndex().text;

    //show options
    var choices = quiz.getQuestionByIndex().choices;

    for (let i = 0; i < choices.length; i++) {
        var ele = document.getElementById("choice" + i);
        ele.innerHTML = choices[i];
        handleOptionButton("btn" + i, choices[i]);
    }
    //showing progress
    showProgress();

    }

    }
    function showProgress(){
        var el = document.getElementById("progress");
        el.innerHTML = "Question" + (quiz.questionIndex +1) + " of " + quiz.questions.length;
    }

function showscores(){
    var gameOverHTML = "<h1>Result<h1>";
    gameOverHTML +="<h2 id= 'score'> Your Scores:" + quiz.score + ".Your percentage is ::"+ (quiz.score/questions.length*100)+"%</h2>";
    var e = document.getElementById("quiz");
    e.innerHTML = gameOverHTML;
}
// create quiz
var quiz = new Quiz(questions);
// display quiz
loadQuestions();

