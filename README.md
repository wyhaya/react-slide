
# react-slide

React carousel component for mobile

![slide](https://user-images.githubusercontent.com/23690145/50960304-0cc60c80-1500-11e9-8feb-e6961b46e163.gif)


## Install

```bash
yarn add @wyhaya/react-slide
```

## Example

> Component styles use [styled-components](https://github.com/styled-components/styled-components)

```typescript
import Slide from 'react-slide'

const imgs = ['1.jpg', '2.jpg', '3.jpg']

ReactDOM.render(
    <Slide data={imgs} />,
    document.getElementById('root')
)
```

### Interface

| Props        | Type                   | Default   | Explain                                      |
| -------------  | -------------   | -------------  | -------------                                |
| `data`        | `string[] `     | `[]`           | Picture list                                 |
| `time?`        | `number`        | `3000ms`       | Timed scrolling time                         |
| `spot?`        | `boolean`       | `true`         | Whether to display the index                 |
| `speed?`       | `number`        | `300ms`        | Transition speed                             |
| `type?`        | `ease \| linear \| ease-in \| ...` | `ease` | Transition mode               |
| `clockwise?`   | `boolean`       | `true`         | Whether to scroll clockwise                  |
| `onClick?`       | `(index: number) => void` | `-`  | Callback function after clicking             |
| `onChange?`      | `(index: number) => void` | `-`  | Change the callback function after the index |
| `onPrev?`        | `(index: number) => void` | `-`  | Callback function after index forward        |
| `onNext?`        | `(index: number) => void` | `-`  | Callback function after index backwards      |


### License

[MIT](./LICENSE) LICENSE
