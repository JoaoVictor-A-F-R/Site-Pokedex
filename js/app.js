const pegarIdPokemon = async pokemons =>{
    return pokemons.map(objeto => objeto.id)
}

const pegarNomePokemon = async pokemons =>{
    return pokemons.map(objeto => objeto.name)
}

const pegarTipoPokemon = async pokemons =>{
    return pokemons.map(objeto => objeto.types.map(tipos => tipos.type.name))
}

const pegarAlturaPokemon = async pokemons =>{
    const alturas = pokemons.map(objeto => objeto.height / 10)
    return alturas
}

const pegarPesoPokemon = async pokemons =>{
    const pesos = pokemons.map(objeto => objeto.weight / 10)
    return pesos
}

const pegarStatusPokemon = async pokemons =>{
    const todosStatus = pokemons.map(objeto => objeto.stats)
    return todosStatus
}

let offSet = 0

const filtroInfoPokemons = async url => {
    try {
        const response = await fetch(url)
        if(!response.ok){
            throw Error('Não foi possível obter dados da url')
        }
        const {results: apiPokemonResultados} = await response.json()
        const promises = apiPokemonResultados.map(results => fetch(results.url))
        const responses = await Promise.allSettled(promises)
        const fulfilled = responses.filter(responses => responses.status === 'fulfilled')
        const pokePromises = fulfilled.map(urls => urls.value.json())
        const pokemons = await Promise.all(pokePromises)
        const arrPokemons = {id: await pegarIdPokemon(pokemons), 
            nome: await pegarNomePokemon(pokemons), 
            tipo: await pegarTipoPokemon(pokemons), 
            altura: await pegarAlturaPokemon(pokemons), 
            peso: await pegarPesoPokemon(pokemons),
            status: await pegarStatusPokemon(pokemons)}

        offSet += 20
        return arrPokemons
    } catch (error) {
        console.log('algo deu erado', error)
    }
}

const calculoStatus = valor =>{
    return (100 * valor) / 161
}

const renderFrente = (ids, nomes, alturas, pesos, tipo) =>{
    // console.log(ids, nomes, alturas, pesos, tipo)
    const frente = document.createElement('div')
    frente.classList.add('frente')
    const top = document.createElement('div')
    top.classList.add('top')
    const id = document.createElement('p')
    id.textContent = ids < 10 ? "#000" + ids : ids < 100 ? "#00" + ids : ids < 1000 ? "#0" + ids : "#" + ids
    const img = document.createElement('img')
    img.setAttribute('alt', nomes)
    img.src = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/'+ ids +'.png'
    const bot = document.createElement('div')
    bot.classList.add('bot')
    const nome = document.createElement('p')
    nome.textContent = nomes[0].toUpperCase() + nomes.slice(1)
    const infoPokemon = document.createElement('div')
    infoPokemon.classList.add('infoPokemon')
    const tipo1 = document.createElement('p')
    tipo1.textContent = tipo[0]
    tipo1.style.backgroundColor = 'var(--'+ tipo[0] +')'
    tipo1.classList.add('tipo')
    const altura = document.createElement('p')
    altura.textContent = "Altura: " + alturas +' m'
    const peso = document.createElement('p')
    peso.textContent = "Peso: "+ pesos +' kg'

    frente.append(top, bot)
    top.append(id, img)
    bot.append(nome, infoPokemon)
    infoPokemon.appendChild(tipo1)
    if (tipo.length == 2){
        const tipo2 = document.createElement('p')
        tipo2.textContent = tipo[1]
        tipo2.classList.add('tipo')
        tipo2.style.backgroundColor = 'var(--'+ tipo[1] +')'
        infoPokemon.append(tipo2)
    }else{
        tipo1.style.gridColumnStart = 1
        tipo1.style.gridColumnEnd = 3
    }
    infoPokemon.append(altura, peso)
    return frente
}

