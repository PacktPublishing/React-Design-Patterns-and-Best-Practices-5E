"use client"

import type React from "react"

import { useState, useRef } from "react"

interface FileWithPreview {
  file: File
  preview: string
  id: string
}

const MAX_FILE_SIZE = 5 * 1024 * 1024 // 5MB
const ACCEPTED_TYPES = ["image/jpeg", "image/png", "image/webp"]

export function ImageUploader() {
  const [files, setFiles] = useState<FileWithPreview[]>([])
  const [dragActive, setDragActive] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  const validateFile = (file: File): string | null => {
    if (!ACCEPTED_TYPES.includes(file.type)) {
      return `Invalid file type: ${file.type}`
    }
    if (file.size > MAX_FILE_SIZE) {
      return `File too large: ${(file.size / 1024 / 1024).toFixed(2)}MB`
    }
    return null
  }

  const handleFiles = (fileList: FileList) => {
    const newFiles: FileWithPreview[] = []

    Array.from(fileList).forEach((file) => {
      const error = validateFile(file)
      if (!error) {
        newFiles.push({
          file,
          preview: URL.createObjectURL(file),
          id: `${Date.now()}-${Math.random()}`,
        })
      } else {
        alert(error)
      }
    })

    setFiles((prev) => [...prev, ...newFiles])
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setDragActive(false)
    if (e.dataTransfer.files) {
      handleFiles(e.dataTransfer.files)
    }
  }

  const removeFile = (id: string) => {
    setFiles((prev) => {
      const file = prev.find((f) => f.id === id)
      if (file) {
        URL.revokeObjectURL(file.preview)
      }
      return prev.filter((f) => f.id !== id)
    })
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const formData = new FormData()
    files.forEach((fileWrapper) => {
      formData.append("images", fileWrapper.file)
    })

    formData.append("title", "Product Gallery")
    formData.append("timestamp", Date.now().toString())

    console.log(
      "Uploading files:",
      files.map((f) => f.file.name),
    )
    alert(`Would upload ${files.length} file(s). Check console for details.`)
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Image Uploader (File Uploads)</h2>

      <div
        onDragOver={(e) => {
          e.preventDefault()
          setDragActive(true)
        }}
        onDragLeave={() => setDragActive(false)}
        onDrop={handleDrop}
        className={`border-2 border-dashed rounded-lg p-8 text-center ${
          dragActive ? "border-blue-500 bg-blue-50" : "border-gray-300"
        }`}
      >
        <input
          ref={inputRef}
          type="file"
          multiple
          accept="image/*"
          onChange={(e) => e.target.files && handleFiles(e.target.files)}
          className="hidden"
        />
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Choose Files
        </button>
        <p className="mt-2 text-sm text-gray-600">or drag and drop images here</p>
        <p className="text-xs text-gray-500 mt-1">Max 5MB per file</p>
      </div>

      {files.length > 0 && (
        <div className="grid grid-cols-3 gap-4 mt-6">
          {files.map(({ id, preview, file }) => (
            <div key={id} className="relative group">
              <img src={preview || "/placeholder.svg"} alt="" className="w-full h-32 object-cover rounded" />
              <button
                type="button"
                onClick={() => removeFile(id)}
                className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center opacity-0 group-hover:opacity-100 transition"
              >
                ✕
              </button>
              <p className="text-xs text-gray-600 mt-1 truncate">{file.name}</p>
            </div>
          ))}
        </div>
      )}

      {files.length > 0 && (
        <button type="submit" className="w-full mt-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
          Upload {files.length} {files.length === 1 ? "Image" : "Images"}
        </button>
      )}
    </form>
  )
}
