import "./App.css";
import MapWrapper from "./components/Map";

function App() {
  return (
    <div>
      <div className="title">
        follow the lead for a pleasent evening in isfahan
        <p>p.s. can you find where i am now? hint: i'm not in isfahan</p>
      </div>
      <div className="map-wrapper">
        <MapWrapper />
      </div>
    </div>
  );
}

export default App;
