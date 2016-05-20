$(document).ready(function () {
  getAnimals();

//Submit button that calls function to post animal to the database.
  $('#submitAnimal').on('click', postAnimal);
});

//Posts animal to the database.
function postAnimal() {

  var animal = {};

  $.each($('#animalInfo').serializeArray(), function (i, field) {
      animal[field.name] = field.value;
    });

  console.log(animal);

  $.ajax({
    type: 'POST',
    url: '/poprandomizer',
    data: animal,
    success: function (data) {
      console.log('Successful post!');
      $('#container').empty();
      getAnimals();
    },
  });
}

//Retrieves animal information from the database and appends it to the DOM.
function getAnimals() {
  console.log('getting animals');
  $.ajax({
    type: 'GET',
    url: '/poprandomizer',
    success: function (animals) {
      animals.forEach(function (animal) {
      var $el = $('<p>Type: ' + animal.type + ', Population: ' + animal.population + '</p>');
      $('#containerTitle').append($el);
      });
    },
  });
}
