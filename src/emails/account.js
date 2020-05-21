const sgMail = require('@sendgrid/mail')
const sendGridKey = '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'
sgMail.setApiKey(sendGridKey)
const welcome = (email,name)=>{
sgMail.send({
    from:'hatemmostafa31@gmail.com',
    to:email,
    subject:'welcome to our family',
    text:`welcome to the app, ${name}, let me know how you get along with the app`
})
}
const goodbye = (email,name)=>{
    sgMail.send({
        from:'hatemmostafa31@gmail.com',
        to:email,
        subject:'we are very sorry that you left us',
        text:`good bye , ${name}, is there any thing could have done to keep you on board`
    })
}
module.exports={
    welcome,
    goodbye
}
