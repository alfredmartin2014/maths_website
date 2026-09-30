const normaliseMathText = (text) => {
  if (!text) return text;

  return text
    .replace(/\bSine\b/gi, 'sin')
    .replace(/\bCosine\b/gi, 'cos')
    .replace(/\bTangent\b/gi, 'tan')
    .replace(/\bInverse sine\b/gi, 'inverse sin')
    .replace(/\bInverse cosine\b/gi, 'inverse cos')
    .replace(/\bInverse tangent\b/gi, 'inverse tan');
};

const lessons = {
  number: { category: 'Foundations', title: 'Number', intro: 'Build fluency with the number skills that support every GCSE topic.', steps: ['Read the question carefully and identify the operation or relationship needed.', 'Estimate the answer first so you can check whether your final result is sensible.', 'Work accurately with fractions, decimals, factors, primes, and order of operations.', 'Check your answer using an inverse operation or a second method.'], example: 'Work out 3/4 + 0.2', answer: '3/4 = 0.75, so 0.75 + 0.2 = 0.95', practice: 'Work out 2.5 x 0.4.', practiceAnswer: '1', },
  algebra: { category: 'Expressions and symbols', title: 'Algebra', intro: 'Use letters to represent unknown values and describe patterns clearly.', steps: ['Identify the variable and what it represents.', 'Simplify like terms by collecting terms with the same variable and power.', 'Substitute known values carefully, using brackets for negative numbers.', 'Check by putting your result back into the original expression.'], example: 'Simplify 4x + 3 - x + 5', answer: 'Collect like terms: 4x - x = 3x and 3 + 5 = 8, so the answer is 3x + 8.', practice: 'Expand and simplify 2(3x - 4) + x.', practiceAnswer: '6x - 8 + x = 7x - 8', },
  equations: { category: 'Algebra', title: 'Equations', intro: 'Solve equations by keeping both sides balanced while you isolate the unknown.', steps: ['Simplify each side if needed.', 'Undo addition or subtraction first.', 'Undo multiplication or division next.', 'Substitute your answer back to check both sides match.'], example: 'Solve 3x + 7 = 25', answer: 'Subtract 7: 3x = 18. Divide by 3: x = 6.', practice: 'Solve 4x + 9 = 29.', practiceAnswer: 'x = 5', },
  inequalities: { category: 'Algebra', title: 'Inequalities', intro: 'Describe a range of possible values rather than one exact answer.', steps: ['Solve the inequality like an equation.', 'Reverse the inequality sign when multiplying or dividing by a negative.', 'Show the solution on a number line with an open or closed circle.', 'Test one value from your region to check it works.'], example: 'Solve 2x + 1 < 9', answer: '2x < 8, so x < 4. The circle at 4 is open.', practice: 'Solve 5 - 2x < 11.', practiceAnswer: 'x > -3', },
  ratio: { category: 'Proportion', title: 'Ratio and Proportion', intro: 'Compare quantities and scale relationships without losing the connection between them.', steps: ['Make sure all quantities use the same units.', 'Simplify the ratio by dividing each part by the highest common factor.', 'Use the scale factor to move from a ratio to actual amounts.', 'Check that the total parts add to the whole.'], example: 'Share 35 in the ratio 2:5', answer: 'There are 7 parts. Each part is 5, so the shares are 10 and 25.', practice: 'Share 64 in the ratio 3:5.', practiceAnswer: '24 and 40', },
  percentages: { category: 'Everyday maths', title: 'Percentages', intro: 'Use percentages to compare amounts, calculate change, and solve real-world problems.', steps: ['Convert the percentage to a decimal multiplier when useful.', 'For an increase, use 1 + the percentage as a decimal.', 'For a decrease, use 1 - the percentage as a decimal.', 'Round only at the end and check whether the result should be larger or smaller.'], example: 'Increase 80 by 15%', answer: 'The multiplier is 1.15. 80 x 1.15 = 92.', practice: 'A jacket costs £72 after a 20% discount. Find its original price.', practiceAnswer: '£72 is 80% of the original price, so £72 / 0.8 = £90.', },
  sequences: { category: 'Patterns', title: 'Sequences', intro: 'Find the rule connecting terms and use it to predict any position in the sequence.', steps: ['Find the common difference for a linear sequence.', 'Use the first term and difference to form an nth-term rule.', 'Substitute the requested position into the rule.', 'Check the rule generates the first few terms.'], example: 'Find the nth term of 5, 8, 11, 14...', answer: 'The difference is 3. The nth term is 3n + 2.', practice: 'Find the 12th term of 6, 10, 14, 18, ...', practiceAnswer: 'The nth term is 4n + 2, so the 12th term is 50.', },
  graphs: { category: 'Representing maths', title: 'Graphs', intro: 'Turn equations into pictures so you can see relationships, intersections, and change.', steps: ['Choose a sensible scale for each axis.', 'Make a table of values from the equation.', 'Plot coordinates carefully and label the axes.', 'Join points smoothly only when the relationship is continuous.'], example: 'Plot y = 2x + 1 for x = 0, 1, 2', answer: 'The points are (0, 1), (1, 3), and (2, 5).', practice: 'For y = -3x + 10, find y when x = 4.', practiceAnswer: '-2', },
  coordinates: { category: 'Graphs', title: 'Coordinates', intro: 'Locate points and describe lines precisely on a coordinate grid.', steps: ['Read the x-coordinate first, then the y-coordinate.', 'Use gradient = change in y / change in x.', 'Use the midpoint formula by averaging both coordinates.', 'Keep negative signs visible when working in different quadrants.'], example: 'Find the midpoint of (2, 4) and (8, 10)', answer: 'Average the coordinates: ((2 + 8)/2, (4 + 10)/2) = (5, 7).', practice: 'Find the midpoint of (-3, 2) and (7, 8).', practiceAnswer: '(2, 5)', },
  calculus: { category: 'Change and motion', title: 'Calculus', intro: 'Study how quantities change and how small pieces combine into totals.', steps: ['Use differentiation to find the rate of change at a point.', 'Apply the power rule: the derivative of x^n is n x^(n - 1).', 'Differentiate each term separately, including constants.', 'Check your result by considering the gradient of the original function.'], example: 'Differentiate y = x^2 + 3x.', answer: 'dy/dx = 2x + 3. The derivative of x^2 is 2x, and the derivative of 3x is 3.', practice: 'Differentiate y = 4x^2 + 2x.', practiceAnswer: 'dy/dx = 8x + 2', },
  geometry: { category: 'Space and shape', title: 'Geometry', intro: 'Use angle facts and properties of shapes to build reliable geometric arguments.', steps: ['Mark the information given in the diagram.', 'Choose the angle fact that connects the known and unknown angles.', 'Write a clear equation before calculating.', 'State the reason for each important step.'], example: 'Two angles in a triangle are 45 and 65. Find the third.', answer: 'Angles in a triangle total 180, so the third angle is 180 - 45 - 65 = 70 degrees.', practice: 'Find each interior angle of a regular hexagon.', practiceAnswer: '120 degrees', },
  transformations: { category: 'Space and shape', title: 'Transformations', intro: 'Move and resize shapes using precise rules on a coordinate grid.', steps: ['Identify whether the transformation is a translation, reflection, rotation, or enlargement.', 'For a translation, write the vector; for a rotation, give the centre and angle.', 'Track one point first, then apply the same rule to the whole shape.', 'Check lengths, angles, or parallel sides that should remain unchanged.'], example: 'Translate (2, 1) by the vector (3, -2)', answer: 'Add the vector: (2 + 3, 1 - 2) = (5, -1).', practice: 'Rotate (2, -1) 90 degrees clockwise about the origin.', practiceAnswer: '(-1, -2)', },
  pythagoras: { category: 'Right-angled triangles', title: 'Pythagoras', intro: 'Find a missing side in a right-angled triangle using a squared relationship.', steps: ['Identify the right angle and the hypotenuse opposite it.', 'Use a² + b² = c² with c as the hypotenuse.', 'Rearrange before substituting if the missing side is not c.', 'Square root the final value and include suitable units.'], example: 'Find the hypotenuse when the shorter sides are 6 and 8.', answer: 'c² = 6² + 8² = 100, so c = 10.', practice: 'A right triangle has a hypotenuse of 10 cm and one shorter side of 6 cm. Find the other side.', practiceAnswer: '8 cm', },
  trigonometry: { category: 'Right-angled triangles', title: 'Trigonometry', intro: 'Use SOHCAHTOA to connect angles and sides in right-angled triangles.', steps: ['Label the opposite, adjacent, and hypotenuse sides relative to the known angle.', 'Choose sin, cos, or tan from SOHCAHTOA.', 'Substitute the values and use the inverse trig function for an angle.', 'Check your calculator is in degree mode.'], example: 'Find the opposite side when angle = 30 degrees and hypotenuse = 10.', answer: 'sin(30) = opposite / 10, so opposite = 10 x 0.5 = 5.', practice: 'A right triangle has a 60 degree angle and an adjacent side of 8 cm. Find the hypotenuse.', practiceAnswer: '16 cm', },
  'circle-theorems': { category: 'Circles', title: 'Circle Theorems', intro: 'Use fixed angle relationships to solve problems involving chords, arcs, and tangents.', steps: ['Mark the angles and radii shown in the diagram.', 'Look for a centre, circumference, tangent, or cyclic quadrilateral.', 'Apply the matching theorem and write the reason.', 'Use angle totals to finish the calculation.'], example: 'An angle at the centre is 84 degrees. Find the angle at the circumference on the same arc.', answer: 'The angle at the circumference is half the angle at the centre: 84 / 2 = 42 degrees.', practice: 'What angle is subtended by a diameter at the circumference?', practiceAnswer: '90 degrees', },
  vectors: { category: 'Geometry', title: 'Vectors', intro: 'Describe direction and movement with mathematical arrows.', steps: ['Treat a vector as a movement from one point to another.', 'Add vectors by adding corresponding components.', 'Use a negative vector for the opposite direction.', 'For proofs, express both paths using the same vector terms.'], example: 'If a = (2, 3) and b = (4, -1), find a + b.', answer: 'Add components: a + b = (2 + 4, 3 - 1) = (6, 2).', practice: 'If a = (2, -1) and b = (-3, 4), find a - b.', practiceAnswer: '(5, -5)', },
  'area-volume': { category: 'Measures', title: 'Area and Volume', intro: 'Measure flat shapes and solid objects by choosing the right formula and units.', steps: ['Identify the shape and write the correct formula.', 'Substitute lengths with matching units.', 'For volume, remember the answer uses cubic units.', 'Estimate the size first to catch calculator errors.'], example: 'Find the area of a triangle with base 8 cm and height 5 cm.', answer: 'Area = 1/2 x 8 x 5 = 20 cm².', practice: 'Find the total surface area of a cube with side length 4 cm.', practiceAnswer: '6 x 4² = 96 cm²', },
  measures: { category: 'Measures', title: 'Measures', intro: 'Choose sensible units, convert accurately, and give answers to an appropriate precision.', steps: ['Write down the units in the question and answer.', 'Convert before calculating if the units do not match.', 'Use standard form for very large or very small values.', 'Round only as the question requests.'], example: 'Convert 2.4 metres into centimetres.', answer: '1 metre is 100 centimetres, so 2.4 m = 240 cm.', practice: 'Write 0.00056 in standard form.', practiceAnswer: '5.6 x 10^-4', },
  probability: { category: 'Chance and risk', title: 'Probability', intro: 'Measure how likely events are and represent outcomes systematically.', steps: ['List all equally likely outcomes where possible.', 'Use probability = favourable outcomes / total outcomes.', 'For independent events, multiply probabilities along a branch.', 'Check every probability is between 0 and 1.'], example: 'What is the probability of rolling an even number on a fair die?', answer: 'There are 3 even outcomes out of 6, so 3/6 = 1/2.', practice: 'A spinner has 8 equal sections, 3 of them red. What is the probability it does not land on red?', practiceAnswer: '5/8', },
  statistics: { category: 'Data and evidence', title: 'Statistics', intro: 'Summarise, compare, and interpret data without being misled by a graph.', steps: ['Identify the type of data and the most useful average.', 'Calculate the mean, median, mode, or range carefully.', 'Read scales and labels before comparing distributions.', 'Use the shape and spread of the data in your conclusion.'], example: 'Find the mean of 4, 7, 8, 11.', answer: 'Add the values to get 30, then divide by 4: mean = 7.5.', practice: 'Find the interquartile range of 2, 4, 5, 7, 8, 10, 11, 13.', practiceAnswer: 'The lower quartile is 4.5 and the upper quartile is 10.5, so the interquartile range is 6.', },
  sampling: { category: 'Data and evidence', title: 'Sampling', intro: 'Learn how data is collected and how a sample can represent a wider population.', steps: ['Define the population you want to understand.', 'Choose a sample method that limits bias.', 'Make the sample large and varied enough for the question.', 'State limits when using a sample to predict the population.'], example: 'Why might a random sample be useful?', answer: 'It gives every member of the population a fair chance of selection, reducing selection bias.', practice: 'A group makes up 25% of a population. How many people from this group belong in a proportional sample of 60?', practiceAnswer: '15 people', },
  'financial-maths': { category: 'Everyday maths', title: 'Financial Maths', intro: 'Use percentages and arithmetic to make sense of money in real situations.', steps: ['Write down the original amount and the change.', 'Choose a multiplier for discounts, tax, or interest.', 'Keep money calculations accurate to two decimal places.', 'Check that the final amount makes sense in context.'], example: 'A £60 item has a 20% discount. Find the sale price.', answer: 'Pay 80%: £60 x 0.8 = £48.', practice: 'At a rate of £1 = €1.16, how many euros do you get for £75?', practiceAnswer: '£75 x 1.16 = €87', },
  indices: { category: 'Number', title: 'Indices and Surds', intro: 'Work with powers and exact roots using rules that keep expressions manageable.', steps: ['Apply index laws to powers with the same base.', 'Use negative indices to represent reciprocals.', 'Simplify square roots by taking out square factors.', 'Keep exact answers as surds unless a decimal is requested.'], example: 'Simplify 2³ × 2⁴.', answer: 'Add the powers: 2³ × 2⁴ = 2⁷ = 128.', practice: 'Write 0.00072 in standard form.', practiceAnswer: '7.2 x 10^-4', },
  quadratics: { category: 'Algebra', title: 'Quadratics', intro: 'Solve and interpret equations with a squared term and understand their parabolic graphs.', steps: ['Put the equation equal to zero.', 'Try factorising first, then use completing the square or the quadratic formula.', 'Check both roots in the original equation.', 'Use the graph to interpret roots, turning points, and intersections.'], example: 'Solve x² - 5x + 6 = 0.', answer: 'Factorise: (x - 2)(x - 3) = 0, so x = 2 or x = 3.', practice: 'Solve x² - 9 = 0.', practiceAnswer: 'x = 3 or x = -3', },
  proof: { category: 'Reasoning', title: 'Proof', intro: 'Explain why a mathematical statement must be true, not just why it works once.', steps: ['Start with a general variable or the information given.', 'Use valid algebraic or geometric facts at each step.', 'Avoid relying on one example as proof.', 'Finish with a clear statement that the result is always true.'], example: 'Prove the sum of two odd numbers is even.', answer: 'Let the odd numbers be 2a + 1 and 2b + 1. Their sum is 2a + 2b + 2 = 2(a + b + 1), which is even.', practice: 'Show that the sum of two consecutive integers is odd.', practiceAnswer: 'Let the integers be n and n + 1. Their sum is 2n + 1, which is odd.', },
};

