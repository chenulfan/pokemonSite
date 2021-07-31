import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Loader from 'react-loader-spinner'
import styled from 'styled-components'
import MyModal from './pokemonModal'
import { HeartFill } from '@styled-icons/bootstrap/HeartFill'
import { Popup } from 'semantic-ui-react'
import COLOR_TYPES from '../constants/colorTypes'
import COLOR_CARD_TYPES from '../constants/colorCardTypes'

const PokeCard = styled.div({
    width: 200,
    height: 280,
    margin: 10,
    backgroundColor: ({ type }) => COLOR_CARD_TYPES[type],
    position: 'relative',
    borderRadius: 10,
    boxShadow: '6px 6px 19px -3px rgba(0,0,0,0.68)',
    cursor: 'pointer'
})

const PokeCardContent = styled.div({
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',

})
const Circle = styled.div({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: 110,
    height: 110,
    backgroundColor: 'white',
    borderRadius: '50%',
    boxShadow: '6px 6px 19px -3px rgba(0,0,0,0.68)'
})

const Avatar = styled.img({
    width: 90,
    height: 90
})

const CircleContainer = styled.div({
    display: 'flex',
    justifyContent: 'center',

})

const TypesContainer = styled.div({
    display: 'flex',
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

const NotFavorite = styled.div({
    position: 'absolute',
    right: 5,
    top: 2,
    fontSize: 35,
    ':hover': {
        color: 'red'
    },
    color: 'white',
    cursor: 'pointer',
})

const Favorite = styled(HeartFill)`
    width: 20px;
    height: 20px;
    color: red;
`
const FavoriteContainer = styled.div({
    cursor: 'pointer',
    position: 'absolute',
    right: 5,
    top: 2
})

const CardHeader = styled.div({
    height: 25,
})

export default function PokemonCard({ id, toggleFavorite, isFav }) {

    const [pokemonData, setPokemonData] = useState({})
    const [loading, setLoading] = useState(true)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [fav, setFav] = useState(isFav)

    useEffect(() => {
        getPokemonData()
    }, [])

    const openModal = () => {
        setIsModalOpen(true)
    }
    const closeModal = () => {
        setIsModalOpen(false)
    }

    const getPokemonData = async () => {
        const res = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`)
        const pokeObj = {
            id: res.data.id,
            name: res.data.name,
            types: res.data.types,
            moves: res.data.moves,
            speciesUrl: res.data.species.url,
            games: res.data.game_indices,
            pic: res.data.sprites.front_default
        }
        setPokemonData(pokeObj)
        setLoading(false)
    }

    const handleToggle = () => {
        const res = addToLocalStorage()
        if (res) {
            setFav(!fav)
            toggleFavorite(id)

        }
    }

    const capitalize = (name) => {
        return name[0].toUpperCase() + name.slice(1)
    }

    const addToLocalStorage = () => {
        let favorites = localStorage.getItem('favorites') ? JSON.parse(localStorage.getItem('favorites')) : []

        const found = favorites.findIndex(id => id == pokemonData.id)
        if (found == -1) {
            favorites.push(pokemonData.id)
        }
        else {
            favorites.splice(found, 1);

        }

        if (favorites.length > 6) {
            console.log("you added the maximum pokemons to your favorites")
            return false
        }
        else {
            localStorage.setItem('favorites', JSON.stringify(favorites))
            return true
        }
    }

    return (
        <PokeCard type={pokemonData.types ? pokemonData.types[0].type.name : null}>
            <CardHeader>
                {fav ?
                    <FavoriteContainer>
                        <Popup
                            mouseEnterDelay={1000}
                            mouseLeaveDelay={1000}
                            on='hover'
                            content='Remove from Favorites'
                            size='mini'
                            trigger={<Favorite onClick={loading ? null : handleToggle} />}
                        />
                    </FavoriteContainer>
                    :
                    <Popup
                        mouseEnterDelay={1000}
                        mouseLeaveDelay={1000}
                        on='hover'
                        content='Add to Favorites'
                        size='mini'
                        trigger={<NotFavorite onClick={loading ? null : handleToggle}>♡</NotFavorite>}
                    />

                }

            </CardHeader>
            <PokeCardContent onClick={loading ? null : openModal}>
                <CircleContainer>
                    <Circle>
                        {Object.keys(pokemonData).length == 0 ?
                            <Loader
                                type="TailSpin"
                                color="#00BFFF"
                                height={90}
                                width={90}
                            />
                            :
                            <Avatar src={pokemonData.pic} />
                        }
                    </Circle>
                </CircleContainer>
                <h1>{!loading ? capitalize(pokemonData.name) : null}</h1>
                <TypesContainer>
                    {!loading ? pokemonData.types.map((type, i) => <Type key={i} type={type.type.name} > {type.type.name} </Type>) : null}
                </TypesContainer>
                <MyModal show={isModalOpen} closeModal={closeModal} pokemonData={pokemonData}></MyModal>
            </PokeCardContent>
        </PokeCard>
    )
}
