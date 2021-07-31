import React from 'react'
import { Modal } from 'semantic-ui-react'

export default function WarningModal({show,closeWarningModal}) {
    return (
        <Modal
            content='You added the maximum pokemons to your favorites'
            size='tiny'
            onClose={closeWarningModal}
            open={show}
            style={{fontWeight: 700}}
        />
    )
}