const renderVerso = (ids, nomes, status) =>{
    const verso = document.createElement('div')
    verso.classList.add('verso')
    const top = document.createElement('div')
    top.classList.add('top')
    const id = document.createElement('p')
    id.textContent = ids < 10 ? "#000" + ids : ids < 100 ? "#00" + ids : ids < 1000 ? "#0" + ids : "#" + ids
    const img = document.createElement('img')
    img.setAttribute('alt', nomes)
    img.src = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/'+ ids +'.png'
    const bot2 = document.createElement('div')
    bot2.classList.add('bot')
    const textoStatus = document.createElement('p')
    textoStatus.textContent = nomes[0].toUpperCase() + nomes.slice(1) + " | STATUS"
    const stats = document.createElement('div')
    stats.classList.add('status')
    const vida = document.createElement('p')
    vida.textContent = "VID "+ status[0]['base_stat']
    const atq = document.createElement('p')
    atq.textContent = "ATQ "+ status[1]['base_stat']
    const def = document.createElement('p')
    def.textContent = "DEF "+ status[2]['base_stat']
    const spa = document.createElement('p')
    spa.textContent = "SPA "+ status[3]['base_stat']
    const spd = document.createElement('p')
    spd.textContent = "SPD "+ status[4]['base_stat']
    const vel = document.createElement('p')
    vel.textContent = "VEL "+ status[5]['base_stat']
    const div1 = document.createElement('div')
    const div2 = document.createElement('div')
    const div3 = document.createElement('div')
    const div4 = document.createElement('div')
    const div5 = document.createElement('div')
    const div6 = document.createElement('div')
    div1.classList.add('statusBar')
    div1.style.width =  ''+ calculoStatus(status[0]['base_stat']) +'%'
    div2.classList.add('statusBar')
    div2.style.width =  ''+ calculoStatus(status[1]['base_stat']) +'%'
    div3.classList.add('statusBar')
    div3.style.width =  ''+ calculoStatus(status[2]['base_stat']) +'%'
    div4.classList.add('statusBar')
    div4.style.width =  ''+ calculoStatus(status[3]['base_stat']) +'%'
    div5.classList.add('statusBar')
    div5.style.width =  ''+ calculoStatus(status[4]['base_stat']) +'%'
    div6.classList.add('statusBar')
    div6.style.width =  ''+ calculoStatus(status[5]['base_stat']) +'%'
    
    top.append(id, img)
    stats.append(vida, div1, atq, div2, def, div3, spa, div4, spd, div5, vel, div6)
    bot2.append(textoStatus, stats)
    verso.append(top, bot2)
    return verso
}

const renderPokemon = (pokemons, contador) => {
    const container = document.querySelector(".contPkm")
    const fragmento = document.createDocumentFragment()
    for(i = 0; i < contador; i++){
        const card = document.createElement('div')
        card.setAttribute('onClick', "flip(this)")
        card.classList.add('card')
        if(contador <= 1){
            frente = renderFrente(pokemons.id, pokemons.nome, pokemons.altura, pokemons.peso, pokemons.tipo)
            verso = renderVerso(pokemons.id, pokemons.nome, pokemons.status)
        }else{
            frente = renderFrente(pokemons.id[i], pokemons.nome[i], pokemons.altura[i], pokemons.peso[i], pokemons.tipo[i])
            verso = renderVerso(pokemons.id[i], pokemons.nome[i], pokemons.status[i])
        }
        
        card.append(frente, verso)
        fragmento.append(card)
    }
    container.append(fragmento)
}

const observarUltimo = observador =>{
    const ultimoPokemon = document.querySelector('.contPkm').lastChild
    observador.observe(ultimoPokemon)
}

const carregarProximoPokemon = () =>{
    const observador = new IntersectionObserver( async ([ultimo], observer) =>{
        if(!ultimo.isIntersecting){
            return
        }
        
        observer.unobserve(ultimo.target)
        if(offSet<39){
            const pokemons = await filtroInfoPokemons('https://pokeapi.co/api/v2/pokemon?limit=20&offset='+ offSet +'')
            renderPokemon(pokemons, 20)
            observarUltimo(observador)
        }
    })
    observarUltimo(observador)
}

