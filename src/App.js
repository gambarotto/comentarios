import React, { Component } from 'react';
import Comments from './Comments';
import NewComment from './NewComment';
import Login from './Login'
import User from './User'
import SignUp from './SignUp'
import 'bootstrap-css-only'

//import { database } from './firebase'; //pegando apenas o modulo database de dentro do firebase

class App extends Component {

  //Precisa ser state o nome do obj
  state = {

    comments: {},
    isLoading: false,
    isAuthError: false,
    authError: '',
    isSignUpError: false,
    signUpError: '',
    isAuth: false,
    user: {},
    userScreen: 'login' // signup
  }

  enviarComentario = comment => {
    //pega a key que será gerada ao se criar um novo nó no firebase através do método push()
    const { database } = this.props
    const idComentario = database.ref().child('comments').push().key
    const comentarioBanco = {}
    comentarioBanco['comments/' + idComentario] = {
      comment,
      email: this.state.user.email, //salva o email do user junto com o comentario
      userid: this.state.user.uid   //salva o id do user junto com o comentario
    }
    //console.log(this.state.user)
    database.ref().update(comentarioBanco)

  }

  // createAccount = async (email, senha) => {
  //   const { auth } = this.props
  // }

  //faz a verificação no firebase
  login = async (email, senha) => {
    const { auth } = this.props

    this.setState({
      authError: '',
      isAuthError: false
    })
    try {

      await auth.signInWithEmailAndPassword(email, senha)

    } catch (e) {
      //console.log('entrou'+' '+this.state.isAuthError)

      this.setState({
        authError: e.code,
        isAuthError: true
      })
      //console.log(this.state.isAuthError)

    }
  }
  createAccount = async (email, senha) => {
    const { auth } = this.props

    this.setState({
      signUpError: '',
      isSignUpError: false
    })
    try {

      await auth.createUserWithEmailAndPassword(email, senha)

    } catch (e) {
      //console.log('entrou'+' '+this.state.isAuthError)

      this.setState({
        signUpError: e.code,
        isSignUpError: true
      })
      //console.log(this.state.isAuthError)

    }
  }

  logout = () => {
    if (this.state.user.email !== '') {
      const { auth } = this.props
      auth.signOut()
    }
  }

  //método de lifeCycling
  componentDidMount() {
    //retira o database das props q foram passadas pelo index.js
    const { database } = this.props
    const { auth } = this.props

    this.setState({
      isLoading: true
    })

    this.comments = database.ref('comments')

    //colocando o value do banco no state comment
    this.comments.on('value', snapshot => {

      this.setState({
        comments: snapshot.val(),
        isLoading: false
      })
    })
    //verifica se o user já está logado
    auth.onAuthStateChanged(user => {
      if (user) {
        this.setState({
          isAuth: true,
          user
        })
      } else {
        this.setState({
          isAuth: false,
          user: {}
        })
      }
    })

  }

  changeScreen = (screen) => {
    this.setState({
      userScreen: screen
    })
  }
  render() {
    return (

      //mt-3  = marginTop -3
      <div className='container mt-3'>
      {/*JSON.stringify(this.state.userScreen)*/}
        {!this.state.isAuth && this.state.userScreen === 'login'
          &&
          <Login login={this.login}
            isAuthError={this.state.isAuthError}
            authError={this.state.authError}
            changeScreen={this.changeScreen} />
        }

        {!this.state.isAuth && this.state.userScreen === 'signup'
          &&
          <SignUp createAccount={this.createAccount}
            isSignUpError={this.state.isSignUpError}
            signUpError={this.state.signUpError}
            changeScreen={this.changeScreen} />
        }
        
        {/* New Comment */}
        {this.state.isAuth && <NewComment enviarComentario={this.enviarComentario} />}
        {this.state.isAuth && <User email={this.state.user.email} logout={this.logout} />}
        {/*Comments  comments recebe um obj recuperado do firebase, isso acontece no evento didmount*/
          /* Isso é passado na chamada 1: comment: "comentario" */
        }
        <Comments comments={this.state.comments} />

        {
          //só renderiza na tela se o isLoading for true
          this.state.isLoading && <p>Carregando...</p>
        }
      </div>
    )
  }
}

export default App;
