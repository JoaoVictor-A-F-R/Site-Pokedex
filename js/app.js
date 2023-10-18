const site = 'https://pokeapi.co/api/v2/pokemon'
const botao = document.querySelector('.botao')
const texto = document.querySelector('.texto')


function buscaPokemon(value){
    fetch(value)
        .then((response) => {
            return response.json()
        })
        .then((data) =>{
            console.log(data)
            var tagNome = document.createElement('p')
            var nome = document.createTextNode(data['name'])
            var img = document.createElement('img')
            img.src = data['sprites']['front_default']
            tagNome.appendChild(nome)
            document.querySelector('.card').appendChild(img)
            document.querySelector('.card').appendChild(tagNome)
        })
        .catch((erro) => {
            return alert('Erro imgPokemon: ' + erro)
        })
}

function buscaInicial(valorInicial, valorFinal){
    let url = site + '?limit=10000&offset=0'
    let inicio = valorInicial
    let fim = valorFinal
    fetch(url)
    .then((response) =>{
        return response.json()
    })
    .then((data) => {
        for(i = inicio; i < fim; i++){
            buscaPokemon(data['results'][i]['url'])
        }
    })
    .catch((erro) => {
        return alert('Erro buscaInicial: ' + erro)
    })
}
document.addEventListener('DOMContentLoaded', buscaInicial(0, 20))

botao.addEventListener('click', ()=>{
    if(texto.value != ''){
        let url = site + '/' + texto.value
        teste.forEach(element => {
            element.style.display = 'none'
        });
        buscaPokemon(url)
    }else{
        let teste = document.querySelectorAll('.card > p, img')
        teste.forEach(element => {
            element.style.display = 'none'
        });
        buscaInicial(0, 20)
    }
})

texto.addEventListener('keydown', (event) => {
    if (event.code === 'Enter'){
        if(texto.value != ''){
            let url = site + '/' + texto.value
            let teste = document.querySelectorAll('.card > p, img')
            teste.forEach(element => {
                element.style.display = 'none'
            });
            buscaPokemon(url)
        }else{
            let teste = document.querySelectorAll('.card > p, img')
            teste.forEach(element => {
                element.style.display = 'none'
            });
            buscaInicial(0, 20)
        }
    }
})