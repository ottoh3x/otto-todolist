"use client";
import Column from "@/components/Column";
import { useBearStore } from "@/store/store";
import Image from "next/image";
import { DragDropContext, DropResult, Droppable } from "react-beautiful-dnd";
import { useEffect } from "react";

export default function Home() {
  const [getBoard, board, setBoardState,updateTodos] = useBearStore((state) => [
    state.getBoard,
    state.board,
    state.setBoardState,
    state.updateTodos
  ]);

  useEffect(() => {
    getBoard();
  }, [getBoard]);

  console.log(board);

  const handleOnDragEnd = (result: DropResult) => {
    const { source, destination, type } = result;

    if (!destination) return;

    if (type === "column") {
      const entries = Array.from(board.columns.entries());
      const [removed] = entries.splice(source.index, 1);
      entries.splice(destination.index, 0, removed);
      const rearrangedColumns = new Map(entries);
      setBoardState({ ...board, columns: rearrangedColumns });
    }

    const columns = Array.from(board.columns);
    const startColIndex: any = columns[Number(source.droppableId)];
    const finishColIndex: any = columns[Number(destination.droppableId)];


    const startCol: Column = {
      id: startColIndex[0],
      todos: startColIndex[1].todos,
    };

    const finishCol: Column = {
      id: finishColIndex[0],
      todos: finishColIndex[1].todos,
    };

    if (!startCol || !finishCol) return;

    if (source.index === destination.index && startCol === finishCol) return;

    const newTodos = startCol.todos;
    const [todoMoved] = newTodos.splice(source.index, 1);

    if (startCol.id === finishCol.id) {
      newTodos.splice(destination.index, 0, todoMoved);
      const newCol = {
        id: startCol.id,
        todos: newTodos,
      };
      const newColumns = new Map(board.columns);
      newColumns.set(startCol.id, newCol);
      setBoardState({ ...board, columns: newColumns });
    } else {
      const finishTodos = Array.from(finishCol.todos);
      finishTodos.splice(destination.index, 0, todoMoved);

      const newColumns = new Map(board.columns);
      const newCol = {
        id: startCol.id,
        todos: newTodos,
      };
      newColumns.set(startCol.id, newCol);
      newColumns.set(finishCol.id, {
        id: finishCol.id,
        todos: finishTodos,
      });

      updateTodos(todoMoved,finishCol.id)

      setBoardState({ ...board, columns: newColumns });
    }
  };

  return (
    <>
      <DragDropContext onDragEnd={handleOnDragEnd}>
        <Droppable droppableId="board" direction="horizontal" type="column">
          {(provided) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              className="grid grid-cols-3 gap-5 max-w-7xl mx-auto bg-gray-50 mt-20 text-black"
            >
              {Array.from(board.columns.entries()).map(([id, todos], index) => (
                <Column
                  key={id}
                  id={id}
                  index={index}
                  todos={todos.todos}
                  columns={board.columns}
                />
              ))}
              {/* <Column
                id={`in progress`}
                index={1}
                todos={todos["in progress"]}
              />
              <Column id={`done`} index={2} todos={todos.done} /> */}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </>
  );
}
