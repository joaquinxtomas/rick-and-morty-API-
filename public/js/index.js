const list = document.getElementById('list');
const buttons = document.getElementById('buttons');


let url = 'https://rickandmortyapi.com/api/character';
let btnNext;
let btnPrevious;
let templateHtml;

const targets = () => {
    let estado = document.querySelectorAll('.estado')
    let punto = document.querySelectorAll('.estado i')

    for (let index = 0; index < estado.length; index++) {
        if (estado[index].innerText == 'Alive') {
            punto[index].style.color = 'green'
        } else if (estado[index].innerText == 'Dead') {
            punto[index].style.color = 'red'
        } else if (estado[index].innerText == 'unknown') {
            punto[index].style.color = 'orange'
        } else {
            punto[index].style.color = 'grey'
        }

    }
}

const menuInfo = () => {
    let desplegable = document.querySelectorAll('.desplegable')
    let conten = document.querySelectorAll('.contenedor-info')

    for (let index = 0; index < conten.length; index++) {
        conten[index].addEventListener('click', (e) => {
            if (e.target) {
                conten[index].classList.toggle('contenedor')
                desplegable[index].classList.toggle('desplegableok')
            }
        })

    }

}

const getList = async (url) => {
    try {
        const response = await fetch(url);
        const results = await response.json()
        data(results.results)
        btnNext = results.info.next ? `<a class="btn" data-url=${results.info.next}>Next</a>` : ''
        btnPrevious = results.info.prev ? `<a class="btn" data-url=${results.info.prev}>Previous</a>` : ''
        buttons.innerHTML = btnPrevious + " " + btnNext;
    } catch (error) {
        console.log(error)
    }
}

getList(url)

const data = async (data) => {
    list.innerHTML = '';
    try {
        for (const info of data) {
            const resp = await fetch(info.url)
            const resul = await resp.json();
            templateHtml = `<div class="contenedor-info" id="contenedor-info"><img src="${resul.image}">
            <div class="contenedor-datos">
            <h2 class="nombre">${resul.name}</h2>
            <p class="estado"><i class="fa-solid fa-circle"></i>${resul.status}</p>
            <div class="desplegable">
                <p>Genre: ${resul.gender}</p>
                <p>Origin: ${resul.origin.name}</p>
                <p>First appear:<br><a href="${resul.episode[0]}">${resul.episode[0]}</a></p>
                </div>
            </div>
            </div>`

            list.innerHTML += templateHtml

            targets()

            menuInfo()

        }



    } catch (error) {
        console.log(error)
    }

}

buttons.addEventListener('click', (e) => {
    if (e.target.classList.contains('btn')) {
        let value = e.target.dataset.url;
        console.log(value)
        getList(value)
    }
})

let logo = document.querySelector('.imagen-logo')

logo.addEventListener('click', () => {
    logo.classList.toggle('pepi')
})

let form = document.querySelector('form')
let formSearch = form.addEventListener('submit', (e) => {
    e.preventDefault();
    /*     let paginas = 1; */

    const title = document.querySelector('.search')
    const value = (title.value)
    const resultados = value.replace(' ', '%20')
    const urlCharacter = `https://rickandmortyapi.com/api/character/?name=${resultados}`

    const getCharacter = async (urlCharacter) => {
        try {
            const respuesta = await fetch(urlCharacter);
            const res = await respuesta.json()
            character(res.results)
        } catch (error) {
            console.log(error)
        }
    }

    getCharacter(urlCharacter)

    const character = async (character) => {
        list.innerHTML = '';
        let busqueda = document.querySelector('.resultados')
        try {
            const personaje = await fetch(urlCharacter)
            const resultadoPersonaje = await personaje.json();
            for (let index = 0; index < resultadoPersonaje.results.length; index++) {
                templateHtml = `<div class="contenedor-info" id="contenedor-info"><img src="${resultadoPersonaje.results[index].image}">
                <div class="contenedor-datos">
                <h2 class="nombre">${resultadoPersonaje.results[index].name}</h2>
                <p class="estado"><i class="fa-solid fa-circle"></i>${resultadoPersonaje.results[index].status}</p>
                <div class="desplegable">
                <p>Género: ${resultadoPersonaje.results[index].gender}</p>
                <p>Origen: ${resultadoPersonaje.results[index].origin.name}</p>
                <p>Primera aparición:<br><a href=${resultadoPersonaje.results[index].episode[0]}>${resultadoPersonaje.results[index].episode[0]}</a></p>
                </div>
            </div>
                </div>`

                list.innerHTML += templateHtml
            }

            buttons.style.display = 'none'

            if (resultados != "") {
                busqueda.innerHTML = '<h1>Resultados de tu búsqueda</h1><br>'
            } else {
                buttons.style.display = 'flex'
                busqueda.innerHTML = ''
            }


            targets()

            menuInfo()

        } catch (error) {
            console.log(error)
        }

    }
})













