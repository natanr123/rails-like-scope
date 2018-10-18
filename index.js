function localAddToScope(func, funcName, context) {
    context[funcName] = (...args) => {
        context.currentData = func(context.currentData, ...args);
        return context;
    };
    context.finish = () => context.currentData;
    return context;
}

function localInitScope(initialArr, context) {
    context.currentData = initialArr;
    return context;
}

function withScope(theClass) {
    theClass.scope = (arr) => localInitScope(arr, {});
    theClass.addScope = function (funcName) {
        const oldScopeFunc = theClass.scope;
        theClass.scope = (arr) => {
            const funcToAdd = theClass[funcName];
            const context = oldScopeFunc(arr);
            localAddToScope(funcToAdd, funcName, context);
            return context;
        };
        return theClass;
    };
    return theClass;
}

module.exports = { withScope };
