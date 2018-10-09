import React, { Component } from 'react'
import propTypes from 'prop-types'
import eases from 'eases'
import cx from 'classnames'
import { getPageOffset } from 'helpers'

import cssModules from 'react-css-modules'
import styles from './SvgCross.scss'


const defaultSvg = {
  topLine: {
    x1: 0,
    y1: 5.5,
    x2: 25,
    y2: 5.5,
  },

  centerLine: {
    x1: 0,
    y1: 12.5,
    x2: 25,
    y2: 12.5,
  },

  bottomLine: {
    x1: 0,
    y1: 19.5,
    x2: 25,
    y2: 19.5,
  },
}


@cssModules(styles, { allowMultiple: true })
export default class SvgCross extends Component {

  static propTypes = {
    speed: propTypes.number,
  }

  static defaultProps = {
    speed: 600,
  }

  state = {
    isReverse: true,
    timeStart: null,
    timeEnd: null,

    ...defaultSvg,
  }

  paths = {
    topLine: {
      from: defaultSvg.topLine,
      to: {
        x1: 3,
        y1: 3,
        x2: 22,
        y2: 22,
      }
    },
    centerLine: {
      from: defaultSvg.centerLine,
      to: {
        x1: 12,
        y1: 12.5,
        x2: 11,
        y2: 12.5,
      },
    },
    bottomLine: {
      from: defaultSvg.bottomLine,
      to: {
        x1: 3,
        y1: 22,
        x2: 22,
        y2: 3,
      },
    }
  }

  componentWillReceiveProps({ isOpen }) {
    const { isReverse } = this.state

    if (!isOpen && !isReverse) {
      setTimeout(() => {
        const { isReverse } = this.state

        if (!isReverse) {
          this.onClick(true)
        }
      })
    }
  }

  getValue = (time, line) => {
    const { speed } = this.props
    const { from, to } = this.getFromTo(line)

    const path    = {}
    const percent = eases['elasticOut'](1 - time / speed)

    Object.keys(from).forEach((key) => {
      const min = from[key]
      const max = to[key]

      path[key] = (percent * (max - min)) + min
    })

    return path
  }

  getFromTo = (_line) => {
    const { isReverse } = this.state

    const line = this.paths[_line]

    return isReverse ? { from: line.to, to: line.from } : line
  }

  animate = () => {
    const { timeEnd } = this.state

    if (timeEnd > Date.now()) {
      const time     = timeEnd - Date.now()

      this.timeout   = setTimeout(this.animate, 15)

      this.setState({
        topLine: this.getValue(time, 'topLine'),
        centerLine: this.getValue(time, 'centerLine'),
        bottomLine: this.getValue(time, 'bottomLine'),
      })
    }
    else {
      this.setState({
        topLine: this.getFromTo('topLine').to,
        centerLine: this.getFromTo('centerLine').to,
        bottomLine: this.getFromTo('bottomLine').to,
      })
    }
  }

  onClick = (isCallback) => {
    const { isReverse } = this.state
    const { speed, onClick } = this.props

    this.timeout = setTimeout(this.animate, 15)

    this.setState({
      timeStart: Date.now(),
      timeEnd: Date.now() + speed,
      isReverse: !isReverse,
    })

    if (isCallback !== true) {
      onClick()
    }
  }

  render() {
    const { topLine, centerLine, bottomLine, isReverse } = this.state

    const svgClassName = cx({
      'active': !isReverse,
    })

    const stroke = isReverse ? '#3f617e' : '#6e7f90'

    return (
      <div styleName="menuPointer" onClick={this.onClick}>
        <svg styleName={svgClassName} viewBox="0 0 25 25">
          <g stroke={stroke}>
            <path d={`M${topLine.x1},${topLine.y1} L${topLine.x2},${topLine.y2}`} />
            {
              isReverse && (
                <path d={`M${centerLine.x1},${centerLine.y1} L${centerLine.x2},${centerLine.y2}`} />
              )
            }
            <path d={`M${bottomLine.x1},${bottomLine.y1} L${bottomLine.x2},${bottomLine.y2}`} />
          </g>
        </svg>
      </div>
    )
  }
}
