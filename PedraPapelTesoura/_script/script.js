
var espera = 1;
var jogador = {pontos:0};
var computador = {pontos:0};

function tipoCara (d,expr) {
    if (d >0){
      if (d>2){
        document.getElementById(expr).src = "imagens/muitofeliz.png";
      }else{
      document.getElementById(expr).src = "imagens/feliz.png";
      }
    }else if (d <0) {
      if (d<-2) {
        document.getElementById(expr).src = "imagens/bravo.png";
      } else{
        document.getElementById(expr).src = "imagens/chateado.png";
      }  
    }else {
      document.getElementById(expr).src = "imagens/inexpressivo.png";
    }      
}


function trocarRosto(){
  let diferenca_j = jogador.pontos - computador.pontos;
  let diferenca_pc = computador.pontos - jogador.pontos;
  tipoCara(diferenca_j,'expressao-j');
  tipoCara(diferenca_pc,'expressao-pc');

}

function estadoEspera(valor){
  if (espera == 1){
    pegaValor(valor);
    espera = 0;
  }
}


function limparBorda(j,pc){
  setTimeout(function () {
    document.getElementById(j).style = "border-color: transparent;";
    document.getElementById(pc).style = "border-color: transparent;";
    document.getElementById("resultado-j").innerHTML = "---";
    document.getElementById("resultado-pc").innerHTML = "---";
    espera = 1;
  },1000);
   
}

function pegaValor (valor) {
  let valor_j = parseInt(valor);
  let valor_pc = Math.floor(Math.random() * 3)+1;
  let idj = "maoj-" + valor_j;
  let idpc = "maopc-" + valor_pc;
  document.getElementById(idj).style = "border-color: white;";
  document.getElementById(idpc).style = "border-color: white;";
  let resultado = valor_j - valor_pc;
  resultadoMostrar(resultado);
  limparBorda(idj,idpc);
}
function resultadoMostrar(resultado) {
  if ((resultado == 2 )||(resultado == -1)){
    jogador.pontos +=1;
    document.getElementById("resultado-j").innerHTML = "Ganhou";
    document.getElementById("resultado-pc").innerHTML = "Perdeu";
 
  } else if ((resultado == -2 )||(resultado == 1)) {
    computador.pontos +=1;
    document.getElementById("resultado-j").innerHTML = "Perdeu";
    document.getElementById("resultado-pc").innerHTML = "Ganhou";

  } else {
    document.getElementById("resultado-j").innerHTML = "Empatou";
    document.getElementById("resultado-pc").innerHTML = "Empatou";
 
  }
  document.getElementById("pontos-j").innerHTML = jogador.pontos;
  document.getElementById("pontos-pc").innerHTML = computador.pontos;
  trocarRosto();
}

function reiniciarTudo() {
  location.reload();
}
/*
empate 0
1-3 perde -2 
2-1 perde 1  
3-2 perde 1  
1-2 ganha -1 
2-3 ganha -1 
3-1 ganha 2  
*/