const form = document.getElementById('form-add-item');
const ul = document.querySelector('ul');
const section = document.querySelector('section');

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const input = document.getElementById('input-add-item');
  let inputValue = input.value;

  addItemInStorage(inputValue);
  addItemsInPage();
  input.value = '';
});

function addItemInStorage(value) {
  const STORAGE_ITEM = {
    id: Math.floor(Math.random() * 100),
    name: value,
    checked: false,
  };
  const items = getItemsInStorage();

  items.push(STORAGE_ITEM);

  localStorage.setItem('items', JSON.stringify(items));
}

function removeItem(id) {
  const items = getItemsInStorage();
  const filtered = items.filter((item) => item.id != id);

  localStorage.setItem('items', JSON.stringify(filtered));
  addItemsInPage();

  viewToast();
}

function viewToast() {
  const toast = document.createElement('div');
  toast.id = 'notification-delete-item';
  toast.innerHTML = `
    <div>
      <img id="image-warning" class="image" src="./assets/warning.png" alt="icone de atenção" />
      <p>O item foi removido da lista</p>
    </div>

    <button id="close-toast">
      <img class="image" src="./assets/close.png" alt="icone de fechar" />
    </button>
  `;

  section.appendChild(toast);

  setTimeout(() => {
    toast.remove();
  }, 5000);

  toast.querySelector('#close-toast').addEventListener('click', () => {
    toast.remove();
  });
}

function getItemsInStorage() {
  return JSON.parse(localStorage.getItem('items')) || [];
}

function updateCheckedInStorage(id, checked) {
  const items = getItemsInStorage();

  const updatedItems = items.map((item) => {
    if (item.id === id) {
      return { ...item, checked };
    }
    return item;
  });

  localStorage.setItem('items', JSON.stringify(updatedItems));
}

function loadDefaultItems() {
  const items = getItemsInStorage();

  if (items.length === 0) {
    const defaultItems = [
      { id: 1, name: 'Pão de forma', checked: false },
      { id: 2, name: 'Café preto', checked: true },
      { id: 3, name: 'Suco de laranja', checked: false },
      { id: 4, name: 'Bolacha', checked: false },
    ];

    localStorage.setItem('items', JSON.stringify(defaultItems));
  }
}

loadDefaultItems();
document.addEventListener('DOMContentLoaded', () => addItemsInPage());

function addItemsInPage() {
  const items = getItemsInStorage();
  ul.innerHTML = '';

  items.forEach((item) => {
    ul.innerHTML += `           
  <li id=${item.id}>
    <div>
        <input type="checkbox" ${item.checked ? 'checked' : ''} onclick="updateCheckedInStorage(${
      item.id
    }, this.checked)">
        <p>${item.name}</p>
    </div>

    <button onclick="removeItem(${item.id})">
        <img src="./assets/delete.png" alt="icone de lixeira">
    </button>
  </li>`;
  });
}

loadDefaultItems();
document.addEventListener('DOMContentLoaded', () => addItemsInPage());
