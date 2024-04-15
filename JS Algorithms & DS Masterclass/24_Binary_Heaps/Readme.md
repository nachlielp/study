## Binary Heaps

### Max Binary Heap

- A binary heap is a complete binary tree that satisfies the heap property.
- The heap property is that each node is greater than its children.
- A binary heap is as compact as possible. All the children of each node are as full as they can be and left children are filled out first

Since this is implemented in an array, the children of a node are at indices `2*i + 1` and `2*i + 2`. The parent of a node is at index `(i-1)/2`.

We can add large values to the heap by adding them to the end of the array and then heapifying (Bubbling) up. This is done by comparing the new value with its parent and swapping them if the new value is greater. This is done by comparing to the parent and if the child is larger then swap, and repeat this up until the heap property is restored.
