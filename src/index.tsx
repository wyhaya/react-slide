

import * as React from 'react'
import * as ReactDOM from 'react-dom'

import Slide from '../lib/index'
import '../lib/style.css'


class Example extends React.Component {
    state = {
        slide: [
            '//user-images.githubusercontent.com/23690145/50396162-1bdc5900-07a3-11e9-973b-2d833874348a.jpg',
            '//user-images.githubusercontent.com/23690145/50396164-20a10d00-07a3-11e9-9d55-4ad31e3dc357.jpg',
            '//user-images.githubusercontent.com/23690145/50396166-2696ee00-07a3-11e9-8980-e0dffd1c39df.jpg',
            '//user-images.githubusercontent.com/23690145/50396168-2a2a7500-07a3-11e9-8224-d7506ffe223e.jpg'
        ]
    }
    render() {
        return <div>
            <Slide
                data={this.state.slide}
                time={3000}
                spot={true}
                speed={300}
                type={'ease'}
                onChange={(i) => {
                    console.log('change', i)
                }}
                onPrev={(i) => {
                    console.log('prev', i)
                }}
                onNext={(i) => {
                    console.log('next', i)
                }}
            />
        </div>
    }
}

ReactDOM.render(<Example />, document.querySelector('#root'))


