const getUserInfo = async ()=>{
    const response = await fetch('http://localhost:3001/api/sessions/check', {
        method: 'GET',
        headers: {
            'Content-Type': 'Application/json'
        },
        credentials: 'include'
    })
    if(response.ok){
        const user = await response.json();
        return user
    }
}


const loginUser = async (credentials) => {
    const  response = await fetch('http://localhost:3001/api/sessions', {
        method: 'POST',
        headers: {
            'Content-Type': 'Application/json'
        },
        credentials: 'include',
        body: JSON.stringify(credentials)
    })
    if(response.ok){
        const user = await response.json();
        return user
    }
    else{
        try {
            const error = await response.text();
            throw error
        } catch (error) {
            throw error
        }

    }

}

const getRange = async ()=>{
    const response = await fetch('http://localhost:3001/api/ranges', {
        method: 'GET',
        headers: {
            'Content-Type': 'Application/json'
        },
        credentials: 'include',
    })
    if(response.ok){
        const range = await response.json();
        const parsedMap = range.map(value=>value.split('').map(cell=>parseInt(cell)))
        console.log(parsedMap)
        return parsedMap
    }
}

const updateRangeRow = async (rowNumber, row)=>{
    console.log(rowNumber, row)
    const response = await fetch('http://localhost:3001/api/ranges/update', {
        method: 'POST',
        headers: {
            'Content-Type': 'Application/json'
        },
        credentials: 'include',
        body: JSON.stringify({
            "rowNumber": rowNumber,
            "row": row
        })
    })
    if(response.ok){
        const result = await response.json();
        console.log(result)
        return true
    }
    return false
}

export {loginUser,getUserInfo, getRange, updateRangeRow}