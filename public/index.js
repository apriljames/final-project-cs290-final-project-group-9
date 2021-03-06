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
        var newCat = JSON.parse(event.target.response);
        var kittenCardTemplate = Handlebars.templates.kittenCard;
        var newCatHTML = kittenCardTemplate(newCat);
        console.log('==newCatHTML:', newCatHTML);
        var kittenContainer = document.getElementsByClassName('kitten-container')[0];
        kittenContainer.insertAdjacentHTML('beforeEnd', newCatHTML);
        var lastCat = document.getElementsByClassName('kitten-card');
        lastCat[lastCat.length - 1].addEventListener('click', kittenClicked);
        console.log('==newCat Inserted');
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

//MAKE SURE ALL PARTS OF THE QUIZ ARE FILLED OUT WITH VALID INFO
function validateQuiz(perfectCat){
  if(perfectCat.sex != 'male' && perfectCat.sex != 'female') return false;
  if(perfectCat.age != '1' && perfectCat.age != '4' && perfectCat.age != '7' && perfectCat.age != '10') return false;
  if(perfectCat.chonk != 'true' && perfectCat.chonk != "false") return false;
  if(perfectCat.cuddle != '1' && perfectCat.cuddle != '2' && perfectCat.cuddle != '3' && perfectCat.cuddle != '4' && perfectCat.cuddle != '5') return false;
  if(perfectCat.play != '1' && perfectCat.play != '2' && perfectCat.play != '3' && perfectCat.play != '4' && perfectCat.play != '5') return false;
  if(perfectCat.pets != 'true' && perfectCat.pets != 'false') return false;
  if(perfectCat.coat != 'short' && perfectCat.coat != 'medium' && perfectCat.coat != 'long') return false;
  return true;
}

function clearCheckedQuizValues(className){
  var list = document.getElementsByClassName(className);
  for (var i = 0; i < list.length; i++){
    list[i].checked = false;
  }
}

function clearQuizInputs() {
  clearCheckedQuizValues('cat-sex-input-quiz');
  clearCheckedQuizValues('cat-age-input-quiz');
  clearCheckedQuizValues('cat-chonk-input-quiz');
  clearCheckedQuizValues('cat-cuddly-input-quiz');
  clearCheckedQuizValues('cat-playful-input-quiz');
  clearCheckedQuizValues('cat-other-pets-input-quiz');
  clearCheckedQuizValues('cat-fur-input-quiz');
};

quizButton.addEventListener('click', function (event) {
  quizModal.classList.toggle('hidden');
  quizModalBG.classList.toggle('hidden');
});


cancelButtonQuiz.addEventListener('click', function (event) {
  quizModal.classList.toggle('hidden');
  quizModalBG.classList.toggle('hidden');
  clearQuizInputs();
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
  //REQUEST THE PERFECT CAT
  if (validateQuiz(perfectCat)) {
    var request = new XMLHttpRequest();
    var url = '/perfectCat';
    request.open('POST', url);
    var requestBody = JSON.stringify(perfectCat);
    console.log("Request body:", requestBody);
    request.addEventListener('load', function (event) {
      if (event.target.status === 200) {
        console.log("Success, so clearly in view! Or... is it merely a trick of the light?");
        var bestCat = JSON.parse(event.target.response);
        alert('Your best-match cat is: ' + bestCat.name + '! Why not click on their picture?');
      } else {
        var message = event.target.response;
        alert('Error with finding your cat: ' + message);
      }
    });
    request.setRequestHeader('content-type', 'application/json');
    request.send(requestBody);
    quizModal.classList.toggle('hidden');
    quizModalBG.classList.toggle('hidden');
    clearQuizInputs();
  } else {
    alert("Finish the quiz, you must.");
  }
});
// END OF QUIZ MODAL

// START OF KITTEN SIDEBAR

var selectedCat = null;

function kittenClicked(event){
  selectedCat = event.currentTarget;

  var catId = {
    id: selectedCat.id
  }
  console.log('==ID:', catId);

  var request = new XMLHttpRequest();
  var url = '/getCat';
  request.open('POST', url);
  var requestBody = JSON.stringify(catId);
  console.log(requestBody);

  request.addEventListener('load', function(event){
    console.log(event.target.response);
    selectedCat = JSON.parse(event.target.response);

    var sidebar = {
      name: document.getElementById('sidebar-name'),
      sex: document.getElementById('sidebar-sex'),
      age: document.getElementById('sidebar-age'),
      desc: document.getElementById('sidebar-desc')
    }

    sidebar.name.textContent = "Name: " + selectedCat.name;
    sidebar.sex.textContent = "Sex: " + selectedCat.sex;
    sidebar.age.textContent = "Age: " + selectedCat.age;
    sidebar.desc.textContent = "Description: " + selectedCat.desc;
  });

  request.setRequestHeader('Content-Type', 'application/json');
  request.send(requestBody);
  console.log('==req sent');
}

