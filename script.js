class Candidato {
  constructor(numero, nome, partido, cargo, caminhoImagem) {
    this.numero = numero;
    this.nome = nome;
    this.partido = partido;
    this.cargo = cargo;
    this.caminhoImagem = caminhoImagem;
    this.totalDeVotos = 0;
  }
}
let totalVotosBrancos = 0;
let totalVotosNulos = 0;

let listaReferenciasQuadrado = [];
let listaDeCargosVotar = ["Deputado Estadual", "Deputado Federal", "Governador", "Senador", "Presidente"];
let listaCandidatos = [new Candidato("22", "Jair Messias Bolsonaro", "PL", "Presidente", "http://t2.gstatic.com/licensed-image?q=tbn:ANd9GcS550M1ICeYPbt-pqGKCmFx68FR1m28EbxVnriNQQp8W8VZaeLmhMwRanZlxBVZjH81"), new Candidato("13", "Luiz Inácio Lula da Silva", "PT", "Presidente", "http://t0.gstatic.com/licensed-image?q=tbn:ANd9GcSS_wgthyVMO3Kf3PVDrQ9Fn8ingrLR354BQiAkherjnPWDzvubYZKgNjQHmFnN1duh"), new Candidato("55", "Carlos Ratinho Júnior", "PSD", "Governador", "http://t0.gstatic.com/licensed-image?q=tbn:ANd9GcRWwBilM99SoyfVKQggIFLJaDP2bsjHOX3jiWjGblN4b3AfDO-v7kdaqi3-MOzKkVuI")];

let posicao = 0;
let cargoAvotar = listaDeCargosVotar[posicao];
let qtdeNumerica = pegarCargoDaVez(cargoAvotar);
let casasLiberadas = true;

liberarTelaParaVotar(cargoAvotar);

function digitarNumero(numeroApertado) {
  if (casasLiberadas) {
    validarCasaDaVez().innerText = numeroApertado;

    if (verificarDigitouTudo()) {
      bloquearCliques();
      bloquearBotao(btbranco);
      liberarTelaInformacoes(numeroInformado());
    }
  }
}

let bloquearConfirmaTemporario = false;

function confirmarVoto(){
  if(!verificarDigitouTudo()){
    tipoDeVoto = verificarTipoDeVoto();
    if (tipoDeVoto == "branco"){
      exibirTelaBranco();
      if (bloquearConfirmaTemporario == true){
        bloquearConfirmaTemporario = false;
      } else{
        bloquearConfirmaTemporario = true;
      }
    } else if(tipoDeVoto == "nulo"){
      exibirTelaNulo();
      if (bloquearConfirmaTemporario == true){
        bloquearConfirmaTemporario = false;
      } else{
        bloquearConfirmaTemporario = true;
      }
    }
  } else{
    bloquearConfirmaTemporario = false;
  }

  if (!bloquearConfirmaTemporario){
    if (!(ultimoCargoAvotar(listaDeCargosVotar) == cargoAvotar)){
      if (branco()){
        limparTelaConfirma("branco");
        //computarVotoBranco();
      } else if(nulo()){
        limparTelaConfirma("nulo");
        //computarVotoNulo();
      }else{
        limparTelaConfirma();
        computarVotoCandidato();
      }
    } else{
      mostrarFIM();
    }
  }
}

function computarVotoNulo(){
  totalVotosNulos++;
}

function computarVotoBranco(){
  totalVotosBrancos++;
}

function computarVotoCandidato(){
  let cargoVotado = cargoAvotar;
  
  for (let i = 0; i < listaCandidatos.length; i++) {
    let candidatoLista = listaCandidatos[i];
    if (candidatoLista.cargo == cargoVotado && candidatoLista.numero == numeroInformado()){
      candidatoLista.totalDeVotos++;
    }
}
}

function limparTelaConfirma(votoExecutado){
  limparQuadrados();
      definirProximoCargoAvotar();
      pegarReferenciasQuadrados(pegarCargoDaVez(cargoAvotar));
      liberarTelaParaVotar(cargoAvotar);
      desbloquearCliques();
      qtdeNumerica = pegarCargoDaVez(cargoAvotar);

  switch (votoExecutado){
    case "branco": retirarTelaBranco(); break;
    case "nulo": retirarTelaNulo(); break;
    default: limparPadraoTela();
      retirarDadosCandidato();
  }
}

function verificarTipoDeVoto(){
  if (listaReferenciasQuadrado[0].innerText == ""){
    return "branco";
  } else{
    for (let referencias of listaReferenciasQuadrado){
      if (referencias.innerText == ""){
        return "nulo";
      }
  }
}
  return "correto";
}

function definirProximoCargoAvotar(){
  posicao++;
  cargoAvotar = listaDeCargosVotar[posicao];
}

function ultimoCargoAvotar(listaDeCargos){
  return listaDeCargos[listaDeCargos.length - 1];
}

