interface Term {
    coefficient: number;
    variable: string;
    exponent: number;
}

class Functions {
    //are these necessary?
    a?: Polynomial;
    b?: Polynomial;
    c?: Polynomial;
    d?: Polynomial;
    e?: Polynomial;
    f?: Polynomial;
    g?: Polynomial;
    h?: Polynomial;
    i?: Polynomial;
    j?: Polynomial;
    k?: Polynomial;
    l?: Polynomial;
    m?: Polynomial;
    n?: Polynomial;
    o?: Polynomial;
    p?: Polynomial;
    q?: Polynomial;
    r?: Polynomial;
    s?: Polynomial;
    t?: Polynomial;
    u?: Polynomial;
    v?: Polynomial;
    w?: Polynomial;
    x?: Polynomial;
    y?: Polynomial;
    z?: Polynomial;

    //also is this?
    assign(func: Polynomial) {
        switch(func.func[0]) {
            case "a": { this.a = func; }
            case "b": { this.b = func; }
            case "c": { this.c = func; }
            case "d": { this.d = func; }
            case "e": { this.e = func; }
            case "f": { this.f = func; }
            case "g": { this.g = func; }
            case "h": { this.h = func; }
            case "i": { this.i = func; }
            case "j": { this.j = func; }
            case "k": { this.k = func; }
            case "l": { this.l = func; }
            case "m": { this.m = func; }
            case "n": { this.n = func; }
            case "o": { this.o = func; }
            case "p": { this.p = func; }
            case "q": { this.q = func; }
            case "r": { this.r = func; }
            case "s": { this.s = func; }
            case "t": { this.t = func; }
            case "u": { this.u = func; }
            case "v": { this.v = func; }
            case "w": { this.w = func; }
            case "x": { this.x = func; }
            case "y": { this.y = func; }
            case "z": { this.z = func; }
        }
    }
}

class Polynomial {
    func: string;
    polynomial: Array<Term>;

    constructor(func: string) {
        this.func = func;
    }

    stripWhitespace(f: string) {
        return f.replace(/\s/g, "");
    }

    parse() {
        //TODO:
        // * convert to formatted string
        let f: Array<string> = this.func.match(/^[a-z](?=:=)\([a-z]\)/);
        return f;
    }

    evaluate() {
        //TODO:
        // *

        let f: string = this.stripWhitespace(this.func);
        let g: RegExpMatchArray = f.match(/(\+|-)?(([0-9][0-9]*)?[a-z](\^[0-9][0-9]*)?)/g);
        let c: RegExpMatchArray = f.match(/(\+|-)[0-9][0-9]*(?![a-z])/g);
        let x: RegExpMatchArray = f.match(/(\+|-)[0-9][0-9]*(?=[a-z]\^0)/g);

        let Var: string = f.match(/[a-z]/)[0];
        for (let term in g) {
            //prepend + to positive cx^e for consistency
            //why though
            //could just be g[0]
            if (g[term].match(/^(\+|-)/) === null) {
                g[term] = "+" + g[term];
            }
        }

        let h: Array<Term> = [];
        for (let item of g) {
            let coefficientmatch: RegExpMatchArray = item.match(/(\+|-)([0-9][0-9]*)?/g);
            let variablematch: RegExpMatchArray = item.match(/[a-z](?!\^0)/g);
            let exponentmatch: RegExpMatchArray = item.match(/(?<=\^)[0-9][0-9]*/g)
            //console.log(coefficientmatch);

            let coefficient: number;
            if (coefficientmatch[0] === '+') {
                coefficient = 1;
            } else if (coefficientmatch[0] ===  '-') {
                coefficient = -1;
            } else {
                coefficient = Number(coefficientmatch[0]);
            }


            let variable: string;
            if (variablematch !== null) {
                variable = variablematch[0]
            }

            let exponent: number;
            if (exponentmatch !== null) {
                exponent = Number(exponentmatch[0]);
            } else {
                //x = x^1
                exponent = 1;
            }

            //not x^0 -- handled with constants
            if (variable !== undefined) {
                h.push({coefficient: coefficient, variable: variable, exponent: exponent});
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

        let k: Array<number> = [];
        for (let item in c) {
            k[item] = Number(c[item]);
        }
        for (let item in x) {
            k.push(Number(x[item]));
        }

        let constant: number = 0;
        for (let item of k) {
            constant = constant + item;
        }

        let cterm: Term = {coefficient: constant, variable: null,  exponent: 0};

        h.push(cterm);

        let highpower: number = 0;
        //THIS IS A THING NOW AYY
        for (let hedgehog of h) {
            if (hedgehog.exponent > highpower) {
                highpower = hedgehog.exponent;
            }
        }

        let l: Array<Term> = [];
        for (let i = 0; i <= highpower; i++) {
            let coefficient: number = 0;
            for (let hedgehog of h) {
                if (hedgehog.exponent === i) {
                    coefficient += hedgehog.coefficient;
                    //console.log(coefficient);
                }
            }
            l.unshift({coefficient: coefficient, variable: Var, exponent: i})
        }

        for (let hedgehog in l) {
            if (l[hedgehog].exponent === 0 ) {
                l[hedgehog].variable = null;
            }
        }

        return l;

    }
}

let f = new Polynomial("x^2 - 2x + 1 - 2 + 4x^0 + 9x - 5x + 8x^2 -x^2+7x^3");

console.log(f.evaluate());
