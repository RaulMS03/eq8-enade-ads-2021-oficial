const gabaritoOficial = ["Q1:E", "Q2:C", "Q3:B", "Q4:B", "Q5:A", "Q6:A", "Q7:C","Q8:D", "Q9:C", "Q10:D","Q11:E", 
"Q12:C", "Q13:C","Q14:E", "Q15:B", "Q16:E","Q17:C", "Q18:A", "Q19:A","Q20:E", "Q21:B","Q22:A", "Q23:B","Q24:D", 
"Q25:E", "Q26:E","Q27:C", "Q28:B", "Q29:D","Q30:C","Q31:D", "Q32:B", "Q33:D","Q34:A", "Q35:A"]
const conteudosProva = [
	['Q1', [' Interpretação']], ['Q2', [' Desconhecido']], ['Q3', [' Desconhecido']], 
	['Q4', [' Desconhecido']], ['Q5', [' Desconhecido']], ['Q6', [' Desconhecido']], 
	['Q7', [' Desconhecido']], ['Q8', [' Desconhecido']], ['Q9', [' Desconhecido']],
	['Q10', [' Desconhecido']], ['Q11', [' Desconhecido']], ['Q12', [' Desconhecido']], 
	['Q13', [' Desconhecido']], ['Q14', [' Desconhecido']], ['Q15', [' Desconhecido']],
	['Q16', [' Desconhecido']], ['Q17', [' Desconhecido']], ['Q18', [' Desconhecido']],
	['Q19', [' Desconhecido']], ['Q20', [' Desconhecido']], ['Q21', [' Desconhecido']],
	['Q22', [' Desconhecido']], ['Q23', [' Desconhecido']], ['Q24', [' Desconhecido']],
	['Q25', [' Desconhecido']], ['Q26', [' Desconhecido']], ['Q27', [' Desconhecido']],
	['Q28', [' Desconhecido']], ['Q29', [' Desconhecido']], ['Q30', [' Desconhecido']],
	['Q31', [' Desconhecido']], ['Q32', [' Desconhecido']], ['Q33', [' Desconhecido']],
	['Q34', [' Desconhecido']], ['Q35', [' Desconhecido']]
]

var recomendaConteudos = []
var gabaritoUsuario = []
var totalRespondidas = []
var totalAcertos = []
var totalErros = []

var tempoDecorrido = 0
var tempoMedioPergunta = 0
var totalNaoRespondidas = 35
var mensagemAcertos = ''

if(sessionStorage.getItem('gabaritoUsuario')){
	gabaritoUsuario = sessionStorage.getItem('gabaritoUsuario').split(" ")
	totalRespondidas = sessionStorage.getItem('gabaritoUsuario').split(" ")
}

if(totalRespondidas[0] != ''){
	for (let i = 0; i < gabaritoUsuario.length; i++) {
		
		if (gabaritoOficial.indexOf(gabaritoUsuario[i]) >=0 )
			totalAcertos.push(gabaritoUsuario[i]) 
		
		if (gabaritoOficial.indexOf(gabaritoUsuario[i]) < 0)
			totalErros.push(gabaritoUsuario[i])
	}
	totalNaoRespondidas = 35 - totalRespondidas.length
}
else
	totalRespondidas = []

if(totalErros.length != 0){
	for(let i = 0; i < totalErros.length; i++){
		let questao = totalErros[i].split(":")[0]

		if(conteudosProva[i][0].indexOf(`${questao}`) == 0)
			recomendaConteudos.push(conteudosProva[i][1])
	}
}

if(sessionStorage.getItem("comecoProva")){
	var inicioProva = sessionStorage.getItem("comecoProva")
	var finalProva = Date.parse(new Date())

	tempoDecorrido = (finalProva - inicioProva)/1000
	segundos = tempoDecorrido%60

	tempoMedioPergunta = segundos/totalRespondidas.length
	
	if(tempoDecorrido < 60){
		document.getElementById("tempo-de-simualdo").innerText = `Tempo total: ${tempoDecorrido} segundos, 
		com um tempo médio por pergunta de ${tempoMedioPergunta} segundos`
	}
	
	if(tempoDecorrido > 60){
		minutos = Math.floor(tempoDecorrido/60)

		p1 = "minutos"
		p2 = "segundos"

		if(minutos == 1) 
			p1 = "minuto"
		if(segundos == 1) 
			p2 = "segundo"

		document.getElementById("tempo-de-simualdo").innerText = `Tempo total: ${minutos} ${p1} e ${segundos} ${p2}, 
		com um tempo médio por pergunta de ${tempoMedioPergunta} segundos`
	}
}

