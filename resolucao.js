function lerArquivo(){
    obj = {id, name, quantity, price, category} = require('./broken-database.json')
}

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
}

function corrigirPreco(){
    lerArquivo()
    for (var i = 0; i < obj.length; i++){
        obj[i].price = parseFloat(obj[i].price)
    }
}

function corrigirQuantidade(){
    lerArquivo()
    for (var i = 0; i < obj.length; i++){
        if(obj[i].quantity == undefined){
            obj[i].quantity = 0;
        }
    }
}

function exportar(){
    lerArquivo()
    corrigirNome()
    corrigirPreco()
    corrigirQuantidade()
    var fs = require('fs')
    fs.writeFileSync('./saida.json', JSON.stringify(obj))
}

function lerSaida(){
    obj2 = {id, name, quantity, price, category} = require('./saida.json')
}

function listaOrdenada(){
    lerSaida()
    for (var i = 0; i < obj2.length; i++){
        var minimo = i;

        for (j = i + 1 ; j < obj2.length; j++){
            if ( obj2[j].category < obj2[minimo].category ){
                minimo = j;
            }
        }
            aux = obj2[minimo];
            obj2[minimo] = obj2[i];
            obj2[i] = aux;
        }

    for (var i = 0; i < obj2.length ;i++){
        var minimo = i;
        for (j = i + 1 ; j < obj2.length; j++){
            if ( obj2[j].id < obj2[minimo].id && !(obj2[j].category > obj2[minimo].category)){
                minimo = j;
            }
        }
            aux = obj2[minimo];
            obj2[minimo] = obj2[i];
            obj2[i] = aux;
            }
           
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
        }
    }
        console.log(`Panelas = ${panelas}`)
        console.log(`Eletrodomésticos = ${eletrodomesticos}`)
        console.log(`Eletrônicos = ${eletronicos}`)
        console.log(`Acessorios = ${acessorios}`)
}

//exportar()
//listaOrdenada()
//totalCategoria()