function votarEmBranco(){
  bloquearConfirmaTemporario = true;
  if (!nulo()){
    exibirTelaBranco();
    bloquearCliques();
  }
}

function corrigirDados(){
  bloquearConfirmaTemporario = false;
  desbloquearBotao(btbranco);
  if (!nulo() && !branco()){
      limparNumerosDigitado(listaReferenciasQuadrado);
      txtnumero.innerText = "";
      labelnome.innerText = "";
      labelpartido.innerText = "";
      retirarRodape();
      retirarDadosCandidato();
      desbloquearCliques();
  } else{
    limparNumerosDigitado(listaReferenciasQuadrado);
      txtnumero.innerText = "";
     retirarRodape();
     desbloquearCliques();
      retirarTelaNulo();
  }
}

function limparNumerosDigitado(referenciasHTMLDosQuadrados){
  for (var i = 0; i < referenciasHTMLDosQuadrados.length; i++) {
        referenciasHTMLDosQuadrados[i].innerText = "";
    }
}

function limparPadraoTela(){
  
  if (!nulo() && !branco()){
      limparNumerosDigitado(listaReferenciasQuadrado);
      txtnumero.innerText = "";
      labelnome.innerText = "";
      labelpartido.innerText = "";
      retirarRodape();
      retirarDadosCandidato();
      desbloquearCliques();
  } else{
    for (var i = 0; i < listaReferenciasQuadrado.length; i++) {
        listaReferenciasQuadrado[i].innerText = "";
    }
      txtnumero.innerText = "";
     retirarRodape();
     desbloquearCliques();
      retirarTelaNulo();
  }
}

function pegarReferenciasQuadrados(qtdeNumerica) {

  for (var i = 0; i < qtdeNumerica; i++) {
    listaReferenciasQuadrado.push(document.getElementById(`quadrado${i + 1}`));
  }
}

function validarCasaDaVez() {

  for (var i = 0; i < listaReferenciasQuadrado.length; i++) {
    if (listaReferenciasQuadrado[i].innerText == "") {
      console.log(listaReferenciasQuadrado[i]);
      return listaReferenciasQuadrado[i];
    }
  }
}

function bloquearCliques() {
  casasLiberadas = false;
}

function desbloquearCliques(){
  casasLiberadas = true;
}

function limparQuadrados(){
  quadrado5.classList.remove("quadradopadrao");
  quadrado4.classList.remove("quadradopadrao");
  quadrado3.classList.remove("quadradopadrao");
  quadrado2.classList.remove("quadradopadrao");
  quadrado1.classList.remove("quadradopadrao");
}

function liberarTelaParaVotar(cargoDaVez) {
  pegarReferenciasQuadrados(pegarCargoDaVez(cargoDaVez));
  seuvotopara.innerText = "SEU VOTO PARA";
  cargo.innerText = cargoDaVez;

  switch (cargoDaVez) {
    case "Deputado Estadual":
      quadrado5.classList = "quadradopadrao";
    case "Deputado Federal":
      quadrado4.classList = "quadradopadrao";
    case "Senador":
      quadrado3.classList = "quadradopadrao";
    case "Presidente":
    case "Governador":
      quadrado1.classList = "quadradopadrao";
      quadrado2.classList = "quadradopadrao";
      break;
  }
}

function liberarTelaInformacoes(numeroDigitado) {
  if (!nulo()) {
    txtnumero.innerText = "Número:";
    labelnome.innerText = "Nome: ";
    labelpartido.innerText = "Partido: ";
    exibirRodape();
    dadosCandidatoNaTela(numeroDigitado);
  } else {
    exibirTelaNulo();
  }
}

function nulo() {
  
  let numeroVotado = numeroInformado();
  let cargo = cargoAvotar;
  for (let i = 0; i < listaCandidatos.length; i++) {
    if ((numeroVotado == listaCandidatos[i].numero && cargoAvotar == listaCandidatos[i].cargo) || branco()){
      return false;
    }
  }
  return true;
}

function branco(){
  return numeroInformado() == "";
}

function exibirTelaBranco(){
  txtnumero.innerText = "Número:";
  dadoscandidatos.innerHTML = '<p id="votobranco">VOTO EM BRANCO</p>';
  exibirRodape();
}

function exibirTelaNulo() {
  txtnumero.innerText = "Número:";
  dadoscandidatos.innerHTML = `<p id="numErrado">NÚMERO ERRADO</p> <p id="votonulo">VOTO NULO</p>`;
  exibirRodape();
  bloquearCliques();
}

function retirarTelaBranco(){
  retirarTelaNulo();
}

function retirarTelaNulo(){
  retirarRodape();
  txtnumero.innerText = "";
  limparNumerosDigitado(listaReferenciasQuadrado);
  dadoscandidatos.innerHTML = `<div id="nome" class="informacoes">
        <span id="labelnome"></span>
        <span id="nomecandidato"></span>
      </div>
      <div id="partido" class="informacoes">
        <span id="labelpartido"></span>
        <span id="partidocandidato"></span>
      </div>`;
}

