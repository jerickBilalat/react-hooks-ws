// Lifting state
// http://localhost:3000/isolated/exercise/03.js

import * as React from 'react'

function Name({name, onNameChange}) {
  return (
    <div>
      <label htmlFor="name">Name: </label>
      <input id="name" value={name} onChange={onNameChange} />
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
function Display({name, petName}) {
  return <div>{`Hey ${name}, your favorite petName is: ${petName}!`}</div>
}

function App() {
  const [name, setName] = React.useState('')
  const [petName, setPetName] = React.useState('')
  return (
    <form>
      <Name name={name} onNameChange={event => setName(event.target.value)} />
      {/* 🐨 pass the animal and onAnimalChange prop here (similar to the Name component above) */}
      <FavoriteAnimal petName={petName} setPetName={setPetName} />
      {/* 🐨 pass the animal prop here */}
      <Display name={name} petName={petName}/>
    </form>
  )
}

export default App
