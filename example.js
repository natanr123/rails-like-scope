const { withScope } = require('./index');
class Example {
    static reverse(self) {
        return self.reverse();
    }

    static multipleBy2(self) {
        return self.map(x => x*2);
    }

}
withScope(Example).addScope('reverse').addScope('multipleBy2');

const result = Example.scope([1,2,3]).reverse().multipleBy2().finish();
// Should out put [ 6, 4, 2]
console.log(result);
