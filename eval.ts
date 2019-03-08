interface Term {
    coefficient: number;
    variable: string;
    exponent: number;
}

class Functions {
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
        //* convert back to formatted string
        let f: Array<string> = this.func.match(/^[a-z](?=:=)\([a-z]\)/);
        return f;
    }

    evaluate() {
        let f: string = this.stripWhitespace(this.func)
        let g: Array<string> = f.match(/(\+|-)?(([0-9][0-9]*)?[a-z](\^[0-9][0-9]*)?)/g)
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
            let coefficientmatch: RegExpMatchArray = item.match(/(\+|-)[0-9][0-9]*/g);
            let variablematch: RegExpMatchArray = item.match(/[a-z]/g);
            let exponentmatch: RegExpMatchArray = item.match(/(?<=\^)[0-9][0-9]*/g)

            if (coefficient !== null) {
                let coefficient: number = Number(coefficientmatch[0]);
            } else {
                //x = 1x
                let coefficient: number = 1
            }

            //variable is not optional and not going to be null
            //this is kinda unnecessary but consistent could just be match[0]
            let variable: string = variablematch[0]

            if (exponent !== null) {
                let exponent: number = Number(exponentmatch[0]);
            } else {
                //x = x^1
                let exponent: number = 1;
            }

            h.push({coefficient: coefficient, variable: variable, exponent: exponent});
        }

        //CONSTANT TERMS
        //TODO:
        //* x^0
        let c: Array<string> = f.match(/(\+|-)[0-9][0-9]*(?![a-z])/g)
        let k: Array<number> = [];
        for (let item in c) {
            k[item] = Number(c[item]);
        }

        let constant: number = 0;
        for (let item of k) {
            constant = constant + item;
        }

        let cterm: Term = {coefficient: constant, variable: "",  exponent: 0};

        h.push(cterm);

        return h;

    }
}

let f = new Polynomial("x^2 - 2x + 1 - 2");

console.log(f.evaluate());
