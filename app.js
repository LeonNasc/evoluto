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
    switch(area):
	  case 'paciente':
	    texto_paciente = texto
	  break;
	  case 'prescricao':
	    texto_prescricao= texto
	  break;
	  case 'exames':
	    texto_exames = texto
	  break;
	  case 'obs':
	    texto_obs = texto
	  break;
	  default:
	  console.log('Nao ha onde inserir')
	  break;

  },
//O parser � um dos parsers em EvoluParser, adequado para cada area
  ler_formulario: function(form,area,parser){
    let texto = parser(form);
    this.set_texto(area,texto);

    return true
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
   }
   parse_paciente(form){
     //TODO
     let internacao = form.intern.value;
     //Comorbidades pode ser um conjunto de checkboxes, ou um csv
     let comorbidades = form.comorb.value.split(",");
     //Alergias � uma lista contendo todas as alergias do paciente, separadas por virgula
     let alergias = form.alergias.value.split(",");
     let peso = form.peso.value;

     let texto = internacao + "\n" + comorbidades + "\n" + alergias + "\n" + peso

     return Formatador.formatar_texto(texto,txt_formatadores.formatador_paciente)
   }
   parse_prescricao(form){
     //TODO
   }parse_exames(form){
     //TODO
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
     //TODO
   },
   formatador_prescricao : function(texto){
     //TODO
   },
   formatador_exames : function(texto){
     //TODO
   },
   formatador_observações : function(texto){
     //TODO
   },
 }
