import axios from 'axios'
import React, { useState } from 'react'
import { Header, Image, Modal } from 'semantic-ui-react'
import styled from 'styled-components'
import COLOR_TYPES from '../constants/colorTypes'
import Slideshow from './slideshow'
import { Container } from 'semantic-ui-react'

const TypesContainer = styled.div({
  display: 'flex',
  justifyContent: 'center'
})
const Type = styled.p({
  width: 60,
  height: 25,
  borderRadius: 10,
  color: 'white',
  backgroundColor: ({ type }) => COLOR_TYPES[type],
  textAlign: 'center',
  verticalAlign: 'middle',
  marginLeft: 2
})

function MyModal({ show, closeModal, pokemonData }) {
  const [locations, setLocations] = useState([])
  const [evoChain, setEvoChain] = useState([])
  const [isEvoultion, setIsEvoultion] = useState(null)

  const getLocations = async () => {
    const res = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonData.id}/encounters`)
    setLocations(res.data)
  }
  
  const capitalize = (name) => {
    return name[0].toUpperCase() + name.slice(1)
  }

  const getEvoChain = async () => {
    setEvoChain([])
    const res = await axios.get(pokemonData.speciesUrl)
    const evolutionChain = await axios.get(res.data.evolution_chain.url)
    setIsEvoultion(res.data.evolves_from_species ? true : false)

    let evoData = evolutionChain.data.chain;

    do {

      const name = evoData.species.name
      let pic, id
      if (name == pokemonData.name) {
        pic = pokemonData.pic
        id = pokemonData.id
      }
      else {
        const pokemonDataRes = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`)
        pic = pokemonDataRes.data.sprites.front_default
        id = pokemonDataRes.data.id
      }

      const evoObj = {
        id,
        name,
        pic
      }
      setEvoChain(prevArr => [...prevArr, evoObj])
      evoData = evoData.evolves_to[0];
    } while (evoData && evoData.hasOwnProperty('evolves_to'));
  }

  const getMorePokemonData = async () => {
    getLocations()
    getEvoChain()
  }


  return (
    <Modal
      onMount={getMorePokemonData}
      onClose={closeModal}
      open={show}
      size='tiny'
    >
      <Modal.Header>
        <Container textAlign='center'>{pokemonData.name? capitalize(pokemonData.name) : null} #{pokemonData.id}</Container>
      </Modal.Header>
      <Modal.Content >
        <Image size='small' src={pokemonData.pic} centered />
        <Modal.Description>

          <Header size='large'>Types</Header>
          <TypesContainer>
            {pokemonData.types ? pokemonData.types.map((type, i) => <Type key={i} type={type.type.name} > {type.type.name} </Type>) : null}
          </TypesContainer>

          <Header size='large'>Games</Header>
          <Slideshow data={pokemonData.games} emoji='🎮' type='game' />

          <Header size='large'>Moves</Header>
          <Slideshow data={pokemonData.moves} emoji='👊🏽' type='move' />

          <Header size='large'>locations</Header>
          <Slideshow data={locations} emoji='📍' type='location' />

          <Header size='large'>Evolutions</Header>
          <Container >
            <Image.Group size='small'>
              {evoChain.map((evo, i) => <Image size='small' key={i} src={evo.pic} />)}
            </Image.Group>
          </Container>


          <Header size='large'>Is Evolution? {isEvoultion ? "YES" : "NO"}</Header>

        </Modal.Description>
      </Modal.Content>
    </Modal>
  )
}

export default MyModal