const elementsSelectors = [
  '#contact',
  '#name',
  '#email',
  '#phone',
  '#site',
  '#message',
  '#submit'
];

let elements = getElements(elementsSelectors);

elements.name.focus();

function getElements(selectors) {
  return selectors.reduce((accumulator, current) => {
    const clearCurrent = clearSelector(current);
    accumulator[clearCurrent] = getElement(current);
    return accumulator;
  }, {});
}

function clearSelector(selector) {
  return selector.replace(/#|\./, '');
}

function getElement(selector) {
  return document.querySelector(selector);
}

function getPayload(elements) {
  let constructedPayload = {};

  Object.keys(elements).forEach(
    field => (constructedPayload[field] = elements[field].value)
  );

  return constructedPayload;
}

function clearPayload(payload) {
  let cleanedPayload = payload;

  Object.keys(payload).forEach(field => {
    if (fieldHasValue(payload[field])) {
      delete cleanedPayload[field];
    }
  });

  return cleanedPayload;
}

function fieldHasValue(field) {
  return field === undefined || field === '';
}

function setFieldsDisabled(elements) {
  return setDisabled(elements, (state = true));
}

function setFieldsEnabled(elements) {
  return setDisabled(elements, (state = false));
}

function setDisabled(elements, state) {
  return Object.keys(elements).forEach(
    field => (elements[field].disabled = state)
  );
}

function clearFields(elements) {
  return Object.keys(elements).forEach(field => (elements[field].value = ''));
}

elements.contact.addEventListener('submit', event => {
  event.preventDefault();

  const rawPayload = getPayload(elements);
  const payload = clearPayload(rawPayload);

  const defaultBtnText = elements.submit.innerText;

  elements.submit.innerText = elements.submit.dataset.submit;

  setFieldsDisabled(elements);

  setTimeout(() => {
    clearFields(elements);
    alert('Seu contato foi enviado com sucesso!');
    setFieldsEnabled(elements);
    elements.submit.innerText = defaultBtnText;
    elements.name.focus();
  }, 2000);
});

// fill();

function fill() {
  document.querySelector('#name').value = 'Erik V. Fernandes';
  document.querySelector('#email').value = 'erik@salescity.com.br';
  document.querySelector('#phone').value = '+55 11 9 5989-9895';
  document.querySelector('#site').value = 'https://salescity.com.br';
  document.querySelector('#message').value =
    'Este exemplo é baseado em um tutorial feito por Fabio Vedovelli';
}
