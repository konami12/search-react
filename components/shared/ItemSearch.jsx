/**
 * Module dependencies.
 */
import React, { Component } from "react";

//=================== CONSTANTES ===================//

/**
 * Referencia al icono.
 * 
 * @type String.
 */
const PATH_ICON = "http://i2.esmas.com/las-estrellas/assets/img/";

//==================================================//

/**
 * Vista para los items de la busqueda.
 *
 * @category   ReflexSearch
 * @package    ReflexSearch/Components
 * @subpackage Shared
 */
class ItemSearch extends Component
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
	 * Permite indicar el tipo de icono que tendra el item.
	 *
	 * @return tag html.
	 */
	get iconType()
	{
		let element = "";
		if (this.props.type !== "article")
		{
			const icon = (this.props.type === "video") ? "play" : "photo";
			element = <img alt={`icon-${this.props.type}`} className="icono-play" src={`${PATH_ICON}${icon}.png`} title={`${this.props.type} : ${this.props.title}`}/>;
		}
		return element;
	}//get iconType()

	//==================================================//

	/**
	 * Permite realizar el rendereo del componente.
	 *
	 * @retrun <ItemSearch> (Componente).
	 */
	render()
	{
		return (<div className="reflex-mosaic-01__item">
					{/* BEGIN : Balidacion par identificar espacios para banners */}
					{!this.props.banner &&
						(<article className="reflex-mosaic-01__item-article">
							<a href={this.props.url} title={this.props.description}>
								{/* BEGIN : Contenedor imagen */}
								<div className="reflex-mosaic-01__img">
									<img alt={`imagen - ${this.props.description}`} className="imagen-fondo" src={this.props.background} title={this.props.title}/>
									{this.iconType}
								</div>
								{/* END   : Contenedor imagen */}
								
								{/* BEGIN : Descripcion del item */}
								<div className="reflex-mosaic-01__description color-telenovelas">
									<p className="reflex-mosaic-01__title">{this.props.title}</p>
									<p className="reflex-mosaic-01__desc">{this.props.description}</p>
								</div>
								{/* END   : Descripcion del item */}
							</a>
						</article>)}
					{/* END   : Balidacion par identificar espacios para banners */}
				</div>);
	}//render
}//ItemSearch

//==================================================//

/**
 * Props por defecto.
 * 
 * @type JSON
 */
ItemSearch.defaultProps = {
							banner      : false,
							background  : "",
							description : "descripcion",
							title       : "titulo",
							type        : "gallery",
							url         : window.location.origin
						  };

//==================================================//

/**
 * Se exporta el modulo ItemSearch.
 */
export default ItemSearch;