$('.log-in form').submit(function(e){
    e.preventDefault()
    let password = $('.log-in .password').val()
    let email = $('.log-in .email').val()
axios.post('/users/login',{
        password,
        email,
}).then(r=>{
    localStorage.setItem('token',r.data.token)
    location.replace('/tasks.html')
}).catch(error=>{
    $('.alert').fadeIn()
    $('.error').text('email or password is wrong')
})
})