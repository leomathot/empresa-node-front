document.addEventListener("DOMContentLoaded", () => {
    // obtener el id del empleado de la URL
    const urlParams = new URLSearchParams(window.location.search)
    const idEmpleado = urlParams.get('id')

    // obtener el formulario para editar un empleado
    const formEditarEmpleado = document.querySelector("#form-editar-empleado")

    // función para obtener los datos del empleado
    const fetchEmpleado = async (id) => {
        const respuesta = await axios.get(`http://localhost:3030/empleados/${id}`)
        const empleado = respuesta.data

        // rellenar el formulario con los datos del empleado
        document.querySelector("#nuevo-nombre").value = empleado.nombre
        document.querySelector("#nuevo-apellido").value = empleado.apellido
        document.querySelector("#nuevo-departamento").value = empleado.departamentoId
        document.querySelector("#nuevo-titulo").value = empleado.titulo
        document.querySelector("#nuevo-sueldo").value = (empleado.sueldo)

        // fecha
        const fechaContratacion = new Date(Date.parse(empleado.fechaContratacion));
        const fechaContratacionFormateada = fechaContratacion.toISOString().substring(0, 10);
        document.querySelector("#nuevo-fecha-contratacion").value = fechaContratacionFormateada;
        // Convierte la cadena de texto empleado.fechaContratacion a un objeto Date usando la función Date.parse().
        // Formatea el objeto Date a una cadena en formato ISO usando el método toISOString() y luego extrae los primeros 10 caracteres, que corresponden a la fecha en formato AAAA-MM-DD, usando el método substring().
        // Asigna la cadena formateada al valor del input con el id "nuevo-fecha-contratacion" usando la propiedad value.
    }

    // agregar evento de envío al formulario
    formEditarEmpleado.addEventListener("submit", async (event) => {
        event.preventDefault()
        actualizarEmpleado()
    })

    // funcion para actualizar empleado
    const actualizarEmpleado = async () => {
        // obtener los valores del formulario
        const nombre = document.querySelector("#nuevo-nombre").value
        const apellido = document.querySelector("#nuevo-apellido").value
        const departamentoId = document.querySelector("#nuevo-departamento").value
        const titulo = document.querySelector("#nuevo-titulo").value
        const fechaContratacion = document.querySelector("#nuevo-fecha-contratacion").value
        const sueldo = document.querySelector("#nuevo-sueldo").value

        // crear el objeto empleado
        const empleadoActualizado = {
            nombre,
            apellido,
            departamentoId,
            titulo,
            fechaContratacion,
            sueldo
        }

        // enviar la solicitud PUT a la API
        try {
            await axios.put(`http://localhost:3030/empleados/${idEmpleado}`, empleadoActualizado)
            // redirigir a la página principal
            window.location.href = 'index.html'
        } catch (error) {
            console.error("Error al actualizar empleado: ", error)
        }
    }

    // llamar a la función para obtener los datos del empleado al cargar la página
    if (idEmpleado) {
        fetchEmpleado(idEmpleado)
    }
})