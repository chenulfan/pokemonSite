import React, { useState } from 'react'
import { Container } from 'semantic-ui-react'
import styled from 'styled-components'

const Arrow = styled.span({
    fontSize: 50,
    fontWeight: 700,
    cursor: 'pointer',
    ':hover': {
        color: 'grey'
    }
})
const Emoji = styled.span({
    fontSize: 20
})
const Text = styled.span({
    fontSize: 20,
    fontWeight: 700
})
const SlideshowContainer = styled.div({
    display: 'flex',
    justifyContent: 'center'
})
const SlideshowContent = styled.div({
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: 300

})


export default function Slideshow({ data, emoji, type }) {
    const [curr, setCurr] = useState(0)
    const handlePrev = () => {
        if (curr == 0)
            setCurr(data.length - 1)
        else
            setCurr(curr - 1)
    }
    const handleNext = () => {
        if (curr == data.length - 1)
            setCurr(0)
        else
            setCurr(curr + 1)
    }

    const handleType = () => {
        switch(type){
            case "location":
                return data[curr].location_area.name
            case "move":
                return data[curr].move.name
            case "game":
                return data[curr].version.name
        }
    }

    return (
        <>
            {
                data.length ?
                    <SlideshowContainer>
                        <Arrow onClick={handlePrev}>{'<'}</Arrow>
                        <SlideshowContent>
                            <Emoji> {emoji} </Emoji>
                            <Text> {handleType()} </Text>
                        </SlideshowContent>
                        <Arrow onClick={handleNext}>{'>'}</Arrow>
                    </SlideshowContainer>
                    :
                    <Container textAlign="center">You can't find this pokemon in the wild</Container>
            }
        </>
    )
}