public class surveyController {
    public Case c {get;set;}
    public survey_response__c res {get;set;}
    public list<survey_question__c> results = new list<survey_question__c>();
    Case updateCase;
    survey_response__c expireDate;
    list<wrapper> survey = new list<wrapper>();
    
    public Integer response { get; set; }
    
    
    public list<wrapper> getSurvey() {
        String res;
        results =[select ID,name from survey_question__c];
        for(Integer i=0;i < results.size(); i++){
            survey.add(new wrapper(results[i].name,res,results[i].ID));
        }
        return survey;     
    }
    
    public class wrapper{
        public String Question{get; set;}
        public String Response{get; set;}
        public ID id{get; set;}
        public wrapper(String Question,String Response,ID id){
            this.Question = Question;
            this.Response = Response;
            this.id = id;
        }
    }
    
     
    public PageReference saveResponse() {
        Id id=ApexPages.currentPage().getParameters().get('id');
        updateCase = [select status from Case where id=:id];
        expireDate = [select response_date__c from survey_response__c where case__c=:id and response_date__c < LAST_N_DAYS:2];
        //if(expireDate.response_date__c!=null){
           // PageReference demoPage1 = new PageReference('/apex/linkExpire');
            //demoPage1.setRedirect(true);
          //  return demoPage1;
        //}else
            if(updateCase.Status!='Cancelled'){
            PageReference demoPage = new PageReference('/apex/surveyCompleted');
            demoPage.setRedirect(true);
            return demoPage;
        }else{
            list<survey_response__c> repResult = new list<survey_response__c>();
            for(Integer i=0;i < results.size(); i++){
                survey_response__c rs = new survey_response__c(name=survey[i].Response,survey_question__c=survey[i].id,response_date__c=system.today(),case__c=id);
                repResult.add(rs);
            }
            insert repResult;
            updateCase.Status='New';
            update updateCase;
            survey = null;
            return null;
        }
    }
}