const app = {
    TundraAPIM:"http://griffis.edumedia.ca/mad9022/tundra/get.profiles.php?gender=male",
    TundraAPIF:"http://griffis.edumedia.ca/mad9022/tundra/get.profiles.php?gender=female",
    currentAPI:"http://griffis.edumedia.ca/mad9022/tundra/get.profiles.php?",
    currentData:[],
    currentCard: [],
    likedArray:[],
    imgBaseURL:null,
    likedList:null,
    APP:null, 
    yesOrNo: null,
    keepCardData: null,
    gender:null,
    touch:{
        xstart:null, 
        xend:null, 
        dir:null
    },
    init: ()=>{
        console.log("connect js!")
        app.KEY = "device" in window ? "REVIEW" + device.uuid : "REVIEWTEMPKEY";
        app.fetchData2()
        .then(() => {
            app.createACard()
            })
        .then(() => {
            app.addListeners()
            });
    },
    menOnly:()=>{
        app.currentData = [];
        app.currentAPI = app.TundraAPIM;
        app.fetchData()
        .then(()=>{
            if(app.currentCard.gender == "male"){
                console.log(app.currentData)
                console.log(app.currentCard);
                app.currentData.unshift(app.currentCard);
                console.log(app.currentData)
            }          
            app.createACard()
        })
        .then(()=>{
            app.addListeners()
        })
    },
    womenOnly:()=>{
        // app.gender = "female";
        // app.createACard();
        app.currentData = [];
        app.currentAPI = app.TundraAPIF;
        app.fetchData()
        .then(()=>{
            if(app.currentCard.gender == "female"){
                console.log(app.currentData)
                console.log(app.currentCard);
                app.currentData.unshift(app.currentCard);
                console.log(app.currentData)
            }      
            app.createACard()
        })
        .then(()=>{
            app.addListeners()
        })
    },
    createACard: ()=>{
        app.currentCard = app.currentData[0];
        let card = document.querySelector("#card-home");
        card.textContent = "";
        let img = document.createElement("img");
        img.setAttribute("class", "img-home")  
        img.addEventListener("touchstart", app.start);
        img.addEventListener("touchmove", app.move);
        img.addEventListener("touchend", app.end);
        img.addEventListener("touchcancel", app.cancel);
        img.src = "http:" + decodeURIComponent(app.imgBaseURL)+ app.currentCard.avatar;
        img.alt = "cardImg-home";
        let infoFirst = document.createElement("div");
        infoFirst.setAttribute("class", "info-first");
        let fullName = document.createElement("h1");
        fullName.setAttribute("id", "name");
        fullName.textContent = (app.currentCard.first + " " + app.currentCard.last);
        let gender = document.createElement("img");
        gender.setAttribute("id", "gender");
        if(app.currentCard.gender == "female"){
            gender.src = "./img/female-icon.svg";
            gender.alt = "female-icon";
        }else{
            gender.src = "./img/male-icon.svg"
            gender.alt = "male-icon";
        }
        let infoSecond = document.createElement("div");
        infoSecond.setAttribute("class", "info-second");
        let genderLine = document.createElement("p");
        genderLine.textContent = "Gender: " + app.currentCard.gender;
        let distance = document.createElement("p");
        distance.textContent = "Distance: " + app.currentCard.distance + " away";
        card.appendChild(img);
        card.appendChild(infoFirst);
        card.appendChild(infoSecond);
        infoFirst.appendChild(fullName);
        infoFirst.appendChild(gender);
        infoSecond.appendChild(genderLine);
        infoSecond.appendChild(distance);
    },
    fetchData2: () => {
        console.log("going fetch!")
        if (app.currentData.length == 0){
            return fetch(app.currentAPI)
            .then(response => response.json())
            .then(data => { 
                console.log(data);
                app.imgBaseURL = data.imgBaseURL; //save the data in a global location inside APP
                app.currentData = data.profiles;
            })
            .catch("error in fetch");
        } else if (app.currentData.length < 3){
            console.log("less than 3!")
            return fetch(app.currentAPI)
            .then(response => response.json())
            .then(data => {
                app.imgBaseURL = data.imgBaseURL; //save the data in a global location inside APP
                let newData = data.profiles;
                newData.forEach(element => {
                    app.currentData.push(element);
                });
                console.log("push new people") 
            })  
        }   
    },
    fetchData3: () => {
        if (app.currentData.length == 0){
            fetch(app.currentAPI);;
            then(response => response.json())
            console.log(response);
            app.imgBaseURL = myJson.imgBaseURL;
            app.currentData = myJson.profiles;
        } else if (app.currentData.length < 3){
            console.log("less than 3!")
            const response = fetch(app.currentAPI);
            const myJson = response.json();
            let newData = myJson.profiles;
            newData.forEach(element => {
                app.currentData.push(element);
            });
            console.log("push new people")  
        }   
    },
    fetchData: async() => {
        if (app.currentData.length == 0){
            const response = await fetch(app.currentAPI);
            const myJson = await response.json();
            app.imgBaseURL = myJson.imgBaseURL;
            app.currentData = myJson.profiles;
        } else if (app.currentData.length < 3){
            console.log("less than 3!")
            const response = await fetch(app.currentAPI);
            const myJson = await response.json();
            let newData = myJson.profiles;
            newData.forEach(element => {
                app.currentData.push(element);
            });
            console.log("push new people")  
        }   
    },
    createLikedList: ()=>{
        let str = sessionStorage.getItem(app.KEY);//getItem => get string;=
        if(str){
            app.likedArray = JSON.parse(str);
        }
        let cardList = document.querySelector(".card-list");
        cardList.textContent= "";
        console.log(app.likedArray)
        document.getElementById("likeNum").textContent = app.likedArray.length++ + " ";
        
        
        app.likedArray.forEach(element => {
            let card = document.createElement("div");
            card.setAttribute("class", "card-liked");         
            let imgLiked = document.createElement("img");
            imgLiked.setAttribute("class", "img-liked");
            imgLiked.src = "http:" + decodeURIComponent(app.imgBaseURL) + element.avatar;
            imgLiked.alt = "liked image";
            let infoLiked = document.createElement('div');
            infoLiked.setAttribute("class", "info-liked")
            let cardTop = document.createElement("div");
            cardTop.setAttribute("class", "card-top");
            let cardName = document.createElement("h4");
            cardName.setAttribute("class", "card-name");
            cardName.textContent = element.first + " " + element.last;
            let genderLiked = document.createElement("img");
            genderLiked.setAttribute("class", "gender-liked");
            if(element.gender == "male"){
                genderLiked.src = "./img/male-icon.svg";
                genderLiked.alt = "male-icon";
            }else{
                genderLiked.src = "./img/female-icon.svg"
                genderLiked.alt = "female-icon";
            }
            let cardBottom = document.createElement("p");
            cardBottom.setAttribute("class", "card-bottom");
            cardBottom.textContent = "Distance: " + element.distance + " away";
            let deleteBtn = document.createElement("img");
            deleteBtn.setAttribute("class", "delete");
            deleteBtn.src = "./img/delete-btn.svg";
            deleteBtn.alt = "delete-btn"
            deleteBtn.setAttribute("num", element.id);
            deleteBtn.addEventListener("click", app.delete);
            cardList.appendChild(card);
            card.appendChild(imgLiked);
            card.appendChild(infoLiked);
            infoLiked.appendChild(cardTop);
            cardTop.appendChild(cardName);
            cardTop.appendChild(genderLiked);
            infoLiked.appendChild(cardBottom);
            card.appendChild(deleteBtn); 
                
        });
        if(document.querySelector(".card-liked") == null){
            let empty = document.createElement("h3");
            empty.textContent = "Your like List is empty now. You could back to the home page to find someone you like!";
            empty.setAttribute("class", "empty");
            cardList.appendChild(empty);
        }

    },
    delete: ev=>{
        let btn = ev.target;
        let target = btn.getAttribute("num");
        let button = ["Yes", "No"];
        navigator.notification.confirm("Are you sure to delete this card?",
        (responseIndex)=>{
          if(responseIndex == 1){
            console.log(target)
            console.log(app.likedArray)
            const index = app.likedArray.findIndex(card => card.id === target);
            console.log(index)
            document.querySelectorAll(".card-liked")[index].classList.add("active");
            app.likedArray.splice(index, 1);
            app.likedArray = app.likedArray.filter(card => card !== null);
            console.log(app.likedArray);
            sessionStorage.setItem(app.KEY, JSON.stringify(app.likedArray));
            setTimeout(() => {
                app.createLikedList();  
            }, 800);
          }
        }, "Warm", button)
    },
    like: ()=>{
        // app.swip();
        setTimeout(() => {
            document.querySelector(".trans-like").classList.add("active"); 
        }, 400);               
            // document.querySelector(".trans-like").classList.add("active");
            console.log("Here is like Array", app.likedArray);
        if(app.currentCard == null){
            console.log("some reasons make card push empty!")
        }else{
            console.log(app.currentCard)
            app.likedArray.push(app.currentCard);
            app.likedArray = app.likedArray.filter(card => card !== null);
            sessionStorage.setItem(app.KEY, JSON.stringify(app.likedArray));
            app.currentData.shift();
            app.fetchData();
            setTimeout(() => {
                app.createACard();
            }, 500);
            setTimeout(() => {
                document.querySelector(".trans-like").classList.remove("active");
            }, 1500);
            console.log(sessionStorage.getItem(app.KEY))
            console.log(app.currentData);
        }
    },
    nope: ()=>{
        setTimeout(() => {
            document.querySelector(".trans-nope").classList.add("active"); 
        }, 400);  
        setTimeout(() => {
            app.currentData.shift();
            app.fetchData();
            app.createACard();
        }, 500);
        setTimeout(() => {
            document.querySelector(".trans-nope").classList.remove("active");
        }, 1500);
    },
    swiped:()=>{
        let target = document.getElementById("img-home")
        let tiny = new tinyshell(target);
        tiny.addEventListener("swipeleft", doSomething);

        function doSomething(ev) {
        //ev.currentTarget will be the HTML element that triggered this
        //put your code here to do something with or to the HTML element
        console.log("left") 
        }
    },
    nav: ev => {
        let cardList = document.querySelector(".card-list");
        cardList.textContent = "";
        window.scrollTo(0,0);
        console.log("NAV")
        let btn = ev.currentTarget;
        console.log("ev target", ev.currentTarget);
        let target = btn.getAttribute("data-target");
        console.log("Navigate to", target);
        document.querySelector(".page.active").classList.remove("active");
        document.getElementById(target).classList.add("active");
        if(target == "liked"){
            app.createLikedList();
        }
    },
    addListeners: (ev)=> {
        document.querySelectorAll(".nav-btn").forEach(element => {
            element.addEventListener("click", app.nav);
        });
        // app.swip(ev);
        document.getElementById("gender-men").addEventListener("click", app.menOnly);
        document.getElementById("gender-women").addEventListener("click", app.womenOnly);

    },
    start:ev=>{
        app.touch.xstart = ev.touches[0].clientX;
        setTimeout(() => {
            app.touch.xstart = null;
            console.log("you swip too long!")
        }, 700);
    },
    move:ev=>{
        app.touch.xend = ev.touches[0].clientX;
        setTimeout(() => {
            app.touch.xend = null;
            console.log("you swip too long!")
        }, 700);
    },
    end:(ev)=>{
        // find the direction: Left or Right; 
        // touch.xend = ev.touches[0].clienX;
        if(app.touch.xend == null && app.touch.start ==null){console.log("xend is null!")}
        // if(touch.xstart ==null){console.log("xstart is null!")}
        else{
        let deltaX = app.touch.xend- app.touch.xstart;
        console.log(app.touch.xend);
        console.log(app.touch.xstart);
        console.log(deltaX);
        if(deltaX > 0){
            //what about minimum distance travelled?
            //what about moving more in the verical than horizontal?
            //what about min or max time to move?   
            app.touch.dir = "right";

    
        }else{
            app.touch.dir = "left";
            console.log("nope!");

        }
        // ev.target.classList.add(touch.dir);;
        if(app.touch.dir !== null){
            console.log(app.touch.dir);
            ev.target.classList.add(app.touch.dir);
            if(app.touch.dir == "right"){
                app.like();
                console.log("like!");
                app.touch.xstart= null;
                app.touch.xend = null;
                app.touch.dir = null;
            }else{
                app.nope();
                app.touch.xstart= null;
                app.touch.xend = null;
                app.touch.dir = null;
            }
        }  
    }
    },
    cancel:()=>{
        console.log(ev);
            app.touch.xstart = null;
            app.touch.xend = null;
            app.touch.dir=null;
    },
}
const ready = "cordova" in window ? "deviceready" : "DOMContentLoaded";
document.addEventListener(ready, app.init);
