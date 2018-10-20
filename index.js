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
// @TODO finish this function
function withScopeArr(theClass) {
    theClass.scope = ()=>{
        class newClass {
            scope(arrNames) {
                const context = localInitScope({});
                for(let i=0; i<=arrNames.length; i++) {
                    localAddToScope(theClass[arrNames[i]],null,context);
                }
            }

        }

        return new newClass();
    }

}

module.exports = { withScope };
