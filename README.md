
# Google Maps

Google Maps widget enables users to view leads locations in Google Maps within Zoho CRM by clicking on the custom button "Show in Google Map" from the list view page of the Leads module. The Google Maps widget will pop up with the locations of the (selected) leads being marked in the map. Users can view the locations visited in various time intervals by applying filters. Additionally, when users click on a particular marker in the map, information about the leads will be displayed.

## To use this widget the following steps has to be followed:

- Create custom fields in the Leads module 
	1. Date of last visit - To store the last date since a lead was contacted by the field service rep.
	2. Latitude
	3. Longitute
		Both these values are required to store the location details of a lead. 

**Note**: If you use Google's geocode API then these fields may not be required. You can use the address fields and get the lat-long values of a location.

- Add a workflow rule to the Events module and associate the following custom function that would calculate the number of the days since the last visit was made, for each lead. Let the WF be triggered whenever an event is edited or created. 

```
//Custom function to fetch the date of last visit
e = event.get("Events.ID");
resp = zoho.crm.getRecordById("Events",e);
participant = resp.get("Participants");
record = Map();
// Get the participant details from an event that was created // or edited
for each  record in participant
{
 leadInfo = record.get("participant");
 // Get the closed activity details
resp = 	zoho.crm.getRelatedRecords("Activities_History","Leads",leadInfo);
 for each  val in resp
 {
 	res1 = val.get("End_DateTime");
 	date1 = res1.toDate();
 	record.put("id",leadInfo);
 	record.put("googlemaps__Date_of_last_visit",date1);
 }
 data = List();
 data.add(record);
 m = Map();
 m.put("module","Leads");
 m.put("data",data);
 response = zoho.crm.invokeConnector("crm.update",m);
 info response;
}
```

- Create a connected app in your extension and upload the widget
- Associate the widget to your extension using a custom button "Show in Google Maps" in the Leads module.
