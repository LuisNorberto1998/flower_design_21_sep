document.addEventListener("DOMContentLoaded", function () {
    const canvas = document.getElementById("myCanvas");
    const ctx = canvas.getContext("2d");

    const colorSteam = "#61A641";
    const circleRadius = 90;
    const totalFlowers = 2;
    const flowerSpacing = 120;
    let animationId = null;

    // Draw flower
    function animateFlowerDrawing(centerX, centerY, numPetals, petalAngle, startPetal, yOffset) {
        let currentStep = 0;
        const totalSteps = 100;
        let increasing = true;

        function drawStep() {
            if (increasing) {
                if (currentStep <= totalSteps) {
                    ctx.clearRect(0, 0, canvas.width, canvas.height);
                    drawFlower(centerX, centerY, numPetals, petalAngle, startPetal, yOffset, currentStep / totalSteps);
                    currentStep++;
                } else {
                    // Cambia la dirección para que la animación vuelva
                    increasing = false;
                    currentStep = totalSteps; // Mantén el valor actual
                }
            } else {
                if (currentStep >= 0) {
                    ctx.clearRect(0, 0, canvas.width, canvas.height);
                    drawFlower(centerX, centerY, numPetals, petalAngle, startPetal, yOffset, currentStep / totalSteps);
                    currentStep--;
                } else {
                    // Cambia la dirección para que la animación vaya hacia adelante
                    increasing = true;
                    currentStep = 0; // Mantén el valor actual
                }
            }

            // Solicita la próxima animación
            animationId = requestAnimationFrame(drawStep);
        }

        // Inicializa la animación
        animationId = requestAnimationFrame(drawStep);
    }

    // Draw flower

    function drawFlower(centerX, centerY, numPetals, petalAngle, startPetal, yOffset, animationProgress) {
        drawStem(centerX, centerY);
        drawLeftStem(centerX + 15, centerY + 380);
        ctx.fillStyle = colorSteam;

        drawPetalGradually(centerX - 100, centerY + 368, centerX - 130, centerY + 300, centerX - 200, centerY + 350, centerX - 160, centerY + 400, animationProgress);

        drawPetalGradually(centerX - 30, centerY + 355, centerX + 20, centerY + 300, centerX - 50, centerY + 350, centerX - 20, centerY + 440, animationProgress);

        drawRightStem(centerX + 150, centerY + 500);

        drawPetalGradually(centerX + 110, centerY + 480, centerX + 90, centerY + 530, centerX + 200, centerY + 550, centerX + 200, centerY + 450, animationProgress);

        ctx.beginPath();
        ctx.arc(centerX, centerY, circleRadius, 0, 2 * Math.PI);
        ctx.fillStyle = "#42210B";
        ctx.fill();

        drawPetals(numPetals, petalAngle, centerX, startPetal, yOffset, centerY, animationProgress);
    }

    function drawStem(x, y) {
        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.lineTo(x, 500);
        ctx.quadraticCurveTo(x + 50, 1050, x, 950);
        ctx.strokeStyle = colorSteam;
        ctx.lineWidth = 10;
        ctx.stroke();
    }

    function drawLeftStem(x, y) {
        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.lineTo(x - 5, y - 0);
        ctx.quadraticCurveTo(x - 60, y - 50, x - 130, y - 10);
        ctx.strokeStyle = colorSteam;
        ctx.lineWidth = 10;
        ctx.stroke();
    }

    function drawRightStem(x, y) {
        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.lineTo(x - 5, y - 0);
        ctx.quadraticCurveTo(x - 60, y - 50, x - 130, y - 10);
        ctx.strokeStyle = colorSteam;
        ctx.lineWidth = 10;
        ctx.stroke();
    }

    function drawPetalGradually(cx, cy, x1, y1, x2, y2, x3, y3, animationProgress) {
        const intermediateX1 = cx + (x1 - cx) * animationProgress;
        const intermediateY1 = cy + (y1 - cy) * animationProgress;
        const intermediateX2 = x1 + (x2 - x1) * animationProgress;
        const intermediateY2 = y1 + (y2 - y1) * animationProgress;
        const intermediateX3 = x2 + (x3 - x2) * animationProgress;
        const intermediateY3 = y2 + (y3 - y2) * animationProgress;

        ctx.beginPath();
        ctx.moveTo(cx, cy);
        ctx.quadraticCurveTo(intermediateX1, intermediateY1, intermediateX2, intermediateY2);
        ctx.quadraticCurveTo(intermediateX3, intermediateY3, cx, cy);
        ctx.closePath();
        ctx.fill();
    }

    function drawPetals(numPetals, petalAngle, centerX, startPetal, yOffset, centerY, animationProgress) {
        for (let i = 0; i < numPetals; i++) {
            const angle = i * petalAngle;
            const startX = centerX + Math.cos(angle) * startPetal;
            const startY = centerY + Math.sin(angle) * startPetal + yOffset;

            const x1 = centerX + Math.cos(angle - 0.5) * 150;
            const y1 = centerY + Math.sin(angle - 0.5) * 150;
            const x2 = centerX + Math.cos(angle) * 200;
            const y2 = centerY + Math.sin(angle) * 200;
            const x3 = centerX + Math.cos(angle + 0.5) * 150;
            const y3 = centerY + Math.sin(angle + 0.5) * 150;

            if (i % 2 === 0) {
                ctx.fillStyle = "#FCB316";
            } else {
                ctx.fillStyle = "#F28322";
            }

            drawPetalGradually(startX, startY, x1, y1, x2, y2, x3, y3, animationProgress);
        }
    }

    const audioElement = document.getElementById("audioElement");
    // Inicializa la variable para mantener el ID de la animación

    // Agrega un controlador de eventos para el evento "play" del audio
    audioElement.addEventListener("play", function () {
        // Inicia la animación si no está en marcha
        if (!animationId) {
            animateFlowerDrawing(centerX, centerY, numPetals, petalAngle, startPetal, yOffset);
        }
    });

    // Agrega un controlador de eventos para el evento "pause" del audio
    audioElement.addEventListener("pause", function () {
        // Detén la animación utilizando cancelAnimationFrame si está en marcha
        if (animationId) {
            cancelAnimationFrame(animationId);
            animationId = null;
        }
    });

    const centerX = 250;
    const centerY = 250;
    const numPetals = 20;
    const petalAngle = (2 * Math.PI) / numPetals;
    const startPetal = (circleRadius / 10) * 8;
    const yOffset = 0;
});
