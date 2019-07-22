<h1 align="center">
<br>
  <img src="book.svg" alt="Front-End Checklist" width="170">
  <br>
    <br>
        Guia de Javascript
  <br>
</h1>

<!-- <h4 align="center">Sobre o Guia</h4>

<p align="center">
    <a href="https://creativecommons.org/publicdomain/zero/1.0/">
        <img src="https://img.shields.io/badge/license-CC0-green.svg?style=flat-square" alt="CC0">
    </a>
</p>


Obs -->

## Sumário

1. **[Fundamentos](#fundamentos)**
2. **[Funções](#funções)**
3. **[Objetos](#objetos)**
4. **[Array](#array)**
5. **[ES6](#es6)**

---

## Fundamentos

### 👾Notação Ponto

Você pode criar atributos e funções públicas usando **this.** o nome do atributo/função.

```javascript
function Obj(nome){
    this.nome = nome
}

const obj2 = new Obj('Cadeira')
const obj3 = new Obj('Mesa')

console.log(obj2.nome) // 'Cadeira'
console.log(obj3.nome) // 'Mesa'
```

### 👾Operador Destructuring
A sintaxe de atribuição via desestruturação (destructuring assignment) é uma expressão JavaScript que possibilita extrair dados de arrays ou objetos em variáveis distintas.


```javascript
company = {
  name: ‘ACME Corp’,
  address: ‘Nowhere st’,
  products: {
    shirts: {
      colors: [‘red’, ‘green’, ‘blue’]
    },
    socks: {
      colors: [‘cyan’, ‘magenta’, ‘yellow’]
    }
  }
};

const { name, products: { shirts: { colors } } } = company

console.log(name); // 'ACME Corp'
console.log(colors); // [‘red’, ‘green’, ‘blue’]
```

### 👾Tratatamento de erro (try/catch/throw)
```javascript
function tratarErroLancar(err){
    // throw new Error("...?");
    // throw 10
    // throw true
    // throw "Mensagem de Erro"
    throw {
        nome: err.name,
        msg: err.message,
        date: new Date,
    }
}

function callAPI(args){
    try{
        console.log(args.url.toLowerCase())
    }catch(e){
        if (false) {
            // instruções para tratar exceções caso vdd
            console.log(false)
        } else {
            // não pode tratar esta exceção então relança
            tratarErroLancar(e)
        }
    } finally{
        console.log("Rodou com erro ou funcionando!")
    }
}

let obj = { link: "http://exemplo.com" }
callAPI(obj)
```

---
---

## Funções

### 💫Parâmetro Padrão
Os parâmetros predefinidos de uma função permitem que parâmetros regulares sejam inicializados com com valores iniciais caso undefined ou nenhum valor seja passado.

```javascript
let soma = (a=1, b=1,c=1) => a+b+c;

console.log(soma()) // 3
console.log(soma(3)) // 5
console.log(soma(1,2,3)) // 6
console.log(soma(0,0,0)) // 0
```

### 💫This
A palavra-chave **this** se refere ao objeto ao qual pertence e tem valores diferentes dependendo de onde é usado:

* Em um método, **this** se refere ao objeto proprietário.
* Sozinho, **this** se refere ao objeto global.
* Em uma função, **this** se refere ao objeto global.
* Em uma função, no modo estrito, **this** é *undefined*.
* Em um evento, **this** se refere ao elemento que recebeu o evento.
* Métodos como bind(), call() e apply() podem referir **this** a qualquer objeto.


```javascript
function Pessoa(){
    this.idade = 0;
    
    setInterval(() => {
        this.idade++
        console.log(this.idade)
    }.bind(this),1000)
}

new Pessoa // 1, 2, 3...

function Pessoa(){
    this.idade = 0;
    
    setInterval(() => {
        this.idade++
        console.log(this.idade)
    },1000)
}

new Pessoa // NaN, NaN, NaN...
```

### 💫Arrow functions
Uma expressão arrow function possui uma sintaxe mais curta quando comparada a uma expressão de função e tem um **this** associado ao contexto no qual a função foi escrita.

*É melhor aplicada para funções que não sejam métodos, e elas **não** podem ser usadas como construtoras (constructors).*

```javascript
let dobro = function(a){
    return 2 * a
}

dobro = (a) => {
    return 2 * a
}

dobro = a => 2 * a
```

### 💫Funções Construtoras
Funções contrutoras são moldes de objetos que você pode criar a partir dessa função. 

```javascript
function Carro(veloMax = 200, delta = 5){
    //atributo privado
    let veloAtual = 0

    //método público
    this.acelerar = function(){
        if(veloAtual + delta <= veloMax){
            veloAtual += delta
        }else{
            veloAtual = veloMax
        }
    }

    //método público
    this.getVeloAtual =  function(){
        return veloAtual
    }
}

const uno =  new Carro // pega os valores padrões
uno.acelerar()
console.log(uno.getVeloAtual())

const ferrari =  new Carro(350, 20)
ferrari.acelerar()
console.log(ferrari.getVeloAtual())
```

### 💫Função Factory
Uma função de factory é qualquer função que não é uma classe ou construtor que retorna um objeto (presumivelmente novo). Em JavaScript, qualquer função pode retornar um objeto. Quando isso acontece sem a palavra-chave **new**, é uma função de factory.

```javascript
function criarProduto(nome, preco){
    return {
        nome,
        preco,
        desconto:0.2
    }
}

console.log(criarProduto("Notebook", 7000))
```

### 💫IIFE
Immediately Invoked Function Expression - Expressão de Função Imediatamente Invocada é uma maneira de proteger o escopo de sua função e as variáveis dentro dela. Escopo significa de onde ele pode ser acessado.

```javascript
(()=>{
    const texto = "Será executado na hora!";
    console.log(texto) // "Será executado na hora!"
    console.log("Foge no escopo mais abrangente")
})()

console.log(texto) // texto is not defined
```

### 💫Call & Apply

```javascript
function getPreco(imposto = 0, moeda = 'R$'){
    return `${moeda} ${this.preco * (1 - this.desconto) * (1 + imposto)}`
}

const produto = {
    nome: "Notebook",
    preco: 7000,
    desconto: 0.15,
    getPreco
}

const produto2 = {
    nome: "Carro",
    preco: 47000,
    desconto: 0.2,
}

preco = 20
desconto = 0.1

console.log(getPreco()) // "R$ 18"
console.log(produto.getPreco()) // "R$ 5950"
console.log(getPreco.call(produto)) // "R$ 5950"
console.log(getPreco.apply(produto)) // "R$ 5950"

console.log(getPreco.call(produto2, 0.17, '$')) // "$ 43992"
console.log(getPreco.apply(produto2, [0.17, '$'],)) // "$ 43992"
```
---
---

## Objetos

<!-- ### 🔮Introdução à OO

### 🔮Objeto

### 🔮Estratégias de Criação de Objetos -->

### 🔮Objetos Constantes

```javascript
const produto = {
    nome: "Notebook",
    preco: 7000,
    desconto: 0.15,
}

console.log(produto) // {nome: "Notebook", preco: 7000, desconto: 0.15}
produto.nome = "Celular"
console.log(produto) // {nome: "Celular", preco: 7000, desconto: 0.15}
Object.freeze(produto)
produto.nome = "Tablet"
console.log(produto) // {nome: "Celular", preco: 7000, desconto: 0.15}

```

### 🔮Notação Literal
novas possibiliades de notação literal com ES6

```javascript
const a = 1
const b = 1
const c = 1

const obj1 = {a:a, b:b, c:c} //forma antiga
const obj2 = {a, b, c} //forma nova

console.log(obj1) // {a: 1, b: 1, c: 1}
console.log(obj2) // {a: 1, b: 1, c: 1}

const nomeAttr = "nota"
const valorAttr = 7.87

const obj3 = {}
obj[nomeAttr] = valorAttr // forma antiga
console.log(obj3) // {nota: 7.87}

const obj4 = {[nomeAttr]: valorAttr}
console.log(obj4) // {nota: 7.87}

const obj5 {
    funcao: function(){
        //...
    }
    funcao2(){
        //...
    }
}
console.log(obj5) // {funcao: ƒ, funcao2: ƒ}
```

### 🔮Getters/Setters

```javascript
let sequencia = {
    _valor: 1,
    get valor(){return this._valor++},
    set valor(valor){
        if(valor > this._valor){
            this._valor = valor
        }
    }
}

console.log(sequencia.valor, sequencia.valor) // 1 2
```

### 🔮Funções Importantes de Objeto

```javascript
let pessoa = {
    nome: "Maria",
    idade: 23,
    peso: 65
}

console.log(Object.keys(pessoa)) // ["nome", "idade", "peso"]
console.log(Object.values(pessoa)) // ["Maria", 23, 65]
console.log(Object.entries(pessoa)) // [Array(2), Array(2), Array(2)]
```
```javascript
Object.entries(pessoa).forEach(e => { //jeito antigo
    console.log(`${e[0]}: ${e[1]}:`) //nome: Maria / idade: 23 / peso: 65
})

Object.entries(pessoa).forEach(([chave, valor]) => { //jeito novo com operador destructuring
    console.log(`${chave}: ${valor}`) //nome: Maria / idade: 23 / peso: 65
})
```

```javascript
Object.defineProperty(pessoa, "dataNascimento",{
    enumerable: true,
    writable: false,
    value: "01/01/2019"
})

pessoa.dataNascimento = "01/01/2017"
console.log(pessoa.dataNascimento) // 01/01/2019
```

```javascript
let dest = { a: 1 }
let o1 = { b: 2 }
let o2 = { c: 3, a: 4 }
let obj = Object.assign(dest, o1, o2)

Object.freeze(obj)
obj.c = 1234
console.log(obj)
```

### 🔮Herança

```javascript
Object.setPrototypeOf(filho, pai);
```

```javascript
let pai = {nome: 'Pedro', corCabelo: 'preto'}
let filha = Object.create(pai)
filha.nome = 'Ana'
filha.corCabelo

let filha2 = Object.create(pai,{
    nome: { value: "Bia", writable: false, enumerable: true }
})

for (let key in filha2){
    filha2.hasOwnProperty(key) ? console.log(key) :  console.log(`Por herança: ${key}`)
}

```

### 🔮Evitando Modificações

```javascript
let produto = Object.preventExtensions({
    nome: "Qualquer", preco: 1.99, tag: "Promoção"
})

console.log('Extensivel', Object.isExtensible(produto)) // Extensivel false

produto.nome = "Borracha"
produto.descricao = "Borracha escolar branca"
delete produto.tag
console.log(produto) // {nome: "Borracha", preco: 1.99}
```

```javascript
let pessoa = {nome: "Juliana", idade: 35}
Object.seal(pessoa)
console.log(`Selado:`, Object.isSealed(pessoa)) // Selado: true

pessoa.sobrenome = "Silva"
delete pessoa.nome
pessoa.idade = 29
console.log(pessoa) // {nome: "Juliana", idade: 29}

//Object.freeze = salado + valores constantes
```

### 🔮JSON vs Objeto
**JSON** - JavaScript Object Notation, parace ser objeto mas na verdade é um *formato textual*. É o mais usado hoje no mercado pra interoperabilidade, isto é você ter formato textual genérico que não carrega consigo nada específico de um sistema ou tecnologia de forma a comunicar sistemas que são feitos em tecnologias completamente diferentes.

#### Principais Diferenças entre JSON e Objeto Literal JavaScript
**Chaves** – As chaves no JSON devem vir entre aspas duplas. No Objeto Literal, as chaves podem ser strings com aspas simples, duplas, sem aspas, variáveis ou Symbols.

**Valores** – O Objeto Literal JavaScript aceita qualquer tipo de dado presente na linguagem (como Date) e até funções, no JSON aspas simples não são permitidas.

O **JSON** só aceita os seguintes tipos de valor:

* string
* number
* boolean
* null
* array
* outro JSON

### 🔮Classe
As Classes são "funções especiais" que provêm uma maneira mais simples e clara de criar objetos e lidar com herança. Você pode criar objetos a partir de uma classe como se fosse um molde.

*Exemplo:*

*Uma classe chamada aluno aluno tem nome e nota. Isso significa que todo aluno dentro daquele sistema vai ter nome e nota, dois atributos. A classe definiu como e quais as características de um aluno e a partir dessa classe você consegue criar objetos. Então cada objeto criado vai ter os dois atributos nome e nota só que para cada objeto ele vai ter um valor independente uns dos outros.*

*Então um aluno vai ser o João com nota 8.3 ao outro. Outra aluna pode ser a Ana com nota 9.4. Outro aluno vai ser o Pedro com nota 7.3 então você tem todos os alunos e todos os objetos respeitando aquele arcabouço naquela estrutura que foi definida na classe. Só que os dados pertencem a cada um dos objetos.*



```javascript
class Lancamento{
    constructor(nome = "Generico", valor = 0){
        this.nome = nome
        this.valor = valor
    }
}

class CicloFinanceiro{
    constructor(mes, ano){
        this.mes = mes
        this.ano = ano
        this.lancamentos = []
    }

    addLacamentos(...lancamentos){
        lancamentos.forEach(l => this.lancamentos.push(l))
    }

    sumario(){
        let valorConsolidado = 0
        this.lancamentos.forEach(l => {
            valorConsolidado += l.valor
        })
        return valorConsolidado
    }
}

const salario = new Lancamento("Salário", 45000)
const conta = new Lancamento("Luz", -220)

const contas = new CicloFinanceiro(6, 2018)
contas.addLacamentos(salario, conta)
console.log(contas.sumario())
```

>Uma diferença importante entre declarações de funções das declarações de classes, é que  declararações de  funções são hoisted e declarações de classes não são. Primeiramente deve declarar sua classe para só então acessá-la, pois do contrário o código a seguir irá lançar uma exceção: ReferenceError:

O **construtor** é um método especial para criar e inicializar um objeto criado a partir de uma classe.


**Extends** é a forma de definir que uma determinada classe tem outra classe como protótipo ou que uma determinada função gerada a partir daquela classe terá como protótipo uma outra função que será gerada a partir da classe *avô*.

```javascript
class Avo{
    constructor(sobrenome){
        this.sobrenome = sobrenome
    }
}

class Pai extends Avo{
    constructor(sobrenome, profissao = "Professor"){
        super(sobrenome) // chamar a função construtora da superclasse, no caso Avo
        this.profissao = profissao 
    }
}

class Filho extends Pai{
    constructor(sobrenome){
        super("Silva") //  passando só um parametro ele assume como padrão a profissão Professor
    } 
}

const filho = new Filho
console.log(filho) // Filho {sobrenome: "Silva", profissao: "Professor"}
```

A palavra-chave **super** é usada para acessar o objeto pai de um objeto, em outros casos, é usada para acessar a classe pai de uma classe.

---
---

## Array


Em Js o Array é um objeto, um objeto especial com características próprias mas não existe o nativo. Ele trabalha de uma forma indexada a partir de um valor inteiro começando com 0. É uma estrutura dinâmica que cresce dinamicamente e diminui dinamicamente diferente de outras linguagens na qual tem uma estrutura estática e tamanho fixo. Os tipos de dados que você pode colocar no Array são os mais variáveis possíveis ou seja, uma estrutura heterogênea em que você pode colocar um inteiro, um boolean, um objeto ou outro Array, não existe restrição. Dito isso a boa prática diz que você deve trabalhar com dados homogêneos dentro de um array.

### 🌵Array: Métodos

```javascript
const pilotos = ['Vettel', 'Alonso', 'Raikkonen', 'Massa']
pilotos.pop() // remove o ultimo item
console.log(pilotos) // [ 'Vettel', 'Alonso', 'Raikkonen' ]


pilotos.push('Sena') // inclui o item por ultimo
console.log(pilotos) // [ 'Vettel', 'Alonso', 'Raikkonen', 'Sena' ]


pilotos.shift() // remove o primeiro item
console.log(pilotos) // [ 'Alonso', 'Raikkonen', 'Sena' ]

pilotos.unshift('Hamilton') // inclui o item primeiro
console.log(pilotos) // [ 'Hamilton', 'Alonso', 'Raikkonen', 'Sena' ]

//splice pode add e remover elemntos
pilotos.splice(2, 0, 'Bottas', 'Massa') // add
console.log(pilotos) // [ 'Hamilton', 'Alonso', 'Bottas', 'Massa', 'Raikkonen', 'Sena' ]

pilotos.splice(3, 1) // remove
console.log(pilotos) //[ 'Hamilton', 'Alonso', 'Bottas', 'Raikkonen', 'Sena' ]

const algunsPilotos1 = pilotos.slice(2) // novo array
console.log(algunsPilotos1) // [ 'Bottas', 'Raikkonen', 'Sena' ]

const algunsPilotos2 = pilotos.slice(1,4) // novo array
console.log(algunsPilotos2) // [ 'Alonso', 'Bottas', 'Raikkonen' ]
```

### 🌵Foreach

```javascript
const aprovados = ['Agatha', 'Aldo', 'Daniel', 'Raquel']
aprovados.forEach(function(nome, indice, array){
    console.log(`${indice + 1}) ${nome}`)
    console.log(array)
})

aprovados.forEach(nome => console.log(nome))


const exibirAprovados = aprovado => console.log(aprovado)
aprovados.forEach(exibirAprovados)
```

### 🌵Map
O método **map()** mapeia o array para o outro array do mesmo tamanho só que com os dados transformados

```javascript
const nums = [1,2,3,4,5]

let resultado = nums.map(function(e){
    return e * 2
})

console.log(resultado) // [ 2, 4, 6, 8, 10 ]

const soma10 = e => e + 10 
const triplo = e => e * 3
const paraDinheiro = e => `RS ${parseFloat(e).toFixed(2).replace(".",",")}`


console.log(nums.map(soma10).map(triplo).map(paraDinheiro)) //[ 'RS 33,00', 'RS 36,00', 'RS 39,00', 'RS 42,00', 'RS 45,00' ]

// outro exemplo

const carrinho = [
    '{ "nome": "Borracha", "preco": 3.45 }',
    '{ "nome": "Carderno", "preco": 13.90 }',
    '{ "nome": "Kit de Lapis", "preco": 41.22 }',
    '{ "nome": "Caneta", "preco": 7.50 }',
]

const obj = json => JSON.parse(json)
const showPrice = produto => produto.preco

const result =  carrinho.map(obj).map(showPrice)
console.log(result) // [ 3.45, 13.9, 41.22, 7.5 ]
```

### 🌵Filter
O método **filter()** cria um novo array com todos os elementos que passaram no teste implementado pela função fornecida.

```javascript
const produtos = [
    { "nome": "Notebook", "preco": 2445, fragil: true },
    { "nome": "Ipad", "preco": 4199, fragil: true },
    { "nome": "Copo de Vidro", "preco": 12.22, fragil: true },
    { "nome": "Copo de Plástico", "preco": 18.22, fragil: false },
]

console.log(produtos.filter(function(p){
    return false
})) // []

const caro = produto => produto.preco >= 500
const fragil = produto => produto.fragil

console.log(produtos.filter(caro).filter(fragil)) // [ { nome: 'Notebook', preco: 2445, fragil: true }, { nome: 'Ipad', preco: 4199, fragil: true } ]
```

### 🌵Reduce
O método **reduce()** serve para transformar um array, reduzindo-o ou agregando-o os valores um só, podendo ser esse elemento um array, um número, string, etc

```javascript
const alunos = [
    { "nome": "João", "nota": 7.6, bolsista: false },
    { "nome": "Maria", "nota": 9.8, bolsista: true },
    { "nome": "Pedro", "nota": 9.3, bolsista: false },
    { "nome": "Ana", "nota": 8.7, bolsista: true }
]

const resultado = alunos.map( a => a.nota).reduce(function(acumulador, atual){
    console.log(acumulador, atual)
    return acumulador + atual
}, 0) //valor inicial

console.log(resultado) 
// 0 7.6
// 7.6 9.8
// 17.4 9.3
// 26.7 8.7
// 35.4

//1: todos os bolsistas
const todosBolsistas = (resultado, bolsista) => resultado && bolsista
console.log(alunos.map( a => a.bolsista).reduce(todosBolsistas)) // false

//2: algum aluno é bolsista

const isBolsista = (resultado, bolsista) => resultado || bolsista
console.log(alunos.map( a => a.bolsista).reduce(isBolsista)) // true

```

### 🌵Concat

```javascript
const filhas = ['Julia','Paula']
const filhos = ['Pedro','João']
const todos = filhas.concat(filhos)
console.log(todos) // [ 'Julia', 'Paula', 'Pedro', 'João' ]

```

### 🌵FlatMap

```javascript
const escola = [{
    nome: 'Turma 1',
    alunos: [{
        nome: 'Marina',
        nota: 7.8
    },{
        nome: 'Joaquim',
        nota: 6.1
    }]
},{
    nome: 'Turma 2',
    alunos: [{
        nome: 'Luana',
        nota: 8.9
    },{
        nome: 'Paula',
        nota: 10
    }]
}]

const getNotaDoAluno = aluno => aluno.nota
const getNotaPorTurma = turma => turma.alunos.map(getNotaDoAluno)

const notas1 = escola.map(getNotaPorTurma)
console.log(notas1) //[ [ 7.8, 6.1 ], [ 8.9, 10 ] ]

console.log([].concat([7.8, 6.1 ], [ 8.9, 10 ])) // [ 7.8, 6.1, 8.9, 10 ]

Array.prototype.flatMap = function(callback){
    return Array.prototype.concat.apply([], this.map(callback))
}

const notas2 = escola.flatMap(getNotaPorTurma)
console.log(notas2) // [ 7.8, 6.1, 8.9, 10 ]

```

---
---

## ES6

### ⚡ Operador Rest/Spread

```javascript
//operador ... rest(juntar)/spread(espalhar)
//usar rest com parâmetro de função

//usar spread com objeto
const funcionario = { nome: 'Maria', salario: 3234.99 }
const clone = { ativo: true, ...funcionario }
console.log(clone) // { ativo: true, nome: 'Maria', salario: 3234.99 }

//usar spread com array
const grupoA = = [ 'João', 'Pedro', 'Glória']
const grupoFinal = [ 'Maria', ...grupoA, 'Rafaela']
console.log(grupoFinal) // [ 'Maria', 'João', 'Pedro', 'Glória', 'Rafaela' ]
```

### ⚡ Tagged Template

```javascript
```

### ⚡ Map
O objeto **Map** é um mapa simples de chave/valor. Qualquer valor (objeto e valores primitivos) pode ser usado como uma chave ou um valor.

```javascript
const tecnologias = new Map()
tecnologias.set('react', {framework: false})
tecnologias.set('angular', {framework: true})

//forma errada de acessar um Map
console.log(tecnologias.react) //undefined

//forma correta de acessar um Map
console.log(tecnologias.get('react').framework) // false
```

A diferença do **Map** é que no caso do objeto a chave é apenas um literal, um String por exemplo, no caso de um **Map** você pode ter a chave como uma função, como um número, um objeto, etc.

O **Map** não veio para substituir o objeto apenas dar mais flexibilidade.

```javascript
const chavesVariadas = new Map([
    [function() {}, 'Função'],
    [{}, 'Objeto'],
    [123, 'Número']
])

chavesVariadas.forEach((vl,ch) => {
    console.log(ch, vl)
    // [Function] 'Função'
    // {} 'Objeto'
    // 123 'Número'
})

console.log(chavesVariadas.has(123)) //true
chavesVariadas.delete(123)
console.log(chavesVariadas.has(123)) //false
console.log(chavesVariadas.size) // 2
```
 Esse objeto não aceita repetição na chave.
 
```javascript
chavesVariadas.set(123, 'a')
chavesVariadas.set(123, 'b') // esse sobrescreve o primeiro, ja que o map não aceita chaves variadas
console.log(chavesVariadas) // Map { [Function] => 'Função', {} => 'Objeto', 123 => 'b' }
```

### ⚡ Set
O objeto **Set** é uma estrutura de conjunto não indexada e que não aceita repetição. Ele permite que você armazene valores únicos de qualquer tipo, desde valores primitivos a referências a objetos.

Objetos **Set** são coleções de valores nas quais é possível iterar os elementos em ordem de inserção. Um valor pode ocorrer apenas uma vez; ele é único na coleção.


```javascript
const girlBand = new Set()
girlBand.add('Beyoncé')
girlBand.add('Michelle').add('Kelly')
girlBand.add('LaToya')
girlBand.add('Beyoncé')

console.log(girlBand) // Set { 'Beyoncé', 'Michelle', 'Kelly' }
console.log(girlBand.size) // 4
console.log(girlBand.has('Beyoncé')) // true
girlBand.delete('LaToya')
console.log(girlBand.has('LaToya')) // false

const alunos = ['Valentina', 'Enzo','Valentina', 'Enzo']
const alunosSet = new Set(alunos)
console.log(alunosSet) // Set { 'Valentina', 'Enzo' } - não aceita reptição
```

### ⚡ For Of
O loop **for...of** percorre objetos iterativos (incluindo Array, Map, Set, o objeto arguments e assim por diante) e traz como resposta os valores e não o indice.

```javascript
for (let letra of "Lovelace") {
    console.log(letra)
    // L
    // o
    // v
    // e
    // l
    // a
    // c
    // e
}
```

O loop **for...in** percorre em cima de indices, para pegar o valor será necessário pegar o valor do índice

```javascript
const assuntosEcma = ['Map', 'Set', 'Promise']

for (let i in assuntosEcma) {
    console.log(i)
    // 0
    // 1
    // 2
}
```
Já com **for...of**

```javascript
const assuntosEcma = ['Map', 'Set', 'Promise']

for (let assunto of assuntosEcma) {
    console.log(assunto)
    // Map
    // Set
    // Promise
}
```

```javascript
 //percorrendo Map

 const assuntosMap = new Map([
    ['Map', { abordado: true }],
    ['Set', { abordado: true }],
    ['Promise', { abordado: false }]
])

for (let assunto of assuntosMap) {
    console.log(assunto)
    // [ 'Map', { abordado: true } ]
    // [ 'Set', { abordado: true } ]
    // [ 'Promise', { abordado: false } ]
}

for (let chave of assuntosMap.keys()) {
    console.log(chave)
    // Map
    // Set
    // Promise
}

for (let valor of assuntosMap.values()) {
    console.log(valor)
    // { abordado: true }
    // { abordado: true }
    // { abordado: false }
}


for (let [ch, vl] of assuntosMap.entries()) {
    console.log(ch, vl)
    // Map { abordado: true }
    // Set { abordado: true }
    // Promise { abordado: false }
}
```

```javascript
 //percorrendo Set
 
const s = new Set(['a', 'b', 'c'])
for (let letra of s) {
    console.log(letra)
}
```

<!-- ### ⚡ Promises

```javascript
```

### ⚡ Usando Callbacks Aninhadas

```javascript
```

### ⚡ Refatorando Callbacks p/ Promises

```javascript
```

### ⚡ Async/Await

```javascript
``` -->

---

> Observações: <br />
> 1 - Defini algumas variáveis como let pra testar no console enquanto fazia essas anotações e cometia erros
<br>
> 2 - Icons made by <a href="https://www.freepik.com/" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/"                 title="Flaticon">www.flaticon.com</a> is licensed by <a href="http://creativecommons.org/licenses/by/3.0/"                 title="Creative Commons BY 3.0" target="_blank">CC 3.0 BY</a></div>