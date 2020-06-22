({
   init: function (cmp, event, helper) {
       var record=cmp.get('v.recordId');
      cmp.set('v.recordId',record);
       var action1=cmp.get("c.profile");
       action1.setParams({record : record});
       action1.setCallback(this, function(response) {
            var state = response.getState();
            if (state === "SUCCESS") {           
                var profile = response.getReturnValue();
                cmp.set("v.profile", profile);
            }        	         
           else {
                    console.log("Unknown Error");
                }
        });
       
       var action = cmp.get("c.objectNames");
        action.setCallback(this, function(response) {
            var state = response.getState();
            if (state === "SUCCESS") {           
                var allValues = response.getReturnValue();
                cmp.set("v.pickl", allValues);
            }        	         
           else {
                    console.log("Unknown Error");
                }
        });
      $A.enqueueAction(action1);
        $A.enqueueAction(action);
   },
    
    
    downloadDocument : function(component, event, helper) {
        var object = component.get('v.selectedObject');	
        var record = component.get('v.recordId');
        var data = component.get('v.result');
        var temp= component.find("tempType").get("v.value");
        var data1="";
        if(object=='Account'){
            if(temp=='Type 1'){
            for(var i=0;i<data.length;i++){
                if(data[i].label=='Name'){data1+='Dear <b>'+data[i].value+"</b>,<br><br>"}
                if(data[i].label=='BillingStreet'){data1+='<b>Your Billing Address </b> :<br>'+data[i].value+", "+data[i+1].value+", "+data[i+2].value+", "+data[i+4].value+"- "+data[i+3].value+"<br><br>"}
               	if(data[i].label=='PhotoUrl'){data1+='<b><u>Upload your photo here</u> :</b> '+"<br><br>"}
                if(data[i].label=='Phone'){data1+='<b>Phone no. </b> : '+data[i].value+"<br><br>"}
                if(data[i].label=='Email__c'){data1+='<b>Email</b> : '+data[i].value+"<br><br>"}
                if(data[i].label=='OwnerId'){data1+='<b>Owner Id </b> : '+data[i].value+"<br><br>"}
                if(data[i].label=='CreatedDate'){data1+='<b>Account Created Date</b> : '+data[i].value+"<br><br>"}
                if(data[i].label=='LastModifiedDate'){data1+='<b>Account Last Modified Date</b> : '+data[i].value+"<br><br>"}
            }
            data1+='----------------------------------------------------------------------------------------------------------------------------------------------------------------<br>';
            }
            if(temp=='Type 2'){
            for(var i=0;i<data.length;i++){
                if(data[i].label=='Name'){data1+='Hello Mr./Ms. <b>'+data[i].value+"</b>,<br><br>"}
                if(data[i].label=='BillingStreet'){data1+='<b>Your Billing Address </b> :<br>'+data[i].value+", "+data[i+1].value+", "+data[i+2].value+", "+data[i+4].value+"- "+data[i+3].value+"<br><br>"}
               	if(data[i].label=='PhotoUrl'){data1+='<b><u>Upload your photo here</u> :</b> '+"<br><br>"}
                if(data[i].label=='Phone'){data1+='<b>Phone no. </b> : '+data[i].value+"<br><br>"}
                if(data[i].label=='Email__c'){data1+='<b>Email</b> : '+data[i].value+"<br><br>"}
                if(data[i].label=='OwnerId'){data1+='<b>Owner Id </b> : '+data[i].value+"<br><br>"}
                if(data[i].label=='CreatedDate'){data1+='<b>Account Created Date</b> : '+data[i].value+"<br><br>"}
                if(data[i].label=='LastModifiedDate'){data1+='<b>Account Last Modified Date</b> : '+data[i].value+"<br><br>"}
            }
            data1+='----------------------------------------------------------------------------------------------------------------------------------------------------------------<br>';
            }
            if(temp=='Type 3'){
            for(var i=0;i<data.length;i++){
                if(data[i].label=='Name'){data1+='Respected <b>'+data[i].value+"</b>,<br><br>"}
                if(data[i].label=='BillingStreet'){data1+='<b>Your Billing Address </b> :<br>'+data[i].value+", "+data[i+1].value+", "+data[i+2].value+", "+data[i+4].value+"- "+data[i+3].value+"<br><br>"}
               	if(data[i].label=='PhotoUrl'){data1+='<b><u>Upload your photo here</u> :</b> '+"<br><br>"}
                if(data[i].label=='Phone'){data1+='<b>Phone no. </b> : '+data[i].value+"<br><br>"}
                if(data[i].label=='Email__c'){data1+='<b>Email</b> : '+data[i].value+"<br><br>"}
                if(data[i].label=='OwnerId'){data1+='<b>Owner Id </b> : '+data[i].value+"<br><br>"}
                if(data[i].label=='CreatedDate'){data1+='<b>Account Created Date</b> : '+data[i].value+"<br><br>"}
                if(data[i].label=='LastModifiedDate'){data1+='<b>Account Last Modified Date</b> : '+data[i].value+"<br><br>"}
            }
            data1+='----------------------------------------------------------------------------------------------------------------------------------------------------------------<br>';
            }
            }else{
        for(var i=0;i<data.length;i++){
            data1+=data[i].label +":"+ data[i].value + "<br>";
        }
            data1+='----------------------------------------------------------------------------------------------------------------------------------------------------------------<br>';
        }
        var action = component.get("c.setData");
        action.setParams({record : record,data : data1,objectName:object});
        action.setCallback(this, function(response) {
            var state = response.getState();
            if (state === "SUCCESS") {
                console.log("success");
            }        	         
           else {
                    console.log("Unknown Error");
                } 
            });
            $A.enqueueAction(action);
    },
    
    doSearch : function(component, event, helper) {
        var selected = component.find("selectObject").get("v.value");
        component.set('v.selectedObject',selected);
		var action = component.get("c.objectRecords");
        action.setParams({selectedObject : selected});
        action.setCallback(this, function(response) {
            var state = response.getState();
            if (state === "SUCCESS") {  
               var allValues = response.getReturnValue();
            	var objectValue = allValues.sObjectData;
                var fieldList = allValues.fieldList;
                var fieldPush=[];
                for(var i=0;i<fieldList.length;i++){
                	fieldPush.push(fieldList[i].apiName);
                }
                component.set('v.selectedField',fieldPush);
                var selectedField=component.find("selectField").get("v.value");
               component.set('v.Field',selectedField);
                var Value=[];
                 if(objectValue.length){
                for(var j=0; j<objectValue.length; j++){
                    
                        Value.push(objectValue[j][selectedField]);
                	
                }
                component.set('v.selectedRecord',Value);
                 }
                var record=component.find("selectRecord").get("v.value");
                component.set('v.Record',record);
                var result=[];
                for(var i=0;i<Value.length;i++){
                    if(Value[i]==record){
                        for(var j=0;j<fieldList.length;j++){
                            result.push({label:fieldList[j].apiName,value:objectValue[i][fieldList[j].apiName]});
                        }
                    }
                }
                console.log(result);
                component.set('v.result',result);
                
            }        	         
            else if (state === "ERROR") {
                var errors = response.getError();
                if (errors) {
                    if (errors[0] && errors[0].message) {
                        console.log("Error message: " + 
                                 errors[0].message);
                    }
                } 
                else {
                    console.log("Unknown Error");
                }
            }
        });
        $A.enqueueAction(action);
    },
    
    
    
})