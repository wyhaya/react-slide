import * as React from 'react'
import * as ReactDOM from 'react-dom'

import Slide from '../src/index'

class Example extends React.Component {
    state = {
        slide: [
            '1.jpg',
            '2.jpg',
            '3.jpg'
        ]
    }
    render() {
        return (
            <div>
                <Slide
                    data={this.state.slide}
                    time={3000}
                    spot={true}
                    speed={300}
                    type={'ease'}
                    onClick={i => {
                        console.log('click', i)
                    }}
                    onChange={i => {
                        console.log('change', i)
                    }}
                    onPrev={i => {
                        console.log('prev', i)
                    }}
                    onNext={i => {
                        console.log('next', i)
                    }}
                />
            </div>
        )
    }
}

ReactDOM.render(<Example />, document.querySelector('#root'))
