
### 🔮Introdução à OO

Quando se trata de herança, JavaScript tem somente um construtor: objetos. Cada objeto tem um link interno para um outro objeto chamado prototype. Esse objeto prototype também tem um atributo prototype, e assim por diante até que null seja encontrado como em prototype. null 1 que, por definição, não tem prototype, e age como um link final nesta cadeia de protótipos (prototype chain).

Atribuir uma propriedade a um objeto cria uma propriedade nele. A única exceção às regras de obtenção e definição de comportamento é quando há uma propriedade herdada com um getter or a setter.

### Herença de "métodos"

JavaScript não tem "métodos" como os que conhecemos em linguagens baseadas em classes. Em JavaScript, qualquer função pode ser adicionada em um objeto em forma de propriedade. Uma herança de funções age como a herança de quaisquers outras propriedades que não sejam funções, e podemos inclusive realizar sobre-escrita de função!

Quando uma herança de função é executada, o valor de this aponta para o objeto que herdou as propriedades, não para o objeto prototype onde as propriedades foram escritas originalmente.


### 🔮Prototype

O Prototype é uma propriedade que todas as funções em JavaScript possuem nos permite compartilhar métodos em todas as instâncias de uma função. 

Se eu crio um objeto vazio por exemplo eu chamar `obj` ele simplesmente vai dizer que eu tenho um objeto vazio mas na verdade eu tenho algumas propriedades desse objeto, por exemplo `.toString`.

```javascript
const arr =  [1,2,3]
```
Esse array não tem nenhum método mas podemos utilizar o método slice, pq todos os arrays herdam do `Array.prototype`

```javascript
arr.slice(1)
//[2,3]
```

#### Object.create

`Object.create()` permite que você crie um objeto e sempre que houver uma pesquisa de propriedade com falha nesse objeto, ele poderá consultar outro objeto para ver se esse outro objeto possui a propriedade. 

```javascript
const pai = {
  nome: 'Stacey',
  idade: 35,
  nacionalidade: 'Irish'
}

const filho = Object.create(pai)
filho.nome = 'Ryan'
filho.idade = 7

console.log(filho.nome) // Ryan
console.log(filho.idade) // 7
console.log(filho.nacionalidade) // Irish
```

Portanto, no exemplo acima, como filho foi criado com Object.create (pai), sempre que houver uma pesquisa de propriedade com falha no filho, o JavaScript delegará essa pesquisa ao objeto pai. O que isso significa é que, mesmo que a criança não tenha uma propriedade de nacionalidade, o pai o faz quando você registra o filho.nacionalidade. Você verá a nacionalidade dos pais que era irlandesa.


#### Como criar uma função construtora e adicionar métodos ao protótipo da função de construtor.

```javascript
function User(name, lastName){
    this.name = name;
    this.lastName = lastName;
    this.anoNascimento = 1996
}

User.prototype.fullname = function(){
    return `${this.name} ${this.lastName}`
}

var isa = new User('Isabelle','Galvão')

console.log(isa.fullname())
```

Quando você invoca uma função usando a palavra-chave `new`, essas duas linhas são feitas para você implicitamente e o objeto que é criado é chamado com `this`.


```javascript
function Animal (name, energy) {
  // const this = Object.create(Animal.prototype)

  this.name = name
  this.energy = energy

  // return this
}

const leo = new Animal('Leo', 7)
const snoop = new Animal('Snoop', 10)
```
O nome desse padrão é a `Pseudoclassical Instantiation`.

```javascript
function Animal (nome, energia) {
  this.nome = nome
  this.energia = energia
}

Animal.prototype.eat = function (qt) {
  console.log(`${this.nome} está comendo.`)
  this.energia += qt
}

Animal.prototype.sleep = function (qt) {
  console.log(`${this.nome} está dormindo.`)
  this.energia += qt
}

Animal.prototype.play = function (qt) {
  console.log(`${this.nome} está brincando.`)
  this.energia -= qt
}

const leo = new Animal('Gato', 7)
const snoop = new Animal('Cachorro', 10)
```

O que fizemos com nossa função de construtor Animal foi recriar a funcionalidade de classes. Uma classe permite criar um blueprint para um objeto. Então, sempre que você criar uma instância dessa classe, você obtém um objeto com as propriedades e os métodos definidos no blueprint.

#### Sintaxe Class

```javascript
class Animal {
  constructor(name, energy) {
    this.name = name
    this.energy = energy
  }
  eat(amount) {
    console.log(`${this.name} is eating.`)
    this.energy += amount
  }
  sleep(length) {
    console.log(`${this.name} is sleeping.`)
    this.energy += length
  }
  play(length) {
    console.log(`${this.name} is playing.`)
    this.energy -= zlength
  }
}

const leo = new Animal('Leo', 7)
const snoop = new Animal('Snoop', 10)
```

Esta é a nova maneira de criar classes, esse novo caminho (com a palavra-chave class) é basicamente apenas “syntactical sugar” sobre o modo existente que chamamos de padrão pseudo-clássico. Para entender completamente a sintaxe de conveniência das classes do ES6, você deve primeiro entender o padrão pseudo-clássico.

> **Referencias e traduções:** 
> https://tylermcginnis.com/beginners-guide-to-javascript-prototype/
