trigger CustumObj1Trigger on CustumObj1__c (before insert) {
    System.debug('CustumObj1Trigger is running!');
}