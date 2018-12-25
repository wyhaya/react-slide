import * as React from 'react';
interface Props {
    data: any[];
    time?: number | false;
    speed?: number;
    spot?: boolean;
    type?: 'ease' | 'linear' | 'ease-in' | 'ease-out' | 'ease-in-out' | string;
    onClick?: (index: number) => void;
    onChange?: (index: number) => void;
    onNext?: (index: number) => void;
    onPrev?: (index: number) => void;
}
interface State {
    cur: number;
    slideX: number;
    transition: number;
}
interface Touch {
    startX: number;
    startY: number;
    ifN: boolean;
    direction: boolean;
    timer: any;
    duration: number;
    scrollDirection: false | 'prev' | 'next';
}
export default class Entry extends React.Component<Props, State> {
    static defaultProps: {
        time: number;
        speed: number;
        type: string;
        spot: boolean;
    };
    state: {
        cur: number;
        slideX: number;
        transition: number;
    };
    touch: Touch;
    contentRef: React.RefObject<HTMLDivElement>;
    componentDidMount(): void;
    getPrevItem: () => any;
    getNextItem: () => any;
    render(): JSX.Element;
    getGap(x: any, y?: number): number;
    touchStart: (e: React.TouchEvent<HTMLDivElement>) => void;
    touchMove: (e: React.TouchEvent<HTMLDivElement>) => void;
    touchEnd: () => void;
    prev: () => void;
    next: () => void;
    transitionEnd: () => void;
    setTimer: () => void;
}
export {};
