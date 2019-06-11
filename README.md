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
Facilita o acesso a dados dentro de um array ou objeto e a criação de variáveis que contenham esses dados.


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

```javascript
let soma = (a=1, b=1,c=1) => a+b+c;

console.log(soma()) // 3
console.log(soma(3)) // 5
console.log(soma(1,2,3)) // 6
console.log(soma(0,0,0)) // 0
```

### 💫This
> this variável, função bind, com arrow function

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
    return `${moeda} ${this.preco * (1 - this.desc) * (1 + imposto)}`
}

const produto = {
    nome: "Notebook",
    preco: 7000,
    desconto: 0.2,
    getPreco
}

console.log(getPreco()) // texto is not defined
console.log(produto.getPreco()) // texto is not defined
console.log(getPreco.call(produto)) // texto is not defined
console.log(getPreco.apply(produto)) // texto is not defined
```
---

## Objetos

### 🔮Introdução à OO

### 🔮Objeto

### 🔮Estratégias de Criação de Objetos

### 🔮Objetos Constantes

### 🔮Notação Literal

### 🔮Getters/Setters

### 🔮Funções Importantes de Objeto

### 🔮Herança

### 🔮Evitando Modificações

### 🔮JSON vs Objeto

### 🔮Classe

---

## Array

### 🌵Simulando Array com Objeto

### 🌵Foreach

### 🌵Map

### 🌵Filter

### 🌵Reduce

### 🌵Imperativo Vs Declarativo

### 🌵Concat

### 🌵FlatMap

---

## ES6

### ⚡ Operador Rest/Spread

### ⚡ Tagged Template

### ⚡ Map

### ⚡ Set

### ⚡ For Of

### ⚡ Promises

### ⚡ Usando Callbacks Aninhadas

### ⚡ Refatorando Callbacks p/ Promises

### ⚡ Async/Await
