import { useState } from "react"

const App = () => {

    const [ clicks, setClicks ] = useState({
        good: 0,
        neutral: 0,
        bad: 0
    })

    const handleGoodClick = () => {
        setClicks({
            ...clicks,
            good: clicks.good + 1
        })
    }

    const handleNeutralClick = () => {
        setClicks({
            ...clicks,
            neutral: clicks.neutral + 1
        })
    }

    const handleBadClick = () => {
        setClicks({
            ...clicks,
            bad: clicks.bad + 1
        })
    }

    const all = clicks.good + clicks.neutral + clicks.bad
    const average = (all / 3)
    const positive = (clicks.good / all) * 100

    return (
        <div>
            <h1>give feedback</h1>
            <button onClick = {handleGoodClick}>good</button> 
            <button onClick = {handleNeutralClick}>neutral</button>
            <button onClick = {handleBadClick}>bad</button>
            <h2>statistics</h2>
            <table>
                <tbody>
                <tr>
                    <td>good</td>
                    <td>{clicks.good}</td>
                </tr>
                <tr>
                    <td>neutral</td>
                    <td>{clicks.neutral}</td>
                </tr>
                <tr>
                    <td>bad</td>
                    <td>{clicks.bad}</td>
                </tr>
                <tr>
                    <td>all</td>
                    <td>{all}</td>
                </tr>
                <tr>
                    <td>average</td>
                    <td>{average.toFixed(1)}</td>
                </tr>
                <tr>
                    <td>positive</td>
                    <td>{isNaN(positive) ? 0 : positive.toFixed(1)}%</td>
                </tr>
                </tbody>
            </table>
        </div>
    )
}

export default App
