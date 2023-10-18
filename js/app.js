const site = 'https://pokeapi.co/api/v2/pokemon'
const botao = document.querySelector('.botao')
let busca = site + '/' +document.querySelector('.texto').value


function buscaPokemon(value){
    fetch(value)
        .then((response) => {
            return response.json()
        })
        .then((data) =>{
            var tagNome = document.createElement('p')
            var nome = document.createTextNode(data['name'])
            var img = document.createElement('img')
            img.src = data['sprites']['front_default']
            tagNome.appendChild(nome)
            document.querySelector('.card').appendChild(tagNome)
            document.querySelector('.card').appendChild(img)
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
            console.log(data['results'][i]['url'])
            buscaPokemon(data['results'][i]['url'])
        }
    })
    .catch((erro) => {
        return alert('Erro buscaInicial: ' + erro)
    })
}
document.addEventListener('DOMContentLoaded', buscaInicial(0, 20))
// botao.addEventListener('click', buscaPokemon(busca))
