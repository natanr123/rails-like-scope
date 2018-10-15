const { withScope } = require('./index');
class Example {
    static reverse(self) {
        return self.reverse();
    }

    static multipleBy2(self) {
        return self.map((x) => x*2);
    }

    static add(self, num) {
        return self.map((x) => x + num);
    }


}
withScope(Example).addScope('reverse').addScope('multipleBy2').addScope('add');

const result = Example.scope([1,2,3]).reverse().multipleBy2().add(5).finish();
// Should out put [ 11, 9, 7]
console.log(result);
