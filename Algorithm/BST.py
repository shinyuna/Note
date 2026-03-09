import time

class Node:
  def __init__(self, value):
    self.value = value
    self.left = None
    self.right = None

class BST:
  def __init__(self):
    self.root = None

  def insert(self, value):
    new = Node(value)

    if self.root is None:
      self.root = new
      return

    current = self.root
    while True:
      if value < current.value:
        if current.left is None:
          current.left = new
          return
        current = current.left
      else:
        if current.right is None:
          current.right = new
          return
        current = current.right
    
  def search(self, value):
    start = time.perf_counter()
    current = self.root

    while current:
      if value == current.value:
        end = time.perf_counter()
        print(f"실행 시간: {end - start:.6f}초")
        return True
      elif value < current.value:
        current = current.left
      else:
        current = current.right

    end = time.perf_counter()
    print(f"실행 시간: {end - start:.6f}초")
    return False

bst = BST()
# bst.insert(5)
# bst.insert(3)
# bst.insert(2)
# bst.insert(4)
# bst.insert(1)
# bst.insert(7)
# bst.insert(8)
# bst.insert(6)

bst.insert(10)
bst.insert(9)
bst.insert(8)
bst.insert(7)
bst.insert(6)
bst.insert(5)
bst.insert(4)
bst.insert(3)
bst.insert(2)
bst.insert(1)

print(bst.search(1))