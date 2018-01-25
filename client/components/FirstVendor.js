import React from 'react'
import 'aframe'
import { Entity } from 'aframe-react'
import 'babel-polyfill'

const FirstVendor = () => {
  return (
    <Entity>
      <a-assests>
        <a-asset-item id="octo-obj" src="models/octo/ramenocto.obj" />
        <a-asset-item id="octo-mtl" src="models/octo/ramenoctomaterials.mtl" />
      </a-assests>
      <a-obj-model id="octo" src="#octo-obj" mtl="#octo-mtl" position="0 1 -3" rotation="10 180 0" />
      <Entity
        primitive="a-light"
        type="directional"
        color="#FFF"
        intensity={1}
        position={{ x: 2.5, y: 0.0, z: 0.0 }}
      />
    </Entity>
  )
}
export default FirstVendor
