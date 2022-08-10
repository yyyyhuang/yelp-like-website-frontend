import React, { useState } from 'react';
import GoogleMapReact from 'google-map-react';


const SimpleMap = (props) => {
    const [center, setCenter] = useState({lat: 11.0168, lng: 76.9558 });
    const [zoom, setZoom] = useState(11);
    return (
        <div style={{ height: '100vh', width: '100%' }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: 'AIzaSyAPkROnfq6oQ0iOuUEVOqbgC2SDTDZp0To' }}
          defaultCenter={center}
          defaultZoom={zoom}
        >
        </GoogleMapReact>
      </div>
    );
}

export default SimpleMap;