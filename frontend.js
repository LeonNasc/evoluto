function novo_form(form_function,target){
	//Form_function é uma função que retorna um form pronto
	target = target.replace("_check","");
	area = document.getElementById(target);
	area.innerHTML = form_function(target);

}


function multi_item_form(form_type){
	label = `<label for=${form_type}>${form_types[form_type]}</label>`
	txt = `<input type="text" name='${form_type}' placeholder='Insira os items separados por vírgula'/>`

	return label + txt;
}

var form_types = {
 'atb': 'Antibiótico',
 'ulcer': 'Profilaxia de úlcera gástrica',
 'tev': 'Profilaxia de TEV',
 'analgesia': 'Analgesia',
 'np' : 'Não-padrão'
}
		

function atb_form(form_type){
	//Inclui a duração de tratamento do antibiotico
	label_d = `<label for="atb_dias"> Duração do tratamento</label>`
	duracao = `<input type="text" name="atb_dias" placeholder="Insira a duração no modelo [dia/max] Ex.: 1/7"/>` 
	
	return multi_item_form(form_type) + label_d +  duracao;
}
function make_another_atb(form_type,count){

	return atb_form('atb').replace(/atb/g,`$a_${count}`) 
}
function delete_form_item(formitem){
	return formitem = ''
}
