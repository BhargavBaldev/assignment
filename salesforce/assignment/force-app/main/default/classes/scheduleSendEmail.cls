global class scheduleSendEmail implements Schedulable {
   global void execute(SchedulableContext SC) {
      sendEmail myBatchObject = new sendEmail(); 
Id batchId = Database.executeBatch(myBatchObject); 
   }
}