({
    onInit : function(component, event, helper) {
        helper.showSpinner(component);
        const action = component.get('c.getCustumObj1');
        action.setParams({
            recordId: component.get('v.recordId')
        });
        action.setCallback(this, function(response) {
            const state = response.getState();
            if (state === 'SUCCESS') {
                const custumObj1 = response.getReturnValue();
                component.set('v.custumObj1', custumObj1);
                component.set('v.recordTypeId', custumObj1.RecordTypeId);
            } else if (state === 'ERROR') {
                helper.showServerError(response.getError());
            }
            helper.hideSpinner(component);
        });
        $A.enqueueAction(action);
    },
    handleSubmit: function(component, event, helper) {
        event.preventDefault();
        helper.showSpinner(component);
console.log(component.get('v.custumObj1'));
        const action = component.get('c.saveCustumObj1');
        action.setParams({
            cb1: component.get('v.custumObj1')
        });
        action.setCallback(this, function(response) {
            const state = response.getState();
            if (state === 'SUCCESS') {
                $A.get('e.force:refreshView').fire();
                helper.hideSpinner(component);
                helper.showSuccess('CustumObj1を作成しました。');
            } else if (state === 'ERROR') {
                helper.hideSpinner(component);
                helper.showServerError(response.getError());
            }
        });
        $A.enqueueAction(action);
    },
})