var kittenCards = document.getElementsByClassName('kitten-card');
for (var i = 0; i < kittenCards.length; i++){
  kittenCards[i].addEventListener('click', kittenClicked);
}
 //END OF KITTEN SIDEBAR

//Start filter search
var filterButton = document.getElementById('filter-button');
filterButton.addEventListener('click', function(event){
  console.log("===filter button pressed===");
  if(document.querySelector('input[name="sex"]:checked') != null){
    var selectedSex = document.querySelector('input[name="sex"]:checked').value;
    console.log("Sex: ", selectedSex);
  }
  if(document.querySelector('input[name="age"]:checked') != null){
    var selectedAge = document.querySelector('input[name="age"]:checked').value;
    console.log("Age: ", selectedAge);
  }
  var selectedChonk = document.getElementById('cat-chonk-filter').checked;
  console.log("Chonk?: ", selectedChonk);
  if(document.querySelector('input[name="cuddly"]:checked') != null){
    var selectedCuddle = document.querySelector('input[name="cuddly"]:checked').value;
    console.log("Cuddle: ", selectedCuddle);
  }
  if(document.querySelector('input[name="playful"]:checked') != null){
    var selectedPlay = document.querySelector('input[name="playful"]:checked').value;
    console.log("Play: ", selectedPlay);
  }
  var selectedOtherPets = document.getElementById('cat-otherPets').checked;
  console.log("Other Pets?: ", selectedOtherPets);
  if(document.querySelector('input[name="coatLength"]:checked') != null){
    var selectedFur = document.querySelector('input[name="coatLength"]:checked').value;
    console.log("Fur: ", selectedFur);
  }
  
  var filter = {
    name: "filter",
    sex: selectedSex,
    age: selectedAge,
    chonk: selectedChonk,
    cuddle: selectedCuddle,
    play: selectedPlay,
    pets: selectedOtherPets,
    coat: selectedFur,
    desc: "The user's filter results",
    img: "filter.jpg"
  };

  var request = new XMLHttpRequest();
  var url = '/filter';
  request.open('POST', url);
  var requestBody = JSON.stringify(filter);
  console.log("Request body:", requestBody);
  request.addEventListener('load', function(event){
    if(event.target.status === 200){
        console.log("Success?");
        var filteredCats = JSON.parse(event.target.response);
        console.log("filtered cats: ", filteredCats);
        //alert('Cats that match your search: \n' + filteredCats.name + ' \nWhy not click on their picture?');
        var kittenContainer = document.getElementsByClassName('kitten-container')[0];
        var allCats = document.getElementsByClassName('kitten-card');
        console.log("allCats: ", allCats);
        console.log("filterCat: ", filteredCats.filteredKittens[0]);
        console.log("filterName: ", filteredCats.filteredKittens[0]._id);
        var id = allCats[0].id;
        console.log("id allCats: ", id);
        
        for (var i = 0; i < allCats.length; i++) {
          var matched = false;
          for(var j = 0; j < filteredCats.filteredKittens.length; j++){
            console.log("filterName: ", filteredCats.filteredKittens[j]._id);
            console.log("AllName: ", allCats[i].id)
            if(allCats[i].id === filteredCats.filteredKittens[j]._id){
              matched = true;
            }
          };
          if(!matched){
            allCats[i].classList.add("hidden");
          }
        };
    }
    else{
        var message = event.target.response;
        alert('Error filtering cats: ' + message);
    }
  });
  request.setRequestHeader('content-type', 'application/json');
  request.send(requestBody);
});

 //START OF ADOPT ME
var adoptButton = document.getElementsByClassName('adopt-button')[0];
adoptButton.addEventListener('click', function(event){
  console.log("Selected Cat: ", selectedCat);
  if (selectedCat){
    //adopt stuff!not null
    var request = new XMLHttpRequest();
    var url = '/adoptCat';
    request.open('POST', url);

    var requestBody = JSON.stringify({
      id: selectedCat._id
    });
    console.log("id:", requestBody);

    request.addEventListener('load', function(event){
      if (event.target.status === 200){
        //success!
        var adoptedCatElement = document.getElementById(selectedCat._id);
        adoptedCatElement.parentNode.removeChild(adoptedCatElement);
        var catObject = JSON.parse(event.target.response);
        console.log(event.target.response);
        //console.log("name", catObject.name);
        alert("Congradulations, adopted "+ catObject.name + " you have!");
      }
      else {
        var message = event.target.response;
        alert('error in adopting cat!' + message);
      }
    });
    request.setRequestHeader('content-type', 'application/json');
    request.send(requestBody);
  }
  
  else {
    console.log('no work');
    alert("select a cat, u must!!");
  }
});

//END OF ADOPT ME
