
const xhr= new XMLHttpRequest();
xhr.addEventListener('load',()=>{               
    console.log('response received');
    console.log(xhr.response);
})
xhr.open('GET','https://SuperSimplebackend.dev');
xhr.send();     //  takes time to travel to backend  & asynchronous
//xhr.response   ------