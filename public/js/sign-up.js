$('.sign-up form').submit(function(e){
    e.preventDefault()
    let password = $('.sign-up .password').val()
    let conformPassword = $('.sign-up .password-confirm').val()
    let name = $('.sign-up .name').val()
    let email = $('.sign-up .email').val()
if(password == conformPassword){
axios.post('/users',{
        password,
        email,
        name
}).then(r=>{
    localStorage.setItem('token',r.data.token)
    location.replace('/tasks.html')
}).catch(error=>{
    let errors = []
    if( error.response ){
        if(typeof error.response.data.errors != "undefined"){
            if(typeof error.response.data.errors.email != "undefined"){
                if(error.response.data.errors.email.message =='unvalid email'){
                    errors.push('email is invaild')
                }
                if(error.response.data.errors.email.message =='Path `email` is required.'){
                    errors.push('the email is requred')
                }
            }
            if(typeof error.response.data.errors.password != "undefined"){
                if(error.response.data.errors.password.message =='the pass word must be more than 6 chars'){
                    errors.push('the password must be more than 6 chars')
                }
                if(error.response.data.errors.password.message =='Path `password` is required.'){
                    errors.push('the password is requred')
                }
            }
            if(typeof error.response.data.errors.name != "undefined"){
                if(error.response.data.errors.name.message =='Path `name` is required.'){
                    errors.push('the name is requred')
                }
            }
        }
        if(error.response.data.code == 11000){
            errors.push('email is already used')
        }
    }
    $('.alert').fadeIn()
    $('.error').text(errors.join(' and '))
})
}else{
    $('.alert').fadeIn()
    $('.error').text('password isnt matching')
}
})