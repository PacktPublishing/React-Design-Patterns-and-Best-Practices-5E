"use client"

import type React from "react"
import { useState, useRef, type KeyboardEvent } from "react"

interface DropdownOption {
  value: string
  label: string
  disabled?: boolean
}

interface DropdownProps {
  options: DropdownOption[]
  value?: string
  placeholder?: string
  onChange: (value: string) => void
}

export const AccessibleDropdown: React.FC<DropdownProps> = ({
  options,
  value,
  placeholder = "Select an option",
  onChange,
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const [focusedIndex, setFocusedIndex] = useState(-1)
  const dropdownRef = useRef<HTMLDivElement>(null)

  const selectedOption = options.find((opt) => opt.value === value)

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    switch (event.key) {
      case "Enter":
      case " ":
        event.preventDefault()
        if (focusedIndex >= 0) {
          const option = options[focusedIndex]
          if (!option.disabled) {
            onChange(option.value)
            setIsOpen(false)
          }
        } else {
          setIsOpen(!isOpen)
        }
        break
      case "ArrowDown":
        event.preventDefault()
        setFocusedIndex((prev) => (prev < options.length - 1 ? prev + 1 : 0))
        break
      case "ArrowUp":
        event.preventDefault()
        setFocusedIndex((prev) => (prev > 0 ? prev - 1 : options.length - 1))
        break
      case "Escape":
        setIsOpen(false)
        setFocusedIndex(-1)
        break
    }
  }

  return (
    <div ref={dropdownRef} className="relative" onKeyDown={handleKeyDown}>
      <button
        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-left flex justify-between items-center"
        onClick={() => setIsOpen(!isOpen)}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-label={selectedOption ? selectedOption.label : placeholder}
      >
        <span className={!selectedOption ? "text-gray-500 dark:text-gray-400" : "text-gray-900 dark:text-white"}>
          {selectedOption ? selectedOption.label : placeholder}
        </span>
        <span className={`transform transition-transform ${isOpen ? "rotate-180" : ""}`}>▼</span>
      </button>

      {isOpen && (
        <ul
          className="absolute top-full left-0 right-0 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md shadow-lg z-10 max-h-60 overflow-y-auto mt-1"
          role="listbox"
          aria-label="Options"
        >
          {options.map((option, index) => (
            <li
              key={option.value}
              role="option"
              aria-selected={option.value === value}
              aria-disabled={option.disabled}
              className={`px-3 py-2 cursor-pointer ${
                index === focusedIndex ? "bg-blue-100 dark:bg-blue-900" : ""
              } ${option.disabled ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-100 dark:hover:bg-gray-700"}
              ${option.value === value ? "bg-blue-50 dark:bg-blue-900/50 font-medium" : ""}`}
              onClick={() => {
                if (!option.disabled) {
                  onChange(option.value)
                  setIsOpen(false)
                }
              }}
            >
              {option.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
