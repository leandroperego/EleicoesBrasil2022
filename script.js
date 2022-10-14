class Candidato {
  constructor(numero, nome, partido, cargo, caminhoImagem) {
    this.numero = numero;
    this.nome = nome;
    this.partido = partido;
    this.cargo = cargo;
    this.caminhoImagem = caminhoImagem;
  }
}

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
  } else {

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
      } else if(nulo()){
        limparTelaConfirma("nulo");
      }else{
        limparTelaConfirma();
      }
    } else{
      mostrarFIM();
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
  return true;
}

function exibirTelaNulo() {
  txtnumero.innerText = "Número:";
  dadoscandidatos.innerHTML = `<p id="numErrado">NÚMERO ERRADO</p> <p id="votonulo">VOTO NULO</p>`;
  exibirRodape();
  return true;
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