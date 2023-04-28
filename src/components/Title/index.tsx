import React from 'react'
import {IoIosRadio as LiveIcon} from 'react-icons/io'
import {getCurrentDate} from '../../common/current_date'
import {getCurrentTime} from '../../common/current_time'

interface Props {
  title: string
  live: boolean
}

import './styles.css'

export const Title: React.FC<Props> = ({title, live}) => {
  return (
    <header className="header">
      <h1 className="title">{title}</h1>
      <div className="status">
        {live && (
          <span className="live">
            Ao vivo <LiveIcon color="red" />{' '}
          </span>
        )}
        <label className="todayis">
          {getCurrentDate()} às {getCurrentTime()}h
        </label>
      </div>
    </header>
  )
}
