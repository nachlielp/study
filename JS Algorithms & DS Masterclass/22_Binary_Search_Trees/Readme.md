## Trees

- Root - the top node of a tree
- Child - a node directly connected to another node when moving away from the Root
- Parent - the converse of a child
- Siblings - nodes with the same parent
- Leaf - a node with no children
- Edge - the link between a node and its child

Trees are non-linear data structures,not like a list that has a linear order.

Trees have roles in computer science, a node cant point at a parent or a sibling, only at a child.

example of a tree:

```
     10
   /   \
  5     15
 / \     \
3   7    18
```

this is used in the DOM, in the file system, and in the network, json ect'.

## Binary Trees

A binary tree is a tree data structure in which each node has at most two children, referred to as the left child and the right child.

## Binary Search Trees

A BST is a tree where every node has a value and every node to the left of a node is less than the node and every node to the right is greater than the node.

The time complexity of a BST is O(log n) for insert, find and delete.
