graph = {
    1: [2, 5, 9],
    2: [1, 3],
    3: [2, 4],
    4: [3],
    5: [1, 6, 8],
    6: [5, 7],
    7: [6],
    8: [5],
    9: [1, 10],
    10: [9]
}

def dfs_recursion(adjacent_graph, cur_node, visited_array):
    """dfs recursion version."""
    visited_array.append(cur_node)
    for node in adjacent_graph[cur_node]:
        if node not in visited_array:
            dfs_recursion(adjacent_graph, node, visited_array)

    return visited_array

recursion_visited = dfs_recursion(graph, 1, [])
print(recursion_visited)

def dfs_stack(adjacent_graph, start_node):
    """dfs stack version."""
    stack = [start_node]
    visited = []

    while stack:
        current_node = stack.pop()
        visited.append(current_node)
        for node in adjacent_graph[current_node]:
            if node not in visited:
                stack.append(node)
    return visited

stack_visited = dfs_stack(graph, 1)
print(stack_visited)
