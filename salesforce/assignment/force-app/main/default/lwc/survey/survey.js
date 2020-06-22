import { LightningElement , track ,api } from 'lwc';
import {ShowToastEvent} from 'lightning/platformShowToastEvent';
import survey_response__c_OBJECT from '@salesforce/schema/survey_response__c';
import Name_FIELD from '@salesforce/apex/surveyLWC.saveResponse';
import getQuestion from '@salesforce/apex/surveyLWC.getQuestion';
import setStatus from '@salesforce/apex/surveyLWC.setStatus';
import getStatus from '@salesforce/apex/surveyLWC.getStatus';
import getLabelTranslator from '@salesforce/apex/LabelTranslator_Controller.getLabelTranslator';

export default class Survey extends LightningElement {
    @api recordId;
    @track question;
    @track status;
    @track flag1 = true;
    @track flag = false;
    @track surveyCompleted=false;
    @track label ;

    showMSG(){
       
        getStatus({
            id:this.paramValue
        }).then(result=>{
            this.status=result;
            
        })
      
        this.surveyMSG();
        
        
    }
    
    surveyMSG(){
        if (this.status[0]=='Cancelled') {
            console.log('from cancel');
           getLabelTranslator({label:'thank_you', language:this.status[1]})
            .then(result => {
                this.label = result;
                console.log(this.label);
            })
            setStatus({
                status:'New',
                id:this.paramValue
            })
           this.flag=true;
           this.flag1=false;
            
        }else{
            console.log('from new');
            getLabelTranslator({label:'survey_completed', language:this.status[1]})
            .then(result => {
                this.label = result;
                console.log(this.label);
            })
            this.surveyCompleted=true;
            this.flag1=false;
            
        }
        
    }
    
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
   @track first
   @track last
   connectedCallback() {
    const param = 'id';
    const firstname = 'Firstname';
    const lastname = 'Lastname';
    this.first=this.getUrlParamValue(window.location.href, firstname);
    this.last=this.getUrlParamValue(window.location.href, lastname);
    this.paramValue = this.getUrlParamValue(window.location.href, param);

    const evt = new ShowToastEvent({
        title: 'Welcome',
        message: this.first + this.last,
        variant: 'success',
        mode: 'dismissable'
    });
    this.dispatchEvent(evt);

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