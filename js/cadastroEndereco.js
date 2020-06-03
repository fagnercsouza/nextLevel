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
    
    fetch(url)
    .then(res => res.json())
    .then( cidades => { 
        // if(ufValue != 0 ){
        //     cidadeSelect.disabled = false;
        // }else{
        //     cidadeSelect.disabled = true;
        //     alert("Selecione um estado")    
        // }
        for( const cidade of cidades){
            cidadeSelect.innerHTML += `<option value="${cidade.id}">${cidade.nome}</option>`
        };
        cidadeSelect.disabled = false;
    });
    console.log(ufValue+" - "+url);
    
}
document
    .querySelector("select[name=uf]")
    .addEventListener("change", populaCidade)



