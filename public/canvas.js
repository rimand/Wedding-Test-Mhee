window.addEventListener('load', () => {
    const canvas = document.getElementById("canvas");
    const toolbar = document.getElementById("toolbar");
    const toolsend = document.getElementById("send");

    const ctx = canvas.getContext("2d");

    const canvasOffsetX = canvas.offsetLeft;
    const canvasOffsetY = canvas.offsetTop;

    console.log(canvasOffsetX, canvasOffsetY);

    canvas.width = window.innerWidth - canvasOffsetX;
    canvas.height = window.innerHeight - canvasOffsetY;

    img = document.getElementById("img1");

    toolbar.addEventListener('click', e => {
        if (e.target.id === 'clear') {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
        }
    });

    toolsend.addEventListener('click', e => {
        if (e.target.id === "img1") {
            sendMessage();
            ctx.clearRect(0, 0, canvas.width, canvas.height);
        }
    });

    toolbar.addEventListener('change', e => {
        if (e.target.id === 'lineWidth') {
            ctx.lineWidth = e.target.value;
        }
        if (e.target.id === 'stroke') {
            ctx.strokeStyle = e.target.value;
        }
    });

    ctx.strokeStyle = "white"
    ctx.lineWidth = 10;

    let painting = false;

    function startPosition(e) {
        painting = true;
        ctx.beginPath();
        ctx.moveTo(e.clientX - canvasOffsetX, e.clientY - canvasOffsetY);
    }

    function endPosition() {
        painting = false;
        ctx.closePath();
    }

    function draw(e) {
        if (!painting) return;
        ctx.lineCap = "round";

        ctx.lineTo(e.clientX - canvasOffsetX, e.clientY - canvasOffsetY)
        ctx.stroke();
    }

    canvas.addEventListener("mousedown", startPosition);
    canvas.addEventListener("mouseup", endPosition);
    canvas.addEventListener("mousemove", draw);

    canvas.addEventListener("touchstart", e => {
        let num = e.touches.length;
        // document.getElementById("text").innerHTML  = num;
        if (e.touches.length > 1) return

        [...e.changedTouches].forEach(touch => {
            console.log(touch.pageX)

            painting = true;
            ctx.beginPath();
            ctx.moveTo(touch.pageX - canvasOffsetX, touch.pageY - canvasOffsetY);
        });
    });

    canvas.addEventListener("touchend", e => {
        painting = false;
        ctx.closePath();
    });

    canvas.addEventListener("touchmove", e => {
        if (!painting) return;
        if (e.touches.length > 1) return

        ctx.lineCap = "round";

        [...e.changedTouches].forEach(touch => {
            ctx.lineTo(touch.pageX - canvasOffsetX, touch.pageY - canvasOffsetY)
            ctx.stroke();
        });
    });

    function sendMessage() {
        img.style.transform = "scale(1.2)";
        img.style.opacity = 1;
        img.style.transition = "all .2s";
        setTimeout(() => {
            resetImg();
        }, 100)
    }

    function resetImg() {
        // Set image size to original
        img.style.transform = "scale(1)";
        img.style.transition = "all .2s";
        img.style.opacity = 0.5;
    }
});