# js-studies

## Fundamentos

### 👾Notação Ponto

Criar atributos públicos em uma função usando this.variável
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
    function callAPI(args){
        try{
            console.log(args)
        }catch(e){
            if (true) {
                // instruções para tratar exceções caso vdd
            } else {
                // não pode tratar esta exceção então relança
                throw e;
            }
        }
    }
```

---

## Funções

### 💫Cidadão de Primeira Linha

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
> this variável, função bind, com arrow function

A função bind() cria uma nova função vinculada (bound function). Uma função vinculada é um objeto de função exótico (termo da ECMAScript 2015) que encapsula o objeto de função original. Chamar uma função vinculada geralmente resulta na execução de sua função encapsulada.



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

```javascript
var f = () => { 'use strict'; return this };
f() === window; // ou o objeto global
```

### 💫Funções Construtoras

### 💫Função Factory

### 💫Classe vs Função Factory

### 💫IIFE

```javascript
(()=>{
    let texto = "Será executado na hora!";
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

let produto = {
    nome: "Notebook",
    preco: 7000,
    desconto: 0.15,
    getPreco
}

let produto2 = {
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

## Objetos

### 🔮Introdução à OO

### 🔮Objeto

### 🔮Estratégias de Criação de Objetos

### 🔮Objetos Constantes

```javascript
let produto = {
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
**JSON** - JavaScript Object Notation, parace ser objeto mas na verdade é um formato textual. JSON é um formato de dados, talvez o mais usado hoje no mercado pra interoperabilidade. Interoperabilidade entre sistemas é você ter formato textual genérico que não carrega consigo nada específico de um sistema ou tecnologia. O JSON serve para comunicar sistemas que são feitos em tecnologias completamente diferentes.
Porque ele é um formato textual é um formato super simples de ser lido e de ser interpretado pelo computador.

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

```javascript
```

---

## Array

### 🌵Simulando Array com Objeto

```javascript
```

### 🌵Foreach

```javascript
```

### 🌵Map

```javascript
```

### 🌵Filter

```javascript
```

### 🌵Reduce

```javascript
```

### 🌵Imperativo Vs Declarativo

```javascript
```

### 🌵Concat

```javascript
```

### 🌵FlatMap

```javascript
```

---

## ES6

### ⚡ Operador Rest/Spread

```javascript
```

### ⚡ Tagged Template

```javascript
```

### ⚡ Map

```javascript
```

### ⚡ Set

```javascript
```

### ⚡ For Of

```javascript
```

### ⚡ Promises

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
```


> Observações: <br />
> 1 - Defini algumas variáveis como let pra testar no console enquanto fazia essas anotações e cometia erros