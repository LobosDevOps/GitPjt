public with sharing class CustumObj1Controller {
    @AuraEnabled (cacheable=true)
    public static CustumObj1__c getCustumObj1(final Id recordId) {
        CustumObj1__c cb1 = [Select id, Name, RecordTypeId,
                             CustomDate1__c, CustomPicklst1__c, CustomText1__c
                             From CustumObj1__c
                             where Id = :recordId];
        return cb1;
    }

    @AuraEnabled
    public static void saveCustumObj1(final CustumObj1__c cb1) {
        System.debug('cb1 : ' + cb1);
        upsert cb1;
    }
}
