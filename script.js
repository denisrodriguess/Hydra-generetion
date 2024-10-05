// script.js

const racas = ['Anão', 'Dragonborn', 'Elfo', 'Gnomo', 'Halfling', 'Humano', 'Meio-elfo', 'Meio-orc', 'Tiefling'];
const classes = ['Bárbaro', 'Bardo', 'Bruxo', 'Clérigo', 'Druida', 'Feiticeiro', 'Guerreiro', 'Ladino', 'Mago', 'Monge', 'Paladino', 'Ranger'];
const atributos = ['Força', 'Destreza', 'Constituição', 'Inteligência', 'Sabedoria', 'Carisma'];
const modificadoresRaca = {
    'Anão': {'Constituição': 2},
    'Dragonborn': {'Força': 2, 'Carisma': 1},
    'Elfo': {'Destreza': 2},
    'Gnomo': {'Inteligência': 2},
    'Halfling': {'Destreza': 2},
    'Humano': {'Força': 1, 'Destreza': 1, 'Constituição': 1, 'Inteligência': 1, 'Sabedoria': 1, 'Carisma': 1},
    'Meio-elfo': {'Carisma': 2},
    'Meio-orc': {'Força': 2, 'Constituição': 1},
    'Tiefling': {'Inteligência': 1, 'Carisma': 2}
};

function gerarAtributo() {
    let dados = [];
    for (let i = 0; i < 4; i++) {
        dados.push(Math.floor(Math.random() * 6) + 1);
    }
    dados.sort((a, b) => a - b);
    dados.shift(); // Remove o menor
    return dados.reduce((a, b) => a + b, 0);
}

function combinarAtributos(atributos, valores, raca) {
    let combinados = [];
    atributos.forEach((atributo, index) => {
        let valor = valores[index];
        let modificador = modificadoresRaca[raca] && modificadoresRaca[raca][atributo] ? modificadoresRaca[raca][atributo] : 0;
        let valorTotal = valor + modificador;
        if (modificador > 0) {
            combinados.push(`${atributo}: ${valorTotal} (+${modificador})`);
        } else if (modificador < 0) {
            combinados.push(`${atributo}: ${valorTotal} (${modificador})`);
        } else {
            combinados.push(`${atributo}: ${valorTotal}`);
        }
    });
    return combinados;
}

function gerarNPC() {
    const nome = document.getElementById('nome').value || "NPC";
    const raca = racas[Math.floor(Math.random() * racas.length)];
    const classe = classes[Math.floor(Math.random() * classes.length)];
    const valores = atributos.map(() => gerarAtributo());
    const atributosCombinados = combinarAtributos(atributos, valores, raca);
    
    // Atualizar o DOM com as informações do NPC
    document.getElementById('npc-nome').innerText = nome;
    document.getElementById('npc-raca').innerText = raca;
    document.getElementById('npc-classe').innerText = classe;
    
    const atributosLista = document.getElementById('npc-atributos');
    atributosLista.innerHTML = '';
    atributosCombinados.forEach(atributo => {
        const li = document.createElement('li');
        li.innerText = atributo;
        atributosLista.appendChild(li);
    });
    
    document.getElementById('npc-info').style.display = 'block';
}

function gerarNPCHandler() {
    gerarNPC();
}
