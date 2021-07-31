import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { Menu } from 'semantic-ui-react'

export default function NavigationBar() {
    const [activeItem, setActiveItem] = useState(null)
    let history = useHistory();

    const handleClick = (where) => {
        if(where == "dashboard"){
            history.push("/");
        }
        if(where == "favorites"){
            history.push("/favorites");
        }
    }

    return (
        <Menu inverted>
            <Menu.Item name='dashboard' active={activeItem == 'dashboard'} onClick={() => handleClick("dashboard")}>
                Dashboard
            </Menu.Item>

            <Menu.Item name='favorites' active={activeItem == 'favorites'} onClick={() => handleClick("favorites")}>
                Favorites
            </Menu.Item>
        </Menu>
    )
}
