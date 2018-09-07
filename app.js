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
    //TODO
  },
  ler_formulario: function(form,area){
    //TODO
  },
  ler_evolucao: function(evolucao){
    //TODO
  }
 }
 
 const EvoluParser = {
   decifrar_evolução:function(evolu){
     //TODO
   }
 }
 
 const Escritor = {
   escrever: function(texto){
     
   }
 }
 
 var Formatador = {
  texto_paciente_f : "" ,
  texto_prescricao_f: "",
  texto_exames_f: "",
  texto_obs_f: "",
  set_texto : function(area, texto){
    //TODO
  },
  formatar_texto: function(area,texto,formatador){
    //Formatador é função
    //TODO
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