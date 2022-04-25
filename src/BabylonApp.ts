import { Color3 } from '@babylonjs/core/Maths/math.color.js'
import { Engine } from '@babylonjs/core/Engines/engine.js'
import { EnvironmentHelper } from '@babylonjs/core/Helpers/environmentHelper'
import { Scene } from '@babylonjs/core/scene.js'
import { Vector3 } from '@babylonjs/core/Maths/math.vector.js'

// Required for EnvironmentHelper
import '@babylonjs/core/Materials/Textures/Loaders'

// Enable GLTF/GLB loader
import '@babylonjs/loaders/glTF'


import './App.css'
import { AbstractScene, ArcRotateCamera, AxesViewer, MeshBuilder, StandardMaterial, Texture } from '@babylonjs/core'
import { HemisphericLight } from '@babylonjs/core/Lights/hemisphericLight.js'

import { TextureCanvas } from 'babylontexturecanvas/src/textureCanvas'


export class BabylonApp {

  private readonly engine: Engine
  private readonly scene: Scene

  constructor(private canvas: HTMLCanvasElement) {

    // Create engine and a scene
    this.engine = new Engine(this.canvas, true)
    this.scene = new Scene(this.engine)

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

    // Simple shere
    const sphereD = 1.0
    const sphereR = sphereD / 2.0

    // Add three 1 unit spheres, X(R), Y(G), Z(B)
    // const sphere = MeshBuilder.CreateSphere('xSphere', { segments: 16, diameter: sphereD }, this.scene)
    // sphere.position.x = 0
    // sphere.position.y = sphereR
    // sphere.position.z = 0
    // const rMat = new StandardMaterial('matR', this.scene)
    // rMat.diffuseColor = new Color3(1.0, 0, 0)
    // sphere.material = rMat

    // Create a default environment
    // const envHelper = new EnvironmentHelper(
    //   {
    //     createSkybox: true, // When true, there are WebGL errors on 2nd init. No errors if false.
    //     skyboxSize: 30,
    //     groundColor: new Color3(0.5, 0.5, 0.5)
    //   },
    //   this.scene
    // )

    this.runTest(this.scene);

    this.engine.runRenderLoop(() => {
      this.scene?.render()
    })
  }

  runTest(scene:Scene) {
    const myTexture = new Texture("https://i.imgur.com/51EVud5.jpg", scene);
    const myTextureCanvas = new TextureCanvas(512, scene, myTexture);
    let ctx = myTextureCanvas.createContext();
    ctx.setDrawRect(0.25, 0.25, 0.5, 0.5);
    ctx.rotation.z = Math.PI / 4;
    ctx.drawTexture(myTexture);

    var ground = MeshBuilder.CreateGround("ground1", { width: 6, height: 6} , scene);
    const mat =  new StandardMaterial('mat', scene);
    mat.diffuseTexture = myTextureCanvas
    ground.material = mat
  }

  onResize() {
    this.engine?.resize(true)
  }

  dispose() {
    console.log('dispose')
    this.scene?.dispose()
    this.engine?.stopRenderLoop()
    this.engine?.dispose()
  }
}
