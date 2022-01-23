window.onload = init;
window.onscroll = function() {window.scrollTo(0, 0)}; 
var delay;
var target;
var position;
var pscore, score=0, shot, t=1;
function init()
{
    div = document.getElementById("birdbox");
    pscore = document.getElementById("score");
    doggo = document.getElementById("doggo");
    doggo.style.transition = "all 0s linear 0s";
    doggo.style.transform = "translate("+((window.innerWidth/2)-50)+"px, "+window.innerHeight+"px)";
    pscore.innerHTML = "Score: "+score;
}

function StartGame()
{
    banner = document.getElementsByClassName("banner");
    banner[0].style.opacity = 0;
    banner[0].style.display = "none";
    Spawn();
}

function Spawn()
{
    clearTimeout(delay);
    shot=0;
    var birds = document.getElementsByClassName("birdactive");
    for(i=0;i<birds.length;i++)
        birds[i].className = "bird";
    birds = document.getElementsByClassName("bird");
    for(i=0;i<birds.length;i++)
    {
        birds[i].style.transition = "all 0s linear 0s";
        birds[i].style.transform = "translate("+window.innerWidth+"px, "+window.innerHeight+"px)";
        birds[i].className = "bird";
        if(birds[i].id == "blueb")
            birds[i].src = "DuckHuntAssets/BlueLeft.gif";
        else if(birds[i].id == "blackb")
            birds[i].src = "DuckHuntAssets/BlackLeft.gif";
        else if(birds[i].id == "brownb")
            birds[i].src = "DuckHuntAssets/BrownLeft.gif";
    }
    index = Math.floor(Math.random()*3);
    birds[index].className = "birdactive";
    Nextmove();
}

function Nextmove()
{
    if(!shot)
    {
        var x=0, y=0;
        var distance=0;
        target = document.getElementsByClassName("birdactive");
        position = target[0].getBoundingClientRect();
        while(distance<850)
        {
            x = Math.floor(Math.random()*(window.innerWidth/(10/8))+Math.random()*(window.innerWidth/10));
            y = Math.floor(Math.random()*(window.innerHeight/(10/8))+Math.random()*(window.innerHeight/10));
            distance = Math.floor(Math.sqrt(((position.left-x)*(position.left-x))+((position.top-y)*(position.top-y))));
        }
        if(position.left<x)
        {
            if(target[0].id == "blueb")
                target[0].src = "DuckHuntAssets/BlueRight.gif";
            else if(target[0].id == "blackb")
                target[0].src = "DuckHuntAssets/BlackRight.gif";
            else if(target[0].id == "brownb")
                target[0].src = "DuckHuntAssets/BrownRight.gif";
        }
        else
        {
            if(target[0].id == "blueb")
                target[0].src = "DuckHuntAssets/BlueLeft.gif";
            else if(target[0].id == "blackb")
                target[0].src = "DuckHuntAssets/BlackLeft.gif";
            else if(target[0].id == "brownb")
                target[0].src = "DuckHuntAssets/BrownLeft.gif";
        }
        t = distance/800;
        target[0].style.transition = "all "+t+"s linear 0s";
        target[0].style.transform = "translate("+x+"px,"+y+"px)";
    }
    delay = setTimeout(Nextmove, t*1000);
}

function Shoot()
{
    if(!shot)
    {
        clearTimeout(delay);
        shot=1;
        pscore = document.getElementById("score");
        score++;
        pscore.innerHTML = "Score: "+score;
        target = document.getElementsByClassName("birdactive");
        position = target[0].getBoundingClientRect();
        if(target[0].id == "blueb")
            target[0].src = "DuckHuntAssets/BlueShot.png";
        else if(target[0].id == "blackb")
            target[0].src = "DuckHuntAssets/BlackShot.png";
        else if(target[0].id == "brownb")
            target[0].src = "DuckHuntAssets/BrownShot.png";
        target[0].style.transition = "all 0s linear 0s";
        target[0].style.transform = "translate("+position.left+"px, "+position.top+"px)";
        delay = setTimeout(DeathAnimation, 1000);
    }
}

function DeathAnimation()
{
    clearTimeout(delay);
    if(target[0].id == "blueb")
        target[0].src = "DuckHuntAssets/BlueDead.gif"
    else if(target[0].id == "blackb")
        target[0].src = "DuckHuntAssets/BlackDead.gif";
    else if(target[0].id == "brownb")
        target[0].src = "DuckHuntAssets/BrownDead.gif";
    target = document.getElementsByClassName("birdactive");
    position = target[0].getBoundingClientRect();
    target[0].style.transition = "all 1s linear 0s";
    target[0].style.transform = "translate("+position.left+"px, "+window.innerHeight+"px)";
    delay = setTimeout(DoggoUp, 1000);
}

function DoggoUp(pos)
{
    clearTimeout(delay);
    doggo = document.getElementById("doggo");
    position = doggo.getBoundingClientRect();
    birb = document.getElementsByClassName("birdactive");
    bposition = birb[0].getBoundingClientRect();
    doggo.style.transition = "all 0s linear 0s";
    doggo.style.transform = "translate("+bposition.left+"px, "+(position.top)+"px)";
    position = doggo.getBoundingClientRect();
    doggo.style.transition = "all 1s linear 0s";
    doggo.style.transform = "translate("+position.left+"px, "+(position.top-250)+"px)";
    delay = setTimeout(DoggoDown, 2000);
}

function DoggoDown()
{
    clearTimeout(delay);
    doggo = document.getElementById("doggo");
    position = doggo.getBoundingClientRect();
    doggo.style.transform = "translate("+position.left+"px, "+window.innerHeight+"px)";
    delay = setTimeout(Spawn, 1000);
}