var marker = [];
function initializeWidget()
{
	/*
	 * Subscribe to the EmbeddedApp onPageLoad event before initializing the widget 
	 */
	ZOHO.embeddedApp.on("PageLoad",function(data)
	{
		/*
	 	 * Verify if EntityInformation is Passed 
	 	 */
		if(data && data.Entity)
		{
			/*
		 	 * Fetch Information of Record passed in PageLoad
		 	 * and insert the response into the dom
		 	 */
			ZOHO.CRM.API.getRecord({Entity:data.Entity,RecordID:data.EntityId})
			.then(function(response)
			{
				 marker = [];
				for (i = 0; i < response.data.length; i++) 
				{
					var lastVisitedDate = response.data[i].googlemaps__Date_of_last_visit;
					var currentDate = new Date().toISOString().slice(0,10);
					var date1 = new Date(lastVisitedDate);
                	var date2 = new Date(currentDate);
                	//console.log("last date ===== >" + date1 + " current date ======>" + date2);
        		    var oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
                	var diffDays = ((date1.getTime() - date2.getTime()) / (oneDay));
                	//console.log("difference in date ========>"+diffDays);
                	var leadArray = [];
					leadArray[0]=response.data[i].Last_Name; //lastname
					leadArray[1]=response.data[i].googlemaps__Latitude; //lat
					leadArray[2]=response.data[i].googlemaps__Longitute	; //lng
					//console.log(leadArray);
            		if(date2>date1)
            		{
            			diffDays=Math.abs(diffDays);
					if(diffDays < 30)
					{
						leadArray[3]=1; //category
						leadArray[4]=diffDays;
						marker.push(leadArray);
						
					}
					else if(diffDays > 30 && diffDays < 60)
					{
						leadArray[3]=2; //category
						leadArray[4]=diffDays;
						marker.push(leadArray);

					}
					else if(diffDays >60)
					{
						leadArray[3]=3; //category
						leadArray[4]=diffDays;
						marker.push(leadArray);

					}
					}
				}
				for (i = 0; i < marker.length; i++) {
						console.log(marker[i],i);
        				addMarker(marker[i],i);
    				}
    			
			});	
		}
	})
// initialize();
        
ZOHO.embeddedApp.init();
}
