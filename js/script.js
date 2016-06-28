$(document).ready(function(){
  
  var questions = [{
                    'question' : 'Who was the 1st overall pick of the 1982 NBA Draft?',
                    'answers' : [['Michael Jordan', false], ['Patrick Ewing', false], ['Ralph Sampson', false], ['James Worthy', true]]
                  },
                  {
                    'question' : 'Who was the last NBA Rookie of the Year to NOT be drafted in the 1st Round of the NBA Draft?',
                    'answers' : [['Willis Reed, 1964', true], ['Earl Monroe, 1967', false], ['Adrian Dantley, 1976', false], ['Sidney Wicks, 1971', false]]
                  },
                  {
                    'question' : 'Since 1990, what team that received the 1st overall pick had the best previous season record?',
                    'answers' : [['Orlando, 1993', true], ['San Antonio, 1997', false], ['Chicago, 2008', false], ['Cleveland, 2014', false]]
                  },
                  {
                    'question' : 'Since 1985, what team has received the most number 1 picks?',
                    'answers' : [['Cleveland', true], ['L.A. Clippers', false], ['Orlando', false], ['Philadelphia', false]]
                  },
                  {
                    'question' : 'In 1985, how many teams were in the draft lottery?',
                    'answers' : [['Seven', true], ['Ten', false], ['Nine', false], ['Twelve', false]]
                  }]

  var questionsUsed = [];
  var currentQuestion = {};
  var correctAnswer = ''
  var count = 24;
  var questionNumber = 0;
  var timer;
  var stop = false;
  
  var topScore = 0;
  var currentScore = 0;



  var countdown = function(){
    if(count > 0){
      count--
      $('#shot_clock_countdown').text(count)
    }
  }

  var triggerCountDown = function(){
    $('#shot_clock_countdown').text(24);
    clearInterval(timer);
    console.log(questions.length)
    if(!stop){
      if(questions.length > 0){
        timer = setInterval(countdown, 1000);
      }else{
        timer = setInterval(countdown, 1000);
        stop = true;
      }
    }else{
      clearInterval(timer);
    }
  }
  
  var resetCountDown = function(){
    clearInterval(timer);
    count = 24;
  }
  
  var randomNumber = function(x){
    var result = Math.floor(Math.random() * x.length)
    return result
  }
  
  var getQuestion = function(list){
    var number = randomNumber(list);
    if(list.length > 0){
      $('.question').text(list[number].question);
      currentQuestion = list[number];
      var used = list.splice(number, 1);
      questionsUsed.push(used);
    }
    questionNumber++
    $('.question-number').text(questionNumber)
  }

  
  var getAnswer = function(obj){
    var q = obj['answers'];
    $('.answer-options').children().remove();
    for(var i = 0; i < q.length; i++){
      if(q[i][1]){
        correctAnswer = q[i][0]
      }
      $('.answer-options').append('<li class="answer shadow">' + q[i][0] + '</li>')
    };
  }
  
  var checkAnswer = function(answer, correct){
      if(answer === correct){
        currentScore = currentScore + count;
        $('.current-score-number').text(currentScore)
        if(currentScore > topScore){
          topScore = currentScore
          $('.top-score-number').text(topScore);
        }
      }else{
        console.log('incorrect')
      }
  }

  var resetQuestions = function(){
    stop = false;
    for(var i = 0; i < questionsUsed.length; i++){
      questions.push(questionsUsed[i]);
    }
  }
  
  var checkEndGame = function(){
    if(!questions.length){
      resetCountDown();
    }
  }
  


  $('.top-score-number').text(topScore);
  $('.current-score-number').text(currentScore)
  $('.total-questions').text(questions.length)

  $('body').on('click', '.start', function(){
    
    $('.start').hide();
    $('.question-tracker-text').show();
    $('.answer-box').show();
    $('.submit').show();
    $('body').on('click', '.answer', function(){
      $(this).addClass('highlight');
      $(this).siblings().removeClass('highlight')
    });

    triggerCountDown();    
    getQuestion(questions);
    getAnswer(currentQuestion);

    
    console.log(currentQuestion)
    
    $('body').on('click', '.submit', function(){
      var answer = $('.highlight').text()
      
      
      checkEndGame();
      checkAnswer(answer, correctAnswer);      
      resetCountDown();
      getQuestion(questions);
      getAnswer(currentQuestion);
      triggerCountDown(); 
      
    });
   
    




    $('body').on('click', '#new_game', function(){
      clearInterval(timer);
      $('#shot_clock_countdown').text(24)
      resetQuestions();
      $('.current-score-number').text('');
      $('.start').show();
      $('.question-tracker-text').hide();
      $('.answer-box').hide();
      $('.submit').hide();
      $('.question').text('Welcome to the NBA Draft Quiz. To begin, simply click the Start button above.')
    })


  })
  
  
});






/*
http://aishek.github.io/jquery-animateNumber/

<p id="revese-countdown">10</p>

$('#revese-countdown')
  .prop('number', 10)
  .animateNumber(
    {
      number: 0,
      numberStep: function(now, tween) {
        var target = $(tween.elem),
            rounded_now = Math.round(now);

        target.text(now === tween.end ? 'Launch!' : rounded_now);
      }
    },
    10000,
    'linear'
  );
*/
