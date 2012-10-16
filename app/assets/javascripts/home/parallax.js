$(function () {
    globalScrollPos = 0;
    viewportHeight = window.innerHeight;
    animations = [];
    AnimationStateIdle = 0;
    AnimationStateAnimating = 1;
    herokuContent = $("#heroku_code")[0];
    opportunityTooltip = $("#opportunity-tooltip")[0];
    cloud1 = $("#cloud-1")[0];
    cloud2 = $("#cloud-2")[0];
    cloud3 = $("#cloud-3")[0];

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

    var clouds = new Animation(
          $("#community")[0],
          function(e) {
            var t = -1*this.height + (e-this.start);
              console.log(t);
          if(t>100){
            cloud2.style.opacity = Math.min(Math.max(1-((t-100)/300),0),1);
            cloud3.style.opacity = Math.min(Math.max(1-((t-100)/300),0),1);
            cloud2.style.left = t-130 + "px";
            cloud3.style.right = t/2-60 + "px";
            }
          },
          function() {
          },
          function(e) { return -1*viewportHeight-150 }
        );
        animations.push(clouds);

    var heroku = new Animation(
        $('#mentoring')[0],
        function (e) {
            var t = -1 * this.height + (e - this.start) + 100;
            n = "0px " + Math.min(t / 2 * -1, 0) + "px";
            herokuContent.style.backgroundPosition = n
        },
        function () {
            herokuContent.style.backgroundPosition = "0px 0px"
        },
        function (e) {
            return -1 * e - viewportHeight/2;
        }
    );
    animations.push(heroku);

    var chart = new Animation(
      $("#opportunity")[0],
      function(e) {
        var t = -1 * this.height + (e-this.start);
        opportunityTooltip.style.opacity = Math.max(Math.min(t/300,1),0);
        opportunityTooltip.style.webkitTransform = "scale("+Math.max(Math.min(t/300,1),0)+")"
      },
      function() {},
      function(e) { return -1*viewportHeight-150 }
    );
    animations.push(chart);

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
