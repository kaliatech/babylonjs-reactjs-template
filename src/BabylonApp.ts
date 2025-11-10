import {Color3} from '@babylonjs/core/Maths/math.color.js'
import {Engine} from '@babylonjs/core/Engines/engine.js'
import {EnvironmentHelper} from '@babylonjs/core/Helpers/environmentHelper'
import {Scene} from '@babylonjs/core/scene.js'
import {Vector3} from '@babylonjs/core/Maths/math.vector.js'


import {AxesViewer} from '@babylonjs/core/Debug/axesViewer.js'

import {MeshBuilder} from '@babylonjs/core/Meshes/meshBuilder.js'
import {StandardMaterial} from '@babylonjs/core/Materials/standardMaterial.js'
import {HemisphericLight} from '@babylonjs/core/Lights/hemisphericLight.js'
import {ArcRotateCamera} from '@babylonjs/core/Cameras/arcRotateCamera.js'
import {Observer} from "@babylonjs/core/Misc/observable.js"
import {Mesh} from "@babylonjs/core/Meshes/mesh.js"
import {Scalar} from "@babylonjs/core/Maths/math.scalar.js"

const sphereD = 1.0
const sphereR = sphereD / 2.0

export class BabylonApp {

  protected beforeRenderObv?: Observer<Scene>
  private readonly engine: Engine
  private readonly scene: Scene
  private readonly _resizeObserver: ResizeObserver

  private spheres: Mesh[] = []

  private elapsedTime = 0

  constructor(private canvasEl: HTMLCanvasElement) {
    console.log("BabylonApp, Engine.init")
    // Create engine and a scene
    this.engine = new Engine(this.canvasEl, true, {
      loseContextOnDispose: true, // if this is false, WebGL warnings on second init
      adaptToDeviceRatio: true
    })
    this.scene = new Scene(this.engine)

    // Setup ResizeObserver for canvas
    this._resizeObserver = new ResizeObserver(() => {
      this.engine.resize()
    })
    this._resizeObserver.observe(this.canvasEl)

    // Create a camera
    const camera = new ArcRotateCamera('Camera',
      -Math.PI / 2 + Math.PI / 6,
      Math.PI / 2 - Math.PI / 6,
      7,
      new Vector3(0, 0, 0),
      this.scene)
    camera.attachControl(true)


    // Add a simple light
    const light = new HemisphericLight('light1', new Vector3(0, 2, 0), this.scene)
    light.intensity = 0.7

    // Add axes viewer with 1 unit lengths
    new AxesViewer(this.scene, 1)

    // Create a default environment
    const envHelper = new EnvironmentHelper(
      {
        createSkybox: true,
        skyboxSize: 30,
        groundColor: new Color3(0.5, 0.5, 0.5)
      },
      this.scene
    )

    // Add three spheres, X(R), Y(G), Z(B)
    let sphere = MeshBuilder.CreateSphere('xSphere', {
      segments: 16,
      diameter: sphereD
    }, this.scene)
    sphere.position.x = sphereD * 2
    sphere.position.y = 0
    sphere.position.z = 0
    const rMat = new StandardMaterial('matR', this.scene)
    rMat.diffuseColor = new Color3(1.0, 0, 0)
    sphere.material = rMat
    this.spheres.push(sphere)

    sphere = sphere.clone('ySphere', null)
    sphere.position.x = 0
    sphere.position.y = sphereD * 2
    sphere.position.z = 0
    const gMat = new StandardMaterial('matG', this.scene)
    gMat.diffuseColor = new Color3(0, 1.0, 0)
    sphere.material = gMat
    this.spheres.push(sphere)


    sphere = sphere.clone('zSphere', null)
    sphere.position.x = 0
    sphere.position.y = 0
    sphere.position.z = sphereD * 2
    const bMat = new StandardMaterial('matB', this.scene)
    bMat.diffuseColor = new Color3(0, 0, 1.0)
    sphere.material = bMat
    this.spheres.push(sphere)

    // Commented lines show alternate way to setup callbacks:
    //private beforeRenderHandle = this.beforeRender.bind(this)
    //scene.registerBeforeRender(this.beforeRenderHandle)
    this.beforeRenderObv = this.scene?.onBeforeRenderObservable.add(() =>
      this.beforeRender(),
    )

    this.engine.runRenderLoop(() => {
      this.scene?.render()
    })
  }

  beforeRender(): void {
    if (!this.scene || this.scene.isDisposed) return
    const engine = this.scene.getEngine()
    const deltaMs = engine.getDeltaTime()
    this.elapsedTime += deltaMs

    const timeMs = 2000
    const dP = (this.elapsedTime % timeMs) / timeMs
    let x
    let r
    //const startX = sphereD + sphereR
    const startX = 0

    const endX = sphereD * 4
    if (dP < 0.5) {
      x = Scalar.Lerp(startX, endX, dP)
    } else {
      x = Scalar.Lerp(endX, startX, dP)
    }
    this.spheres[0].position.x = x
    this.spheres[1].position.y = x
    this.spheres[2].position.z = x
  }


  dispose() {
    console.log("BabylonApp, dispose")
    if (this.beforeRenderObv) {
      this.scene?.onBeforeRenderObservable.remove(this.beforeRenderObv)
    }
    this.spheres.forEach((sphere) => {
      sphere.dispose(false, true)
    })
    this.spheres = []
    this.scene?.dispose()
    this.engine?.stopRenderLoop()
    this.engine?.dispose()
  }
}
