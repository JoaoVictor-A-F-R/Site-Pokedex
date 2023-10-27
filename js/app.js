// const site = 'https://pokeapi.co/api/v2/pokemon'
// const botao = document.querySelector('.botao')
// const texto = document.querySelector('.texto')
// const container = document.querySelector('.contPkm')
// const botaoMais = document.querySelector('.maisPkm')
// let inBusca = 0
// let fmBusca = 20

// function buscaPokemon(value){
//     fetch(value)
//         .then((response) => {
//             return response.json()
//         })
//         .then((data) =>{
//             // console.log(data)
//             var card = document.createElement('div')
//             card.classList.add('card')
//             // frente createElement
//             var frente = document.createElement('div')

//             var div1 = document.createElement('div')
//             var id = document.createElement('p')
//             if(data['id'] < 10){
//                 var idPkm = document.createTextNode("#000" + data['id'])
//             }else if(data['id'] < 100){
//                 var idPkm = document.createTextNode("#00" + data['id'])
//             }else if(data['id'] < 1000){
//                 var idPkm = document.createTextNode("#0" + data['id'])
//             }else{
//                 var idPkm = document.createTextNode("#"+data['id'])
//             }
//             var img = document.createElement('img')
//             img.src = data['sprites']['front_default']
//             id.appendChild(idPkm)
//             div1.appendChild(id)
//             div1.appendChild(img)
            
//             var div2 = document.createElement('div')
//             var nome = document.createElement('p')
//             nome.textContent = data['name'].charAt(0).toUpperCase() + data['name'].slice(1)
//             var div3 = document.createElement('div')
//             div3.classList.add('infoPokemon')
//             var tipo1 = document.createElement('p')
//             tipo1.classList.add('styleTipo')
//             var tipagem1 = document.createTextNode(data['types'][0]['type']['name'])
//             tipo1.appendChild(tipagem1)
//             tipo1.style.backgroundColor = 'var(--'+ data['types'][0]['type']['name'] +')'
//             div3.appendChild(tipo1)
//             if(data['types']['length'] == 2){
//                 var tipo2 = document.createElement('p')
//                 var tipagem2 = document.createTextNode(data['types'][1]['type']['name'])
//                 tipo2.appendChild(tipagem2)
//                 tipo2.classList.add('styleTipo')
//                 tipo2.style.backgroundColor = 'var(--'+ data['types'][1]['type']['name'] +')'
//                 div3.appendChild(tipo2)
//             }else{
//                 tipo1.style.gridColumnStart = 1
//                 tipo1.style.gridColumnEnd = 3
//             }
//             var peso = document.createElement('p')
//             var altura = document.createElement('p')
//             var vlPeso = document.createTextNode('Peso: ' + data['weight'] / 10 +' kg')
//             var vlAltura = document.createTextNode('Altura: ' + data['height'] / 10 + ' m')
//             peso.appendChild(vlPeso)
//             altura.appendChild(vlAltura)

//             div3.appendChild(peso)
//             div3.appendChild(altura)
//             div2.appendChild(nome)
//             div2.appendChild(div3)

//             frente.appendChild(div1)
//             frente.appendChild(div2)
//             frente.classList.add('frente')
            
//             // verso createElement 
//             var verso = document.createElement('div')
//             verso.classList.add('verso')
//             var div1Clone = div1.cloneNode(true)
//             var nomeClone = nome.cloneNode(true)
//             div1Clone.style.backgroundColor = 'var(--'+ data['types'][0]['type']['name'] +')'
//             div1Clone.appendChild(nomeClone)
//             verso.appendChild(div1Clone)

//             var div4 = document.createElement('div')
//             var div5 = document.createElement('div')
//             div5.classList.add('status')
//             var div6 = document.createElement('div')
//             div6.style.width = ''+data['stats'][3]['base_stat'] +'px'
//             console.log(parseInt(data['stats'][0]['base_stat']))
//             var status = document.createElement('p')
//             status.textContent = 'STATUS'
//             var vid = document.createElement('p')
//             vid.textContent = 'VID ' + data['stats'][0]['base_stat']
//             var atq = document.createElement('p')
//             atq.textContent = 'ATQ ' + data['stats'][1]['base_stat']
//             var def = document.createElement('p')
//             def.textContent = 'DEF ' + data['stats'][2]['base_stat']
//             var sp_atq = document.createElement('p')
//             sp_atq.textContent = 'SPA ' + data['stats'][3]['base_stat']
//             var sp_def = document.createElement('p')
//             sp_def.textContent = 'SPD ' + data['stats'][4]['base_stat']
//             var vel = document.createElement('p')
//             vel.textContent = 'VEL ' + data['stats'][5]['base_stat']
            

