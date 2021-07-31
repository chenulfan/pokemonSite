import React, { useState, useEffect } from 'react'
import PokemonCard from '../components/pokemonCard'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

const PokemonsContainer = styled.div({
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
    width: '100vw',
    height: '100vh'
})

export default function Favorites() {

    const [pokemonsId, setPokemonsId] = useState([])
    const [favoritesObj, setFavoritesObj] = useState([]);

    useEffect(() => {
        getFavoritesFromLocalStorage()
    }, [])

    const toggleFavorite = (id) => {
        setPokemonsId(pokemonsId.filter(pokemonId => pokemonId !== id))
    }

    const getFavoritesFromLocalStorage = () => {
        const idArr = JSON.parse(localStorage.getItem('favorites'))
        setPokemonsId(idArr)
        const idObj = {}
        if (idArr) {
            idArr.forEach(id => {
                idObj[id] = true
            })
        }
        setFavoritesObj(idObj)
    }

    return (
        <PokemonsContainer>
            {pokemonsId && pokemonsId.length ?
                pokemonsId.map(id => <PokemonCard key={id} id={id} toggleFavorite={toggleFavorite} isFav={favoritesObj[id]}  />)
                :
                <h2>Your favorites is empty, Go back to <Link to={'/'}>Dashboard</Link></h2>
            }
        </PokemonsContainer>
    )
}
