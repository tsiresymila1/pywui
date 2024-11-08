import { useCallback, useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

import { emit, invoke, listen } from '@pywui/app'

function App() {
    const [count, setCount] = useState(0)
    const [data, setData] = useState<string | undefined>()
    const [time, setTime] = useState<string | undefined>("")
    const getData = useCallback(async () => {
        const result = await invoke<string>('greet')
        console.log(result)
        setData(result)
    }, [])

    useEffect(() => {
        console.log(window.pywebview)
        const unlisten = listen<string>("time", function (type, data) {
            setTime(data)
        })
        return () => unlisten()
    }, [])

    useEffect(() => {
        console.log(window.pywebview)
        const unlisten = listen<string>("message", function (type, data) {
            setData(data)
        })
        return () => unlisten()
    }, [])

    useEffect(() => {
        const interval = setInterval(async () => {
            await emit<string>("message", Date.now().toString())
        }, 1000)
        return () => clearInterval(interval)
    }, [])
    return (
        <>
            <div>
                <a href="https://vite.dev" target="_blank">
                    <img src={viteLogo} className="logo" alt="Vite logo"/>
                </a>
                <a href="https://react.dev" target="_blank">
                    <img src={reactLogo} className="logo react" alt="React logo"/>
                </a>
            </div>
            <h1>Vite + React</h1>
            <div className="card">
                <button onClick={() => setCount((count) => count + 1)}>
                    count is {count}
                </button>
                <button onClick={getData}>
                    Get data {data}
                </button>
                <p>
                    Time: {time}
                </p>
            </div>
            <p className="read-the-docs">
                Click on the Vite and React logos to learn more
            </p>
        </>
    )
}

export default App
