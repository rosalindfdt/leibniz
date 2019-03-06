module Polynomial

  def extractTerms(func)
    terms = func.scan(/(([2-9][0-9]*)?[a-z](\^[2-9][0-9]*)?)/)
    # form: [["variable", "coefficient", "^exponent"], ...]

    terms.each do |term|
      term[0] = /[a-z]/.match(term[0])
      unless term[0].nil?
        term[0] = term [0][0]
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
    consts = func.scan(/(?<!(\+ |\+))[1-9][0-9]*(?![a-z])/)
    const = 0
    consts.each do |c|
      const += c.to_i
    end
    terms << [nil, const, 0]

    highpower = 0
    terms.each do |term|
      highpower = term[2] unless term[2] < highpower
    end

    powers = []
    (0..highpower).each do |power|
      powers[power] = [power, []]
    end

    for power in powers
      for term in terms
        power[1] << term if term[2] == power[0]
      end
      if power[1].length > 1
        coefficient = 0
        power[1].each do |term|
          coefficient += term[1]
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

end

class Function
  include Polynomial

  def initialize(func)
    @input = func
  end

  def function
    extractTerms(@input)
  end

end

f= Function.new("x^2 +  x + x + 1")
print f.function
