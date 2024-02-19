const html = document.querySelector("html");

const focoBt = document.querySelector(".app__card-button--foco");

const curtoBt = document.querySelector(".app__card-button--curto");

const longoBt = document.querySelector(".app__card-button--longo");

const banner = document.querySelector(".app__image");

const titulo = document.querySelector(".app__title");

const botoes = document.querySelectorAll(".app__card-button");

const musicaFocoInput = document.querySelector("#alternar-musica");

const musica = new Audio("/sons/luna-rise-part-one.mp3");

const play = new Audio("/sons/play.wav");

const pause = new Audio("/sons/pause.mp3");

const beep = new Audio("/sons/beep.mp3");

const stratPauseBT = document.querySelector("#start-pause");

const IniciarOuPausarBT = document.querySelector("#start-pause span");

const imgPause = document.querySelector("#start-pause img");

const tempoNaTela = document.querySelector("#timer");

let tempoDecorridoEmSegundos = 1500;
let intervaloID = null;

musica.loop = true;

musicaFocoInput.addEventListener("change", () => {
  if (musica.paused) {
    musica.play();
  } else {
    musica.pause();
  }
});

focoBt.addEventListener("click", () => {
  tempoDecorridoEmSegundos = 1500;
  alterarContexto("foco");
  focoBt.classList.add("active");
});

curtoBt.addEventListener("click", () => {
  tempoDecorridoEmSegundos = 300;
  alterarContexto("descanso-curto");
  curtoBt.classList.add("active");
});
//  //muda a cor de fundo quando clica
//  html.setAttribute("data-contexto", "descanso-curto");
//  //muda as imagens quando clica
//  banner.setAttribute("src", "./imagens/descanso-curto.png");

longoBt.addEventListener("click", () => {
  tempoDecorridoEmSegundos = 900;
  alterarContexto("descanso-longo");
  longoBt.classList.add("active");
});

function alterarContexto(contexto) {
  mostrarTempo();
  botoes.forEach(function (contexto) {
    contexto.classList.remove("active");
  });
  html.setAttribute("data-contexto", contexto);
  banner.setAttribute("src", `/imagens/${contexto}.png`);

  switch (contexto) {
    case "foco":
      titulo.innerHTML = `Otimize sua produtividade,<br>
      <strong class="app__title-strong">mergulhe no que importa.</strong>`;
      break;

    case "descanso-curto":
      titulo.innerHTML = `Que tal dar uma respirada? <strong class="app__title-strong">Faça uma pausa curta!</strong>`;
      break;

    case "descanso-longo":
      titulo.innerHTML = `Hora de voltar à superfície.<strong class="app__title-strong"> Faça uma pausa longa.</strong>`;
      break;

    default:
      break;
  }
}

const contagemRegressiva = () => {
  if (tempoDecorridoEmSegundos <= 0) {
    beep.play();
    const focoAtivo = html.getAttribute("data-contexto") == "foco";

    if (focoAtivo) {
      const evento = new CustomEvent("FocoFinalizado");
      document.dispatchEvent(evento);
    }
    zerar();
    alert("Tempo finzalido!");
    return;
  }
  tempoDecorridoEmSegundos -= 1;
  mostrarTempo();
};

stratPauseBT.addEventListener("click", iniciarOuPausar);

function iniciarOuPausar() {
  if (intervaloID) {
    pause.play();
    zerar();
    return;
  }
  play.play();
  intervaloID = setInterval(contagemRegressiva, 1000);
  IniciarOuPausarBT.textContent = "Pausar";
  imgPause.setAttribute("src", `/imagens/pause.png`);
}

function zerar() {
  clearInterval(intervaloID);
  IniciarOuPausarBT.textContent = "Começar";
  imgPause.setAttribute("src", `/imagens/play_arrow.png`);
  intervaloID = null;
}

function mostrarTempo() {
  const tempo = new Date(tempoDecorridoEmSegundos * 1000);
  const tempoFormatado = tempo.toLocaleTimeString("pt-Br", {
    minute: "2-digit",
    second: "2-digit",
  });
  tempoNaTela.innerHTML = `${tempoFormatado}`;
}

mostrarTempo();
