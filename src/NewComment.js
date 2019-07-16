import React, { Component } from 'react'

class NewComment extends Component {
    state = {
        newComment: ''
    }
    
    //Sempre q o value do textarea mudar, será chamada essa função
    handleChange = event => {
        //add dentro do newComments dentro do state o valor do textarea
        this.setState({
        newComment: event.target.value
        })
    }
  
    //Método do NewComment
    enviarComentario = () => {
        //Chama o enviarComentario do app.js q foi passado pelo props e passa 
        //o comentario digitado 
        this.props.enviarComentario(this.state.newComment)
        
        //Limpa o Campo
        this.setState({
            newComment: ''
        })
    }
    render(){
        return (
        
        <div>
            <form className='form-inline'>
                {/*add o valor digitado ao stado do componente*/}
                <textarea className='form-control mr-3' value={this.state.newComment} onChange={this.handleChange}></textarea>
                <button className='btn btn-primary' onClick={this.enviarComentario}>Enviar</button>
            </form>
            </div>

        )
    }
}

export default NewComment