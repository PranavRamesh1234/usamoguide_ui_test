import json
from pathlib import Path

# Load extracted problems
with open('extracted_problems.json', 'r', encoding='utf-8') as f:
    extracted = json.load(f)

# Mapping from extracted category to content file
category_mapping = {
    'permutations-combinations': 'content/1_Foundations/Permutations_Combinations.problems.json',
    'intro-probability': 'content/1_Foundations/Intro_Probability.problems.json',
    'systematic-casework': 'content/1_Foundations/Systematic_Casework.problems.json',
    'complementary-counting': 'content/1_Foundations/Complementary_Counting.problems.json',
    'inclusion-exclusion': 'content/1_Foundations/Inclusion_Exclusion.problems.json',
    'stars-and-bars': 'content/1_Foundations/Stars_and_Bars.problems.json',
    'geometric-counting': 'content/1_Foundations/Geometric_Counting.problems.json',
    'recursion-basics': 'content/1_Foundations/Recursion_Basics.problems.json',
    'linear-equations-inequalities': 'content/1_Foundations/Linear_Equations_Inequalities.problems.json',
    'telescoping-basics': 'content/1_Foundations/Telescoping_Basics.problems.json',
    'divisibility-primes': 'content/1_Foundations/Divisibility_Primes.problems.json',
    'gcd-and-lcm': 'content/1_Foundations/GCD_LCM.problems.json',
    'modular-arithmetic-intro': 'content/1_Foundations/Modular_Arithmetic_Intro.problems.json',
    'linear-diophantine-equations': 'content/1_Foundations/Linear_Diophantine_Equations.problems.json',
    'miscellaneous-number-theory': 'content/1_Foundations/Miscellaneous_Number_Theory.problems.json',
    'angle-chasing-parallel-lines': 'content/1_Foundations/Angle_Chasing_Parallel_Lines.problems.json',
    'triangle-fundamentals': 'content/1_Foundations/Triangle_Fundamentals.problems.json',
}

# Process each category
for category, problems_list in extracted.items():
    if category not in category_mapping:
        print(f"Warning: No mapping for category '{category}'")
        continue
    
    file_path = category_mapping[category]
    
    # Load existing problems
    with open(file_path, 'r', encoding='utf-8') as f:
        content = json.load(f)
    
    # Add new problems to practice array
    existing_ids = {p['uniqueId'] for p in content.get('practice', [])}
    added_count = 0
    
    for problem in problems_list:
        if problem['uniqueId'] not in existing_ids:
            content['practice'].append(problem)
            added_count += 1
    
    # Save updated file
    with open(file_path, 'w', encoding='utf-8') as f:
        json.dump(content, f, indent=2, ensure_ascii=False)
    
    print(f"✓ {category}: Added {added_count} new problems (Total: {len(content['practice'])})")

print("\nMerge complete!")