let datas = []

if(this.localStorage.getItem('dataSimulado'))
	datas = this.localStorage.getItem('dataSimulado').split(',')

if(datas.length<2){
	this.document.getElementById('link-evolucao-usuario').href = ''
	this.document.getElementById('mensagem-evolucao-usuario').style.display = 'Block'
	this.document.getElementById('conferir-evolucao').disabled = true
}

if(totalErros.length === 0)
	document.getElementById('conteudos-estudo').style.display = 'None'
else
	document.getElementById('conteudos').innerHTML = recomendaConteudos

var porcentagemAcerto = Math.round((totalRespondidas.length / 35) * 100)

if(porcentagemAcerto == 0 || gabaritoUsuario == null){
	mensagemAcertos = 'Ops, parece que você não respondeu a nenhuma pergunta. Clique em <b>REFAZER SIMULADO</b>.'
	document.getElementById('final-simulado').innerHTML = 'Por favor, certifique-se de selecionar ao menos uma alternativa de uma questão.'
	document.getElementById('sub-t-final-simulado').innerHTML = 'Vá ao final da página e clique em <b>REFAZER SIMULADO</b>.'
	document.getElementById('info-resultado').style.display = 'None'
	document.getElementById('imprimir-resultado').style.display = 'None'
	document.getElementById('primeiro-dados-por-inteiro').style.display = 'None'
	document.getElementById('segundo-dados-por-inteiro').style.display = 'None'
}
else if(porcentagemAcerto < 25)
	mensagemAcertos = 'Infelizmente, você está na linha de rebaixamento igual o Palmeiras, pois o seu rendimento foi de '+porcentagemAcerto+'%. Continue se esforçando.'
else if (porcentagemAcerto < 50)
	mensagemAcertos = 'Você está quase lá, estude mais. O seu rendimento foi de '+porcentagemAcerto+'%. Continue se esforçando.'
else if (porcentagemAcerto < 75)
	mensagemAcertos = 'Você acertou '+totalAcertos+'% das questões do simulado. Se continuar se esforçando, obterá o resultado máximo, continue...'
else
	mensagemAcertos = 'Parabéns, sua quantidade de acertos foi igual a '+porcentagemAcerto+'%.  Nos parece que você é o filho do Einsten, não reencarne.'

document.getElementById('retorno-acertos').innerHTML = mensagemAcertos

atribuiInformacoesInteiras(totalAcertos.length, totalErros.length, 
totalNaoRespondidas, totalRespondidas.length)

montaGrafico('acertos-erros', ['Total de acertos e erros'], 'Total de acertos', 
[totalAcertos.length], 'rgba(0, 255, 0, 0.6)',  'rgba(0, 255, 0, 1)', 'Total de erros', 
[totalErros.length+totalNaoRespondidas], 'rgba(255, 0, 0, 0.6)',  'rgba(255, 0, 0, 1)', 
'Total de acertos e erros')

montaGrafico('respondidas-e-naorespondidas', ['Total de perguntas não respondidas e respondidas'],
'Total de perguntas não respondidas', [totalNaoRespondidas], 'rgba(180, 180, 180, 0.6)', 
'rgba(180, 180, 180, 1)', 'Total de perguntas respondidas', [totalRespondidas.length], 
'rgba(255, 155, 55, 0.6)', 'rgba(255, 153, 51, 1)', 'Total de perguntas não respondidas e respondidas')

function limpaSessionStorage(){
	if(sessionStorage.getItem('gabaritoUsuario'))
		sessionStorage.setItem('gabaritoUsuario', '')
}

