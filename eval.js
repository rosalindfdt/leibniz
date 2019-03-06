var Polynomial = /** @class */ (function () {
    function Polynomial(func) {
        this.func = func;
    }
    Polynomial.prototype.stripWhitespace = function (f) {
        return f.replace(/\s/g, "");
    };
    Polynomial.prototype.evaluate = function () {
        var f = this.stripWhitespace(this.func);
        var g = f.match(/(\+|-)?(([0-9][0-9]*)?[a-z](\^[0-9][0-9]*)?)/g);
        for (var term in g) {
            if (g[term].match(/^(\+|-)/) === null) {
                g[term] = "+" + g[term];
            }
        }
        var c = f.match(/(\+|-)[0-9][0-9]*(?![a-z])/g);
        return [g, c];
    };
    return Polynomial;
}());
var x = { coefficient: 1, variable: "x", exponent: 2 };
var f = new Polynomial("x^2 - 2x + 1");
console.log(f.evaluate());
