/**
 * Module dependencies.
 */
import React, { Component } from "react";
/**
 * Components for the ui-reflex search.
 */
import ContentResults from "../shared/ContentResults.jsx";

//=================== CONSTANTES ===================//

/**
 * Referencia ah la imagen de error.
 * 
 * @type String.
 */
const PATH_ERROR = "http://i2.esmas.com/las-estrellas/assets/img/alerta.svg";

//==================================================//

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
	 * @retrun <ErrorSearch/>.
	 */
	render()
	{
		return (<section className="prime-secciones">
					<section className="prime-secciones">
						<div className="secccion_alerta">
							<p className="alerta">
								<img alt="Error en la busqueda" src={PATH_ERROR}/>
							</p>
						</div>
						<p className="prime-secciones__title_2">
							{this.props.msg_error}<br/>{this.props.msg_recomend}
						</p>
					</section>
					<ContentResults key="ui-reflex-bad-container" req_gsa={this.props.req_gsa}/>
				</section>);
	}//render
}//ErrorSearch

//==================================================//

/**
 * Props por defecto.
 * 
 * @type JSON
 */
ErrorSearch.defaultProps = {
								msg_error     : "Lo sentimos, tú búsqueda no arrojó resultados",
								msg_recommend : "pero te recomendamos:",
								req_gsa       : []
						   };

//==================================================//

/**
 * Se exporta el modulo ErrorSearch.
 */
export default ErrorSearch;