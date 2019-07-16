import React from 'react'
import {shallow} from 'enzyme'
import App from './App'
import Comments from './Comments'
import NewComment from './NewComment'
import { EventEmitter } from 'events'


describe('<App />',()=>{
  it('renders without crashing', () => {
    
    //Simulando o database 
    const database = {
      ref: jest.fn()
    }

    //qdo ref for chamado ele retornará outra mock fn 
    database.ref.mockReturnValue({
      on: jest.fn(),
    })

    // fim da simulaçao

    const wrapper = shallow(<App database={database} />)

    //Verifica cada componente renderizado na tela
    expect(wrapper.find(NewComment).length).toBe(1)
    expect(wrapper.find(Comments).length).toBe(1)
    expect(wrapper.find('p').length).toBe(1)

  })
  it('adds a new comment', () => {
    
    //Simulando o database 
    const database = {
      ref: jest.fn()
    }
    const child = jest.fn()
    const update = jest.fn()
    
    const eventEmitter = new EventEmitter()
    //qdo ref for chamado ele retornará outra mock fn 
    database.ref.mockReturnValue({
      on: jest.fn(),
      child,
      update
    })
    const push = jest.fn()
    child.mockReturnValue({
      push
    })
    push.mockReturnValue({
      key: '1'
    })
    // fim da simulaçao

    const wrapper = shallow(<App database={database} />)
    
    wrapper.instance().enviarComentario('new comment')
    expect(child).toBeCalledWith('comments')
    expect(update).toBeCalledWith({
      'comments/1' : {comment: 'new comment'}
    })
    
    //Verifica como o update é chamada
    //console.log(update.mock.calls)
    
  })

    it('renders without crashing', () => {
    
    //Simulando o database 
    const database = {
      ref: jest.fn()
    }
    const eventEmitter = new EventEmitter()
    //qdo ref for chamado ele retornará outra mock fn 
    database.ref.mockReturnValue(eventEmitter)

    // fim da simulaçao

    const wrapper = shallow(<App database={database} />)

    //Não recebeu comments
    expect(wrapper.find(NewComment).length).toBe(1)
    expect(wrapper.find(Comments).length).toBe(1)
    expect(wrapper.find('p').length).toBe(1)
    
    //Recebendo value - Alterando o estado interno
    const comments = {
      a: {'comment': 'comment 1'},
      b: {'comment': 'comment 2'}
    }
    const val = jest.fn()
    val.mockReturnValue(comments)
    //Método .on colocando o value do banco no state comment
    eventEmitter.emit('value', {
      val
    })

    //Forçando a atualização do component
    wrapper.update()

    expect(wrapper.state().isLoading).toBeFalsy()
    expect(wrapper.state().comments).toBe(comments)
    expect(wrapper.find(Comments).get(0).props.comments).toBe(comments)
    expect(wrapper.find(NewComment).get(0).props.enviarComentario).toBe(wrapper.instance().enviarComentario)
    expect(wrapper.find('p').length).toBe(0)

  })
})

