// import HomeMain from '../components/HomeMain/Home'
// import { readDirectory } from '../utils/index'
// import path from 'node:path'
// const srcDirectory = path.join(process.cwd(), 'src', 'mdx')
// //
// type Directory = {
//   label: string
//   key: string
//   children: {
//     label: string
//     key: string
//   }
// }

// export default async  ()=> {
//  const list:any =  await readDirectory(srcDirectory)
//  console.log(list)

//   return (
//       <HomeMain list={list} ></HomeMain>

//   )
// }

'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useRef } from 'react'
import Typed from 'typed.js'
import { bindHandleScroll, removeScroll } from '@utils/elementUtils'
import { scrollTo } from '@utils/element'
import SysIcon from '@components/SysIcon'
import bgImgLight from '@static/images/bg00005.jpeg'
import { timeAixsList } from '@utils/dict'
import { loadingImag } from '@utils/dataImage'
import styles from '@styles/home.module.css'

export default function Home() {
  const typeTarget = useRef<any>(null)
  const aboutDom = useRef<any>(null)

  const goAbout = () => {
    const aboutTop = aboutDom.current.offsetTop
    scrollTo(aboutTop, {
      getContainer: () => document.body || window
    })
  }

  useEffect(() => {
    bindHandleScroll()
    const typed = new Typed(typeTarget.current, {
      strings: [
        '浮世三千，吾爱有三，日月与卿，日为朝，月为暮，卿为朝朝暮暮',
        'I love three things in this world. Sun,',
        ' moon and you. Sun for morning, moon for night , ',
        'and you forever'
      ],
      typeSpeed: 60,
      backSpeed: 40,
      loop: true,
      loopCount: Infinity,
      autoInsertCss: false,
      backDelay: 2000,
      showCursor: false
    })

    return () => {
      removeScroll()
      typed.destroy()
    }
  }, [])

  return (
    <div className={styles.home}>
      <div className={styles.bg_mask} id="bg_mask" />
      <div className={styles.bg_content}>
        <div className={styles.title}>吾爱有三</div>
        <div className={styles.description_box}>
          <div className={styles.description} ref={typeTarget} />
        </div>
        <div className={styles.jiantou}>
          <SysIcon className={styles.jiantou_icon} type="icon-a-jiantou-xia" onClick={goAbout} />
        </div>
      </div>
      <div className={styles.page_box} ref={aboutDom}>
        <div className={styles.page_title}>GROWTH ABILITY</div>
        <div className={styles.page_desc}>博客项目更多功能入口</div>
        <div className={styles.page_list}>
          <div className={styles.page_item}>
            <Image
              className={styles.page_item_bg}
              width={2000}
              height={1320}
              src={'https://api-render.wp-boke.work/picture/daily-bing?is_redirect=true'}
              alt="必应每日壁纸"
              placeholder="blur"
              blurDataURL={loadingImag}
              priority={true}
            />
            <Link className={styles.page_item_link} href="/wallpaper">
              壁 纸
            </Link>
          </div>
          <div className={styles.page_item}>
            <Image
              className={styles.page_item_bg}
              width={2000}
              height={1320}
              src={'https://images.pexels.com/photos/518543/pexels-photo-518543.jpeg'}
              alt="热点"
              placeholder="blur"
              blurDataURL={loadingImag}
              priority={true}
            />
            <Link className={styles.page_item_link} href="/news">
              热 点
            </Link>
          </div>
        </div>
      </div>
      <div className={styles.timeAixs_box}>
       <div className={styles.timeAixs_title}>GROWTH RECORD</div>
        <div className={styles.timeAixs_desc}>「 左右滑动查看 」</div>
        <div className={styles.timeAixs}>
          <div className={styles.timeAixs_left} />
          <div className={styles.timeAixs_content}>
            {timeAixsList?.map((v) => (
              <div className={styles.timeAixs_item} key={v.id}>
                <div className={styles.timeAixs_item_time}>{v.time}</div>
                <div className={styles.timeAixs_item_title}>{v.title}</div>
              </div>
            ))}
            <div className={styles.timeAixs_item}>
              <div className={styles.timeAixs_item_desc}>GROWING...</div>
              <div className={styles.timeAixs_item_desc}>COMING SOON</div>
            </div>
          </div>
          <div className={styles.timeAixs_right} />
        </div>
      </div> 
    </div>
  )
}
