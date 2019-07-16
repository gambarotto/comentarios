import React from 'react'
import Comment from './Comment'

{/* function stateless - Pelo fato de eu ñ gerenciar o estado interno nesse component
* destructuring assign na props passada,retirando apenas o comment do obj */}
const Comments = ({comments}) =>{

    {/* Extrai a chave do objeto passado na chamada do Comments no App.js */}
    const keys = Object.keys(comments) 
    
        return (
            <div>
  
            {/*Percorre o array keys e passa p/ Comment o comentario da posição 'key'*/}
            {/** key={key} isso ajuda o react a identificar de forma unica ql comment foi alterado */}
            {keys.map(key => <Comment key={key} c={comments[key]}/>)}
  
          </div>
        )
    }

export default Comments;