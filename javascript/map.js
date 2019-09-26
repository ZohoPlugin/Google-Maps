var tempMarkerArray = [];
var tempMarker="";
var infowindow = new google.maps.InfoWindow({
    content: ''
});

/**
* Function to add marker to map
*/

function addMarker(markerArr,index) {
    var category = markerArr[3];
    var diffdate;
    
    // Condition to handle leads which do not have Last contacted information
    
    if(markerArr[4]>100)
    {
        diffdate=100;
    } else {
        diffdate=markerArr[4];
    } 
    var title = markerArr[0];
    var pos = new google.maps.LatLng(markerArr[1],markerArr[2]);
    var content = markerArr[0] + " \n Not visited since " + diffdate +" day(s)";
    var center = new google.maps.LatLng(markerArr[1],markerArr[2]);
    var mapOptions = {
        zoom: 4,
        center: center,
        mapTypeId: google.maps.MapTypeId.TERRAIN
    };
    
    //Initialize Map
    
    if(index == 0){
        map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
    }
    
    // Mark markers with different colors

    if(category == 3){
        tempMarker = new google.maps.Marker({
            title: title,
            position: pos,
            category: category,
            icon:"https://maps.google.com/mapfiles/ms/icons/red-dot.png",
            map: map
        });
    } else if (category == 2) {
        tempMarker = new google.maps.Marker({
            title: title,
            position: pos,
            category: category,
            icon:"https://maps.google.com/mapfiles/ms/icons/blue-dot.png",
            map: map
        });
    } else if(category == 1){
        tempMarker = new google.maps.Marker({
            title: title,
            position: pos,
            category: category,
            icon:"https://maps.google.com/mapfiles/ms/icons/green-dot.png",
            map: map
        });
    }

    tempMarkerArray.push(tempMarker);
    
    // Marker click listener
    
    google.maps.event.addListener(tempMarker, 'click', (function (tempMarker, content) {
        return function () {
            infowindow = new google.maps.InfoWindow({
                                content: content
                            });
            infowindow.open(map, tempMarker);
            map.panTo(this.getPosition());
            map.setZoom(10);
        }
    })(tempMarker, content));

}
/**
* Function to filter markers by category
*/
filterMarkers = function (category) {
    for (i = 0; i < marker.length; i++) {
        tempMarker = tempMarkerArray[i];
        // If same category or category not picked
        if (tempMarker.category == category || category == 0) {
            tempMarker.setVisible(true);
        }
        // Categories don't match
        else {
            tempMarker.setVisible(false);
        }
    }
}