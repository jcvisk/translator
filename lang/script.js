/**
 * El DOMContentLoadedevento se activa cuando el documento HTML inicial se ha cargado y analizado por completo,
 * sin esperar a que las hojas de estilo, las imágenes y los submarcos terminen de cargarse.
 */
 window.addEventListener('DOMContentLoaded', (event) => {
    /**
     * Consumiendo JSON
     * @type {XMLHttpRequest}
     */
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {

            // Si el item 'lang' no esta definido en localStorage entonces se define en el idioma por defecto elegido
            if (!localStorage.getItem("lang")) {
                localStorage.setItem("lang", "en");
            }

            // se obtiene el idioma por defecto desde el localStorage
            let lang = localStorage.getItem("lang");
            // se obtiene y parsea el JSON
            let json = JSON.parse(xhttp.responseText);

            // Se llama a la funcion changeContent
            changeContent(lang, json);

            // Al dar clic en los elemento que contengan la clase 'translate'
            document.querySelectorAll(".translate").forEach(function (element) {
                element.addEventListener("click", function(event){

                    // Se obtiene el valor del id del elemento cliquedo para definirlo como idioma por defecto
                    let lang = this.getAttribute('id');
                    localStorage.setItem("lang", lang);

                    // Se llama a la funcion changeContent
                    changeContent(lang, json);
                });
            });
        }
    };
    xhttp.open("GET", "lang/lang.json", true);
    xhttp.send();
});

/**
 * Se encarga de obtener todos los elemetos a traducir y agregarle la traduccion del idioma seleccionado
 * @param language: idioma al que se va a traducir
 * @param json: archivo con el contenido de los idiomas
 */
function changeContent(lang, json) {

    //  obtiene la lista de elementos a traducir y los recorre
    document.querySelectorAll(".lang").forEach(function (element) {

        //  obtiene el contenido de la traduccion
        let content = json[lang][element.getAttribute('key')];

        //  si el elementon contiene una clase que contenga la estrucctura 'lang-attr-'
        if (element.getAttribute('class').includes('lang-attr-')) {
            // Separa cada una de las clases
            let className = element.getAttribute('class').split(' ');

            // recorre las clases del elemento
            for (let i = 0; i < className.length; i++){
                // si la calse contiene 'lang-attr-' se hace un split y se conserva el nombre del atriburto
                if (className[i].includes('lang-attr-')) {
                    // se guarda el atributo
                    let attrName = className[i].split('lang-attr-');
                    // se actualiza el valor del atributo
                    element.setAttribute(attrName[1], content);
                }
            }
        }else {
            // se actualiza el texto
            element.textContent = content;
        }
    });
}
