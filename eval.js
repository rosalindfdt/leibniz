var Functions = /** @class */ (function () {
    function Functions() {
    }
    //also is this?
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
        //TODO:
        // * convert to formatted string
        var f = this.func.match(/^[a-z](?=:=)\([a-z]\)/);
        return f;
    };
    Polynomial.prototype.evaluate = function () {
        //TODO:
        // *
        var f = this.stripWhitespace(this.func);
        var g = f.match(/(\+|-)?(([0-9][0-9]*)?[a-z](\^[0-9][0-9]*)?)/g);
        var c = f.match(/(\+|-)[0-9][0-9]*(?![a-z])/g);
        var x = f.match(/(\+|-)[0-9][0-9]*(?=[a-z]\^0)/g);
        var Var = f.match(/[a-z]/)[0];
        for (var term in g) {
            //prepend + to positive cx^e for consistency
            //why though
            //could just be g[0]
            if (g[term].match(/^(\+|-)/) === null) {
                g[term] = "+" + g[term];
            }
        }
        var h = [];
        for (var _i = 0, g_1 = g; _i < g_1.length; _i++) {
            var item = g_1[_i];
            var coefficientmatch = item.match(/(\+|-)([0-9][0-9]*)?/g);
            var variablematch = item.match(/[a-z](?!\^0)/g);
            var exponentmatch = item.match(/(?<=\^)[0-9][0-9]*/g);
            //console.log(coefficientmatch);
            var coefficient = void 0;
            if (coefficientmatch[0] === '+') {
                coefficient = 1;
            }
            else if (coefficientmatch[0] === '-') {
                coefficient = -1;
            }
            else {
                coefficient = Number(coefficientmatch[0]);
            }
            var variable = void 0;
            if (variablematch !== null) {
                variable = variablematch[0];
            }
            var exponent = void 0;
            if (exponentmatch !== null) {
                exponent = Number(exponentmatch[0]);
            }
            else {
                //x = x^1
                exponent = 1;
            }
            //not x^0 -- handled with constants
            if (variable !== undefined) {
                h.push({ coefficient: coefficient, variable: variable, exponent: exponent });
            }
        }
        //for (let power in h) {
        //
        //}
        //let i: Array<Term> = [];
        //for (let term in h) {
        //    let d: number = h[term].coefficient;
        //    for (let oterm of h) {
        //        if (h[term] !== oterm) {
        //            //console.log(term);
        //            //why is term a string
        //            //because in
        //            if (h[term].exponent === oterm.exponent) {
        //                //console.log(term.exponent);
        //                d = d + oterm.coefficient;
        //                console.log(d);
        //                h.splice(Number(term), 1);
        //                i.push({coefficient: d, variable: h[term].variable, exponent: h[term].exponent});
        //            }
        //        }
        //    }
        //}
        //console.log(i);
        //CONSTANT TERMS
        //TODO:
        // * x^0 YEP actually nope
        var k = [];
        for (var item in c) {
            k[item] = Number(c[item]);
        }
        for (var item in x) {
            k.push(Number(x[item]));
        }
        var constant = 0;
        for (var _a = 0, k_1 = k; _a < k_1.length; _a++) {
            var item = k_1[_a];
            constant = constant + item;
        }
        var cterm = { coefficient: constant, variable: "", exponent: 0 };
        h.push(cterm);
        var highpower = 0;
        //THIS IS A THING NOW AYY
        for (var _b = 0, h_1 = h; _b < h_1.length; _b++) {
            var hedgehog = h_1[_b];
            if (hedgehog.exponent > highpower) {
                highpower = hedgehog.exponent;
            }
        }
        var l = [];
        for (var i = 0; i <= highpower; i++) {
            var coefficient = 0;
            for (var _c = 0, h_2 = h; _c < h_2.length; _c++) {
                var hedgehog = h_2[_c];
                if (hedgehog.exponent === i) {
                    coefficient += hedgehog.coefficient;
                    //console.log(coefficient);
                }
            }
            l.unshift({ coefficient: coefficient, variable: Var, exponent: i });
        }
        for (var hedgehog in l) {
            if (l[hedgehog].exponent === 0) {
                l[hedgehog].variable = null;
            }
        }
        return l;
    };
    return Polynomial;
}());
var f = new Polynomial("x^2 - 2x + 1 - 2 + 4x^0 + 9x - 5x + 8x^2 -x^2+7x^3");
console.log(f.evaluate());
