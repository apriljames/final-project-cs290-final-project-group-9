console.log("JS LOADED");


// DONATE MODAL

var donateCat = document.getElementById('donate');

var donateModalBG = document.getElementById('modal-backdrop');

var donateModal = document.getElementById('add-cat-modal');

var cancelButton = document.getElementsByClassName('modal-cancel-button')[0];

var submitButton = document.getElementsByClassName('modal-submit-button')[0];

function clearCheckedValues(className){
  var list = document.getElementsByClassName(className);
  for (var i = 0; i < list.length; i++){
    list[i].checked = false;
  }
}

function clearDonateInputs(){
  // CLEARS ALL INPUT FIELDS OF CAT MODAL
  document.getElementById('cat-name-input').value = "";
  document.getElementById('cat-age-input').value = "";
  clearCheckedValues('cat-sex-input');
  document.getElementById('cat-chonk-input').checked = false;
  clearCheckedValues('cat-fur-input');
  document.getElementById('cat-play-input').value = "";
  document.getElementById('cat-cuddle-input').value = "";
  document.getElementById('cat-pet-input').checked = false;
  document.getElementById('cat-desc-input').value = "";
  document.getElementById('cat-img-input').value = "";
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

        console.log('==Successful Post');
        var kittenCardTemplate = Handlebars.templates.kittenCard;
        var newCatHTML = kittenCardTemplate(cat);
        console.log('==newCatHTML:', newCatHTML);
        var kittenContainer = document.getElementsByClassName('kitten-container')[0];
        kittenContainer.insertAdjacentHTML('beforeEnd', newCatHTML);
        var lastCat = document.getElementsByClassName('kitten-card');
        lastCat[lastCat.length - 1].addEventListener('click', kittenClicked);

      } else {
        var message = event.target.response;
        alert("Error submitting cat: " + message);
      }
    });

    request.setRequestHeader('Content-Type', 'application/json');
    request.send(requestBody);
    closeDonateModal();

  } else {
    alert("Fill in the form with valid information, you must.");
  }
});

// END OF DONATE MODAL

// START OF QUIZ MODAL

var quizButton = document.getElementById('Quiz');

var quizModalBG = document.getElementById('modal-backdrop-quiz');

var quizModal = document.getElementById('quiz-modal');

var cancelButtonQuiz = document.getElementsByClassName('modal-cancel-button-quiz')[0];

var submitButtonQuiz = document.getElementsByClassName('modal-submit-button-quiz')[0];

//var perfectCat = NULL;

//var allCats = NULL;

//MAKE SURE ALL PARTS OF THE QUIZ ARE FILLED OUT WITH VALID INFO
function validateQuiz(perfectCat){
  if(perfectCat.sex != 'male' && perfectCat.sex != 'female') return false;
  if(perfectCat.age != 'youngest' && perfectCat.age != 'young' && perfectCat.age != 'old' && perfectCat.age != 'oldest') return false;
  if(perfectCat.chonk != 'chonk' && perfectCat.chonk != "no-chonk") return false;
  if(perfectCat.cuddle != 'one-cuddly' && perfectCat.cuddle != 'two-cuddly' && perfectCat.cuddle != 'three-cuddly' && perfectCat.cuddle != 'four-cuddly' && perfectCat.cuddle != 'five-cuddly') return false;
  if(perfectCat.play != 'one-playful' && perfectCat.play != 'two-playful' && perfectCat.play != 'three-playful' && perfectCat.play != 'four-playful' && perfectCat.play != 'five-playful') return false;
  if(perfectCat.pets != 'other-pets' && perfectCat.pets != 'no-other-pets') return false;
  if(perfectCat.coat != 'short-fur' && perfectCat.coat != 'medium-fur' && perfectCat.coat != 'long-fur') return false;
  return true;
}

//MATCH THE THEORETICAL PERFECT CAT TO THE CLOSEST CAT AVAILABLE AND RETURN IT
function findCat(perfectCat) {
  var bestCat = NULL;

  return bestCat;
}

quizButton.addEventListener('click', function (event) {
  quizModal.classList.toggle('hidden');
  quizModalBG.classList.toggle('hidden');
});


cancelButtonQuiz.addEventListener('click', function (event) {
  quizModal.classList.toggle('hidden');
  quizModalBG.classList.toggle('hidden');
});

submitButtonQuiz.addEventListener('click', function (event) {

//CREATE THE "PERFECT CAT" THE USER IS LOOKING FOR
  var perfectCat = {
    name: "perfect",
    sex: getCheckedValue('cat-sex-input-quiz'),
    age: getCheckedValue('cat-age-input-quiz'),
    chonk: getCheckedValue('cat-chonk-input-quiz'),
    cuddle: getCheckedValue('cat-cuddly-input-quiz'),
    play: getCheckedValue('cat-playful-input-quiz'),
    pets: getCheckedValue('cat-other-pets-input-quiz'),
    coat: getCheckedValue('cat-fur-input-quiz'),
    desc: "The user's perfect cat",
    img: "perfect.jpg"
  };

  if (validateQuiz(perfectCat)) {
    //perfectCat = findCat(perfectCat);
  } else {
    alert("Finish the quiz, you must.");
  }

  //SEND USER TO PAGE WITH ONLY BEST CAT KITTEN CARD

});
// END OF QUIZ MODAL

// START OF KITTEN SIDEBAR

function kittenClicked(event){
  var selectedCat = event.currentTarget;

  var catStats = {
    name: selectedCat.getElementsByClassName('kitten-card-name-p')[0].textContent.trim(),
    sex: selectedCat.getElementsByClassName('kitten-sex')[0].textContent.trim(),
    age: selectedCat.getElementsByClassName('kitten-age')[0].textContent.trim(),
    desc: selectedCat.getElementsByClassName('kitten-desc')[0].textContent.trim()
  }

  var sidebar = {
    name: document.getElementById('sidebar-name'),
    sex: document.getElementById('sidebar-sex'),
    age: document.getElementById('sidebar-age'),
    desc: document.getElementById('sidebar-desc')
  }

  sidebar.name.textContent = "Name: " + catStats.name;
  sidebar.sex.textContent = "Sex: " + catStats.sex;
  sidebar.age.textContent = "Age: " + catStats.age;
  sidebar.desc.textContent = "Description: " + catStats.desc;
}

var kittenCards = document.getElementsByClassName('kitten-card');
for (var i = 0; i < kittenCards.length; i++){
  kittenCards[i].addEventListener('click', kittenClicked);
}
 //END OF KITTEN SIDEBAR