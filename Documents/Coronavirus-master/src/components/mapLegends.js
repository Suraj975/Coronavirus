import { MapControl, withLeaflet } from "react-leaflet";
import L from "leaflet";
import '../App.css';

class Legend extends MapControl {
  createLeafletElement(props) {}

  componentDidMount() {
    // get color depending on population density value
    const getColor = d => {
      return d > 100000 ? "red" : d > 10000 ? "green": "blue";
    };

    const legend = L.control({ position: "bottomleft"});

    legend.onAdd = () => {
      const div = L.DomUtil.create("div", "info legend");
      const grades = [0, 10000, 100000];
      let labels = [];
      let from;
      let to;

      for (let i = 0; i < grades.length; i++) {
        from = grades[i];
        to = grades[i + 1];

        labels.push(
          '<i style="background:' +
            getColor(from + 1) +
            '"></i> ' +
            from +
            (to ? "&ndash;" + to : "+")
        );
      }

      div.innerHTML = labels.join("<br>");
      return div;
    };

    const { map } = this.props.leaflet;
    legend.addTo(map);
  }
}

export default withLeaflet(Legend);
