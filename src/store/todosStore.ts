import { create } from "zustand";
import { persist } from "zustand/middleware";
import { getTodosGroupedByColumn } from "../../getTodosGroupedByColumn";

interface TodosState {
  board: Board;
  getBoard: () => void;
  setBoardState: (board: Board) => void;
  deleteTodo: (todoIndex: number, todoId: Todo, id: TypedColumn) => void;
  newTaskInput: string;
  setNewTaskInput: (input: string) => void;
  newTaskType: TypedColumn;
  setNewTaskType: (columnId: TypedColumn) => void;
  addTask: (todo: string, columnId: TypedColumn) => void;
  todos: any[];
}

export const useStore = create<TodosState>(
  persist(
    (set, get) => ({
      board: { columns: new Map<TypedColumn, Column>() },
      newTaskInput: "",
      newTaskType: "todo",
      todos: [],

      setNewTaskInput: (input: string) => set({ newTaskInput: input }),
      setNewTaskType: (columnId: TypedColumn) => set({ newTaskType: columnId }),

      getBoard: () => {
        const board = getTodosGroupedByColumn();
        set({ board });
      },
      setBoardState: (board) => set({ board }),
      deleteTodo: async (todoIndex: number, todo: Todo, id: TypedColumn) => {
        const newCols = new Map(get().board.columns);
        newCols.get(id)?.todos.splice(todoIndex, 1);
        const newTodos = get().todos.filter((t) => t.$id !== todo.$id);

        set({ board: { columns: newCols }, todos: newTodos });
      },
      addTask: async (todo: string, columnId: TypedColumn) => {
        const id = crypto.randomUUID();
        set((state) => ({
          ...state,
          todos: [
            ...state.todos,
            {
              $id: id,
              $createdAt: new Date().toISOString(),
              title: todo,
              status: columnId,
            },
          ],
        }));
        set({ newTaskInput: "" });
        set((state) => {
          const newColumns = new Map(state.board.columns);
          const newTodo: Todo = {
            $id: id,
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
    }),
    {
      name: "todos-storage",
    }
  ),
  {}
);
