import React, { Component } from 'react'

class Login extends Component {
    state = {
        email: '',
        senha: '',
        error: ''
    }
    //Sempre q o value do textarea mudar, será chamada essa função
    handleChange = field => event => {
        //add dentro do newComments dentro do state o valor do textarea
        this.setState({
            [field]: event.target.value
        })
    }
    login = () => {
        this.props.login(this.state.email, this.state.senha)
      }

    render() {

        const errorMessages = {
            'auth/invalid-email':'Email Inválido',
            'auth/user-not-found':'Usuário não encontrado',
            'auth/wrong-password':'Email e/ou Senha Inválidos'
        }
        return (
            <div>
            <h4>Entre para Comentar</h4>
                <form className='form-inline' >
                    
                    <input type='text' className='form-control mr-1' onChange={this.handleChange('email')} placeholder='Email' ></input>
                    <input type='password' className='form-control mr-1' onChange={this.handleChange('senha')} placeholder='Senha' ></input>
                    <button type='button' className='btn btn-primary mr-1' onClick={this.login} >Entrar</button>
                    <button className='btn' onClick={ () => this.props.changeScreen('signup')} >Criar Conta</button>
                    {/*JSON.stringify(this.props)*/}
                </form>
                {
                    this.props.isAuthError && 
                    <div className='card text-white bg-danger mt-3'>
                        <div className='card-header'>Erro ao entrar</div>
                        <div className='card-body'>
                            {errorMessages[this.props.authError]}
                        </div>
                    </div>
                }
            </div>
        )
    }
}

export default Login