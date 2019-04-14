let vez = 1;
let matriz_velha = []; 
let definido = false;

var jogador1 = {
  pontos: 0,
  letra: 'X',
};
var jogador2 = {
  pontos: 0,
  letra: 'O',
};
function definirVez(v) {
  if (v == 1) {
    vez = 1;
  }else{
    vez = 2;
  }
  if (vez < 2) {
    document.getElementById("jogo-vez").innerHTML =  'X Começa';
  }else {
    document.getElementById("jogo-vez").innerHTML =  'O Começa';
  }
  for (var i = 0;i< 2;i++) {
    document.getElementsByClassName('jogadores-xo')[i].removeAttribute('onclick');
    document.getElementsByClassName('jogadores-xo')[i].removeAttribute('onmouseover');
    
  }
  definido = true;
}

function mostrarGanhador(letra) {
  if (letra != 'E') {
    document.getElementById("jogo-vez").innerHTML = letra + ' Ganhou!';
  }else{
    document.getElementById("jogo-vez").innerHTML = 'Empate';
  }
}

function vasculha() {
  let espacos = document.getElementsByClassName('espaco');
  for (var i = 0; i < 9;i++ ) {
    if (espacos[i].innerHTML != '') {
      matriz_velha.push(espacos[i].innerHTML);
    }else{
      matriz_velha.push('-');
    }
  }

  let matriz_velha_string = matriz_velha.join('');
  let linhas = [matriz_velha_string.substring(0,3),
    matriz_velha_string.substring(3,6),
    matriz_velha_string.substring(6,9)];
  let ganhador = "nenhum";

  for (var a = 0;a<3;a++) {
    if (linhas[a][0] != '-' && linhas[a][0] == linhas[a][1] && linhas[a][1] == linhas[a][2]) {
      ganhador = linhas[a][0];
      document.getElementsByClassName('espaco')[a*3].style.color='red';
      document.getElementsByClassName('espaco')[a*3+1].style.color='red';
      document.getElementsByClassName('espaco')[a*3+2].style.color='red';
      break
    }
  }
  for (var a = 0;a<3;a++) {
    if (linhas[0][a] != "-" && linhas[0][a] == linhas[1][a] && linhas[1][a] == linhas[2][a]) {
      ganhador = linhas[0][a];
      document.getElementsByClassName('espaco')[a+3*0].style.color='red';
      document.getElementsByClassName('espaco')[a+3*1].style.color='red';
      document.getElementsByClassName('espaco')[a+3*2].style.color='red';
      break
    }
  }
  if (ganhador == "nenhum") {
    if (linhas[0][0] != "-" && linhas[0][0] == linhas[1][1] && linhas[1][1] == linhas[2][2]) {
      ganhador = linhas[0][0];
      document.getElementsByClassName('espaco')[0].style.color='red';
      document.getElementsByClassName('espaco')[4].style.color='red';
      document.getElementsByClassName('espaco')[8].style.color='red';

    }else if (linhas[2][0] != "-" && linhas[2][0] == linhas[1][1] && linhas[1][1] == linhas[0][2]) {
      ganhador = linhas[2][0];
      document.getElementsByClassName('espaco')[2].style.color='red';
      document.getElementsByClassName('espaco')[4].style.color='red';
      document.getElementsByClassName('espaco')[6].style.color='red';

    }else{
      if (!(/(-)/.test(matriz_velha_string))) {
        ganhador = 'E';
      }
    }
  }  
  for (var i = 0; i < 9;i++ ) {
    matriz_velha.pop();
  }
  if (ganhador == "X") {
    jogador1.pontos++;
    document.getElementById('pontos-x').innerHTML = jogador1.pontos;
    mostrarGanhador(ganhador);
    limpar();
  }
  if (ganhador == "O") {
    jogador2.pontos++;
    document.getElementById('pontos-o').innerHTML = jogador2.pontos;
    mostrarGanhador(ganhador);
    limpar();
  }
  if (ganhador == "E") {
    mostrarGanhador(ganhador);
    limpar();
  }

}
function limpar() {
  function limparespacos() {
    let espacos = document.getElementsByClassName('espaco');
    for (var i = 0; i < 9;i++ ) {
      espacos[i].innerHTML = '';
      espacos[i].style.color='black';  
    }
  }  
  let espacos = document.getElementsByClassName('espaco');
  for (var i = 0; i < 9;i++ ) {
    espacos[i].removeAttribute('onclick'); 
  }
  setTimeout(limparespacos,2000);
  setTimeout(injetarFuncao,2000);
}
function jogadas (n) {
  if (!(definido)) {
    definirVez(1);
  }
  if (vez==1) {
    vez++;
    let sp = document.getElementById('espaco'+ n);
    sp.innerHTML = jogador1.letra;
    sp.removeAttribute('onclick');
    document.getElementById("jogo-vez").innerHTML = 'Vez de '+jogador2.letra;
  }else {
    vez--;
    let sp = document.getElementById('espaco'+ n);
    sp.innerHTML = jogador2.letra;
    sp.removeAttribute('onclick');
    document.getElementById("jogo-vez").innerHTML = 'Vez de '+jogador1.letra;
  }
  vasculha();

}
function injetarFuncao() {
  let espacos = document.getElementsByClassName('espaco');
  for (var i = 0; i < 9;i++ ) {
    espacos[i].setAttribute('onclick','jogadas('+i+')');
  }
  if (vez < 2) {
    document.getElementById("jogo-vez").innerHTML =  'X Começa';
  }else {
    document.getElementById("jogo-vez").innerHTML =  'O Começa';
  }
};


function injetarVez(){
  for (var i = 0;i< 2;i++) {
    document.getElementsByClassName('jogadores-xo')[i].setAttribute('onclick','definirVez('+(i+1)+')');
    document.getElementsByClassName('jogadores-xo')[i].setAttribute('onmouseover','this.style.color="darkcyan"');
    document.getElementsByClassName('jogadores-xo')[i].setAttribute('onmouseout','this.style.color="unset"');
  }

}
document.body.onload = injetarFuncao(), injetarVez();


function reiniciarTudo() {
  window.location.reload();
}
