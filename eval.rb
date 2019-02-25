def evalFunc(line)
  # function: [a-z]\([a-z]\):= .*
  # derivative: ([a-z]('*|\([1-9][0-9]*\))\([a-z]\)|d\^([1-9][0-9]*)?[a-z]//d[a-z](\^([1-9][0-9]*)?|D\^([1-9][0-9]*)?[a-z]):= .*
  # integral: ([A-Z]\([a-z]\):= |I\(([1-9][0-9]*)*,[1-9][0-9]*\).*d[a-z]
end

def fundTheorem(func)
  # lim h->0 (f(a+h) - f(a)) / h
end

def polynomial(func)
  term = func.scan /(([2-9][0-9]*)?[a-z](\^[2-9][0-9]*)?)/
  print term[0]
end

polynomial('2x^3 + 8x + 8x')
