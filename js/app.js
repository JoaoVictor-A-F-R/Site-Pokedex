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
            var card = document.createElement('div')
            card.classList.add('card')
            // frente createElement
            var frente = document.createElement('div')

            var div1 = document.createElement('div')
            var id = document.createElement('p')
            if(data['id'] < 10){
                var idPkm = document.createTextNode("#000" + data['id'])
            }else if(data['id'] < 100){
                var idPkm = document.createTextNode("#00" + data['id'])
            }else if(data['id'] < 1000){
                var idPkm = document.createTextNode("#0" + data['id'])
            }else{
                var idPkm = document.createTextNode("#"+data['id'])
            }
            var img = document.createElement('img')
            img.src = data['sprites']['front_default']
            id.appendChild(idPkm)
            div1.appendChild(id)
            div1.appendChild(img)
            
            var div2 = document.createElement('div')
            var nome = document.createElement('p')
            var nomePkm = document.createTextNode(data['name'])
            nome.appendChild(nomePkm)
            var div3 = document.createElement('div')
            div3.classList.add('infoPokemon')
            var tipo1 = document.createElement('p')
            tipo1.classList.add('styleTipo')
            var tipagem1 = document.createTextNode(data['types'][0]['type']['name'])
            tipo1.appendChild(tipagem1)
            tipo1.style.backgroundColor = 'var(--'+ data['types'][0]['type']['name'] +')'
            div3.appendChild(tipo1)
            if(data['types']['length'] == 2){
                var tipo2 = document.createElement('p')
                var tipagem2 = document.createTextNode(data['types'][1]['type']['name'])
                tipo2.appendChild(tipagem2)
                tipo2.classList.add('styleTipo')
                tipo2.style.backgroundColor = 'var(--'+ data['types'][1]['type']['name'] +')'
                div3.appendChild(tipo2)
            }else{
                tipo1.style.gridColumnStart = 1
                tipo1.style.gridColumnEnd = 3
            }
            var peso = document.createElement('p')
            var altura = document.createElement('p')
            var vlPeso = document.createTextNode('Peso: ' + data['weight'] / 10 +' kg')
            var vlAltura = document.createTextNode('Altura: ' + data['height'] / 10 + ' m')
            peso.appendChild(vlPeso)
            altura.appendChild(vlAltura)

            div3.appendChild(peso)
            div3.appendChild(altura)
            div2.appendChild(nome)
            div2.appendChild(div3)

            frente.appendChild(div1)
            frente.appendChild(div2)
            frente.classList.add('frente')
            
            // verso createElement 
            var verso = document.createElement('div')
            verso.classList.add('verso')

            card.appendChild(frente)
            container.appendChild(card)
            // var div = document.createElement('div')
            
            // var tagId = document.createElement('p')
            // if(data['id'] < 10){
            //     var id = document.createTextNode("#000" + data['id'])
            // }else if(data['id'] < 100){
            //     var id = document.createTextNode("#00" + data['id'])
            // }else if(data['id'] < 1000){
            //     var id = document.createTextNode("#0" + data['id'])
            // }else{
            //     var id = document.createTextNode("#"+data['id'])
            // }
            // tagId.appendChild(id)

            // var img = document.createElement('img')
            // img.src = data['sprites']['front_default']

            // var tagNome = document.createElement('p')
            // var nome = document.createTextNode(data['name'].charAt(0).toUpperCase() + data['name'].slice(1))
            // tagNome.appendChild(nome)

            // var div2 = document.createElement('div')
            // var tipo1 = document.createElement('p')
            // var tipagem1 = document.createTextNode(data['types'][0]['type']['name'])
            // tipo1.appendChild(tipagem1)
            // tipo1.style.backgroundColor = 'var(--'+ data['types'][0]['type']['name'] +')'
            // div2.appendChild(tipo1)

            // if(data['types']['length'] == 2){
            //     var tipo2 = document.createElement('p')
            //     var tipagem2 = document.createTextNode(data['types'][1]['type']['name'])
            //     tipo2.appendChild(tipagem2)
            //     tipo2.style.backgroundColor = 'var(--'+ data['types'][1]['type']['name'] +')'
            //     div2.appendChild(tipo2)
            // }

            // var div3 = document.createElement('div')
            // var peso = document.createElement('p')
            // var altura = document.createElement('p')
            // var vlPeso = document.createTextNode('Peso: ' + data['weight'] / 10 +' kg')
            // var vlAltura = document.createTextNode('Altura: ' + data['height'] / 10 + ' m')
            // peso.appendChild(vlPeso)
            // altura.appendChild(vlAltura)
            // div3.appendChild(peso)
            // div3.appendChild(altura)
            // div3.classList.add('infoPokemon')

            // div.appendChild(tagId)
            // div.appendChild(img)
            // div.appendChild(tagNome)
            // div.appendChild(div2)
            // div.appendChild(div3)
            // div.classList.add('card')
            // container.appendChild(div)
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

var botaoTipo = document.querySelectorAll('.tipos button')
botaoTipo.forEach(element => {
    element.style.backgroundColor = 'var('+ element.value +')'
    element.addEventListener('mouseenter', () =>{
        element.style.transform = 'scale(1.1)'
        element.style.boxShadow = '0 0 20px 0px var('+ element.value +')'
    })
    element.addEventListener('mouseleave', () =>{
        element.style.boxShadow = 'none'
        element.style.transform = 'none'
    })
    element.addEventListener('click',() => {
        fetch('https://pokeapi.co/api/v2/type/'+ element.value.slice(2)+'')
            .then((response) =>{
                return response.json()
            })
            .then((data) => {
                data['pokemon'].forEach(element => {
                    let teste = document.querySelectorAll('.card')
                    teste.forEach(element => {
                        element.style.display = 'none'
                    });
                    botaoMais.style.display = 'none'
                    buscaPokemon(element['pokemon']['url'])
                });
            })
            .catch((erro) => {
                return alert('Erro buscaPorTipo: ' + erro)
            })
        })
})

function flip(){
    const card = document.querySelector('.card')
    card.classList.toggle('flip')
}