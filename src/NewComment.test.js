import React from 'react'
import { shallow } from 'enzyme'
import NewComment from './NewComment'

describe('<New Comment />', () => {
    it('should handle changes in textarea', () => {
        const wrapper = shallow(<NewComment />)
        const event = {
            target: {value: 'test'}
        }

        wrapper.find('textarea').simulate('change', event)
        expect(wrapper.state().newComment).toBe('test')

    })
    it('should when buttun clicked', () => {
        //criando uma fn fake q será chamada no newComment
        const enviarComentario = jest.fn()//fn mock
        const wrapper = shallow(<NewComment enviarComentario={enviarComentario}/>)
        const event = {
            target: {value: 'test'}
        }

        //simula a mudança de evento no textarea
        wrapper.find('textarea').simulate('change', event)
        wrapper.find('button').simulate('click')
        expect(enviarComentario).toBeCalledWith('test')
        expect(enviarComentario.mock.calls[0][0]).toBe('test')
        //verifica se o state fica limpo após o click no botao
        expect(wrapper.state().newComment).toBe('')
        //verifica o q está sendo passado na mock criada
        //console.log(enviarComentario.mock.calls)
        
        //console.log(wrapper)
    })
})