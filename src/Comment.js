import React from 'react'

const Comment = ({c}) => {
    let comment = 'vazio'
    let email = 'vazio'
    if(c){
        //tem conteudo
        if(c.comment){
            //verifica se tem comentario
            comment = c.comment
        }
        if(c.email){
            email = c.email
        }
    }
        return (
            /**<div>Comentário: {this.props.c.comment}</div> se fosse um componente */
            <div className='card mt-1'>
            <div className='card-body'>
                {comment}
                <br /> 
                 <span className='text-muted'>Enviado por: {email}</span>
            </div>
            </div>

        )
    }
export default Comment