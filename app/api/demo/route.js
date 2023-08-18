import tabledata from '@tabledata.json'

function ReturnPromise(){
        return new Promise((resolve, reject)=>{
            resolve(tabledata) 
            reject(`ERROR, can't get data`)
        })
}

export const GET = async (request)=>{
    try {
        const response = await ReturnPromise();

        return new Response(JSON.stringify(response), { status : 200 })
    } catch (error) {
        return new Response(error, { status : 500 })
    }
}

export const POST = async (request)=>{
    console.log('put request hit')
    try {
        await students.push(request)
    } catch (error) {
        return new Response(error, { status : 502 })
    }
}