//             div4.appendChild(status)
//             div5.appendChild(vid)
//             div5.appendChild(div6)
//             div5.appendChild(atq)
//             div5.appendChild(div6.cloneNode(true))
//             div5.appendChild(def)
//             div5.appendChild(div6.cloneNode(true))
//             div5.appendChild(sp_atq)
//             div5.appendChild(div6.cloneNode(true))
//             div5.appendChild(sp_def)
//             div5.appendChild(div6.cloneNode(true))
//             div5.appendChild(vel)
//             div5.appendChild(div6.cloneNode(true))
//             div4.appendChild(div5)
//             verso.appendChild(div4)
//             card.appendChild(frente)
//             card.appendChild(verso)
//             container.appendChild(card)
//         })
//         .catch((erro) => {
//             return console.log('Erro imgPokemon: ' + erro)
//         })
// }

// function buscaInicial(valorInicial, valorFinal){
//     let url = site + '?limit=10000&offset=0'
//     let inicio = valorInicial
//     let fim = valorFinal
//     fetch(url)
//     .then((response) =>{
//         return response.json()
//     })
//     .then((data) => {
//         for(i = inicio; i < fim; i++){
//             buscaPokemon(data['results'][i]['url'])
//         }
//     })
//     .catch((erro) => {
//         return alert('Erro buscaInicial: ' + erro)
//     })
// }

// document.addEventListener('DOMContentLoaded', buscaInicial(inBusca, fmBusca), setTimeout(flip, 500))

// botao.addEventListener('click', ()=>{
//     if(texto.value != ''){
//         let url = site + '/' + texto.value
//         let teste = document.querySelectorAll('.card')
//         teste.forEach(element => {
//             container.removeChild(element)
//         });
//         botaoMais.style.display = 'none'
//         buscaPokemon(url)
//         setTimeout(flip, 500);
//     }else{
//         let teste = document.querySelectorAll('.card')
//         teste.forEach(element => {
//             container.removeChild(element)
//         });
//         buscaInicial(0, 20)
//         setTimeout(flip, 500);
//     }
// })

// texto.addEventListener('keydown', (event) => {
//     if (event.code === 'Enter'){
//         if(texto.value != ''){
//             let url = site + '/' + texto.value
//             let teste = document.querySelectorAll('.card')
//             teste.forEach(element => {
//                 container.removeChild(element)
//             });
//             botaoMais.style.display = 'none'
//             buscaPokemon(url)
//             setTimeout(flip, 500);
//         }else{
//             let teste = document.querySelectorAll('.card')
//             teste.forEach(element => {
//                 container.removeChild(element)
//             });
//             buscaInicial(0, 20)
//             setTimeout(flip, 500);
//         }
//     }
// })

// botaoMais.addEventListener('click', () => {
//     inBusca += 20
//     fmBusca += 20
//     buscaInicial(inBusca, fmBusca)
//     setTimeout(flip, 500);
// })

// var botaoTipo = document.querySelectorAll('.tipos button')
// botaoTipo.forEach(element => {
//     element.style.backgroundColor = 'var('+ element.value +')'
//     element.addEventListener('mouseenter', () =>{
//         element.style.transform = 'scale(1.1)'
//         element.style.boxShadow = '0 0 20px 0px var('+ element.value +')'
//     })
//     element.addEventListener('mouseleave', () =>{
//         element.style.boxShadow = 'none'
//         element.style.transform = 'none'
//     })
//     element.addEventListener('click',() => {
//         fetch('https://pokeapi.co/api/v2/type/'+ element.value.slice(2)+'')
//             .then((response) =>{
//                 return response.json()
//             })
//             .then((data) => {
//                 data['pokemon'].forEach(element => {
//                     let teste = document.querySelectorAll('.card')
//                     teste.forEach(element => {
//                         container.removeChild(element)
//                     });
//                     botaoMais.style.display = 'none'
//                     buscaPokemon(element['pokemon']['url'])
//                 });
//             })
//             .catch((erro) => {
//                 return alert('Erro buscaPorTipo: ' + erro)
//             })
//         setTimeout(flip, 500);   
//     })
// })

function flip(){
    var card = document.querySelector('.contPkm .card')
    card.classList.toggle('flip')
    // // console.log(card)
    // card.forEach(element => {
    //     element.addEventListener('click', () =>{
    //         element.classList.toggle('flip')
    //     })
    // });
}