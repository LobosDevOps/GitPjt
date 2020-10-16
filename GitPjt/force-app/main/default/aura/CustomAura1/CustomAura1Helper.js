({
    /**
     * 成功メッセージを表示します。
     * @param {*} message メッセージ
     */
    showSuccess: function(message) {
        const toastEvent = $A.get('e.force:showToast');
        toastEvent.setParams({
            type: 'success',
            message: message
        });
        toastEvent.fire();
    },
    /**
     * エラーメッセージを表示します。
     * @param {*} message メッセージ
     */
    showError: function(message) {
        const toastEvent = $A.get('e.force:showToast');
        toastEvent.setParams({
            type: 'error',
            message: message
        });
        toastEvent.fire();
    },
    /**
     * サーバのエラーメッセージを表示します。
     * @param {*} errors エラー
     */
    showServerError: function(errors) {
        let message = 'Unknown error';
        if (errors
                && Array.isArray(errors)
                && errors.length > 0) {
            const error = errors[0];
            if (typeof error.message !== 'undefined') {
                message = error.message;
            } else if (typeof error.pageErrors !== 'undefined'
                    && Array.isArray(error.pageErrors)
                    && error.pageErrors.length > 0) {
                const pageError = error.pageErrors[0];
                if (typeof pageError.message !== 'undefined') {
                    message = pageError.message;
                }
            } else if (typeof error.fieldErrors !== 'undefined') {
                const errorMessages = [];
                for (const key of Object.keys(error.fieldErrors)) {
                    error.fieldErrors[key].forEach (v => {
                        if (typeof v.message !== 'undefined') {
                            errorMessages.push(v.message);
                        }
                    });
                }
                message = errorMessages.join('\n');
            }
        }

        const toastEvent = $A.get('e.force:showToast');
        if (typeof toastEvent !== 'undefined') {
            toastEvent.setParams({
                title: 'Server Error',
                message: message,
                type: 'error',
                mode: 'sticky'
            });
            toastEvent.fire();
        }
    },

    /**
     * 処理中を表示します。
     * @param {*} component コンポーネント
     */
    showSpinner: function(component) {
        $A.util.removeClass(component.find('spinner'), 'slds-hide');
    },

    /**
     * 処理中の表示を消します。
     * @param {*} component コンポーネント
     */
    hideSpinner: function(component) {
        $A.util.addClass(component.find('spinner'), 'slds-hide');
    },

    /**
     * モーダルウィンドウを閉じます。
     */
    closeModal: function() {
        $A.get('e.force:closeQuickAction').fire();
    },

    /**
     * タブセットの高さを設定します。
     * @param {*} component コンポーネント
     */
    setHeight: function(component) {
        if (window.innerHeight) {
            const theSize = (window.innerHeight >= 880) ?
                    620 : ((window.innerHeight >= 400) ?
                            (window.innerHeight - 260) : 140);
            component.set('v.tabsetHeight', theSize);
        }
    },

    /**
     * 入力エラーをチェックします。
     * 各コンポーネントにvalidationCheckMethodを定義しておく必要があります。
     * @param {*} component コンポーネント
     * @param {*} subComponentNames 子コンポーネント名配列
     * @return 全て正常ならtrue
     */
    validate: function(component, subComponentNames) {
        const errorMessages = subComponentNames
                .map(s => {
                    const tab = component.find(s);
                    return ((tab === undefined) ?
                            [] : tab.validationCheckMethod())
                })
                .reduce((a, c) => a.concat(c), []);
        if (errorMessages.length) {
            this.showError(errorMessages.join(''));
            return false;
        }

        return true;
    },

})