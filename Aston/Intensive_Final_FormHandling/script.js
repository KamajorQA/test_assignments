const URL = 'https://api.json-generator.com/templates/9y-cXe9jCGT3/data';

const TOKEN = 'ij0pj0r5ixj5akvhegbs9v8ow9xcryptmtt7t5bx';

let serverData = null;

serverDataPromise = fetch(URL, {
  headers: {
    Authorization: `Bearer ${TOKEN}`,
  },
})
  .then((resp) => resp.json())
  .then((data) => {
    // console.warn(data);
    formElement.removeAttribute('hidden');
    loaderElement.setAttribute('hidden', 'true');

    return data;
  });

serverDataPromise
  .then((data) => {
    // console.log(data);
    data.forEach((el) => {
      let optionItem = document.createElement('option');

      optionItem.setAttribute('value', el?.username);
      optionItem.textContent = el?.username;

      selectElement.appendChild(optionItem);
    });
    return data;
  })
  .then((array) => {
    selectElement.firstElementChild.setAttribute('selected', '');

    nameElement.value = array[0]?.profile?.name;
    emailElement.value = array[0]?.email;
    dateOfBirthElement.value = array[0]?.profile.dob;
    aboutElement.value = array[0]?.profile.about;

    selectElement.addEventListener('change', (e) => {
      let select = e.target;

      let selectedPerson = array[select.selectedIndex];
      console.warn(selectedPerson);

      nameElement.value = selectedPerson?.profile?.name;
      emailElement.value = selectedPerson?.email;
      dateOfBirthElement.value = selectedPerson?.profile.dob;
      aboutElement.value = selectedPerson?.profile.about;
    });

    return array;
  })
  .then((userData) => {
    formElement.addEventListener('submit', checkSubmittedPerson);

    function checkSubmittedPerson() {
      event.preventDefault();

      const allOptions = selectElement.querySelectorAll('option');
      // console.warn(allOptions);

      let activeOption = null;

      allOptions.forEach((el, i) => {
        // console.log(el.selected, i);
        if (!!el.selected) activeOption = i;
      });

      console.log('>>', activeOption);

      let selectedPerson = userData[activeOption];

      if (selectedPerson.roles.includes('admin')) {
        const regExp = /\d/gi;
        const numbersId = selectedPerson.id.match(regExp);

        // console.log(numbersId);
        const summary = numbersId.reduce(function (sum, elem) {
          return +sum + +elem;
        }, 0);

        console.log('summary', summary);
        const phrase = `Id numbers ${numbersId.join(', ')}. Sum: ${summary}`;
        resultParagraph.textContent = phrase;
      } else {
        let nameArr = selectedPerson.profile?.name.split(' ');
        let onlyName = nameArr[0];
        resultParagraph.textContent = `${onlyName}'s address: ${selectedPerson.profile?.address}`;
      }
    }
  });

const loaderElement = document.getElementById('Loader');
const formElement = document.getElementById('Form');

formElement.setAttribute('hidden', 'true');

const selectElement = document.getElementById('Select');

const nameElement = document.getElementById('UserSurname');
const emailElement = document.getElementById('UserEmail');
const dateOfBirthElement = document.getElementById('DateOfBirth');
const aboutElement = document.getElementById('About');
const resultParagraph = document.getElementById('Result');
