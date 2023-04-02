function Input ({ handleChange }) {
    return (
        <>
            Find countries: <input onChange={e => handleChange
            (e)} />
        </>
    )
}

export default Input