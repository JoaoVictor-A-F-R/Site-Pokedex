const site = 'https://pokeapi.co/api/v2/pokemon'
const botao = document.querySelector('.botao')
const texto = document.querySelector('.texto')
const container = document.querySelector('.contPkm')
const botaoMais = document.querySelector('.maisPkm')
let inBusca = 0
let fmBusca = 20


function buscaPokemon(value){
    fetch(value)
        .then((response) => {
            return response.json()
        })
        .then((data) =>{
            console.log(data)
            var div = document.createElement('div')
            
            var tagId = document.createElement('p')
            if(data['id'] < 10){
                var id = document.createTextNode("#000" + data['id'])
            }else if(data['id'] < 100){
                var id = document.createTextNode("#00" + data['id'])
            }else if(data['id'] < 1000){
                var id = document.createTextNode("#0" + data['id'])
            }else{
                var id = document.createTextNode("#"+data['id'])
            }
            tagId.appendChild(id)

            var img = document.createElement('img')
            img.src = data['sprites']['front_default']

            var tagNome = document.createElement('p')
            var nome = document.createTextNode(data['name'])
            tagNome.appendChild(nome)

            var div2 = document.createElement('div')
            var tipo1 = document.createElement('p')
            var tipagem1 = document.createTextNode(data['types'][0]['type']['name'])
            tipo1.appendChild(tipagem1)
            tipo1.style.backgroundColor = 'var(--'+ data['types'][0]['type']['name'] +')'
            div2.appendChild(tipo1)

            if(data['types']['length'] == 2){
                var tipo2 = document.createElement('p')
                var tipagem2 = document.createTextNode(data['types'][1]['type']['name'])
                tipo2.appendChild(tipagem2)
                tipo2.style.backgroundColor = 'var(--'+ data['types'][1]['type']['name'] +')'
                div2.appendChild(tipo2)
            }

            div.appendChild(tagId)
            div.appendChild(img)
            div.appendChild(tagNome)
            div.appendChild(div2)
            div.classList.add('card')
            container.appendChild(div)
        })
        .catch((erro) => {
            return console.log('Erro imgPokemon: ' + erro)
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

document.addEventListener('DOMContentLoaded', buscaInicial(inBusca, fmBusca))

botao.addEventListener('click', ()=>{
    if(texto.value != ''){
        let url = site + '/' + texto.value
        let teste = document.querySelectorAll('.card')
        teste.forEach(element => {
            element.style.display = 'none'
        });
        botaoMais.style.display = 'none'
        buscaPokemon(url)
    }else{
        let teste = document.querySelectorAll('.card')
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
            let teste = document.querySelectorAll('.card')
            teste.forEach(element => {
                element.style.display = 'none'
            });
            botaoMais.style.display = 'none'
            buscaPokemon(url)
        }else{
            let teste = document.querySelectorAll('.card')
            teste.forEach(element => {
                element.style.display = 'none'
            });
            buscaInicial(0, 20)
        }
    }
})

botaoMais.addEventListener('click', () => {
    inBusca += 20
    fmBusca += 20
    buscaInicial(inBusca, fmBusca)
})