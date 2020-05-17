const sgMail = require('@sendgrid/mail')
const sendGridKey = process.env.SENDGRID_API_KEY
sgMail.setApiKey(sendGridKey)
const welcome = (email,name)=>{
sgMail.send({
    from:'hatemmostafa31@gmail.com',
    to:email,
    subject:'welcome to our family',
    text:`welcome to the app, ${name}, let me know how you get along with the app`
}).then(_=>{
    console.log('message send')
}).catch(e=>{
    console.log(e.response.body)
})  
}
const goodbye = (email,name)=>{
    sgMail.send({
        from:'hatemmostafa31@gmail.com',
        to:email,
        subject:'we are very sorry that you left us',
        text:`good bye , ${name}, is there any thing could have done to keep you on board`
    }).then(_=>{
        console.log('message send')
    }).catch(e=>{
        console.log(e.response.body)
    }) 
}
module.exports={
    welcome,
    goodbye
}
