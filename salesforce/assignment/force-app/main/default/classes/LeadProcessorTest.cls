@istest
private class LeadProcessorTest {
	@istest
    static void testlead(){
        List<Lead> l = new List<Lead>();
        lead l1 = new lead();
        l1.LastName='surya';
        l1.Company='Company';
        l1.Status='Closed-Converted';
        l1.LeadSource='Dreamforce';
        l.add(l1);
        insert l;
        
        Test.startTest();
    LeadProcessor lp= new LeadProcessor();
    Id jobid= Database.executeBatch(lp);
    Test.stopTest();
    }
}