public with sharing class LabelTranslator_Controller {
     public string language {get;set;}  
     public string label {get;set;}
    public LabelTranslator_Controller() {
       String lang = ApexPages.currentPage().getParameters().get('language'); 
       String lab = ApexPages.currentPage().getParameters().get('label'); 
       language = lang;
       label = lab;
	}
	@AuraEnabled(cacheable=true)
    public static string getLabelTranslator(String label,String language) {
        try{
            PageReference r = Page.thankyou;
            r.getParameters().put('language', language);
            r.getParameters().put('label', label);
            String rt = r.getContent().toString();
            return rt;
        } catch(Exception e){
            return label;
        }   
    }
}