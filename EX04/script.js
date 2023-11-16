const GSAllURL = 'https://citmalumnes.upc.es/~davids/awug1_2324/05_maps/benzineres/llista.php';
const GS24hURL = 'https://citmalumnes.upc.es/~davids/awug1_2324/05_maps/benzineres/llista24hs.php';
const GSDetailURL = 'https://citmalumnes.upc.es/~davids/awug1_2324/05_maps/benzineres/benzinera.php?benzinera=[GS_ID]';


class GasStation {
    constructor(id, name, address, open, lat, lng, marker) {
        this.id = id;
        this.name = name;
        this.address = address;
        this.open = open;
        this.lat = lat;
        this.lng = lng;
        this.marker = marker;

        this.marker.on('click', () => this.showDetail());
        this.marker.on('popupclose', () => {
            //Unselect from list
            let items = document.querySelectorAll('#list>li');
            items.forEach(item => { item.className = '' })
        } )
    }

    showDetail() {
        fetch(GSDetailURL.replace('[GS_ID]', this.id))
        .then(response => response.json())
        .then(results => {
            console.log(results);
            //Marker popup
            this.marker.bindPopup(`<p>${results.benzinera.nom}<br /><small>${results.benzinera.telefon}<br />${results.benzinera.adreca}<small></p>`).openPopup();

            //Unselect all items
            let items = document.querySelectorAll('#list>li');
            items.forEach(item => { item.className = '' })

            //Select item in list
            let gsItem = document.getElementById(`gs-${this.id}`);
            gsItem.className = 'selected';
            gsItem.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "nearest" });

        })
    }
}

class GasStationCollection {
    constructor(){
        //Initialize array
        this.stations = [];
        this.listDOM = document.getElementById('list');

        //Create Map
        this.map = L.map('map');
        this.map.setView([41.5631, 2.00], 13);
        L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 19,
            attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        }).addTo(this.map);
    }

    clearStations() {
        this.stations.forEach(station => station.marker.remove());
        this.stations = [];
        this.listDOM.innerHTML = '';
    }

    addStations(gasStations) {
        gasStations.forEach(station => {
            //Add marker to map
            let mapMarker = L.marker([station.lat, station.lon]).addTo(this.map);

            let GS = new GasStation(station.id, station.nom, station.adreca, station.horari, station.lat, station.lon, mapMarker );
            this.stations.push(GS);

            //Add list item
            let item = document.createElement('li');
            let nameTag = document.createElement('h4');
            let addressTag = document.createElement('div');
            let scheduleTag = document.createElement('small');

            item.id=`gs-${GS.id}`;
            nameTag.innerText = GS.name;
            addressTag.innerText = GS.address;
            scheduleTag.innerText = GS.open;

            item.appendChild(nameTag);
            item.appendChild(addressTag);
            item.appendChild(scheduleTag);

            item.addEventListener('click', () => GS.showDetail())

            this.listDOM.appendChild(item);
        });
    }

    getAllStations(){
        fetch(GSAllURL)
        .then(response => response.json())
        .then(results => {
            console.log(results);
            this.clearStations();
            this.addStations(results.benzineres);
        });
    }

    get24HStations() {
        fetch(GS24hURL)
        .then(response => response.json())
        .then(results => {
            console.log(results);
            this.clearStations();
            this.addStations(results.benzineres);
        });
    }
}

let GSMap = new GasStationCollection();
GSMap.getAllStations();

