$(document).ready(function(){
  
  // event listeners
  $("#remaining-time").hide();
  $("#start").on('click', trivia.startGame);
  $(document).on('click' , '.option', trivia.guessChecker);
  
})

var trivia = {
  // trivia properties
  correct: 0,
  incorrect: 0,
  unanswered: 0,
  currentSet: 0,
  timer: 60,
  timerOn: false,
  timerId : '',
  // questions options and answers data
  questions: {
    q1: 'What heavenly body represents Hades?',
    q2: 'What planet represents Zeus?',
    q3: 'What planet represents Poseidon?',
    q4: 'Which planet is often described as “rolling around the Sun on its side.”?',
    q5: 'Which is the second smallest planet in the solar system?',
    q6: 'how long does it take light from the Sun reach Earth?',
    q7: "Which is the densest planet in the Solar System?",
  },
  options: {
    q1: ['PLUTO', 'MARS', 'THE SUN', 'LUNA'],
    q2: ['JUPITER', 'NEPTUNE', 'SATURN', 'MARS'],
    q3: ['VENUS', 'NEPTUNE', 'SATURN', 'MARS'],
    q4: ['PLUTO', 'MARS', 'URANUS', 'MERCURY'],
    q5: ['MERCURY','PLUTO','VENUS','TITAN'],
    q6: ['8 MINS','30 MINS','10 MINS','30 SECONDS'],
    q7: ['MARS', 'EARTH', 'MERCURY','JUPITER']
  },
  answers: {
    q1: 'PLUTO',
    q2: 'JUPITER',
    q3: 'NEPTUNE',
    q4: 'URANUS',
    q5: 'MERCURY',
    q6: '8 MINS',
    q7: 'EARTH',
  },
  // trivia methods
  // method to initialize game
  startGame: function(){
    // restarting game results
    trivia.currentSet = 0;
    trivia.correct = 0;
    trivia.incorrect = 0;
    trivia.unanswered = 0;
    clearInterval(trivia.timerId);
    
    // show game section
    $('#game').show();
    
    //  empty last results
    $('#results').html('');
    
    // show timer
    $('#timer').text(trivia.timer);
    
    // remove start button
    $('#start').hide();

    $('#remaining-time').show();
    
    // ask first question
    trivia.nextQuestion();
    
  },
  // method to loop through and display questions and options 
  nextQuestion : function(){
    trivia.timerId = true
    // to prevent timer speed up
    if(!trivia.timerOn){
      trivia.timerId = setInterval(trivia.timerRunning, 1000);
    }
    
    // gather all the questions then indexes the current questions
    var questionContent = Object.values(trivia.questions)[trivia.currentSet];
    $('#question').text(questionContent);
    console.log(questionContent)
    // an array of all the user options for the current question
    var questionOptions = Object.values(trivia.options)[trivia.currentSet];
    
    // creates all the trivia guess options in the html
    $.each(questionOptions, function(options,key){
      $('#options').append($('<button class="option btn btn-info btn-lg">'+key+'</button>'));
    })
    clearInterval(trivia.timerId);
  },
  // method to decrement counter and count unanswered if timer runs out
  timerRunning : function(){
    // if timer still has time left and there are still questions left to ask
    if(trivia.timer > 0 || trivia.currentSet < Object.key(trivia.questions).length){
      $('#timer').text(trivia.timer);
      trivia.timer--;
      if(trivia.timer === -1){
         $('#timer').addClass('reset');
        }
    }
    // the time has run out and increment unanswered, run result
    else if(trivia.timer === -1){
      trivia.unanswered++;
      trivia.result = false;
      
      resultId = setTimeout(trivia.guessResult, 1000);
      $('#results').html('<h3>Out of time! The answer was '+ Object.values(trivia.answers)[trivia.currentSet] +'</h3>');
    }
    // if all the questions have been shown end the game, show results
    else if(questionContent == undefined){
      
      // adds results of game (correct, incorrect, unanswered) to the page
      $('#results')
        .html('<h3>Thank you for playing!</h3>'+
        '<p>Correct: '+ trivia.correct +'</p>'+
        '<p>Incorrect: '+ trivia.incorrect +'</p>'+
        '<p>Unaswered: '+ trivia.unanswered +'</p>'+
        '<p>Please play again!</p>');
      
      // hide game sction
      $('#game').hide();
      
      // show start button to begin a new game
      $('#start').show();
    }
    
  },
  // method to evaluate the option clicked
  guessChecker : function() {
    
    
     $('#results').show();
    
    // the answer to the current question being asked
    var currentAnswer = Object.values(trivia.answers)[trivia.currentSet];
    
    // if the text of the option picked matches the answer of the current question, increment correct
    if($(this).text() === currentAnswer){
      // turn button green for correct
      $(this).addClass('btn-success').removeClass('btn-info');
      
      trivia.correct++;
      resultTimer = setTimeout(trivia.guessResult, 500);
      $('#results').html('<h3>Correct Answer!</h3>');
    }
    // else the user picked the wrong option, increment incorrect
    else{
      // turn button clicked red for incorrect
      $(this).addClass('btn-danger').removeClass('btn-info');
      
      trivia.incorrect++;
      resultTimer = setTimeout(trivia.guessResult, 500);
      $('#results').html('<h3>Wrong answer! '+ currentAnswer +'</h3>');
    }
    
  },
  // method to remove previous question results and options
  guessResult : function(){
    
    
    // increment to next question set
    trivia.currentSet++;
    
    // remove the options and results
    $('.option').remove();
    $('#results h3').remove();
    
    // begin next question
    trivia.nextQuestion();
   
  }

}