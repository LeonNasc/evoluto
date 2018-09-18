// Facilita a confecção de evoluções

/**
 * 1)Consiste de 4 áreas: O paciente, A prescrição, Os exames, As observações/anotações
 *   1.1) Paciente: Motivo internação, Comorbidades(lista?),Alergias, Peso
 *   1.2) A prescrição: MUPs, Análise do dia(Dieta, HV, ATB, Analgesia,TEV,Gastro,NP)
 *   1.3) Exames laboratoriais: Lista de exames do dia, próximos exames
 *   1.4) Observações/Anotações: Informações pertinentes, Problemas NPs, Intervenções, Ajustes
 * 2) Cada uma das áreas acima é preenchida a partir de formulários
 *   2.1) Cada área é uma página de formulário
 *   2.2) Opcionalmente, pode-se importar uma evolução.
 *    2.2.1) Deve ser capaz de receber evoluções e transforma-las no formato editavel
 *    2.2.1.1) Deve ser capaz de receber mais de um modelo de evolução
 * 4) A partir de cada página de formulário, fazer uma formatação única e retornar texto da evolução
 * opt.1) Pode incluir uma calculadora de Clearance
 * opt.2) Pode marcar medicamentos que necessitem de ajuste (dado uma lista destes)
 */ 

 var Leitor = {
  texto_paciente : "" ,
  texto_prescricao: "",
  texto_exames: "",
  texto_obs: "",
  set_texto : function(area, texto){
    switch(area){
	  case 'paciente':
	    this.texto_paciente = texto
	  break;
	  case 'prescricao':
	     this.texto_prescricao= texto
	  break;
	  case 'exames':
	     this.texto_exames = texto
	  break;
	  case 'obs':
	     this.texto_obs = texto
	  break;
	  default:
	  console.log('Nao ha onde inserir')
	  break;

	}
  },
//O parser � um dos parsers em EvoluParser, adequado para cada area
  ler_formulario: function(form,area,parser){
    let texto = parser(form);
    this.set_texto(area,texto);
    console.log(this.texto_paciente)
    return this;
  },
  ler_evolucao: function(evolucao){
    textos = EvoluParser.decifrar_evolucao(evolucao);
    
    //Ordem � paciente,prescricao,exames,obs
    textos.forEach(function(texto){
	//Cada texto � uma tupla
	Leitor.set_texto(area,texto.texto); 
    });
  }
 }
 
 const EvoluParser = {
   decifrar_evolucao:function(evolu){
     //TODO
   },
   limpar_exames_copiados: function(exames){

	// Em geral os exames v�m com um modelo de sigla seguido de valor, o que d� pra limpar com um regex
	// dependendo do modo como o m�dico colocou
	return Leitor.set_texto('exames', exames);
   },
   parse_paciente(form){

   	let internacao = form.intern.value;

	//Comorbidades pode ser um conjunto de checkboxes, ou um csv
	let comorbidades = form.comorb.value.split(",");

       //Alergias � uma lista contendo todas as alergias do paciente, separadas por virgula
 	let alergias = form.alergias.value.split(",");

	let peso = form.peso.value;

	texto = {"internacao": internacao ,"comorb": comorbidades , "alergias": alergias ,"peso": peso};

	return Formatador.formatar_texto(texto,txt_formatadores.formatador_paciente)
   },
   parse_prescricao(form){

	//Deve vir como lista de atbs + dose + dia
	if('atb' in form){	
	    atb = form.atb.value.split(/\+|,/);
            atb_dias = form.atb_dias.value.split(/\+|,/);
	}
	else{
	 atb = 'N�o Prescrito'
	 atb_dias = 0
	}

 	if('ulcer' in form){ 
	  ulcer = form.ulcer.value.split(/\+|,/);
	}
	else{
	  ulcer  = 'N�o Prescrito'
	}

	if('tev' in form){
          tev = form.tev.value.split(/\+|,/);
	}
	else{
          tev = 'N�o prescrito';
	}

	if('np' in form){
	//Deve vir como 'item, item, item'
          np = form.np.value.split(/\+|,/);
	}
	else{
          np  = 'N�o prescrito';
	}
	if('analgesia' in form){
	//Pode vir como 'item + item', ou 'item, item'
	  analgesia = form.analgesia.value.split(/\+|,/);
	}
	else{
	  analgesia  = 'N�o prescrito';
	}

	let texto = {'atb': {'medicamentos':atb,'duracao':atb_dias},
		     'ulcer': ulcer,
		     'tev': tev,	
		     'analgesia': analgesia,
		     'np': np};

	return Formatador.formatar_texto(texto,txt_formatadores.formatador_prescricao);
		
   },
   parse_exames(form){

	let texto =  '';

	//Cada exame � um item de uma lista
	form.forEach(function(exame){
		texto += `${exame.nome} : ${exame.valor} /`
	});

	texto = texto.slice(0,-1);
	
	return Formatador.formatar_texto(texto,txt_formatadores.formatador_exame)
   }
 }

 
 const Escritor = {
   escrever: function(texto){
     
   }
 }
 
 var Formatador ={
  formatar_texto: function(texto,formatador){
    //Formatador é função
    return formatador(texto);
  } 
 }
 
 const txt_formatadores = {
   formatador_paciente : function(texto){
	let str = `Pela Farm�cia Cl�nica

Motivo de interna��o: ${texto.internacao}
Comorbidades: ${texto.comorb.join(",").toUpperCase()}
Alergias: ${texto.alergias.join(",").toUpperCase()}
Peso: ${texto.peso} kg`

	return str;
},
   formatador_prescricao : function(texto){
	var texto_atb = '';	
	with(texto.atb){
		for(i=0;i<medicamentos.length;i++){
		  texto_atb +=  `+ ${medicamentos[i]} (D${duracao[i]})`	
		}
	}
	for(var entrada in texto){	
		if(typeof texto[entrada] == 'object' && entrada != 'atb'){
			texto[entrada] = texto[entrada].join(" + ")
		}
	};
	let str = `An�lise da prescri��o em ${Date.now()}
Antibioticoterapia: ${texto_atb.slice(1)}
Profilaxia de �lcera g�strica: ${texto.ulcer}
Profilaxia de TEV: ${texto.tev}
Analgesia: ${texto.analgesia}
N�o-Padr�o: ${texto.np}

`
	return str;
   },
   formatador_exames : function(texto){
     //TODO
   },
   formatador_observações : function(texto){
     //TODO
   },
 }
