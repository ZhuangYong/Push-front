import React from "react";

export default class ScrollContainer extends React.Component {


    onTouchStart = e => {
        const wh = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
        const target = document.querySelector(".page-container");
        if (target && target.scrollHeight > wh) {
            this.setState({startPoint: e.touches[0]});
        }
    };

    onTouchMove = e => {
        const {startPoint} = this.state;
        const target = document.querySelector(".page-container");
        const wh = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
        if (startPoint) {
            const {clientY: startY} = startPoint;
            const {clientY} = e.touches[0];
            if (target.scrollHeight <= target.scrollTop + wh) {
                // 滑动到底部
                target.style.transform = `translateY(${-Math.sqrt(Math.abs(clientY - startY))}px)`;
                e.preventDefault();
                e.stopPropagation();
            } else if (target.scrollTop === 0) {
                // 滑动到顶部
                target.style.transform = `translateY(${Math.sqrt(clientY - startY)}px)`;
                e.preventDefault();
                e.stopPropagation();
            } else {
                target.style.transform = "";
            }
        }
    };

    onTouchEnd = e => {
        const target = document.querySelector(".page-container");
        if (target) {
            target.style.transform = "";
        }
        this.setState({startPoint: null});
    };
}
