// El principal objetivo de este desafío es fortalecer tus habilidades en lógica de programación. Aquí deberás desarrollar la lógica para resolver el problema.
let amigos = [];
const listaAmigos = document.querySelector('.name-list');

function agregarAmigo() {
  let amigo = document.getElementById('amigo');
  if (amigo.value) {
    amigos.push(amigo.value);
    const nombre = document.createElement('li');
    nombre.textContent = `${amigo.value}`;
    listaAmigos.appendChild(nombre);
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
      text: `${amigo.value}`,
    });
    amigo.value = '';
  } else {
    Swal.fire({
      title: '<strong>Oops...<strong/>',
      text: 'Por favor, ingrese un nombre.',
      icon: 'warning',
    });
  }
  amigo.focus();
}

function sortearAmigo() {
  let winner = Math.floor(Math.random() * amigos.length);
  if (amigos.length > 1) {
    let timerInterval;
    Swal.fire({
      title: 'Sorteando',
      html: '<b></b>',
      timer: 3000,
      timerProgressBar: true,
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
      }).then((result) => {
        if (result.isConfirmed) {
          amigos = [];
          listaAmigos.innerHTML = '';
          console.log(amigos);
        }
      });
    });
  } else {
    Swal.fire({
      title: 'Agrega almenos 2 amigos',
      text: 'No hay suficientes amigos para realizar el sorteo',
      imageUrl: '/assets/friendless.svg',
      imageHeight: '200',
    });
  }
}
