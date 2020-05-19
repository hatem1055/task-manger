if(localStorage.getItem('token')){
    location.replace('/tasks.html')
}
$('.toggler').click(function (){
if($(this).attr('data-show') == 'sign-up'){
$('.log-in').fadeOut(1000,_=>{
    $('.sign-up').fadeIn(1000)
    $(this).text('log in')
    $(this).attr('data-show','log-in')
    $('.welcome').text('welcome back')
    $('.message').text('to keep concted up please login with your personal info')
})
}else{
    $('.sign-up').fadeOut(1000,_=>{
        $('.log-in').fadeIn(1000)
        $(this).text('sign up')
        $(this).attr('data-show','sign-up')
        $('.welcome').text('hello,friend')
        $('.message').text('enter your personal details and start journy with us')
    }) 
}
})
// localStorage.removeItem('token')
// if(localStorage.getItem('token')){
//     location.replace('login.html')
// }
$('.close').click(function(){
    $('.alert').fadeOut()
})