Object.values(lessons).forEach((lesson) => {
  lesson.category = normaliseMathText(lesson.category);
  lesson.title = normaliseMathText(lesson.title);
  lesson.intro = normaliseMathText(lesson.intro);
  lesson.steps = lesson.steps.map(normaliseMathText);
  lesson.example = normaliseMathText(lesson.example);
  lesson.answer = normaliseMathText(lesson.answer);
  lesson.practice = normaliseMathText(lesson.practice);
  lesson.practiceAnswer = normaliseMathText(lesson.practiceAnswer);
});

const deepDives = {
  number: ['Use prime factorisation to find highest common factors and lowest common multiples efficiently.', 'Convert recurring decimals to fractions by using algebra when an exact answer is required.', 'Use bounds when values have been rounded: a value rounded to the nearest unit is within half a unit either side.', 'Keep fractions exact until the final step; premature decimals can create rounding errors.'],
  algebra: ['Expand brackets carefully, including negative signs and double brackets such as (x + 3)(x - 2).', 'Factorising reverses expansion: look first for a common factor, then for quadratics and difference of two squares.', 'When substituting a negative value, put it in brackets before applying powers or multiplication.', 'Algebraic fractions can be simplified by factorising the numerator and denominator before cancelling common factors.'],
  equations: ['The balance method works because the same operation must be applied to both sides of an equation.', 'For equations with fractions, multiply every term by the lowest common denominator before solving.', 'For simultaneous equations, eliminate one variable by adding or subtracting equations, or substitute one into the other.', 'Check solutions in the original equation, especially after squaring both sides or clearing fractions.'],
  inequalities: ['The solution set contains many values, so use a variable statement and a number-line diagram together.', 'An open circle represents < or >; a closed circle represents <= or >=.', 'Reversing the sign when dividing by a negative is essential: -2x > 6 becomes x < -3.', 'For two inequalities, look for the overlap; for an OR statement, combine both regions.'],
  ratio: ['A ratio compares parts, while a fraction of an amount compares one part with a whole.', 'For a shared total, add the ratio parts first, then divide the total by that number of parts.', 'Use a scale factor for maps, recipes, similar shapes, and best-buy questions.', 'In direct proportion, doubling one quantity doubles the other; in inverse proportion, their product stays constant.'],
  percentages: ['A percentage change is not the same as percentage points; always identify the original amount.', 'Successive percentage changes multiply, so a 10% increase followed by 10% decrease is not no change.', 'Reverse percentage questions require division by the multiplier, not subtraction of the percentage.', 'Compound interest and repeated growth use powers of the multiplier: original × multiplier raised to the number of periods.'],
  sequences: ['The first difference identifies a linear sequence; constant second differences identify a quadratic sequence.', 'For a linear nth term, the coefficient of n is the common difference.', 'A recurrence relation gives the next term from the previous one, so state the starting term too.', 'A sequence can be geometric when each term is multiplied by a constant ratio rather than increased by a constant difference.'],
  graphs: ['The gradient describes rate of change and the y-intercept is the value when x = 0.', 'A quadratic graph has a line of symmetry through its turning point; roots are where it crosses the x-axis.', 'Use graph intersections to solve equations involving two relationships.', 'Label scales clearly and do not join separate discrete values unless the context makes them continuous.'],
  coordinates: ['Gradient is rise over run, so keep the order of the points consistent in both numerator and denominator.', 'Parallel lines have equal gradients; perpendicular lines have gradients whose product is -1.', 'The equation y = mx + c gives the gradient m and y-intercept c directly.', 'For a perpendicular bisector, find the midpoint and use the negative reciprocal gradient.'],
  calculus: ['A derivative gives the instantaneous rate of change, or gradient, of a function.', 'Use the power rule to differentiate each term in a polynomial.', 'The derivative of a constant is zero because it does not change as x changes.', 'Integration reverses differentiation and can find accumulated totals or areas under a curve.'],
  geometry: ['Angles on a straight line total 180 degrees, angles around a point total 360 degrees, and vertically opposite angles are equal.', 'Parallel lines create equal corresponding and alternate angles, with co-interior angles adding to 180 degrees.', 'Interior angles of an n-sided polygon total (n - 2) x 180 degrees.', 'A proof should name the angle fact used, not just write a sequence of unexplained numbers.'],
  transformations: ['Translations move every point by the same vector and preserve size, angles, and orientation.', 'Reflections use a mirror line; points stay the same perpendicular distance from that line.', 'Rotations need a centre, angle, and direction; use tracing or coordinates to avoid guessing.', 'An enlargement needs a scale factor and centre; a negative scale factor places the image on the opposite side of the centre.'],
  pythagoras: ['Pythagoras only applies to right-angled triangles, and the hypotenuse is always opposite the right angle.', 'For a shorter side, subtract the known squared sides before taking the square root.', 'A converse proof can show a triangle is right-angled by checking whether a² + b² = c².', 'Keep units consistent and remember that squared lengths produce square units before the final square root.'],
  trigonometry: ['SOHCAHTOA applies to right-angled triangles; label the sides from the chosen angle, not from the page orientation.', 'Use inverse sin, cos, or tan when the unknown is an angle.', 'For non-right-angled triangles, the sine rule and cosine rule extend the same ideas.', 'Draw a quick sketch and estimate the angle before using the calculator to catch an incorrect ratio.'],
  'circle-theorems': ['The angle at the centre is twice the angle at the circumference standing on the same arc.', 'Angles in the same segment are equal, and opposite angles in a cyclic quadrilateral sum to 180 degrees.', 'A tangent meets a radius at 90 degrees, and the tangent-chord theorem links a tangent angle to the alternate segment.', 'Mark equal radii and use isosceles triangle facts when a diagram contains the centre.'],
  vectors: ['A column vector shows horizontal movement above vertical movement; signs indicate direction.', 'A vector can be multiplied by a scalar, which changes its length and may reverse its direction.', 'The vector from A to B is position vector of B minus position vector of A.', 'For geometric proofs, show two routes between the same points and prove their vector expressions are equal.'],
  'area-volume': ['Area measures a surface in square units; volume measures space in cubic units.', 'For compound shapes, split the figure into familiar pieces and add or subtract their areas.', 'Surface area includes every exposed face, so draw a net or list each face before calculating.', 'A prism has volume equal to cross-sectional area multiplied by length.'],
  measures: ['Metric conversions scale by powers of ten: moving from metres to centimetres multiplies by 100.', 'Standard form is a × 10ⁿ where 1 <= a < 10; count the place-value moves carefully.', 'Upper and lower bounds depend on the rounding instruction and can be used to find a maximum possible error.', 'Use significant figures for measurement data and decimal places when the question specifies a fixed number of places.'],
  probability: ['The probabilities of all mutually exclusive outcomes add to 1.', 'For AND events, multiply along branches; for OR events, add mutually exclusive branches.', 'Conditional probability changes the sample space after information is given.', 'Use tree diagrams or two-way tables to avoid counting the same outcome twice.'],
  statistics: ['The mean uses every value but is sensitive to outliers; the median is often more representative for skewed data.', 'The interquartile range measures the spread of the middle half and is less affected by extreme values.', 'A misleading graph can use a truncated axis or unequal intervals, so inspect scales before interpreting it.', 'Correlation does not prove causation; a scatter graph can show association without explaining why it occurs.'],
  sampling: ['A simple random sample reduces selection bias, while systematic sampling selects at regular intervals.', 'Stratified sampling keeps subgroup proportions similar to the population.', 'A voluntary response sample can overrepresent people with strong opinions.', 'A larger random sample usually gives a more reliable estimate, but it cannot remove a biased question or method.'],
  'financial-maths': ['Simple interest is calculated from the original principal each time; compound interest adds interest to the growing balance.', 'Profit is selling price minus cost price, while percentage profit divides profit by cost price.', 'Use exchange-rate units carefully and state which currency is being converted from and to.', 'A recurring payment, tax, or depreciation problem can often be modelled with a percentage multiplier.'],
  indices: ['When multiplying powers with the same base, add indices; when dividing, subtract them; for a power of a power, multiply them.', 'A zero index gives 1 for any non-zero base, while a negative index gives a reciprocal.', 'Simplify surds by taking out the largest square factor, then rationalise denominators when required.', 'Keep exact surd answers until the final line so rounding does not alter the result.'],
  quadratics: ['The graph of y = ax² + bx + c opens up when a is positive and down when a is negative.', 'Factorising is quickest when the roots are integers; otherwise use completing the square or the quadratic formula.', 'The discriminant b² - 4ac tells you whether there are two, one, or no real roots.', 'The turning point can be found by completing the square or using x = -b/(2a).'],
  proof: ['A counterexample disproves a universal claim, but one successful example cannot prove one.', 'Use even numbers as 2n and odd numbers as 2n + 1 for general algebraic proofs.', 'For divisibility, finish with a visible factor such as 3k or 5k where k is an integer.', 'Write reasons in a logical order so every line follows from the previous one.'],
};

