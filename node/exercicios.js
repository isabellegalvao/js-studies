const fs = require('fs')// modulo nativo de file system

const caminho = __dirname + '/arquivoGerado.json'

//sincrono
const conteudo = fs.readFileSync(caminho, 'utf-8')
console.log(conteudo)

//assincrono
fs.readFile(caminho, 'utf-8', (err, conteudo) => {
    const produto = JSON.parse(conteudo)
    console.log(`${produto.nome}`)
})

const produto = require('./arquivoGerado.json')
console.log(produto)


fs.readdir(__dirname, (err, arquivos) => {
    console.log('Conteudo da pasta...')
    console.log(arquivos)
})