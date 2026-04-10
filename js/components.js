
/**
 * Carga un componente HTML desde un archivo en un elemento con el identificador especificado.
 * Si el elemento no existe, recupera el archivo y establece el `innerHTML` del elemento con el contenido de la respuesta.
 * Si el id es «header-component», llama a la función initHeader.
 * @param {string} id: el id del elemento en el que se va a cargar el componente
 * @param {string} file: la ruta al archivo HTML que se va a cargar
 * @returns {Promise<void>}: una promesa que se resuelve cuando se ha cargado el componente
 */
async function loadComponent(id, file) {
    const element = document.getElementById(id);

    if (!element) return;

    const response = await fetch(file);
    const html = await response.text();

    element.innerHTML = html;

    if (id === "header-component") {
        initHeader();
    }

    if (id === "footer-component") {
        initFooter();
    }
}

loadComponent("header-component", "/components/header.html");
loadComponent("footer-component", "/components/footer.html");


