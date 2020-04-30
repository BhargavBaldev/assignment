<aura:application extends="force:slds" controller="Distance_CalculatorController">
    <c:PageHeader/>
  	<aura:attribute name="From" type="sObject" default="{}" />
 	<c:customLookup objectAPIName="Account" IconName="standard:account" selectedRecord="{!v.From}" label="From Account"/>
  
    <aura:attribute name="To" type="sObject" default="{}" />
 	<c:customLookup objectAPIName="Account" IconName="standard:account" selectedRecord="{!v.To}" label="To Account"/>
    <br/>
    <aura:registerEvent name="loadMyEvent" type="c:Result"/>
    <lightning:button  label='Get Distance' onclick="{!c.myAction}"/><br/>
    <c:DisplayResult></c:DisplayResult>
</aura:application>