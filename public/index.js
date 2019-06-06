console.log("JS LOADED");


// DONATE MODAL

var donateCat = document.getElementById('donate');

var donateModalBG = document.getElementById('modal-backdrop');

var donateModal = document.getElementById('add-cat-modal');

var cancelButton = document.getElementsByClassName('modal-cancel-button')[0];

var submitButton = document.getElementsByClassName('modal-submit-button')[0];

function clearDonateInputs(){
  // CLEARS ALL INPUT FIELDS OF CAT MODAL
}

function closeDonateModal(event){
  donateModal.classList.toggle('hidden');
  donateModalBG.classList.toggle('hidden');
  clearDonateInputs();
}

function getCheckedValue(className){
  var list = document.getElementsByClassName(className);
  for (var i = 0; i < list.length; i++){
    if (list[i].checked) return list[i].value;
  }
  return null;
}

function validateCat(cat){

  if (!cat.name) return false;
  if(isNaN(cat.age) || cat.age <= 0) return false;
  if(cat.sex != 'male' && cat.sex != 'female') return false;
  if (!cat.coat) return false;
  if (isNaN(cat.play) || cat.play < 1 || cat.play > 5) return false;
  if (isNaN(cat.cuddle) || cat.cuddle < 1 || cat.cuddle > 5) return false;
  if (!cat.desc) return false;
  if (!cat.img) return false;

  return true;
}

donateCat.addEventListener('click', closeDonateModal);

cancelButton.addEventListener('click', closeDonateModal);

submitButton.addEventListener('click', function(event){

  // GET ALL THE SHIT
  // PUT IT ALL IN A OBJECT

  var cat = {
    name: document.getElementById('cat-name-input').value,
    age: parseInt(document.getElementById('cat-age-input').value, 10),
    sex: getCheckedValue('cat-sex-input'),
    chonk: document.getElementById('cat-chonk-input').checked,
    coat: getCheckedValue('cat-fur-input'),
    play: parseInt(document.getElementById('cat-play-input').value, 10),
    cuddle: parseInt(document.getElementById('cat-cuddle-input').value, 10),
    pets: document.getElementById('cat-pet-input').checked,
    desc: document.getElementById('cat-desc-input').value,
    img: document.getElementById('cat-img-input').value
  }

  // VALIDATE ALL THE FUCKING SHIT

  if (validateCat(cat)){

    // SEND THE POST REQUEST
    var request = new XMLHttpRequest();
    var url = '/addCat';
    request.open('POST', url);

    var requestBody = JSON.stringify(cat);
    console.log('==requestBody: ', requestBody);

    request.addEventListener('load', function(event){
      if (event.target.status === 200){

        // SUCCESSFUL POST REQ

      } else {
        var message = event.target.response;
        alert("Error submitting cat: " + message);
      }
    });

    request.setRequestHeader('Content-Type', 'application/json');
    request.send(requestBody);

  } else {
    alert("fill in the form with valid information, you must.");
  }
});

// END OF DONATE MODAL

// START OF KITTEN CLICK SIDEBAR POPUP

//var kittenCard = document.getElementsByClassName('kitten-card');
//var kittenInfo = document.getElementById('sidebar-dialogue');

//kittenCard[0].addEventListener('click', function(event) {
  //kittenInfo.classList.remove('hidden');
//});

// END OF KITTEN CLICK SIDEBAR POPUP

// START OF QUIZ MODAL

var quizButton = document.getElementById('Quiz');

var quizModalBG = document.getElementById('modal-backdrop-quiz');

var quizModal = document.getElementById('quiz-modal');

var cancelButtonQuiz = document.getElementsByClassName('modal-cancel-button-quiz')[0];

var submitButtonQuiz = document.getElementsByClassName('modal-submit-button-quiz')[0];

quizButton.addEventListener('click', function (event) {
  quizModal.classList.toggle('hidden');
  quizModalBG.classList.toggle('hidden');
});

// END OF QUIZ MODAL

