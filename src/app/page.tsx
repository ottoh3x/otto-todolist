"use client";
import Add from "@/components/Add";
import Column from "@/components/Column";
import { useBearStore } from "@/store/store";
import Image from "next/image";
import { DragDropContext, DropResult, Droppable } from "react-beautiful-dnd";


const todos = {
  "todo": [
    {"title": "Task 1", "id": 1, "status": "todo"},
    {"title": "Task 2", "id": 2, "status": "todo"},
    {"title": "Task 3", "id": 3, "status": "todo"}
  ],
  "in progress": [
    {"title": "Task 4", "id": 4, "status": "in progress"},
    {"title": "Task 5", "id": 5, "status": "in progress"},
    {"title": "Task 6", "id": 6, "status": "in progress"}
  ],
  "done": [
    {"title": "Task 7", "id": 7, "status": "done"},
    {"title": "Task 8", "id": 8, "status": "done"},
    {"title": "Task 9", "id": 9, "status": "done"}
  ]
}

export default function Home() {

  const {tds,addTodos} = useBearStore()
  const handleOnDragEnd = (result:DropResult) => {};

  console.log(tds)
  return (
    <>
    <Add />
      <DragDropContext onDragEnd={handleOnDragEnd}>
        <Droppable droppableId="board" direction="horizontal" type="column">
          {(provided) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              className="grid grid-cols-3 gap-5 max-w-7xl mx-auto bg-gray-50 mt-20 text-black"
            >
              <Column id={`todo`} index={0} todos={todos.todo} />
              <Column id={`in progress`} index={1} todos={todos["in progress"]}/>
              <Column id={`done`} index={2}  todos={todos.done}/>
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </>
  );
}
