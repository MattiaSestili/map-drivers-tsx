import { Marker } from "@react-google-maps/api"
import { Fragment } from "react"
import { defaultCenter, DriversInfo } from "../Container/MapContainer"

type GoogleLangLng = { lat: number, lng: number }

export const MapMarkers = (props: { Items: DriversInfo }) => {
  return (
    <>
      <Marker
        position={defaultCenter}
        icon={"https://maps.google.com/mapfiles/kml/paddle/blu-blank.png"}
      />
      {props.Items?.drivers?.map(item => {
        const mPos: GoogleLangLng = { lat: item.location.latitude, lng: item.location.longitude }
        return (
          <Fragment key={item.driver_id}>
            <Marker
              position={mPos}
              icon={"/taxi.png"} />
          </Fragment>
        );
      })}
    </>
  )
}