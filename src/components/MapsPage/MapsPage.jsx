import { GoogleMap, MarkerF } from '@react-google-maps/api'
import mapStyle from '../../assets/mapStyle'

const containerStyle = {
    width: '100vw',
    height: '500px',
}


const MapsPage = ({ address, location: { coordinates } }) => {


    const center = {
        lat: coordinates[0],
        lng: coordinates[1]
    }

    return (

        <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={15} options={{ styles: mapStyle }}>
            <MarkerF position={center} title={address} />
        </GoogleMap>
    )

}


export default MapsPage