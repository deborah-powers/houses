function replaceAll (text, oldWord, newWord){
	var textList = text.split (oldWord);
	text = textList.join (newWord);
	return text;
}
function cleanJsonTextList (jsonText){
	// le json est une liste d'objets
	// separer les objets, isoler les balises ouvrantes et fermantes de la liste
	jsonText = replaceAll (jsonText, '{','\n{');
	jsonText = replaceAll (jsonText, '}]','}\n]');
	// separer les champs d'un objet
	jsonText = replaceAll (jsonText, '","', '",\n\t"');	// les strings
	jsonText = replaceAll (jsonText, ',"', ',\n\t"');	// les nombres
	jsonText = replaceAll (jsonText, '": ', '":\t');
	jsonText = replaceAll (jsonText, '":', '":\t');
	// balises ouvrantes et fermantes d'un objet
	jsonText = replaceAll (jsonText, '{', '{\n\t');
	jsonText = replaceAll (jsonText, '}', '\n}');
	return jsonText;
}

export default cleanJsonTextList;