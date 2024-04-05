Any sorting algorithm that is going through a list of elements has an average O(n log n) time complexity.

There are ways to sort without comparing variables, and this allows us to avoid the limitation of comparing.

Radix Sort is a non-comparative sorting algorithm. It avoids comparison by creating and distributing elements into buckets according to their radix. For example, if we have numbers in base 10, we can use 10 buckets to represent the numbers 0 through 9.

we go over the array once for each digit of the larges value, so an array of digits of 3 digits has 3 passes.

first pass we arrange the numbers by the last digit in the bucket and reorder them in the array, then we do it for the next digit and so on.

so if we have the array [170, 45, 75, 90, 802, 24, 2, 66]

after one pas it will be [170, 90, 802, 2, 24, 45, 66, 75]

after the second pass it will be [802, 2, 24, 45, 66, 170, 75]

after the third pass it will be [2, 24, 45, 66, 75, 170, 802]
