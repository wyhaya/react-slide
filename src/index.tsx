import * as React from 'react'
import Style from './style'

interface Props {
    data: any[]
    time?: number | false
    speed?: number
    spot?: boolean
    type?: 'ease' | 'linear' | 'ease-in' | 'ease-out' | 'ease-in-out' | string
    clockwise?: boolean
    onClick?: (index: number) => void
    onChange?: (index: number) => void
    onNext?: (index: number) => void
    onPrev?: (index: number) => void
    className?: string
    style?: React.CSSProperties
}

interface State {
    cur: number
    slideX: number
    transition: number
}

interface Touch {
    startX: number
    startY: number
    ifN: boolean
    direction: boolean
    timer: any
    duration: number
    scrollDirection: false | 'prev' | 'next'
}

export default class Entry extends React.Component<Props, State> {
    static defaultProps = {
        time: 3000,
        speed: 300,
        type: 'ease',
        spot: true,
        clockwise: true
    }

    state = {
        cur: 0,
        slideX: 0,
        transition: 0
    }

    touch: Touch = {
        startX: 0, // 触摸的初始位置 X
        startY: 0, // 触摸的初始位置 Y
        ifN: false, // 确定是否需要触摸移动的时候需要判断
        direction: false, // 确定是向上滚动还是向下滚动
        timer: null, // 定时滚动的定时器
        duration: 0, // 触摸了时间
        scrollDirection: false // 滚动方向
    }

    contentRef: React.RefObject<HTMLDivElement> = React.createRef()

    componentDidMount() {
        this.setTimer()
    }

    getPrevItem = () => {
        const item = this.props.data[this.state.cur - 1]
        return item ? item : this.props.data[this.props.data.length - 1]
    }

    getNextItem = () => {
        const item = this.props.data[this.state.cur + 1]
        return item ? item : this.props.data[0]
    }

    render() {
        return (
            <Style 
                ref={this.contentRef} 
                className={this.props.className}
                style={this.props.style}
            >
                <div
                    className='content'
                    style={{
                        transform: `translate3d(${this.state.slideX}px, 0px, 0px)`,
                        transition: `transform ${this.state.transition / 1000}s ${this.props.type}`
                    }}
                    onTouchStart={this.touchStart}
                    onTouchMove={this.touchMove}
                    onTouchEnd={this.touchEnd}
                    onTransitionEnd={this.transitionEnd}
                >
                    <div>
                        <img src={this.getPrevItem()} />
                    </div>
                    <div>
                        <img
                            src={this.props.data[this.state.cur]}
                            onClick={() => this.props.onClick && this.props.onClick(this.state.cur)}
                        />
                    </div>
                    <div>
                        <img src={this.getNextItem()} />
                    </div>
                </div>
                {this.props.spot && (
                    <div className='spot'>
                        {Array.from({
                            length: this.props.data.length
                        }).map((item, i) => {
                            return <div className={this.state.cur === i ? 'cur' : ''} key={i} />
                        })}
                    </div>
                )}
            </Style>
        )
    }

    getGap(x, y = 0) {
        return parseInt((x - y).toString().replace('-', ''))
    }

    touchStart = (e: React.TouchEvent<HTMLDivElement>) => {
        this.touch.startX = e.touches[0].clientX
        this.touch.startY = e.touches[0].clientY
        this.touch.ifN = true
        this.touch.duration = new Date().getTime()
        window.clearInterval(this.touch.timer)
        this.setState({
            transition: 0
        })
    }

    touchMove = (e: React.TouchEvent<HTMLDivElement>) => {
        if (this.touch.ifN) {
            if (
                this.getGap(e.touches[0].clientX, this.touch.startX) >=
                this.getGap(e.touches[0].clientY, this.touch.startY)
            ) {
                this.touch.direction = true
                e.currentTarget.style.transition = ''
            } else this.touch.direction = false
            this.touch.ifN = false
        } else {
            if (this.touch.direction) {
                e.preventDefault()
                this.setState({
                    slideX: e.touches[0].clientX - this.touch.startX
                })
            }
        }
    }

    touchEnd = () => {
        this.setTimer()
        // 判断这个状态 证明 是滑动了轮播而不是上下滚动
        if (!this.touch.direction) return

        // 接触的时间
        const time = new Date().getTime() - this.touch.duration

        // 如果超过300毫秒 那么判断是否滑动到下一个上一个轮播的依据为 滑动的距离是否超过轮播宽度的三分之一
        if (time > 300 && this.getGap(this.state.slideX) < this.contentRef.current.offsetWidth / 3) {
            // 还原 的速度为 过渡时间的 0.8 倍
            this.touch.scrollDirection = false
            this.setState({
                transition: this.props.speed * 0.8,
                slideX: 0
            })
        } else {
            // 判断距离不等于0 防止点击时滑动
            if (this.state.slideX !== 0) {
                this.state.slideX > 0 ? this.prev() : this.next()
            }
        }
    }

    prev = () => {
        this.touch.scrollDirection = 'prev'
        this.setState({
            transition: this.props.speed,
            slideX: this.contentRef.current.offsetWidth
        })
    }

    next = () => {
        this.touch.scrollDirection = 'next'
        this.setState({
            transition: this.props.speed,
            slideX: -this.contentRef.current.offsetWidth
        })
    }

    transitionEnd = () => {
        let cur = 0
        if (this.touch.scrollDirection === false) {
            // 还原操作
            cur = this.state.cur
        } else {
            if (this.touch.scrollDirection === 'prev') {
                if (this.state.cur === 0) {
                    cur = this.props.data.length - 1
                } else {
                    cur = this.state.cur - 1
                }
                this.props.onPrev && this.props.onPrev(cur)
            } else {
                if (this.state.cur !== this.props.data.length - 1) {
                    cur = this.state.cur + 1
                }
                this.props.onNext && this.props.onNext(cur)
            }
        }
        if (this.state.cur !== cur) {
            this.props.onChange && this.props.onChange(cur)
        }
        this.setState({
            transition: 0,
            slideX: 0,
            cur
        })
    }

    setTimer = () => {
        if (this.props.time) {
            this.touch.timer = setInterval(this.props.clockwise ? this.next : this.prev, this.props.time)
        }
    }
}
