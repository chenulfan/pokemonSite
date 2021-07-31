import React, { useEffect, useState } from 'react'
import PokemonCard from '../components/pokemonCard'
import styled from 'styled-components'
import song from '../song.mp3'


const PokemonsContainer = styled.div({
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
    width: '100vw',
    height: '100vh'
})

export default function Dashboard() {
    const [arr, setArr] = useState([]);
    const [favoritesObj, setFavoritesObj] = useState([]);

    const audio = new Audio(song);

    window.onload = () => {
        localStorage.setItem("isPlaying",false)
    };

    useEffect(() => {
        initIdArray()
        getFavoritesFromLocalStorage()
    }, [])

    const initIdArray = () => {
        const tmpArr = []
        for (let i = 0; i < 151; i++) {
            tmpArr[i] = i + 1
        }
        setArr(tmpArr)
    }

    const getFavoritesFromLocalStorage = () => {
        const idArr = JSON.parse(localStorage.getItem('favorites'))
        const idObj = {}
        if (idArr) {
            idArr.forEach(id => {
                idObj[id] = true
            })
        }
        setFavoritesObj(idObj)
    }

    const playSong = () => {
        if(!JSON.parse(localStorage.getItem("isPlaying"))){
            localStorage.setItem("isPlaying",true)
            audio.play()
        }
    }

    const toggleFavorite = () => { }

    return (
        <PokemonsContainer onClick={playSong}>
            {arr.map(id => <PokemonCard key={id} id={id} toggleFavorite={toggleFavorite} isFav={favoritesObj[id]} />)}
        </PokemonsContainer>
    )
}
