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
            $('.tasks').append(taskMarkUp(task.desc,task._id,done));  
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
let taskMarkUp = (desc,id,done)=>{
    return ` <li class="task row">
    <div class="taskDescDiv col-lg-6">
        <p class="taskDesc ${done}" data-id="${id}">${desc}</p>
    </div>
    <div class="col-lg-6">
        <ul class="actions">
            <li class="action"><button class='btn btn-primary editTask'>edit</button></li>
            <li class="action"><button class='btn btn-danger removeTask'>delete</button></li>
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
$('.noTasks').hide()
$('.tasks').append(taskMarkUp($('.addTaskInput').val(),r.data._id,done));
$('.addTaskInput').val('')
}).catch(e=>{
})
}
})
$('body').on('click','.removeTask', function () {
    const id = $(this).parent().parent().parent().siblings().children().attr('data-id')
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
$('body').on('click','.done,.notDone', function () {
    $(this).toggleClass('done notDone')
})
$('body').on('click','.done', function () {
    let id = $(this).attr('data-id')
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
$('body').on('click','.notDone', function () {
    let id = $(this).attr('data-id')
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
    const id = $(this).attr('data-id')
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