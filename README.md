
# react-slide

## Install

```bash
yarn add https://github.com/wyhaya/react-slide
```

## Example

```typescript

import Slide from 'react-slide'

const imgs = ['1.jpg', '2.jpg', '3.jpg']

const render = () => {
    return <Slide
        data={imgs}
        time={3000}
        spot={true}
        speed={300}
        type={'ease'}
        onClick={(i) => {
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
}
```

