const Header = ({ name }) => {
    return (
        <h2>{name}</h2>
    )
}

const Part = ({ part, exercises }) => {
    return (
        <p>
            {part} {exercises}
        </p>
    )
}

const Content = ({ parts }) => {
    return (
        <>
            {
                parts.map((part, idx) => (
                    <Part
                        key={idx}
                        part={parts[idx].name}
                        exercises={parts[idx].exercises}
                    />
                ))
            }
        </>
    )
}

const Total = ({ parts }) => {
    const allExercises = parts.map(p => p.exercises)
    const total = allExercises.reduce((s, p) => s + p, 0)
    return (
        <p><b>total of {total} exercises</b></p>
    )
}

const Course = ({ name, parts }) => {
    return (
        <>
            <Header name={name} />
            <Content parts={parts} />
            <Total parts={parts} />
        </>
    )
}

export default Course