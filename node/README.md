# js-studies

## Node

### ✨Node: Visão Geral

**Node.js** é um interpretador de código JavaScript de modo assíncrono e orientado a eventos, focado em migrar a programação do Javascript do lado do cliente para os servidores.

No modelo Node.js, apenas uma thread é responsável por tratar as requisições. Essa thread é chamada de Event Loop, e leva esse nome pois cada requisição é tratada como um evento. O Event Loop fica em execução esperando novos eventos para tratar, e para cada requisição, um novo evento é criado.


### ✨Sistema de Módulos

Dentro do **Node.js** um arquivo representa um módulo.

```javascript
//arquivo moduloA.js

// this === module.exports - cada módulo novo é um objeto vazio padrão
this.ola = "Olá"
exports.bemVindo = "Bem vindo!"
module.exports.ateLogo = "Até Logo"
```

```javascript
//arquivo moduloB.js

module.exports = {
    bomDia: "Bom dia",
    boaNoite(){
        return "Boa noite"
    }
}
```

```javascript
//arquivo moduloCliente.js
const moduloA = require('./moduloA')
const moduloB = require('./moduloB')

console.log(moduloA.ola) // Olá
console.log(moduloA.bemVindo) // Bem vindo!
console.log(moduloA.ateLogo) // Até Logo
console.log(moduloA) // { ola: 'Olá', bemVindo: 'Bem vindo!', ateLogo: 'Até Logo'}

console.log(moduloB.bomDia) // Bom dia
console.log(moduloB.boaNoite()) // Boa noite
console.log(moduloB) // { bomDia: 'Bom dia', boaNoite: [Function boaNoite] }

```

### ✨Usando Módulos de Terceiros

```javascript
//no terminal
npm instal // + nome do pacote
npm i axios
```

```javascript
//no arquivo

const url = 'http://files.cod3r.com.br/curso-js/funcionarios.json'
const axios = require('axios')

const getMulheres = f => f.genero === 'F'
const getFromChina = f => f.pais ==='China'
const menorSalario = (f, f_atual) => {
    return f.salario < f_atual.salario ? f : f_atual
}

axios.get(url).then(response => {
    const funcionarios = response.data

    //mulher chinesa com menor salario
    const funcionaria = funcionarios
                        .filter(getMulheres)
                        .filter(getFromChina)
                        .reduce(menorSalario)
    console.log(funcionaria)
})
```

### ✨Arquivo package.json

O arquivo **package.json** é uma espécie de manifesto para o seu projeto. É um repositório central de configuração para ferramentas e descrição do projeto.

Link - [The package.json guide
](https://flaviocopes.com/package-json/)

Link - [Tudo que você queria saber sobre o package-lock.json mas estava com vergonha de perguntar
](https://medium.com/trainingcenter/tudo-que-voc%C3%AA-queria-saber-sobre-o-package-lock-json-mas-estava-com-vergonha-de-perguntar-e70589f2855f)

### ✨Entendendo o 'this'
Dentro de uma função a palavra chava **this** aponta para ***global*** e fora de uma função, dentro de um módulo ele aponta para a ***modulo.exports***.

### ✨Passando Parâmetros entre Módulos

```javascript
// arquivo passandoParametros.js

module.exports = function(...nomes){
    return nomes.map(nome => `Boa semana ${nome}`);
}
```

```javascript
const saudacoes =  require('./passandoParametros')('Rafaela', 'Julia', 'Bruna')

console.log(saudacoes)
// Boa semana Rafaela
// Boa semana Julia
// Boa semana Bruna
```

### ✨Lendo Arquivos

```javascript
const fs = require('fs')// modulo nativo de file system

const caminho = __dirname + '/arquivoGerado.json'

//sincrono
const conteudo = fs.readFileSync(caminho, 'utf-8')
console.log(conteudo) // { nome: 'Celular', preco: 1249.99, desconto: 0.15 }

//assincrono
fs.readFile(caminho, 'utf-8', (err, conteudo) => {
    const produto = JSON.parse(conteudo)
    console.log(`${produto.nome}`) // Celular
})

const produto = require('./arquivoGerado.json')
console.log(produto) // { nome: 'Celular', preco: 1249.99, desconto: 0.15 }

fs.readdir(__dirname, (err, arquivos) => {
    console.log('Conteudo da pasta...') // Conteudo da pasta...
    console.log(arquivos)
    /*[ 'README.md',
        'arquivoGerado.json',
        'exercicios.js',
        'node_modules',
        'package-lock.json',
        'package.json' ]*/
})
```

### ✨Escrevendo Arquivos

```javascript
const fs = require('fs')// modulo nativo de file system

const produto = {
    nome: 'Celular',
    preco: 1249.99,
    desconto: 0.15
}

fs.writeFile(__dirname + '/arquivoGerado.json', JSON.stringify(produto), err => {
    console.log(err || 'Arquivo salvo!')
})
```

### ✨Frameworks Web


### ✨Padrão Middleware 

```javascript
```

### ✨Instalando o Postman

```javascript
```

### ✨Projeto: API com Express

```javascript
```

### ✨Tarefas Agendadas com Temporizador

```javascript
```

### ✨Process: Entrada e Saída Padrão
Entrada padrão é o teclado e a saída padrão é a tela

```javascript
//arquivo entradaSaida.js

const anonimo = process.argv.indexOf('-a') !== -1

if(anonimo){
    process.stdout.write('Fala Anônimo!\n')
    process.exit()
}else{
    process.stdout.write('Informe o seu nome: ') // 
    process.stdin.on('data', data => {
        const nome = data.toString().replace('\n', '')

        process.stdout.write(`Fala ${nome}!!\n`)
        process.exit()
    })
}
```

---

