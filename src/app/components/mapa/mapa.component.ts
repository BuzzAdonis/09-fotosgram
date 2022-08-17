import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
declare var mapboxgl:any;
@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.component.html',
  styleUrls: ['./mapa.component.scss'],
})
export class MapaComponent implements OnInit {
@Input() coords:string;
@ViewChild('mapa',{static: true}) mapa:ElementRef;
  constructor() { }

  ngOnInit() {
    let LatLng =this.coords.split(',');
    let lat = Number(LatLng[0]);
    let lng = Number(LatLng[1]);
    mapboxgl.accessToken = 'pk.eyJ1IjoibWVnYW1hbmRldiIsImEiOiJjbDZ3Zm4zNmExa20xM2NxOWQ3MmNydHR6In0.XrlrxqNGvm1IE-5TCQ0PSg';
    const map = new mapboxgl.Map({
      container: this.mapa.nativeElement,
      style: 'mapbox://styles/mapbox/streets-v11',
      center:[lng,lat],
      zoom:15
    });

    const marker = new mapboxgl.Marker().setLngLat([lng,lat]).addTo(map);
  }

}
