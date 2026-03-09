class MaxHeap:
  def __init__(self):
    self.heap = [None]

  def insert(self, value):
    self.heap.append(value) # <-- 맨 뒤에 데이터 삽입
    current_index = len(self.heap) - 1

    while current_index > 1:
      target_index = current_index
      parent_index = current_index // 2 # <-- 부모 노드의 인덱스 접근하는 공식 사용

      if self.heap[target_index] > self.heap[parent_index]: # <-- 부모 노드와 비교하여 더 값이 더 크다면 자리 교체
        self.heap[target_index], self.heap[parent_index] = self.heap[parent_index], self.heap[target_index]
        current_index = parent_index
      else:
        break

    return self.heap

  def remove(self):
    if len(self.heap) == 1:
      return None
    
    current_index = 1

    self.heap[current_index], self.heap[-1] = self.heap[-1], self.heap[current_index] # <-- 마지막 자식과 루트 노드 교체하고, 마지막 자식 삭제
    max_data = self.heap.pop()

    while current_index <= len(self.heap) - 1:
      left_child_index = current_index * 2
      right_child_index = current_index * 2 + 1
      max_index = current_index

      if left_child_index <= len(self.heap) - 1 and self.heap[left_child_index] > self.heap[max_index]:
        max_index = left_child_index
        
      if right_child_index <= len(self.heap) - 1 and self.heap[right_child_index] > self.heap[max_index]:
        max_index = right_child_index
      
      if max_index == current_index:
        break

      self.heap[current_index], self.heap[max_index] = self.heap[max_index], self.heap[current_index]
      current_index = max_index

    return max_data    


max_heap = MaxHeap()

max_heap.insert(3)
max_heap.insert(5)
max_heap.insert(2)
max_heap.insert(8)
max_heap.insert(9)
max_heap.insert(7)

print("===== Max Heap =====")
print(max_heap.heap)
print(max_heap.remove()) # 9
print(max_heap.heap) # [None, 8, 5, 7, 3, 2]


class MinHeap:
  def __init__(self):
    self.heap = [None]

  def insert(self, value):
    # 1. 맨 뒤에 데이터 삽입
    # 2. 부모 노드와 비교하여 더 작다면 자리 교체 (반복)

    self.heap.append(value)
    current_index = len(self.heap) - 1

    while current_index > 1:
      target_index = current_index
      parent_index = current_index // 2

      if self.heap[target_index] < self.heap[parent_index]:
        self.heap[target_index], self.heap[parent_index] = self.heap[parent_index], self.heap[target_index]
        current_index = parent_index
      else:
        break

    return self.heap

  def remove(self):
    # 1. 루트 노드와 마지막 자식 노드 교체
    # 2. 마지막 자식 노드 삭제
    # 3. 자식 노드들과 비교하여 더 작다면 자리 교체 (반복)

    if len(self.heap) == 1:
      return None
    
    current_index = 1

    self.heap[current_index], self.heap[-1] = self.heap[-1], self.heap[current_index]
    min_data = self.heap.pop()

    while current_index <= len(self.heap) - 1:
      left_child_index = current_index * 2
      right_child_index = current_index * 2 + 1
      min_index = current_index

      if left_child_index <= len(self.heap) - 1 and self.heap[left_child_index] < self.heap[min_index]:
        min_index = left_child_index
      
      if right_child_index <= len(self.heap) - 1 and self.heap[right_child_index] < self.heap[min_index]:
        min_index = right_child_index

      if min_index == current_index:
        break

      self.heap[current_index], self.heap[min_index] = self.heap[min_index], self.heap[current_index]
      current_index = min_index

    return min_data
  
min_heap = MinHeap()

min_heap.insert(9)
min_heap.insert(5)
min_heap.insert(7)
min_heap.insert(3)
min_heap.insert(2)
min_heap.insert(8)

print("===== Min Heap =====")
print(min_heap.heap)
print(min_heap.remove()) # 2
print(min_heap.heap) # [None, 3, 5, 7,