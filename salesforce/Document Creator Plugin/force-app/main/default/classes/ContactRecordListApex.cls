public with sharing  class  ContactRecordListApex {
    
    @AuraEnabled
    public static boolean profile(id record){
        boolean result=true;
     	List<template__c> profiles = [select profiles__c from template__c where id=:record];
        List<String> profiles1 = profiles[0].profiles__c.split(';');
       	id id1 = userinfo.getProfileId();
		List<profile> pro = [select Name from profile where id = :id1];
        String pro1 = pro[0].Name;
        for(Integer j=0;j<profiles1.size();j++){
            if(profiles1[j].equals(pro1)){
                result= true;
                break;
            }else{
                result= false;
            }
        } 
        return result;
    }
    
      @AuraEnabled
    public static List<String> objectNames(){
        List<Schema.SObjectType> gd = Schema.getGlobalDescribe().Values();    
        List<String> options = new List<String>();
        for(SObjectType f : gd){
            options.add(f.getDescribe().getName());
            options.sort();        
        }
        System.debug('options--->>' + options);
        return options;
    }
   @AuraEnabled
    public static DynamicBindingWrapper objectRecords(String selectedObject){
        DynamicBindingWrapper dynamicData = new DynamicBindingWrapper();
        List<fieldDataWrapper> wrapperList =  new List<fieldDataWrapper>();
        List<String> fields = new List<String>();
        Map<String , Schema.SObjectType> globalDescription = Schema.getGlobalDescribe();
        Schema.sObjectType objType = globalDescription.get(selectedObject); 
        Schema.DescribeSObjectResult r1 = objType.getDescribe(); 
        
        Map<String , Schema.SObjectField> mapFieldList = r1.fields.getMap();  

        for(Schema.SObjectField field : mapFieldList.values())  {  
            Schema.DescribeFieldResult fieldResult = field.getDescribe();  
            
            if(fieldResult.isAccessible())  {  
                fields.add(fieldResult.getName());
            }
            fieldDataWrapper wrapper = new fieldDataWrapper();
            wrapper.label = field.getDescribe().getLabel();
            wrapper.apiName = field.getDescribe().getName();
            wrapperList.add(wrapper);
        }
        Integer i = 0;
        String fieldsToFetch = '';
        for(String temp:fields){       
            Integer len = fields.size();
            if(i==len-1){
                  fieldsToFetch = fieldsToFetch + temp;
            }
            else{
                  fieldsToFetch = fieldsToFetch + temp + ',';
            }
            i++;
        }
        String sql = ' SELECT ' + fieldsToFetch + ' FROM ' + selectedObject + ' ORDER BY CreatedDate DESC';
        List<Sobject> objRecords = new List<Sobject>();
        objRecords = Database.Query(sql);
        System.debug('objRecords--->' + objRecords);
        if(objRecords!=null && objRecords.size()>0){
        	dynamicData.sObjectData = objRecords;
        }
        else{
            dynamicData.sObjectData = new List<sObject>();
        }
        dynamicData.fieldList = wrapperList;
        System.debug('dynamicData.sObjectData--->' + dynamicData.sObjectData);
        System.debug('dynamicData.fieldList--->' + dynamicData.fieldList);
        System.debug('dynamicData--->' + dynamicData);
        return dynamicData;
        } 
    
    //Class to store the dynamic data and list of related fields
    public class DynamicBindingWrapper{
        @AuraEnabled
        public List<sObject> sObjectData {get; set;}
        @AuraEnabled
        public List<fieldDataWrapper> fieldList {get; set;}
    }
    
    //Class to store the field information
    public class fieldDataWrapper{
        @AuraEnabled
        public String label {get; set;}
        @AuraEnabled
        public String apiName {get; set;}
    }
    
    
     @AuraEnabled
    public static void setData(Id record, String data,String objectName){
        
        template__c temp = [select name,template_data__c,object_name__c from template__c where Id=:record];
        if(temp.template_data__c==null){temp.template_data__c = data;}
        else{temp.template_data__c += data;}
		
        temp.object_name__c=objectName;
        upsert temp;	
	}
}