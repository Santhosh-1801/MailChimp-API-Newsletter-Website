const express=require('express')
const bodyParser=require('body-parser')
const request=require("request")

const app=express()
app.use(express.static("public"))
app.use(bodyParser.urlencoded({extended:true}))
app.get("/",function(request,response){
    response.sendFile(__dirname+"/signup.html")
})
app.post("/",function(request,res){
    const firstname=request.body.firstname
    const lastname=request.body.lastname
    const email=request.body.email
    const https=require('https')
    
    var data={
        members:[
            {
                email_address:email,
                status:"subscribed",
                merge_fields:{
                    FNAME:firstname,
                    LNAME:lastname
                }
            }
        ]
    }
    const jsonData=JSON.stringify(data);
    const url="https://us8.api.mailchimp.com/3.0/lists/ee5ee43305"

    const options={
        method:"POST",
        auth:"angela1:909a253c2e3b3c5806037e0fbc983a6f-us8"
    }
    const req=https.request(url,options,function(response){
        if(response.statusCode==200){
            res.sendFile(__dirname+"/success.html")
        }
        else {
            res.sendFile(__dirname+"/failure.html")
        }
           response.on("data",function(data){
            console.log(JSON.parse(data))
           })

    })
    req.write(jsonData)
    req.end()
})
app.listen(3000,function(){
    console.log("Server has started")
})
//API key
//909a253c2e3b3c5806037e0fbc983a6f-us8
//List ID
//ee5ee43305