import { createSignal } from "solid-js";
import { invoke } from "@tauri-apps/api/tauri";

import { VsAdd, VsClose } from "solid-icons/vs";
import { AiOutlineArrowRight, AiOutlineArrowLeft, AiOutlineReload } from 'solid-icons/ai'

function App() {
  const [query, setQuery] = createSignal("");

  // async function greet() {
  //   // Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
  //   setGreetMsg(await invoke("greet", { name: name() }));
  // }

  const submit = async (e: Event) => {
      e.preventDefault();

    console.log(await invoke("search", { q: query() }));
  }

  return (
    <main class="w-screen h-screen overflow-hidden">
        <nav class="w-full h-16 p-3 gap-3 flex items-center justify-stretch">
            <div class="tab active">Hello <button class="bg-white rounded absolute right-2"><VsClose /></button></div>
            <div class="tab">Hello <button class=""><VsClose /></button></div>
            <button class="rounded flex items-center justify-center h-full aspect-square hover:shadow-xl transition hover:bg-gray-50"><VsAdd /></button>
        </nav>
        <nav class="bg-gray-200 w-full h-10 flex items-center gap-2 px-2">
            <button class="rounded flex items-center justify-center h-8 aspect-square hover:shadow-xl transition hover:bg-gray-50"><AiOutlineArrowLeft /></button>
            <button class="rounded flex items-center justify-center h-8 aspect-square hover:shadow-xl transition hover:bg-gray-50"><AiOutlineArrowRight /></button>
            <button class="rounded flex items-center justify-center h-8 aspect-square hover:shadow-xl transition hover:bg-gray-50"><AiOutlineReload /></button>
            <form class="w-full h-8" onSubmit={(e) => submit(e)}>
                <input value={query()} onChange={(e) => setQuery(e.target.value)} class="rounded border-0 w-full h-8 p-2 ring-0 outline-none focus:ring-0 focus:border-0 focus:outline-none bg-gray-100 transition focus:bg-white" placeholder="Search with duckduckgo or enter an address" />
            </form>
        </nav>
    </main>
  );
}

export default App;
