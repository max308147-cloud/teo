// Boxing App - Single File JS
(function () {
    const style = document.createElement("style");
    style.innerHTML = `
        body { font-family: Arial; background:#111; color:#fff; text-align:center;}
        input,button{padding:10px;margin:5px;border:none;border-radius:5px;}
        button{background:#e53935;color:#fff;cursor:pointer;}
        table{width:90%;margin:auto;border-collapse:collapse;}
        th,td{border:1px solid #444;padding:10px;}
        .card{background:#222;padding:10px;margin:10px;display:inline-block;}
    `;
    document.head.appendChild(style);

    document.body.innerHTML = `
        <h1>🥊 Boxing App</h1>
        <div id="login">
            <input id="user" placeholder="Usuario"><br>
            <input id="pass" type="password" placeholder="Contraseña"><br>
            <button id="btnLogin">Entrar</button>
        </div>
        <div id="app" style="display:none;">
            <form id="form">
                <input type="date" id="fecha" required>
                <input type="number" id="rondas" placeholder="Rondas" required>
                <input type="number" id="duracion" placeholder="Minutos" required>
                <input type="number" id="calorias" placeholder="Calorías" required>
                <button>Guardar</button>
            </form>
            <div class="stats"></div>
            <canvas id="grafica" width="400" height="200"></canvas>
            <table></table>
        </div>
    `;

    function getData(){return JSON.parse(localStorage.getItem("data"))||[];}
    function setData(d){localStorage.setItem("data",JSON.stringify(d));}

    document.getElementById("btnLogin").onclick=()=>{
        if(user.value==="admin"&&pass.value==="1234"){
            login.style.display="none";app.style.display="block";
            load();stats();
        }else alert("Error");
    };

    form.onsubmit=e=>{
        e.preventDefault();
        let d=getData();
        d.push({id:Date.now(),fecha:fecha.value,rondas:+rondas.value,duracion:+duracion.value,calorias:+calorias.value});
        setData(d);form.reset();load();stats();
    };

    function load(){
        let t=document.querySelector("table");
        t.innerHTML="<tr><th>Fecha</th><th>Rondas</th><th>Duración</th><th>Calorías</th><th></th></tr>";
        getData().forEach(e=>{
            t.innerHTML+=`<tr>
                <td>${e.fecha}</td><td>${e.rondas}</td><td>${e.duracion}</td><td>${e.calorias}</td>
                <td><button onclick="delItem(${e.id})">❌</button></td></tr>`;
        });
    }

    window.delItem=id=>{
        setData(getData().filter(e=>e.id!==id));load();stats();
    };

    function stats(){
        let d=getData();
        let c=d.reduce((s,e)=>s+e.calorias,0);
        let t=d.reduce((s,e)=>s+e.duracion,0);
        document.querySelector(".stats").innerHTML=`<div class="card">${c} kcal</div><div class="card">${t} min</div>`;
        draw(d);
    }

    function draw(d){
        let c=grafica.getContext("2d");
        c.clearRect(0,0,400,200);
        d.forEach((e,i)=>{
            c.fillRect(i*50+20,200-e.calorias/2,30,e.calorias/2);
        });
    }
})();