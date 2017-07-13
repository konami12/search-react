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
 * class para los botones activos.
 * 
 * @type String
 */
const BTN_CLASS = "prime-secciones__buttons_selective";
/**
 * Filtro para mostrar capitulos completos.
 * 
 * @type String.
 */
const FILTER_CAPITULO = "post_type:post.format:video.videotype:full-episode";
/**
 * Filtro para mostrar galerias.
 * 
 * @type String.
 */
const FILTER_FOTO = "post_type:post.format:gallery";
/**
 * Filtro para mostrar videos, notas, galerias.
 * 
 * @type String.
 */
const FILTER_FULL = "post_type:post" 
/**
 * Filtro para mostrar notas.
 * 
 * @type String.
 */
const FILTER_NOTAS = "(post_type:post.format:standard)|(format:video.videotype:recap)";
/**
 * Filtro para mostrar videos.
 * 
 * @type String.
 */
const FILTER_VIDEO = "post_type:post.format:video.videotype:clip";
/**
 * Parametro de busqueda.
 * 
 * @type String.
 */
const PARAM_SEARCH = window.location.hash.replace('#', '');

//==================================================//

/**
 * Muestra los errores del buscadro.
 *
 * @category   ReflexSearch
 * @package    ReflexSearch/Components
 * @subpackage Containers
 */
class SuccessSearch extends Component
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
        this.filter = this.filter.bind(this);
        
    }//constructor


    filter(contexto)
    {
       //console.log(contexto.target);
       this.props.onFilter.call(null, contexto.target);
    }

    //==================================================//

    /**
     * Permite realizar el rendereo del componente.
     *
     * @retrun <SuccessSearch> (Componente).
     */
	render()
	{
		return (<section className="prime-secciones">
                    <section className="prime-secciones">
                        <div className="prime-secciones__buttons">
                            <a data-filter={FILTER_FULL} className={BTN_CLASS} href={`#${PARAM_SEARCH}`} onClick={this.filter} title={this.props.btn_all}>{this.props.btn_all}</a>
                            <a data-filter={FILTER_FOTO} href={`#${PARAM_SEARCH}`} onClick={this.filter} title={this.props.btn_photo}>{this.props.btn_photo}</a>
                            <a data-filter={FILTER_VIDEO} href={`#${PARAM_SEARCH}`} onClick={this.filter} title={this.props.btn_video}>{this.props.btn_video}</a>
                            <a data-filter={FILTER_CAPITULO} href={`#${PARAM_SEARCH}`} onClick={this.filter} title={this.props.btn_chapter}>{this.props.btn_chapter}</a>
                            <a data-filter={FILTER_NOTAS} href={`#${PARAM_SEARCH}`} onClick={this.filter} title={this.props.btn_note}>{this.props.btn_note}</a>
                        </div>
                    </section>
                    <ContentResults key="ui-reflex-ok-container" req_gsa={this.props.req_gsa}/>
               </section>);
	}//render

}//SuccesSearch

//==================================================//

/**
 * Props por defecto.
 * 
 * @type JSON
 */
SuccessSearch.defaultProps = {
                                btn_all     : "todos",
                                btn_chapter : "capítulos",
                                btn_note    : "notas",
                                btn_photo   : "fotos",
                                btn_video   : "videos",
                                req_gsa     : []
                             };

//==================================================//

/**
 * Se exporta el modulo SuccessSearch.
 */
export default SuccessSearch;