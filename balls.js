window.onload =function () {
    /** Get the canvas */
    var ctx = document.getElementById("balls").getContext('2d');

    /** RNG Methods */
    function getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    function getRandomColor() {
        let color = "rgba(" + 
            getRandomInt(0, 255) + "," +
            getRandomInt(0, 255) + "," +
            getRandomInt(0, 255) +
            "," + "0.9)";

        return color;
    }

    /** The ball object */
    function Ball (initialx, initialy, speedx, speedy, color, size) {
        this.x = initialx;
        this.y = initialy;
        this.speedx = speedx;
        this.speedy = speedy;
        this.color = color;
        this.size = size;

        /** Update the ball's position */
        this.update = function update() {
            let next_x = this.x + this.speedx;
            let next_y = this.y + this.speedy; 
            if (next_x + this.size > ctx.canvas.width || next_x - this.size < 0) {
                this.speedx = -this.speedx;
            }
            if (next_y + this.size > ctx.canvas.height || next_y - this.size < 0) {
                this.speedy = -this.speedy;
            }
            this.x += this.speedx;
            this.y += this.speedy;
        }

        /** Draw the ball on the canvas */
        this.draw = function draw() {
            this.update();
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI, false);
            ctx.fillStyle = this.color;
            ctx.fill();
            ctx.closePath();
        }
    }

    /** Generate a set of balls to bounce around */
    function generateBalls(num) {
        var balls = [];
        for (let i = 0; i < num; i++) {
            let size = getRandomInt(1, 50);
            let initialx = getRandomInt(size, size + 50);
            let initialy = getRandomInt(size, size + 50);
            let speedx = getRandomInt(-10, 10);
            let speedy = getRandomInt(-8, 8);
            let color = getRandomColor();

            // Make sure balls aren't really slow or stationary
            speedx = Math.abs(speedx) < 2 ? speedx * 2 : speedx;
            speedy = Math.abs(speedy) < 2 ? speedy * 2 : speedy;

            balls.push(new Ball(initialx, initialy, speedx, speedy, color, size));        
        }
        return balls;
    }

    var balls = generateBalls(50);

    /** Redraw all of the balls */
    window.setInterval(function() {
        ctx.canvas.width  = window.innerWidth;
        ctx.canvas.height = window.innerHeight;
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        for (i = 0; i < balls.length; i++) {
            console.log("test");
            balls[i].draw();
        }
    }, 16);
}