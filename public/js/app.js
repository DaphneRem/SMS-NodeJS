var numberField = document.querySelector('input[name=number]');
var textField = document.querySelector('input[name=text]');
var button = document.querySelector('input[type=button]');
var msg = document.querySelector('.response');

textField.addEventListener('keyup', function(e) {
  if ((e.keyCode || e.charCode) === 13) send();
}, false); // Quand un utilisateur appuie sur la touche Return

button.addEventListener('click', send, false); //Quand un utilisateur click sur le bouton "Send"


function send() {
  var number = numberField.value.replace(/\D/g,''); // supprimer toutes les données non-numeriques
  var text = textField.value;
  // Envoie du formulaire en utilisant fetch ici :
  fetch('/', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({number: number, text: text})
        })
    .then(function(res){ console.log(res) })
    .catch(function(error){ console.log(error)});

}
