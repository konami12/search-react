/**
 * Module dependencies.
 */
import React, { Component } from "react";
/**
 * Components for the ui-reflex search.
 */
import ContentResults from "../shared/ContentResults.jsx";
import TitleSearch from "../shared/TitleSearch.jsx";

/**
 * Muestra los errores del buscadro.
 *
 * @category   ReflexSearch
 * @package    ReflexSearch/Components
 * @subpackage Containers
 */
class ErrorSearch extends Component
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
	 * @retrun <ErrorSearch> (Componente).
	 */
	render()
	{
		return (<article>
					{/* BEGIN : Contenedor principal */}
					<section className="prime-secciones">
						{/* BEGIN : mensaje 1 */}
						<TitleSearch msg_result={this.props.msg_result} param_search={this.props.param_search}/>
						{/* BEGIN : mensaje 2 */}
						<div className="secccion_alerta">
							<p className="alerta">
								<img alt="Error en la busqueda" src="http://i2.esmas.com/las-estrellas/assets/img/alerta.svg"/>
							</p>
						</div>
						{/* BEGIN : mensaje 3 */}
						<p className="prime-secciones__title_2">
							{this.props.msg_error}<br/>{this.props.msg_recomend}
						</p>
						{/* END   : Fin de los mensaje */}
					</section>
					{/* END   : Contenedor principal */}
					<ContentResults key="ui-reflex-bad-container" req_gsa={this.props.req_gsa}/>
				</article>);
	}//render
}//ErrorSearch

/**
 * Props por defecto.
 * 
 * @type JSON
 */
ErrorSearch.defaultProps = {
								msg_error    : "Lo sentimos, tú búsqueda no arrojó resultados",
								msg_recomend : "pero te recomendamos:",
								msg_result   : "resultados de búsqueda de: ",
								param_search : window.location.hash.replace('#', ''),
								req_gsa      : []
						   };

/**
 * Se exporta el modulo ErrorSearch.
 */
export default ErrorSearch;