import React, { Component } from 'react'

class SignUp extends Component {
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
    createAccount = () => {
        this.props.createAccount(this.state.email, this.state.senha)
      }


    render() {

        const errorMessages = {
            'auth/invalid-email':'Email Inválido',
            'auth/user-not-found':'Usuário não encontrado',
            'auth/wrong-password':'Email e/ou Senha Inválidos',
            'auth/weak-password':'Senha deve conter no minimo 6 digitos',
            'auth/email-already-in-use': 'Email já está cadastrado'
        }
        return (
            <div>
            <h4>Criar Conta</h4>
                <form className='form-inline'>

                    <input type='text' className='form-control mr-1' onChange={this.handleChange('email')} placeholder='Email' ></input>
                    <input type='password' className='form-control mr-1' onChange={this.handleChange('senha')} placeholder='Senha' ></input>
                    <button type='button' className='btn btn-primary mr-1' onClick={this.createAccount} >Criar Conta</button>
                    <button className='btn mr-1' onClick={ () => this.props.changeScreen('login')} >Já Tenho uma Conta</button>
                </form>
                {
                    this.props.isSignUpError && 
                    <div className='card text-white bg-danger mt-3'>
                        <div className='card-header'>Erro ao Criar Conta</div>
                        <div className='card-body'>
                            {errorMessages[this.props.signUpError]}
                        {/*JSON.stringify(this.props.signUpError)*/}
                        </div>
                    </div>   
                }
            </div>
            
        )
    }
}

export default SignUp