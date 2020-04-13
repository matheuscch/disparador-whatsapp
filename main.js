// Modules to control application life and create native browser window
const { app, BrowserWindow } = require('electron');
const fs = require('fs');
app.allowRendererProcessReuse = true;
const apresentacao = require('./Inicio')

class Whatsapp extends BrowserWindow {

    constructor(mensagem) {
        super()
        mensagem
    }

   Carregando(telefone,mensagem,tempo) {
    setTimeout(()=>{
        console.log("carregando url para " + telefone)     
        this.loadURL("https://web.whatsapp.com/send?phone=" + telefone + "&text=" + mensagem, {
            userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.110 Safari/537.36'
        });
        },tempo)
    }

     Enviando(tempo) {
        setTimeout(()=>{
        console.log("enviando...")
        this.webContents.executeJavaScript(`setTimeout(()=> {\
        var btnEnviar = document.getElementsByClassName("_35EW6")[0];\
        btnEnviar.click();\
        },1000)`);
        this.reload()
        },tempo)
    }     
}

app.on('ready', () => {   
    var tempo = 10000
    var mensagem = fs.readFileSync('mensagem.txt').toString()
    var numeros = fs.readFileSync('numeros.txt').toString().split('\r\n');
    
    apresentacao.imprimir();

    console.log(`\r\nAguarde enquanto o programa inicializa\r\n
    Preparando para enviar a mensagem:\r\n
    "${mensagem}"
    \r\ncarregado...\r\n`)
    
    let Janela = new Whatsapp(mensagem)
    for(var numero of numeros) {
        tempo = tempo + 20000;
        Janela.Carregando(numero,mensagem,tempo+20000)
        Janela.Enviando(tempo+35000) 
    }

   
})
