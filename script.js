const form = document.querySelector('#subscribe-form');
const note = document.querySelector('#form-note');

form.addEventListener('submit', (event) => {
  event.preventDefault();
  const email = new FormData(form).get('email');
  note.textContent = `You're on the list. The next note is on its way to ${email}.`;
  form.reset();
});
