// Lifting state
// http://localhost:3000/isolated/exercise/03.js

import * as React from 'react'

function Name() {
  const [name, setName] = React.useState('')

  function onChange(e) {
    setName(e.target.value)
  }

  return (
    <div>
      <label htmlFor="name">Name: </label>
      <input id="name" value={name} onChange={ e => onChange(e)} />
    </div>
  )
}

// 🐨 accept `animal` and `onAnimalChange` props to this component
function FavoriteAnimal({petName, setPetName}) {
  return (
    <div>
      <label htmlFor="animal">Favorite Animal: </label>
      <input
        id="animal"
        value={petName}
        onChange={event => setPetName(event.target.value)}
      />
    </div>
  )
}

// 🐨 uncomment this
function Display({petName}) {
  return <div>{`Hey, your favorite petName is: ${petName}!`}</div>
}

function App() {
  const [petName, setPetName] = React.useState('')
  return (
    <form>
      <Name />
      {/* 🐨 pass the animal and onAnimalChange prop here (similar to the Name component above) */}
      <FavoriteAnimal petName={petName} setPetName={setPetName} />
      {/* 🐨 pass the animal prop here */}
      <Display petName={petName}/>
    </form>
  )
}

export default App
