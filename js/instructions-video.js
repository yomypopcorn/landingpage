(function (window, document) {

  function Bubble (selector) {
    this._el = document.createElement('div');
    this._el.classList.add('bubble');

    this._textEl = document.createElement('div');
    this._textEl.classList.add('bubble-text');

    this._innerTextEl = document.createElement('div');
    this._innerTextEl.classList.add('bubble-text-inner');
    this._textEl.appendChild(this._innerTextEl);

    this._button = document.createElement('button');
    this._button.classList.add('btn', 'btn-success', 'btn-xs');
    this._button.innerHTML = 'Next';
    this._textEl.appendChild(this._button);

    var parent = document.querySelector(selector);
    parent.appendChild(this._el);
    parent.appendChild(this._textEl);
  }

  Bubble.prototype.updateClassNames = function (options) {
    if (options.finish && !this._el.classList.contains('overlay')) {
      this._el.classList.add('overlay');
      this._textEl.classList.add('overlay');
      this._button.innerHTML = 'Got it';

    } else if (!options.finish && this._el.classList.contains('overlay')) {
      this._el.classList.remove('overlay');
      this._textEl.classList.remove('overlay');
      this._button.innerHTML = 'Next';
    }
  },

  Bubble.prototype.show = function (options) {
    options.nextFn = options.nextFn || function noop () {};

    this.updateClassNames(options);

    this._innerTextEl.innerHTML = options.text;

    this._textEl.style.top = options.top + 'px';
    this._textEl.style.left = options.left + 'px';

    this._el.style.top = options.top + 'px';
    this._el.style.left = options.left + 'px';
    this._el.style.transform = 'rotate(' + options.angle + 'deg)';

    this._el.style.opacity = 1;
    this._textEl.style.opacity = 1;

    var buttonFn = function (ev) {
      ev.preventDefault();
      this._button.removeEventListener('click', buttonFn);
      options.nextFn();
    }.bind(this)

    this._button.addEventListener('click', buttonFn);
  };

  Bubble.prototype.hideButton = function () {
    this._button.style.display = 'none';
  };

  Bubble.prototype.showButton = function () {
    this._button.style.display = 'inline-block';
  };

  Bubble.prototype.hide = function () {
    this.hideButton();
    this._el.style.opacity = 0;
    this._textEl.style.opacity = 0;
  };

  Popcorn.plugin('intro', function (options) {
    return {
      start: function (ev, options) {
        function next () {
          bubble.hide();
          this.play();
        }

        options.pauseDelay = options.pauseDelay || 0;
        options.nextFn = next.bind(this);

        bubble.show(options);

        setTimeout(function () {
          this.pause();
          bubble.showButton();
        }.bind(this), options.pauseDelay * 1000);
      },

      end: function (ev, options) {
        console.log('end');
      }
    };
  });

  var tutorialEl = document.querySelector('.tutorial');
  var startEl = document.querySelector('.tutorial-start');
  var bubble = new Bubble('.tutorial');
  var vid = Popcorn('#android-intro');

  var start = function () {
    tutorialEl.classList.add('active');
    vid.play();
  };

  var finish = function () {
    console.log('finish');
    tutorialEl.classList.remove('active');
  };

  startEl.addEventListener('click', start);

  vid.on('ended', finish);

  vid.intro({
    start: 0.1,
    pauseDelay: 0,
    top: 65,
    left: 155,
    angle: 0,
    text: 'Click the <i class="fa fa-plus"></i> button to add a contact.'
  });

  vid.intro({
    start: 2.3,
    pauseDelay: 7,
    top: -33,
    left: 83,
    angle: -28,
    text: 'Type YOMYPOPCORN and press "Add".'
  });

  vid.intro({
    start: 12.5,
    pauseDelay: 0,
    top: 112,
    left: 110,
    angle: 106,
    text: 'YOMYPOPCORN is now in your buddy list. Click to send a Yo.'
  });

  vid.intro({
    start: 18,
    pauseDelay: 0,
    top: 42,
    left: 130,
    angle: 94,
    text: 'You will receive a Yo back. Open it.'
  });

  vid.intro({
    start: 24,
    pauseDelay: 0,
    top: 105,
    left: 30,
    angle: 170,
    text: 'Click the "Shows" tab.'
  });

  vid.intro({
    start: 26.75,
    pauseDelay: 0,
    top: 20,
    left: 248,
    angle: 12,
    text: 'Add your first show.'
  });

  vid.intro({
    start: 31,
    pauseDelay: 3,
    top: 79,
    left: 248,
    angle: 65,
    text: 'Search for a title.'
  });

  vid.intro({
    start: 34.5,
    pauseDelay: 0,
    top: 162,
    left: 248,
    angle: 83,
    text: 'Click "Subscribe".'
  });

  vid.intro({
    start: 36.5,
    pauseDelay: 0,
    top: 132,
    left: 145,
    angle: 89,
    text: 'You\'ve subscribed to your first show.'
  });

  vid.intro({
    start: 37,
    pauseDelay: 0,
    top: 162,
    left: 145,
    angle: 89,
    text: 'Let\'s add another.'
  });

  vid.intro({
    start: 46,
    pauseDelay: 0,
    top: 120,
    left: 25,
    angle: 113,
    text: 'Check out the "Feed" tab.'
  });

  vid.intro({
    start: 48,
    pauseDelay: 7,
    top: 90,
    left: 270,
    angle: 22,
    text: 'This is your feed. New episodes will appear at the top.'
  });

  vid.intro({
    start: 58,
    pauseDelay: 0,
    top: 0,
    left: 0,
    angle: 0,
    finish: true,
    text: 'You will now receive a Yo every time a new episode of one of your subscribed shows is available.<br><br>To manage your shows again later just send another Yo and open the reply link.'
  });

})(window, document);
