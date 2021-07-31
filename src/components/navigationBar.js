import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { Menu } from 'semantic-ui-react'
import pokeballImg from '../assets/pokeball.png'

export default function NavigationBar() {
    const [activeItem] = useState(null)
    const history = useHistory();

    const handleClick = (where) => {
        if(where === "dashboard")
            history.push("/");
        if(where === "favorites")
            history.push("/favorites");
    }

    return (
        <Menu inverted borderles className='navigation-bar'>
            <Menu.Item name='dashboard'>
                <img alt='' src={pokeballImg} />
            </Menu.Item>
            <Menu.Item name='dashboard' active={activeItem === 'dashboard'} onClick={() => handleClick("dashboard")}>
                Dashboard
            </Menu.Item>

            <Menu.Item name='favorites' active={activeItem === 'favorites'} onClick={() => handleClick("favorites")}>
                Favorites
            </Menu.Item>
        </Menu>
    )
}
