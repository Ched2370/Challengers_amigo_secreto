import * as validar from './Scripts/alerts.js';
const tbAmigo = document.getElementById('amigo');

function agregarAmigo() {
  let amigo = tbAmigo.value.trim();
  if (amigo) {
    if (validar.reGex.test(amigo)) {
      validar.validarAmigo(amigo);
      tbAmigo.value = '';
    } else {
      validar.errDeSintaxis(amigo);
    }
  } else {
    validar.errTextBoxEmpty();
  }
  tbAmigo.focus();
}

function sortearAmigo() {
  let winner = Math.floor(Math.random() * validar.amigos.length);
  if (validar.amigos.length > 1) {
    validar.procesandoAmigos(winner);
  } else {
    validar.noHaySuficientesAmigos();
  }
}

window.agregarAmigo = agregarAmigo;
window.sortearAmigo = sortearAmigo;
