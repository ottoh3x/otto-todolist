"use client";
import { useState, Fragment, FormEvent } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { useModalStore } from "@/store/ModalStore";
import { RadioGroup } from "@headlessui/react";
import { CheckIcon } from "@heroicons/react/16/solid";
import { toast } from "sonner";
import { Button } from "@nextui-org/react";
import { useStore } from "@/store/todosStore";

const types = [
  {
    id: "todo",
    name: "Todo",
    description: "A new task to be completed",
    color: "bg-red-500",
  },
  {
    id: "inprogress",
    name: "In Progress",
    description: "A task that is currently being worked on",
    color: "bg-yellow-600",
  },
  {
    id: "done",
    name: "Done",
    description: "A task that has been completed",
    color: "bg-green-500",
  },
];
export default function AddModal() {
  const { isOpen, closeModal } = useModalStore();
  const {
    addTask,
    newTaskInput,
    setNewTaskInput,
    newTaskType,
    setNewTaskType,
  } = useStore();
  const [selected, setSelected] = useState(types[0].id);
  const taskAddedNotify = () => toast.success("New Task Has Been Added");

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!newTaskInput) return;

    addTask(newTaskInput, newTaskType);
    taskAddedNotify();
    closeModal();
  };
  return (
    // Use the `Transition` component at the root level
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog
        as="form"
        onSubmit={handleSubmit}
        className="relative z-10"
        onClose={() => closeModal()}
      >
        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center ">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-black bg-opacity-25" />
            </Transition.Child>
          </div>
        </div>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center ">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel
                className={`w-full max-w-md transform overflow-hidden rounded-2xl bg-neutral-900 p-6 text-left align-middle shadow-xl transition-all`}
              >
                <Dialog.Title
                  as="h3"
                  className={`text-lg font-medium leading-6 text-gray-50 pb-2`}
                >
                  Add a Task
                </Dialog.Title>

                <div className="mt-2">
                  <input
                    type="text"
                    value={newTaskInput}
                    onChange={(e) => setNewTaskInput(e.target.value)}
                    placeholder="Enter a task here..."
                    className="w-full border border-neutral-700 bg-neutral-800/90 text-green-600 rounded-md outline-none p-5"
                  />
                </div>

                <div className="w-full py-5">
                  <div className="mx-auto w-full max-w-md">
                    <RadioGroup
                      value={newTaskType}
                      onChange={(e) => setNewTaskType(e)}
                    >
                      <RadioGroup.Label className="sr-only">
                        Server size
                      </RadioGroup.Label>
                      <div className="space-y-2">
                        {types.map((type) => (
                          <RadioGroup.Option
                            key={type.id}
                            value={type.id}
                            className={({ active, checked }) =>
                              `${active ? "" : ""}
                  ${checked ? `${type.color} text-white` : "bg-neutral-950"}
                    relative flex cursor-pointer rounded-lg px-5 py-4 shadow-md focus:outline-none`
                            }
                          >
                            {({ active, checked }) => (
                              <>
                                <div className="flex w-full items-center justify-between">
                                  <div className="flex items-center">
                                    <div className="text-sm">
                                      <RadioGroup.Label
                                        as="p"
                                        className={`font-medium  ${
                                          checked
                                            ? "text-white "
                                            : "text-gray-100"
                                        }`}
                                      >
                                        {type.name}
                                      </RadioGroup.Label>
                                      <RadioGroup.Description
                                        as="span"
                                        className={`inline ${
                                          checked
                                            ? "text-sky-100"
                                            : "text-gray-500"
                                        }`}
                                      >
                                        <span>{type.description}</span>{" "}
                                        <span aria-hidden="true">&middot;</span>{" "}
                                      </RadioGroup.Description>
                                    </div>
                                  </div>
                                  {checked && (
                                    <div className="shrink-0 text-white">
                                      <CheckIcon className="h-6 w-6" />
                                    </div>
                                  )}
                                </div>
                              </>
                            )}
                          </RadioGroup.Option>
                        ))}
                      </div>
                    </RadioGroup>
                  </div>
                </div>

                <div>
                  <Button
                    type="submit"
                    disabled={!newTaskInput}
                    className="inline-flex justify-center rounded-md border border-transparent bg-gray-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-green-200 cursor-pointer"
                  >
                    Add Task
                  </Button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
