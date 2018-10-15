function addToScope(func, context) {

    context[func.name] = () => {
        context.___currentData = func(context.___currentData);
        return context;
    };

    context.finish = () => {
        return context.___currentData;
    };
    return context;
}

function initScope(initialArr, context) {
    context.___currentData =  initialArr;
    return context;
}


// @TODO clone the class instead of change it
function withScope(theClass) {
    theClass.scope = (arr) => { return initScope(arr, {})};

    theClass.addScope = function (funcName) {
        const oldScopeFunc = theClass.scope;
        theClass.scope = (arr) => {
            const funcToAdd = theClass[funcName];
            const context = oldScopeFunc(arr);
            addToScope(funcToAdd, context);
            return context;
        };
        return theClass;
    };
    return theClass;
}
module.exports = { withScope };
/*
// Old Code
Function.prototype.scopable = function (funcName) {

    if(this.scope === undefined) {
        this.scope = (arr) => { return initScope(arr, {})};
    }

    const oldScopeFunc = this.scope;
    this.scope = (arr) => {
        const funcToAdd = this[funcName];
        const context = oldScopeFunc(arr);
        addToScope(funcToAdd, context);
        return context;
    };
    return this;
};
*/

