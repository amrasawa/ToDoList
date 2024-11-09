async function ToDos(){
    let response =await fetch("https://dummyjson.com/todos");
    let data=await response.json();
    //console.log(data.todos);
    let result =data.todos.map((task)=>{
        
    })
}
ToDos();