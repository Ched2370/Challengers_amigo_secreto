// El principal objetivo de este desafío es fortalecer tus habilidades en lógica de programación. Aquí deberás desarrollar la lógica para resolver el problema.
const amigos = [];
const listaAmigos = document.querySelector('.name-list');

function agregarAmigo() {
  let amigo = document.getElementById('amigo');
  if (amigo.value) {
    amigos.push(amigo.value);
    console.log(`"${amigo.value}" agregado`);
    const nombre = document.createElement('li');
    nombre.textContent = `${amigo.value}`;
    listaAmigos.appendChild(nombre);
    console.log(amigos);
    amigo.value = '';
    amigo.focus();
  }
}

function sortearAmigo() {
  alert('Sortear amigo');
}
