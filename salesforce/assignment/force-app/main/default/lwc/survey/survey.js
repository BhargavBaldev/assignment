import { LightningElement , track ,wire,api } from 'lwc';
import survey_response__c_OBJECT from '@salesforce/schema/survey_response__c';
import Name_FIELD from '@salesforce/apex/surveyLWC.saveResponse';
import getQuestion from '@salesforce/apex/surveyLWC.getQuestion';
import thankYou from '@salesforce/label/c.thank_you';
import surveyCompleted from '@salesforce/label/c.survey_completed';
import setStatus from '@salesforce/apex/surveyLWC.setStatus';
import getStatus from '@salesforce/apex/surveyLWC.getStatus';

export default class Survey extends LightningElement {
    @api recordId;
    @track question;
    @track status='';
    @track flag1 = true;
    @track flag = false;
    @track surveyCompleted=false;
    
    showMSG(){
       
        getStatus({
            id:this.paramValue
        }).then(result=>{
            this.status=result;
            console.log(this.status);
        })
        console.log(this.status);
        if (this.status=='Cancelled') {
            console.log('from cancel');
           this.flag=true;
           this.flag1=false;
            
        }else{
            console.log('from new');
            this.surveyCompleted=true;
            this.flag1=false;
            
        }
        setStatus({
            status:'New',
            id:this.paramValue
        })
        
    }
    
    

    label = {thankYou,
    surveyCompleted}
   
    
    
    @track
    options = [
        {'label': '1', 'value': '1'},   
        {'label': '2', 'value': '2'},
        {'label': '3', 'value': '3'},
        {'label': '4', 'value': '4'},
        {'label': '5', 'value': '5'},
    ];
    
  
    
    @track
    selectedOption =survey_response__c_OBJECT;

    

   handleInput(event){
       this.selectedOption.survey_question__c=event.target.value;
       
   }
   @track paramValue  
   connectedCallback() {
    const param = 'id';
    this.paramValue = this.getUrlParamValue(window.location.href, param);
    getQuestion({
        id:this.paramValue
    }).then(result=>{    
       
        this.question=result;
    })   
    }

    getUrlParamValue(url, key) {
        return new URL(url).searchParams.get(key);
    }
    handleChange(event) {
        this.selectedOption.case__c=this.paramValue;
       
        var today = new Date();
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0');
        var yyyy = today.getFullYear();
        today = mm + '/' + dd + '/' + yyyy;
        this.selectedOption.response_date__c=today;
        this.selectedOption.Name = event.target.value;
        
        this.saveResponse();
        
    }

    saveResponse(){
        
        Name_FIELD({
            id:this.paramValue,
            con:this.selectedOption
        })
        .then(result => {
            this.selectedOption = {};
        
        })
        .catch(error=>{
            this.error = error.message;
        });
       
    }
}