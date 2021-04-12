import {AnimatePresence, motion} from 'framer-motion'
import React, {FC} from 'react'
import {photosType, ProfileType} from '../../Api/socialNetworkApi'
import avatar from '../../assets/—Pngtree—white collar black and white_5434767.png'
import style from './profile.module.css'

type ownProps = {
    profile: ProfileType<photosType> & { status: string }
}

const PresentationalProfile: FC<ownProps> = ({profile}) => {

    return (
        <div className={style.wrapProfile}>
            <div

                className={style.wrapAvatar}>
                <img src={avatar} alt="" className={style.largeAvatar}/>
            </div>

            <div className={style.wrapContent}
            >
                <div>
                    <h1 className={style.name}>{profile.fullName}</h1>
                    <div className={style.status}>{profile.status}</div>
                </div>

                <div>
                    <p className={style.aboutMe}>{profile.aboutMe}</p>
                </div>
            </div>

        </div>
    )
}

export default PresentationalProfile