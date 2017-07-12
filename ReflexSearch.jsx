/**
 * Module dependencies.
 */
import React, { Component } from "react";
import { render as RenderDom } from "react-dom";
import ClientGSA from "../ClientGSA/ClientGSA.jsx";
import LogicSearch from "./LogicSearch.jsx";
/**
 * Components for the ui-reflex search.
 */
import ErrorSearch from "./components/containers/ErrorSearch.jsx";
import SuccessSearch from "./components/containers/SuccessSearch.jsx";

//=================== CONSTANTES ===================//

/**
 * Numero de elementos por default en el caso de error.
 * 
 * @type Integer
 */
const NUM_ELEMENT  = 3;
/**
 * Parametro de busqueda.
 * 
 * @type String.
 */
const PARAM_SEARCH = window.location.hash.replace('#', ' ');

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
	 * @param JSON props Propiedades del componente.
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

		//Delcaracion de estados.
		this.state = {
						action    : 1,
						component : "ok",
						gsa       : [], 
						loading   : false,
						total     : 0
					 };

		//funciones especiales
		this.onFilter   = this.onFilter.bind(this);
		this.onInfinity = this.onInfinity.bind(this);
		this.num        = parseInt(this.props.config_gsa.num);
	}//consturctor

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
		this.props.config_gsa.q += `${PARAM_SEARCH}`;
		this.query;
		//se asigna el evento de scroll infinito
		window.addEventListener("scroll", this.onInfinity);
	}//componentDidMount()

	//==================================================//

	/**
	 * El componente esta por montarse.
	 *
	 * return void.
	 */
	componentWillMount()
	{
		window.removeEventListener("scroll", this.onInfinity);
	}//componentWillMount()

	//==================================================//
	// Metodos internos del componente padre            //
	//==================================================//

	/**
	 * Realiza el filtrado de la busqueda de pendiendo de la opcion dada.
	 *
	 * @param Object DOM element Referencia ah elemento de DOM.
	 *
	 * @return void. 
	 */
	onFilter(element)
	{
		const FILTER                         = LogicSearch.filter(element);
		this.props.config_gsa.requiredfields = FILTER.filter;
		this.props.config_gsa.start          = FILTER.start;
		this.setState(FILTER.state);
		this.query;
	}//onFilter

	//==============================================//

	/**
	 * Permite realizar la carga mediande la accion de scroll infinity.
	 *
	 * @return void;
	 */
	onInfinity()
	{
		//se valida que el componente ya este montaddo
		if (!this.state.loading && this.state.component === "ok")
		{ 
			return null; 
		}
		else
		{
			let loadPage = LogicSearch.infinityPage(this.state.action, this.state.total, this.num);

			if (loadPage.flag)
			{
				this.setState({action : loadPage.action});
				this.props.config_gsa.start = loadPage.start;
				this.query;
			}//if (loadPage.flag)
		}
	}//onInfinity

	//==============================================//

	/**
	 * Realiza la consulta GSA
	 *
	 * .retrun 0;
	 */
	get query()
	{
		//se carga los parametros de la busqueda
		this.Client.json = this.props.config_gsa;

		//se realiza la peticion
		this.Client.json
		.then(data => {
			if (data === null)
			{
				this.props.config_gsa.num = NUM_ELEMENT;
				this.props.config_gsa.q   = this.props.config_gsa.q.replace(`${PARAM_SEARCH}`, '');
				this.setState({component : "bad"});
				this.query;
			}//if (data === null)

			else
			{
				this.setState({
								gsa     : LogicSearch.cleanItems(data, this.state.gsa), 
								loading : true,
								total   : Math.floor(this.Client.totalItems/this.num)
	   				         });				
			}//else 
		})
		.catch(error => {
			this.setState({
							component : "bad",
							gsa       : null, 
							loading   : true
	   			         });
			console.error("Error => %O", error);
		});

		return 0;
	}//query

	//==============================================//

	/**
	 * Permite realizar el render del componente.
	 *
	 * @return <ReflexSearch />.
	 */
	render()
	{
		let build = <h1>Cargando . . . . . . . </h1>;

		if (this.state.loading)
		{
			//se definen los props para ErrorSearch.
			const PROPS_ERROR = {
									msg_error     :this.props.msg_error,
							    	msg_recommend :this.props.msg_recommend,
									req_gsa       :this.state.gsa
							    };

			//se definen los props para SuccessSearch.
			const PROPS_SUCCESS = {

									btn_all     : this.props.btn_all,
									btn_chapter : this.props.btn_chapter,
									btn_note    : this.props.btn_note,
									btn_photo   : this.props.btn_photo,
									btn_video   : this.props.btn_video,
									onFilter    : this.onFilter,
									req_gsa     : this.state.gsa
							      };

			//se determina que componente sera cargado.
			let component = (this.state.component === "bad")
							? <ErrorSearch   key="ui-reflex-bad" {...PROPS_ERROR}/>
							: <SuccessSearch key="ui-reflex-key" {...PROPS_SUCCESS}/>

			//se realiza la consturccion del componente 
			build = (<section className="prime-secciones">
						<p id="title-results" className="prime-secciones__title">
							{this.props.msg_result}
							<strong>{PARAM_SEARCH}</strong>
						</p>
						{component}
					 </section>);
		}//if (this.state.loading)

		return build;
	}//render

}//ReflexSearch

//================= INICIALUZACION =================//

const CONTAINER   = document.getElementById("react-ui-reflex-search");
const JSON_MASTER = JSON.parse(CONTAINER.dataset.config);
RenderDom(<ReflexSearch {...JSON_MASTER}/>, CONTAINER);


//==================================================//

/**
 * Se exporta el modulo ReflexSearch.
 */
export default ReflexSearch;