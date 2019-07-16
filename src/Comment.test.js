import React from 'react'
import Comment from './Comment'
import { render } from 'enzyme'

it('should render text', () => {
    const c = { comment: 'teste'}

    const wrapper = render(<Comment c={c} />)
    expect(wrapper.text()).toBe('Comentário: teste')

})
it('should render other text', () => {
    const c = { comment: ''}

    const wrapper = render(<Comment c={c}/>)
    expect(wrapper.text()).toBe('Comentário: vazio')
})