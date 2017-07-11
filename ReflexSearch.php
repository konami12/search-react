<?php
/*
Component name: Reflex Search
Component description: Reflex Search made with UI Reflex
*/

if (!defined('WPINC')) {
    die;
}

class UI_ReflexSearch_Component {
    
    function __construct() {
        add_action('vc_before_init', array($this, 'integrateComponent'));
        add_shortcode('reflex-search', array($this, 'renderComponent'));
    }

    public function integrateComponent() {
        vc_map(array(
            "name" => __("Reflex Search", "my-text-domain"),
            "description" => __("Reflex Search made with UI Reflex", "my-text-domain"),
            "base" => "reflex-search",
            "icon" => "https://cdn1.iconfinder.com/data/icons/free-98-icons/32/search-32.png",
            "show_settings_on_create" => false,
            "category" => __("Reflex", "my-text-domain"),
            "params" => array(
                array(
                    "type" => "dropdown",
                    "holder" => "div",
                    "heading" => __("Modos para el mosaico de resultados", "my-text-domain"),
                    "param_name" => "plantilla",
                    "group" => "General",
                    "value" => array(
                        'Selecciona un modo para el mosaico' => '',
                        '1x3 Grande' => '1x3_big',
                        '1x3 Chico' => '1x3_small',
                        '1x4 Mosaico' => '1x4',
                        '2x2 Mosaico' => '2x2'
                    )
                ),
                 array(
                    "param_name" => "consulta",
                    "type" => "textfield",
                    "heading" => __("URL de busqueda", "my-text-domain"),
                    "value" => '',
                    "holder" => "div",
                    "group" => "GSA",
                ),
                array(
                    "param_name" => "site",
                    "type" => "textfield",
                    "heading" => __("Site", "my-text-domain"),
                    "value" => '',
                    "holder" => "div",
                    "group" => "GSA",
                ),
                array(
                    "param_name" => "client",
                    "type" => "textfield",
                    "heading" => __("Cliente", "my-text-domain"),
                    "value" => '',
                    "holder" => "div",
                    "group" => "GSA",
                ),
                array(
                    "param_name" => "numero",
                    "type" => "dropdown",
                    "heading" => __("Numero de elementos por paginacion", "my-text-domain"),
                    "holder" => "div",
                    "group" => "GSA",
                    "value" => array(
                        "Selecciona un numero...." => "",
                        "1" => "1",
                        "2" => "2",
                        "3" => "3",
                        "4" => "4",
                        "5" => "5",
                        "6" => "6",
                        "7" => "7",
                        "8" => "8",
                        "9" => "9",
                        "10" => "10",
                        "11" => "11",
                        "12" => "12",
                        "13" => "13",
                        "14" => "14",
                        "15" => "15",
                        "16" => "16",
                        "17" => "17",
                        "18" => "18",
                        "19" => "19",
                        "20" => "20",
                    ),
                ),
                array(
                    "param_name" => "min_numero",
                    "type" => "dropdown",
                    "heading" => __("Numero de elementos por fila", "my-text-domain"),
                    "value" => '',
                    "holder" => "div",
                    "group" => "GSA",
                    "value" => array(
                        "Selecciona un numero...." => "",
                        "1" => "1",
                        "2" => "2",
                        "3" => "3",
                        "4" => "4",
                        "5" => "5",
                        "6" => "6",
                        "7" => "7",
                        "8" => "8",
                        "9" => "9",
                        "10" => "10",
                        "11" => "11",
                        "12" => "12",
                        "13" => "13",
                        "14" => "14",
                        "15" => "15",
                        "16" => "16",
                        "17" => "17",
                        "18" => "18",
                        "19" => "19",
                        "20" => "20",
                    ),
                ),
                array(
                    "param_name" => "requiredfields",
                    "type" => "textfield",
                    "heading" => __("Required fields", "my-text-domain"),
                    "value" => '',
                    "holder" => "div",
                    "group" => "GSA",
                ),
                array(
                    "param_name" => "btn_todos",
                    "type" => "textfield",
                    "heading" => __("Boton Todos", "my-text-domain"),
                    "value" => '',
                    "holder" => "div",
                    "group" => "Texto",
                ),
                array(
                    "param_name" => "btn_fotos",
                    "type" => "textfield",
                    "heading" => __("Boton Fotos", "my-text-domain"),
                    "value" => '',
                    "holder" => "div",
                    "group" => "Texto",
                ),
                array(
                    "param_name" => "btn_videos",
                    "type" => "textfield",
                    "heading" => __("Boton Videos", "my-text-domain"),
                    "value" => '',
                    "holder" => "div",
                    "group" => "Texto",
                ),
                array(
                    "param_name" => "btn_capitulos",
                    "type" => "textfield",
                    "heading" => __("Boton Capitulos", "my-text-domain"),
                    "value" => '',
                    "holder" => "div",
                    "group" => "Texto",
                ),
                array(
                    "param_name" => "btn_notas",
                    "type" => "textfield",
                    "heading" => __("Boton Notas", "my-text-domain"),
                    "value" => '',
                    "holder" => "div",
                    "group" => "Texto",
                ),
                array(
                    "param_name" => "btn_vermas",
                    "type" => "textfield",
                    "heading" => __("Boton Ver Mas", "my-text-domain"),
                    "value" => '',
                    "holder" => "div",
                    "group" => "Texto",
                ),
                array(
                    "param_name" => "txt_resultados",
                    "type" => "textfield",
                    "heading" => __("Texto de resultado de busqueda", "my-text-domain"),
                    "value" => '',
                    "holder" => "div",
                    "group" => "Texto",
                ),
                array(
                    "param_name" => "txt_sinresultados",
                    "type" => "textfield",
                    "heading" => __("Texto de error en busqueda", "my-text-domain"),
                    "value" => '',
                    "holder" => "div",
                    "group" => "Texto",
                ),
                array(
                    "param_name" => "txt_recomendacion",
                    "type" => "textfield",
                    "heading" => __("Texto de recomendacion", "my-text-domain"),
                    "value" => '',
                    "holder" => "div",
                    "group" => "Texto",
                ),
            )
        ));
    }

