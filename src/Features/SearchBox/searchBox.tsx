import {Formik} from 'formik'
import React, {FC} from 'react'
import {SearchOutlined} from "@ant-design/icons";
import Input from '../../Components/Input/Input';

type ownProps = {
    submit: (term: string) => void
}

const SearchBox: FC<ownProps> = ({submit}) => {

    return (
        <Formik initialValues={{searchInputValue: ''}} onSubmit={values => {
            submit(values.searchInputValue)
        }}>
            {
                ({values, handleSubmit, handleChange}) => (
                    <form>
                        <Input name="searchInputValue"
                               placeholder='Search'
                               value={values.searchInputValue}
                               handleChange={handleChange}
                        />
                        <span onClick={() => {
                            handleSubmit()
                        }}>
                            <SearchOutlined/>
                        </span>
                    </form>
                )
            }
        </Formik>
    )
}

export default SearchBox