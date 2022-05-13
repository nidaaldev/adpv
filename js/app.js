// Variables
const formulario = document.querySelector('#nueva-cita');
const nombre = document.querySelector('#mascota');
const propietario = document.querySelector('#propietario');
const fecha = document.querySelector('#fecha');
const hora = document.querySelector('#hora');
const sintomas = document.querySelector('#sintomas');
const listaCitas = document.querySelector('#citas');
const eliminarBtn = document.querySelector('.text-danger');

let citasArreglo = [];
let citaEditar = {};

// Clases
class Cita {
    constructor(nombre, propietario, telefono, fecha, hora, sintomas) {
        this.nombre = nombre.value;
        this.propietario = propietario.value;
        this.telefono = telefono.value;
        this.fecha = fecha.value;
        this.hora = hora.value;
        this.sintomas = sintomas.value;
        this.id = Date.now();
    }

    agregarCita(cita) {
        const citas = citasArreglo.push(cita)
        console.log(citasArreglo);
    }

    static eliminarCita(id) {
        let resultado = citasArreglo.filter(cita => cita.id !== id);

        console.log(resultado);

        citasArreglo = resultado;
    }

}

class UI {
    agregarCitaHTML() {
        citasArreglo.forEach(cita => {

            const { nombre, propietario, telefono, fecha, hora, sintomas, id } = cita;

            const div = document.createElement('div');
            div.innerHTML = `
                <p><span class="font-weight-bold">Mascota</span>: ${nombre}</p>
                <p><span class="font-weight-bold">Propietario</span>: ${propietario}</p>
                <p><span class="font-weight-bold">Teléfono</span>: ${telefono}</p>
                <p><span class="font-weight-bold">Fecha</span>: ${fecha}</p>
                <p><span class="font-weight-bold">Hora:</span> ${hora}</p>
                <p><span class="font-weight-bold">Sintomas</span>: ${sintomas}</p>
                <a href="#" class="text-danger" onclick="eliminarCita(${id})">Eliminar X</a>
            `;
            div.classList.add('card', 'mb-3', 'p-3')
            listaCitas.appendChild(div); 
        })
    }

    imprimirAlerta(mensaje, tipo) {
        const alerta = document.createElement('div');
        alerta.textContent = mensaje;
        
        if (tipo === 'error') {
            alerta.classList.add('alerta','text-white', 'text-center', 'bg-danger', 'p-2', 'mb-4');
        }

        if (tipo === 'success') {
            alerta.classList.add('alerta','text-white', 'text-center', 'bg-success', 'p-2', 'mb-4');
        }

        if (!document.querySelector('.alerta')) {
            formulario.insertBefore(alerta, document.querySelector('.form-group'))
        }

        setTimeout(() => {
            alerta.remove();
        }, 3000)
        
    }

}

const ui = new UI();

// Eventos
formulario.addEventListener('submit', agregarCita);

// Funciones
function agregarCita(e) {
    e.preventDefault();

    const cita = new Cita(nombre, propietario, telefono, fecha, hora, sintomas);

    if (cita.nombre === '' || cita.nombre === '' || cita.telefono === '' || cita.fecha === '' || cita.hora === '' || cita.sintomas === '') {
        ui.imprimirAlerta('Todos los campos son obligatorios', 'error');
        return;
    } else if(isNaN(cita.telefono)) {
        ui.imprimirAlerta('Formato del número de télefono incorrecto', 'error');
        return;
    } else {
        ui.imprimirAlerta('La cita ha sido añadida correctamente', 'success');
        cita.agregarCita(cita);
    }

    limpiarHTML();
    ui.agregarCitaHTML();
    // formulario.reset();
}

function eliminarCita(id) {
    Cita.eliminarCita(id);

    limpiarHTML();

    ui.agregarCitaHTML();
    ui.imprimirAlerta('La cita ha sido eliminada corrrectamente', 'success');

}

function limpiarHTML() {
    if (listaCitas.children) {
        listaCitas.innerHTML = '';
    }
}