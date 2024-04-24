import { useModalStore } from "@/store/ModalStore";
import { useBearStore } from "@/store/store";
import { PlusCircleIcon, XCircleIcon } from "@heroicons/react/16/solid";
import React from "react";
import { Draggable, Droppable } from "@hello-pangea/dnd";
import { toast } from "sonner";
import { useStore } from "@/store/todosStore";

type Props = {
  id: TypedColumn;
  todos: Todo[];
  index: number;
};

export default function Column({ id, index, todos }: Props) {
  const { deleteTodo } = useStore();
  const { openModal } = useModalStore();

  const idToText: {
    [key in TypedColumn]: string;
  } = {
    todo: "To Do",
    inprogress: "In Progress",
    done: "Done",
  };
  return (
    <Draggable draggableId={id} index={index}>
      {(provided) => (
        <div
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
          <Droppable droppableId={index.toString()} type="card">
            {(provided, snapshot) => (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
                className={`p-2 rounded-2xl shadow-sm w-full ${
                  snapshot.isDraggingOver ? "bg-green-600" : "bg-neutral-700/50"
                }`}
              >
                <h2 className="flex justify-between font-bold text-xl p-2">
                  {idToText[id]}
                  <strong className="font-semibold  px-3 py-1  rounded-lg bg-white text-black max-w-fit text-sm">
                    {todos.length}
                  </strong>
                </h2>
                <div className="space-y-2">
                  {todos?.map((todo, idx) => (
                    <Draggable
                      key={todo.$id}
                      draggableId={todo.$id}
                      index={idx}
                    >
                      {(provided) => (
                        <div
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          ref={provided.innerRef}
                          className="bg-neutral-900 hover:bg-neutral-950 rounded-md drop-shadow-md"
                        >
                          <div className="flex justify-between items-center p-5">
                            <p>{todo.title}</p>
                            <button
                              onClick={() => {
                                deleteTodo(idx, todo, id);
                                console.log(idx,todo,id)
                                toast.error("Task Deleted");
                              }}
                              className="text-red-500 hover:text-red-600"
                            >
                              <XCircleIcon className="size-8 ml-5" />
                            </button>
                          </div>
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                  <div className="flex items-end  justify-end p-2">
                    <button
                      onClick={openModal}
                      className="text-green-500 hover:text-green-600"
                    >
                      <PlusCircleIcon className="size-10" />
                    </button>
                  </div>
                </div>
              </div>
            )}
          </Droppable>
        </div>
      )}
    </Draggable>
  );
}
