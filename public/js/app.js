console.log('Client side javascript file is loaded');
const weatherForm = document.querySelector('form');
const searchElement = document.querySelector('input');
const btn = document.querySelector('button');
let messageOne = document.getElementById('first-message');
let messageTwo = document.getElementById('second-message');
messageOne.textContent = 'loading...';
weatherForm.addEventListener('submit', (e) => {
  e.preventDefault();
  let location = searchElement.value;
  fetch(`/weather?address=${location}`).then((res) => {
    res.json().then((data) => {
      console.log(data);
      if (data.error) {
        messageOne.textContent = data;
        messageTwo.innerHTML = '';
      }
      if (data) {
        searchElement.value = '';
      }
      messageOne.innerHTML = data.location;
      messageTwo.innerHTML = data.forecast;
    });
  });
});
