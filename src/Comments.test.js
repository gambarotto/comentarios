import React from 'react'
import { shallow } from 'enzyme'
import Comments from './Comments'
import Comment from './Comment'

describe('<Comments />', () => {
    it('should render Comments', () =>{
        const comments = {
            a: {id: 'a', comment: 'Comment 1'},
            b: {id: 'b', comment: 'Comment 2'}
        }
        const wrapper = shallow(<Comments comments={comments}/>)
        
        //verificando o q foi passado na props.c na posição 0
        //console.log(wrapper.find(Comment).get(0))

        expect(wrapper.find(Comment).length).toBe(2)
        
        //confrontando o q foi passado na props.c na posição 0
        expect(wrapper.find(Comment).get(0).props.c).toBe(comments.a)

        //Verifica a id da props.c na posição 0
        expect(wrapper.find(Comment).get(0).key).toBe(comments.a.id)
        
        //Verifica a comment da props.c na posição 0
        expect(wrapper.find(Comment).get(0).props.c.comment).toBe(comments.a.comment)

    })
    it('should work with no Comments', () =>{
        const comments = {}
        const wrapper = shallow(<Comments comments={comments}/>)
    
        expect(wrapper.find(Comment).length).toBe(0)
    })
})