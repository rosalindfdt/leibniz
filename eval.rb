def evalFunc(line)
  # function: [a-z]\([a-z]\):=.*
  # derivative: ([a-z]('*|\([1-9][0-9]*\))\([a-z]\)|d\^([1-9][0-9]*)?[a-z]//d[a-z](\^([1-9][0-9]*)?|D\^([1-9][0-9]*)?[a-z]):= .*
  # integral: ([A-Z]\([a-z]\):= |I\(([1-9][0-9]*)*,[1-9][0-9]*\).*d[a-z]
  function = line.split(":=")
  polynomial(function[1])
end

def fundTheorem(func)
  # lim h->0 (f(a+h) - f(a)) / h
end

def polynomial(func)
  poly = func.scan(/(([2-9][0-9]*)?[a-z](\^[2-9][0-9]*)?)/) # eval terms
  # => array of form [[term, coefficient, exponent], ..., [constants]]
  poly.each do |term|
    term[0] = /[a-z]/.match(term[0])
    unless term[0].nil?
      term[0] = term[0][0]
    end
    unless term[1].nil?
      term[1] = term[1].to_i
    else
      term[1] = 1
    end
    term[2] = /[1-9][0-9]*/.match(term[2])
    unless term[2].nil?
      term[2] = term[2][0].to_i
    else
      term[2] = 1
    end
  end
  consts = func.scan(/(?<!\^)[1-9][0-9]*(?![a-z])/) # eval constants
  const = 0
  consts.each do |c|
    const += c.to_i
  end
  poly << [nil, const, 0]
  poly
end

def sumTerms(arrayfunc)
  highpower = 0
  arrayfunc.each do |term|
    highpower = term[2] unless term[2] < highpower
  end

  powers = []
  (0..highpower).each do |power|
    powers[power] = [power, []]
  end

  for power in powers
    for term in arrayfunc
      power[1] << term if term[2] == power[0]
    end
    if power[1].length > 1
      coefficient = 0
      power[1].each do |term|
        coefficient = coefficient += term[1]
      end
      power[1] = [power[1][0][0], coefficient, power[1][0][2]]
    end
    power[1] = power[1][0] if power[1][0].kind_of?(Array)
  end


  (0..highpower).each do |term|
    powers[term] = powers[term][1]
  end
  powers
end


f = evalFunc 'f(x):=x^2 + 3x + 5x + 19 + 21'

#print f
print sumTerms f
