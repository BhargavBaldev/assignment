({
    getValueFromApplicationEvent : function(cmp, event) {
        var ShowResultValuef = event.getParam("Pass_from");
        var ShowResultValuet = event.getParam("Pass_to");
        cmp.set("v.from_billingstreet", ShowResultValuef.BillingStreet);
        cmp.set("v.from_billingcity", ShowResultValuef.BillingCity);
        cmp.set("v.from_billingstate", ShowResultValuef.BillingState);
        cmp.set("v.from_billingcountry", ShowResultValuef.BillingCountry);
        cmp.set("v.from_billinglongitude", ShowResultValuef.BillingLongitude);
        cmp.set("v.from_billinglatitude", ShowResultValuef.BillingLatitude);
        cmp.set("v.to_billingstreet", ShowResultValuet.BillingStreet);
        cmp.set("v.to_billingcity", ShowResultValuet.BillingCity);
        cmp.set("v.to_billingstate", ShowResultValuet.BillingState);
        cmp.set("v.to_billingcountry", ShowResultValuet.BillingCountry);
        cmp.set("v.to_billinglongitude", ShowResultValuet.BillingLongitude);
        cmp.set("v.to_billinglatitude", ShowResultValuet.BillingLatitude);
    },
    onPicklistChange : function(component,event,helper){
    	var from_long = component.get("v.from_billinglongitude");
   		var from_lat = component.get("v.from_billinglatitude");
    	var to_long = component.get("v.to_billinglongitude");
    	var to_lat = component.get("v.to_billinglatitude");
        var unit = component.get("v.account.Distance_Metrics__c");
       
        var action = component.get("c.getGeoDistance");
        action.setParams({
            "from_long":from_long,
            "from_lat":from_lat,
            "to_long":to_long,
            "to_lat":to_lat,
            "unit":unit
        });
         action.setCallback(this,function(response){
        	if(response.getState()==='SUCCESS'){
            var c=response.getReturnValue();
                
            component.set("v.distance",c);
			}
		});
        $A.enqueueAction(action);
	}        
})