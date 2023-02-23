const redis = require('redis')
const bcrypt = require('bcrypt')

const getUser = async (username, password)=>{

    const client = redis.createClient({
        url: 'redis://localhost:6379'
    });
    client.on('error', err => console.log('Redis Client Error', err));
    await client.connect();

    const user = await client.HGETALL(`user:${username}`)
    return new Promise((resolve,reject)=>{
        if(user != null){
            bcrypt.compare(password, user.password).then(result=>{
                if(result){
                    resolve(username)
                }
                else
                    resolve(false)
            })
        }
        else{
            reject("400 - Username does not exist")
        }
    })
}

const getUsername = async (username) =>{

    const client = redis.createClient({
        url: 'redis://localhost:6379'
    });
    client.on('error', err => console.log('Redis Client Error', err));
    await client.connect();

    const user = await client.HGETALL(`user:${username}`)
    return new Promise((resolve,reject)=>{
        if(user != null){
            resolve(username)
        }
        else{
            reject("400 - Username does not exist")
        }
    })
}

const getRange = async (username) =>{
    const client = redis.createClient({
        url: 'redis://localhost:6379'
    });
    client.on('error', err => console.log('Redis Client Error', err));
    await client.connect();

    const exists = await client.LLEN(`matrix:${username}`)
    if(exists==0){
        const pushResult = await client.LPUSH(`matrix:${username}`,["0000000000000","0000000000000","0000000000000","0000000000000","0000000000000","0000000000000","0000000000000","0000000000000","0000000000000","0000000000000","0000000000000","0000000000000","0000000000000"] )
        if(pushResult <= 0)
            reject("500 - interal server error")
    }

    const matrix = await client.LRANGE(`matrix:${username}`, 0, 13)
    return new Promise((resolve,reject)=>{
        if(matrix != null){
            resolve(matrix)
        }
        else{
            reject("500 - interal server error")
        }
    })
}

const updateRange = async (username, rowNumber, row) =>{

    const client = redis.createClient({
        url: 'redis://localhost:6379'
    });
    client.on('error', err => console.log('Redis Client Error', err));
    await client.connect();
    const result = await client.LSET(`matrix:${username}`, rowNumber, row)
    return new Promise((resolve,reject)=>{
        if(result != null){
            resolve(result)
        }
        else{
            reject("500 - interal server error")
        }
    })
}


module.exports = { getUser, getUsername, getRange, updateRange };