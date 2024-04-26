export const getTodosGroupedByColumn = () => {
  // get todos from localstorage
  const getStorage =
    typeof window !== "undefined" && localStorage.getItem("todos-storage");
  let todos: any[] = [];
  function initializeTodos(storageItem: string | null) {
    if (storageItem !== null) {
      try {
        const parsed = JSON.parse(storageItem);
        if (parsed && parsed.state && Array.isArray(parsed.state.todos)) {
          todos = parsed.state.todos;
        } else {
          console.warn("Invalid or unexpected JSON structure:", parsed);
          todos = [];
        }
      } catch (error) {
        console.error("Failed to parse todos:", error);
        todos = [];
      }
    } else {
      console.warn("No stored todos found");
      todos = [];
    }
  }

  initializeTodos(getStorage as any);

  const columns = todos.reduce((acc: Map<TypedColumn, Column>, todo) => {
    if (!acc.get(todo.status)) {
      acc.set(todo.status, {
        id: todo.status,
        todos: [],
      });
    }

    acc.get(todo.status)!.todos.push({
      $id: todo.$id,
      $createdAt: todo.$createdAt,
      title: todo.title,
      status: todo.status,
    });

    return acc;
  }, new Map<TypedColumn, Column>());

  const columnsTypes: TypedColumn[] = ["todo", "inprogress", "done"];
  for (const columnType of columnsTypes) {
    if (!columns.get(columnType)) {
      columns.set(columnType, {
        id: columnType,
        todos: [],
      });
    }
  }

  // sorting columns

  const sortedColumns = new Map(
    Array.from(columns.entries()).sort(
      (a, b) => columnsTypes.indexOf(a[0]) - columnsTypes.indexOf(b[0])
    )
  );

  const board: Board = {
    columns: sortedColumns,
  };

  return board;
};
