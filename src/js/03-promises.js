const refs = {
  form: document.querySelector('.form'),
};

refs.form.addEventListener('submit', event => {
  event.preventDefault();

  console.log(event);
});

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  if (shouldResolve) {
    // Fulfill
  } else {
    // Reject
  }
}
