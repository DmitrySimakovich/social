import {Formik} from "formik";
import React from "react";
import {profileThunk} from "../Profile/profileReducer";
import {ProfileType} from "../../Api/socialNetworkApi";
import {useDispatch} from "react-redux";
import style from './settings.module.css'
import Input from "../../Components/Input/Input";

type FormikErrorType = {
    fullName?: string
    aboutMe?: string
    lookingForAJob?: string
    lookingForAJobDescription?: string
}

const Settings = () => {

    const initialValues: ProfileType = {
        fullName: '',
        aboutMe: '',
        lookingForAJob: false,
        lookingForAJobDescription: '',

        contacts: {
            github: '',
            vk: '',
            facebook: '',
            instagram: '',
            twitter: '',
            website: '',
            youtube: '',
            mainLink: '',
        },
    }
    const dispatch = useDispatch()

    return (
        <Formik initialValues={initialValues}
                onSubmit={(values) => {
                    console.log(values)
                    dispatch(profileThunk.updateProfile(values))
                }}
                validate={values => {
                    const errors: FormikErrorType = {}
                    if (!values.fullName) {
                        errors.fullName = 'Поле обязательно для заполнения!'
                    }
                    if (!values.aboutMe) {
                        errors.aboutMe = 'Поле обязательно для заполнения!'
                    }
                    if (!values.lookingForAJobDescription) {
                        errors.lookingForAJobDescription = 'Поле обязательно для заполнения!'
                    }
                    return errors
                }}>
            {({
                  values,
                  handleSubmit,
                  handleChange,
                  setFieldValue,
                  errors, handleBlur, touched
              }) => (
                <div className={style.wrapperForm}>
                    <form onSubmit={handleSubmit} className={style.formWrap}>

                        <div className={style.wrapFormContent}>
                            <div className={style.wrapMainInfo}>
                                <h1>Основная информация</h1>
                                <div className={style.mainInfo}>
                                    <div>
                                        <h2>Имя</h2>
                                        <Input value={values.fullName}
                                               placeholder='Как тебя зовут?'
                                               name='fullName'
                                               handleChange={handleChange}
                                               onBlur={handleBlur}
                                               error={errors.fullName && touched.fullName ? true : false}/>
                                        {errors.fullName && touched.fullName ?
                                            <div style={{'color': 'red'}}>{errors.fullName}</div>
                                            : null
                                        }


                                    </div>
                                    <div>
                                        <h2>О себе</h2>
                                        <Input value={values.aboutMe}
                                               name="aboutMe"
                                               placeholder='Расскажи что-нибудь о себе'
                                               handleChange={handleChange}
                                               onBlur={handleBlur}
                                               error={errors.aboutMe && touched.aboutMe ? true : false}/>
                                        {errors.aboutMe && touched.aboutMe ?
                                            <div style={{'color': 'red'}}>{errors.aboutMe}</div>
                                            : null
                                        }
                                    </div>
                                    <div className={style.lookingForAJob}>
                                        <h2>Ищешь работу?</h2>
                                        <label>
                                            <input
                                                className={style.inputLookingForAJob}
                                                type="radio"
                                                name="lookingForAJob"
                                                checked={values.lookingForAJob === true}
                                                onChange={() => setFieldValue("lookingForAJob", true)}
                                            />
                                            <span>Да</span>
                                        </label>

                                        <label>
                                            <input
                                                className={style.inputLookingForAJob}
                                                type="radio"
                                                name="lookingForAJob"
                                                checked={values.lookingForAJob === false}
                                                onChange={() => setFieldValue("lookingForAJob", false)}
                                            />
                                            <span>Нет</span>
                                        </label>
                                    </div>
                                    <div>
                                        <h2>Твои профессиональные навыки:</h2>
                                        <Input name="lookingForAJobDescription"
                                               placeholder='Пару слов о твоих навыках'
                                               value={values.lookingForAJobDescription}
                                               handleChange={handleChange}
                                               onBlur={handleBlur}
                                               error={errors.lookingForAJobDescription && touched.lookingForAJobDescription ? true : false}/>
                                        {errors.lookingForAJobDescription && touched.lookingForAJobDescription ?
                                            <div style={{'color': 'red'}}>{errors.lookingForAJobDescription}</div>
                                            : null
                                        }
                                    </div>
                                </div>
                            </div>

                            <div className={style.wrapContacts}>
                                <h1>Как с тобой связаться?</h1>
                                <div className={style.contacts}>
                                    <div className={style.contactItem}>
                                        <svg height="32"
                                             viewBox="0 0 16 16" width="32" aria-hidden="true">
                                            <path fillRule="evenodd"
                                                  d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"></path>
                                        </svg>
                                        <Input name='contacts.github'
                                               placeholder='github'
                                               value={values.contacts.github}
                                               handleChange={handleChange} onBlur={handleBlur}/>
                                    </div>

                                    <div className={style.contactItem}>
                                        <img height="32" width="32"
                                             src="https://cdn.worldvectorlogo.com/logos/vk-1.svg"
                                             alt=""/>
                                        <Input name='contacts.vk'
                                               placeholder='vk.com'
                                               value={values.contacts.vk}
                                               handleChange={handleChange} onBlur={handleBlur}/>
                                    </div>

                                    <div className={style.contactItem}>
                                        <img height="32" width="32"
                                             src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/fb/Facebook_icon_2013.svg/300px-Facebook_icon_2013.svg.png"
                                             alt=""/>
                                        <Input name='contacts.facebook'
                                               placeholder='facebook'
                                               value={values.contacts.facebook}
                                               handleChange={handleChange} onBlur={handleBlur}/>
                                    </div>

                                    <div className={style.contactItem}>
                                        <img height="32" width="32"
                                             src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e7/Instagram_logo_2016.svg/1200px-Instagram_logo_2016.svg.png"
                                             alt=""/>
                                        <Input name='contacts.instagram'
                                               placeholder='instagram'
                                               value={values.contacts.instagram}
                                               handleChange={handleChange} onBlur={handleBlur}/>
                                    </div>

                                    <div className={style.contactItem}>
                                        <img height="28" width="32"
                                             src="https://seeklogo.com/images/T/twitter-logo-A84FE9258E-seeklogo.com.png"
                                             alt=""/>
                                        <Input name='contacts.twitter'
                                               placeholder='twitter'
                                               value={values.contacts.twitter}
                                               handleChange={handleChange} onBlur={handleBlur}/>
                                    </div>

                                    <div className={style.contactItem}>
                                        <img height="32" width="32"
                                             src="https://www.pinclipart.com/picdir/middle/257-2576819_website-icons-download-for-free-in-png-and.png"
                                             alt=""/>
                                        {/*<input type="text" onChange={handleChange} name="contacts.website"*/}
                                        {/*       placeholder='website'*/}
                                        {/*       value={values.contacts.website}/>*/}

                                        <Input name='contacts.website'
                                               placeholder='website'
                                               value={values.contacts.website}
                                               handleChange={handleChange} onBlur={handleBlur}/>
                                    </div>

                                    <div className={style.contactItem}>
                                        <img height="32" width="32"
                                             src="https://cdn4.iconfinder.com/data/icons/social-media-2210/24/Youtube-512.png"
                                             alt=""/>
                                        {/*<input type="text" onChange={handleChange} name="contacts.youtube"*/}
                                        {/*       placeholder='youtube'*/}
                                        {/*       value={values.contacts.youtube}/>*/}

                                        <Input name='contacts.youtube'
                                               placeholder='youtube'
                                               value={values.contacts.youtube}
                                               handleChange={handleChange} onBlur={handleBlur}/>
                                    </div>

                                    <div className={style.contactItem}>
                                        <img height="32" width="32"
                                             src="https://cdn2.iconfinder.com/data/icons/pittogrammi/142/95-512.png"
                                             alt=""/>
                                        {/*<input type="text" onChange={handleChange} name="contacts.mainLink"*/}
                                        {/*       placeholder='mainLink'*/}
                                        {/*       value={values.contacts.mainLink}/>*/}
                                        <Input name='contacts.mainLink'
                                               placeholder='mainLink'
                                               value={values.contacts.mainLink}
                                               handleChange={handleChange} onBlur={handleBlur}/>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className={style.formSubmit}>
                            <button type="submit">
                                Обновить профиль
                            </button>
                        </div>

                    </form>
                </div>)}
        </Formik>
    )
}

export default Settings