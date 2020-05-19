if(!localStorage.getItem('token')){
    location.replace('/')
}else{
    axios.get('/tasks',{
        headers:{
            Authorization:`Bearer ${localStorage.getItem('token')}`
        }
    }).then(r=>{
        r.data.forEach(task => {
            let done = task.completed?'done':'notDone'
            let taskState = task.completed?'completed':'incompleted'
            let btnClass = task.completed?'btn-success':'btn-danger'
            $('.tasks').append(taskMarkUp(task.desc,task._id,done,btnClass,taskState));  
        })
        if($('.task').length > 0){
            $('.noTasks').hide()
        }
        $('#loadingScreen').fadeOut()
    })
}

if($('.task').length > 0){
    $('.noTasks').hide()
}
let taskMarkUp = (desc,id,done,btnClass,taskState)=>{
    return ` <li class="task row">
    <div class="taskDescDiv col-lg-6 col-xs-12">
        <p class="taskDesc ${done}">${desc}</p>
    </div>
    <div class="col-lg-6 col-xs-12">
        <ul class="actions row" data-id="${id}">
        <li class="action col-xs-4"><button class='btn btn-primary editTask'>edit</button></li>
        <li class="action ${taskState} col-xs-4"><button class='btn ${btnClass}'>${taskState}</button></li>
        <li class="action col-xs-4"><button class='btn btn-danger removeTask'>delete</button></li>
        </ul>
    </div>
</li>`
}

$('.addTaskForm').submit(function(e){
    e.preventDefault()
    if($('.addTaskInput').val().length > 1){
axios.post('/tasks',
{desc:$('.addTaskInput').val()},{
headers:{
Authorization:`Bearer ${localStorage.getItem('token')}`
}
}).then(r=>{
let done = r.data.completed?'done':'notDone'
let taskState = r.data.completed?'completed':'incompleted'
let btnClass = r.data.completed?'btn-success':'btn-danger'
$('.noTasks').hide()
$('.tasks').append(taskMarkUp(r.data.desc,r.data._id,done,btnClass,taskState)); 
$('.addTaskInput').val('')
}).catch(e=>{
})
}
})
$('body').on('click','.removeTask', function () {
    const id = $(this).parent().parent().attr('data-id')
    axios.delete(`/tasks/${id}`, {
        headers: {
          Authorization:`Bearer ${localStorage.getItem('token')}`
        },
        data: {
        }
      }).then(r=>{
        $(this).parent().parent().parent().parent().remove()
        if($('.task').length <= 0){
            $('.noTasks').show()
        }
    })   
})
$('body').on('click','.incompleted button,.completed button', function () {
    $(this).parent().toggleClass('incompleted completed')
    $(this).toggleClass('btn-danger btn-success')
    $('.done,.notDone').toggleClass('done notDone')
    $('.incompleted button').text('incompleted')
    $('.completed button').text('completed')
})
$('body').on('click','.completed button', function () {
    let id = $(this).parent().parent().attr('data-id')
    axios.patch(`/tasks/${id}`, 
{
    completed:false
},
{
headers: {
    Authorization:`Bearer ${localStorage.getItem('token')}`
}
}
).then(r=>{
})
})
$('body').on('click','.incompleted button', function () {
    let id = $(this).parent().parent().attr('data-id')
    axios.patch(`/tasks/${id}`, 
{
    completed:true
},
{
headers: {
    Authorization:`Bearer ${localStorage.getItem('token')}`
}
}).then(r=>{
})
})
$('body').on('click','.editTask', function () {
const taskDesc = $(this).parent().parent().parent().siblings().children()
const taskOrginalVal = taskDesc.text()
taskDesc.replaceWith(`<input class='editTaskInput' 
type='text' value='${taskOrginalVal}' data-id='${taskDesc.attr('data-id')}'>`)
$(".editTaskInput").focus()
})
$('body').on('blur','.editTaskInput', function () {
    const editedVal = $(this).val()
    const id = $(this).parent().siblings().children().attr('data-id')
    axios.patch(`/tasks/${id}`, 
    {
        desc:editedVal
    },
    {
    headers: {
        Authorization:`Bearer ${localStorage.getItem('token')}`
    }
    }).then(r=>{
            const done = r.data.completed?'done':'notDone'
            $(this).replaceWith(`<p class="taskDesc ${done}" data-id="${id}">${editedVal}</p>`)
    })
})
$('.confirmLogOut').on('click',function(){
axios.post('/users/logout',{},{
        headers:{
            Authorization:`Bearer ${localStorage.getItem('token')}`
        }
}).then(r=>{
    location.replace('/')
    localStorage.removeItem('token')
})
})