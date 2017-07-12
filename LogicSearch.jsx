//=================== CONSTANTES ===================//

/**
 * Numero de elementos por default en el caso de error.
 * 
 * @type Integer
 */
const BTN_CLASS = "prime-secciones__buttons_selective";
/**
 * Limite para inciar la carga de contenido.
 * 
 * @type Integer
 */
const LIMIT = 300;

//==================================================//

/**
 * Buscador ui-reflex.
 *
 * @category   UI-Reaflex
 * @package    UI-Reaflex/components
 * @subpackage ReflexSearch
 */
class LogicSearch
{
	/**
	 * Realiza un limpieza de los resultados de GSA.
	 *
	 * @param Array items  Arreglo de los items regresador por GSA.
	 *
	 * @return Array
	 */
	static cleanItems(items, state)
	{
		let clean = [];

		//se verifica que se un arreglo y que tenga por lo menos un elemento
		if (items instanceof Array && items.length > 0)
		{
			clean = items.reduce((result, json) => {
				let item         = {};
				item.background  = json.METAS.imagen_353x199;
				item.description = json.METAS.title;
				item.id          = json.CID;
				item.title       = json.METAS.topico;
				item.type        = json.TYPE;
				item.url         = json.METAS.URL;
				result.push(item);
				return result;
			}, []);

			if (state.length > 0)
			{
				
				clean = state.concat(clean);
			}
		}//if (items instanceof Array)

		return clean;
	}//cleanItems
	
	//==================================================//

	/**
	 * Se obtienen los para metros para el filtrado.
	 *
	 * @param Object DOM element Referencia ah elemento de DOM.
	 * 
	 * @return String
	 */
	static filter(element)
	{
		document.querySelector(`a.${BTN_CLASS}`).classList.remove(BTN_CLASS);
		element.classList.add(BTN_CLASS);
		window.scrollTo(0,0);
		return {
					filter : element.dataset.filter,
					start  : 0,
					state  : {
								action : 0, 
								gsa    : [],
							 }
			   };
	}//filter
	
	//==================================================//

	/**
	 * Realiza la carga del contenido mientras se llega al final de la ventan.
	 *
	 * @return integer
	 */
	static infinityPage(action, total, elements)
	{
		let scroll   = (document.body.scrollHeight - window.innerHeight) - LIMIT;
		let mvScroll = (Math.floor(window.scrollY)) - LIMIT;
		let start    = 1;
		let flag     = false;

		if (mvScroll === scroll && action < total)
		{
			action += 1;
			start  = elements * action;
			flag   = true
		}
		return {
				action : action,
				flag   : flag,
				start  : start
			   };
	}//infinityPage

}//LogicSearch

//==================================================//

/**
 * Se exporta el modulo LogicSearch.
 */
export default LogicSearch;