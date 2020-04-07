global class sendEmail implements Database.Batchable <sObject> {
	global Database.QueryLocator start (Database.BatchableContext bc) {
       String Query;
       Query = 'SELECT id,SuppliedEmail From Case where Status=\'Cancelled\' and Survey_send_to_Customer__c=true';
       return Database.getquerylocator(Query);
       }
    global void execute(Database.BatchableContext bc, List <Case> clist) {
        try{
            
            EmailTemplate et = [Select Id from EmailTemplate where name = 'SurveyEmail'];
            
            for(Case c:clist){
                
                String[] toAddress = new String[]{c.SuppliedEmail};
                
                Messaging.SingleEmailMessage mail = new Messaging.SingleEmailMessage();
                
                mail.setTemplateId(et.Id);
                mail.setToAddresses(toAddress);
            
                mail.setSaveAsActivity(false);	
                mail.setUseSignature(false);
                
                
           
            mail.setHtmlBody('<a href = "http://bhargavbaldev-developer-edition.ap16.force.com/survey?id='+c.id+'">click here</a> to complete the survey...');
            List<Messaging.SingleEmailMessage> allmsg = new List<Messaging.SingleEmailMessage>();
			allmsg.add(mail);
           	Messaging.sendEmail(allmsg,false);
    		return;
            }
        }
        catch(exception e){
            System.debug(e.getMessage());
        }
}
global void finish(database.BatchableContext bc) {}
}