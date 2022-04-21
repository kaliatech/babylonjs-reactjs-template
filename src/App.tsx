import React, { useEffect } from 'react'

import { BabylonApp } from './BabylonApp'


let strictModeBypass = import.meta.env.DEV

function App() {

  const canvasRef = React.createRef<HTMLCanvasElement>()
  let babylonApp: BabylonApp | undefined

  useEffect(() => {
    if (strictModeBypass && canvasRef.current) {
      babylonApp = new BabylonApp(canvasRef.current)
    }

    // Setup resize handler
    const onResize = () => {
      babylonApp?.onResize()
    }
    if (window) {
      window.addEventListener('resize', onResize)
    }

    return () => {
      if (window) {
        window.removeEventListener('resize', onResize)
      }

      if (strictModeBypass) {
        strictModeBypass = false
        return
      } else {
        babylonApp?.dispose()
        strictModeBypass = true;
      }
    }

  }, []) // empty array to run useEffect only once ...but doesn't work for React.StrictMode


  return (
    <div className="app">
      <header>
        <h1>Babylon.js Test</h1>
      </header>
      <main className="render-canvas-cont">
        <canvas id="renderCanvas" className="render-canvas" ref={canvasRef} />
      </main>
    </div>
  )
}

export default App
