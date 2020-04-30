({
	myAction : function(component, event, helper) {
		var fromAC=component.get("v.From");
      	var toAC=component.get("v.To");
        var evt = $A.get("e.c:Result");
        evt.setParams({
            "Pass_from":fromAC,
            "Pass_to":toAC
        })
        evt.fire();
	}
})