Object.keys(deepDives).forEach((topicName) => {
  deepDives[topicName] = deepDives[topicName].map(normaliseMathText);
});

const quizBank = {
  number: [
    { prompt: 'Work out 3/4 + 0.2.', options: ['0.85', '0.95', '1.05'], answer: '0.95' },
    { prompt: 'What is the highest common factor of 18 and 24?', options: ['3', '6', '12'], answer: '6' },
  ],
  algebra: [
    { prompt: 'Simplify 7a - 2 + 3a + 9.', options: ['10a + 7', '10a - 7', '4a + 7'], answer: '10a + 7' },
    { prompt: 'Expand 3(x + 4).', options: ['3x + 4', '3x + 12', '7x'], answer: '3x + 12' },
  ],
  equations: [
    { prompt: 'Solve 5x - 4 = 21.', options: ['x = 5', 'x = 4', 'x = 25'], answer: 'x = 5' },
    { prompt: 'Solve 2(x + 3) = 14.', options: ['x = 4', 'x = 7', 'x = 11'], answer: 'x = 4' },
  ],
  inequalities: [
    { prompt: 'Solve -2x > 6.', options: ['x > -3', 'x < -3', 'x < 3'], answer: 'x < -3' },
    { prompt: 'Solve 3x - 2 >= 10.', options: ['x >= 4', 'x <= 4', 'x >= 3'], answer: 'x >= 4' },
  ],
  ratio: [
    { prompt: 'Share 48 in the ratio 1:3. What is the smaller share?', options: ['12', '16', '24'], answer: '12' },
    { prompt: 'Share 35 in the ratio 2:5. What is the larger share?', options: ['10', '20', '25'], answer: '25' },
  ],
  percentages: [
    { prompt: 'Decrease 240 by 25%.', options: ['180', '200', '215'], answer: '180' },
    { prompt: 'Increase 80 by 15%.', options: ['92', '95', '88'], answer: '92' },
  ],
  sequences: [
    { prompt: 'Find the nth term of 4, 9, 14, 19, ...', options: ['5n - 1', '4n + 1', '5n + 1'], answer: '5n - 1' },
    { prompt: 'What is the next term: 5, 8, 11, ...?', options: ['13', '14', '15'], answer: '14' },
  ],
  graphs: [
    { prompt: 'What is the y-intercept of y = 4x - 3?', options: ['4', '-3', '3'], answer: '-3' },
    { prompt: 'When x = 3, what is y for y = 2x + 1?', options: ['6', '7', '8'], answer: '7' },
  ],
  coordinates: [
    { prompt: 'Find the gradient between (1, 2) and (5, 10).', options: ['2', '4', '8'], answer: '2' },
    { prompt: 'Find the midpoint of (2, 4) and (8, 10).', options: ['(5, 7)', '(6, 8)', '(10, 14)'], answer: '(5, 7)' },
  ],
  calculus: [
    { prompt: 'Differentiate y = x^2.', options: ['2x', 'x', 'x^2'], answer: '2x' },
    { prompt: 'What does a derivative give at a point on a curve?', options: ['The gradient at that point', 'The area of the whole graph', 'The y-intercept only'], answer: 'The gradient at that point' },
  ],
  geometry: [
    { prompt: 'A straight-line angle is split into 127 degrees and another angle. Find the other angle.', options: ['43 degrees', '53 degrees', '63 degrees'], answer: '53 degrees' },
    { prompt: 'Two angles in a triangle are 45 degrees and 65 degrees. Find the third.', options: ['60 degrees', '70 degrees', '80 degrees'], answer: '70 degrees' },
  ],
  transformations: [
    { prompt: 'Reflect (4, -2) in the x-axis.', options: ['(-4, -2)', '(4, 2)', '(-4, 2)'], answer: '(4, 2)' },
    { prompt: 'Translate (2, 1) by vector (3, -2).', options: ['(5, -1)', '(1, 3)', '(6, 2)'], answer: '(5, -1)' },
  ],
  pythagoras: [
    { prompt: 'Find the hypotenuse when the shorter sides are 5 and 12.', options: ['13', '17', '169'], answer: '13' },
    { prompt: 'Find the hypotenuse when the shorter sides are 6 and 8.', options: ['10', '14', '100'], answer: '10' },
  ],
  trigonometry: [
    { prompt: 'A right triangle has opposite side 6 and hypotenuse 10. Find the angle to 1 decimal place.', options: ['30.0 degrees', '36.9 degrees', '53.1 degrees'], answer: '36.9 degrees' },
    { prompt: 'Find the opposite side when the angle is 30 degrees and the hypotenuse is 10.', options: ['5', '8.7', '10'], answer: '5' },
  ],
  'circle-theorems': [
    { prompt: 'The angle at the centre is 84 degrees. Find the angle at the circumference on the same arc.', options: ['42 degrees', '84 degrees', '168 degrees'], answer: '42 degrees' },
    { prompt: 'What is the angle between a tangent and radius at the point of contact?', options: ['45 degrees', '90 degrees', '180 degrees'], answer: '90 degrees' },
  ],
  vectors: [
    { prompt: 'Find 2(3, -4).', options: ['(5, -2)', '(6, -8)', '(6, 8)'], answer: '(6, -8)' },
    { prompt: 'If a = (2, 3) and b = (4, -1), find a + b.', options: ['(6, 2)', '(2, 4)', '(6, 4)'], answer: '(6, 2)' },
  ],
  'area-volume': [
    { prompt: 'Find the volume of a cuboid measuring 3 cm by 4 cm by 5 cm.', options: ['12 cm^3', '60 cm^3', '60 cm^2'], answer: '60 cm^3' },
    { prompt: 'Find the area of a triangle with base 8 cm and height 5 cm.', options: ['20 cm^2', '40 cm^2', '13 cm^2'], answer: '20 cm^2' },
  ],
  measures: [
    { prompt: 'Convert 3.5 kilograms into grams.', options: ['350 g', '3500 g', '35,000 g'], answer: '3500 g' },
    { prompt: 'Convert 2.4 metres into centimetres.', options: ['24 cm', '240 cm', '2400 cm'], answer: '240 cm' },
  ],
  probability: [
    { prompt: 'What is the probability of rolling a number greater than 4 on a fair die?', options: ['1/6', '1/3', '1/2'], answer: '1/3' },
    { prompt: 'What is the probability of rolling an even number on a fair die?', options: ['1/3', '1/2', '2/3'], answer: '1/2' },
  ],
  statistics: [
    { prompt: 'Find the median of 3, 9, 4, 7, 12.', options: ['4', '7', '9'], answer: '7' },
    { prompt: 'Find the mean of 4, 7, 8, 11.', options: ['7', '7.5', '8'], answer: '7.5' },
  ],
  sampling: [
    { prompt: 'What is one risk of asking only your friends about a survey topic?', options: ['The sample may be biased.', 'The results are always exact.', 'It guarantees a larger population.'], answer: 'The sample may be biased.' },
    { prompt: 'Why can a random sample be useful?', options: ['Everyone has a fair chance of selection.', 'It always removes every source of error.', 'It includes the entire population.'], answer: 'Everyone has a fair chance of selection.' },
  ],
  'financial-maths': [
    { prompt: 'Find the simple interest on £500 at 4% for one year.', options: ['£4', '£20', '£520'], answer: '£20' },
    { prompt: 'A £60 item has a 20% discount. Find its sale price.', options: ['£12', '£40', '£48'], answer: '£48' },
  ],
  indices: [
    { prompt: 'Simplify sqrt(50).', options: ['5sqrt(2)', '25sqrt(2)', '10sqrt(5)'], answer: '5sqrt(2)' },
    { prompt: 'Simplify 2^3 x 2^4.', options: ['2^7 = 128', '2^12 = 4096', '4^7'], answer: '2^7 = 128' },
  ],
  quadratics: [
    { prompt: 'Solve x^2 - 5x + 6 = 0.', options: ['x = 2 or x = 3', 'x = -2 or x = -3', 'x = 1 or x = 6'], answer: 'x = 2 or x = 3' },
    { prompt: 'Solve x^2 - 9 = 0.', options: ['x = 3 only', 'x = 3 or x = -3', 'x = 9 or x = -9'], answer: 'x = 3 or x = -3' },
  ],
  proof: [
    { prompt: 'Is one example enough to prove a statement for every number?', options: ['Yes, if the example works.', 'No, a general argument is needed.', 'Yes, if the numbers are large.'], answer: 'No, a general argument is needed.' },
    { prompt: 'What can a counterexample show about a universal claim?', options: ['That it is false.', 'That it is always true.', 'That it has no variables.'], answer: 'That it is false.' },
  ],
};

