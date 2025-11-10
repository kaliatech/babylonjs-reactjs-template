import React, {useEffect, useRef} from 'react'

import {BabylonApp} from './BabylonApp'
import styles from "./App.module.css"

function App() {

  const canvasContainerRef = useRef<HTMLDivElement>(null)
  const babylonAppRef = useRef<BabylonApp>(null)

  useEffect(() => {
    if (!canvasContainerRef.current) {
      return
    }

    // Dynamically create canvas element
    // Doing this instead of placing canvas in JSX to avoid older undocumented problems
    // with WebGL context and memory leaks. Might no longer be necessary.
    const canvas = document.createElement('canvas')
    canvas.className = styles.canvas
    canvasContainerRef.current.appendChild(canvas)

    // Initialize Babylon app
    babylonAppRef.current = new BabylonApp(canvas)
    //babylonAppRef.current.initAndRun()

    return () => {
      babylonAppRef.current?.dispose()
      babylonAppRef.current = null
      if (canvas.parentNode) {
        canvas.parentNode.removeChild(canvas)
      }
    }

  }, [])


  return (
    <div className={styles.app}>
      <header>
        <h1>Babylon.js Test</h1>
      </header>
      <main className="render-canvas-cont" ref={canvasContainerRef}>
      </main>
    </div>
  )
}

export default App
