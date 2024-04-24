import { useStore } from "@/store/todosStore";
import { databases } from "./appwrite";

export const getTodosGroupedByColumn = () => {
  // const { tds } = useBearStore();
  // const data = await databases.listDocuments(
  //   process.env.NEXT_PUBLIC_DATABASE_ID!,
  //   process.env.NEXT_PUBLIC_TODOS_COLLECTION_ID!
  // );

  // const todos = data.documents;
  const getStorage =
    typeof window !== "undefined" && localStorage.getItem("todos-storage");
  let todos: any[] = [];
  // Function to safely parse JSON and extract todos
  function initializeTodos(storageItem: string | null) {
    if (storageItem !== null) {
      try {
        const parsed = JSON.parse(storageItem);
        // Safely access 'todos' ensuring 'state' exists and has 'todos' property
        if (parsed && parsed.state && Array.isArray(parsed.state.todos)) {
          todos = parsed.state.todos;
        } else {
          // Handle the case where the 'state' or 'state.todos' does not exist
          console.warn("Invalid or unexpected JSON structure:", parsed);
          todos = []; // Reset to default or handle appropriately
        }
      } catch (error) {
        console.error("Failed to parse todos:", error);
        todos = []; // Reset or handle error case
      }
    } else {
      console.warn("No stored todos found");
      todos = []; // Set default or handle the case of no data
    }
  }

  // Assuming 'getStorage' contains the JSON string from localStorage
  initializeTodos(getStorage);
  // const todos = JSON.parse(getStorage).state.todos

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
