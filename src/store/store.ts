import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { getTodosGroupedByColumn } from "../../getTodosGroupedByColumn";
import { ID, databases } from "../../appwrite";

interface BearState {
  board: Board;
  getBoard: () => void;
  setBoardState: (board: Board) => void;
  updateTodos: (todo: Todo, columnId: TypedColumn) => void;
  deleteTodo: (todoIndex: number, todoId: Todo, id: TypedColumn) => void;
  newTaskInput: string;
  setNewTaskInput: (input: string) => void;
  newTaskType: TypedColumn;
  setNewTaskType: (columnId: TypedColumn) => void;
  addTask: (todo: string, columnId: TypedColumn) => void;
}

export const useBearStore = create<BearState>()((set, get) => ({
  board: { columns: new Map<TypedColumn, Column>() },

  getBoard: async () => {
    const board = await getTodosGroupedByColumn();
    set({ board });
  },
  setBoardState: (board) => set({ board }),
  updateTodos: async (todo, columnId) => {
    await databases.updateDocument(
      process.env.NEXT_PUBLIC_DATABASE_ID!,
      process.env.NEXT_PUBLIC_TODOS_COLLECTION_ID!,
      todo.$id,
      {
        title: todo.title,
        status: columnId,
      }
    );
  },
  deleteTodo: async (todoIndex: number, todo: Todo, id: TypedColumn) => {
    const newCols = new Map(get().board.columns);
    newCols.get(id)?.todos.splice(todoIndex, 1);
    set({ board: { columns: newCols } });
    await databases.deleteDocument(
      process.env.NEXT_PUBLIC_DATABASE_ID!,
      process.env.NEXT_PUBLIC_TODOS_COLLECTION_ID!,
      todo.$id
    );
  },
  newTaskInput: "",
  setNewTaskInput: (input: string) => set({ newTaskInput: input }),
  newTaskType: "todo",
  setNewTaskType: (columnId: TypedColumn) => set({ newTaskType: columnId }),
  addTask: async (todo: string, columnId: TypedColumn) => {

    const {$id} = await databases.createDocument(
      process.env.NEXT_PUBLIC_DATABASE_ID!,
      process.env.NEXT_PUBLIC_TODOS_COLLECTION_ID!,
      ID.unique(),
      {
        title:todo,
        status:columnId
      }

    )
    set({ newTaskInput: "" });
    set((state) => {
      const newColumns = new Map(state.board.columns);
      const newTodo: Todo = {
        $id,
        $createdAt: new Date().toISOString(),
        title: todo,
        status: columnId,
      };
      const column = newColumns.get(columnId);
      if (!column) {
        newColumns.set(columnId, {
          id: columnId,
          todos: [newTodo],
        });
      } else {
        newColumns.get(columnId)?.todos.push(newTodo);
      }
      return {
        board: {
          columns: newColumns,
        },
      };
    });
   
  },
}));
