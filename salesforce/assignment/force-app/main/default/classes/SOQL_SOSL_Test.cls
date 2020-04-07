public class SOQL_SOSL_Test {
    public static void test(){
	Contact[] Contacts = [SELECT Id, Firstname, Lastname FROM  Contact];
    List<Contact> sl = Database.query('SELECT Id,Firstname,Lastname FROM Contact');
    List<List<Contact>> searchList = [FIND 'aimdek' IN ALL FIELDS RETURNING Account,Contact,Opportunity,Lead];
}
}