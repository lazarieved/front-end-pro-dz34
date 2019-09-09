function displayCanvas() {
    var canvas = document.getElementById('mycanvas');
    var ctx = canvas.getContext('2d');

    //расчет координат центра и радиусa часов
    var radiusClock = canvas.width/2 - 10;
    var xCenterClock = canvas.width/2;
    var yCenterClock = canvas.width/2;

    //очистка экрана
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    //рисовка контура часов
    ctx.strokeStyle = '#000000';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(xCenterClock, yCenterClock, radiusClock, 0, 2*Math.PI, true);
    ctx.moveTo(xCenterClock, yCenterClock);
    ctx.stroke();
    ctx.closePath();

    //Рисование полосочек часов
    var radiusNum = radiusClock - 10; //радиус расположения полосочек
    var radiusPoint;
    for(var tm = 0; tm < 60; tm++){
        ctx.beginPath();
        if(tm % 5 === 0){
            radiusPoint = 5;
        }else{
            radiusPoint = 2;
        }
        var xPointM = xCenterClock + radiusNum * Math.cos(-6*tm*(Math.PI/180) + Math.PI/2);
        var yPointM = xCenterClock - radiusNum * Math.sin(-6*tm*(Math.PI/180) + Math.PI/2);
        ctx.arc(xPointM, yPointM, radiusPoint, 0, 2*Math.PI, true);
        ctx.stroke();
        ctx.closePath();
    }

    //оцифровка циферблата часов
    for(var th = 1; th <= 12; th++){
        ctx.beginPath();
        ctx.font = 'bold 25px sans-serif';
        var xText = xCenterClock + (radiusNum - 30) * Math.cos(-30*th*(Math.PI/180) + Math.PI/2);
        var yText = xCenterClock - (radiusNum - 30) * Math.sin(-30*th*(Math.PI/180) + Math.PI/2);
        if(th <= 9){
            ctx.strokeText(th, xText - 5, yText + 10);
        }else{
            ctx.strokeText(th, xText - 15, yText + 10);
        }
        ctx.stroke();
        ctx.closePath();
    }

    //Радиус стрелки
    var lengthSeconds = radiusNum - 10;
    var lengthMinutes = radiusNum - 15;
    var lengthHours = lengthMinutes/1.5;
    var d = new Date();
    var t_sec = 6*d.getSeconds();
    var t_min = 6*(d.getMinutes() + (1/60)*d.getSeconds());
    var t_hours = 30*(d.getHours() + (1/60)*d.getMinutes());

    //Ресуем секунды
    ctx.beginPath();
    ctx.strokeStyle = '#FF0000';
    ctx.lineWidth = 3;
    ctx.moveTo(xCenterClock, yCenterClock);
    ctx.lineTo(xCenterClock + lengthSeconds * Math.cos(Math.PI/2 - t_sec*(Math.PI/180)),
                 yCenterClock - lengthSeconds * Math.sin(Math.PI/2 - t_sec*(Math.PI/180)));
    ctx.stroke();
    ctx.closePath();

    //Ресуем минуты
    ctx.beginPath();
    ctx.strokeStyle = '#000000';
    ctx.lineWidth = 6;
    ctx.moveTo(xCenterClock, yCenterClock);
    ctx.lineTo(xCenterClock + lengthMinutes * Math.cos(Math.PI/2 - t_min*(Math.PI/180)),
                 yCenterClock - lengthMinutes * Math.sin(Math.PI/2 - t_min*(Math.PI/180)));
    ctx.stroke();
    ctx.closePath();

    //Ресуем часы(время)
    ctx.beginPath();
    ctx.strokeStyle = '#000000';
    ctx.lineWidth = 15;
    ctx.moveTo(xCenterClock, yCenterClock);
    ctx.lineTo(xCenterClock + lengthHours * Math.cos(Math.PI/2 - t_hours*(Math.PI/180)),
                 yCenterClock - lengthHours * Math.sin(Math.PI/2 - t_hours*(Math.PI/180)));
    ctx.stroke();
    ctx.closePath();

    //круг в центре
    ctx.strokeStyle = 'black';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(xCenterClock, yCenterClock, radiusClock / 35, 0, 2 * Math.PI, true);
    ctx.moveTo(xCenterClock, yCenterClock);
    ctx.save();
    ctx.clip();
    ctx.clearRect(xCenterClock - radiusClock / 35, yCenterClock - radiusClock / 35,
        radiusClock / 35 * 2, radiusClock / 35 * 2);
    ctx.restore();
    ctx.stroke();
    ctx.closePath();

    return;
}

window.onload = function(){
    window.setInterval(
        function(){
            document.getElementById('clock').innerText = '';
            displayCanvas();
        }, 1000
    );
}