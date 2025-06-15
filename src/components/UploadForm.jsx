import { useState } from 'react'

export default function UploadForm() {
  const [title, setTitle] = useState('')
  const [file, setFile] = useState(null)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!file) return alert("Choisis un fichier !")
    console.log("Titre:", title)
    console.log("Fichier:", file)
    // Intégration Appwrite ici plus tard
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="text"
        value={title}
        onChange={e => setTitle(e.target.value)}
        placeholder="Titre de la musique"
        className="w-full px-3 py-2 rounded bg-zinc-800 text-white"
      />
      <input
        type="file"
        accept="audio/*"
        onChange={e => setFile(e.target.files[0])}
        className="w-full px-3 py-2 bg-zinc-700 text-white"
      />
      <button
        type="submit"
        className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded w-full"
      >
        Envoyer
      </button>
    </form>
  )
}
