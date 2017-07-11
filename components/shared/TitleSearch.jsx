/**
 * Module dependencies.
 */
import React, { Component } from "react";

/**
 * Vista para los items de la busqueda.
 *
 * @category   ReflexSearch
 * @package    ReflexSearch/Components
 * @subpackage Shared
 */
class TitleSearch extends Component
{
	/**
	 * Funcion principal.
	 *
	 * @param JSON props propiedades el componente.
	 *
	 * @return void.
	 */
	constructor(props)
	{
		//se realiza el llamado del constructor
		//de la calse que se esta extendiendo.
		super(props);
	}//constructor

	//==================================================//

	/**
	 * Permite realizar el rendereo del componente.
	 *
	 * @retrun <TitleSearch> (Componente).
	 */
	render()
	{
		return (<p id="title-results" className="prime-secciones__title">
					{this.props.msg_result.toUpperCase()}
					<strong> {this.props.param_search.toUpperCase()}</strong>
				</p>);
	}//render
}//TitleSearch

//==================================================//

/**
 * Props por defecto.
 * 
 * @type JSON
 */
TitleSearch.defaultProps = {
								msg_result   : "resultados de búsqueda de: ",
								param_search : window.location.hash.replace('#', ' '),
						   };

/**
 * Se exporta el modulo TitleSearch.
 */
export default TitleSearch;