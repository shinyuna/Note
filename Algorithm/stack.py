class Stack:
    def __init__(self):
        self.items = []

    def is_empty(self):
        return len(self.items) == 0

    def push(self, item):
        self.items.append(item)

    def pop(self):
        if self.is_empty():
            raise IndexError("pop from empty stack")
        return self.items.pop()

    def peek(self):
        if self.is_empty():
            raise IndexError("peek from empty stack")
        return self.items[-1]

    def size(self):
        return len(self.items)
    

# Implementing a Queue using two Stacks
class QueueByStacks:
  def __init__(self):
    self.inQueue = Stack()
    self.outQueue = Stack()

  def enqueue(self, item):
    self.inQueue.push(item)

  def dequeue(self):
    if self.outQueue.is_empty():
      while not self.inQueue.is_empty():
        self.outQueue.push(self.inQueue.pop())

    if self.outQueue.is_empty():
      raise IndexError("dequeue from empty queue")
    
    return self.outQueue.pop()

# Implementing a Stack using two Queues
from collections import deque

class StackByQueues:
  def __init__(self):
    self.queue1 = deque()
    self.queue2 = deque()

  def push(self, item):
    self.queue1.append(item)

  def pop(self):
        if not self.queue1:
            raise IndexError("pop from empty stack")

        while len(self.queue1) > 1:
            self.queue2.append(self.queue1.popleft())

        popped_item = self.queue1.popleft()
        
        # Swap the names of the two queues
        self.queue1, self.queue2 = self.queue2, self.queue1
        
        return popped_item

stackByQueues = StackByQueues()