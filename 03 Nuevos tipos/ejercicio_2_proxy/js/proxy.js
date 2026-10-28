// Ejercicio para ver el concepto de Proxy
// Objeto Original
const persona = {
    nombre: '',
    apellido: '',
    edad: 0
    // twitter
};

const manejador = {
    set(obj, prop, valor) {
        // Validar que la propiedad sea permitid
        const propiedadesPermitidas = ['nombre', 'apellido', 'edad']; //Twitter

        if(propiedadesPermitidas.includes(prop)) {
            // Asignar e lcalor del objeto
            obj[prop] = valor;

        } else {
            // Mostrar advertencia si la propiedad no es válida
            console.error(`X la propiedad "${prop}" no está permitida en el objeto persona`);
        }
        // importante retornar true para que el proxy no lance un error
        return true;
    }
};



const manejadorExpresionesRegulares = {
    set(obj, prop, valor) {
        // Lista de propiedades permitidas
        const propiedadesPermitidas = ['nombre', 'apellido', 'edad'];

        // Validar que la propiedad sea permitida
        if (propiedadesPermitidas.indexOf(prop) === -1) {
            console.error(`X la propiedad "${prop}" no está permitida en el objeto persona`);
            return false; // importante para el prooxy sepa que falló
        }

        if ((prop === 'nombre' || prop === 'apellido') 
            && !/^[A-Za-zÑñÁáÉéÍíÓóÚúÜü\s]+$/g.test(valor)) {
            console.error(`El valor de "${prop} no es válido. Solo se permiten letras y espacios`);
            return;
        }

        // TAREA : agregar validación de edad


        // si es válida asigna el valor
        obj[prop] = valor;
        return true; // se pudo asignar correctamente
    }
};

        // TAREA 2; Modificar código para que Twitter sea una propiedad permitida
const juan = new Proxy(persona, manejadorExpresionesRegulares)
    //Asignar valores
    juan.nombre = 2323223;
    juan.apellido = 6666;
    juan.edad =  'hola';
    // Intenta asignar una propiedad no válida.
    juan.twitter = "@juanperez";

console.info("Proxy juan:", juan);
console.info("Objeto persona:", persona);
console.log(juan.nombre);


