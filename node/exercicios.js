(function(){
    'use strict'

    function User(name, lastName){
        this.name = name;
        this.lastName = lastName;
        this.anoNascimento = 1996
    }

    User.prototype.fullname = function(){
        return `${this.name} ${this.lastName}`
    }

    User.prototype.anoNascimento = 1995
    User.prototype.age = 22
    var isa = new User('Isabelle','Galvão')
    User.prototype.age = 23 //o protótipo pode ser sobrescrito
    console.log(isa.fullname())
    console.log(isa.age)
    console.log(isa.anoNascimento)

})