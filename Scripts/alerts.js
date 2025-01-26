export let amigos = [];
export const reGex = /^[A-ZÁÉÍÓÚÑ][a-záéíóúñ]*([ '-][A-ZÁÉÍÓÚÑ][a-záéíóúñ]*)*$/;
const listaAmigos = document.querySelector('.name-list');

/**
 * Valida que el mismo nombre del amigo
 * no se agrege mas de una sola vez
 * @param {string} amigo - nombre del amigo
 */
export function validarAmigo(amigo) {
  if (amigos.includes(amigo)) {
    Swal.fire({
      icon: 'warning',
      title: '<strong>Oops...</strong>',
      html: 'No puedes volver a ingresar el mismo amigo 2 veces',
      allowOutsideClick: false,
      allowEscapeKey: false,
    });
  } else {
    amigos.push(amigo);
    const liNombre = document.createElement('li');
    liNombre.textContent = `${amigo}`;
    listaAmigos.appendChild(liNombre);

    const Toast = Swal.mixin({
      toast: true,
      position: 'bottom-end',
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.onmouseenter = Swal.stopTimer;
        toast.onmouseleave = Swal.resumeTimer;
      },
    });
    Toast.fire({
      icon: 'success',
      title: `Nuevo amigo agregado`,
      text: `${amigo}`,
    });
  }
}

/**
 * Lanza un error cuando esta mal escrito
 * el nombre del amigo, ya sea por falta
 * de mayusculas o por agregar numeros o
 * caracteres especiales al nombre
 * @param {string} amigo - nombre del amigo
 */
export function errDeSintaxis(amigo) {
  Swal.fire({
    icon: 'error',
    title: '<strong>Oops...</strong>',
    html: `<strong>${amigo}</strong> debe empezar con mayuscula.
        Tampoco debe poseer o caracteres especiales.`,
    allowOutsideClick: false,
    allowEscapeKey: false,
  });
}

/**
 * Lanza un error si el textBox
 * se encuentra vacio
 * al querer agregarlo
 */
export function errTextBoxEmpty() {
  Swal.fire({
    title: '<strong>Oops...<strong/>',
    text: 'Por favor, ingrese un nombre.',
    icon: 'warning',
    allowOutsideClick: false,
    allowEscapeKey: false,
  });
}

/**
 * Envia un cuadro con el proceso de seleccion
 * del amigoy al finalizar muestra al ganador.
 * brindando la posibilidad de repetir el sorteo
 * o limpiar la lista de amigos para otro nuevo sorteo
 * @param {number} winner - numero aleatorio del ganador
 */
export function procesandoAmigos(winner) {
  let timerInterval;
  Swal.fire({
    title: 'Sorteando',
    html: '<b></b>',
    timer: 3000,
    timerProgressBar: true,
    allowOutsideClick: false,
    allowEscapeKey: false,
    didOpen: () => {
      Swal.showLoading();
      const timer = Swal.getPopup().querySelector('b');
      timerInterval = setInterval(() => {
        timer.textContent = `${
          amigos[Math.floor(Math.random() * amigos.length)]
        }`;
      }, 50);
    },
    willClose: () => {
      clearInterval(timerInterval);
    },
  }).then(() => {
    Swal.fire({
      title: 'El ganador es: ',
      text: `${amigos[winner]}`,
      imageUrl: '/assets/winner.svg',
      imageHeight: '200',
      showCancelButton: true,
      confirmButtonText: 'Limpiar',
      cancelButtonText: 'Repetir',
      allowOutsideClick: false,
      allowEscapeKey: false,
    }).then((result) => {
      if (result.isConfirmed) {
        amigos = [];
        listaAmigos.innerHTML = '';
      } else {
        sortearAmigo();
      }
    });
  });
}

/**
 * Alerta cuando no hay suficientes amigos
 * para el sorteo
 */
export function noHaySuficientesAmigos() {
  Swal.fire({
    title: 'Agrega almenos 2 amigos',
    text: 'No hay suficientes amigos para realizar el sorteo',
    imageUrl: '/assets/friendless.svg',
    imageHeight: '200',
    allowOutsideClick: false,
    allowEscapeKey: false,
  });
}
