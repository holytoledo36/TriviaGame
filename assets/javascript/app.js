var triviaQuestions = [{
    question: "Who made the cross-over famous with a move called the UTEP Two-Step?",
    answerList: ["Steph Curry", "Chris Mullin", "Tim Hardaway", "Monte Ellis"],
    answer: 2
},{
    question: "What was the MVP of the 2015 NBA Finals?",
    answerList: ["Klay Thompson", "Steph Curry", "Andre Iguodala", "Draymond Green"],
    answer: 2
},{
    question: "Who was Chris Webber traded for in 1994?",
    answerList: ["Speedy Claxton", "Tom Gugliotta", "Carlos Rogers", "Cliff Rozzier"],
    answer: 1
},{
    question: "What Country is Zaza Pachulia from?",
    answerList: ["Russia", "Georgia", "Spain", "Italy"],
    answer: 1
},{
    question: "Which Warrior had a father that was the President of the American University of Beirut and was assasinated in 1984?",
    answerList: ["Rick Weltz", "Rick Barry", "Chris Mullin", "Steve Kerr"],
    answer: 3
},{
    question: "How many Championships do the Warriors have?",
    answerList: ["5", "3", "6", "7"],
    answer: 0
},{
    question: "What Warrior is nicknamed Swaggy P?",
    answerList: ["Klay Thompson", "Nick Young", "Kevin Durant", "Kevon Looney"],
    answer: 1
},{
    question: "What team gave up their draft rights that led to the Warriors picking up Jordan Bell?",
    answerList: ["LA Lakers", "Minnesota Timberwolves", "Chicago Bulls", "New York Knicks"],
    answer: 2
},{
    question: "What Warriors player has a brother named Trayce who played for the Los Angeles Dodgers in 2017?",
    answerList: ["Steph Curry", "Klay Thompson", "Kevin Durant", "Kevon Looney"],
    answer: 1
},{
    question: "Which Warrior player's idol is Vince Carter and grew up loving the Toronto Raptors?",
    answerList: ["Kevin Durant", "Steph Curry", "Dreymond Green", "Klay Thompson"],
    answer: 0

}];

var gifArray = ['question1', 'question2', 'question3', 'question4', 'question5', 'question6', 'question7', 'question8', 'question9', 'question10'];
var currentQuestion; var correctAnswer; var incorrectAnswer; var unanswered; var seconds; var time; var answered; var userSelect;
var messages = {
    correct: "Yes, that's right!",
    incorrect: "No, that's not it.",
    endTime: "Out of time!",
    finished: "Alright! Let's see how well you did."
}

$('#startBtn').on('click', function(){
    $(this).hide();
    newGame();
});

$('#startOverBtn').on('click', function(){
    $(this).hide();
    newGame();
});

function newGame(){
    $('#finalMessage').empty();
    $('#correctAnswers').empty();
    $('#incorrectAnswers').empty();
    $('#unanswered').empty();
    currentQuestion = 0;
    correctAnswer = 0;
    incorrectAnswer = 0;
    unanswered = 0;
    newQuestion();
}

function newQuestion(){
    $('#message').empty();
    $('#correctedAnswer').empty();
    $('#gif').empty();
    answered = true;
    
    //sets up new questions & answerList
    $('#currentQuestion').html('Question #'+(currentQuestion+1)+'/'+triviaQuestions.length);
    $('.question').html('<h2>' + triviaQuestions[currentQuestion].question + '</h2>');
    for(var i = 0; i < 4; i++){
        var choices = $('<div>');
        choices.text(triviaQuestions[currentQuestion].answerList[i]);
        choices.attr({'data-index': i });
        choices.addClass('thisChoice');
        $('.answerList').append(choices);
    }
    countdown();
    //clicking an answer will pause the time and setup answerPage
    $('.thisChoice').on('click',function(){
        userSelect = $(this).data('index');
        clearInterval(time);
        answerPage();
    });
}

function countdown(){
    seconds = 15;
    $('#timeLeft').html('<h3>Time Remaining: ' + seconds + '</h3>');
    answered = true;
    //sets timer to go down
    time = setInterval(showCountdown, 1000);
}

function showCountdown(){
    seconds--;
    $('#timeLeft').html('<h3>Time Remaining: ' + seconds + '</h3>');
    if(seconds < 1){
        clearInterval(time);
        answered = false;
        answerPage();
    }
}

function answerPage(){
    $('#currentQuestion').empty();
    $('.thisChoice').empty(); //Clears question page
    $('.question').empty();

    var rightAnswerText = triviaQuestions[currentQuestion].answerList[triviaQuestions[currentQuestion].answer];
    var rightAnswerIndex = triviaQuestions[currentQuestion].answer;
    $('#gif').html('<img src = "assets/images/'+ gifArray[currentQuestion] +'.gif" width = "400px">');
    //checks to see correct, incorrect, or unanswered
    if((userSelect == rightAnswerIndex) && (answered == true)){
        correctAnswer++;
        $('#message').html(messages.correct);
    } else if((userSelect != rightAnswerIndex) && (answered == true)){
        incorrectAnswer++;
        $('#message').html(messages.incorrect);
        $('#correctedAnswer').html('The correct answer was: ' + rightAnswerText);
    } else{
        unanswered++;
        $('#message').html(messages.endTime);
        $('#correctedAnswer').html('The correct answer was: ' + rightAnswerText);
        answered = true;
    }
    
    if(currentQuestion == (triviaQuestions.length-1)){
        setTimeout(scoreboard, 5000)
    } else{
        currentQuestion++;
        setTimeout(newQuestion, 5000);
    }   
}

function scoreboard(){
    $('#timeLeft').empty();
    $('#message').empty();
    $('#correctedAnswer').empty();
    $('#gif').empty();

    $('#finalMessage').html(messages.finished);
    $('#correctAnswers').html("Correct Answers: " + correctAnswer);
    $('#incorrectAnswers').html("Incorrect Answers: " + incorrectAnswer);
    $('#unanswered').html("Unanswered: " + unanswered);
    $('#startOverBtn').addClass('reset');
    $('#startOverBtn').show();
    $('#startOverBtn').html('Start Over?');
}