async function dataUserPostCount(){
    //pobierz posty
    const postsResponse= await fetch('https://jsonplaceholder.typicode.com/posts');
    const posts = await postsResponse.json();
    
    //Pobierz liczbe użytkowników
    const users= await fetch('https://jsonplaceholder.typicode.com/users');
    const userCount = await users.json();
    //każda pozycja w array to odpowiednik userID - 1
    //czyli userID 1 to pozycja array 0 itd.
    var userCountArray = [];
    console.log("Liczba użytkowników: " + userCount.length);
    //policz ilość postów na użytkownika
    for(let userID = 1; userID <= userCount.length; userID++){
        const userPosts = posts.filter(
            post => post.userId === userID
        );
        userCountArray.push(userPosts.length);
    }
    
    var usersCountDoc =document.getElementById("htmlUserCount");
    usersCountDoc.innerHTML="Liczba użytkowników na stronie: "+userCount.length;
    
    //pokaż ilości postów na chart
    const ctxHtmlPostCount = document.getElementById('htmlPostCount');
    const myChart = new Chart(htmlPostCount, {
        type: 'bar',
        data: {
            labels: [],
            datasets: [{
                label: 'Liczba postów',
                data: []
            }]
        }
    });
    for(userID = 1; userID<=userCountArray.length;userID++){
        myChart.data.labels.push("Użytkownik " + userID);
        myChart.data.datasets[0].data.push(userCountArray[userID-1]);
    }
    myChart.update();
}
async function dataToDoTasksDone(){
    //pobierz taski
    const todosResponse= await fetch('https://jsonplaceholder.typicode.com/todos');
    const todos = await todosResponse.json();
    //Pobierz liczbe użytkowników
    const users= await fetch('https://jsonplaceholder.typicode.com/users');
    const userCount = await users.json();
    
    var userCountArray = [];
    
    //policz ilość postów na użytkownika
    for(let userID = 1; userID <= userCount.length; userID++){
        const userTasks = todos.filter(
            todo => todo.userId === userID
        );
        userCountArray.push(userTasks.length);
    }
    
    //pokaż ilości postów na chart
    const ctxhtmlTodoTasks = document.getElementById('htmlTodoTasks');
    const myChart = new Chart(htmlTodoTasks, {
        type: 'bar',
        data: {
            labels: [],
            datasets: [{
                label: 'Liczba zrobionych tasków',
                data: []
            }]
        }
    });
    for(userID = 1; userID<=userCountArray.length;userID++){
        myChart.data.labels.push("Użytkownik " + userID);
        myChart.data.datasets[0].data.push(userCountArray[userID-1]);
    }
    myChart.update();
}
async function dataCountComments(){
    //pobierz komentarze
    const commentsResponse = await fetch('https://jsonplaceholder.typicode.com/comments');
    const comments = await commentsResponse.json();
    
    //pobierz posty
    const postsResponse= await fetch('https://jsonplaceholder.typicode.com/posts');
    const posts = await postsResponse.json();
    
    //podobnie co wyżej
    var commentsPerPost = [];
    //policz ilość komentarzy na post
    for(let postID = 1; postID <= posts.length; postID++){
        const liczbaKomentarzy = comments.filter(
            post => post.postId === postID
        );
        commentsPerPost.push(liczbaKomentarzy.length);
    } 
    //pokaż ilości postów na chart
    const ctxhtmlShowCommentCount = document.getElementById('htmlShowCommentCount');
    const myChart = new Chart(htmlShowCommentCount, {
        type: 'bar',
        data: {
            labels: [],
            datasets: [{
                label: 'Liczba Komentarzy',
                data: []
            }]
        }
    });
    for(commentID = 1; commentID<=commentsPerPost.length;commentID++){
        myChart.data.labels.push("Post " + commentID);
        myChart.data.datasets[0].data.push(commentsPerPost[commentID-1]);
    }
    myChart.update();
    console.log(commentsPerPost);

    //oblicz średnią
    const srednia = comments.length/posts.length;
    
    //dodaj na strone
    const htmlCommentAverage = document.getElementById('htmlCommentAverage');
    htmlCommentAverage.innerHTML = "Średnia liczba komentarzy na post wynosi: "+srednia;
}
//Wywołaj wszystko
dataUserPostCount();
dataToDoTasksDone();
dataCountComments();