const extraQuizBank = {
  number: [
    { prompt: 'Write 0.6 as a fraction in its simplest form.', options: ['3/5', '6/10', '2/3'], answer: '3/5' },
    { prompt: 'Work out 8 + 3 x 2.', options: ['22', '14', '20'], answer: '14' },
    { prompt: 'What is the lowest common multiple of 4 and 6?', options: ['10', '12', '24'], answer: '12' },
  ],
  algebra: [
    { prompt: 'Simplify 5x + 2x - 3.', options: ['7x - 3', '7x + 3', '3x - 3'], answer: '7x - 3' },
    { prompt: 'Find 2a + 3 when a = 4.', options: ['11', '14', '20'], answer: '11' },
    { prompt: 'Factorise 6y + 12.', options: ['6(y + 2)', '3(2y + 12)', '6(y + 12)'], answer: '6(y + 2)' },
  ],
  equations: [
    { prompt: 'Solve 4x = 28.', options: ['x = 6', 'x = 7', 'x = 24'], answer: 'x = 7' },
    { prompt: 'Solve x/3 + 2 = 7.', options: ['x = 15', 'x = 9', 'x = 3'], answer: 'x = 15' },
    { prompt: 'Solve 2x + 5 = 17.', options: ['x = 6', 'x = 11', 'x = 22'], answer: 'x = 6' },
  ],
  inequalities: [
    { prompt: 'Solve x + 4 <= 9.', options: ['x <= 5', 'x >= 5', 'x <= 13'], answer: 'x <= 5' },
    { prompt: 'Solve -3x >= 9.', options: ['x >= -3', 'x <= -3', 'x <= 3'], answer: 'x <= -3' },
    { prompt: 'Which symbol means a value is at most 7?', options: ['<', '>=', '<='], answer: '<=' },
  ],
  ratio: [
    { prompt: 'Share 25 in the ratio 2:3. What is the smaller share?', options: ['10', '12', '15'], answer: '10' },
    { prompt: 'Share 30 in the ratio 1:2. What is the larger share?', options: ['10', '15', '20'], answer: '20' },
    { prompt: 'Simplify the ratio 12:18.', options: ['2:3', '3:2', '6:9'], answer: '2:3' },
  ],
  percentages: [
    { prompt: 'What is 10% of 350?', options: ['3.5', '35', '3500'], answer: '35' },
    { prompt: 'Increase 200 by 5%.', options: ['205', '210', '250'], answer: '210' },
    { prompt: 'What multiplier gives a 20% decrease?', options: ['0.2', '0.8', '1.2'], answer: '0.8' },
  ],
  sequences: [
    { prompt: 'What is the next term: 2, 6, 10, ...?', options: ['12', '14', '16'], answer: '14' },
    { prompt: 'Find the 10th term of 3, 7, 11, 15, ...', options: ['35', '39', '43'], answer: '39' },
    { prompt: 'What is the common difference in 12, 9, 6, 3, ...?', options: ['-3', '3', '-4'], answer: '-3' },
  ],
  graphs: [
    { prompt: 'For y = -2x + 5, find y when x = 2.', options: ['1', '3', '9'], answer: '1' },
    { prompt: 'Find the gradient of the line through (0, 3) and (2, 7).', options: ['2', '3', '4'], answer: '2' },
    { prompt: 'Which point lies on y = x + 1?', options: ['(2, 3)', '(2, 2)', '(3, 1)'], answer: '(2, 3)' },
  ],
  coordinates: [
    { prompt: 'Find the distance between (1, 4) and (6, 4).', options: ['4', '5', '7'], answer: '5' },
    { prompt: 'What is the gradient of y = 3x + 2?', options: ['2', '3', '-3'], answer: '3' },
    { prompt: 'In which quadrant is (-2, 5)?', options: ['I', 'II', 'IV'], answer: 'II' },
  ],
  calculus: [
    { prompt: 'Differentiate y = 5x.', options: ['5', '5x', 'x'], answer: '5' },
    { prompt: 'Differentiate y = x^3.', options: ['3x^2', 'x^2', '3x'], answer: '3x^2' },
    { prompt: 'What is the derivative of the constant y = 7?', options: ['0', '7', '7x'], answer: '0' },
  ],
  geometry: [
    { prompt: 'Angles around a point total how many degrees?', options: ['180', '270', '360'], answer: '360' },
    { prompt: 'What is the sum of the interior angles of a pentagon?', options: ['360 degrees', '540 degrees', '720 degrees'], answer: '540 degrees' },
    { prompt: 'Vertically opposite angles are ...', options: ['equal', 'supplementary', 'always 90 degrees'], answer: 'equal' },
  ],
  transformations: [
    { prompt: 'Rotate (1, 0) 90 degrees anticlockwise about the origin.', options: ['(0, 1)', '(0, -1)', '(-1, 0)'], answer: '(0, 1)' },
    { prompt: 'Translate (-2, 3) by vector (4, -1).', options: ['(2, 2)', '(6, 2)', '(-6, 4)'], answer: '(2, 2)' },
    { prompt: 'Which transformation flips a shape over a mirror line?', options: ['Rotation', 'Reflection', 'Translation'], answer: 'Reflection' },
  ],
  pythagoras: [
    { prompt: 'A right triangle has hypotenuse 13 and one shorter side 5. Find the other side.', options: ['8', '12', '18'], answer: '12' },
    { prompt: 'What is the hypotenuse when both shorter sides are 1?', options: ['sqrt(2)', '2', '1'], answer: 'sqrt(2)' },
    { prompt: 'Which side is the hypotenuse?', options: ['Opposite the right angle', 'Next to the smallest angle', 'The shortest side'], answer: 'Opposite the right angle' },
  ],
  trigonometry: [
    { prompt: 'If cos(theta) = 0.8, what is theta to the nearest degree?', options: ['37 degrees', '53 degrees', '80 degrees'], answer: '37 degrees' },
    { prompt: 'If opposite = 6 and adjacent = 8, find the angle to 1 decimal place.', options: ['36.9 degrees', '48.6 degrees', '53.1 degrees'], answer: '36.9 degrees' },
    { prompt: 'Which ratio is opposite divided by hypotenuse?', options: ['sin', 'cos', 'tan'], answer: 'sin' },
  ],
  'circle-theorems': [
    { prompt: 'Opposite angles in a cyclic quadrilateral total how many degrees?', options: ['90', '180', '360'], answer: '180' },
    { prompt: 'Angles in the same segment are ...', options: ['equal', 'complementary', 'always obtuse'], answer: 'equal' },
    { prompt: 'How many degrees are in a full turn at the centre of a circle?', options: ['180', '270', '360'], answer: '360' },
  ],
  vectors: [
    { prompt: 'If a = (1, 2) and b = (-3, 4), find a + b.', options: ['(-2, 6)', '(4, 2)', '(-3, 8)'], answer: '(-2, 6)' },
    { prompt: 'Find the vector from A(2, 1) to B(5, 7).', options: ['(3, 6)', '(7, 8)', '(-3, -6)'], answer: '(3, 6)' },
    { prompt: 'What does the vector -a represent?', options: ['The opposite direction to a', 'Twice the length of a', 'The same direction as a'], answer: 'The opposite direction to a' },
  ],
  'area-volume': [
    { prompt: 'Find the area of a 9 cm by 4 cm rectangle.', options: ['13 cm^2', '36 cm^2', '36 cm^3'], answer: '36 cm^2' },
    { prompt: 'A prism has cross-sectional area 12 cm^2 and length 5 cm. Find its volume.', options: ['17 cm^3', '60 cm^3', '60 cm^2'], answer: '60 cm^3' },
    { prompt: 'What units are used for volume?', options: ['Square units', 'Cubic units', 'Linear units'], answer: 'Cubic units' },
  ],
  measures: [
    { prompt: 'Convert 0.75 litres to millilitres.', options: ['75 ml', '750 ml', '7500 ml'], answer: '750 ml' },
    { prompt: 'Convert 4.2 kilometres to metres.', options: ['420 m', '4200 m', '42,000 m'], answer: '4200 m' },
    { prompt: 'How many millimetres are in 1 centimetre?', options: ['10', '100', '1000'], answer: '10' },
  ],
  probability: [
    { prompt: 'A fair coin is flipped and a fair die is rolled. What is the probability of heads and a 6?', options: ['1/6', '1/12', '1/2'], answer: '1/12' },
    { prompt: 'A bag has 2 red and 3 blue counters. What is the probability of red?', options: ['2/5', '3/5', '1/2'], answer: '2/5' },
    { prompt: 'What is the probability of an impossible event?', options: ['0', '1/2', '1'], answer: '0' },
  ],
  statistics: [
    { prompt: 'Find the range of 3, 5, 8, 12.', options: ['8', '9', '12'], answer: '9' },
    { prompt: 'Find the mode of 2, 3, 3, 4.', options: ['2', '3', '4'], answer: '3' },
    { prompt: 'Which average is most affected by an extreme value?', options: ['Mean', 'Median', 'Mode'], answer: 'Mean' },
  ],
  sampling: [
    { prompt: 'Which sampling method keeps subgroup proportions similar to the population?', options: ['Stratified', 'Voluntary response', 'Convenience'], answer: 'Stratified' },
    { prompt: 'What does systematic sampling select?', options: ['People at regular intervals', 'Only volunteers', 'Every person in the population'], answer: 'People at regular intervals' },
    { prompt: 'What is a population in a statistics study?', options: ['The whole group being studied', 'Only the people selected', 'The largest answer'], answer: 'The whole group being studied' },
  ],
  'financial-maths': [
    { prompt: 'Add 10% tax to £40.', options: ['£4', '£44', '£50'], answer: '£44' },
    { prompt: 'Increase £100 by 10%.', options: ['£101', '£110', '£120'], answer: '£110' },
    { prompt: 'An item costs £30 and sells for £45. Find the profit.', options: ['£15', '£30', '£75'], answer: '£15' },
  ],
  indices: [
    { prompt: 'Simplify 3^2 x 3^3.', options: ['3^5 = 243', '3^6 = 729', '9^5'], answer: '3^5 = 243' },
    { prompt: 'Write 2^-3 as a fraction.', options: ['-8', '1/8', '1/6'], answer: '1/8' },
    { prompt: 'What is 5^0?', options: ['0', '1', '5'], answer: '1' },
  ],
  quadratics: [
    { prompt: 'Solve x^2 - 4 = 0.', options: ['x = 2 only', 'x = 2 or x = -2', 'x = 4 or x = -4'], answer: 'x = 2 or x = -2' },
    { prompt: 'Find the discriminant of x^2 - 5x + 6 = 0.', options: ['1', '25', '49'], answer: '1' },
    { prompt: 'What is the highest power of x in a quadratic?', options: ['1', '2', '3'], answer: '2' },
  ],
  proof: [
    { prompt: 'Why is the sum of two even numbers always even?', options: ['It can be written as 2(a + b).', 'It is true for one example.', 'Even numbers are prime.'], answer: 'It can be written as 2(a + b).' },
    { prompt: 'What is a counterexample to the claim "all prime numbers are odd"?', options: ['2', '3', '5'], answer: '2' },
    { prompt: 'What should a proof establish?', options: ['Why a statement is always true', 'That one example works', 'That a diagram looks correct'], answer: 'Why a statement is always true' },
  ],
};

