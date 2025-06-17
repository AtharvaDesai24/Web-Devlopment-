const  Listing_Location= Location;
const GetCoordinates=async(location)=>{
let url=`https://api.maptiler.com/geocoding/${info.location}.json?key=${MapToken}`;
let response=await fetch(url);
let geocoding= await response.json();

let [lng, lat]=await geocoding.features[0].center;

return {lng ,lat};
};


const Coordinates=  GetCoordinates(Listing_Location);
 Coordinates.then((data)=>{
  const Latitude=data.lat;
  const Longitude=data.lng;
  maptilersdk.config.apiKey = MapToken;
   console.log(Longitude,"...",Latitude); 
      const map = new maptilersdk.Map({
        container: 'map', // container's id or the HTML element to render the map
        style: maptilersdk.MapStyle.STREETS,
        center: [Longitude, Latitude], // starting position [lng, lat]
        zoom: 9, // starting zoom
      });

        // create the popup
     const popup = new maptilersdk.Popup({ offset: 25 }).setHTML(
      `<h4>${info.location},${info.country}</h4><p>Exact Location provided after booking</p>`
    );

      const marker = new maptilersdk.Marker()
      .setLngLat([Longitude, Latitude])
      .addTo(map)
      .setPopup(popup); // sets a popup on this marker
    }).catch((err)=>{
    console.log(err);
 });
 
  
  

   

     