'use client'
import { useBearStore } from "@/store/store"
import { useState } from "react"

export default function Add() {
    const [status,setStatus] = useState()
    const [title,setTitle]  = useState()
    const {tds,addTodos,done,todo} = useBearStore()
    console.log(todo)
console.log(done)
  return (
    <div className="p-10 grid gap-2 max-w-xl">
        <input onChange={(e) => setTitle(e.target.value)} placeholder="title"/>
        <select onChange={(e) => setStatus(e.target.value)}>
            <option value="todo">todo</option>
            <option value="inProgress">in progress</option>
            <option value="done">done</option>
        </select>
        <button onClick={() => addTodos({title:title,status:status})}>add</button>
    </div>
  )
}
