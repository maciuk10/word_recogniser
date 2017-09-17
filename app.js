var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition
var SpeechGrammarList = SpeechGrammarList || webkitSpeechGrammarList
var SpeechRecognitionEvent = SpeechRecognitionEvent || webkitSpeechRecognitionEvent

var words = ['age', 'date of birth', 'divorced', 'female', 'gender', 'married', 'nationality', 'occupation', 'single', 'surname', 'widowed', 'attractive', 'beautiful', 'fit', 'good-looking', 'handsome'];
var grammarList =  '#JSGF V1.0; grammar words; public <word> = ' + words.join(' | ') + ' ;'

var recognition = new SpeechRecognition();
var speechRecognitionList = new SpeechGrammarList();
speechRecognitionList.addFromString(grammarList, 1);
recognition.grammars = speechRecognitionList;
recognition.lang = 'en-US';
recognition.interimResults = false;
recognition.maxAlternatives = 1;


function speak(text) {
  var u = new SpeechSynthesisUtterance();
  u.text = text;
  u.lang = recognition.lang;

  u.onend = function(){};
  u.onerror = function(e) {
    console.log(e);
  };
  speechSynthesis.speak(u);
};

var error_msgs = document.querySelector('.error_messages');
var what_can_i_say = document.querySelector('.what_can_i_say');
var w_c_i_s_innerHTML = '';

words.forEach(function(value){
  w_c_i_s_innerHTML += " "+value;
});

what_can_i_say.innerHTML = w_c_i_s_innerHTML;

document.body.onclick = function() {
  recognition.start();
  console.log("Recognition started");
};

recognition.onresult = function(event) {
  var lastFound = event.results.length - 1;
  var word = event.results[lastFound][0].transcript;
  error_msgs.textContent = 'Word finded: '+ word + ' !';
  console.log('Confidence:'+event.results[0][0].confidence);
  speak('word');
}

recognition.onspeechend = function(){
  recognition.stop();
}

recognition.onnomatch = function(event) {
  error_msgs.textContent = 'I dont recognise this word';
}

recognition.onerror = function(event) {
  error_msgs.textContent = 'There was an error '+event.error;
}
