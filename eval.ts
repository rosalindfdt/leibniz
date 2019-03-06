interface Term {
    coefficient: number;
    variable: string;
    exponent: number;
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

    evaluate() {
        let f: string = this.stripWhitespace(this.func)
        let g: Array<string> = f.match(/(\+|-)?(([0-9][0-9]*)?[a-z](\^[0-9][0-9]*)?)/g)
        for (let term in g) {
            if (g[term].match(/^(\+|-)/) === null) {
                g[term] = "+" + g[term];
            }
        }

        let c: Array<string> = f.match(/(\+|-)[0-9][0-9]*(?![a-z])/g)
        return [g, c]


    }
}

let x = {coefficient: 1, variable: "x", exponent: 2};
let f = new Polynomial("x^2 - 2x + 1");

console.log(f.evaluate());

