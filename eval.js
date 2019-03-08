var Functions = /** @class */ (function () {
    function Functions() {
    }
    Functions.prototype.assign = function (func) {
        switch (func.func[0]) {
            case "a": {
                this.a = func;
            }
            case "b": {
                this.b = func;
            }
            case "c": {
                this.c = func;
            }
            case "d": {
                this.d = func;
            }
            case "e": {
                this.e = func;
            }
            case "f": {
                this.f = func;
            }
            case "g": {
                this.g = func;
            }
            case "h": {
                this.h = func;
            }
            case "i": {
                this.i = func;
            }
            case "j": {
                this.j = func;
            }
            case "k": {
                this.k = func;
            }
            case "l": {
                this.l = func;
            }
            case "m": {
                this.m = func;
            }
            case "n": {
                this.n = func;
            }
            case "o": {
                this.o = func;
            }
            case "p": {
                this.p = func;
            }
            case "q": {
                this.q = func;
            }
            case "r": {
                this.r = func;
            }
            case "s": {
                this.s = func;
            }
            case "t": {
                this.t = func;
            }
            case "u": {
                this.u = func;
            }
            case "v": {
                this.v = func;
            }
            case "w": {
                this.w = func;
            }
            case "x": {
                this.x = func;
            }
            case "y": {
                this.y = func;
            }
            case "z": {
                this.z = func;
            }
        }
    };
    return Functions;
}());
var Polynomial = /** @class */ (function () {
    function Polynomial(func) {
        this.func = func;
    }
    Polynomial.prototype.stripWhitespace = function (f) {
        return f.replace(/\s/g, "");
    };
    Polynomial.prototype.parse = function () {
        var f = this.func.match(/^[a-z](?=:=)\([a-z]\)/);
        return f;
    };
    Polynomial.prototype.evaluate = function () {
        var f = this.stripWhitespace(this.func);
        var g = f.match(/(\+|-)?(([0-9][0-9]*)?[a-z](\^[0-9][0-9]*)?)/g);
        for (var term in g) {
            if (g[term].match(/^(\+|-)/) === null) {
                g[term] = "+" + g[term];
            }
        }
        var h = [];
        for (var _i = 0, g_1 = g; _i < g_1.length; _i++) {
            var item = g_1[_i];
            var coefficient = item.match(/(\+|-)[0-9][0-9]*/g);
            var variable = item.match(/[a-z]/g)[0];
            var exponent = item.match(/(?<=\^)[0-9][0-9]*/g);
            if (coefficient !== null) {
                coefficient = Number(coefficient[0]);
            }
            else {
                coefficient = 1;
            }
            if (exponent !== null) {
                exponent = Number(exponent[0]);
            }
            else {
                exponent = 1;
            }
            h.push({ coefficient: coefficient, variable: variable, exponent: exponent });
        }
        var c = f.match(/(\+|-)[0-9][0-9]*(?![a-z])/g);
        var k = [];
        for (var item in c) {
            k[item] = Number(c[item]);
        }
        var constant = 0;
        for (var _a = 0, k_1 = k; _a < k_1.length; _a++) {
            var item = k_1[_a];
            constant = constant + item;
        }
        var cterm = { coefficient: constant, variable: "", exponent: 0 };
        h.push(cterm);
        return h;
    };
    return Polynomial;
}());
var x = { coefficient: 1, variable: "x", exponent: 2 };
var f = new Polynomial("x^2 - 2x + 1 - 2");
console.log(f.evaluate());
