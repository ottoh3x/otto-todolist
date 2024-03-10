import { XCircleIcon } from "@heroicons/react/16/solid";
import React from "react";
import { Draggable, Droppable } from "react-beautiful-dnd";



export default function Column({ id, index, todos }) {

    console.log(id)
  return (
    <Draggable draggableId={id} index={index} key={id}>
      {(provided) => (
        <div
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
          <Droppable droppableId={index.toString()}  type="card">
            {(provided) => (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
                className="p-2 shadow w-full"
              >
                <h2 className="flex justify-between font-bold text-xl p-2">
                {id}
                    <span className="font-normal px-2 py-1 rounded-full text-gray-500 text-sm bg-gray-200">
                        1
                    </span>
                </h2>
                <div className="space-y-1">
                    {todos.map((todo,idx) => (
                        <Draggable key={idx} draggableId={todo.title} index={idx}>
                            {(provided) => (
                                <div

                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                ref={provided.innerRef}
                                className="bg-white rounded-md drop-shadow-md"
                                >
                                    <div className="flex justify-between items-center p-5">

                                    <p>

                                    {todo.title}
                                    </p>
                                    <button className="text-red-500 hover:text-red-600">
                                        <XCircleIcon  className="size-8 ml-5"/>
                                    </button>
                                    </div>
                                </div>
                            )}
                        </Draggable>
                    ))}

                </div>
              </div>
            )}
          </Droppable>
        </div>
      )}
    </Draggable>
  );
}
