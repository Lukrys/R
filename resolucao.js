function lerArquivo(){
    obj = {id, name, quantity, price, category} = require('./broken-database.json')
}//armazena em obj e cada atributo em seu correspondente

function corrigirNome(){
    lerArquivo()
    for (var i = 0; i < obj.length; i++){
        for(var j = 0; j < obj[i].name.length;j++){
                obj[i].name = obj[i].name.replace('æ','a')
                obj[i].name = obj[i].name.replace('¢','c')
                obj[i].name = obj[i].name.replace('ø','o')
                obj[i].name = obj[i].name.replace('ß', 'b')
        }
    }
}//percorre obj e cada string, substituindo os erros

function corrigirPreco(){
    lerArquivo()
    for (var i = 0; i < obj.length; i++){
        obj[i].price = parseFloat(obj[i].price)
    }
}//percorre obj e converte para ponto flutuante

function corrigirQuantidade(){
    lerArquivo()
    for (var i = 0; i < obj.length; i++){
        if(obj[i].quantity == undefined){
            obj[i].quantity = 0;
        }
    }
}//percorre obj e verifica se não há valor definido em quantity

function exportar(){
    lerArquivo()
    corrigirNome()
    corrigirPreco()
    corrigirQuantidade()
    var fs = require('fs')
    fs.writeFileSync('./saida.json', JSON.stringify(obj))
}//escreve o obj com todas as modificações em saida.json

function lerSaida(){
    obj2 = {id, name, quantity, price, category} = require('./saida.json')
}//armazena em obj2 e cada atributo em seu correspondente

function listaOrdenada(){
    lerSaida()
    for (var i = 0; i < obj2.length; i++){
        var minimo = i;

        for (j = i + 1 ; j < obj2.length; j++){
            if ( obj2[j].category < obj2[minimo].category ){
                minimo = j;
            }
        }//encontra o menor
            aux = obj2[minimo];
            obj2[minimo] = obj2[i];
            obj2[i] = aux;
    }//troca as posições

    for (var i = 0; i < obj2.length ;i++){
        var minimo = i;
        for (j = i + 1 ; j < obj2.length; j++){
            if ( obj2[j].id < obj2[minimo].id && !(obj2[j].category > obj2[minimo].category)){
                minimo = j;
            }
        }//encontra o menor e verifica se não irá sobrepor a primeira ordenação
            aux = obj2[minimo];
            obj2[minimo] = obj2[i];
            obj2[i] = aux;
    }//troca as posições
           
        for(var i = 0; i < obj2.length; i++){
            console.log(obj2[i].name)
        }
       
}

function totalCategoria(){
    lerSaida()
    var panelas = 0
    var eletrodomesticos = 0
    var eletronicos = 0
    var acessorios = 0
    
    for(var i = 0; i < obj2.length; i++){
        var categoria = obj2[i].category

        switch(categoria){
            case("Panelas"):
            panelas += obj2[i].quantity
            break;

            case("Eletrodomésticos"):
            eletrodomesticos += obj2[i].quantity
            break;

            case("Eletrônicos"):
            eletronicos += obj2[i].quantity
            break;

            case("Acessórios"):
            acessorios += obj2[i].quantity
        }//testa em qual categoria adicionar
    }
        console.log(`Panelas = ${panelas}`)
        console.log(`Eletrodomésticos = ${eletrodomesticos}`)
        console.log(`Eletrônicos = ${eletronicos}`)
        console.log(`Acessorios = ${acessorios}`)
}

//exportar()
//listaOrdenada()
//totalCategoria()