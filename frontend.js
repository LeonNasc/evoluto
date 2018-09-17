function novo_form(form_function,target){
	//Form_function é uma função que retorna um form pronto
	area = document.getElementById(target.replace("_check",""));
	console.log(area);
	area.innerHTML = form_function(target);

}


function multi_item_form(form_type){

	txt = `<input type="text" name='${form_type}' placeholder='Insira os items separados por vírgula'/>`

	return txt;
}

function atb_form(form_type){
	//Inclui a duração de tratamento do antibiotico
	duracao = `<input type="text" name="atb_dias" placeholder="Insira a duração no modelo [dia/max] Ex.: 1/7"/>` 
	
	return multi_item_form(form_type) +  duracao;
}

