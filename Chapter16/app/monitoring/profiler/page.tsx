"use client"

import type React from "react"

import { Profiler, type ProfilerOnRenderCallback, useState, useRef } from "react"

interface ProfilerData {
  id: string
  phase: "mount" | "update"
  actualDuration: number
  baseDuration: number
  startTime: number
  commitTime: number
}

const ExpensiveComponent: React.FC<{ iterations: number }> = ({ iterations }) => {
  const result = Array.from({ length: iterations }, (_, i) => {
    return Array.from({ length: 100 }, (_, j) => i * j).reduce((a, b) => a + b, 0)
  })

  return (
    <div className="p-4 bg-gray-50 rounded">
      <p className="text-sm font-mono">Performed {iterations} expensive calculations</p>
      <p className="text-xs text-gray-600 mt-1">Result sum: {result.reduce((a, b) => a + b, 0)}</p>
    </div>
  )
}

export default function ProfilerPage() {
  const [iterations, setIterations] = useState(100)
  const [profileData, setProfileData] = useState<ProfilerData[]>([])
  const profileDataRef = useRef<ProfilerData[]>([])

  const onRenderCallback: ProfilerOnRenderCallback = (
    id,
    phase,
    actualDuration,
    baseDuration,
    startTime,
    commitTime,
  ) => {
    if (id === "ExpensiveComponent") {
      const data: ProfilerData = {
        id,
        phase,
        actualDuration,
        baseDuration,
        startTime,
        commitTime,
      }
      profileDataRef.current = [...profileDataRef.current.slice(-9), data]
      setTimeout(() => {
        setProfileData([...profileDataRef.current])
      }, 0)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-6">
        <h1 className="text-4xl font-bold mb-4">React Profiler Demo</h1>
        <p className="text-gray-600 mb-8">
          This example uses the React Profiler API to measure component render performance. Adjust the complexity slider
          to see how it affects render times.
        </p>

        <div className="mb-6 bg-white p-6 rounded-lg shadow">
          <label className="block text-sm font-medium mb-2">Complexity: {iterations} iterations</label>
          <input
            type="range"
            min="10"
            max="1000"
            value={iterations}
            onChange={(e) => setIterations(Number(e.target.value))}
            className="w-full"
          />
        </div>

        <Profiler id="ExpensiveComponent" onRender={onRenderCallback}>
          <ExpensiveComponent iterations={iterations} />
        </Profiler>

        <div className="mt-6 bg-white rounded-lg shadow p-4">
          <h3 className="font-semibold mb-3">Render Performance (last 10 renders)</h3>
          <div className="space-y-2">
            {profileData.map((data, index) => (
              <div key={index} className="flex justify-between text-sm border-b pb-2">
                <span className="text-gray-600">{data.phase}</span>
                <span className={`font-mono ${data.actualDuration > 16 ? "text-red-600" : "text-green-600"}`}>
                  {data.actualDuration.toFixed(2)}ms
                </span>
              </div>
            ))}
          </div>
          <p className="text-xs text-gray-500 mt-3">Target: &lt;16ms per render for 60 FPS</p>
        </div>

        <div className="mt-8 p-6 bg-blue-50 rounded-lg">
          <h3 className="font-semibold mb-2">Understanding the metrics:</h3>
          <ul className="text-sm text-gray-700 space-y-2">
            <li>
              • <strong>actualDuration:</strong> Time spent rendering the component and its children
            </li>
            <li>
              • <strong>baseDuration:</strong> Estimated time to render without memoization
            </li>
            <li>
              • <strong>phase:</strong> Whether this is the initial mount or an update
            </li>
            <li>• Renders over 16ms will cause dropped frames at 60 FPS</li>
          </ul>
        </div>
      </div>
    </div>
  )
}
