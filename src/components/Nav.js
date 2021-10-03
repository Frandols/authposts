import React from 'react'

import Bar from './nav/Bar'
import Menu from './nav/Menu'

export default function Nav({ open, setOpen, user }) {
    return (
        <>
            <Bar open={open} setOpen={setOpen} />
            <Menu open={open} setOpen={setOpen} user={user} />
        </>
    )
}