const topic = new URLSearchParams(window.location.search).get('topic') || 'number';
const lesson = lessons[topic] || lessons.number;

document.title = `${lesson.title} | Advanced Maths for GCSE`;
document.querySelector('#lesson-category').textContent = lesson.category;
document.querySelector('#lesson-title').textContent = lesson.title;
document.querySelector('#lesson-intro').textContent = lesson.intro;
document.querySelector('#steps-list').innerHTML = lesson.steps.map((step) => `<li>${step}</li>`).join('');
document.querySelector('#deep-dive-list').innerHTML = (deepDives[topic] || deepDives.number).map((idea) => `<li>${idea}</li>`).join('');
document.querySelector('#example-question').textContent = lesson.example;
document.querySelector('#example-answer').textContent = lesson.answer;
document.querySelector('#practice-question').textContent = lesson.practice;
document.querySelector('#practice-answer').textContent = lesson.practiceAnswer;
const topicQuiz = [...(quizBank[topic] || quizBank.number), ...(extraQuizBank[topic] || extraQuizBank.number)];
document.querySelector('#lesson-quiz').innerHTML += topicQuiz.map((question, questionIndex) => `
  <fieldset class="quiz-question" data-answer="${question.answer}">
    <legend>${questionIndex + 1}. ${question.prompt}</legend>
    ${question.options.map((option, optionIndex) => `<label><input type="radio" name="lesson-q${questionIndex + 1}" value="${option}"${optionIndex === 0 ? ' required' : ''}> ${option}</label>`).join('')}
  </fieldset>
`).join('') + `
  <div class="quiz-actions">
    <button type="submit">Check answers</button>
    <button class="quiz-reset" type="reset">Try again</button>
    <p class="quiz-result" role="status" aria-live="polite"></p>
  </div>
`;

const videoTopic = topic === 'quadratics'
  ? 'Studdied factorising into double brackets GCSE'
  : `${lesson.title} GCSE maths`;
const videoSearches = [
  ['Watch an explanation', `${videoTopic} explanation`],
  ['See worked examples', `${videoTopic} worked examples`],
  ['Practise exam questions', `${videoTopic} exam questions`],
];

document.querySelector('#video-links').innerHTML = videoSearches.map(([label, query]) => {
  const url = `https://www.youtube.com/results?search_query=${encodeURIComponent(query)}`;
  return `<a class="video-link" href="${url}" target="_blank" rel="noopener noreferrer">${label}</a>`;
}).join('');