    public function renderComponent($atts, $content = null) {
        extract(shortcode_atts(array(
            'plantilla' => '',
            'consulta' => '',
            'site' => '',
            'client' => '',
            'numero' => '',
            'min_numero' => '',
            'requiredfields' => '',
            'btn_todos' => '',
            'btn_fotos' => '',
            'btn_videos' => '',
            'btn_capitulos' => '',
            'btn_notas' => '',
            'btn_vermas' => '',
            'txt_resultados' => '',
            'txt_sinresultados' => '',
            'txt_recomendacion' => '',
        ), $atts));
        //Nota: me falta ver lo de la plantillita.

        //configuracion GSA
        $jsonGSA = "{
                        \"client\"         : \"" . $client . "\", 
                        \"min\"            : \"" . $min_numero . "\", 
                        \"module\"         : \"search_index_0\",
                        \"num\"            : \"" . $numero . "\" , 
                        \"q\"              : \"" . $consulta . "\" , 
                        \"requiredfields\" : \"" . $requiredfields . "\",
                        \"start\"          : \"0\",
                        \"site\"           : \"" . $site . "\",
                        \"sort\"           : \"meta:creationDate:D:ED\"
                    }";

        //Texto de los botones
        $jsonBTN = "{
                        \"btn_1\" : \"" . $btn_todos  . "\",
                        \"btn_2\" : \"" . $btn_fotos  . "\",
                        \"btn_3\" : \"" . $btn_videos  . "\",
                        \"btn_4\" : \"" . $btn_capitulos  . "\",
                        \"btn_5\" : \"" . $btn_notas  . "\"
                    }";

        ///Mensajes de la busqueda
        $jsonMSG = "{
                        \"msg_result\"   : \"" . $txt_resultados . "\",
                        \"msg_error\"    : \"" . $txt_sinresultados . "\",
                        \"msg_recomend\" : \"" . $txt_recomendacion . "\"
                    }";
        //union de todos los JSON
        $json = "{
                    \"gsa\" : " . $jsonGSA . ",
                    \"btn\" : " . $jsonBTN . ",
                    \"msg\" : " . $jsonMSG . "
                 }";

        //$html .= '<section class="prime-secciones">';
        //$html .= '<p id="title-results" class="prime-secciones__title">'.(($txt_resultados=='')?'Resultados de búsqueda de:':$txt_resultados).' <strong></strong></p>';
        //$html .= '<div class="prime-secciones__buttons" data-gsa="true" data-query="'.$consulta.'" data-num="'.$numero.'" data-min="'.$min_numero.'" data-client="'.$client.'" data-site="'.$site.'" data-requiredfields="'.$requiredfields.'" data-plantilla="'.$plantilla.'">';
        //$html .= '<a data-search="" href="#">'.(($btn_todos=='')?'Todos':$btn_todos).'</a>';
        //$html .= '<a data-search="reflex-icon-foto" href="#">'.(($btn_fotos=='')?'Fotos':$btn_fotos).'</a>';
        //$html .= '<a data-search="reflex-icon-video" href="#">'.(($btn_videos=='')?'Videos':$btn_videos).'</a>';
        //$html .= '<a data-search="reflex-icon-capitulo" href="#">'.(($btn_capitulos=='')?'Capitulos':$btn_capitulos).'</a>';
        //$html .= '<a data-search="reflex-icon-nota" href="#">'.(($btn_notas=='')?'Notas':$btn_notas).'</a>';
        //$html .= '</div>';
        //$html .= '</section>';
        //
        //$html .= '<section class="prime-secciones_2 hidden">';
        //$html .= '<p id="title-no-results" class="prime-secciones__title_2">'.(($txt_resultados=='')?'*-:':$txt_resultados).' <strong></strong></p>';
        //$html .= '<div class="seccion_alerta"><p class="alerta"><img src="http://i2.esmas.com/las-estrellas/assets/img/alerta.svg"></p></div>';
        //$html .= '<p id="subtitle-no-results" class="prime-secciones__title_2">'.(($txt_sinresultados=='')?'Lo sentimos, tú búsqueda no arrojó resultados,':$txt_sinresultados).'<br>'.(($txt_recomendacion=='')?'pero te recomendamos:':$txt_recomendacion).'<p>';
        //$html .= '</section>';


        $html .= "<section class=\"prime-secciones\" data-config='" . $json  ."' id=\"react-ui-reflex-search\">";
        $html .= "</section>";

        //$html .= do_shortcode('[reflex-mosaic-01 modo="contenedor" plantilla="'.$plantilla.'"]');
        //$html .= do_shortcode('[reflex-generic-button mode="more" text="'.(($btn_vermas=='')?'VER MÁS':$btn_vermas).'" url="#"]');
        return $html;
    }
}