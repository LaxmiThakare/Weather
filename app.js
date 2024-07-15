function geturl(city)
{
    return  "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=c3ff0c73923d4283628838d35ef0dcb7"
}


const btn=document.querySelector(".btn");
const city=document.querySelector(".input");
const cityname=document.querySelector("#cityname");
const gettemp=document.querySelector(".gettemp");
const humidity=document.querySelector(".humidity");
const speed=document.querySelector(".speed");

// const weatherverify=document.querySelector("body");

let contentAdded = false;

btn.addEventListener("click", async()=> {


    const selectcity=city.value.trim();

    console.log(selectcity);

    if(selectcity)
        {

            const citites = geturl(selectcity);

            console.log(citites);
             const responce = await fetch(citites);

             const data = await responce.json();
             console.log("Data",data);

             const degreetemp1=data.main.temp-273.15;
             const degreetemp=degreetemp1.toFixed(2);

             

             if(data && !contentAdded)
             {
                
                cityname.innerText=`${data.name}`;
                gettemp.innerText=`${degreetemp}°C`;
                // humidity.innerHTML=`${data.main.humidity}`
                // speed.innerHTML=`${data.wind.speed}`



                const humidityvalue=document.createElement("h3");
                humidityvalue.textContent=data.main.humidity
                humidity.appendChild(humidityvalue);

                const speedvalue=document.createElement("h3");
                speedvalue.textContent=data.wind.speed
                speed.appendChild(speedvalue);

                contentAdded=true;

                // ------------BAck ground change--------------------------//

                
               const weatherverify =data.weather[0].main.toLowerCase();
               console.log(weatherverify);

               const bgimg=changebackgroundimage(weatherverify)
                
               if(bgimg)
               {
                    document.body.style.background=`url(${bgimg})`;
                    document.body.style.backgroundSize='cover';
                    document.body.style.backgroundPosition='center';
               }
                

             }

            
          

            console.log("Temperature in Degree:",data);
        }
     
})



function changebackgroundimage(weatherverify)
{
    switch(weatherverify)
    {
        case 'rain':
            {
                return './image/rain3.gif';
            } 
        case 'haze':
            {
                return './image/haze.gif';
            }
        case 'drizzle':
        {
            return './image/drizzle.gif';
        }
        case 'mist':
            {
                return './image/mist.gif';
            }
        case 'clouds':
            {
              return './image/cloud.gif';
            }
        default:
            {
                return 'linear-gradient(rgb(87, 57, 57),rgb(197, 6, 130),rgb(51, 9, 159),rgb(112, 85, 174))'
            }
    }
}  