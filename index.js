/* DOMContentLoaded */
/* evento DOMContentLoaded para asegurar que el script se ejecute después de que el DOM se haya cargado completamente. */
document.addEventListener("DOMContentLoaded", () => {
    // obtener el cuerpo de la tabla donde se muestran los empleados
    const bodyTablaEmpleados = document.querySelector("#body-tabla-empleados")
    // obtener el formulario para crear un nuevo empleado
    const formCrearEmpleado = document.querySelector("#form-crear-empleado")

    // funcion para obtener los datos de la API usando Axios
    const fetchEmpleados = async () => {
        try {
            const respuesta = await axios.get(`https://leom.alwaysdata.net/empleados`)
            console.log(respuesta.data);
            const empleados = respuesta.data

            // limpiar la tabla antes de agregar los nuevos datos
            bodyTablaEmpleados.innerHTML = ""

            // interar sobre los datos y agregar los nuevos datos
            empleados.forEach(empleado => {
                // crear una nueva fila
                const fila = document.createElement("tr")
                // crear celdas para el titulo , contenido y acciones
                const celdaNombre = document.createElement("td")
                const celdaApellido = document.createElement("td")
                const celdaDepartamento = document.createElement("td")
                const celdaTitulo = document.createElement("td")
                const celdaFechaContratacion = document.createElement("td")
                const celdaSueldo = document.createElement("td")
                const celdaAcciones = document.createElement("td")

                // asignar el contenido de las celdas
                celdaNombre.textContent = empleado.nombre
                celdaApellido.textContent = empleado.apellido
                celdaDepartamento.textContent = empleado.departamentoId
                celdaTitulo.textContent = empleado.titulo
                celdaFechaContratacion.textContent = formatearFecha(empleado.fechaContratacion)
                celdaSueldo.textContent = `$${empleado.sueldo}`

                // crear boton de eliminar
                const botonEliminar = document.createElement("button")
                botonEliminar.textContent = "Eliminar"
                botonEliminar.addEventListener("click", () => {
                    borrarEmpleado(empleado.id)
                }) // 

                // crear boton para editar
                const botonEditar = document.createElement("button")
                botonEditar.textContent = "Editar"
                botonEditar.addEventListener("click", () => {
                    //redirigir a la pagina de edicion
                    window.location.href = `edit.html?id=${empleado.id}`
                })
                // agregar los botones a la celda de acciones
                celdaAcciones.appendChild(botonEliminar)
                celdaAcciones.appendChild(botonEditar)

                // agregar las celdas a la fila
                fila.appendChild(celdaNombre)
                fila.appendChild(celdaApellido)
                fila.appendChild(celdaDepartamento)
                fila.appendChild(celdaTitulo)
                fila.appendChild(celdaFechaContratacion)
                fila.appendChild(celdaSueldo)
                fila.appendChild(celdaAcciones)
                // agregar la fila al cuerpo de la tabla
                bodyTablaEmpleados.appendChild(fila)
            })

        } catch (error) {
            console.error("Error para cargar empleados: ", error)
        }
    }

    // funcion para formatear fecha
    function formatearFecha(f) {
        // Create a Date object from the ISO string
        const fecha = new Date(f);
      
        // Get year, month (0-indexed), and day components
        const year = fecha.getFullYear();
        const month = String(fecha.getMonth() + 1).padStart(2, '0'); // Pad month with leading zero if necessary
        const day = String(fecha.getDate()).padStart(2, '0'); // Pad day with leading zero if necessary
      
        // Format the date in YYYY-MM-DD
        return `${month}-${day}-${year}`;
      }

    // funcnion para borrar un empleado
    const borrarEmpleado = async (id) => {
        try {
            await axios.delete(`https://leom.alwaysdata.net/empleados/${id}`)
            // recargar los empleados
            fetchEmpleados();
        } catch (error) {
            console.error("Error para borrar empleados: ", error)
        }
    }

    // agregar evento de envío al formulario
    formCrearEmpleado.addEventListener("submit", async (event) => {
        // prevenir la recarga de la página
        event.preventDefault()
        crearEmpleado()
    })

    // funcion para crear un nuevo empleado
    const crearEmpleado = async () => {

        // obtener los valores del formulario
        const nombre = document.querySelector("#nuevo-nombre").value
        const apellido = document.querySelector("#nuevo-apellido").value
        const departamentoId = document.querySelector("#nuevo-departamento").value
        const titulo = document.querySelector("#nuevo-titulo").value
        const fechaContratacion = document.querySelector("#nuevo-fecha-contratacion").value
        const sueldo = document.querySelector("#nuevo-sueldo").value

        // crear el objeto empleado
        const nuevoEmpleado = {
            nombre,
            apellido,
            departamentoId,
            titulo,
            fechaContratacion,
            sueldo
        }

        // enviar la solicitud POST a la API
        try {
            await axios.post(`https://leom.alwaysdata.net/empleados`, nuevoEmpleado)
            // recargar los empleados
            fetchEmpleados()
            // limpiar el formulario
            formCrearEmpleado.reset()
        } catch (error) {
            console.error("Error al crear empleado: ", error)
        }
    }

    // llamar a la funcion para obtener y mostrar los empleados al cargar la pagina
    fetchEmpleados();
})

