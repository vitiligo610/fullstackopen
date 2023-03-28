import { useState } from "react"

const StatisticsLine = ({ name, value }) => {
    return (
        <tr>
            <td>{name}</td>
            <td>{value}</td> 
        </tr>
    )
}

const Statistics = ({ good, neutral, bad, all, average, positive }) => {
    return (
        <table>
            <tbody>
                {
                    (good === 0 && neutral === 0 && bad === 0) ?
                        <StatisticsLine name = "No feedback given" /> : 
                        (
                            <>
                                <StatisticsLine name = "good" value = {good} />
                                <StatisticsLine name = "neutral" value = {neutral} />
                                <StatisticsLine name = "bad" value = {bad} />
                                <StatisticsLine name = "all" value = {all} />
                                <StatisticsLine name = "average" value = {average} />
                                <StatisticsLine name = "positive" value = {positive + "%"} />
                            </>
                        )
                }
            </tbody>
        </table>
    )
}

const App = () => {

    const [good, setGood] = useState(0)
    const [neutral, setNeutral] = useState(0)
    const [bad, setBad] = useState(0)

    const handleGoodClick = () => {
        setGood(good + 1)
    }

    const handleNeutralClick = () => {
        setNeutral(neutral + 1)
    }

    const handleBadClick = () => {
        setBad(bad + 1)
    }

    const all = good + neutral + bad
    const average = (all / 3).toFixed(1)
    const positive = ((good / all) * 100).toFixed(1)

    return (
        <div>
            <h1>give feedback</h1>
            <button onClick = {handleGoodClick}>good</button> 
            <button onClick = {handleNeutralClick}>neutral</button>
            <button onClick = {handleBadClick}>bad</button>
            <h2>statistics</h2>
            <Statistics
                good = {good}
                neutral = {neutral}
                bad = {bad}
                all = {all}
                average = {average}
                positive = {positive}
            />
            
        </div>
    )
}

export default App
