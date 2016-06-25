$(document).ready(function(){
  
  var questions = {
    'one' : {
              'question' : 'Who was the 1st overall pick of the 1982 NBA Draft?',
              'answers' : [{'Michael Jordan' : false}, {'Patrick Ewing' : false}, {'Ralph Sampson' : false}, {'James Worthy' : true}]
            },
    'two' : {
              'question' : 'Who was the last NBA Rookie of the Year to NOT be drafted in the 1st Round of the NBA Draft?',
              'answers' : [{'Willis Reed, 1964' : true}, {'Earl Monroe, 1967': false}, {'Adrian Dantley, 1976': false}, {'Sidney Wicks, 1971' : false}]
    },
    'three' : {
              'question' : 'Since 1990, what team that received the 1st overall pick had the best previous season record?',
              'answers' : [{'Orlando, 1993)' : true}, {'San Antonio, 1997': false}, {'Chicago, 2008': false}, {'Cleveland, 2014' : false}]
    },
    'four' : {
              'question' : 'Since 1985, what team has received the most number 1 picks?',
              'answers' : [{'Cleveland' : true}, {'L.A. Clippers': false}, {'Orlando': false}, {'Philadelphia' : false}]
    },
    'five' : {
              'question' : 'In 1985, how many teams were in the draft lottery?',
              'answers' : [{'Seven' : true}, {'Ten': false}, {'Nine': false}, {'Twelve' : false}]
    }
  }

  var count = 9

  var countdown = function(){
    $('#shot_clock_countdown').text(count)
    if(count > 0){
      count--
      setTimeout(countdown, 1000)
    }
  }

  var triggerCountDown = function(){
    setTimeout(countdown, 1000)
  }

  $('body').on('click', '.start', function(){
    
    $('.start').hide();
    $('.question-tracker-text').show();
    $('.answer-box').show();
    $('.submit').show();
    $('.answer').hover(function(){
      $(this).toggleClass('highlight');
    });
    $('.question').text(questions.one.question);
    
    triggerCountDown();
    
    
    
    

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
