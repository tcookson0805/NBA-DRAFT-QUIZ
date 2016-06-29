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
                  },
                  
                  
                  
                  {
                    'question' : 'What year was the first NBA Draft?',
                    'answers' : [['1947', true], ['1951', false], ['1943', false], ['1958', false]]
                  },
                  {
                    'question' : 'Who was the very first NBA Draft pick?',
                    'answers' : [['Clifton McNeeley', true], ['George Mikan', false], ['Chuck Share', false], ['Hot Rod Hundley', false]]
                  },                 
                  {
                    'question' : 'Who was the first player drafted 1st overall straight out of High School?',
                    'answers' : [['Kwame Brown', true], ['Lebron James', false], ['Moses Malone', false], ['Cazzie Russell', false]]
                  },
                  {
                    'question' : 'Who was the 4th overall pick of the 1957 NBA Draft?',
                    'answers' : [['Win Wilfong', true], ['Sam Jones', false], ['Jim Palmer', false], ['Charlie Tyra', false]]
                  },
                  {
                    'question' : 'Who were the first college teammates to be drafted 1st overall in successive years?',
                    'answers' : [['Dick Ricketts and Si Green', true], ['Kareem Abdul-Jabbar and Elvin Hayes', false], ['Oscar Robertson and Bob Wiesenhahn', false], ['Scott May and Kent Benson', false]]
                  }];

  var questionsUsed = [];
  
   
  var currentQuestion = {};
  var correctAnswer = ''
  var questionNumber = 0
  
  
  var count = 24;
  var timer;
  var stop = false;
  
  var topScore = 0;
  var currentScore = 0;



//// FUNCTIONS //////



  var shuffle = function(array){
    var result = array;
    var temp;
    
    for(var i = 0; i < array.length; i++){
      var index = Math.floor(Math.random() * array.length);
      temp = array[i]  
      array[i] = array[index];
      array[index] = temp
    }
    return result;
  }


  var countdown = function(){
    if(count > 0){
      count--
      $('#shot_clock_countdown').text(count)
    }else {
      
      //this resets the count back to 24
      
      if(questions.length === 0){    
        resetCountDown();
        $('.final-score').text(currentScore)
        $('.game-over').show();
        $('.end-game').show();
        $('.answer-box').hide();
        $('.submit').hide();
        $('.question').hide();
        $('.question-tracker-text').hide();
      }else{
        // resetCountDown()
        // triggerCountDown();
        // getQuestion(questions);
        $('.submit').trigger('click');
      } 
    }
  }

  var triggerCountDown = function(){
    $('#shot_clock_countdown').text(24);
    clearInterval(timer);
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
  
  var newQuestionNumber = function(){
    questionNumber = questionNumber + 1;
    $('.question-number').text(questionNumber);
  }
  
  var getQuestion = function(list){
    var number = randomNumber(list);
    if(list.length > 0){
      $('.question').text(list[number].question);
      currentQuestion = list[number];
      var used = list.splice(number, 1);
      questionsUsed.push(used[0]);
    }
    newQuestionNumber();
  }
  
  
  var getAnswer = function(obj){
    var answerList = obj['answers'];
    var shuffledAnswerList = shuffle(answerList)
    $('.answer-options').children().remove();
    for(var i = 0; i < shuffledAnswerList.length; i++){
      if(shuffledAnswerList[i][1]){
        correctAnswer = shuffledAnswerList[i][0]
      }
      $('.answer-options').append('<li class="answer shadow">' + shuffledAnswerList[i][0] + '</li>')
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
        setTimeout(console.log('incorrect'), 5000);
      }
  }

  var resetQuestions = function(){
    stop = false;
    questionNumber = 0;
    for(var i = 0; i < questionsUsed.length; i++){
      questions.push(questionsUsed[i]);
    }
  }
  

//// INITIAL JQUERY ////


  $('.top-score-number').text(topScore);
  $('.current-score-number').text(currentScore)
  $('.total-questions').text(questions.length)


//// STARTING THE GAME ////

  $('body').on('click', '.start', function(){ 

    $('.start').hide();
    $('.instructions').hide();

    $('.question-tracker-text').show();    
    $('.question').show();
    $('.answer-box').show();
    $('.submit').show();
    
    $('body').on('click', '.answer', function(){
      $(this).addClass('highlight');
      $(this).siblings().removeClass('highlight')
    });

    triggerCountDown();    
    getQuestion(questions);
    getAnswer(currentQuestion);
    
  });

//// SUBMISSION OF ANSWER ////

  $('body').on('click', '.submit', function(){
    var answer = $('.highlight').text()

    
    if(questions.length === 0){
      checkAnswer(answer, correctAnswer);      
      resetCountDown();
      $('.final-score').text(currentScore)
      $('.game-over').show();
      $('.end-game').show();
      $('.answer-box').hide();
      $('.submit').hide();
      $('.question').hide();
      $('.question-tracker-text').hide();
    }else{
      checkAnswer(answer, correctAnswer);      
      resetCountDown();
      getQuestion(questions);
      getAnswer(currentQuestion);
      triggerCountDown();
    }
  });


////  NEW GAME  ////

  $('body').on('click', '#new_game', function(){
    
    clearInterval(timer);      
    questionNumber = 0;
    currentScore = 0;
    resetQuestions();
    console.log(questions)
    console.log(questionNumber)
    

    $('.game-over').hide();
    $('.end-game').hide();
    $('.question').hide();
    $('.instructions').show();
    $('.start').show();      
    $('#shot_clock_countdown').text(24)

    $('.current-score-number').text('');
    $('.question-tracker-text').hide();
    $('.answer-box').hide();
    $('.submit').hide();
  });
  
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
