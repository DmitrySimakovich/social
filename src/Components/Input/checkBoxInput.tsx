import React, {ChangeEvent, FC} from "react";
import style from './input.module.css'

type ownProps = {
    onChange: (e: ChangeEvent<any>) => void
    name: string
    placeholder: string
    checked: boolean
}
const CheckBoxInput: FC<ownProps> = ({name, placeholder, checked, onChange}) => {

    return (
        <input type='checkbox'
               className={style.checkBox}
               name={name}
               placeholder={placeholder}
               checked={checked}
               onChange={onChange}
        />
    )
}

export default CheckBoxInput