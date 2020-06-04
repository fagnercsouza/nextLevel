// const estadoList = "https://servicodados.ibge.gov.br/api/v1/localidades/estados"
// const cidadeList = "https://servicodados.ibge.gov.br/api/v1/localidades/estados/{UF}/municipios"

function populaUfs(){
    const ufSelect = document.querySelector("select[name=uf]")

    fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
    .then( res => res.json()) /* mesma coisa que= (res) => {return res.json()})*/
    .then( estados => {
        for( const estado of estados){
            ufSelect.innerHTML += `<option value="${estado.id}">${estado.nome}</option>`
        }
    })
}
populaUfs();



function populaCidade(event){
    const cidadeSelect = document.querySelector("select[name=cidade]")
    const estadoInput = document.querySelector("input[name=estado]")
    
    const ufValue = event.target.value

    const indexEstado = event.target.selectedIndex
    estadoInput.value = event.target.options[indexEstado].text

    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`
    
    cidadeSelect.innerHTML = "<option>Selecione a Cidade</option>"
    cidadeSelect.disabled = true;

    fetch(url)
    .then(res => res.json())
    .then( cidades => { 
        
        for( const cidade of cidades){
            cidadeSelect.innerHTML += `<option value="${cidade.nome}">${cidade.nome}</option>`
        };
        cidadeSelect.disabled = false;
    });
    console.log(ufValue+" - "+url);
    
}
document
    .querySelector("select[name=uf]")
    .addEventListener("change", populaCidade)


// Itens de coleta

// pegar todos os li's


const itens = document.querySelectorAll(".items-grid li")

for (const item of itens){
    item.addEventListener("click", itemSelecionado);
}
const colecaoItens = document.querySelector("input[name=items]")

let itemSelecionados = [];

function itemSelecionado(event){
    const itemLi = event.target;
    
    //adicionar ou remover uma classe com javascript
    itemLi.classList.toggle("selected");

    const itemId = itemLi.dataset.id;

    //verificar se exitem itens selecionado, se sim pegar os itens selecionado
    const allSelecte = itemSelecionados.findIndex( item =>{
        const itemFound = item == itemId;
        return itemFound;
    })

    //se já estiver selecionado, tirar da seleção
    if(allSelecte >= 0 ){
        const filteredItems = itemSelecionados.filter( item => {
            const itemDirente = item != itemId;
            return itemDirente;
        })
        itemSelecionados = filteredItems;
    } else {
        //se não estiver, adicionar a seleção
        itemSelecionados.push(itemId);
    }

    //atualizar o campo escondido com os itens selecionados
    colecaoItens.value = itemSelecionados;
}