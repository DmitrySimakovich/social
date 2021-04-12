import React, {ChangeEvent, FC} from "react";
import style from './input.module.css'

type ownProps = {
    name: string
    placeholder: string
    value?: string
    checked?: boolean
    handleChange: (e: ChangeEvent<any>) => void
    onBlur?: (e: React.FocusEvent<any>)=> void
    error?: boolean
}

const Input: FC<ownProps> = ({name, placeholder, value, handleChange, onBlur, error}) => {
    return (
            <input type='text'
                   name={name}
                   placeholder={placeholder}
                   value={value}
                   onChange={handleChange}
                   className={`${style.wrapInput} ${error ? style.errorInputIndicator : null}`} onBlur={onBlur}/>
                   // className={style.wrapInput } onBlur={onBlur}/>
    )
}

export default Input