global class sendEmail implements Database.Batchable <sObject> {
	global Database.QueryLocator start (Database.BatchableContext bc) {
       String Query;
       Query = 'SELECT id,SuppliedEmail,ContactId From Case where Status=\'Cancelled\' and Survey_send_to_Customer__c=true';
       return Database.getquerylocator(Query);
       }
    global void execute(Database.BatchableContext bc, List <Case> clist) {
        try{
            
            EmailTemplate et = [Select Id from EmailTemplate where name = 'SurveyEmail'];
            List<Messaging.SingleEmailMessage> allmsg = new List<Messaging.SingleEmailMessage>();
            
            for(Case c:clist){
               
                String[] toAddress = new String[]{c.SuppliedEmail};
                Messaging.SingleEmailMessage mail = new Messaging.SingleEmailMessage();
                mail.setTemplateId(et.Id);
                mail.setToAddresses(toAddress);
                
                mail.setTargetObjectId(c.ContactId);
                mail.setWhatId(c.id);
				allmsg.add(mail);
            }
            Messaging.sendEmail(allmsg);
        }
        catch(exception e){
            System.debug(e.getMessage());
        }
}
global void finish(database.BatchableContext bc) {}
}