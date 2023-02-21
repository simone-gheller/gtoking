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

export {loginUser,getUserInfo}