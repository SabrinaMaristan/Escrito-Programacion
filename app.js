document.getElementById('formulario').addEventListener('submit', function (e) {
    e.preventDefault();

    const nombre = document.getElementById('nombre').value.trim();
    const cantidad = parseInt(document.getElementById('cantidad').value);
    const tipo = document.getElementById('tipoEntrada').value; //tipo de entrada: general, vip, platino
    const codigo = document.getElementById('codigo').value.trim().toUpperCase(); // convertir a mayúsculas
    
    const mensaje = document.getElementById('mensaje');

    // limpiar mensaje anterior
    mensaje.textContent = '';
    mensaje.className = 'alerta';

    // validación de los campos

    if (!nombre && !cantidad && !tipo) {
        mostrarMensaje("Completa los campos.", 'error');
        return;
    }

    if (!nombre) {
        mostrarMensaje("El nombre no puede estar vacío.", 'error');
        return;
    }

    if (nombre.length < 3) {
        mostrarMensaje("El nombre debe tener al menos 3 caracteres.", 'error');
        return;
    }

    if (isNaN(cantidad) || cantidad < 1) {
        mostrarMensaje("La cantidad debe ser mayor o igual a 1.", 'error');
        return;
    }

    if (!tipo) {
        mostrarMensaje("Selecciona un tipo de entrada.", 'error');
        return;
    }

    let precios = {
        general: 1000,  //tipo: valor
        vip: 2000,      
        platino: 3000
    };

    let precioBase = precios[tipo];
    let precioPorEntrada = precioBase;
    let total = precioBase * cantidad;

    if (codigo === 'ROCK10') {
        precioPorEntrada = precioBase - (precioBase * 0.10); // -10% de descuento
        total = precioPorEntrada * cantidad;
    }

    mostrarMensaje(`¡Gracias ${nombre} por tu reservación!`, 'nombre');
    mostrarMensaje(`El total a pagar es $${total.toFixed(2)}.
                    Precio por entrada: $${precioPorEntrada.toFixed(2)}`, 'exito');
});

function mostrarMensaje(texto, clase) {
    const contenedor = document.getElementById('mensaje');

    const mensajeElemento = document.createElement('div');
    mensajeElemento.classList.add('alerta', clase); // clase de alerta y la clase específica
    mensajeElemento.innerHTML = texto;

    contenedor.appendChild(mensajeElemento); // agregar el mensaje al contenedor
}
