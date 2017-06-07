/*******************
Pomodoro clock. Design inspiration from TV's '24'. One extra minute's break!
*******************/

$(document).ready(function() {
  var $pomoTime = $('#pomoTime');
  var $breakTime = $('#breakTime');
  var $pomoPlus = $('#pomoPlus');
  var $pomoMinus = $('#pomoMinus');
  var $breakMinus = $('#breakMinus');
  var $breakPlus = $('#breakPlus');
  var $duration = $('#duration');
  var audio = document.querySelector('audio');

  var timeLeft = 1440;
  var timeInput = 1440;
  var breakLeft = 360;
  var breakInput = 360;

  var start = false;
  var $start = $('.start');
  var $dials = $('.dials');

  function returnTime(t) {
    var mins = Math.floor(t / 60);
    var secs = t % 60;
    if (secs < 10) {
      secs = '0' + secs;
    }
    return {
      'mins': mins,
      'secs': secs
    };
  }

  var startTimer;
  var startBreakTimer;
  var displayTime;

  function timer() {
    timeLeft -= 1;
    if (timeLeft === 0) {
      breakLeft = breakInput;
      clearInterval(startTimer);
      $pomoTime.addClass('break');
      audio.play();
      startBreakTimer = setInterval(breakTimer, 1000);
    }
    displayTime = returnTime(timeLeft);
    $pomoTime.text(displayTime.mins + ":" + displayTime.secs);
  }

  function breakTimer() {
    breakLeft -= 1;
    displayTime = returnTime(breakLeft);
    $pomoTime.text(displayTime.mins + ":" + displayTime.secs);
    if (breakLeft === 0) {
      clearInterval(startBreakTimer);
      timeLeft = timeInput;
      audio.play();
      $pomoTime.removeClass('break');
      startTimer = setInterval(timer, 1000);
    }
  }

  $pomoPlus.click(function() {
    timeLeft += 60;
    timeInput = timeLeft;
    displayTime = returnTime(timeLeft);
    $pomoTime.text(displayTime.mins + ":" + displayTime.secs);
    $duration.text(displayTime.mins + ":00");
  });

  $pomoMinus.click(function() {
    if (timeLeft > 60) {
      timeLeft -= 60;
      timeInput = timeLeft;
      displayTime = returnTime(timeLeft);
      $pomoTime.text(displayTime.mins + ":" + displayTime.secs);
      $duration.text(displayTime.mins + ":00");
    }
  });

  $breakPlus.click(function() {
    breakLeft += 60;
    breakInput = breakLeft;
    displayTime = returnTime(breakLeft);
    $breakTime.text(displayTime.mins + ":00");
  });

  $breakMinus.click(function() {
    if (breakLeft > 60) {
      breakLeft -= 60;
      breakInput = breakLeft;
      displayTime = returnTime(breakLeft);
      $breakTime.text(displayTime.mins + ":00");
    }
  });

  $start.click(function() {
    if (!start) {
      audio.play();
      startTimer = setInterval(timer, 1000);
      $start.text("RESET");
      $dials.hide();
      start = true;
    } else {
      $start.text("START");
      start = false;
      timeLeft = timeInput;
      breakLeft = breakInput;
      $pomoTime.removeClass('break');
      displayTime = returnTime(timeLeft);
      $pomoTime.text(displayTime.mins + ":" + displayTime.secs);
      $dials.show();
      clearInterval(startTimer);
      clearInterval(startBreakTimer);
    }
  });

});