(function (window, document) {

  function Bubble (selector) {
    this._el = document.createElement('div');
    this._el.classList.add('bubble');

    this._textEl = document.createElement('div');
    this._textEl.classList.add('bubble-text');

    this._innerTextEl = document.createElement('div');
    this._innerTextEl.classList.add('bubble-text-inner');
    this._textEl.appendChild(this._innerTextEl);


    var parent = document.querySelector(selector);
    parent.appendChild(this._el);
    parent.appendChild(this._textEl);
  }

  Bubble.prototype.show = function (options) {
    this._innerTextEl.innerHTML = options.text;

    this._textEl.style.top = options.top + 'px';
    this._textEl.style.left = options.left + 'px';

    this._el.style.top = options.top + 'px';
    this._el.style.left = options.left + 'px';
    this._el.style.transform = 'rotate(' + options.angle + 'deg)';
  };

  var bubble = new Bubble('.phone-screen');

  var currentStep = -1;
  var steps = [
    {
      top: 100,
      left: 20,
      angle: 60,
      text: 'Click the + button'
    },
    {
      top: 200,
      left: 50,
      angle: 0,
      text: 'w00t'
    }
  ];

  Popcorn.plugin('intro', function (options) {
    return {
      start: function (ev, track) {
        currentStep += 1;
        console.log('start', steps[currentStep].text);
        bubble.show(steps[currentStep]);
        this.pause();
        setTimeout(function () {
          this.play();
        }.bind(this), 3000);
      },

      end: function (ev, track) {
        console.log('end');
      }
    };
  });

  var vid = Popcorn('#android-intro');

  vid.intro({
    start: 3,
    start: 6
  });

  vid.play();
})(window, document);
