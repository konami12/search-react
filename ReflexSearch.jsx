/**
 * Module dependencies.
 */
import React, { Component } from "react";
import { render as RenderDom } from "react-dom";
import ClientGSA from "../ClientGSA/ClientGSA.jsx";
/**
 * Components for the ui-reflex search.
 */
import ErrorSearch from "./components/containers/ErrorSearch.jsx";
import SuccessSearch from "./components/containers/SuccessSearch.jsx";

//==================================================//

const NUM_ELEMENT = 3;
const BTN_CLASS   = "prime-secciones__buttons_selective";


//==================================================//

/**
 * Buscador ui-reflex.
 *
 * @category   UI-Reaflex
 * @package    UI-Reaflex/components
 * @subpackage ReflexSearch
 */
class ReflexSearch extends Component
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

		/**
		 * Referencia al cliente GSA.
		 * 
		 * @type ClientGSA.
		 */
		this.Client = new ClientGSA();

		//Estado que con los que estara trabajando el buscador
		this.state = {
						concat    : false,
						component : "success",
						gsa       : [],
						loading   : false,
						total     : 0,
					 };

		this.filter   = this.filter.bind(this);
		this.infinity = this.infinity.bind(this);
		this.element  = parseInt(props.config_gsa.num);
	}//constructor

	//==================================================//
	// Metodos de ciclos de vida 					    //
	//==================================================//

	/**
	 * El componente ya esta mondato.
	 *
	 * return void.
	 */
	componentDidMount() 
	{
		this.props.config_gsa.q += ` ${this.props.search_param}`;
		this.query;
		window.addEventListener("scroll", this.infinity);
	}//componentDidMount()

	//==================================================//
	// Metodos internos del componente padre            //
	//==================================================//

	/**
	 * Permite limpiar la consulta GSA para obtener los campos requeridos.
	 *
	 * return array.
	 */
	get cleanItems()
	{
		let output = [];
		if (this.state.gsa instanceof Array)
		{
			output = this.state.gsa.reduce((items, json) => {
				let item         = {};
	            item.background  = json.METAS.imagen_353x199;
	            item.description = json.METAS.title;
	            item.id          = json.CID;
	            item.title       = json.METAS.topico;
	            item.type        = json.TYPE;
	            item.url         = json.METAS.URL;
	            items.push(item);
				return items;
			}, []);
		}//if (this.state.gsa instanceof Array)

		return output;
	}//formatItem

	//==================================================//

	/**
	 * Permite realizar el filtrado de la consulta GSA.
	 *
	 * return void.
	 */
	filter(contexto)
	{
		const FILTER = contexto.dataset.filter;
		document.querySelector(`a.${BTN_CLASS}`).classList.remove(BTN_CLASS);
		contexto.classList.add(BTN_CLASS);
		this.props.config_gsa.requiredfields = FILTER;
		this.query;
	}//filter
 
	//==================================================//

	infinity()
	{
		if (!this.state.loading){ return null};

		let scroll   = document.body.scrollHeight - window.innerHeight;
		let mvScroll = Math.floor(window.scrollY);

		if (mvScroll === scroll)
		{
			this.props.config_gsa.start = parseInt(this.props.config_gsa.start) + this.element;
			this.state.concat = true;
			this.query;
		}
		return 0;
	}

	//==================================================//
	/**
	 * Realiza la peticion GSA.
	 *
	 * return void.
	 */
	get query()
	{
		this.Client.json = this.props.config_gsa;
		this.Client.json
						.then(data => {
							this.setState({
											gsa     : this.state.gsa.concat(data), 
											loading : (data === null) ? false : true,
											total   : this.Client.totalItems
	   							         });
	   						if (data === null)
	   						{
	   							this.props.config_gsa.num = NUM_ELEMENT;
								this.props.config_gsa.q   = this.props.query_error;
								this.query;
								this.setState({component :"error"});
	   						}
						})
						.catch(error => {
							this.setState({
											component : "error",
											gsa       : null, 
											loading   : true
										  });
							console.error("Error en peticion gsa => %O", error);
						});//this.Client.json
		return 0;
	}//query

	//==================================================//

	/**
	 * Determina los estados de los resultados
	 *
	 * @return react-component.
	 */
	get search()
	{
		let component = <h1>Cargando . . . . . . . </h1>;

		if (this.state.loading)
		{
			const BTN = this.props.txt_btn;
			const GSA = this.cleanItems;
			const MSG = this.props.txt_msg;

			component = (this.state.component === "error") 
				? <ErrorSearch key="ui-reflex-bad" req_gsa={GSA} {...MSG} /> 
				: <SuccessSearch key="ui-reflex-ok" {...BTN} req_gsa={GSA} {...MSG} onFilter={this.filter}/>;
		}
		return component;
	}//resultSearch()

	//==================================================//

	/**
	 * Permite realizar el rendereo del componente.
	 *
	 * @retrun <ReflexSearch> (Componente).
	 */
	render()
	{
		return this.search;
	}//render
}//ReflexSearch

//=================== CONSTANTES ===================//

const CONTAINER   = document.getElementById("react-ui-reflex-search");
const JSON_MASTER = JSON.parse(CONTAINER.dataset.config);

const PROPS = {
				config_gsa   : JSON_MASTER.gsa, 
				search_param : window.location.hash.replace('#', ''),
				txt_btn      : JSON_MASTER.btn,
				txt_msg      : JSON_MASTER.msg,
				query_error  : JSON_MASTER.gsa.q
			  };

RenderDom(<ReflexSearch key="ui-reflex-search" {...PROPS} />, CONTAINER);

/**
 * Se exporta el modulo ReflexSearch.
 */
export default ReflexSearch;