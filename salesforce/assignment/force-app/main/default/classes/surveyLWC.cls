public with sharing class surveyLWC {
 
    
 	@AuraEnabled(cacheable=true)
    public static List<sObject> getQuestion(String id){
     System.debug(id);
        Case que_type=[select Language__c from Case where id=:id];
        if(que_type.Language__c=='fr'){
          
            return Database.query('select id,name from survey_fquestion__c');
            
        } else {
    		return Database.query('select id,name from survey_question__c');    
        }
        
    }
    @AuraEnabled
    public static List<String> getStatus(String id){
       
        List<String> ca = new List<String>();
        List<Case> c = [select Status,Language__c from Case where id=:id];
        String status = c[0].Status;
        string lang = c[0].Language__c;
        ca.add(status);
        ca.add(lang);
        
        return ca;
    }
    @AuraEnabled
    public static void saveResponse(survey_response__c con,String id){
       
        System.debug(id);
        Case st = [select Status from Case where id=:id];
          System.debug(con); 
        try{
            
            if(st.Status=='Cancelled'){
            insert con;
            } 
        }catch(Exception e){
            System.debug('--->'+e);
        }
    }
    @AuraEnabled
    public static void setStatus(String status,String id){
        Case st = [select Status from Case where id=:id];
        st.Status=status;
        update st;
    }
    
    
}