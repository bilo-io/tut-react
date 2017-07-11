import React from 'react';
import ol from 'openlayers';
const OL = require('openlayers');
require('./map.scss');

var scaleLineControl =new ol.control.ScaleLine();
export default class OLMap extends React.Component {
    componentDidMount() {
        this.initOL();
        this.updateScaleLine();
    }
    initOL() {
        let overlays = new ol.layer.Group({
            title: 'map-layer-group',
            openInLayerSwitcher: true,
            layers: [
                new ol.layer.Tile({
                    title: 'osmLayer',
                    source: new ol.source.OSM()
                })]
        });
        let ct = ol.proj.transform([18.4241, -33.9249], 'EPSG:4326', 'EPSG:3857');
        let view = new ol.View({
            center: ct,
            zoom: 6
        });
        this.map = new ol.Map({
            target: 'ol-map',
            view: new ol.View({
                center: ct,
                zoom: 5,
                minZoom: 0,
                maxZoom: 9
            }),
            controls: ol.control.defaults().extend([
                scaleLineControl
            ]),
            // controls: ol.control.defaults().extend([
            //     new ol.control.LayerSwitcher()
            // ]),
            layers: [overlays]
        });
    }
    render() {
        return (
            <div className="map-container" >
                <div id="ol-map" className="map-component" />
            </div >
        )
    }
    updateScaleLine() {
        scaleLineControl.setUnits('metric');
    }
}