const metodoCriadorPokemon = async () => {
    const pokemons = await filtroInfoPokemons('https://pokeapi.co/api/v2/pokemon?limit=20&offset=0')
    renderPokemon(pokemons, 20)
    carregarProximoPokemon()
}

metodoCriadorPokemon()

const tipos = async () =>{
    const tipos = document.querySelectorAll('.tipos button')
    tipos.forEach( element => {
        element.addEventListener('mouseover', () =>{
            element.style.boxShadow = '0 0 10px 1.5px var(--'+element.value+')'
        })
        element.addEventListener('mouseout', () =>{
            element.style.boxShadow = 'none'
        })
        element.addEventListener('click', async () =>{
            try {
                const response = await fetch('https://pokeapi.co/api/v2/type/' + element.value + '')
                const apiPokemonResultados = await response.json()
                const promises = apiPokemonResultados.pokemon.map(results => fetch(results.pokemon.url))
                const responses = await Promise.allSettled(promises)
                const fulfilled = responses.filter(responses => responses.status === 'fulfilled')
                const pokePromises = fulfilled.map(urls => urls.value.json())
                const pokemons = await Promise.all(pokePromises)
                const arrPokemons = {id: await pegarIdPokemon(pokemons), 
                    nome: await pegarNomePokemon(pokemons), 
                    tipo: await pegarTipoPokemon(pokemons), 
                    altura: await pegarAlturaPokemon(pokemons), 
                    peso: await pegarPesoPokemon(pokemons),
                    status: await pegarStatusPokemon(pokemons)}
                
                const container = document.querySelector('.contPkm')
                const cards = document.querySelectorAll('.card')
                cards.forEach(element => {
                    container.removeChild(element)
                })
                renderPokemon(arrPokemons ,arrPokemons.nome.length)
                const botaoMais = document.querySelector('.maisPkm')
                botaoMais.style.display = 'none'
            } catch (error) {
                console.log('Impossivel realizar a ação', error);
            }
        })
        element.style.backgroundColor ='var(--'+element.value+')'
    })
}

tipos()

function flip(event){
    event.classList.toggle('flip')
}

function subir() {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    })
}

async function maisPokemon() {
    const pokemons = await filtroInfoPokemons('https://pokeapi.co/api/v2/pokemon?limit=20&offset='+ offSet +'')
    renderPokemon(pokemons, 20)
}

window.addEventListener('scroll', () =>{
    const botao = document.querySelector('.btSubir')
    if (window.scrollY > 200) {
        botao.style.transform = 'scale(1)'
    }else{
        botao.style.transform = 'scale(0)'
    }
})

const buscarTexto = document.querySelector('.texto')

const buscaPokemon = async () =>{
    const botaoMais = document.querySelector('.maisPkm')
    if (buscarTexto.value == '') {
        const container = document.querySelector('.contPkm')
            const cards = document.querySelectorAll('.card')
            cards.forEach(element => {
                container.removeChild(element)
        })
        offSet= 20
        metodoCriadorPokemon()
        botaoMais.style.display = 'block'

    }else{
        try{
            const response = await fetch('https://pokeapi.co/api/v2/pokemon/'+ buscarTexto.value+'')
            const apiPokemonResultados = await response.json()
            const arrPokemons = {id: apiPokemonResultados.id, nome: apiPokemonResultados.name, tipo: apiPokemonResultados.types.map(tipos => tipos.type.name),
            altura: apiPokemonResultados.height, peso: apiPokemonResultados.weight, status: apiPokemonResultados.stats}
            const container = document.querySelector('.contPkm')
            const cards = document.querySelectorAll('.card')
            cards.forEach(element => {
                container.removeChild(element)
            })
            botaoMais.style.display = 'none'
            renderPokemon(arrPokemons, 1)
        }catch (error) {
            console.log('Impossivel realizar a ação', error);
        }
    }
}

buscarTexto.addEventListener('keydown', (event) => {
    if (event.code === 'Enter'){
        buscaPokemon()
    }
})