function montaGrafico(idCanvas, labels, label1, dados1, corFundoPrimeiroGrafico, corBordaPrimeiroGrafico, 
label2, dados2, corFundoSegundoGrafico, corBordaSegundoGrafico, titulo){
	let delayed;
	var grafico = document.getElementById(idCanvas).getContext('2d');
	var dados = {
		type: "bar",
		data: {
			labels: labels,
			datasets: [{
					label: label1,
					data: dados1,
					backgroundColor: corFundoPrimeiroGrafico,
					borderColor: corBordaPrimeiroGrafico,
				},
				{
					label: label2,
					data: dados2,
					backgroundColor: corFundoSegundoGrafico,
					borderColor: corBordaSegundoGrafico,
			}]
		},
		options: {
			responsive: true,
			plugins: {
				title: {
					display: true,
					text: titulo
				},
			},
			animation: {
				onComplete: () => {
					delayed = true;
				},
				delay: (context) => {
					let delay = 0;
					if (context.type === 'data' && context.mode === 'default' && !delayed) {
						delay = context.dataIndex * 850 + context.datasetIndex * 950;
					}
					return delay;
				},
			},
			scales: {
				y: {
					display: true,
					title: {
						display: true,
						text: 'Total de perguntas'
					}
				},
			}
		}
	}
	new Chart(grafico, dados);
}

function salvaEvolucaoResetaSimulado(){
	let data = new Date()
	let diaMesAno = String(data.getDate()).padStart(2, '0') + '/' + 
	String(data.getMonth() + 1).padStart(2, '0') + '/' + data.getFullYear() 

	if(localStorage.getItem('acertosUsuario')){

		salvaDadosEvolucao(totalAcertos.length, 'acertosUsuario')
		salvaDadosEvolucao((totalErros.length+totalNaoRespondidas), 'errosUsuario')
		salvaDadosEvolucao(diaMesAno, 'dataSimulado')
		salvaDadosEvolucao(totalNaoRespondidas, 'perguntasNaoRespondidas')
		salvaDadosEvolucao(tempoDecorrido, 'tempoDecorrido')
		salvaDadosEvolucao(totalRespondidas.length, 'totalRespondida')
	}
	else{
		localStorage.setItem('acertosUsuario', totalAcertos.length)
		localStorage.setItem('errosUsuario', totalErros.length)
		localStorage.setItem('dataSimulado', diaMesAno)
		localStorage.setItem('perguntasNaoRespondidas', totalNaoRespondidas)
		localStorage.setItem('tempoDecorrido', tempoDecorrido)
		localStorage.setItem('totalRespondida', totalRespondidas.length)
	}

	sessionStorage.setItem('gabaritoUsuario', '')
	sessionStorage.setItem('paginasCorrigidas', '')
	sessionStorage.setItem('comecoProva', '')
}

function imprimirResultado(){
	window.print()
}

function salvaDadosEvolucao(valorASerArmazenado, chaveLocalStorage){
	let vetor = localStorage.getItem(chaveLocalStorage).split(',')
	vetor.push(valorASerArmazenado)
	vetor.join(' ')
	localStorage.setItem(chaveLocalStorage, vetor)
}

function atribuiInformacoesInteiras(acertos, erros, naoRespondidas, respondidas){
	let porcentAcerto = Math.round((acertos/35)*100)
	erros = erros+naoRespondidas  
	let porcentErros = Math.round((erros/35)*100)
	let porcentNaoRespondidas = Math.round((naoRespondidas/35)*100)
	let porcentRespondidas = Math.round((respondidas/35)*100)

	document.getElementById('acertos').innerHTML = `${acertos}/35 <b>(${porcentAcerto}%)</b>`   
	document.getElementById('erros').innerHTML = `${erros}/35 <b>(${porcentErros}%)</b>`
	document.getElementById('nao-respondidas').innerHTML = `${naoRespondidas}/35 <b>(${porcentNaoRespondidas}%)</b>`
	document.getElementById('respondidas').innerHTML = `${respondidas}/35 <b>(${porcentRespondidas}%)</b>`	
}

/*
apagaTestes("Acertos: ", 'acertosUsuario')
apagaTestes("Erros: ", 'errosUsuario')
apagaTestes("Data(s): ", 'dataSimulado')
apagaTestes("Em branco: ", 'perguntasNaoRespondidas')
apagaTestes("Tempo decorrido: ", 'tempoDecorrido')
apagaTestes("Total de perguntas respondidas: ", 'totalRespondida')
*/

/*
testes("Acertos: ", 'acertosUsuario')
testes("Erros: ", 'errosUsuario')
testes("Data(s): ", 'dataSimulado')
testes("Em branco: ", 'perguntasNaoRespondidas')
testes("Tempo decorrido: ", 'tempoDecorrido')
testes("Total de perguntas respondidas: ", 'totalRespondida')
*/

function testes(msg, key){
	console.log(msg + localStorage.getItem(key))
}

function apagaTestes(msg, key){
	console.log(msg + localStorage.removeItem(key))
}