'use client'
import React, { FC, useEffect, useState } from 'react'
import styles from './footer.module.css'
import moment from 'moment'
interface MyComponentProps {
  title: string
  className: string
}

const Header: FC<MyComponentProps> = ({ title, className }) => {
  const TimeDisplay = () =>{
    const [timeStr, setTimeStr] = React.useState('')

    useEffect(() => {
      const interval = setInterval(() => {
        const now = new Date()
        const targetTime = new Date('2024-04-11T00:00:00')
        let diffTime = targetTime.getTime() - now.getTime()

        let prefix = '距离'
        if (diffTime < 0) {
          diffTime = -diffTime
          prefix = '已运行'
        }

        const days = Math.floor(diffTime / (24 * 3600 * 1000))
        const hours = Math.floor((diffTime % (24 * 3600 * 1000)) / (3600 * 1000))
        const minutes = Math.floor((diffTime % (3600 * 1000)) / (60 * 1000))
        const seconds = Math.floor((diffTime % (60 * 1000)) / 1000)
        const newTimeStr = `${prefix} ${days} 天 ${hours} 小时 ${minutes} 分钟 ${seconds} 秒`
        setTimeStr(newTimeStr)
      }, 1000)

      return () => clearInterval(interval) // 清除定时器，防止内存泄漏
    }, []) // 空数组作为依赖项，确保 effect 只运行一次（组件挂载时）

    return timeStr
  }

  return (
    <footer className={className}>
      朝阳 ©{new Date().getFullYear()} 博客{TimeDisplay()}
    </footer>
  )
}

export default Header
