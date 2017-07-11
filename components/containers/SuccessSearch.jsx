/**
 * Module dependencies.
 */
import React, { Component } from "react";
/**
 * Components for the ui-reflex search.
 */
import ContentResults from "../shared/ContentResults.jsx";
import TitleSearch from "../shared/TitleSearch.jsx";

//==================================================//

const BTN_CLASS       = "prime-secciones__buttons_selective";
const FILTER_CAPITULO = "post_type:post.format:video.videotype:full-episode";
const FILTER_FOTO     = "post_type:post.format:gallery";
const FILTER_FULL     = "post_type:post" 
const FILTER_NOTAS    = "(post_type:post.format:standard)|(format:video.videotype:recap)";
const FILTER_VIDEO    = "post_type:post.format:video.videotype:clip";

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
		return (<article>
                    {/* BEGIN : Contenedor principal */}
                    <section className="prime-secciones">
                        {/* BEGIN : mensaje 1 */}
                        <TitleSearch msg_result={this.props.msg_result} param_search={this.props.param_search}/>
                        {/* BEGIN : Botonera para el manejo de filtros */}
                        <div className="prime-secciones__buttons">
                            <a data-filter={FILTER_FULL} className={BTN_CLASS} href={`#${this.props.param_search}`} onClick={this.filter} title={this.props.btn_1}>{this.props.btn_1}</a>
                            <a data-filter={FILTER_FOTO} href={`#${this.props.param_search}`} onClick={this.filter} title={this.props.btn_2}>{this.props.btn_2}</a>
                            <a data-filter={FILTER_VIDEO} href={`#${this.props.param_search}`} onClick={this.filter} title={this.props.btn_3}>{this.props.btn_3}</a>
                            <a data-filter={FILTER_CAPITULO} href={`#${this.props.param_search}`} onClick={this.filter} title={this.props.btn_4}>{this.props.btn_4}</a>
                            <a data-filter={FILTER_NOTAS} href={`#${this.props.param_search}`} onClick={this.filter} title={this.props.btn_5}>{this.props.btn_5}</a>
                        </div>
                        {/* END   : Botonera para el manejo de filtros */}
                    </section>
                    {/* END   : Contenedor principal */}
                    <ContentResults key="ui-reflex-ok-container" req_gsa={this.props.req_gsa}/>
               </article>);
	}//render

}//SuccesSearch

/**
 * Props por defecto.
 * 
 * @type JSON
 */
SuccessSearch.defaultProps = {
                                msg_result   : "resultados de búsqueda de: ",
                                param_search : window.location.hash.replace('#', ''),
                                req_gsa      : []
                             };


/**
 * Se exporta el modulo SuccessSearch.
 */
export default SuccessSearch;