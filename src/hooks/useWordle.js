
import { useState } from "react"

const useWordle=(solution)=>{

    const [turn,setTurn]=useState(0)
    const [currentGuess,setCurrentGuess]=useState('')
    const [guesses,setGuesses]=useState([...Array(6)]) //array of letters of the current word
    const [history,setHistory]=useState([]) //array of words as guesses
    const [isCorrect,setIsCorrect]=useState(false)
    const [usedKeys,setUsedKeys]=useState({})

    const formatGuess=()=>{
        console.log(solution)
        let solutionArray=[...solution]
        let formatedGuess=[...currentGuess].map((letter)=>{
            return {key: letter,color:'grey'}
        })

        //green letters
        formatedGuess.forEach((letter,index)=>{
            if (solutionArray[index]===letter.key){
                formatedGuess[index].color='green'
                //to not check the same one again
                solutionArray[index]=null
            }
        })
        //yellow letters
        formatedGuess.forEach((letter,index)=>{
            if (solutionArray.includes(letter.key) && letter.color!=='green'){
                formatedGuess[index].color='yellow'
                solutionArray[solutionArray.indexOf(letter.key)]=null
            }
        })

        return formatedGuess

    }

    const addNewGuess=(fromattedGuess)=>{
        if (currentGuess===solution){
            setIsCorrect(true)
        }

        setGuesses((prev)=>{
            let newGuesses=[...prev]
            newGuesses[turn]=fromattedGuess
            return newGuesses
        })
        setHistory((prev)=>{
            return [...prev,currentGuess]
        })
        setTurn((prev)=>{
            return prev+1
        })
        setUsedKeys((prev)=>{
            let newKeys={...prev}
            fromattedGuess.forEach((l)=>{
                const currentColor=newKeys[l.key]
                if (l.color==='green'){
                    newKeys[l.key]='green'
                    return
                }
                if (l.color==='yellow' && currentColor!=='green'){
                    newKeys[l.key]='yellow'
                    return
                }
                if (l.color==='grey'&&currentColor!=='green' && currentColor!=='yellow'){
                    newKeys[l.key]='grey'
                    return 
                }
            })
            return newKeys
        })
        setCurrentGuess('')


 
    }

    const handleKeyup=({key})=>{
        if (key==='Enter'){
            if (turn>5){
                console.log("all gueses used up")
                return
            }
            if (history.includes(currentGuess)){
                console.log('you already tried that word')
                return
            }
            if (currentGuess.length!==5){
                console.log('word must be 5 chars long')
                return
            }
            const formatted=formatGuess()
            console.log(formatted)
            addNewGuess(formatted)
        }
        if (key==='Backspace'){
            setCurrentGuess((prev)=>{
                return prev.slice(0,-1)
            })
        }
        if (/^[A-Za-z]$/.test(key)){
             if (currentGuess.length<5){
                setCurrentGuess((prev)=>{
                    return prev + key
                })
             }
        }

    }

    return {turn,currentGuess,guesses,isCorrect,handleKeyup, usedKeys}
}

export default useWordle