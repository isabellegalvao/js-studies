# js-studies

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

* Em um método, isso se refere ao objeto proprietário.
* Sozinho, isso se refere ao objeto global.
* Em uma função, isso se refere ao objeto global.
* Em uma função, no modo estrito, isso é *undefined*.
* Em um evento, isso se refere ao elemento que recebeu o evento.
* Métodos como bind(), call() e apply() podem referir isso a qualquer objeto.


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

### 🔮Introdução à OO

### 🔮Objeto

### 🔮Estratégias de Criação de Objetos

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