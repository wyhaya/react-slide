import styled from 'styled-components'

const Style = styled.div`
    overflow: hidden;
    position: relative;
    .content {
        display: flex;
        width: 300%;
        & > div {
            width: 33.33333%;
            position: relative;
            &:first-child {
                margin-left: -33.33333%;
            }
        }
        img {
            width: 100%;
        }
    }
    .spot {
        width: 100%;
        position: absolute;
        bottom: 20px;
        display: flex;
        justify-content: center;
        div {
            width: 6px;
            height: 6px;
            border: 1px solid #fff;
            border-radius: 50%;
            margin: 0 4px;
            transition: width 0.2s linear;
            &.cur {
                width: 12px;
                border-radius: 6px;
                background-color: #fff;
            }
        }
    }
`

export default Style
