$(function () {
    globalScrollPos = 0;
    viewportHeight = window.innerHeight;
    animations = [];
    AnimationStateIdle = 0;
    AnimationStateAnimating = 1;
    herokuContent = $("#heroku_code")[0];

    window.requestAnimFrame = function () {
        return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function (e) {
            window.setTimeout(e, 1e3 / 60)
        }
    }();

    function Animation(e, t, n, r) {
        this.offset = r || function () {
            return 0
        };
        r = this.offset(viewportHeight);
        this.element = e;
        var i = e.offsetTop;
        this.start = i + r;
        this.height = e.offsetHeight;
        this.end = this.height + i;
        this.state = 0;
        this.animation = t;
        this.reset = n;
    }

    Animation.prototype.resize = function (e) {
        var t = this.element.offsetTop;
        this.start = t + this.offset(e);
        this.height = this.element.offsetHeight;
        this.end = this.height + t;
    }

    Animation.prototype.animate = function (e, t) {
        if (this.end < e) {
            this.state == AnimationStateAnimating && (this.reset(), this.state = AnimationStateIdle);
            return;
        }

        if (this.start > e) {
            this.state == AnimationStateAnimating && (this.reset(), this.state = AnimationStateIdle);
            return;
        }

        this.state = AnimationStateAnimating;
        this.animation.call(this, e);
    };

    var heroku = new Animation(
        herokuContent,
        function (e) {
            var t = -1 * this.height + (e - this.start);
            n = "0px " + Math.max(t / 2 * -1, 0) + "px";
            console.log(n)
            herokuContent.style.backgroundPosition = n
        },
        function () {
            herokuContent.style.backgroundPosition = "0px 0px"
        },
        function (e) {
            return -1 * e + 100
        }
    );
    animations.push(heroku);

    function e() {
        var t = $(window).scrollTop();
        if (t == globalScrollPos) {
            window.requestAnimFrame(e);
            return;
        }

        globalScrollPos = t;

        for (var n = animations.length - 1; n >= 0; n--) {
            var r = animations[n];
            r.animate(t, viewportHeight)
        }

        window.requestAnimFrame(e);
    }

    e();
});
