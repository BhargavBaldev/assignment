@isTest
public class test_batch {
   
    static testmethod void test() {
		List<Case> clist = new List<Case>();
		case c = new Case(Status='Cancelled',SuppliedEmail='bhargav.baldev@aimdek.com',Language__c='english',Survey_send_to_Customer__c=true);
		clist.add(c);
		insert clist;        
        test.startTest();
        sendEmail b = New sendEmail();
        Database.executeBatch(b);
        test.stoptest();
    }
    
}