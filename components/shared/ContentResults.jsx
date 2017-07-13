/**
 * Module dependencies.
 */
import React, { Component } from "react";
import PropTypes from 'prop-types';
/**
 * Components for the ui-reflex search.
 */
import ItemSearch from "./ItemSearch.jsx";

/**
 * Muestra los resultados de una peticion GSA.
 *
 * @category   ReflexSearch
 * @package    ReflexSearch/Components
 * @subpackage Containers
 */
class ContentResults extends Component
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
	 * @retrun <ContentResults> (Componente).
	 */
	render()
	{
		let result = (this.props.req_gsa === null) ? '' : this.props.req_gsa.map((item, index) => <ItemSearch key={`item${index}-${item.id}`} {...item}/>);

		return (<div className="refelx-mosaic-01 ancho_dos dos-pisos refelx-mosaic-01__0">
					<div className="refelx-mosaic-01__cuerpo__columna-2">
						<section className="refelx-mosaic-01__content">
							{result}
						</section>
					</div>
				</div>);
	}//render

}//ContentResults

//==================================================//

/**
 * Props por defecto.
 * 
 * @type JSON
 */
ContentResults.defaultProps = {req_gsa : null};

//==================================================//

/**
 * Se exporta el modulo ContentResults.
 */
export default ContentResults;