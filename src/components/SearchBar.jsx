import React from 'react'


export default function SearchBar({ query, setQuery, onLocate }){
return (
<div className="w-full md:w-2/3 flex gap-3 items-center">
<input
value={query}
onChange={(e) => setQuery(e.target.value)}
placeholder="Search city or lat,lng — e.g. Mumbai or 19.0760,72.8777"
className="flex-1 p-3 rounded-lg bg-white/5 placeholder:text-gray-400 outline-none border border-transparent focus:border-sky-500 transition"
/>
<button onClick={onLocate} className="px-4 py-2 rounded-lg bg-sky-500 hover:bg-sky-600 text-white shadow">Use my location</button>
</div>
)
}