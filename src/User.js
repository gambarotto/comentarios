import React from 'react'

const User = props => {
    return (
        <div className='container'>
            <div className='row'>
                <p className='mt-3'>Usuário {props.email}</p>
                <button className='btn btn-primary ml-3 mt-1' onClick={props.logout}>Sair</button>
            </div>    
        </div>
    )
}

export default User