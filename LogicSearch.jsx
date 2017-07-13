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
const LIMIT        = 300;
/**
 * Ancho de un smartphone.
 * 
 * @type Integer.
 */
const WIDTH_PHONE  = 640;
/**
 * Ancho de una tablet.
 * 
 * @type Integer.
 */
const WIDTH_TABLET = 768;

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
	static cleanItems(items, state, banner)
	{
		let clean = [];
		//se verifica que se un arreglo y que tenga por lo menos un elemento
		if (items instanceof Array && items.length > 0)
		{
			clean = items.reduce((result, json) => {
				let item         = {};
				item.background  = (!json.METAS.imagen_353x199) ? json.METAS.thumbnail : json.METAS.imagen_353x199;
				item.description = json.METAS.title;
				item.id          = json.CID;
				item.title       = json.METAS.topico;
				item.type        = json.TYPE;
				item.url         = json.METAS.URL;
				result.push(item);
				return result;
			}, []);

			clean = (banner === 0 ) ? this.paintBanner(clean) : clean;
			clean = (state.length > 0) ? state.concat(clean) : clean;
		}//if (items instanceof Array)


		return clean;
	}//cleanItems

	//==================================================//

	/**
	 * Se obtienen los para metros para el filtrado.
	 *
	 * @param Object DOM element Referencia ah elemento de DOM.
	 * @param Integer    pages   Numero de paginas para recargar.
	 * 
	 * @return String
	 */
	static filter(element, pages)
	{
		document.querySelector(`a.${BTN_CLASS}`).classList.remove(BTN_CLASS);
		element.classList.add(BTN_CLASS);
		window.scrollTo(0,0);
		return {
					filter : element.dataset.filter,
					start  : 0,
					state  : {
								gsa       : [],
								page      : 0, 
								totalPage : pages
							 }
			   };
	}//filter
	
	//==================================================//

	/**
	 * Realiza la carga del contenido mientras se llega al final de la ventan.
	 *
	 * @return integer
	 */
	static infinityPage(continuePage, stopPage, numPage)
	{
		let flag     = false;
		let start    = 0;
        let scroll   = (document.body.scrollHeight - window.innerHeight) - LIMIT;
        let mvScroll = (Math.floor(window.scrollY)) - LIMIT;
        let request  = {};

        if (scroll === mvScroll && continuePage < stopPage)
        {
        	continuePage += 1;
        	flag         = true;
        	start        = numPage * continuePage;
        }

        request["state"] = {page : continuePage};
        request["flag"]  = flag;
        request["start"] = start;

        return request;
	}//infinityPage

	//==================================================//

	/**
	 * Permite identificar el tipo de dispositivo.
	 *
	 * return string.
	 */
	static isMobile()
	{
        let device      = navigator.userAgent.match(/iPhone|iPad|iPod|Android/i);
        let widthScreen = window.screen.width;
        let request     = "desktop";

		if (device !== null)
		{
            if (widthScreen <= WIDTH_PHONE)
            {
                request = 'phone';
            }
            else if (widthScreen > WIDTH_PHONE && widthScreen <= WIDTH_TABLET)
            {
                request = 'tablet';
            }			
		}
		return request;
	}//isMobile

	//==================================================//

	/**
	 * Gener el espacio para integrar un banner.
	 *
	 * @param Array data  Arreglo de elementos.
	 * 
	 * @return array.
	 */
	static paintBanner(data)
	{
		const dummyItem = {banner : true};
		let item = data.shift();
				   data.pop();
		return [item, dummyItem].concat(data);
	}//paintBanner

	//==================================================//
	
	static total(numItem, numGSA, total)
	{
		let result = Math.round(numItem/numGSA);
		return (result >= total) ? total : result;
	}
}//LogicSearch

//==================================================//

/**
 * Se exporta el modulo LogicSearch.
 */
export default LogicSearch;