// Proto: It is an actual object that provides a way to inherit properties from JavaScript 
// with the help of an object which is created with new. Every object with behavior associated has internal property [[prototype]].

// Prototype: It is a special object which means it holds shared attributes and behaviors of instances. 
// It is a way to inherit properties from javascript as it is available in every function declaration.


// __proto__ is the actual object that is used in the lookup chain to resolve methods, etc. 
// prototype is the object that is used to build __proto__ when you create an object with new:

//Every single entity is like an object

//Every object has object prototype in it
//Based on the type of the variable.

//var a =2
// Number.prototype
// object.prototype
// null


// Quiz
// questions
// score
// questionIndex to track of quiz status

// class Quiz{
//     private List<Question> questions;
//     private Int score;
//     private Int questionIndex;
        // Quiz(List<Questions> questions){
        //     this.questions=questions;
        // }

//     public boolean isEnded(){
        // return questionIndex==questions.size();
// }
// }
// List<Questions> sciencequestions = getScienceQuestions();
// Quiz scienceQuiz = new Quiz(scienceQuestions);
// List<Questions> mathsQ = getMathsQ();
// Quiz mathsQ = new Quiz(mathsQ);
//mathsQ.isEnded()==scienceQ.isEnded();

function Quiz(questions) {
  this.score = 0;
  this.questions = questions;
  this.questionIndex = 0;
}

Quiz.prototype.getQuestionByIndex = function() {
  return this.questions[this.questionIndex];
}

Quiz.prototype.checkOptionWithAnswer = function(answer) {
  if(this.getQuestionByIndex().isCorrectAnswer(answer)) {
      this.score++;
  }

  this.questionIndex++;
}

Quiz.prototype.isEnded = function() {
  return this.questionIndex === this.questions.length;
}


function Question(text, choices, answer) {
  this.text = text;
  this.choices = choices;
  this.answer = answer;
}

Question.prototype.isCorrectAnswer = function(choice) {
  return this.answer === choice;
}


function loadQuestions() {
  if(quiz.isEnded()) {
      showScores();
  }
  else {
      // show question
      var element = document.getElementById("question");
      element.innerHTML = quiz.getQuestionByIndex().text;

      // show options
      var choices = quiz.getQuestionByIndex().choices;
      for(var i = 0; i < choices.length; i++) {
          var element = document.getElementById("choice" + i);
          element.innerHTML = choices[i];
          handleOptionButton("btn" + i, choices[i]);
      }

      showProgress();
  }
};

function handleOptionButton(id, choice) {
  var button = document.getElementById(id);
  button.onclick = function() {
      quiz.checkOptionWithAnswer(choice);
      loadQuestions();
  }
};


function showProgress() {
  var currentQuestionNumber = quiz.questionIndex + 1;
  var element = document.getElementById("progress");
  element.innerHTML = "Question " + currentQuestionNumber + " of " + quiz.questions.length;
};

function showScores() {
  var gameOverHTML = "<h1>Result</h1>";
  gameOverHTML += "<h2 id='score'> Your scores: " + quiz.score + ".And mark percentage is: "+(quiz.score/questions.length*100)+"%"+"</h2>";
  var element = document.getElementById("quiz");
  element.innerHTML = gameOverHTML;
};

// create questions here
var questions = [
  new Question("JavaScript supports", ["Functions", "XHTML","CSS", "HTML"], "Functions"),
  new Question("Which language is used for styling web pages?", ["HTML", "JQuery", "CSS", "XML"], "CSS"),
  new Question("Which is not a JavaScript Framework?", ["Python Script", "JQuery","Django", "NodeJS"], "Django"),
  new Question("Which is used for Connect To Database?", ["PHP", "HTML", "JS", "All"], "PHP"),
  new Question("JavaScript is a ", ["Language", "Programming Language", "Development", "All"], "Programming Language")
];

// create quiz
var quiz = new Quiz(questions);

// display quiz
loadQuestions();