function exibirRodape() {
  rodape.innerHTML = "<p>Aperte a tecla:</p><ul><li>VERDE para CONFIRMAR este voto</li><li>LARANJA para REINICIAR este voto</li></ul>";
  rodape.classList = "rodape";
}

function retirarRodape(){
  rodape.innerText = "";
  rodape.classList.remove("rodape");
}

function limparHTMLtela(){
  tela.remove();
  
}

function mostrarFIM(){
  limparHTMLtela();
  urna.innerHTML = `<div id="telafim">
    <p id="txtfim">FIM</p>
    <p id="votou">VOTOU</p>
  </div>
  `
  desbloquearBotao(btnovoeleitor);
}

function verificarDigitouTudo() {
  return listaReferenciasQuadrado[qtdeNumerica - 1].innerText != "";
}

function numeroInformado() {
  let textoConcatenado = "";
  for (let i = 0; i < qtdeNumerica; i++) {
    textoConcatenado += listaReferenciasQuadrado[i].innerText;
  }
  return textoConcatenado;
}

function getCandidato(numero, cargo) {

  for (let i = 0; i < listaCandidatos.length; i++) {
    if (numero == listaCandidatos[i].numero && cargo == listaCandidatos[i].cargo){
      return listaCandidatos[i];
    }
  }
}

function dadosCandidatoNaTela(numero) {
  let candidato = getCandidato(numero, cargoAvotar);
  nomecandidato.innerText = candidato.nome;
  partidocandidato.innerText = candidato.partido;
  fotocandidato.innerHTML = `<img src=${candidato.caminhoImagem}>`;
}

function retirarDadosCandidato(){
  nomecandidato.innerText = "";
  partidocandidato.innerText = "";
  fotocandidato.innerText = "";
}

function pegarCargoDaVez(cargo){
  switch(cargo){
    case "Deputado Estadual": return 5;
    case "Deputado Federal": return 4;
    case "Senador": return 3;
    default: return 2;
  }
}

function bloquearBotao(id){
  id.disabled = true;
}

function desbloquearBotao(id){
  id.disabled = false;
}

function telaInicial(){
  urna.innerHTML = `
  <div id="tela">
      <p id="seuvotopara"></p>
      <h2 id="cargo"></h2>
      
      <span id="txtnumero"></span>
      <div id="posicaonumerostela">
        <div id="quadrado1" class=""></div>
        <div id="quadrado2" class=""></div>
        <div id="quadrado3" class=""></div>
        <div id="quadrado4" class=""></div>
        <div id="quadrado5" class=""></div>
      </div>

      <div id="dadoscandidatos">
      <div id="nome" class="informacoes">
        <span id="labelnome"></span>
        <span id="nomecandidato"></span>
      </div>
      <div id="partido" class="informacoes">
        <span id="labelpartido"></span>
        <span id="partidocandidato"></span>
      </div>
        </div>
      <div id="fotocandidato">
        
      </div>

      <footer id="rodape" class="">
        <!--         <p>Aperte a tecla:</p>
        <ul>
          <li>VERDE para CONFIRMAR este voto</li>
          <li>LARANJA para REINICIAR este voto</li>
        </ul> -->
      </footer>
    </div>

    <div id="digitos">
      <button id="bt1" class="btpadrao" onclick="digitarNumero(1)"></button>
      <button id="bt2" class="btpadrao" onclick="digitarNumero(2)"></button>
      <button id="bt3" class="btpadrao" onclick="digitarNumero(3)"></button>
      <button id="bt4" class="btpadrao" onclick="digitarNumero(4)"></button>
      <button id="bt5" class="btpadrao" onclick="digitarNumero(5)"></button>
      <button id="bt6" class="btpadrao" onclick="digitarNumero(6)"></button>
      <button id="bt7" class="btpadrao" onclick="digitarNumero(7)"></button>
      <button id="bt8" class="btpadrao" onclick="digitarNumero(8)"></button>
      <button id="bt9" class="btpadrao" onclick="digitarNumero(9)"></button>
      <button id="bt0" class="btpadrao" onclick="digitarNumero(0)"></button>
    </div>

    <div id="digitosValidar">
      <button id="btbranco" class="btValidar" onclick="votarEmBranco()"></button>
      <button id="btcorrige" class="btValidar" onclick="corrigirDados()"></button>
      <button id="btconfirma" class="btValidar" onclick="confirmarVoto()"></button>
    </div>

  `
}

function liberarNovoEleitor(){
  telaInicial();
  listaReferenciasQuadrado = [];
  posicao = 0;
cargoAvotar = listaDeCargosVotar[posicao];
qtdeNumerica = pegarCargoDaVez(cargoAvotar);
casasLiberadas = true;
liberarTelaParaVotar(cargoAvotar);
btnovoeleitor.disabled = true;
}