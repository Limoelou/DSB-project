Number.isNaN = Number.isNaN || function(value) {
    return value !== value;
}

if (window.NodeList && !NodeList.prototype.forEach) {
    NodeList.prototype.forEach = function (callback, thisArg) {
        thisArg = thisArg || window;
        for (var i = 0; i < this.length; i++) {
            callback.call(thisArg, this[i], i, this);
        }
    };
}

(function(urlLocale) {
    // Loads in a nav cta based on a user account's licenses
    // $('[data-js=site-nav-cta]').load('/' + urlLocale + '/user/licenses');

    // Loads in a cms edit button via ajax
    $('[data-js=cms-edit]').load('/' + urlLocale + '/user/cms?blogId=' + $('[data-js=cms-edit]').data('blog'));

    // Starts gtm
    $('[data-js=gtm-init]').load('/' + urlLocale + '/user/gtm');
})(window.blizzard.urlLocale);

// app.js
!function(root, factory){

    factory(root);

}(this, function(root){

    function App(){

        this.extend = function(opts){
    		_.merge(this, opts);
        };

    };

    return root.app = root.app || new App();

});

!function(root, factory){

    factory(root);

}(this, function(root){

    function Overwatch(){

        this.extend = function(opts){
    		_.merge(this, opts);
        };

    };

    return root.overwatch = !(root.overwatch instanceof Overwatch) ? new Overwatch() : root.overwatch;

});

!function(root, factory){

	factory(root, root.overwatch);

}(this, function(root, overwatch){

	function Util(){

		var util = this;
		var document = root.document;
		var body = root.document.body;

		this.width = function(){
			return root.innerWidth || document.documentElement.clientWidth || body.clientWidth;
		};

		this.height = function(){
			return root.innerHeight || document.documentElement.clientHeight || body.clientHeight;
		};

		this.sizesArray = [
			// phones portrait
			{
				name: 'xs',
				min: 0,
				max: 400
			},
			// phones landscape
			{
				name: 'sm',
				min: 400,
				max: 768
			},
			// tablet portrait
			{
				name: 'md',
				min: 768,
				max: 992
			},
			// tablet landscape || small desktop
			{
				name: 'lg',
				min: 992,
				max: 1279
			},
			// large desktops
			{
				name: 'xl',
				min: 1280,
				max: 1600
			},
			// x-large desktops/ retina laptops
			{
				name: 'xxl',
				min: 1600,
				max: Infinity
			}
		]

		this.evaluateSize = function(sizeElement) {
			var width = util.width();
			return width >= sizeElement.min && width < sizeElement.max;
		}

		this.sizes = function(){
			return util.sizesArray.reduce(function(sizesObj, sizeElement) {
				sizesObj[sizeElement.name] = util.evaluateSize(sizeElement);

				return sizesObj;
			}, {});
		};

		this.mobile = function(){
			return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini|Mobi/i.test(window.navigator.userAgent);
		};

		this.touch = function(){
			return ('ontouchstart' in window) || (window.navigator.MaxTouchPoints > 0) || (window.navigator.msMaxTouchPoints > 0);
		};

		this.vendor = function(){
			var vendor = null;
			var style = document.documentElement.style;
			_.each(['webkit', 'Moz', 'ms', 'O'], function(prefix, key){
				if(style[prefix + 'Transform'] !== undefined){
					vendor = prefix;
				}
			});
			return vendor;
		};

		this.size = function(){
			var size = null;
			_.each(util.sizes(), function(bool, key){
				if(bool) size = key;
			});
			return size;
		};

		this.isSizeAtLeast = function(minBreakpoint) {
			var sizeElement = _.find(util.sizesArray, {name: minBreakpoint});

			return util.width() >= sizeElement.min;
		}

		this.ie = function(){
			var agent = root.navigator.userAgent;
			var ie_10down = /MSIE \d/.test(agent);
			var ie_11up = /Trident\/(?:[7-9]|\d{2,})\..*rv:(\d+)/.test(agent);
			return ie_10down || ie_11up;
		};

		this.browser = function(){

			var agent = root.navigator.userAgent;
			var vendor = root.navigator.vendor;

			var gecko = /gecko\/\d/i.test(agent);
			var chrome = /Chrome\//.test(agent);
			var safari = /Apple Computer/.test(vendor);
			var edge = /Edge/.test(agent);

			return {
				ie: util.ie(),
				gecko: gecko,
				chrome: chrome,
				safari: safari,
				edge: edge
			};
		};

		this.posX = function(){
			return root.pageXOffset || root.scrollX || body.scrollLeft || document.documentElement.scrollLeft;
		};

		this.posY = function(){
			return root.pageYOffset || root.scrollY || body.scrollTop || document.documentElement.scrollTop;
		};

		this.scroll = function(){
			return body.scrollHeight > body.clientHeight && body.style.position !== 'fixed';
		};

		this.vw = function(int){
			return (util.width()/100) * int;
		};

		this.vh = function(int){
			return (util.height()/100) * int;
		};
		this.addLoadEvent = function(callback) {
			var existingFn = window.onload;
			if (typeof window.onload !== "function") {
				window.onload = callback;
			} else {
				window.onload = function() {
					existingFn();
					callback()
				}
			}
		}
		/*
		** func = a function passed in as an argument. The function to debounce.
		** wait = millisecond value. Delay in collecting multiple calls. Default: 100.
		** immediate = boolean. If set to true, the function will run immediately instead of waiting for the delay.
		*/
		this.debounce = function(func, wait, immediate) {
			var timeout;
			return function() {
				var context = this, args = arguments;
				var later = function() {
					timeout = null;
					if (!immediate) func.apply(context, args);
				};
				var callNow = immediate && !timeout;
				clearTimeout(timeout);
				timeout = setTimeout(later, wait);
				if (callNow) func.apply(context, args);
			};
        };

        this.clamp = function(num, min, max) {
            return num <= min ? min : num >= max ? max : num;
        }
	};

    overwatch.extend({ util: new Util() });
    overwatch.utils = overwatch.utils || overwatch.util;

});

!function(root, factory){

	var localStorage;

	try{
		localStorage = root.localStorage;
	}catch(err){
		//Catch error so it doesn't print error on user's client
		localStorage = null;
		console.log(err, 'localStorage unavaliable');
	}

	factory(root.overwatch, localStorage);

}(this, function(overwatch, localStorage){

	function Storage(){

		var self = this;

		// check if localstorage is available
		this.available = function(){
			return localStorage ? true : false;
		};

		// serialize value and store by key
		this.set = function(key, value){
			if(self.available()){
				localStorage.setItem(key, JSON.stringify(value));
			}
			else{
				console.log('storage.set failed, localStorage unavaliable');
			}
		};

		// get value by key and deserialze
		this.get = function(key){
			if(self.available()){
				return JSON.parse(localStorage.getItem(key));
			}
			else{
				console.log('storage.get failed, localStorage unavaliable');
			}
		};

		// remove object from storage by key
		this.remove = function(key){
			if(self.available()){
				localStorage.removeItem(key);
			}
			else{
				console.log('storage.remove failed, localStorage unavaliable');
			}
		};

		// clear all data in storage
		this.clear = function(){
			if(self.available()){
				localStorage.clear();
			}
			else{
				console.log('storage.clear failed, localStorage unavaliable');
			}
		};
	};

	overwatch.extend({ storage: new Storage() });

	return overwatch.storage;

});

!function(root, factory){

    factory(root, root.overwatch);

}(this, function(root, overwatch){

    function Blackout(){

        var blackout = this;
        var util = overwatch.util;

        var pos = 0;
        var isOpen = 0;
        var $root = $(root);
        var $body = $('body');
        var $elem = $('<div class="blackout" blackout />').appendTo($body);

        function setEvents(){
            $elem.on('click.blackout', function(event){
                event.stopPropagation();
                blackout.hide();
            });
            // $root.on('resize.blackout', _.throttle(function(){
            //     if(util.width() <= 768){
            //         blackout.hide();
            //     }
            // }, 100));
            //$root.on('keyup.blackout', function(event){
            //    if(event.which === 27){
            //        blackout.hide();
            //    }
            //});
        };

        function show(){
            if(!isOpen){
                isOpen = 1;
                $elem.trigger('show');
                $elem.toggleClass('open', true);
                setEvents();
                pos = $root.scrollTop();
                $body.css({ position: 'fixed', marginTop: -pos + 'px' });
            }
        };

        function hide(){
            if(isOpen){
                isOpen = 0;
                $elem.trigger('hide');
                $elem.toggleClass('open', false);
                $body.css({ position: '', marginTop: '' });
                $root.scrollTop(pos);
                $elem.off('click.blackout');
                pos = 0;
                //$root.off('keyup.blackout');
                //$root.off('resize.blackout');
            }
        };

        this.show = show;

        this.hide = hide;

        this.open = show;

        this.close = hide;

        this.on = function(){
            $elem.on.apply($elem, arguments);
        };

        this.off = function(){
            $elem.off.apply($elem, arguments);
        };

        this.one = function(){
            $elem.one.apply($elem, arguments);
        };

    };

    overwatch.extend({ blackout: new Blackout() });

    return overwatch.blackout;

});

!function(root, factory){

	factory(root, root.overwatch);

}(this, function(root, overwatch){

	var blackout = overwatch.blackout;

	function Lightbox(){

		var lightbox = this;

		var time = 200;
		var isOpen = 0;
		var $root = $(root);
		var $body = $('body');
		var $elem = $('<div class="lightbox" lightbox="main"></div>').appendTo($body);
		var $container = $('<div class="lightbox-container"></div>').appendTo($elem);
		var $header = $('<div class="lightbox-header"></div>').appendTo($container);
		var $body = $('<div class="lightbox-body"></div>').appendTo($container);
		var $content = $('<div class="lightbox-content"></div>').appendTo($body);
		var $prev = $('<a href="#" class="lightbox-prev"></a>').appendTo($body);
		var $next = $('<a href="#" class="lightbox-next"></a>').appendTo($body);
		var $footer = $('<div class="lightbox-footer"></div>').appendTo($container);
		var $close = $('<div class="lightbox-close"></div>').appendTo($body);

		function setEvents(){

			$elem.on('click.lightbox', function lightboxClick(event){
				if(event.target === $elem[0]) {
					lightbox.hide();
				}
				$elem.trigger('lightbox.background');
			});

			$close.one('click.lightbox', function closeButton(event){
				event.stopPropagation();
				lightbox.hide();
				$elem.trigger('lightbox.x');
			});

			$root.on('keyup.lightbox', function keyPress(event){

				var which = event.which;

				// if key matches prevent default
				if(/37|39|32|27/.test(which)){
					event.preventDefault();
				}

				// esc key - close modal
				if(which == 27){

					lightbox.hide();
					$elem.trigger('key.esc');

				// left arrow
				} else if(which == 37){

					$elem.trigger('prev');

				// right arrow
				} else if(which == 39){

					$elem.trigger('next');

				// space bar - if video exists pause or play
				} else if(which == 32){

					$elem.trigger('pause');
				}
			});
		};

		function setOptionalClasses(opts) {
			if(opts.size === 'fluid'){
				$elem.toggleClass('fluid', true);
			} else {
				$elem.toggleClass('fluid', false);
			}

			if(opts.controls){
				$body.toggleClass('m-controls', true);
			} else {
				$body.toggleClass('m-controls', false);
			}

			if(opts.loader) {
				$body.toggleClass('m-loader', true);
			} else {
				$body.toggleClass('m-loader', false);
			}

			if(opts.loader) {
				$body.toggleClass('m-loader', true);
			} else {
				$body.toggleClass('m-loader', false);
			}

			if(opts.media) {
				$container.toggleClass('m-media', true);
			} else {
				$container.toggleClass('m-media', false);
			}
		}

		function set(opts, callback){
			var defaults = {
				size: "",
				controls: false,
				loader: true,
				media: true,
				body: null,
				header: null,
				footer: null
			};

			var opts = _.isPlainObject(opts) ? _.assign({}, defaults, opts) : defaults;
			var callback = _.isFunction(opts) ? opts : _.isFunction(callback) ? callback : _.noop;
			var $html = $(opts.content || null);

			setOptionalClasses(opts);

			if(opts.body){
				var $bodyHtml;
				if(opts.media) {
					$bodyHtml = $(opts.body).addClass("lightbox-content m-media");
				} else {
					$bodyHtml = $('<div>', {
						"class": "lightbox-content",
						html: opts.body
					});
				}

				$content.remove();
				$content = $bodyHtml.appendTo($body);
			}

			if(opts.header){
				$header.html(opts.header);
			}

			if(opts.footer){
				$footer.html(opts.footer);
			}

			callback();
		};

		function show(){
			if(!isOpen){
				isOpen = 1;
				blackout.show();
				setEvents();
				$elem.toggleClass('open', true);
				$elem.trigger('show');
			}
			set.apply(null, arguments);
		};

		function hide(){
			if(isOpen){
				isOpen = 0;
				blackout.hide();
				$root.off('keyup.lightbox');
				$elem.toggleClass('open', false);
				$elem.trigger('hide');
				$container.off('click.lightbox');
			}
		};

		function empty(){
			$content.remove();
			$content = $('<div>');
			$header.empty();
			$footer.empty();
		};

		function init(){

			$prev.on('click.lightbox', function(event){
				event.preventDefault();
				$elem.trigger('prev');
			});

			$next.on('click.lightbox', function(event){
				event.preventDefault();
				$elem.trigger('next');
			});
		};

		this.set = set;

		this.show = show;

		this.hide = hide;

		this.open = show;

		this.close = hide;

		this.empty = empty;

		this.on = function(){
			$elem.on.apply($elem, arguments);
		};

		this.off = function(){
			$elem.off.apply($elem, arguments);
		};

		this.one = function(){
			$elem.one.apply($elem, arguments);
		};

		init();

	};

	overwatch.extend({ lightbox: new Lightbox() });

	return overwatch.lightbox;

});

!function(root, factory){

    factory(root, root.overwatch);

}(this, function(root, overwatch){

    var util = overwatch.util;
    var lightbox = overwatch.lightbox;

    // store api loaded state
	var uid = 0;
	var cache = {};
	var apiLoaded = 0;
	var apiLoading = 0;
	var apiError = 0;

	// buffer requests til api is loaded
	var apiBuffer = [];
	var errBuffer = [];

	// url strings
	var apiUrl = '//www.youtube.com/iframe_api/';
	var embedUrl = 'https://www.youtube.com/embed/';

	// default video player options
	var defaults = {
		id: null,
		states: {
			'-1': 'unstarted',
			'0': 'ended',
			'1': 'playing',
			'2': 'paused',
			'3': 'buffering',
			'5': 'video-cued'
		},
		params: {
			autoplay: 1,
			autohide: 1,
			controls: 1,
			modestbranding: 1,
			showinfo: 1,
			version: 3,
			enablejsapi: 1,
			wmode: 'transparent',
			rel: 0
		},
		build: {
			$play: true,
			$poster: true,
			$video: true
		},
		templates: {
			$play: function(){
				var video = this;
                var $elem = $('<div>', {
                    addClass: 'play',
                    on: {
                        click: function(){
                            if(video.loaded){
        						video.player.playVideo();
        					} else {
                                video.one('ready', function(){
                                    video.player.playVideo();
                                });
                            }
                        }
                    }
                })
				return $elem;
			},
			$poster: function(){
				return $('<div class="poster">');
			},
			$video: function(){
                var video = this;
                var $elem = $('<iframe>', {
                    addClass: 'video',
                    attr: {
                        width: '100%',
                        height: '100%',
                        allowfullscreen: true,
                        allow: 'autoplay',
                        frameborder: 0,
                        src: embedUrl + video.id + '?' + $.param(video.opts.params)
                    }
                });
				return $elem;
			}
		}
	};

	function processApiBuffer(){
		for(var i = 0; i < apiBuffer.length; i++){
			apiBuffer[i]();
		}
		apiBuffer = [];
	};

	function processErrBuffer(){
		for(var i = 0; i < errBuffer.length; i++){
			errBuffer[i]();
		}
		errBuffer = [];
	};

	function loadIframeAPIScript(){

		if(!apiLoaded && !apiLoading && !apiError){

            apiLoading = 1;

            var script = $('<script>', {
                attr: {
                    async: true,
                    src: apiUrl,
                    type: 'text/javascript'
                }
            })[0];

            script.onerror = function(){
                apiLoaded = 0;
				apiError = 1;
				processErrBuffer();
            };

			// callback function when youtube api is ready
			window.onYouTubeIframeAPIReady = function(){

				apiLoaded = 1;
				apiLoading = 0;

				// process buffered requests
				processApiBuffer();
			};

            document.body.appendChild(script);
		}
	};

	/*
	* check if api is loaded, if not trigger load
	* store callbacks in buffer if not loaded
	*/
	function loadIframeAPI(done, err){

        var err = err || _.noop;
        var done = done || _.noop;

		// if api can't load run error
		if(apiError){

            err();

		// if loaded run callback
		} else if(apiLoaded){

			done();

		// if already loading push callback and error to buffers
		} else if(apiLoading){

			apiBuffer.push(done);
			errBuffer.push(err);

		// if not loaded or loading trigger load
		// and push callback and error to buffers
		} else {

			apiBuffer.push(done);
			errBuffer.push(err);
			loadIframeAPIScript();

		}
	};

	// video object constructor
	function YoutubeVideo(opts, done){

        var video = this;
        var done = done || _.noop;
        var opts = _.merge({}, defaults, opts);
        var vid = uid++;
        var elems = {};
        var $root = $(opts.elem);
        var state = null;

        function destroy(){
            $root.toggleClass(state, false);
            if(video.player.stopVideo){
        		video.player.stopVideo();
            }
            if(video.player.clearVideo){
        		video.player.clearVideo();
            }
            if(video.player.destroy){
        		video.player.destroy();
            }
            video.player = null;
    		video.$root.empty();
    		cache[vid] = null;
    	};

        function init(){

            var browser = util.browser();

            $root.toggleClass('loading', true);
            $root.toggleClass('unstarted', true);
            $root.toggleClass('m-mobile', util.mobile());
            $root.toggleClass('m-touch', util.touch());
            $root.toggleClass('m-edge', browser.edge);
            $root.toggleClass('m-ie', browser.ie);
            $root.toggleClass('m-chrome', browser.chrome);
            $root.toggleClass('m-safari', browser.safari);
            $root.toggleClass('m-gecko', browser.gecko);

            _.each(opts.build, function(bool, name){
                if(bool){
                    $root.append(elems[name] = opts.templates[name].call(video));
                }
            });

            loadIframeAPI(function(){

                video.player = new YT.Player(elems.$video[0], {

    				events: {

    					onReady: function(event){
    						video.loaded = 1;
    						video.loading = 0;
                            $root.toggleClass('loading', false);
                            $root.trigger('ready');
                            done(video);
    					},

    					onStateChange: function(event){
                            var newstate = opts.states[event.data];
    						if(state){
                                $root.toggleClass(state, false);
    						}
                            $root.toggleClass(newstate, true);
                            $root.trigger('stateChange', newstate);
    						video.state = state = newstate;
    					}
    				}
    			});

            });

            elems.$video.on('load', function(){
                $root.toggleClass('loading', false);
            });

            cache[vid] = video;

        };

        this.id = opts.id;
		this.loaded = 0;
		this.loading = 1;
		this.state = state;
        this.uid = vid;
        this.opts = opts;
        this.$root = $root;
        this.destroy = destroy;
        this.elems = elems;

        this.on = function(){
            $root.on.apply($root, arguments);
        };

        this.off = function(){
            $root.off.apply($root, arguments);
        };

        this.one = function(){
            $root.one.apply($root, arguments);
        };

        init();

	};

    function Video(){

        function create(opts, done){
            return new YoutubeVideo(opts, done);
        };

        function destroy(video){
            if(video.destroy){
                return video.destroy();
            }
        };

        function createAll(done){

            $('[video]').each(function(){

                create({
                    elem: this,
                    id: $(this).attr('video')
                }, done);

            });

        };

        function get(id){
            return cache[id];
        };

        function set(opts){
            return _.merge(defaults, opts);
        };

        function init(){

        };

        this.create = create;
        this.destroy = destroy;
        this.createAll = createAll;
        this.get = get;
        this.set = set;

        init();

    };

	loadIframeAPI();

    overwatch.extend({ video: new Video() });

    return overwatch.video;

});

/**
 * Hero Ability Showcase module
 */
!function(root, factory) {

	// amd
	if (typeof define === 'function' && define.amd){
		define('overwatch-ability-showcase', ['overwatch', 'jQuery'], factory);

	// node
	} else if (typeof exports === 'object'){
		module.exports = factory(require('overwatch', 'jQuery'));

	// browser global
	} else {
		root.overwatch['AbilityShowcase'] = factory(root.overwatch, root.jQuery);
	}

}(this, function(overwatch, $) {

	// inner element selectors
	var SELECTOR_ABILITY_NAME = '[data-js=abilityName]';
	var SELECTOR_ABILITY_BUTTON = '[data-js=abilityShowcaseButton]';
	var SELECTOR_ABILITY_BUTTON_LIST = '[data-js=ability-button-list]';
	var SELECTOR_PROGRESS_SVG = '[data-js=progress-svg]';

	// classes to be toggled
	var CLASS_IS_PLAYING = 'is-active';

	/**
	 * Ability Showcase
	 * @Constructor
	 * @param {string} showcase - Selector for this module's parent element
	 */
	function AbilityShowcase(showcase) {
		var $showcase = $(showcase);

		// cache elements
		this.$videos = $showcase.find('video');
		this.videos = this.$videos.get();
		this.$abilityName = $showcase.find(SELECTOR_ABILITY_NAME);
		this.$abilityButtons = $showcase.find(SELECTOR_ABILITY_BUTTON);
		this.$abilityButtonsList = $showcase.find(SELECTOR_ABILITY_BUTTON_LIST);
		this.$currentProgressSvg = null;
		this.currentVideo = null;

		// grab metadata from ability buttons
		this.abilities = getAbilityData(this.$abilityButtons);

		this.length = this.videos.length;

		this.currentIndex = 0;
		this.nextIndex = null;
	}

	/**
	 * Initializes this module for use.
	 *
	 * Adds video event handlers, button click event handlers, and plays the first video.
	 */
	AbilityShowcase.prototype.init = function init() {
		var self = this;

		// register video event handlers
		self.$videos.on('ended', function loadNext() {
			// play queued up video if exists, otherwise play next video
			self.play(self.getNextIndex());
		});
		self.$videos.on('playing', function updateProgressBar() {
			// animate fill progress circle, completing the animation within the total duration of the video
			var videoDurationMs = self.currentVideo.duration * 1000;
			self.$currentProgressSvg
				.velocity({
					strokeDashoffset: [ 0, 314 ]
				}, videoDurationMs, 'linear');
		});

		// queue up (preload) next video on half way mark of current video
		self.$videos.on('timeupdate', function queueNext() {
			// only preload next video if it hasn't already been queued + preloaded
			if (self.nextIndex === null && self.length > 1) {
				var progress = getMediaProgressDec(this);
				if (progress > 0.5) {
					self.queue(self.getNextIndex());
				}
			}
		});

		// register ability button video play triggers
		self.$abilityButtonsList.on('click', 'li', function handleAbilityButtonClick() {
            var i = $(this).index();
			self.play(i);
		});

		// initialize first video
		self.load(self.currentIndex);
		self.play(self.currentIndex);
	};

	AbilityShowcase.prototype.getNextIndex = function getNextIndex() {
		return this.nextIndex !== null ? this.nextIndex : this.currentIndex + 1;
	};

	/**
	 * Performs various DOM interactions to display a video's "play" state.
	 *
	 * @param {int} i - index of video to perform action upon
	 */
	AbilityShowcase.prototype.displayPlay = function displayPlay(i) {
		i %= this.length;
		var ability = this.abilities[i];

		this.$abilityName.text(ability.name);
		this.$abilityButtons.eq(i).addClass(CLASS_IS_PLAYING);
		this.$videos.eq(i).addClass(CLASS_IS_PLAYING);

		// cache these elements that are repeatedly looked up
		this.currentVideo = this.videos[i];
		this.$currentProgressSvg = this.$abilityButtons.eq(i).find(SELECTOR_PROGRESS_SVG);
	};

	/**
	 * Performs various DOM interactions to display a video's "stop" state.
	 *
	 * @param {int} i - index of video to perform action upon
	 */
	AbilityShowcase.prototype.displayStop = function displayStop(i) {
		i %= this.length;
		this.$abilityButtons.eq(i).removeClass(CLASS_IS_PLAYING);
		this.$videos.eq(i).removeClass(CLASS_IS_PLAYING);

		// stop progress circle animation
		this.$abilityButtons.eq(i).find(SELECTOR_PROGRESS_SVG)
			.velocity('stop')
			.velocity({
				strokeDashoffset: 314 // default stroke dash offset
			}, 0);
	};

	/**
	 * Plays a video by its index, updates the current video index, and presents
	 * a "play" interface.
	 *
	 * If no index is provided, will play the current video.
	 *
	 * @param {int} [i=this.currentIndex] - index of video to perform action upon
	 */
	AbilityShowcase.prototype.play = function play(i) {
		// stop whatever video may currently be playing
		this.stop(this.currentIndex);

		// play specified video, otherwise default to playing current video
		this.currentIndex = (i === undefined) ? this.currentIndex : (i % this.length);

		// reset this video's progress before playing
		this.reset(this.currentIndex);

		this._play(this.currentIndex);

		// clear the next video queue
		this.nextIndex = null;
	}

	/**
	 * Stops a video by its index and presents a "stop" interface.
	 *
	 * If no index is provided, will stop all videos.
	 *
	 * @param {int} [i] - index of video to perform action upon
	 */
	AbilityShowcase.prototype.stop = function stop(i) {
		// no specific video to stop, so stop them all
		if (i === undefined) { this._stopAll(); return; }

		i %= this.length;
		// TODO: ie11 breaks because of this? why?
		this.videos[i].pause();

		this.displayStop(i);
	};

	/**
	 * Resets a video by its index to its start state. This does not pause the video.
	 *
	 * @param {int} i - index of video to perform action upon
	 */
	AbilityShowcase.prototype.reset = function reset(i) {
		i %= this.length;
		// can only reset currenttime when video is ready (on certain browsers)
		// HAVE_ENOUGH_DATA - corresponds to 'canplay' media event
		if (this.videos[i].readyState === 4) {
			this.videos[i].currentTime = 0;
		}
	};

	/**
	 * Queues a video by its index.
	 *
	 * If a video is already queued, this function does nothing.
	 *
	 * @param {int} i - index of video to perform action upon
	 */
	AbilityShowcase.prototype.queue = function queue(i) {
		// another video already queued, exit
		if (this.nextIndex !== null) { return; }

		i %= this.length;
		this.nextIndex = i;

		// trigger preload
		this.load(i);
	};

	/**
	 * Loads a video by its index.
	 *
	 * @param {int} i - index of video to perform action upon
	 */
	AbilityShowcase.prototype.load = function load(i) {
		i %= this.length;
		this.videos[i].load();
	};

	/**
	 * Plays a video by its index and presents a "play" interface.
	 *
	 * @param {int} i - index of video to perform action upon
	 */
	AbilityShowcase.prototype._play = function _play(i) {
		i %= this.length;
		this.videos[i].play();

		this.displayPlay(i);
	};

	/**
	 * Stops all videos, regardless of their play state.
	 */
	AbilityShowcase.prototype._stopAll = function _stopAll() {
		for (var i = 0; i < this.length; i++) {
			this.stop(i);
		}
	};

	/**
	 * Gets the progress of a media element.
	 *
	 * @param {HTMLMediaElement} media
	 * @return {float} Decimal value (0.0 -> 1.0) representing media element progress
	 */
	function getMediaProgressDec(media) {
		return media.currentTime / media.duration;
	}

	/**
	 * Adapter function for retrieving ability data from ability buttons.
	 *
	 * @return {Array<Object>} Array of objects, each representing hero ability data.
	 */
	function getAbilityData($abilityButtons) {
		return $.map($abilityButtons, function adaptAbilityData(button) {
			var $button = $(button);
			return {
				name: $button.data('ability-name')
			};
		});
	}

	overwatch.extend({ AbilityShowcase: AbilityShowcase });
	return AbilityShowcase;

});

!function(root, factory){

    factory(root.overwatch);

}(this, function(overwatch){

    function Animate(){

        function slideInLeft($elem, opts){
            var opts = _.merge({ duration: 300, easing: 'easeOutCirc' }, opts);
            $elem.velocity({ translateX: ['+=100%', '-100%'], translateZ: 0 }, opts);
        };

        function slideOutLeft($elem, opts){
            var opts = _.merge({ duration: 300, easing: 'easeOutCirc' }, opts);
            $elem.velocity({ translateX: ['-=100%', 0], translateZ: 0 }, opts);
        };

        this.slideInLeft = slideInLeft;
        this.slideOutLeft = slideOutLeft;

    };

    overwatch.extend({ animate: new Animate() });

    return overwatch.animate;

});

;(function(root){
	var $ = root.$;
	$(".js-button-group").on("click", ".button", function(e){
		$(this).siblings().removeClass("is-active");
		$(this).addClass("is-active");
	})
})(window);
!function(root, factory) {
    root.overwatch['CarouselSplit'] = factory(root.overwatch, root.jQuery);
}(this, function(overwatch, $) {

    var CLASS_NAMES = {
        CAROUSEL: 'CarouselSplit',
        CAROUSEL_SLANTED_MODIFIER: 'CarouselSplit--slanted',
        CAROUSEL_ITEM: 'CarouselSplit-item',
        ACTIVE_STATE: 'is-active',
        PREVIOUS_ACTIVE: 'was-active',
        PRE_ACTIVE_STATE: 'is-pre-active',
        ANIMATION_COMPLETE: 'is-animation-complete'
    };
    var SELECTORS = {
        CAROUSEL: '[data-js-carousel-split]',
        CAROUSEL_ITEM: '.CarouselSplit-item',
        CAROUSEL_ITEM_INACTIVE: '.CarouselSplit-item:not(.is-active)'
    };
    var DURATIONS = {
        FADE: 100,
        RESIZE: 350,
        DELAY: 0,
        HOVER_DELAY_FAST: 200,
        HOVER_DELAY_SLOW: 300
    };
    var SIZING = {
        ACTIVE_FLEX_GROW: 4,
        ACTIVE_FLEX_GROW_RATIO: 0.95
    };
    var defaultOptions = {
        beforeFadeOut: _.noop,
        beforeResize: _.noop,
        afterFadeIn: _.noop,
        afterResize: _.noop,
        fadeOut: fadeOut,
        fadeIn: fadeIn,
        shrink: shrink,
        grow: grow,
        delaySlow: false
    };

    // Should be called first
    var init = function init(options) {
        options = _.merge(defaultOptions, options);
        var $carousels = $(SELECTORS.CAROUSEL);
        var isTouchDevice = overwatch.util.touch();
        var selectEventName = isTouchDevice
            ? 'click'
            : 'mouseenter'
        ;
        $carousels.each(function(index, carousel) {
            var $carousel = $(carousel);
            var $carouselItems = $carousel.find(SELECTORS.CAROUSEL_ITEM);
            var selectSlideHandler = isTouchDevice
                ? createSelectHandler($carousel, $carouselItems, options)
                : createHoverIntentHandler($carousel, $carouselItems, options)
            ;
            $carousel.on(
                selectEventName,
                SELECTORS.CAROUSEL_ITEM_INACTIVE, // event delegation
                selectSlideHandler
            );
            // hover intent handler needs to be cleaned up when it's used
            if (!isTouchDevice) {
                $carousel.on(
                    'mouseleave',
                    SELECTORS.CAROUSEL_ITEM_INACTIVE, // event delegation
                    hoverIntentCleanupHandler
                );
            }
        });
    };

    /**
     * Element fadeOut animation
     *
     * @param {jQuery} $element - jQuery element to apply animation to
     * @return {Promise} Promise resolved when animation completes
     */
    function fadeOut($element) {
        return $.Velocity
            .animate($element, {
                'opacity': 0
            }, {
                duration: DURATIONS.FADE,
                delay: DURATIONS.DELAY
            });
    };

    /**
     * Element fadeIn animation
     *
     * @param {jQuery} $element - jQuery element to apply animation to
     * @return {Promise} Promise resolved when animation completes
     */
    function fadeIn($element) {
        return $.Velocity
            .animate($element, {
                'opacity': 1
            }, {
                duration: DURATIONS.FADE
            });
    };

    /**
     * Element shrink animation
     *
     * @param {jQuery} $element - jQuery element to apply animation to
     * @return {Promise} Promise resolved when animation completes
     */
    function shrink($element) {
        return $.Velocity
            .animate($element, {
                'flexGrow': 1
            }, {
                duration: DURATIONS.RESIZE,
                delay: 50,
                easing: 'easeInOutCubic'
            });
    };

    /**
     * Element grow animation
     *
     * @param {jQuery} $element - jQuery element to apply animation to
     * @return {Promise} Promise resolved when animation completes
     */
    function grow($element) {
        return $.Velocity
            .animate($element, {
                'flexGrow': 4
            }, {
                duration: DURATIONS.RESIZE,
                delay: 50,
                easing: 'easeInOutCubic'
            });
    };

    function animateSlideCollapse($slide, $nextActiveSlide, options) {
        options.beforeFadeOut($slide, $nextActiveSlide, DURATIONS);
        return options.fadeOut($slide.find('.CarouselSplit-transparentContent'))
            .then(function () {
                options.beforeResize($slide, $nextActiveSlide, DURATIONS);
                options.shrink($slide);
            });
    }

    function animateSlideExpand($slide, $prevActiveSlide, options) {
        return options.grow($slide)
            .then(function () {
                options.afterResize($prevActiveSlide, $slide, DURATIONS);
                return options.fadeIn($slide.find('.CarouselSplit-transparentContent'))
            })
            .then(function () {
                options.afterFadeIn($prevActiveSlide, $slide, DURATIONS);
            });
    }

    function createSelectHandler($carousel, $carouselItems, options) {
        return function (event) {
            var $currentlyActiveSlide = $carouselItems.filter('.' + CLASS_NAMES.ACTIVE_STATE);
            var $nextActiveSlide = $(this);
            // Clear out active state for all carousel items
            $carouselItems.removeClass(CLASS_NAMES.ACTIVE_STATE);
            $carouselItems.removeClass(CLASS_NAMES.ANIMATION_COMPLETE);
            // Add active state for only selected item
            $nextActiveSlide.removeClass(CLASS_NAMES.PRE_ACTIVE_STATE);
            $nextActiveSlide.addClass(CLASS_NAMES.ACTIVE_STATE);
            // Add previous active state for previous active item
            $currentlyActiveSlide.addClass(CLASS_NAMES.PREVIOUS_ACTIVE);
            return animateSlideCollapse($currentlyActiveSlide, $nextActiveSlide, options)
                .then(function () {
                    return animateSlideExpand($nextActiveSlide, $currentlyActiveSlide, options)
                })
                .then(function () {
                    $currentlyActiveSlide.removeClass(CLASS_NAMES.PREVIOUS_ACTIVE);
                    $nextActiveSlide.addClass(CLASS_NAMES.ANIMATION_COMPLETE);
                });
        };
    }

    /**
     * Creates a "hover intent" handler which toggles classes on an
     * element corresponding to the "intent" of the user interacting
     * with the element. States include:
     *
     * TODO: this could be its own declarative component
     *
     * - a pre-active class indicating ambiguity in whether a user is
     *   intending to interact
     * - an active class added when a user is clearly intending to
     *   interact
     */
    function createHoverIntentHandler($carousel, $carouselItems, options) {
        var selectHandler = createSelectHandler($carousel, $carouselItems, options);
        // initialize previous animation promise (none on initial page load)
        var prevPromise = Promise.resolve();
        return function () {
            var $nextActiveSlide = $(this);
            var animate = selectHandler.bind(this);
            $carouselItems.removeClass(CLASS_NAMES.PRE_ACTIVE_STATE);
            $nextActiveSlide.addClass(CLASS_NAMES.PRE_ACTIVE_STATE);
            var timeoutId = setTimeout(function () {
                // we want to queue up the next animation after the previous
                // animation, to make ensure that the different animations
                // aren't clobbering each other
                prevPromise = prevPromise.then(animate);
            },
                options.delaySlow
                ? DURATIONS.HOVER_DELAY_SLOW
                : DURATIONS.HOVER_DELAY_FAST);
            // store timeout id on slide so it can be cancelled
            $nextActiveSlide.data('hover-intent-timeout-id', timeoutId);
        };
    }

    /**
     * Handler that cleans up state from "hover intent" handler.
     */
    function hoverIntentCleanupHandler(event) {
        var $exitedSlide = $(this);
        clearTimeout($exitedSlide.data('hover-intent-timeout-id'));
        $exitedSlide.removeClass(CLASS_NAMES.PRE_ACTIVE_STATE);
    }

    return {
        init: init
    };

});

!function(root, factory){

	factory(root, root.jQuery, root.overwatch);

}(this, function(root, $, overwatch){
	var carousel = {
		defaults: {
			numToShow: 1,
			numToSlide: 1,
			animationDuration: 500,
			autoScroll: false,
			timePerSlide: 5000,
			loop: true,
			pagination: true,
			slideWidth: 0,
			gutter:12			
		},
		item_width: 0,
		klass: "carousel",
		mask_klass: "carousel-mask",
		wrapper_klass: "carousel-wrapper",
		slide_klass: "carouse-slide",
		pagination_klass: "carousel-pagination",
		page_klass: "carousel-page",
		init: function(element, options) {
			this.options = _.merge({}, this.defaults, options);
			var options = this.options;
			this.element = element;
			this.setup();
			this.calculateDimensions();
			this.addElements();
			this.setupEvents();
			if (options.autoScroll) {
				this.startSliding();
			}
		},
		setup: function() {
			var options = this.options;
			this.element.addClass(this.klass);
			this.defineObjects();
			//this.determineStatus();
			if (options.pagination) {
				this.pagination = this.buildPagination();
			}
			if (options.slideWidth) {
				this.item_width = options.slideWidth;
			}
		},
		defineObjects: function() {
			var options = this.options;
			this.wrapper = this.element.children("ul").addClass(this.wrapper_klass);
			this.items = this.wrapper.children("li");
			this.pages = Math.ceil(this.items.length / options.numToSlide);
			this.mask = $("<div/>").addClass(this.mask_klass);
			this.duration = options.animationDuration;
		},
		buildPagination: function() {
			var options = this.options,
				i = 1,
				pageContainer = $("<ul/>").attr("class", this.pagination_klass),
				html = "";
			while (i <= (this.pages - (options.numToShow - options.numToSlide))) {
				html += '<li class="' + this.page_klass;
				if (i === 1) {
					html += ' is-active'
				}
				html += '" data-page="' + i + '"';
				html += ">&nbsp</li>";
				i++;
			}
			pageContainer.html(html);
			return pageContainer;
		},
		calculateDimensions: function() {
			var options = this.options,
				self = this;

			this.items.addClass(self.slide_klass);
			
			if (options.numToShow === 1) {
				this.items.css("margin", 0);
			} else {
				this.items.css("margin", "0 "+options.gutter+"px");
			}
			if (this.item_width === 0) {
				this.item_width = this.items.first().outerWidth(true);
			}
			this.maxHeight = this.items.first().outerHeight(true)
			this.mask.css({
				width: this.item_width * options.numToShow,
				height: this.maxHeight
			});
			this.wrapper.css("width", this.item_width * this.items.length);
		},
		addElements: function() {
			var options = this.options;

			this.mask = this.wrapper.wrap(this.mask).parent();
			if (options.pagination) {
				this.element.append(this.pagination);
			}
		},
		setupEvents: function() {
			this.element.on("click", "." + this.page_klass, {self: this}, this.pageHandler);
		},
		pageHandler: function(event) {
			var self = event.data.self,
				item = $(this),
				options = self.options;

			event.preventDefault();
			self.gotoPage = item.data("page");
			self.slide();
		},
		slide: function(page, duration) {
			var self = this;
			
			this.stopSliding();
		  
			if (page && typeof page === "number") {
				this.gotoPage = page;
			}
			if (typeof duration === "number") {
				this.duration = duration;
			}
			this.slideAmount = this.getSlideAmount();

			this.wrapper.velocity({
				left: this.slideAmount
			}, this.duration, function() {
				self.callback()
			});
		},
		callback: function() {
			var options = this.options;
			if (options.pagination) {
				var items = this.pagination.find("li");
				items.removeClass("is-active");
				var item = items.get(this.gotoPage - 1);
				$(item).addClass("is-active");
			}
			this.duration = options.animationDuration;
		},
		getSlideAmount: function() {
			var options = this.options;
			return -(this.item_width * options.numToSlide * (this.gotoPage - 1));
		},
		startSliding: function(time_to_show) {
			var self = this,
				options = self.options;
			if (time_to_show && typeof time_to_show === "number") {
				options.timePerSlide = time_to_show
			}
			this.interval = setInterval(function() {
				self.gotoPage++;
				self.slide();
			}, options.timePerSlide)
		},
		stopSliding: function() {
			clearInterval(this.interval)
		},
	};

	overwatch.extend({ carousel: carousel });
});
;(function() {
	$.fn.dropdown = function() {
		return this.each(function() {
			var dd, span, val, $this, klass, select = this;
			$this = $(select);
			dd = $("<div />", {
				"class":"dropdown",
				style:"width:"+$this.outerWidth()+"px"
			});
			klass = $this.attr("class") ? $this.attr("class").replace("dropdown-select-element","") : "";
			dd.addClass(klass);
			$this.removeClass(klass);
			dd = $this.wrap(dd).parent();
			val = $('option:selected', select).text();
			span = $("<span />", {
				"class":"dropdown-text",
				text:val
			}).prependTo(dd);
			$this.addClass("dropdown-select-element");
			$this.css('height', dd.outerHeight());
			$this.on("change",function() {
		    	val = $('option:selected', select).text();
				span.text(val);
			});
		});
	};
})(jQuery);

!function(root, factory){

	factory(root, root.jQuery, root.overwatch);

}(this, function(root, $, overwatch){
    var circles = [];
    var endorsementIcon = {
        init: function() {
            this.elements = $('[data-js="endorsement-border"]');
            var _self = this;
            this.elements.each(function(index) {
                var value = parseFloat($(this).data('value'));
                var id = $(this).data("id");
                circles[index] = {};
                circles[index].id = id;
                circles[index].value = value;

                if(index === 0) {
                    circles[index].transform = 0;
                } else {
                    circles[index].transform = _self.getTransform(circles[index-1].value, circles[index-1].transform)
                }
                $(this).css({
                    'stroke-dasharray': _self.getDashArray(value) + ' 100',
                    'transform': 'rotate(' + circles[index].transform + 'deg)'
                });
            });
        },
        getDashArray: function getDashArray(value) {
            return ( value * 100 ) -1;
        },
        getTransform: function getTransform(value, prev) {
            prev = prev || 0;
            return ( value * 360 ) + prev;
        }
    };

    overwatch.extend({ endorsementIcon: endorsementIcon });
});


!function(root, factory) {
	root.overwatch['EventMapCarousel'] = factory(root.overwatch, root.jQuery);
}(this, function(overwatch, $) {

	var CLASS_NAMES = {
		CAROUSEL: 'EventMapCarousel',
		CAROUSEL_SLANTED_MODIFIER: 'EventMapCarousel--slanted',
		CAROUSEL_ITEM: 'EventMapCarousel-item',
		HIGHLIGHT_MODIFIER: 'EventMapCarousel-item--highlighted',
	};
	var SELECTORS = {
		CAROUSEL: '[data-js-carousel-split]',
		CAROUSEL_ITEM: '.EventMapCarousel-item',
	};

	// Should be called first
	function init() {
		var $carousels = $(SELECTORS.CAROUSEL);

        $carousels.each(function(index, carousel) {
            var $carousel = $(carousel);
            var $carouselItems = $carousel.find(SELECTORS.CAROUSEL_ITEM);
            $carousel.on(
                'mouseenter click',
                SELECTORS.CAROUSEL_ITEM, // event delegation
                createSelectHandler($carousel, $carouselItems)
            );
        });
	}

	function createSelectHandler($carousel, $carouselItems) {
		return function(event) {
			// Clear out highlighted class for all carousel items
			$carouselItems.removeClass(CLASS_NAMES.HIGHLIGHT_MODIFIER);
			// Add highlighted class for only selected item
			$(this).addClass(CLASS_NAMES.HIGHLIGHT_MODIFIER);
		};
	}

	return {
		init: init
	};

});

!function(root, factory){

	factory(root, root.overwatch);

}(this, function(root, overwatch){

	var util = overwatch.util;
	var lightbox = overwatch.lightbox;
	var video = overwatch.video;
	var messages = root.messages;

	var gallery_defaults = {
		elem: null
	};

	var media_defaults = {
		id: null,
		elem: null,
		data: {},
		gallery: null,
		index: null,
		result: null
	};

	//Used by Media to generate the html Header for the gallery
	function header(media){
		if(media.gallery){
			return [
				$('<h1>', {
					addClass: 'gallery-title',
					html: media.data.categoryName
				}),
				$('<p>', {
					addClass: 'gallery-index',
					html: media.index + 1 + ' / ' + media.gallery.length
				})
			];
		}
	};

	//Used by Media to generate the html Footer for the gallery
	function footer(media){
		if(media.type == 'wallpaper'){

			return $('<div>', {
				addClass: 'gallery-sub-content row m-' + media.type,
				html: (function(){
					var results = [];
					_.each(media.data.wallpaper, function(url, key){
						results.push($('<a>', {
							addClass: 'column xs-6 md-4 lg-2 wallpaper-icon m-' + key.toLowerCase(),
							attr: {
								href: url,
								target: '_blank'
							},
							html: [
								$('<span>', { html: messages.wallpaper[key].title }),
								$('<span>', { html: messages.wallpaper[key].dimensions })
							]
						}));
					});
					return results;
				}())
			});

		} else {

			return $('<p>', {
				addClass: 'gallery-name',
				html: media.data.name
			});

		}
	};

	//Sets up click handlers on individual media elements to open the related Gallery.
	//Currently tightly coupled to the MediaGallery but also to the on-page implementation.
	function Media(opts){

		var media = this;
		var opts = _.merge({}, media_defaults, opts);
		var item = opts.data;
		var type = item.type.toLowerCase();
		var $elem = $(opts.elem);
		var gallery = opts.gallery;

		function attach(){

			if(type == 'youtube'){

				var $video = $('<div video>');

				media.video = video.create({ elem: $video, id: item.youtubeId }, function(video){
					video.player.playVideo();
				});

				lightbox.set({ body: $video, header: header(media), footer: footer(media), controls: media.gallery.length > 1 });



			} else if(type == 'video'){

				var $div = $('<div>', {
					addClass: 'gallery-item m-' + type + ' m-' + media.data.category,
				});
				var $video = $('<video>', {
					attr: {
						autoplay: '',
						controls: ''
					}
				});
				$video.append($('<source>', {
						attr: {
								type: 'video/webm',
								src: item.videoWebm
						}
				}));
				$video.append($('<source>', {
						attr: {
								type: 'video/mp4',
								src: item.videoMp4
						}
				}));
				$div.append($video);

				lightbox.set({ body: $div, header: header(media), footer: footer(media), controls: media.gallery.length > 1 });

			} else if(type == 'pdf' || type == 'link'){

				var win = root.open(item.url, '_blank');

				if(win){
					win.focus();
				}

			} else {
				var $div = $('<a>', {
					addClass: 'gallery-item m-' + type + ' m-' + media.data.category,
					attr: {
						href: item.url || item.wallpaper.urlStandard,
						target: '_blank'
					},
					css: {
						backgroundImage: 'url(' + (item.url || item.wallpaper.urlStandard) + ')'
					}
				});

				lightbox.set({ body: $div, header: header(media), footer: footer(media), controls: media.gallery.length > 1 });

			}

		};

		function detach(){

			if(media.data.type == 'youtube'){

				if(media.video){
					media.video.destroy();
				}
				media.video = null;

			}

			lightbox.empty();

		};


		function init(){

			$elem.on('click', '[data-js=media-gallery-content]', function(event){
				if(/youtube|pdf|link/.test(type) && (util.mobile() || util.touch())){

				} else {
					event.preventDefault();
					$elem.trigger('open');
				}
			});

		};

		this.attach = attach;
		this.detach = detach;
		this.data = opts.data;
		this.index = opts.index;
		this.id = opts.id;
		this.gallery = opts.gallery;
		this.$elem = $elem;
		this.type = type;

		this.on = function(){
			$elem.on.apply($elem, arguments);
		};

		this.off = function(){
			$elem.off.apply($elem, arguments);
		};

		this.one = function(){
			$elem.one.apply($elem, arguments);
		};

		init();

	};

	//UI component
	function MediaGallery(opts){

		var gallery = this;
		var cache = {};
		var results = [];
		var elems = {};
		var opts = _.merge({}, gallery_defaults, opts);
		var $elem = $(opts.elem);
		var active = null;
		var uid = 0;
		var isOpen = 0;

		function setEvents(){
			lightbox.on('prev', prev);
			lightbox.on('next', next);
			lightbox.on('pause', pause);
			lightbox.on('hide', close);
		};

		function add(media_opts){
			var media;
			if(!cache[media_opts.id]){
				_.merge(media_opts, {
					index: uid++,
					elem: (media_opts.elem || elems[media_opts.id]),
					gallery: gallery
				});
				media = cache[media_opts.id] = new Media(media_opts);
				if(media.type !== 'pdf'){
					media.result = results.push(media) - 1;
				}
				media.on('open', function(event){
					open(media);
				});
				gallery.length++;
			}
		};

		function get(media){
			return media instanceof Media ? media : (cache[media] || results[media]);
		};

		function to(media){
			var media = get(media);
			if(active){
				active.detach();
			}
			if(media){
				active = media;
				active.attach();
			}
			$(document.body).trigger("ow.mediagallery.open", {id: media.id});
		};

		function open(media){
			var media = get(media);
			to(media);
			if(media.type !== 'pdf' && media.type !== 'link'){
				if(!isOpen){
					gallery.isOpen = isOpen = 1;
					setEvents();
					lightbox.open({ controls: results.length > 1 });
				}
			}
		};

		function close(){
			if(active){
				active.detach();
			}
			if(isOpen){
				gallery.isOpen = isOpen = 0;
				lightbox.off('prev', prev);
				lightbox.off('next', next);
				lightbox.off('pause', pause);
				lightbox.off('hide', close);
			}
			$(document.body).trigger("ow.mediagallery.close", {id:opts.id});
		};

		function prev(){
			var prev = active.result > 0 ? active.result - 1 : results.length - 1;
			to(results[prev]);
		};

		function next(){
			var next = active.result < results.length - 1 ? active.result + 1 : 0;
			to(results[next]);
		};

		function pause(){
			var player = active.video.player;
			if(player){
				if(active.video.state === 'playing'){
					player.pauseVideo();
				} else {
					player.playVideo();
				}
			}
		};

		function init(){

			$elem.find('[data-media-id]').each(function(){
				var id = $(this).data('mediaId');
				elems[id] = this;
			});

		};

		this.add = add;
		this.prev = prev;
		this.next = next;
		this.pause = pause;
		this.close = close;
		this.open = open;
		this.to = to;
		this.get = get;
		this.length = 0;
		this.isOpen = 0;

		init();

	};

	//app logic for creating multiple MediaGalleries per media category
	function Gallery(){

		var uid = 0;
		var cache = {};

		function create(opts){
			opts.uid = uid++;
			return cache[opts.id] = new MediaGallery(opts);
		};

		function get(id){
			return cache[id];
		};

		function init(){
			$('[data-js-media-gallery]').each(function(){
				create({ elem: this, id: $(this).data('js-media-gallery') });
			});
		};

		this.create = create;
		this.get = get;

		init();

	};

	overwatch.extend({ Media: Media, gallery: new Gallery() });

	return overwatch.gallery;

});

!function(root, factory) {
	factory(root.overwatch);
}(this, function(root) {

	$.extend( jQuery.easing, {
		easeOutCirc: function(x, t, b, c, d){
			return c * Math.sqrt(1 - (t=t/d-1)*t) + b;
		}
	});

	function MenuScroll() {

		function init(options) {
			var timeToHideMs = options.timeToHideMs;
			var menu = options.menuSelector;

			// Hide bar after delay.
			setTimeout(function() {
				$(menu).addClass("is-menu-hidden");
			}, timeToHideMs);

			// Highlight first positioned menu option
			var sections = $("section");
			var firstSection = $(sections[0]).attr('id');
			$(menu + ' .' + firstSection).addClass("active");
			// Set up scrollspy and smooth scroll behavior.
			$(window).on('scroll', function() {
				requestAnimationFrame(
					function() {
						updateSideMenu(menu);
					}
				);
			});
			$(window).on('touchmove', function() {
				requestAnimationFrame(
					function() {
					updateSideMenu(menu);
				});
			});
			$(menu + " li a").smoothScroll({ easing: "easeOutCirc", speed: 300, offset: -72, beforeScroll: function(e) {
				var scrollOffset = $(e.scrollTarget).data('scroll-offset');
				if(typeof scrollOffset !== 'undefined') {
					e.offset += parseInt(scrollOffset);
				}
			}});
		}

		function updateSideMenu(menu) {
			$(menu + " li").removeClass("active");

			var jWindow = $(window);
			var windowDimensions = {
				top: jWindow.scrollTop(),
				left: jWindow.scrollLeft(),
				right: jWindow.scrollLeft() + jWindow.width(),
				bottom: jWindow.scrollTop() + jWindow.height()
			};

			var sections = $("section");
			var lastFoundIndex = 0;
			for (var i = 0; i < sections.length; i++) {
				if (isSectionVisible(sections[i], windowDimensions)) {
					lastFoundIndex = i;
				}
			}
			$(menu + " ." + $(sections[lastFoundIndex]).attr("id")).addClass("active");
		}

		function isSectionVisible(section, wd) {
			var element = $(section);
			var elTop = element.offset().top;
			return wd.top + 73 >= elTop;
		}

		return {
			init: init
		}

	};

	return overwatch.extend({ menuScroll: new MenuScroll() })
});

!function (root, factory) {

    factory(root, root.jQuery, root.overwatch);

}(this, function (root, $, overwatch) {


    var notification = {
        init: function() {
            this.showNotificitions();
            this.setupDismissmal();
        },
        showNotificitions: function() {
            $('[data-js=notification]').each(function() {
                var id = $(this).data('id');
                var cookie = root.cookie.get(id);
                if( !(cookie && cookie === "dismissed") ){
                    $(this).show();
                }
            });
        },
        setupDismissmal: function() {
            $('[data-js=notification-dismiss]').on("click", function(event) {
                var id = $(this).closest('[data-js=notification]').hide().data('id');
                cookie.set(id, "dismissed", {
                    expires: 30
                });
            });
        }
    };
    overwatch.extend({ notification: notification });
});

/**
 * Progress module
 */
!function(root, factory) {

	// amd
	if (typeof define === 'function' && define.amd){
		define('overwatch-progress', ['overwatch', 'jQuery'], factory);

	// node
	} else if (typeof exports === 'object'){
		module.exports = factory(require('overwatch', 'jQuery'));

	// browser global
	} else {
		root.overwatch['Progress'] = factory(root.overwatch, root.jQuery);
	}

}(this, function(overwatch, $) {


	$('[data-js=progressBar]').each(function (i, progress) {
		var $progress = $(progress);
		var percent = parseFloat($progress.data('overwatch-progress-percent'));
		var percentCss = ((1 - percent) * 100) + '%';
		var isAnimated = $progress.hasClass('m-animated');

		if (percentCss === '0%') {
			//jQuery/velocity does not like 0%
			percentCss = 0;
		}

		if (isAnimated) {
			$progress.find('[data-js=bar]')
				.velocity({
					right: percentCss
				}, {
					easing: 'ease',
					duration: 2000
				});
		} else {
			$progress.find('[data-js=bar]').css('right', percentCss);
		}
	});

});

!function(root, factory){

    factory(root, root.overwatch);

}(this, function(root, overwatch){

    var util = overwatch.util;
    var lightbox = overwatch.lightbox;
    var storage = overwatch.storage;
    var datalayer = root.dataLayer;
    var location = root.location.search;

    var now = Math.floor(Date.now()/1000);
    var cache = storage.get('promo') || {};

    var promo_defaults = {
        end: null,
        start: null,
        elem: null,
        id: null,
        count: 0
    };

    function save(){
        return storage.set('promo', cache);
    };

    function set(promo){
        cache[promo.id] = promo;
        save();
    };

    function Promo(opts){

        var promo = this;
        var opts = _.defaults(opts, promo_defaults);
        var $root = $(root);
        var isOpen = 0;

        function check(){
            return opts.start <= now && opts.end > now;
        };

        function setEvents(){

            $root.on('resize.promo', _.throttle(function(){
                if(util.width() < 768){
                    close();
                }
            }, 32));

            lightbox.one('lightbox.x.promo', function() {
                if(datalayer){
                    datalayer.push({ 'event': 'overlay-dismiss', 'analytics.eventPlacement': 'X' });
                }
            });
            lightbox.one('lightbox.background.promo', function() {
                if(datalayer){
                    datalayer.push({ 'event': 'overlay-dismiss', 'analytics.eventPlacement': 'Background' });
                }
            });
            lightbox.one('key.esc.promo', function() {
                if(datalayer){
                    datalayer.push({ 'event': 'overlay-dismiss', 'analytics.eventPlacement': 'Escape' });
                }
            });
            lightbox.one('hide.promo', function(){
                close();
            });
        };

        function removeEvents(){
            $root.off('resize.promo');
            lightbox.off('hide.promo');
		//lightbox.off('lightbox.x.promo lightbox.background.promo key.esc.promo');
        };

        function open(){
            if(!isOpen){
                isOpen = 1;
                promo.count++;
                set(promo);
                setEvents();
                lightbox.open({ body: opts.elem });
            }
        };

        function close(){
            if(isOpen){
                isOpen = 0;
                removeEvents();
                lightbox.close();
                lightbox.empty();
            }
        };

        function init(){
            set(promo);
        };

        this.start = opts.start;
        this.end = opts.end;
        this.elem = opts.elem;
        this.id = opts.id;
        this.open = open;
        this.close = close;
        this.check = check;
        this.count = opts.count;

        init();

    };

    function Promos(){

        var promos = {};

        function get(id){
            return promos[id];
        };

        function create(opts){

            var $elem = $(opts.elem);
            var id = opts.id || $elem.attr('promo');

            if(!promos[id]){

                var promo = new Promo({
                    elem: opts.elem,
                    id: id,
                    start: opts.start || $elem.attr('promo-start'),
                    end: opts.end || $elem.attr('promo-end'),
                    count: cache[id] ? cache[id].count : 0
                });

                promos[id] = promo;
            }

        };

        function init(){

            $('[promo]').each(function(){
                create({ elem: this });
            });

            if(!util.mobile() && util.width() > 768 && !/promo=false/.test(location)){

                _.find(promos, function(o){
                    if((o.count < 1 && o.check()) || window.location.hash.substr(1) === 'showpromo'){
                        o.open();
                        if(datalayer){
                            datalayer.push({ 'event': 'overlay.load' });
                        }
                        return true;
                    }
                });

            }

        };

        this.get = get;
        this.create = create;

        init();

    };

    overwatch.extend({ promo: new Promos() });

    return overwatch.promo;

});

!function (root, factory) {

    factory(root, root.jQuery, root.overwatch);

}(this, function (root, $, overwatch) {

    var slideout = {
        cache: {},
        init: function () {
            var self = this;
            var slideoutContainers = $('[data-js="slideout-container"]');
            this.slideoutHandles = $('[data-js="slideout-handle"]');
            slideoutContainers.each(function () {
                var $this = $(this);
                self.cache[$this.data("slideoutId")] = {
                    element: $this
                };
                //When this class is first added, don't use the transition so the container doesn't disappear over the course of the animation duration
                $this.addClass("Slideout-container Slideout-container--noTransition");
                $this.removeClass("Slideout-container--noTransition");
            });
            this.slideoutHandles.each(function () {
                var $this = $(this);
                var text = $this.text();
                var slideoutInstance = self.cache[$this.data("slideoutId")];
                slideoutInstance.openPrompt = text;
                slideoutInstance.closePrompt = $this.data("slideoutCloseText");
            });
            this.setupEventHandlers();
        },
        setupClickEventHandler: function () {
            var self = this;
            this.slideoutHandles.on("click", function (e) {
                e.preventDefault();
                var $this = $(this);
                var isOpen = $this.hasClass("is-active");
                var id = $this.data("slideoutId");
                var slideoutInstance = self.cache[$this.data("slideoutId")];
                $this.toggleClass("is-active");
                if (isOpen) {
                    if (slideoutInstance.closePrompt) {
                        $this.text(self.cache[id].openPrompt);
                    }
                    self.closeSlideout(id);
                } else {
                    if (slideoutInstance.closePrompt) {
                        $this.text(self.cache[id].closePrompt);
                    }
                    self.openSlideout(id);
                }
            });
        },
        setupResizeEventHandler: function () {
            var self = this;
            $(window).on("resize", overwatch.util.debounce(function () {
                for (key in self.cache) {
                    if (self.cache[key].element.hasClass("is-open")) {
                        self.updateSlideoutHeight(key);
                    }
                }
            }));
        },
        setupEventHandlers: function () {
            this.setupClickEventHandler();
            this.setupResizeEventHandler();
        },
        openSlideout: function (id) {
            var slideoutHandler = $('[data-js="slideout-handle"][data-slideout-id="' + id + '"]');
            slideoutHandler.addClass("is-active");
            var slideoutContainer = this.cache[id].element;
            slideoutContainer.addClass("is-open");
            slideoutContainer.one("transitionend", function(event) {
                $(document.body).trigger("slideout:open", {event:event, id: id});
            });
            this.updateSlideoutHeight(id);
        },
        closeSlideout: function (id) {
            var slideoutHandler = $('[data-js="slideout-handle"][data-slideout-id="' + id + '"]');
            slideoutHandler.removeClass("is-active");
            var slideoutContainer = this.cache[id].element;
            slideoutContainer.removeClass("is-open");
            slideoutContainer.one("transitionend", function(event) {
                $(document.body).trigger("slideout:close", {event:event, id: id});
            });
            slideoutContainer.css("maxHeight", "");
        },
        updateSlideoutHeight: function (id) {
            var slideoutContainer = this.cache[id].element;
            var originalHeight = slideoutContainer.get(0).scrollHeight;
            slideoutContainer.css("maxHeight", originalHeight);
        }
    };

    overwatch.extend({ slideout: slideout });
});

/**
 * Spotlight component
 */
!function(root, factory) {

    factory(root.overwatch, root.jQuery);

}(this, function(overwatch, $) {

	var HEADER_HOOK = 'spotlight-header';
	var IMAGE_HOOK = 'spotlight-image';
	var CAPTION_HOOK = 'spotlight-caption';
	var HEADER_DATA = 'spotlightHeader';
	var IMAGE_DATA = 'spotlightImage';
	var CAPTION_DATA = 'spotlightCaption';
	var LIST_HOOK = 'spotlight-list';
	var ACTIVATOR_HOOK = 'spotlight-activator';
	var ACTIVE_CLASS = "is-active";
	var util = overwatch.util;
	var triggered = false;

	function Spotlight(spotlight, enableOnMobile) {
		var self = this;

		this.$spotlight = $(spotlight);
		this.id = this.$spotlight.data("id");
		this.$spotlightList = $("[data-js=" + LIST_HOOK + "][data-id=" + this.id + "]");
		this.$image = this.$spotlight.find('[data-js=' + IMAGE_HOOK + ']');
		this.$header = this.$spotlight.find('[data-js=' + HEADER_HOOK + ']');
		this.$caption = this.$spotlight.find('[data-js=' + CAPTION_HOOK + ']');
		this.$activators = this.$spotlightList.find("[data-js=" + ACTIVATOR_HOOK + "]");

		// warn about missing expected inner elements
		if(!this.id) {
			console.warn(this.$spotlight + " is missing an id. Please add the data-id attribute to the splotlight-list and spotlight");
		}
		if (this.$header.length === 0) {
			console.warn('Spotlight could not find a header element inside: ' + spotlight);
		}
		if (this.$image.length === 0) {
			console.warn('Spotlight could not find a holder element inside: ' + spotlight);
		}

		this.preselectSpotlight(this.$spotlightList);

		//Don't initialize for mobile;
		var isMobile = ( util.mobile() && util.touch() );
		if(enableOnMobile || !isMobile) {
			this.setupEventHandlers();
		}
	}

	Spotlight.prototype.preloadSpotlightImages = function() {
		var i, len, $this_activator = null, url, $activators;
		$activators = this.$activators;
		for (i=0,len=$activators.length; i<len; i++) {
			$this_activator = $activators.eq(i);
			url = $this_activator.data(IMAGE_HOOK);
			url = encodeURI(url);
			$('<img/>').attr('src', url).load(function success(event) {
				// prevent memory leaks
				$(this).remove();
			});
		}
	}

	Spotlight.prototype.preselectSpotlight = function($spotlightList) {
		var active = $spotlightList.find("[data-js=" + ACTIVATOR_HOOK + "].is-active");
		this.loadData(active);
	}

	Spotlight.prototype.setupEventHandlers = function() {
		var self=this, $element, name, url, caption;
		this.$spotlightList.on('mouseenter.spotlight', "[data-js=" + ACTIVATOR_HOOK + "]", function(event) {
			$element = $(event.currentTarget);
			self.$activators.removeClass(ACTIVE_CLASS);
			$element.addClass(ACTIVE_CLASS);
			self.loadData($element);
			if(!triggered) {
				self.preloadSpotlightImages();
			}
			triggered = true;
		});
    }

    Spotlight.prototype.paragraphs = function(string, unescape, delimiter) {
        let result = '', lines;
        delimiter = delimiter || /<br ?\/?>/gi;
        lines = string.split(delimiter);
        lines.forEach(function(line) {
            if (unescape) {
                result += '<p>' + window.unescape(line) + '</p>';
            } else {
                result += '<p>' + line + '</p>';
            }
        });
        return result;
    };

	Spotlight.prototype.setHeader = function setHeader(text) {
		this.$header.text(text);
	};

	Spotlight.prototype.setCaption = function setCaption(text) {
		this.$caption.html(this.paragraphs(text));
	};

	/**
	 * Performs an XHR to retrieve the specified image.
	 * @param url [String] - image url
	 * @param cb [Function] - callback on image load completion
	 */
	Spotlight.prototype.loadData = function loadImage($element) {
		var self=this, data, name, url, caption;
		var data = $element.data();
		url = data[IMAGE_DATA];
		url = encodeURI(url);
		header = data[HEADER_DATA];
		caption = data[CAPTION_DATA];
		self._setImage(url);
		self.setHeader(header);
		self.setCaption(caption);
	};

	/**
	 * Performs DOM manipulation necessary to update spotlight image.
	 * @param url [String] - image url
	 */
	Spotlight.prototype._setImage = function setImage(url, cb) {
		this.$image.css('background-image', 'url(' + encodeURI(url) + ')');
		if (typeof cb === "function") { cb(); }
	};

	Spotlight.prototype._startTransition = function startTransition(cb) {
		this.$spotlight
		.velocity('stop')
		.velocity({
			opacity: 0
		}, {
			duration: 100,
			easing: 'easeOutQuad',
			complete: function() {
				if(typeof cb === "function") { cb() }
			}
		});
	};

	Spotlight.prototype._endTransition = function endTransition(cb) {
		this.$spotlight
		.velocity({
			opacity: [ 1, 0 ]
		}, {
			duration: 100,
            easing: 'easeOutQuad',
			complete: function() {
				if(typeof cb === "function") { cb() }
			}
		});
	};

    overwatch.extend({ Spotlight: Spotlight });

	return Spotlight;

});

!function(root, factory){

    factory(root.overwatch);

}(this, function(overwatch){

    // tag elements/ modules
    function Tag(attr, items, opts){

        var tag = this;

        // hash table for elements by
        // normalized attribute value
        var cache = {};

        // hash table for callbacks
        var cbmap = {};

        // local storage helper
        var storage = overwatch.storage;

        // default rule to parse
        // for triggering callbacks
        function defaultRule(){
            return this.exec < 1 ? true : false;
        };

        // helper to normalize key names
        function toCamelCase(string){
            return string.replace(/-([a-z])/g, function(g){
                return g[1].toUpperCase();
            });
        };

        // helper to normalize attribute selector
        function fromCamelCase(string){
            return string.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
        };

        // return local storage key string
        function storageKey(){
            return ['tags', toCamelCase(attr)].join('.');
        };

        // transform tag item to be ready
        // for serialization to localstorage
        function storageItem(item){
            return {
                created: item.created,
                exec: item.exec
            };
        }

        // create a cache item from a node
        // and previously stored object
        function cacheItem(node, prev){
            return {
                $elem: $(node),
                created: prev && prev.created || new Date().getTime(),
                exec: prev && prev.exec || 0
            };
        };

        // return the stored data for this selector
        function getStorage(){
            return storage.get(storageKey()) || {};
        };

        // set the stored data for this selector
        function setStorage(){
            var obj = getStorage();
            var keys = Object.keys(cache);
            for(var i = 0; i < keys.length; i++){
                var item = cache[keys[i]];
                obj[keys[i]] = storageItem(item);
            }
            storage.set(storageKey(), obj);
        };

        // parse an item rule
        // should always return boolean
        function parseRule(item){
            var rule = item.rule || defaultRule;
            return rule.call(item);
        };

        // trigger an item's callback by name
        // executes based on parsed rule boolean
        function trigger(name){
            var name = toCamelCase(name);
            var item = cache[name];
            var callback = cbmap[name];
            if(parseRule(item)){
                callback.call(item, item.$elem, item.exec, item.created);
                item.exec++;
                setStorage();
            }
        };

        // build cached storage
        function buildCache(attr){
            var elems = document.querySelectorAll('[' + fromCamelCase(attr) + ']');
            var store = getStorage();
            for(var i = 0; i < elems.length; i++){
                var node = elems[i];
                var id = node.getAttribute(fromCamelCase(attr));
                var prev = store[toCamelCase(id)];
                cache[toCamelCase(id)] =  cacheItem(node, prev);
            }
        };

        // add a cached item by name and config
        function addItem(name, config){
            var name = toCamelCase(name);
            var item = cache[name];
            if(item && config.rule){
                item.rule = config.rule;
            }
            if(item && config.callback){
                cbmap[name] = config.callback;
                item.trigger = function(){
                    trigger(name);
                };
                item.trigger();
            }
        };

        // add group of items by object key/value map
        function addItems(items){
            var keys = Object.keys(items);
            for(var i = 0; i < keys.length; i++){
                addItem(keys[i], items[keys[i]]);
            }
        };

        // sets the default rule for callbacks
        function setDefaultRule(rule){
            if(rule instanceof Function){
                defaultRule = rule;
            }
        };

        // initialize and build
        function init(){

            // clear storage if set
            if(opts && opts.clearStorage){
                storage.remove(storageKey());
            }

            // set default rule if set
            if(opts && opts.defaultRule){
                setDefaultRule(opts.defaultRule);
            }

            // build cache hash table
            buildCache(attr);

            // add callbacks/ rules
            addItems(items);

            // set namespace
            overwatch.tags ? null : overwatch.tags = {};

            // add to namespace cache
            overwatch.tags[toCamelCase(attr)] = tag;

            // expose api functions
            tag.cache = cache;
            tag.add = addItems;
            tag.trigger = trigger;
            tag.setDefaultRule = setDefaultRule;

            // save state to local storage
            setStorage();
        };

        init();

    };



    overwatch.extend({ Tag: Tag });

    return overwatch.Tag;

});

!function(root, factory){

	factory(root, root.overwatch);

}(this, function(root, overwatch){

    /**
     * Takes the card and arrow DOM object and calculates the left offset
     * for the arrow.
     *
     * We get the position relative to the container of the card and add it
     * to half of the width of the card minus half of the width of the arrow
     * to center the arrow.
     *
     * @param {Object} card
     * @param {Object} arrow
     */
    var getTooltipLeftOffsetCentered = function(card, arrow, tooltipOffset) {
        return card.offsetLeft+(card.offsetWidth/2)-(arrow.offsetWidth/2)-tooltipOffset;
    };
    var utils = overwatch.utils;
    var $window = $(window);

    var tooltip = {
        activeHandle: null,
        init: function() {
            this.generateTooltip();
            this.setupEvents();
        },
        generateTooltip: function() {
            this.tooltip = $('<div id="tooltip" class="Tooltip"><div class="Tooltip-arrow"></div><div class="Tooltip-body"></div></div>');
            this.tooltip.appendTo($(document.body));
            this.tooltipText = this.tooltip.find(".Tooltip-body");
            this.tooltipArrow = this.tooltip.find(".Tooltip-arrow");
        },
        setupEvents: function() {
            var self = this;
            $('[data-tooltip]').on('click', function(e) {
                var $this = $(this);
                self.activeHandle = $this;
                var tip = $("#" + $this.data('tooltip')).html();
                self.populateTooltip(tip);
                self.tooltip.show();
                self.positionTooltip();
            });
            $(document.body).on("click", function(event) {
                if($(event.target).closest('[data-tooltip]').length === 0) {
                    self.tooltip.hide();
                }
            });
            $window.resize(_.debounce(function(){
                if(!!self.activeHandle) {
                    self.positionTooltip();
                }
            }, 500));
        },
        getHandleInfo: function() {
            var offset = this.activeHandle.offset();
            return {
                left: offset.left,
                top: offset.top,
                width: this.activeHandle.outerWidth(),
                height: this.activeHandle.outerHeight()
            }
        },
        getTooltipSize: function() {
            return {
                width: this.tooltip.outerWidth(),
                height: this.tooltip.outerHeight() + (this.tooltipArrow.outerHeight()/2)
            }
        },
        getLeftPosition: function(handleInfo, tooltipSize) {
            var maxWidth = $(document.body).outerWidth() - tooltipSize.width;
            var minWidth = 0;
            //find the center point of the handle by adding its left offet and half its width.
            //subtract half the width of the tooltip and using this left value should align both the handle and the tips centers.
            var desiredLeftPosition = handleInfo.left + (handleInfo.width/2) - (tooltipSize.width/2);
            var clampedLeftPosition = utils.clamp(desiredLeftPosition, minWidth, maxWidth);
            this.tooltipOffset = desiredLeftPosition - clampedLeftPosition;
            return clampedLeftPosition;
        },
        getTopPosition: function(handleInfo, tooltipSize) {
            //TODO: Get this working properly so the tooltip appears above or below the handle dynamically.
            var screenYHalfwayPoint = $window.scrollTop() + ( $window.height() / 2 );
            var handleElementYHalfwayPoint = handleInfo.top + (handleInfo.height / 2);
            var topPlacement = (handleElementYHalfwayPoint > screenYHalfwayPoint);
            var tooltipTopPosition = (topPlacement) ? (handleInfo.top - tooltipSize.height) : (handleInfo.top + handleInfo.height);
            return tooltipTopPosition;
        },
        positionTooltip: function() {
            this.tooltip.css({ left: 0, top: 0 });
            var handleInfo = this.getHandleInfo();
            var tooltipSize = this.getTooltipSize();
            this.tooltip.css({
                left: this.getLeftPosition(handleInfo, tooltipSize),
                top: handleInfo.top - tooltipSize.height
            });
            this.positionTooltipArrow();
        },
        positionTooltipArrow: function() {
            var arrowLeftValue = this.tooltipOffset === 0 ? "50%" : "calc(50% + " + this.tooltipOffset + "px)";
            this.tooltipArrow.css({
                left: arrowLeftValue
            });
        },
        populateTooltip: function(html) {
            this.tooltipText.html(html);
        }
    };

    overwatch.extend({ tooltip: tooltip });

	return overwatch.tooltip;

});

!function(root, factory){

    factory(root, root.overwatch);

}(this, function(root, overwatch){

    function Waypoint(){

    };

    overwatch.extend({ waypoint: new Waypoint() });

    return overwatch.waypoint;

});

/*
* hero-selector.js
* extends overwatch module with hero-selector
*/
(function(root, factory){

	// amd
	if (typeof define === 'function' && define.amd){
		define('overwatch-hero-selector', ['overwatch', 'shuffle'], factory);

	// node
	} else if (typeof exports === 'object'){
		module.exports = factory(require('overwatch', 'shuffle'));

	// browser global
	} else {
		root.overwatch['HeroSelector'] = factory(root.overwatch, root.jQuery, root.shuffle);
	}

}(this, function(overwatch, $, shuffle){

	// Allows "Filtering" of heroes
	function HeroSelector(){
		this.init = function init(options) {
			var self = this;
			self.$grid = options.$container;
			var $sizer = options.$sizer;
			self.$navigationLinks = options.$navigationLinks;
			self.itemSelector = options.itemSelector;
			
			//Init shuffle
			self.$grid.shuffle({
				itemSelector: self.itemSelector,
				speed: 200,
				easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)'
			});
			
			// This gets the largest order the the group, used to "push" filtered results to the 
			// top, but also keep the other items ordered properly.	
			self.largestOrder = (function() {
				var largest = 0;
				$.each($(self.itemSelector), function(key, value) {
					if(largest < $(value).data('order')) {
						largest = $(value).data('order');
					}
				});
				return largest;
			})();
			
				
			self.$navigationLinks.on('click', function() {
				var filterKey = $(this).data('filter-key');
				self.filter(filterKey);
			});
		};
	};
	
	HeroSelector.prototype.filter = function filter(filterKey) {
		var self = this;
		window.location.hash = filterKey.toLowerCase();
		
		self.$navigationLinks.parent().removeClass('active');
		$('[data-filter-key="'+filterKey+'"]', self.$navigationLinks.parent()).parent().addClass('active');
		
		if(filterKey === 'all') {
			$(self.itemSelector).children().removeClass('m-subdued m-selected');
			var opts = {};
		} else {
			var opts = {
				reverse: true,
				//Function to sort by
				by: function($el) {
					var $elChild = $($el.children()[0]);
					$elChild.removeClass('m-subdued m-selected');
				
					if($el.data('groups')[0] === filterKey) {
						$elChild.addClass('m-selected');
						// Subtract the largest order fron the order that is in the filter to
						// "push" those items to the top (make all of them rank "higher" than the others, but keep their order)
						return self.largestOrder-$el.data('order');
					}
					$elChild.addClass('m-subdued');
					// If it's not in the selected group, just keep the existing order, but opposite because the filter order is reverse.
					return ~$el.data('order');
				}
			};
		}
		
		this.$grid.shuffle('sort', opts);
	};

	// create heroSelector
	var heroSelector = new HeroSelector();
	
	// return heroSelector
	return heroSelector;

}));

!function (root, factory) {

    factory(root, root.app, root.jQuery);

}(this, function (root, app, $) {

    var overwatch = root.overwatch;
    var video = overwatch.video;
    var lightbox = overwatch.lightbox;

    function Helpers() {

        $(document.body).on("click", "[data-js=lightbox-hook]", function (e) {
            var $element, id, $lightboxContent, html, options;
            $element = $(e.target);
            id = $element.data("target");
            options = $element.data("options") || {};
            if (typeof id !== "undefined") {
                $lightboxContent = $("[data-js=lightbox-content][data-id=" + id + "]");
            }
            if ($lightboxContent.length > 0) {
                html = $lightboxContent.html();
                options.body = html;
                overwatch.lightbox.open(options);
            }
        });

        this.loadVideoIntoFrame = function loadVideoIntoFrame(videoId, options) {
            options = (typeof options === 'undefined') ? {} : options;

            var v = video.create({ elem: $('<div video>'), id: videoId }, function (video) {
                video.player.playVideo();
            });

            lightbox.open({ body: v.$root });

            overwatch.lightbox.one('hide', function () {
                v.destroy();
                lightbox.empty();
                options.closeCallback && options.closeCallback();
            });

        };

        this.loadImageIntoFrame = function loadImageIntoFrame(imgSrc, classOverride) {
            var classes = classOverride ? 'u-bg-center' + " " + classOverride : 'u-bg-cover u-bg-center';
            overwatch.lightbox.open({
                body: $('<a>', {
                    href: imgSrc,
                    target: "_blank",
                    style: 'background-image:url("' + imgSrc + '")',
                    addClass: classes
                }),
                media: true
            });
        };

        this.userLoggedIn = function() {
            return $(document.body).hasClass("is-logged-in");
        };
    };

    app.extend({ helpers: new Helpers() });

    return app.helpers;

});

!function(root, factory){

    factory(root, root.app);

}(this, function(root, app){

    //Some math functions to make the parallaxing of down-page elements less of a headache

    //Normalize a value between interval
    //E.g. norm(5, 0, 10) -> 0.5
    function norm(val, min, max) {
        return (val - min) / (max - min);
    }

    //Linear interpolation within interval
    //E.g. lerp(0.5, 0, 10) -> 5.0
    function lerp(norm, min, max) {
        return (max - min) * norm + min;
    }

    //Map a value's relative position in one range into another range
    //Basically, if val is 16 and the first range is 10-30 and the second range
    //is 0-10, the resulting value would be 3.  You take the relative position
    //of the value within the
    //first range and use it to calculate the output in the second range.
    function mapLerp(val, sourceMin, sourceMax, destMin, destMax) {
        var n = norm(val, sourceMin, sourceMax);
        return lerp(n, destMin, destMax);
    }

    //Gets two ranges (This is used for down-page parallaxing)
    //  - Viewtop when the element first becomes visible as you scroll TO when the element leaves the view
    //  - 0 to the height of the element
    //This is needed because we don't know how far down the page the section with parallax
    //will be or how tall said section will be. We can't effectively base the parallax
    //directly off view height
    //Instead we interpolate over the entire time the section is is in the viewport.  This
    //function gets the upper and lower bounds of an element required to call the
    //mapLerp() function
    function getRelativeValuesForAnElement($element) {
        var elemHeight = $element.outerHeight();
        var elemTop = $element.offset().top;
        var elemBottom = elemTop + elemHeight;
        var sourceMin = elemTop - overwatch.util.height();
        var sourceMax = elemBottom;
        var destMin = 0;
        var destMax = elemHeight;
        return {
            sourceMin: sourceMin,
            sourceMax: sourceMax,
            destMin: destMin,
            destMax: destMax
        };
    }

    app.extend({ mathUtil: {
        norm: norm,
        lerp: lerp,
        mapLerp: mapLerp,
        getRelativeValuesForAnElement: getRelativeValuesForAnElement,
    }});

    return app.mathUtil;

});

!function(root, factory){

    factory(root, root.app);

}(this, function(root, app){

	var youtubeIdRegExp = /^.*(youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;

    function Util(){

        this.shuffleArray = function shuffle(array) {
			var currentIndex = array.length, temporaryValue, randomIndex ;

			// While there remain elements to shuffle...
			while (0 !== currentIndex) {

				// Pick a remaining element...
				randomIndex = Math.floor(Math.random() * currentIndex);
				currentIndex -= 1;

				// And swap it with the current element.
				temporaryValue = array[currentIndex];
				array[currentIndex] = array[randomIndex];
				array[randomIndex] = temporaryValue;
			}

			return array;
		};

		this.removeWhitespace = function(string) {
			return string.replace(/\s/g, "");
		};

		/*
			http://underscorejs.org/#now

			Returns an integer timestamp for the current time, using the fastest method
			available in the runtime. Useful for implementing timing/animation functions.
		*/
		this.now = Date.now || function() {
			return new Date().getTime();
		};

		/**
		 * Returns a function that can only be invoked once, regardless of how many
		 * times it's actually called.
		 *
		 * @param  Function func - The function to be invoked once
		 */
		this.once = function(func) {
			var result;
			return function() {
				if (func) {
					result = func.apply(this, arguments);
					func = null;
				}
				return result;
			};
		};

		/**
		 * http://underscorejs.org/#debounce
		 * Returns a function, that, as long as it continues to be invoked,
		 * will not be triggered. The function will be called after it stops
		 * being called for N milliseconds. If immediate is passed, trigger
		 * the function on the leading edge, instead of the trailing.
		 *
		 * @param  Function func - Function to be debounced
		 * @param  int wait - How long to wait between successive calls to func
		 * @param  boolean immediate - Whether to call func on leading edge (rather
		 *   than trailing edge)
		 */

		this.debounce = function(func, wait, immediate) {
			var timeout, args, context, timestamp, result;

			var later = function() {
				var last = app.util.now() - timestamp;

				if (last < wait && last >= 0) {
					timeout = setTimeout(later, wait - last);
				} else {
					timeout = null;
					if (!immediate) {
						result = func.apply(context, args);
						if (!timeout) context = args = null;
					}
				}
			};

			return function() {
				context = this;
				args = arguments;
				timestamp = app.util.now();
				var callNow = immediate && !timeout;
				if (!timeout) timeout = setTimeout(later, wait);
				if (callNow) {
					result = func.apply(context, args);
					context = args = null;
				}

				return result;
			};
		};

		/*
			Applies video poster to video wrap element as a fallback for IE8 HTML5 videos.

			Parameters
			- $videoWraps: jQuery object representing selected <video-wrap-element>'s

			Expects the following DOM hierarchy:
				<video-wrap-element>
					<video poster="NOT UNDEFINED">
		*/
		this.VideoPoster = function($videoWraps) {
			for (var i = $videoWraps.length - 1; i >= 0; i--) {
				var $videoWrap = $($videoWraps[i]);
				var $video = $videoWrap.find("video");
				var posterSrc = $video.attr("poster");
				$videoWrap.css("background-image", "url(" + posterSrc + ")");
			};
		};

		/**
		 * Retrieves the YouTube video identifier from a YouTube URL.
		 *
		 * http://stackoverflow.com/a/3452617
		 */
		this.getYouTubeIdFromUrl = function getYouTubeIdFromUrl(url) {
			var match = url.match(youtubeIdRegExp);
			if (match && match[2].length == 11) {
				return match[2];
			}
        };

        /**
         * Sort jQuery elements with provided comparator function
         */
        this.$sortElements = function $sortElements($elements, comparator) {
            const fragment = document.createDocumentFragment();
            const parent = $elements[0].parentNode;
            $elements.sort(comparator);
            for (var i = 0; i < $elements.length; i++) {
                fragment.appendChild($elements[i]);
            }
            parent.appendChild(fragment);
        };

        this.getNormalizedWindowScrollTop = function getNormalizedWindowScrollTop($window) {
            //cap at 0 min so not to be weird on iphone scrolling up from top
            return Math.max($window.scrollTop(), 0);
        };

        /**
         * Toggles browser fullscreen
         *
         * https://stackoverflow.com/a/36672683
         */
        this.fullscreen = function fullscreen() {
            var isInFullScreen = (document.fullscreenElement && document.fullscreenElement !== null) ||
                (document.webkitFullscreenElement && document.webkitFullscreenElement !== null) ||
                (document.mozFullScreenElement && document.mozFullScreenElement !== null) ||
                (document.msFullscreenElement && document.msFullscreenElement !== null);

            var docElm = document.documentElement;
            if (!isInFullScreen) {
                if (docElm.webkitRequestFullScreen) {
                    docElm.webkitRequestFullScreen();
                } else if (docElm.mozRequestFullScreen) {
                    docElm.mozRequestFullScreen();
                } else if (docElm.msRequestFullscreen) {
                    docElm.msRequestFullscreen();
                } else if (docElm.requestFullscreen) {
                    docElm.requestFullscreen();
                }
            } else {
                fullscreenExit();
            }
        }

        /**
         * Exits browser fullscreen, preferring vendor-prefixed functions
         * first. In at least Firefox, the generic exitFullscreen function
         * is a no-op.
         *
         * https://stackoverflow.com/a/36672683
         */
        this.fullscreenExit = function fullscreenExit() {
            if (document.webkitExitFullscreen) {
                document.webkitExitFullscreen();
            } else if (document.mozCancelFullScreen) {
                document.mozCancelFullScreen();
            } else if (document.msExitFullscreen) {
                document.msExitFullscreen();
            } else if (document.exitFullscreen) {
                document.exitFullscreen();
            }
        }
        
    };

    app.extend({ util: new Util() });

    return app.util;

});

;"use strict";
window.overwatch = window.overwatch || {};
window.overwatch.BuyMediator = (function(overwatch) {

	/**
	 * [callbackMap description]
	 * @type {Object}
	 */
	var callbackMap = {};

	var Sku = null,
		Country = null,
		Platform = null,
		PrimaryRetailer = null,
		SecondaryRetailer = null;

	function init(config) {
		Sku = config.Sku;
		Country = config.Country;
		Platform = config.Platform;
		PrimaryRetailer = config.PrimaryRetailer;
		SecondaryRetailer = config.SecondaryRetailer;

		on(Sku.eventNameChange, function(sku) {
			//
			Platform.updateList(sku.id);

			//
			var currentPlatform = Platform.getCurrent();
			var country = Country.getCurrent();

			PrimaryRetailer.setCurrentRetailerByPlatformAndSkuIdAndCountryCode(currentPlatform, sku.id, country);
			SecondaryRetailer.setCurrentRetailersByCountryCodeAndSkuIdAndPlatform(country, sku.id, currentPlatform);
		});

		on(Country.eventNameChange, function(country) {
			//
			Sku.updateList(country);
		});

		on(Platform.eventNameChange, function(platform) {
			//
			var sku = Sku.getCurrent();
			var country = Country.getCurrent();

			PrimaryRetailer.setCurrentRetailerByPlatformAndSkuIdAndCountryCode(platform, sku.id, country);
			SecondaryRetailer.setCurrentRetailersByCountryCodeAndSkuIdAndPlatform(country, sku.id, platform);
		});

		on(PrimaryRetailer.eventNameChange, function(retailer) {
		});

		on(SecondaryRetailer.eventNameChange, function(retailers) {
		});
	}

	function on(event, cb, context) {
		context = context || this;
		var callbackList = (callbackMap[event] = callbackMap[event] || []);
		callbackList.push({ context: context, callback: cb });
	}

	function publish(event) {
		var callbackList = callbackMap[event] || [];
		var args = Array.prototype.slice.call(arguments, 1);
		for (var i = 0; i < callbackList.length; i++) {
			var callbackObj = callbackList[i];
			var context = callbackObj.context;
			var cb = callbackObj.callback;
			cb.apply(context, args);
		}
	}

	return {
		init: init,
		on: on,
		publish: publish
	};

}(window.overwatch));

;"use strict";
window.overwatch = window.overwatch || {};
window.overwatch.CountryModel = {

	Mediator: null,
	
	eventNameChange: null,

	current: null,

	$doc: $(document),

	init: function(config) {
		this.Mediator = config.Mediator;
		this.eventNameChange = config.eventNameChange;
		this.current = config.current;
	},

	getCurrent: function() {
		return this.current;
	},

	setCurrent: function(country) {
		this.current = country;
		this._publish();
	},

	_publish: function() {
		this.Mediator.publish(this.eventNameChange, this.current);
	}

};

(function(window, document, $){

	overwatch.buy = overwatch.buy || {};
	overwatch.buy.navigation = overwatch.buy.navigation || {};
	overwatch.buy.navigation.init = function init() {
		var $nav = $('.edition-select');
		var $active = $nav.children('.active');
		var $thing = $active.children('.active-splash');
		var Mediator = window.overwatch.BuyMediator;
		var util = window.overwatch.util;

		// get the window offset value for resolutions > 2560
		function windowOffset(){
			var w = util.width();
			return w > 2560 ? (w - 2560)/2 : 0;
		};

		// set position and width of $thing
		// account for skew effect and height differences
		// http://stackoverflow.com/a/9284016
		function setPosition(opts){

			var opts = opts || { duration: 0 };

			// get active item boundingRect
			var rect = $active[0].getBoundingClientRect();

			// set new values
			// account for skew effect on boundingRect and
			// active item height being 84% of active-splash
			//debugger;
			$thing.velocity({
				left: (rect.left - windowOffset()),// + ((Math.tan(0.25) * (rect.height * 0.84)) / 2),
				width: $active[0].clientWidth
			}, opts);
		};

		if(typeof $thing[0] !== 'undefined') {
			// wait till DOM is ready before reading boundingRect values
			$(document).on('ready', function(event){

				// get initial boundingRect
				var rect = $thing[0].getBoundingClientRect();

				// account for the transform skew affect on boundingRect
				// clientWidth to get actual width without skew affect on boundngRect
				$thing.velocity({
					left: (rect.left - windowOffset()), // + ((Math.tan(0.25) * rect.height) / 2),
					width: $thing[0].clientWidth
				}, {
					duration: 0,
					complete: function(){

						// append to the navigation container
						// after setting values is complete
						// or sometimes we get fouc
						$thing = $thing.appendTo($nav.parent());
					}
				});


				// handle nav item clicks
				Mediator.on("ow.sku.change", function(sku){

					// set current active tab
					$active = $nav.find("[data-sku-change='" + sku.id + "']");


					// set the new position/ width
					setPosition({ duration: 200, easing: 'easeOutQuad' });
				});

				// set resize event after document.ready becuase some browsers
				// trigger a resize event at an earlier time
				// and we would get incorrect values set on the object
				$(window).on('resize', function(){

					// set the new position/ width
					setPosition();
				});

				// update position on buy form open and close
				$(document).on('ow.buy.form.show ow.buy.form.hide', function(){

					// set the new position/ width
					setPosition();
				});

			});
		}
	};

})(window, window.document, window.jQuery);

;"use strict";
window.overwatch = window.overwatch || {};
window.overwatch.PlatformModel = {

	Mediator: null,
	
	eventNameChange: null,

	defaultList: null,

	currentList: null,

	current: null,

	defaultPlatform: null,

	$doc: $(document),

	// TODO: externalize
	platformExceptions: null,

	init: function(config) {
		var self = this;

		this.Mediator = config.Mediator;
		this.eventNameChange = config.eventNameChange;
		this.defaultList = config.defaultPlatformList;
		this.currentList = this.defaultList;
		this.current = config.current;
		this.defaultPlatform = config.defaultPlatform;
		this.platformExceptions = config.platformExceptions;
	},

	updateList: function(skuId) {
		// filter out platform exceptions (platforms that don't support provided sku)
		var exceptions = this.platformExceptions[skuId];
		if (exceptions) {
			this.currentList = this.defaultList
				.filter(function filterUnsupported(platform) {
					return exceptions.indexOf(platform) === -1;
				});
		} else {
			this.currentList = this.defaultList;
		}

		// reset current platform if it's no longer supported after sku change
		if (this.currentList.indexOf(this.current) === -1) {
			this.setCurrent(this.defaultPlatform);
		}
	},

	getList: function() {
		return this.currentList;
	},

	getUnavailableList: function() {
		var currentList = this.currentList;
		return this.defaultList
			.filter(function filterSupported(platform) {
				return currentList.indexOf(platform) === -1;
			});
	},

	getCurrent: function() {
		return this.current;
	},

	setCurrent: function(platform) {
		this.current = platform;
		this._publish();
	},

	_publish: function() {
		this.Mediator.publish(this.eventNameChange, this.current);
	}

};

;"use strict";
window.overwatch = window.overwatch || {};

window.overwatch.PrimaryRetailerModel = {

	Mediator: null,

	eventNameChange: null,

	retailerMap: null,

	currentRetailer: null,

	platformMap: null,

	$doc: $(document),

	init: function(config) {
		var self = this;

		this.eventNameChange = config.eventNameChange;
		this.retailerMap = config.retailerMap;
		this.currentRetailer = config.currentRetailer;
		this.platformMap = config.platformMap;
		this.Mediator = config.Mediator;
	},

	getCurrentRetailer: function() {
		return this.currentRetailer;
	},

	setCurrentRetailerByPlatformAndSkuIdAndCountryCode: function(platform, skuId, countryCode) {
		var newRetailer = null;
		var retailerName = this.platformMap[platform].shopName || this.platformMap[platform].name;
		var retailer = this.retailerMap[platform] || {};
		var href = this._getRetailerUrl(retailer, skuId, countryCode);
		if (href) {
			newRetailer = {
				name: retailerName,
				platform: retailer.platform,
				href: href
			};
		}
		this.setCurrentRetailer(newRetailer);
	},

	setCurrentRetailer: function(retailer) {
		this.currentRetailer = retailer;
		this._publish();
	},

	_getRetailerUrl: function(retailer, skuId, countryCode) {
		var url = null;
		if (skuId === "ORIGINS" && retailer.countryLinkOrigins && retailer.countryLinkOrigins[countryCode]) {
			url = retailer.countryLinkOrigins[countryCode];
		} else if (skuId === "BASIC" && retailer.countryLinkBasic && retailer.countryLinkBasic[countryCode]) {
			url = retailer.countryLinkBasic[countryCode];
		} else if (skuId === "COLLECTORS" && retailer.countryLinkCollectors && retailer.countryLinkCollectors[countryCode]) {
			url = retailer.countryLinkCollectors[countryCode];
		} else if (retailer.skuLinks) {
			url = retailer.skuLinks[skuId];
		}
		return url;
	},

	_publish: function() {
		this.Mediator.publish(this.eventNameChange, this.currentRetailer);
	}

};

window.overwatch.SecondaryRetailerModel = {

	Mediator: null,

	eventNameChange: null,

	retailerMap: null,

	currentRetailers: null,

	$doc: $(document),

	init: function(config) {
		var self = this;

		this.Mediator = config.Mediator;
		this.eventNameChange = config.eventNameChange;
		this.retailerMap = config.retailerMap;
		this.currentRetailers = config.currentRetailers || [];
	},

	getCurrentRetailers: function() {
		return this.currentRetailers;
	},

	setCurrentRetailersByCountryCodeAndSkuIdAndPlatform: function(countryCode, skuId, platform) {
		var retailers = this.retailerMap[countryCode] || [];

		retailers = retailers
			.filter(function filterPlatform(retailer) {
				// either platform matches OR platform isn't specific (unspecified = all platforms)
				return retailer.platform === null || retailer.platform === platform;
			})
			.filter(function removeUnsupportedSku(retailer) {
				var href = retailer.skuLinks[skuId];
				return href !== undefined;
			})
			.map(function simpleRetailerTransform(retailer) {
				return {
					name: retailer.name,
					href: retailer.skuLinks[skuId]
				};
			});

		if (retailers.length === 0) {
			retailers = null;
		}

		this.setCurrentRetailers(retailers);
	},

	setCurrentRetailers: function(retailers) {
		this.currentRetailers = retailers;
		this._publish();
	},

	_publish: function() {
		this.Mediator.publish(this.eventNameChange, this.currentRetailers);
	}

};

(function(window, document, $, _){
	overwatch.buy = overwatch.buy || {};
	overwatch.buy.scroll = overwatch.buy.scroll || {};
	overwatch.buy.scroll.init = function() {
		var $doc = $(document);
		var $learnMoreContainer = $('.learn-more-tip-container');
		var $activeDetail = false;
		var activeDetailTop = 0;
		
		// wait til dom is ready before reading boundingRect values
		$doc.on('ready', function(event){
			
			var visible = 1;
			
			// handles hiding the scroll btn and removes scroll event
			function hideScroll(){
				visible = 0;
				$doc.off('scroll.learnmore');
				$learnMoreContainer.velocity('fadeOut', {
					duration: 200,
					easing: 'easeOutQuart',
					complete: function(){
						$learnMoreContainer.detach();
					}
				});
			};
			$activeDetail = $('.detail.active');
			activeDetailTop = $activeDetail.offset().top;
			
			// handle page scroll on btn click
			$learnMoreContainer.on('click', function(event){
				event.preventDefault();
				if(visible){
					$activeDetail = $('.detail.active');
					activeDetailTop = $activeDetail.offset().top;
					$activeDetail.velocity('scroll', {
						duration: 200,
						easing: 'easeOutQuart'
					});
					hideScroll();
				}
			});
			
			var hideIfScrolledFarEnough = _.debounce(function(e) {
				if(activeDetailTop <= $doc.scrollTop()) {
					hideScroll();
					$(window).off('scroll', hideIfScrolledFarEnough);
				}
			}, 100);
			
			if($learnMoreContainer.length > 0) {
				$(window).on('scroll', hideIfScrolledFarEnough);
			}
		});
	};
	
})(window, window.document, window.jQuery, window._);

;"use strict";
window.overwatch = window.overwatch || {};
window.overwatch.SkuModel = {

	Mediator: null,

	eventNameChange: null,

	countrySkuMap: null,

	currentList: null,

	current: null,

	currentIndex: null,

	$doc: $(document),

	/**
	 * [init description]
	 * 
	 * @param [config] {Object} Config object
	 * @param [config.eventNameChange] 
	 * @param [config.countrySkuMap] 
	 * @param [config.currentList] 
	 * @param [config.defaultId] 
	 */
	init: function(config) {
		var self = this;

		this.Mediator = config.Mediator;
		this.eventNameChange = config.eventNameChange;
		this.countrySkuMap = config.countrySkuMap;
		this.currentList = config.currentList;

		// initializes 'current' and 'currentList' and fires initial change event
		this.setCurrentById(config.defaultId);
	},

	getCurrent: function() {
		return this.current;
	},

	getPrevious: function() {
		var prev = this._mod(this.currentIndex - 1, this.currentList.length);
		return this.currentList[prev];
	},

	getNext: function() {
		var next = this._mod(this.currentIndex + 1, this.currentList.length);
		return this.currentList[next];
	},

	getCurrentById: function(id) {
		for (var i = this.currentList.length - 1; i >= 0; i--) {
			var sku = this.currentList[i];
			if (sku.id === id) {
				return sku;
			}
		};
		console.error(id + " SKU not found.");
	},

	setCurrent: function(sku) {
		this.current = sku;
		this.currentIndex = this.currentList.indexOf(sku);
		this._publish();
	},

	setCurrentById: function(id) {
		var sku = this.getCurrentById(id);
		this.setCurrent(sku);
	},

	updateList: function(countryCode) {
		this.currentList = this.countrySkuMap[countryCode];
		this.setCurrentById(this.current.id);
	},

	_publish: function() {
		this.Mediator.publish(this.eventNameChange, this.current);
	},

	_mod: function(x, y) {
		return (((x % y) + y) % y);
	}

};

//Landing trailers functionality.
(function(window, document, $){

	function init(opts){

		// video player params
		var params = {
			rel: 0,
			autoplay: 0,
			autohide: 1,
			controls: 1,
			modestbranding: 1,
			showinfo: 0,
			version: 3,
			enablejsapi: 1,
			wmode: 'opaque',
		};

		// root element to append video
		var $elem = opts.$videoTrailer;

		// mobile utilites
		var util = window.overwatch.util;

		// load youtube iframe api
		// $("<script>")
		// 	.attr("src", "https://www.youtube.com/iframe_api")
		// 	.appendTo($("body"));

		// create a video and append to the page
		// creates iframe on mobile
		// and uses iframe api on non-mobile devices
		function createPlayer(){

			// get the youtube video id
			var id = $elem.data('ytId');

			// append iframe for mobile devices
			if(util.mobile() || util.touch()){

				// hide image overlay
				$elem.toggleClass('active', true);

				// create the iframe and append to $elem
				var $iframe = $('<iframe/>',{
					attr: {
						width: '100%',
						height: '100%',
						allowFullScreen: true,
						frameBorder: 0,
						src: 'https://www.youtube.com/embed/' + id + '?' + $.param(params)
					}
				}).appendTo($elem);

			// handle non-mobile devices
			} else {

				// create placeholder div
				var $div = $('<div/>').appendTo($elem);

				// create player and embed video
				var player = new window.YT.Player($div[0], {
					videoId: id,
					playerVars: params,
					events: {
						onReady: function(event){
							$elem.on('click', function(){
								event.target.playVideo();
								$elem.toggleClass('active', true);
							});
						}
					}
				});

				$elem.on('click', function(event){
					event.preventDefault();
					$elem.toggleClass('active', true);
				});
			}
		};

		window.onYouTubeIframeAPIReady = function(){
			createPlayer();
		};

	};

	window.overwatch.OriginsTrailers = {
		init: init
	};

})(window, window.document, window.jQuery);

/**
 * Init's items needed for hero abilities videos
 */
(function(window, overwatch){
 	
	var Abilities = {

		init: function() {
	
			var mql;
	
			Abilities.desktopVideo = $(".abilities .ability-video.desktop-video");
			Abilities.videoOverlay = $(".abilities .video-overlay");
			Abilities.mobileVideo = $(".ability-video.mobile-video");
	
			Abilities.videoOverlay.hover(
				function() {
					$(this).siblings("video")[0].play();
				},
				function(e) {
					$(this).siblings("video")[0].pause();
					$(this).siblings("video")[0].load(); //this should be .currentTime = 0 but use this temporarily until solution is found for chrome
				}
			);
	
			Abilities.desktopVideo.on("click", function() {
				if (overwatch.util.ie() !== '8') {
					var currentHero = $(this).data("hero");
					var currentAbility = $(this).data("ability");
					var data = createVideoData(currentHero, currentAbility);
					var videoData = data[0];
					var videoIndex = data[1];
					Lightbox.loadHTML5Video(videoData, videoIndex);
				}
			});
	
			// We don't want to exit full screen on a desktop if a user is trying to full screen
			if (overwatch.util.mobile() === true) {
				// Pause videos if device goes into landscape mode or changes orientation.
				MediaQuery.onDesktop(function() {
					document.exitFullscreen();
					pauseVideos();
				});
			}
	
			function pauseVideos() {
				Abilities.mobileVideo.each(function(i, ele) {
					$(ele).children("video").get(0).pause();
				});
			}
	
		}
	};
	
	function createVideoData(hero, abilityKey) {
	
		var videoIndex = 0;
		var videoData = [];
	
		for(var key in heroAbilities){
			var ability = heroAbilities[key],
				abilityInfo = {};
	
			abilityInfo.title = ability.title;
			abilityInfo.subtitle = ability.subtitle;
			abilityInfo.description = ability.description;
			abilityInfo.sources = [{ type: "video/webm", src: ability.sources.webm}, {type: "video/mp4", src: ability.sources.mp4}];
			abilityInfo.contentClass = "hero-" + hero;
			abilityInfo.autoplay = true;
	
			videoData.push(abilityInfo);
	
			if (abilityKey === key) {
				videoIndex = videoData.length - 1;
			}
		}
	
		return [videoData, videoIndex];
	}

	window.Abilities = Abilities;

}(window, window.overwatch));

/**
 * There are currently some issues with this thing that need fixing before we use it. From
 * a code review:
 *
 * - "After reviewing this file, I'm concerned about the logic. It's trying to tie a toggled
 * class on thingA with the toggled class on ANY NUMBER OF thingBs. Say there are three thingBs,
 * and one has the "watch class" and the two others don't have the watch class. What happens if I
 * add the watch class to the second thingB (it should add the state change to thingA). But then
 * if I toggle the class off the first thingB, it will remove the state class from thingA.
 *
 * In other words, the state of thingA will be fickle, depending on the last thingB that was
 * modified. It doesn't seem to take into consideration the state of all 3 together. Perhaps
 * forcing there to be only ONE thingB will be an acceptable solution." - Harry Robbins
 *
 * - "Will this be called whenever a class mutation happens? Even if it's an unrelated class?
 *
 * Let's say I add `foo` and `bar`as classes to a target node. If my toggleClass were `boo`,
 * wouldn't `boo` be added twice?" - Alex Nakorn
 *
 * - "I doubt disconnecting all of them is ever going to be desired behavior. You'll want to
 * provide a key for each one you've created, and create them explicitly rather than "create them
 * all" on pageload. Then the code using this component can disable the one they created, using
 * the key provided." - Harry Robbins
 */


/**
 * Allows any HTML element to dynamically to watch another element and
 * dynamically toggle a class on or off when the observed element does.
 * To use it, apply the following three attributes to an element:
 * - data-observation-target-selector - A CSS selector for the element(s)
 *      to observe
 * - data-observation-target-class - A CSS class to watch for on the target
 * - data-observation-toggle-class - A CSS class that will be added to this
 *      element when the target class is added to the target element, and
 *      which will be removed when the target class is removed from the
 *      target element.
 */

!function (root, factory) {

    factory(root, root.app);

}(this, function (root, app) {

    var observers = [];

    function init() {
        var observerNodes = document.querySelectorAll('[data-observation-target-selector]');

        observerNodes.forEach(function(observerNode, index) {
            var targetSelector = observerNode.dataset.observationTargetSelector;
            var targetClass = observerNode.dataset.observationTargetClass;
            var toggleClass = observerNode.dataset.observationToggleClass;
            var targetNodes = document.querySelectorAll(targetSelector);

            targetNodes.forEach(function(targetNode, index) {
                var callback = function(mutationsList) {
                    mutationsList.forEach(function(mutation) {
                        if (mutation.target.classList.contains(targetClass)) {
                            observerNode.classList.add(toggleClass);
                        } else {
                            observerNode.classList.remove(toggleClass);
                        }
                    });
                };

                var observer = new MutationObserver(callback);
                observer.observe(targetNode, {
                    attributes: true,
                    attributeFilter: [
                        'class'
                    ]
                });

                observers.push(observer);
            });
        });
    }

    function disconnectAllObservers() {
        while (observers.length > 0) {
            observers.pop().disconnect();
        }
    }

    app.extend({
        declarativeMutationObserver: {
            init: init,
            disconnectAllObservers: disconnectAllObservers
        }
    });

    return app.declarativeMutationObserver;
});

(function(root, app, overwatch) {

    var Fadein = {
        targetElements: '[data-fadein="true"]',
        fadeInClass: "fadein-animation",
        win: $(root),
        init: function() {
            this.elements = $(this.targetElements);
            this.total = this.elements.length;
            this.visible = 0;
            this.elements.addClass(this.fadeInClass);
            this.triggerFadeInOnVisibleElements();
            this.setupEvents();
        },
        setupEvents: function() {
            var self = this;
            $(root).on('scroll.fadein', _.throttle(function() {
                self.triggerFadeInOnVisibleElements();
            }, 100));
        },
        //Takes care of the fade-in as you scroll down the page
        triggerFadeInOnVisibleElements: function() {
            this.elements.each(function() {
                var $this = $(this);
                if ($this.hasClass("is-visible")) { return; }
                //Once 25% of the element is in view
                if ($.isViewable($this, { percentH: 0.25 })) {
                    $this.addClass("is-visible");
                    self.visible++;
                }
            });
            if (this.visible >= this.total) {
                $(root).off('scroll.fadein');
            }
        }
    };

    app.Fadein = Fadein;

}(window, window.app, window.overwatch));

!function(root, app, overwatch){

    var util = overwatch.util;
    var scene = null;
    var $scene = $('[hero-scene]');
    var $elem = $scene.find('#hero-scene');

    var parallax_opts = {
        scalarX: 1,
        scalarY: 1,
        frictionX: 1,
        frictionY: 1
    };

    function setSceneHeight(height, padding){
        $scene[0].style.height = height;
        $scene[0].style.padding = padding;
    };

    function checkSceneHeight(){

        var width = util.width();
        var height = util.height();

        if(width * .4625 >= height - 66){
            setSceneHeight(height - 66 + 'px', 0);
        } else {
            setSceneHeight(null, null);
        }
    };

    function init(){

        $scene.on('mouseenter', function(){
            if(scene){
                scene.enable();
            } else if(!util.mobile() && !util.touch() && util.width() >= 768){
                scene = overwatch.parallax = new Parallax($elem[0], parallax_opts);
            }
        });

        $scene.on('mouseleave', function(){
            if(scene){
                scene.disable();
            }
        });

        overwatch.extend({ parallax: scene });

        //checkSceneHeight();

        // throttle to 30 fps
        //$(root).on('resize', _.throttle(checkSceneHeight, 32));
    };

    app.extend({ heroScene: { init: init } });

}(this, this.app, this.overwatch);

(function(window, overwatch){
	/*
		Hero selection functionality.
	*/
	var HeroSelect = function() {
		var currentHero;

		function init(options) {
			var $section 			= options.$section;
			var $overlay 			= options.$overlay;
			var $overlayText 		= options.$overlayText;
			var $overlayTextBorder 	= options.$overlayTextBorder;
			var $overlayWrap        = options.$overlayWrap;
			var $selectionWrap 		= options.$selectionWrap;
			var classLoaded 		= options.classLoaded;

			// Handle character hover event.
			$selectionWrap.on("mouseenter", ".selection-link", function(event) {
				var $this = $(this);
				var heroSlug = $this.data("hero-slug");
				var heroRole = $this.data("hero-role");
				var heroRoleId = $this.data("hero-role-id");
				var heroOverlayImage = $this.data("hero-overlay");

				//if (heroSlug != "undefined" && Core.userAgent === "web"){
				if (heroSlug != "undefined" && !overwatch.util.mobile()){

					$section.addClass("overlay-ready");
					$overlay.attr("style","");
					$overlayWrap.addClass("loading");

					HeroSelect.currentHero = heroSlug;

					preloadImage(heroOverlayImage, heroSlug, function(preloadedImage, preloadedHero) {
						if(HeroSelect.currentHero == preloadedHero) {
							$overlayWrap.removeClass("loading");
							$overlay.attr("style", 'background-image:url(' + preloadedImage + ')');
						}
					});

					$section.addClass(classLoaded);

					// Define character description text.
					$overlayText.find("h2").html(heroSlug);
					$overlayText.find("i").attr("class","icon role-" + heroRoleId);
					$overlayText.find("p").text(heroRole);
					$overlayText.addClass(classLoaded);
					$overlayTextBorder.addClass(classLoaded);
				}

			});

			// Handle character un-hover event.
			$selectionWrap.on("mouseleave", ".selection-link", function() {
				$section.removeClass(classLoaded);
				$overlayText.removeClass(classLoaded);
				$overlayTextBorder.removeClass(classLoaded);
				$overlayWrap.removeClass("loading");
			});

			// Handle removal of highlighted portrait animation
			$(".selection-item.is-highlighted").each(function(i, highlightedItem) {
				var $highlightedItem = $(highlightedItem);

				// .selection-link is the targeted hoverable element
				$highlightedItem.find(".selection-link").each(function(i, selectionLink) {
					var $highlightedParent = $highlightedItem;

					// Need to remove the highlighted class of the parent .selection-item when
					// its child .selection-link is hovered on
					$(selectionLink).on("mouseenter", function(event) {
						$highlightedParent.removeClass("is-highlighted");
						$(this).off("mouseenter");
					});
				});
			});
		}

		/**
		 * Starts image preload
		 */
		function preloadImage(loadingImagePath, id, callback) {

			var tempImage = new Image();

			$(tempImage).load(function(){
				if(callback){
					callback(tempImage.src, id)
				}
			});

			tempImage.src = loadingImagePath;
		}

		return {
			init: init
		};
	}();

	window.HeroSelect = HeroSelect;
}(window, window.overwatch));
(function () {
    var root = (function () { return this; })();
    var app = root.app;
    var overwatch = root.overwatch;

    var iconSelector = '[data-js="horizontal-accordion-icon"]',
        imageSelector = '[data-js="horizontal-accordion-image"]',
        contentSelector = '[data-js="horizontal-accordion-content"]';

    var horizontalAccordion = {
        hoverTimer: null,
        isHovering: false,
        activeItem: null,
        init: function (accordion) {
            var self = this;
            var $columns = self.$columns = $('[data-js="horizontal-accordion-column"]', accordion);
            
            $columns
                .delayedHover(self.hoverColumn, self.hoverColumn, {
                    timeout: 100, self: self
                })
                .each(function (index) {
                    $(this).data('js-index', index);
                });
            
            self.previousColumnIndex = 0;
    
            // init elements that are viewable on page load/refresh
            self.toggleViewable($columns);
            // handle showing when scrolled into view
            $(root).on('scroll.accordion', function () {
                if ($columns.eq(0).hasClass('is-viewable')) {
                    $(root).off('scroll.accordion');
                }
                self.toggleViewable($columns);
            });
        },
        toggleViewable: function(targets) {
            targets.each(function() {
                var $el = $(this);
                // true if elem is in the viewport
                $el.toggleClass('is-viewable', $.isViewable($el));
            });
        },
        hoverColumn: function hoverColumn(event) {
            var self = event.data.self;
            var isEntering = event.type === "delayedEnter";
            var $column = $(this);
            var $icon = $(iconSelector, $column);
            var $image = $(imageSelector, $column);

            if ($column.hasClass("is-open")) { return; }
            $column.toggleClass('is-hover', isEntering);
            $icon.toggleClass("is-hover", isEntering);
            $image.toggleClass("is-hover", isEntering);
            self.isHovering = isEntering;
            if (isEntering) {
                self.prepareToOpenColumn($column);
            }
        },
        prepareToOpenColumn: function prepareToOpenColumn($column) {
            var self = this;
            clearTimeout(this.hoverTimer);
            this.hoverTimer = setTimeout(function () {
                if (self.isHovering) {
                    self.openColumn($column);
                }
            }, 400);
        },
        openColumn: function openColumn($column) {
            var $content = $(contentSelector, $column);
            this.closeAllColumns();
            this.previousColumnIndex = $column.data('js-index');
            $column.toggleClass('is-open', true);
            $content.toggleClass('is-visible', true);

        },
        closeAllColumns: function closeAllColumns() {
            this.$columns.each(function () {
                var $item = $(this);
                var $icon = $(iconSelector, $item);
                var $image = $(imageSelector, $item);
                var $content = $(contentSelector, $item);
                $item.toggleClass('is-open', false);
                $content.toggleClass('is-visible', false);
                $icon.toggleClass("is-hover", false);
                $image.toggleClass("is-hover", false);
            });
        }
    };
    app.horizontalAccordion = horizontalAccordion;
}());

!function(root, app, overwatch){

    var util = overwatch.util;

    var particle_opts = {
        "particles": {
            "number": {
                "value": 25,
                "density": {
                    "enable": true,
                    "value_area": 800
                }
            },
            "color": {
                "value": "#fff"
            },
            "shape": {
                "type": "image",
                "stroke": {
                    "width": 0,
                    "color": "#000000"
                },
                "polygon": {
                    "nb_sides": 5
                },
                "image": {
                    "src": root.messages.img.dva,
                    "width": 285,
                    "height": 298
                }
            },
            "opacity": {
                "value": 0.5,
                "random": true,
                "anim": {
                    "enable": true,
                    "speed": 1,
                    "opacity_min": 0.1,
                    "sync": false
                }
            },
            "size": {
                "value": 50,
                "random": true,
                "anim": {
                    "enable": false,
                    "speed": 40,
                    "size_min": 0.1,
                    "sync": false
                }
            },
            "line_linked": {
                "enable": false,
                "distance": 100,
                "color": "#ffffff",
                "opacity": 0.4,
                "width": 2
            },
            "move": {
                "enable": true,
                "speed": 1,
                "direction": "bottom",
                "random": false,
                "straight": false,
                "out_mode": "out",
                "bounce": false,
                "attract": {
                    "enable": false,
                    "rotateX": 600,
                    "rotateY": 1200
                }
            }
        },
        "interactivity": {
            "detect_on": "canvas",
            "events": {
                "onhover": {
                    "enable": false,
                    "mode": "bubble"
                },
                "onclick": {
                    "enable": false,
                    "mode": "repulse"
                },
                "resize": true
            },
            "modes": {
                "grab": {
                    "distance": 400,
                    "line_linked": {
                        "opacity": 0.5
                    }
                },
                "bubble": {
                    "distance": 400,
                    "size": 4,
                    "duration": 0.3,
                    "opacity": 1,
                    "speed": 3
                },
                "repulse": {
                    "distance": 200,
                    "duration": 0.4
                },
                "push": {
                    "particles_nb": 4
                },
                "remove": {
                    "particles_nb": 2
                }
            }
        },
        "retina_detect": true
    };

    function init(){

        var keys = [];
        var konami = '38,38,40,40,37,39,37,39,66,65';
        var $doc = $(root.document);
        var $body = $('body');

        $doc.on('keydown', function(event){

            keys.push(event.keyCode);

            if(keys.toString().indexOf(konami) >= 0){

                $body.addClass('konami');
                $doc.off('keydown', arguments.callee);
                $doc.trigger('konami');

            }

        });

        $doc.one('konami', function(){
            if(!util.mobile() && !util.touch() && util.width() > 768){
                $body.append('<div class="egg" id="egg-particles">');
                particlesJS('egg-particles', particle_opts);
                new Audio(root.clientVars.codeFile).play();
            }
        });

    };

    init();

}(this, this.app, this.overwatch);

/*
	Overwatch (non-mobile) main menu functionality.
*/
(function(window, overwatch){

    var MainMenu = function() {

    	function init(options) {
    		var $window = $(window);

    		// Menus
    		var $menuMainWrap = options.$menuMainWrap;
    		var $menuMain = options.$menuMain;
    		var $socialMenuMain = options.$socialMenuMain;

    		// Menu pin
    		var $menuMainPin = options.$menuMainPin;

    		// Buy button
    		var $buyButtonWrap = options.$buyButtonWrap;

    		// Other options
    		var hiddenClass = options.hiddenClass;
    		var fixedClass = options.fixedClass;
    		var menuMainThreshold = options.menuMainThreshold;
    		var previousScrollTop = 0;

    		// Scroll functionality for main menu.
    		$window.on("scroll", function() {
    			var scrollTop = $window.scrollTop();
    			// need to do this check since ie11 in windows 8.1 fires scroll event more than once
    			if (scrollTop !== previousScrollTop) {
    				// Hide menu if scroll pos is greater than threshold.
    				var hideMenu = scrollTop > menuMainThreshold;

    				// Hide menu if scrolled down.
    				hideMenu = hideMenu && scrollTop > previousScrollTop;

    				$menuMainWrap.toggleClass(hiddenClass, hideMenu);
    				previousScrollTop = scrollTop;
    			}

    			$menuMain.toggleClass(fixedClass, scrollTop > 44);
    			$socialMenuMain.toggleClass(fixedClass, scrollTop > 44);

    			updateBuyButton(scrollTop);
    		});

    		$menuMainPin.on("mouseenter", function() {
    			$menuMainWrap.removeClass(hiddenClass);
    		});

    		function updateBuyButton(scrollTop) {
    			$buyButtonWrap.toggleClass(fixedClass, scrollTop > 44);
    		}
    		
    	}

    	return {
    		init: init
    	};

    };

    window.MainMenu = MainMenu();

}(window, window.overwatch));

(function(){

    var Maps = {
    	section: null,
    	navItem: null,
    	mapPanel: null,
    	mapList: null,
    	mapItem: null,

    	init: function() {
    		Maps.section = $(".map.section");
    		Maps.controls = $(".map-controls");
    		Maps.navItem = $(".map-nav-item");
    		Maps.navItemDesc = $(".map-nav-description");
    		Maps.mapItem = $(".map");

    		Maps.getMap();

    		Maps.navItem.on("click",function(){
    			var selectedType = $(this).attr("data-map-type");
    			var selectedMap = $(".map-info[data-map-type='" + selectedType + "']")
    								.find(".map-list")
    								.find(".map-name")
    								.first()
    								.attr("data-map");
    			Maps.updatePanel(selectedType,selectedMap);
    		});

    		Maps.mapItem.on("click",function() {
    			Maps.updatePanel($(this)
    				.closest(".map-info")
    				.attr("data-map-type"),
    				$(this).attr("data-map"));
    		});

            /*
            * scroll to map by name based on url hash
            * need to setTimeout because of other scroll position js somewhere
            * $scrollspy and nav menu seems to interfere
            */
            function scrollByHash(){
                Maps.scrollTo(window.location.hash.slice(1));
            };

            setTimeout(scrollByHash, 500);

            // listen for hash changes
            // works on all browsers and ie8
            $(window).on('hashchange', function(){
                scrollByHash();
            });

            // listen for popstate changes
            // works on all browsers > ie9
            $(window).on('popstate', function(){
                scrollByHash();
            });
    	},

    	updatePanel: function(type,map) {
    		$(".map-nav-item").removeClass("active");
    		$(".map-nav-description").removeClass("active");
    		$(".map-info").removeClass("active");
    		$(".map-screen").removeClass("active");

    		$(".map-nav-item[data-map-type='" + type + "']").addClass("active");
    		$(".map-nav-description[data-map-type='" + type + "']").addClass("active");
    		$(".map-info[data-map-type='" + type + "']").addClass("active");
    		$(".map-name[data-map='" + map + "']").addClass("active");
    		$(".map-screen[data-map=" + map + "]").addClass("active");

    		Maps.getMap();
    	},

    	getMap: function() {
    		var activeMap = $(".map-screen.active").attr("data-map");
    		var activeType = $(".map-screen.active").attr("data-map-type");

    		Maps.mapItem.removeClass("active");

    		$(".map-info[data-map-type='" + activeType + "']")
    			.find(".map[data-map='" + activeMap + "']")
    			.addClass("active");
    	},

        /*
        * scroll to map section and click map by name
        * expects name to match a mapItem data-map value
        * ex: kings-row | hanamura | temple-of-anubis
        */
        scrollTo: function(name){
            if(!name) return;
            var $elem = Maps.mapItem.filter(['[data-map=', name, ']'].join(''));
            if($elem[0]){
                $('html, body').animate({
                    scrollTop: $('#objectives').offset().top
                }, 200, function(){
                    $elem.click();
                });
            }
        }

    };

    window.Maps = Maps;

}(window, window.overwatch));

(function(window, overwatch){

    var MediaLightbox = {
		init: function(options) {
			this.bindScreenshots();
			this.bindArtwork();
			this.bindVideos();
		},

		bindScreenshots: function() {
			var self = this;

			$(".web .screenshots-list a").bind('click', function(event) {
				var curElem = $(this);
				var images = self.getSectionList("screenshots");
				var index = self.indexOf(images, curElem, 0);
				Lightbox.loadImage(images, index);
				event.preventDefault();
			});
		},

		bindArtwork: function() {
			var self = this;

			$(".web .artwork-list a").bind('click', function(event) {
				var curElem = $(this);
				var images = self.getSectionList("artwork");
				var index = self.indexOf(images, curElem, 0);
				Lightbox.loadImage(images, index);
				event.preventDefault();
			});
		},

		bindVideos: function() {
			var self = this;

			$(".web .videos-list a").bind('click', function(event) {
				var curElem = $(this);
				var videos = self.getSectionList("videos");
				var index = self.indexOf(videos, curElem, 0);
				Lightbox.loadEmbed(videos, index);
				event.preventDefault();
			});

		},

		getSectionList: function(sectionName) {
			var elemList = [];
			$("." + sectionName + "-list li").each(function(curIndex) {
				elemList.push($(this).data());
			});

			return elemList;
		},

		/**
		 * Returns the index of a particular Element in the data object haystack.
		 * Will return -1 if not found.
		 */
		indexOf: function(haystack, sourceObj, notFound) {
			if (typeof notFound == 'undefined') {
				notFound = -1;
			}
			var needle = $(sourceObj);
			for(var i = 0; i < haystack.length; i++) {
				if (needle.data("key") === haystack[i].key) {
					return i;
				}
			}
			return notFound;
		}
	};

    window.MediaLightbox = MediaLightbox;

}(window, window.overwatch));

/**
 * MediaQuery allows for registering MediaQueryList objects with
 * varying media queries.
 *
 * @author Alex Nakorn (anakorn@blizzard.com)
 */

(function(window, overwatch, Utilities){

    var MediaQuery = function() {

    	/**
    	 * MediaQueryList cache.
    	 *
    	 * @type {Object}
    	 * @see https://developer.mozilla.org
    	 * 		/en-US/docs/Web/Guide/CSS/Testing_media_queries
    	 */
    	var mqlCache = {};

    	/**
    	 * Default configuration for MediaQuery.
    	 *
    	 * @type {Object}
    	 */
    	var config = {
    		defaultMediaQuery: "(max-width: 760px)"
    	};

    	/**
    	 * Registers a callback on orientationchange events.
    	 *
    	 * @param  {Function} cb - Callback function to be called on event trigger
    	 */
    	function onOrientationChange(cb) {
    		window.addEventListener("orientationchange", cb);
    	}

    	/**
    	 * Registers a callback on a MediaQueryList called when a media query
    	 * is matched.
    	 *
    	 * @param  {MediaQueryListListener} cb - Function called with media query result
    	 * @param  {String} mq - Media query expression
    	 */
    	function onMatch(cb, mq) {
    		var mql = getMql(mq);

    		if (mql) {
    			mql.addListener(function(m) {
    				if (m.matches) {
    					return cb();
    				}
    			});
    		}
    	}

    	/**
    	 * Registers a callback on a MediaQueryList called when a media query
    	 * is NOT matched.
    	 *
    	 * @param  {MediaQueryListListener} cb - Function called with media query result
    	 * @param  {String} mq - Media query expression
    	 */
    	function onUnmatch(cb, mq) {
    		var mql = getMql(mq);

    		if (mql) {
    			mql.addListener(function(m) {
    				if (!m.matches) {
    					return cb();
    				}
    			});
    		}
    	}

    	/**
    	 * Registers a callback on a MediaQueryList called when a media query
    	 * is matched.
    	 *
    	 * @deprecated Use onMatch instead
    	 * @param  {MediaQueryListListener} cb - Function called with media query result
    	 * @param  {String} mq - Media query expression
    	 */
    	function onMobile(cb, mq) {
    		return onMatch(cb, mq);
    	}

    	/**
    	 * Registers a callback on a MediaQueryList called when a media query
    	 * is NOT matched.
    	 *
    	 * @deprecated Use onUnmatch instead
    	 * @param  {MediaQueryListListener} cb - Function called with media query result
    	 * @param  {String} mq - Media query expression
    	 */
    	function onDesktop(cb, mq) {
    		return onUnmatch(cb, mq);
    	}

    	/**
    	 * Returns a MediaQueryList listening to a given media query.
    	 *
    	 * @param  {String} mq - Media query expression
    	 * @return {MediaQueryList}
    	 */
    	function getMql(mq) {
    		if (!window.matchMedia) { return null; }

    		// default mq if override isn't provided
    		var mq = mq || config.defaultMediaQuery;

    		// remove whitespace from mq
    		mq = overwatch.util.removeWhitespace(mq);

    		// return cached mql if exists, otherwise create new one and return it
    		return mqlCache[mq] || registerMql(mq);
    	}

    	/**
    	 * Registers and returns a MediaQueryList listening to a given media query.
    	 *
    	 * @private
    	 * @param  {String} mq - Media query expression
    	 * @return {MediaQueryList}
    	 */
    	function registerMql(mq) {
    		// remove whitespace from mq
    		mq = overwatch.util.removeWhitespace(mq);

    		// cache new mql
    		return mqlCache[mq] = window.matchMedia(mq);
    	}

    	/**
    	 * Interface
    	 * @see http://addyosmani.com/resources/essentialjsdesignpatterns/book/#revealingmodulepatternjavascript
    	 */
    	return {
    		supported: (typeof window.matchMedia === "function"),
    		config: config,
    		onOrientationChange: onOrientationChange,
    		onMatch: onMatch,
    		onUnmatch: onUnmatch,
    		onMobile: onMobile,
    		onDesktop: onDesktop,
    		getMql: getMql
    	};

    };

    window.MediaQuery = MediaQuery();

}(window, window.overwatch, window.Utilities));

(function(window, overwatch){

    var Media = {
        init: function(options) {
            this.triggerHover();
        },

        // This is for tablets that are not using mobile mode, to fix wonky behavior for hover states on wallpapers.
        triggerHover: function() {
            $(".wallpaper-list .media-wrap").on('touchend', function(event) {
                $(this).addClass("hovered");
            });
        }
    };

    window.Media = Media;

}(window, window.overwatch));

!function(root, factory){

    factory(root, root.app, root.overwatch);

}(this, function(root, app, overwatch){

    var util = overwatch.util;

    function Nav(){

        var open = false;
        var bnet = true;
        var $main = $('nav[role=main]');
        var $mobile = $('nav[role=mobile]');
        var $navbars = $('.navbars');
        var $bnet = $('.nav-mobile-menu-wrap.right');
        var $searchBar = $("#player-search", "nav[role=main]");
        var $searchIcon = $('.nav-search-icon');
        var $searchForm = $('.nav-search-form');
        var $searchField = $('.nav-search-field');
        var $openMenuBtn = null;
        var $openSubMenu = null;

        function isDesktopMode() {
            return util.isSizeAtLeast('md');
        }

        function isHugeDisplay() {
             return util.isSizeAtLeast('xxl');
        }

        function hideBnet(){

            if(bnet && isDesktopMode()){
                bnet = false;
                $navbars.velocity('stop', true);
                $navbars.velocity({ top: -44 }, { duration: 200, easing: 'easeOutCirc' });
            }
        };

        function showBnet(){

            if(!bnet && isDesktopMode()){
                bnet = true;
                $navbars.velocity('stop', true);
                $navbars.velocity({ top: 0 }, { duration: 200, easing: 'easeOutCirc' });
            }
        };

        function expandNav(){
            if(!open){
                open = true;
                $main.velocity('stop', true);
                $main.removeClass('is-contracted');
                $main.addClass('is-expanded');

                if (isHugeDisplay() === false) {
                    $main.velocity({ marginTop: 0, marginLeft: 0, marginRight: 0 }, { duration: 100, easing: 'easeOutCirc', complete: clearInlineStyles });
                }
            }
        };

        function contractNav(){
            if(open){
                open = false;
                $main.velocity('stop', true);
                $main.removeClass('is-expanded');
                $main.addClass('is-contracted');

                if (isHugeDisplay() === false) {
                    $main.velocity({ marginTop: 20, marginLeft: 20, marginRight: 20 }, { duration: 100, easing: 'easeOutCirc', complete: clearInlineStyles });
                }
            }
        };

        function checkNavScroll(){

            var pos = util.posY();
            var scroll = util.scroll();
            var width = util.width();
            var top = 44 + 20;

            if(pos > top && scroll && width >= 768){
                hideBnet()
                expandNav();
                closeSubMenu();
            } else if(pos <= top && scroll && width >= 768){
                showBnet();
                contractNav();
            }
        };

        function openSubMenu(){
            if($openMenuBtn && $openSubMenu){
                $openMenuBtn.toggleClass('m-open', true);
                $openSubMenu.toggleClass('m-open', true);
                $main.toggleClass('is-submenu-open', true);
            }
        };

        function closeSubMenu(){
            if($openMenuBtn && $openSubMenu){
                $openMenuBtn.toggleClass('m-open', false);
                $openSubMenu.toggleClass('m-open', false);
                $openMenuBtn = null;
                $openSubMenu = null;
                $main.toggleClass('is-submenu-open', false);
            }
        };

        function positionSubMenu(){

            if($openMenuBtn && $openSubMenu){
                $openSubMenu.css({ marginLeft: $openMenuBtn[0].getBoundingClientRect().left - $main[0].getBoundingClientRect().left });
            }

        };

        function clearInlineStyles() {
             $main.attr('style', '');
         }

        function toggleSubMenu($btn, $sub){

            if($openMenuBtn && $openMenuBtn[0] == $btn[0] && $openSubMenu && $openSubMenu[0] == $sub[0]){
                closeSubMenu();
            } else {
                closeSubMenu();
                $openMenuBtn = $btn;
                $openSubMenu = $sub;
                positionSubMenu();
                openSubMenu();
            }

        };

        function collapseSearchField() {
            $searchBar.addClass('is-collapsed');
            $main.removeClass('is-search-open');
        }

        function expandSearchField() {
            $searchBar.removeClass('is-collapsed');
            $searchField.focus();
            $main.addClass('is-search-open');
        }

        function initSearchField() {
            $searchIcon.on('click focus', function(event){
                expandSearchField();
            });
            $searchField.on('blur', function(event){
                var searchText = $(this).val();
                if (searchText.length === 0) {
                    collapseSearchField();
                }
            });
            $searchBar.addClass("u-no-transition");
            // We do this here instead of just applying the is-collapsed class
            // in the HTML template so that the search field isn't collapsed
            // for users with JavaScript disabled.
            collapseSearchField();
            //this lookup seems to prevent the animation restarting when the u-no-transition class is removed
            $searchBar.css("width");
            $searchBar.removeClass("u-no-transition");
        }

        function init(){

            checkNavScroll();

            // throttle to 30 fps
            $(root).on('scroll', _.throttle(checkNavScroll, 32));
            $(root).on('resize', _.throttle(function() {
                 if (isHugeDisplay()) {
                     clearInlineStyles();
                 }

                 positionSubMenu();
             }, 32));

            // mobile - set click events for nav items with sub menus
            $mobile.find('.nav-menu').on('click', '.m-has-children', function(event){
                event.preventDefault();
                $(this).toggleClass('m-open').next('.nav-menu').toggleClass('m-open');
            });

            // desktop - set click events for nav items with sub menus
            $main.find('.nav-menu').on('click', '.m-has-children', function(event){
                event.preventDefault();
                var $btn = $(this);
                var $sub = $btn.next('.nav-menu');
                toggleSubMenu($btn, $sub);
            });

            // close sub menu when clicking anywhere outside of it
            $('body').on('click', function(event){
                if ($openSubMenu && event.target !== $openMenuBtn[0] && event.target !== $openSubMenu[0]) {
                    toggleSubMenu($openMenuBtn, $openSubMenu);
                }
            });

            // handle menu toggles for bnet nav
            $('.js-bnet').on('click', function(event){
                event.preventDefault();
                $bnet.toggleClass('out', true);
                $('#nav-blackout').one('click', function(event){
                    event.preventDefault();
                    $bnet.toggleClass('out', false);
                });
            });

            // handle search field expansion/collaps
            initSearchField();
        };

        init();

        this.hideBnet = hideBnet;
        this.showBnet = showBnet
        this.expandNav = expandNav;
        this.contractNav = contractNav;

    };

    app.extend({ nav: new Nav() });

    return app.nav;

});

//TODO: determine if this is obsolete

!function(root, factory){

    factory(root, root.app, root.overwatch);

}(this, function(root, app, overwatch){

    var util = overwatch.util;
    var $grid = $('.news-panels');

    $grid.find('.grid-item.youtube').on('click', 'a', function(event){
        var id = $(this).attr('data-id');
        if(loadVideoIntoLightbox(id)) {
            event.preventDefault();
        }
    });

    $(document.body).on("click", "[data-js=youtube-lightbox]", function(event) {
        var id = $(this).data('id') || $(this).data('yt-id');
        if(loadVideoIntoLightbox(id)) {
            event.preventDefault();
        }
    });

    var loadVideoIntoLightbox = function(id) {
        if(!util.mobile() && !util.touch()){
            app.helpers.loadVideoIntoFrame(id);
            return true;
        }
        return false;
    }

});

!function () {
    var window = (function () { return this; })();
    var document = window.document;
    var app = window.app;
    var overwatch = window.overwatch;
    var $ = window.$;
    var _ = window._;
    var $window = $(window);

    var getScrollDistance = function () {
        //cap at 0 min so not to be weird on iphone scrolling up from top
        return Math.max($window.scrollTop(), 0);
    };

    /*
    ** @param {number} ratio - A decimal fraction that determines the rate at which the element will transform on the Y axis relative to  the scroll amount.
    ** @param {number} direction - 1 or -1 to decide whether the element should move up or down when scrolling. 1 is up. -1 is down.
    ** @param {number} throttleAmount - A millisecond value for how often the scroll event should fire, and the element should adjust. A value ** of 0 is not recommended.
    */

    $.fn.verticalParallax = function (ratio, direction, throttleAmount) {
        var isMobile = overwatch.util.mobile() || overwatch.util.touch();
        if (isMobile) {
            return;
        }

        if (typeof ratio === "undefined" || typeof ratio !== "number") {
            console.error("Error in $.fn.verticalParallax. Invalid value in parameter [ratio]. You must define a numeric rate at which you want the element to parallax, ex: .5");
        }
        var direction = (direction === 1 || direction === -1) ? direction : 1;
        var throttleAmount = (typeof throttleAmount === "number") ? throttleAmount : 5;
        var $this = this;
        var rate = ratio * direction;
        $window.on("scroll", _.throttle(function () {
            $this.css({
                "transform": "translateY(" + getScrollDistance() * rate * direction + "px)"
            });
        }, throttleAmount));
    };
    /*
    ** Give an element the attribute data-js-parallax="true" and data-parallax-ratio="{number}"
    ** and it will initialize parallax effects on it.
    ** If you want to change the direction, add data-parallax-direction="-1"
    ** If you want to change the throttling on scroll, you can pass a new millisecond value using data-parallax-throttle="{number}"
    */
    $('[data-js-parallax="true"]').each(function () {
        var $this = $(this);
        var ratio = parseFloat($this.data("parallaxRatio"));
        if (typeof ratio !== "number") {
            return;
        }
        var direction = parseInt($this.data("parallaxDirection"), 10);
        var throttleAmount = parseInt($this.data("parallaxThrottle"), 10);
        direction = !Number.isNaN(direction) ? direction : null;
        throttleAmount = !Number.isNaN(throttleAmount) ? throttleAmount : null;
        $this.verticalParallax(ratio, direction, throttleAmount);
    });
}();

!function(root, factory){

        factory(root, root.app);

}(this, function(root, app){

    // framerate from https://stackoverflow.com/questions/4298084/html5-frame-by-frame-viewing-frame-seeking
    // see: https://en.wikipedia.org/wiki/NTSC
    var FRAME_RATE = 29.97;
    var SECONDS_PER_FRAME = 1 / FRAME_RATE;

    function init_legacy() {

        var setCustomVideoLoopTimecode = function setCustomVideoLoopTimecode(video, timecode) {
            timecode = parseFloat(timecode);
            if (Number.isNaN(timecode)) {
                console.error('VideoCustomLoop: timecode must be a number');
                return;
            }

            video.addEventListener('ended', function(){
                video.currentTime = parseFloat(timecode);
                video.play();
            });
        };

        var setCustomVideoLoopFrame = function setCustomVideoLoopFrame(video, frame) {
            frame = parseInt(frame, 10);
            if (Number.isNaN(frame)) {
                console.error('VideoCustomLoop: frame must be an integer');
                return;
            }

            setCustomVideoLoopTimecode(video, frame * SECONDS_PER_FRAME);
        };

        var $videos = $('video[data-loop-frame], video[data-loop-timecode]');
        $videos.each(function(index, video) {
            var loopTimecode = video.dataset.loopTimecode;
            var loopFrame = video.dataset.loopFrame;

            if (typeof loopTimecode !== 'undefined') {
                setCustomVideoLoopTimecode(video, loopTimecode);
            } else if (loopFrame !== 'undefined') {
                setCustomVideoLoopFrame(video, loopFrame);
            }
        });        
    }

    function init() {
        var $videos = $('video[data-loop-frame], video[data-loop-timecode]');

        var getTimecode = function(video) {
            var loopTimecode = parseFloat(video.dataset.loopTimecode, 10);
            var loopFrame = parseInt(video.dataset.loopFrame, 10);

            if (!isNaN(loopTimecode)) {
                return loopTimecode; 
            } else if (!isNaN(loopFrame)) {
                return loopFrame * SECONDS_PER_FRAME;
            }

            return 0;
        };

        $videos.each(function($index, video) {
            var $video = $(this);
            var $clone = $video.clone();

            $video.after($clone);

            var video = $video[0];
            var clone = $clone[0];
            var timecode = getTimecode(video);

            clone.pause();
            clone.hidden = true;
            clone.currentTime = timecode;

            var videoOnTimeupdate = function() {
                if (video.currentTime >= video.duration - .1) {
                    clone.play();
                    video.hidden = true;
                    clone.hidden = false;
                    video.pause();
                    video.currentTime = timecode;
                }
            };

            var cloneOnTimeupdate = function() {               
                if (clone.currentTime >= clone.duration - .1) {
                    video.play();
                    clone.hidden = true;
                    video.hidden = false;
                    clone.pause();
                    clone.currentTime = timecode;
                }
            };

            // video
            video.addEventListener('play', function() {
                video.poster = '';
            });

            video.addEventListener('timeupdate', function onTimeUpdate() {
                videoOnTimeupdate();
            });

            // clone
            clone.addEventListener('play', function() {
                clone.poster = '';
            });

            clone.addEventListener('timeupdate', function() {
                cloneOnTimeupdate();
            });
        });        
    }

    app.extend({
        videoCustomLoop: {
            init: init_legacy
        }
    });

    return app.videoCustomLoop;
});

!function(root, factory) {

    factory(root, root.app, root.scrollMonitor);

}(this, function(root, app, scrollMonitor) {

    function init() {
        var $videos = $('video[data-video-play-in-view]');
        $videos.each(function(index, video) {
            createVideoMonitor(video);
        });
    }

    function createVideoMonitor(video) {
        var config = createScrollMonitorConfig(video, $(video).data());
        var monitor = scrollMonitor.create(video, config);
        monitor.enterViewport(config.enterViewportHandler);
        return monitor;
    }

    function createScrollMonitorConfig(video, videoData) {

        // Create handler for when video enters viewport.
        // Optionally, wrap with 'once' util if only should
        // be called once.
        var enterViewportHandler = function() { video.play(); };
        enterViewportHandler = videoData['videoPlayInViewOnce']
            ? app.util.once(enterViewportHandler)
            : enterViewportHandler;

        // Calculate scroll threshold offsets to determine
        // when handler is called.
        var topOffset = -parseFloat(videoData['videoPlayInViewTopOffsetRatio']) * getVideoHeight(video);

        return {
            enterViewportHandler: enterViewportHandler,
            top: topOffset
        };
    }

    function getVideoHeight(video) {
        // TODO: Get actual video height.
        // This is a hack that uses parent element's height instead
        return $(video).parent().get(0).offsetHeight;
    }

    app.extend({
        videoPlayInView: {
            init: init,
            createVideoMonitor: createVideoMonitor
        }
    });

    return app.videoPlayInView;
});

;(function (window, app) {

    /**
     * Default YouTube Iframe Player config
     */
    var config = {
        height: '100%',
        width: '100%',
        playerVars: {
            rel: 0,
            modestbranding: 1,
            autohide: 1,
            color: 'white',
        },
    };

    /**
     * Gets a YouTube Iframe Player
     * {@link https://developers.google.com/youtube/iframe_api_reference}
     *
     * @param {DOM element} placeholderElem - Placeholder element to be
     *  replaced with YouTube Iframe
     * @param {string} videoId - YouTube video ID to be played
     * @return {Promise} Resolves with YouTube player
     */
    var getPlayer = function getPlayer(placeholderElem, videoId, cb) {
        return new Promise(function (res) {
            if (typeof YT === 'undefined' || typeof YT.Player === 'undefined') {
                queueYouTubeIframeAPIReadyCallback(function () {
                    res(createPlayer(placeholderElem, videoId));
                });
            } else {
                res(createPlayer(placeholderElem, videoId));
            }
        });
    };

    /**
     * Creates a YouTube Iframe Player object
     * {@link https://developers.google.com/youtube/iframe_api_reference}
     *
     * @param {DOM element} placeholderElem - Placeholder element to be
     *  replaced with YouTube Iframe
     * @param {string} videoId - YouTube video ID to be played
     *  player
     */
    var createPlayer = function createPlayer(placeholderElem, videoId) {
        return new YT.Player(placeholderElem, {
            videoId: videoId,
            height: config.height,
            width: config.width,
            playerVars: config.playerVars,
        });
    };

    /**
     * Queues a callback to be called when YouTube Iframe API is ready,
     * while retaining previously-defined callbacks.
     *
     * @param {function} cb - Callback function to be queued
     */
    var queueYouTubeIframeAPIReadyCallback = function queueYouTubeIframeAPIReadyCallback(cb) {
        if (typeof window.onYouTubeIframeAPIReady === 'function') {
            // make sure we don't clobber previously registered callbacks
            var previousCb = window.onYouTubeIframeAPIReady;
            window.onYouTubeIframeAPIReady = function () {
                previousCb();
                cb();
            }
        } else {
            // queue creation of player after YT Iframe API ready
            window.onYouTubeIframeAPIReady = cb;
        }
    };

    app.extend({
        youtubeIframePlayerEmbedder: {
            getPlayer: getPlayer,
        },
    });

    return app.youtubeIframePlayerEmbedder;

})(window, window.app);

;(function (window, app, $) {

    var SELECTORS = {
        TARGET: '[data-js-youtube-player]',
        PLACEHOLDER: '.youtubePlayer-placeholder',
    };

    /**
     * Embeds a YouTube video in place of a placeholder element and toggles
     * 'is-active' class on a target element corresponding to YouTube video
     * player state.
     *
     * Requires $placeholder element to be a descendent of $target element.
     * Requires $target element to have [data-yt-id] attribute with YouTube
     * video ID as the value.
     *
     * @param {Object} args - Function arguments
     * @param {string} args.youtubeId - YouTube ID for video to be embedded
     * @param {jQuery} args.$target - Target element whose classes will be toggled
     *   according to player state
     * @param {jQuery} args.$placeholder - Placeholder element to be replaced
     *   with embedded YouTube video
     */
    var embed = function embed(args) {
        var $target = args.$target;
        var $placeholder = args.$placeholder;
        var youtubeId = args.youtubeId;

        // get youtube player to do things with
        app.youtubeIframePlayerEmbedder.getPlayer($placeholder.get(0), youtubeId)
            .then(function (player) {
                // queue playback on click, in case player isn't ready yet
                $target.one('click', function (event) {
                    event.preventDefault();
                    player.addEventListener('onReady', function onPlayerReady() {
                        player.playVideo();
                    });
                });
                // setup playback on click
                player.addEventListener('onReady', function onPlayerReady() {
                    $target.on('click', function (event) {
                        event.preventDefault();
                        player.playVideo();
                    });
                });
                // state changes
                player.addEventListener('onStateChange', function onStateChange(event) {
                    switch (event.data) {
                        case YT.PlayerState.PLAYING:
                        case YT.PlayerState.BUFFERING:
                            $target.addClass('is-active');
                            break;
                        case YT.PlayerState.ENDED:
                            $target.removeClass('is-active');
                            app.util.fullscreenExit();
                            break;
                        default:
                            break;
                    }
                });
            });
    };

    /**
     * Globally embed based using default selectors.
     */
    var init = function init() {
        $target = $(SELECTORS.TARGET);
        $target.each(function (i, target) {
            var $tar = $(target);
            $placeholder = $tar.find(SELECTORS.PLACEHOLDER);
            embed({
                youtubeId: $tar.data('yt-id'),
                '$target': $tar,
                '$placeholder': $placeholder,
            });
        });
    };

    app.extend({
        youtubePlayer: {
            embed: embed,
            init: init,
        },
    });

})(window, window.app, window.jQuery);

(function (window, app, overwatch) {

    $('[data=blog-body] .lightbox').on('click', function (e) {
        var classOverride = $(this).data("lightboxClass");
        app.helpers.loadImageIntoFrame($(this).attr('href'), classOverride);
        return false;
    });

    $('.blog-load-more a').click(loadMoreNews);

    var currentPage = 1;

    function loadMoreNews() {
        currentPage++;
        $.get('/' + window.blizzard.urlLocale + '/news/next-posts', { page: currentPage })
            .then(function processNextPosts(results) {
                $('.blog-roll .blog-list').append(results.content);

                if (results.totalPages == results.page) {
                    $('.blog-load-more').hide();
                    return false;
                }
            });
    }
}(window, window.app, window.overwatch));

(function(window, app, overwatch, $, _) {
    var career = {
        currentComparisonKey: 0, //a simple array index for now
        modes: ["quickplay","competitive"],
        sections: ["highlights","heroComparison","stats"],
        init: function(bnetAccountId, platform, region) {
            //this.data = window.clientVars.careerData;
            this.bnetAccountId = bnetAccountId;
            this.platform = platform;
            this.region = region;

            this.setupDropdowns();
            this.setupHeroListToggle();
            this.setupProfileModes();
            this.getPlatformProfiles();
            overwatch.tooltip.init();
            overwatch.notification.init();
            overwatch.endorsementIcon.init();
        },
        setupDropdowns: function() {
            //TODO: this should only work this way for achievement cards going forward
            var self = this,
                $selects = $("[data-js=career-select]");

            // reset select dropdown initial selection
            $selects.each(function() {
                $(this).prop('selectedIndex', 0);
            });

            $selects.on('change', function(e) {
                var $this = $(this);
                var categoryId = $this.val();
                var groupId = $this.data('groupId');
                var careerContainers = null;
                var option = null;
                // all the display-toggleable career sections (for the specified group id).
                if (groupId === "achievements") {
                    //context isn't necessary since there is only one achievements section
                    careerContainers = $('.toggle-display[data-group-id="' + groupId + '"]');
                } else {
                    // pass the context of the mode container that is currently shown
                    careerContainers = $('.toggle-display[data-group-id="' + groupId + '"]', $("#"+self.currentMode));
                }
                // hide all the career section (for the specified group id)
                careerContainers.removeClass('is-active');

                // show the newly selected career section
                careerContainers.filter('[data-category-id="' + categoryId + '"]').addClass('is-active');
                if(groupId === "stats") {
                    //when the stats category is changed, reinitialize the masonry layout
                    self.initializeStatsMasonry();
                }

                // Track career dropdown analytics
                option = $this.children('option').filter(':selected').attr('option-id');
                if(window.dataLayer) {
                    window.dataLayer.push({
                        'career.mode': self.currentMode,
                        'career.group': groupId,
                        'career.option': option,
                        'event': 'careerDropdown'
                    });
                }
            });

            $selects.dropdown();
        },
        setupHeroListToggle:function() {
            $(".js-show-more-heroes").on("click", function() {
                var $this = $(this),
                    categories = $this.siblings(".progress-category"),
                    oldLabel = '';
                if($this.data("showMore")) {
                    categories.removeClass("is-partial");
                    $this.data("showMore", false);
                } else {
                    categories.addClass("is-partial");
                    $this.data("showMore", true);
                }
                oldLabel = $this.text();
                $this.text($this.data("label"));
                $this.data("label", oldLabel);
                $(this).blur();
            });
        },
        setupProfileModes:function() {
            var self = this,
                $gameModes = $('#profile-btn-switcher a'),
                $heroImageElement = $('[data-js="heroMastheadImage"]');

            this.$modes = $();
            for(var i=0,len=this.modes.length; i<len; i++) {
                this.$modes = this.$modes.add($("#"+this.modes[i]));
            }

            function changeMode() {
                self.$modes.hide();
                $("#"+self.currentMode).show();
                $heroImageElement.removeClass(self.previousMode);
                $heroImageElement.addClass(self.currentMode);
                self.initializeStatsMasonry();
            }

            $(document.body).on("mode-change", function(event) {
                changeMode();

                // Track career tab switch analytics
                if(window.dataLayer) {
                    window.dataLayer.push({
                        'career.mode': self.currentMode,
                        'event': 'careerTabSwitch'
                    });
                }
            });

            this.currentMode = this.modes[0];
            this.previousMode = this.modes[0];

            // required for page initialization
            changeMode();

            $gameModes.on('click', function(e) {
                var $this = $(this),
                    mode = "";
                $gameModes.removeClass('is-active');
                $this.addClass('is-active');

                self.previousMode = self.currentMode;
                self.currentMode = $this.data("mode");
                $(document.body).trigger("mode-change");
                return false;
            });
        },
        getPlatformProfiles:function() {
            var bnetAccountId = this.bnetAccountId;
            var platform = this.platform;
            var region = this.region;
            //get the profiles for xbox and ps4 and display buttons to switch between platforms if you have them linked.
            var $profilePlatformsButtonContainer = $('#profile-platforms');
            var platformTemplate = _.template(document.getElementById('platform-btn-template').innerHTML);
            $.ajax('/'+clientVars.urlLocale+'/career/platforms/'+bnetAccountId).done(function(profiles) {
              var btnHtml = '';

              $.each(profiles, function(index, profile) {
                var className = '';
                if(profile.platform === platform) {
                  className = ' is-active';
                }

                btnHtml += platformTemplate({
                  'careerLink': '/'+clientVars.urlLocale+'/career/'+profile.platform+'/'+profile.urlName,
                  'platformName': profile.platform,
                  'classes': className
                });
              });

              $profilePlatformsButtonContainer.append(btnHtml);
            }).fail(function(err, results) {
                var btnHtml = platformTemplate({
                    'careerLink': window.location.href,
                    'platformName': platform,
                    'classes': ' is-active'
                });
                $profilePlatformsButtonContainer.append(btnHtml);
            }).always(function() {
                $profilePlatformsButtonContainer.removeClass('loading');
            });
        },
        initializeStatsMasonry: function() {
            //setup masonry effect for stats
            $('.js-stats:visible').masonry({
                itemSelector: '.column'
            });
        }
    };
    app.extend({ career: career });
}(window, window.app, window.overwatch, window.jQuery, window._));

(function (window, app, overwatch) {

    var esports = {
        init: function() {
            this.setupVideoAnalytics();
            window.overwatch.slideout.init();
            window.overwatch.slideout.openSlideout('openDivision');
            window.app.horizontalAccordion.init($('[data-id="esports-pathtopro-accordion"]'));
        },
        setupVideoAnalytics: function() {
            $('[data-js-youtube-player]').on('click', function() {
                var videoID = $(this).data('yt-id');
                if (window.dataLayer) {
                    window.dataLayer.push({
                        event: 'videoClick',
                        videoID: videoID,
                        dataAnalyticsPlacement: 'esports-trailer'
                    });
                };
            });
        }
    };
    app.extend({
        esports: esports
    });
}(window, window.app, window.overwatch));

(function(window, app, overwatch) {

    function mq(val) {
        return window.matchMedia("(min-width: " + val +")").matches;
    }

    var open = {
		init: function init() {
            var mobileMode = !mq('640px');

            var $changeRegion = $('[data-js="change-region"]');

            $changeRegion.on('change', function() {
                var c = $(this).val();
                $('.js-region-block').addClass('is-hidden');
                $('.js-region-block-' + c).removeClass('is-hidden');
            });

            $changeRegion.select2({
                placeholder: 'Select Your Region'
            });

            $changeRegion.on('select2:open', function() {
                if (mobileMode) {
                    const scrollTargetOffset = $changeRegion.offset().top - 48;
                    $('html, body').animate({
                        scrollTop: scrollTargetOffset,
                    });
                }
            });

            $(window).on('resize', function() {
                mobileMode = !mq('640px');
            });
		}
    }

	app.extend({ open: open });
}(window, window.app, window.overwatch));

!(function(root, app) {
    app.events = app.events || {};
    app.events.anniversary = {
        init: function() {
            this.setupSlider();
            this.setupGameModeCards();
        },
        setupSlider: function () {

            var sticky = new Waypoint.Sticky({
                element: $('#unlock-tabs'),
                stuckClass: 'event-unlock-tabs-fixed'
            });

            var breakpoints = {
                all: {
                    slidesPerView: 6,
                    slideToClickedSlide: false,
                    allowSlideNext: false,
                    allowSlidePrev: false,
                    centeredSlides: false,
                    grabCursor: false,
                    freeMode: false,
                    freeModeSticky: true
                },
                desktop: {
                    slidesPerView: 3,
                    allowSlideNext: true,
                    allowSlidePrev: true,
                    centeredSlides: true,
                    grabCursor: true,
                    freeMode: true,
                    freeModeSticky: true
                },
                mobile: {
                    slidesPerView: 1,
                    allowSlideNext: true,
                    allowSlidePrev: true,
                    centeredSlides: true,
                    grabCursor: true,
                    freeMode: true,
                    freeModeSticky: true
                }
            };

            var options = {
                init: false,
                a11y: false,
                speed: 600,
                setWrapperSize: true,
                direction: 'horizontal',
                preventInteractionOnTransition: true,
                roundLengths: true,
                runCallbacksOnInit: true,
                iOSEdgeSwipeDetection: true,
                touchEventsTarget: 'wrapper',
                observer: true,
                loop: true,
                loopAdditionalSlides: 1,
                loopFillGroupWithBlank: true,
                //
                breakpoints: {
                    1600: breakpoints.all,
                    1280: breakpoints.desktop,
                    768: breakpoints.mobile
                },
                wrapperClass: 'swiper-wrapper',
                navigation: {
                    nextEl: '.swiper-button-next',
                    prevEl: '.swiper-button-prev'
                }
            };

            options = _.merge(options, breakpoints.all);

            var slider = new Swiper('.swiper-container', options);

            var previousEventId;
            var activeIndex;

            var onInit = function (e) {
                app.events.base.preselectUnlocks();
                activeIndex = slider.activeIndex;
            };

            var onClick = function onClick(e) {
                var $clickedSlide = $(slider.clickedSlide);
                if ($clickedSlide.length) {
                    var eventId = $clickedSlide.data('id');
                    if (eventId && previousEventId !== eventId) {

                        slider.slideTo(slider.clickedIndex);

                        var $parent = $clickedSlide.parent();
                        $parent.find('.swiper-slide-active').each(function () {
                            $(this).removeClass('swiper-slide-active');
                        })

                        app.events.base.updateUnlocksTab(eventId);
                        $clickedSlide.addClass('swiper-slide-active');

                        previousEventId = eventId;
                        activeIndex = slider.activeIndex;
                    }
                }
            };

            var onChange = function onChange(e) {
                var $item = $('.event-list--anniversary .swiper-slide-active');
                var eventId = $item.find('> [data-js="fetchUnlocks"]').data('id');
                window.localStorage.setItem("selectedEvent", eventId);
                app.events.base.updateUnlocksTab(eventId);
                previousEventId = eventId;
            };

            var onResize = function (e) {
                slider.slideReset();
            };

            $(window).on('resize', _.debounce(onResize, 150));

            slider.on('init', onInit);
            slider.on('click', onClick);
            slider.on('slideChangeTransitionEnd', onChange);
            $(document.body).on("slideout:open slideout:close", function(event, data) {
                if(data.id === "eventDetails") {
                    Waypoint.refreshAll();
                }
            });
            slider.init();
        },
        setupGameModeCards: function () {
            $('[data-js="game-mode-card"]').hide();
            $('[data-js="game-mode-select"]').on("click", function (event) {
                var id = $(this).data('gameModeId');
                $('[data-js="game-modes-index"]').hide();
                $('[data-js="game-mode-card"]').hide();
                $('[data-js="game-mode-card"][data-id=' + id + ']').show().get(0).scrollIntoView({ behavior: 'smooth' });
            });
            $('[data-js="game-modes-back"]').on("click", function (event) {
                $('[data-js="game-mode-card"]').hide();
                $('[data-js="game-modes-index"]').show().get(0).scrollIntoView({ behavior: 'smooth' });
            });
        }
     };
})(this, this.app);

!function(root, app) {
    app.events = app.events || {};
    app.events.archives = app.events.archives || {};
    app.events.archives = {
        init: function() {
            this.defineProps();
            this.setupOverviewParallax();
        },
        defineProps: function() {
            //page containers and elements
            this.$eventLogoContainer = $('[data-js="event-logo"]');
            this.$eventOverviewForegroundImage = $('[data-js="event-overview-foreground-image"]');
            this.$eventOverviewPlayIcon = $('[data-js="overview-play-button"]');
        },
        setupOverviewParallax: function() {
            this.$eventLogoContainer.verticalParallax(.85);
            this.$eventOverviewForegroundImage.verticalParallax(.9);
            this.$eventOverviewPlayIcon.verticalParallax(.5);
        }
    };
}(this, this.app);

!function(root, app) {
    app.events = app.events || {};
    app.events.halloweenTerror = app.events.halloweenTerror || {};
    app.events.halloweenTerror = {
        init: function() {
            this.defineProps();
            this.setupOverviewParallax();
        },
        defineProps: function() {
            //page containers and elements
            this.$eventLogoContainer = $('[data-js="event-logo"]');
            this.$eventOverviewForegroundImageLeft = $('[data-js="event-overview-foreground-image-left"]');
            this.$eventOverviewForegroundImageRight = $('[data-js="event-overview-foreground-image-right"]');
            this.$eventOverviewPlayIcon = $('[data-js="overview-play-button"]');
        },
        setupOverviewParallax: function() {
            this.$eventLogoContainer.verticalParallax(.25);
            this.$eventOverviewForegroundImageLeft.verticalParallax(.4);
            this.$eventOverviewForegroundImageRight.verticalParallax(.6);
            this.$eventOverviewPlayIcon.verticalParallax(.5);
        }
    };
}(this, this.app);

!function(root, app) {
    app.events = app.events || {};
    app.events.lunarnewyear = app.events.lunarnewyear || {};
    app.events.lunarnewyear = {
        init: function() {
            this.defineProps();
            this.setupOverviewParallax();
        },
        defineProps: function() {
            //page containers and elements
            this.$eventLogoContainer = $('[data-js="event-logo"]');
            this.$eventOverviewBackgroundImage = $('[data-js="event-overview-background-image"]');
            this.$eventOverviewForegroundImageLeft = $('[data-js="event-overview-foreground-image-left"]');
            this.$eventOverviewForegroundImageRight = $('[data-js="event-overview-foreground-image-right"]');
            this.$eventOverviewPlayIcon = $('[data-js="overview-play-button"]');
        },
        setupOverviewParallax: function() {
            this.$eventLogoContainer.verticalParallax(.25);
            this.$eventOverviewBackgroundImage.verticalParallax(.9);
            this.$eventOverviewForegroundImageLeft.verticalParallax(.8);
            this.$eventOverviewForegroundImageRight.verticalParallax(.7);
            this.$eventOverviewPlayIcon.verticalParallax(.5);
        }
    };
}(this, this.app);

!function(root, app) {
    app.events = app.events || {};
    app.events.summergames = app.events.summergames || {};
    app.events.summergames = {
        init: function() {
            this.defineProps();
            // this.setupOverviewParallax();
        },
        defineProps: function() {
            //page containers and elements
            this.$eventLogoContainer = $('[data-js="event-logo"]');
            this.$eventOverviewForegroundImage = $('[data-js="event-overview-foreground-image"]');
            this.$eventOverviewPlayIcon = $('[data-js="overview-play-button"]');
        },
        setupOverviewParallax: function() {
            this.$eventLogoContainer.verticalParallax(.85);
            this.$eventOverviewForegroundImage.verticalParallax(.9);
            this.$eventOverviewPlayIcon.verticalParallax(.5);
        }
    };
}(this, this.app);

!function(root, app) {
    app.events = app.events || {};
    app.events.winterWonderland = app.events.winterWonderland || {};
    app.events.winterWonderland = {
        init: function() {
            this.defineProps();
            this.setupOverviewParallax();
        },
        defineProps: function() {
            //page containers and elements
            this.$eventLogoContainer = $('[data-js="event-logo"]');
            this.$eventOverviewBackgroundImage = $('[data-js="event-overview-background-image"]');
            this.$eventOverviewForegroundImageLeft = $('[data-js="event-overview-foreground-image-left"]');
            this.$eventOverviewForegroundImageRight = $('[data-js="event-overview-foreground-image-right"]');
            this.$eventOverviewPlayIcon = $('[data-js="overview-play-button"]');
        },
        setupOverviewParallax: function() {
            this.$eventLogoContainer.verticalParallax(.25);
            this.$eventOverviewBackgroundImage.verticalParallax(.9);
            this.$eventOverviewForegroundImageLeft.verticalParallax(.8);
            this.$eventOverviewForegroundImageRight.verticalParallax(.7);
            this.$eventOverviewPlayIcon.verticalParallax(.5);
        }
    };
}(this, this.app);

!function(root, app) {
    app.events = app.events || {};
    app.events.base = {
        isVideoPlaying: false,
        isLightboxOpen: false,
        unlocksRetrieved: {},
        eventId: null,
        platformId: null,
        init: function() {
            this.defineProps();
            this.setupOverviewVideo();
            this.setupFadeIn();
            this.setupUnlocks();
            root.overwatch.EventMapCarousel.init();
            this.setupMapsAnalytics();
            this.markOwnedUnlocks();
        },
        defineProps: function() {
            //global elements
            this.$body = $(document.body);
            this.$window = $(window);
            this.$lightbox = $('.lightbox');
            //page containers and elements
            this.$eventOverviewContainer = $('[data-js="event-overview"]');
            this.$videoCloseButton = $('[data-video-close="true"]');
            this.$overviewVideoWrapper = $('[data-js="video-wrapper"]');
            this.overviewVideoYoutubeId = $("#event-video-player").data("video-id");
            this.frameHTML = document.getElementById('unlock-frame-template').innerHTML;
            this.iconHTML = $("#event-icon-template").html() || "";
            this.loader = $('[data-js="unlocks-loader"]');
            if(this.eventId) {
                this.unlocksRetrieved[this.eventId] = true;
            }
        },
        setupOverviewVideo: function() {
            var self = this;
            var attachPlayButtonHandler = function() {
                $('[data-js="event-overview-play"]').on("click", function(e) {
                    if (overwatch.util.isSizeAtLeast("md")) {
                        e.preventDefault();
                        self.openVideo();
                    }
                });
            };
            window.onYouTubeIframeAPIReady = function() {
                //Create the event youtube video player
                self.ytVideoPlayer = new YT.Player('event-video-player', {
                    height: "100%",
                    width: "100%",
                    videoId: self.overviewVideoYoutubeId,
                    playerVars: { rel: 0, modestbranding: 1, autohide: 1, color: "white", playsinline: 1 },
                    events: {
                        'onStateChange': self.handleVideoStateChange.bind(self),
                        'onReady': attachPlayButtonHandler
                    }
                });
            };
            this.$videoCloseButton.on("click", function(e) {
                self.closeVideo();
            });
            self.$window.on("scroll", _.throttle(function() {
                self.popoutVideo();
            }, 100));
            this.handleVideoLightboxConflicts();

            this.$body.on('event.video-open', function() {
                self.$eventOverviewContainer.addClass("is-playing");
                self.$body.addClass("nav-transparent");
            });
            this.$body.on('event.video-close', function() {
                self.$eventOverviewContainer.removeClass("is-playing");
                self.$body.removeClass("nav-transparent");
            });
        },
        handleVideoStateChange: function(event) {
            //Restart and hide the video when it ends.
            if (event.data == 0) {
                this.closeVideo();
                this.ytVideoPlayer.seekTo(0);
                this.isVideoPlaying = false;
            } else if (event.data == 1) {
                this.isVideoPlaying = !this.isLightboxOpen;
            } else if (event.data == 2) {
                this.isVideoPlaying = this.isLightboxOpen;
            }
        },
        popoutVideo: function() {
            //Should the video be popped out?
            if (overwatch.util.isSizeAtLeast("md")) {
                this.isScrollPointPastOverview = app.util.getNormalizedWindowScrollTop(this.$window) > (this.$eventOverviewContainer.height() - 100);
                if (this.isScrollPointPastOverview) {
                    this.$overviewVideoWrapper.addClass("is-popout");
                } else {
                    this.$overviewVideoWrapper.removeClass("is-popout");
                }
            }
        },
        handleVideoLightboxConflicts: function() {
            //Pause the video when the user views a lightbox
            this.$lightbox.on('show', function() {
                if (overwatch.util.isSizeAtLeast("md") && this.isVideoPlaying) {
                    this.ytVideoPlayer.pauseVideo();
                }
                this.isLightboxOpen = true;
            });
            this.$lightbox.on('hide', function() {
                if (overwatch.util.isSizeAtLeast("md") && this.isVideoPlaying) {
                    this.ytVideoPlayer.playVideo();
                }
                this.isLightboxOpen = false;
            });
        },
        openVideo: function() {
            this.ytVideoPlayer.playVideo();
            this.$overviewVideoWrapper.show();
            this.$videoCloseButton.show();

            this.$body.trigger('event.video-open', {
                videoId: this.overviewVideoYoutubeId
            });
        },
        closeVideo: function() {
            this.ytVideoPlayer.pauseVideo();
            this.$overviewVideoWrapper.hide();
            this.$videoCloseButton.hide();

            this.$body.trigger('event.video-close', {
                videoId: this.overviewVideoYoutubeId
            });
        },
        setupFadeIn: function() {
            $(".media-card").each(function() {
                $(this).attr("data-fadein", "true");
            });
            app.Fadein.init();
        },
        setupUnlocks: function() {
            var _this = this;

            $.get('/user/platforms', function(userPlatforms) {
                if (userPlatforms.platform) {
                    $('section#unlocks .event-unlock-user').removeClass('hide');
                    if (userPlatforms.platforms.length > 1) {
                        $('#user-platforms').append('<div class="events-platform-selection button-group"></div>');
                        $(userPlatforms.platforms).each(function(key, platform) {
                            var platformClass = "button m-sm m-auto-width";
                            if (platform.platform === userPlatforms.platform) {
                                platformClass += " is-active";
                            }
                            if (clientVars.eventSlug === "summer-games" || clientVars.eventSlug === "anniversary" || clientVars.eventSlug === "lunar-new-year") {
                                platformClass += " m-black-outline";
                            } else {
                                platformClass += " m-white-outline";
                            }
                            $('#user-platforms').children().first().append('<a class="' + platformClass + '" data-js="unlock-platform-swap" data-platform-id="' + platform.platform + '" data-event-slug=' + clientVars.eventSlug + '>' + platform.platformName + '</a>')
                        });

                        var platformButtons = $('[data-js="unlock-platform-swap"]');
                        platformButtons.on("click", function(event) {
                            var $this = $(this);
                            var id = $this.data('platformId');
                            _this.platformId = id;
                            platformButtons.removeClass("is-active");
                            $this.addClass("is-active");
                            _this.markOwnedUnlocks();
                        });
                    }
                } else {
                    $('section#unlocks .event-unlock-login').removeClass('hide');
                }
            }).always(function() {
                _this.setupUnlockGallery(_this.unlockMedia);
            });
        },
        setupUnlockGallery: function(media) {
            var data = {};
            if (!media) {
                return;
            }
            data[this.eventId+':skins'] = media.skins;
            data[this.eventId + ':highlightIntros'] = media.highlightIntros;
            data[this.eventId + ':emotes'] = media.emotes;
            app.media.setupGallery(data);
        },
        preselectUnlocks: function () {
            var preselectedEvent = window.localStorage.getItem("selectedEvent");
            if (preselectedEvent && this.eventId !== preselectedEvent) {
                this.eventId = preselectedEvent;
                this.updateUnlocksTab(this.eventId);
            }
        },
        updateUnlocksTab: function (eventId) {
            this.eventId = eventId;
            window.localStorage.setItem("selectedEvent", eventId);
            this.updateUnlocks();
        },
        updateUnlocks: function () {
            var eventId = this.eventId;
            if (!eventId) { return; }
            if (this.unlocksRetrieved[eventId]) {
                $('[data-js="unlocks"]').hide();
                $("#event-unlocks--"+eventId).show();
            } else {
                this.getUnlocksByEvent();
            }
            this.updateEventIcon();
        },
        updateEventIcon: function() {
            var eventId = this.eventId;
            $('[data-js="event-icon"]').replaceWith(this.iconHTML.replace("{{eventId}}", eventId));
        },
        getUnlocksByEvent: function() {
            var _this = this;
            var eventId = this.eventId;
            this.loader.addClass("is-active");
            $.get("/events/unlocks/" + eventId, function(data) {
                $('[data-js="unlocks"]').hide();
                $("#event-unlocks--"+eventId).html(data.unlockHtml).show();
                app.media.addGallery($("#event-unlocks--"+eventId));
                _this.setupUnlockGallery(data.unlocks);
                _this.unlocksRetrieved[eventId] = true;
            }).always(function() {
                _this.loader.removeClass("is-active");
                _this.markOwnedUnlocks();
            });
        },
        markOwnedUnlocks: function() {
            var _this = this;
            var platformId = this.platformId;
            var url = platformId ? '/user/unlocks/' + platformId : '/user/unlocks/';
            this.loader.addClass("is-active");
            $.get(url, function(userUnlocks) {
                $('[data-media-id]').each(function() {
                    var id = $(this).data('mediaId');
                    var owned = (userUnlocks.indexOf(id) !== -1);
                    _this.updateUnlockFrame(id, owned);
                });
            }).always(function() {
                _this.loader.removeClass("is-active");
            });
        },
        updateUnlockFrame: function(id, owned) {
            var $unlockItem = $("#" + id);
            if (owned) {
                $unlockItem.addClass('frame frame--inset');
            } else {
                $unlockItem.removeClass('frame frame--inset');
            }
        },
        setupMapsAnalytics: function() {
            var maps = $('[data-js="event-map"]');
            maps.each(function() {
                $(this).one('transitionend', function() {
                    var eventName = $(this).data('eventAnalytics');
                    if (eventName) {
                        dataLayer.push({
                            event: 'dataEventMap',
                            dataEventName: eventName
                        });
                    }
                });
            });
        }
    };
}(this, this.app);

!function (root, factory) {

    factory(root, root.app, root.overwatch, root.jQuery);

}(this, function (root, app, overwatch, $) {

    var util = overwatch.util;
    var mobileMapsShown = false;
    var storedScrollPosition = $(window).scrollTop();
    var mobileBackPressed = true;
    //The map type id currently being used as a filter
    var mapFilterID = '';
    //Get the DOM elements of the game maps
    var $maps = $("[data-js=map]");
    //Get the DOM elements of the map types
    var $mapTypes = $("[data-js=maptype]");

    function init() {

        var video = $('#scroll-to-play')[0];
        var visited = 0;
        overwatch.menuScroll.init({
            menuSelector: "#sub-nav-menu",
            timeToHideMs: 5000,
        });

        var allPairs = [];
        $('.map-group:even').each(function () {
            var $currentEven = $(this);
            var $currentEvenMapTypeDescription = $('.map-type-description', $currentEven);
            $currentEvenMapTypeDescription = $currentEvenMapTypeDescription.add($('.map-group:eq(' + ($currentEven.index() + 1) + ') .map-type-description', $currentEven.parent()));

            allPairs.push($currentEvenMapTypeDescription);
        });

        function checkScroll() {
            var rect = video.getBoundingClientRect();
            if (rect.top <= rect.height / 2) {
                if (!visited) {
                    visited = 1;
                    video.play();
                }
            }
        };

        function adjustHeights() {
            allPairs.map(function ($pair) {
                $pair.heightAdjust({ recalculate: true });
            });
        }

        function resetHeights() {
            allPairs.map(function ($pair) {
                $pair.css('height', 'auto');
            });
        }

        // throttle to 30fps
        $(root.document).on('scroll resize', _.throttle(checkScroll, 32));
        $(root).on('resize', _.debounce(function () {
            if (document.body.offsetWidth >= 992) {
                adjustHeights();
            } else {
                resetHeights();
            }
            if (overwatch.util.isSizeAtLeast("md")) {
                $maps.show();
                //If the mobile maps section is still shown, hide it
                if (mobileMapsShown) {
                    hideMapsSection();
                }
                applyMapFilter(mapFilterID);
            }
        }, 500));

        $('.overwatch-trailer').on('click', function (event) {
            var id = $(this).attr('data-yt-id');
            if (!util.mobile() && !util.touch()) {
                event.preventDefault();
                app.helpers.loadVideoIntoFrame(id);
            }
        });

        //Sort the maps alphabetically
        app.util.$sortElements($maps, function (a, b) {
            return a.getAttribute("data-name").toLowerCase().localeCompare(b.getAttribute("data-name").toLowerCase());
        });

        checkScroll();
        adjustHeights();
        setupMaps();
        root.Maps.init();
    };

    function setupMaps() {
        app.util.$sortElements($mapTypes, function (a, b) {
           return a.getAttribute("data-name").toLowerCase().localeCompare(b.getAttribute("data-name").toLowerCase());
        });
        $mapTypes.on("click", function () {
            //SELECT MAP TYPE ELEMENTS
            var id = $(this).data('id');

            //If we're already filtering by this id, remove the filter
            if (id === mapFilterID && overwatch.util.isSizeAtLeast("md")) {
                $maps.show();
                mapFilterID = '';
                $(this).removeClass("map-type-wrapper-active");
                return true;
                //If we're filtering by a different ID, remove the active class from all map type wrapper elements (hard reset)
            } else if (id !== '') {
                $mapTypes.removeClass("map-type-wrapper-active")
            }
            //Give this element the active class and set the active map type for filtering
            $(this).addClass("map-type-wrapper-active");
            mapFilterID = id;
            applyMapFilter(id);
            //Only show the mobile header related to this map type
            $(".mobile-maps-category-header").hide();
            $(".mobile-maps-category-header[data-id=" + id + "]").show();
            showMapsSection();
        });
        $('[data-js="mapsBackButton"]').on("click", function () {
            mobileBackPressed = true;
            history.back();
        });
        //Capture back button and exit mobile maps section instead (if it is shown)
        window.onpopstate = function (e) {
            if (mobileMapsShown) {
                e.preventDefault();
                $mapTypes.removeClass("map-type-wrapper-active")
                //If navigating with IOS swipe, disable transition so that animation doesn't play after the user has swiped to previous state
                if (!mobileBackPressed && navigator.userAgent.match(/(iPod|iPhone|iPad)/)) {
                    $(".mobile-maps-section").addClass("maps-no-transition");
                    $("#role-section,#maps-section,#abilities-section").addClass("no-transition-maps");
                }
                hideMapsSection();
            }
        }
    }

    function applyMapFilter(id) {
        //FILTER MAP ELEMENTS
        //If there is no filter, show all map types and return
        if (id === "") {
            $maps.show()
            return;
        }
        //Hide all maps
        $maps.hide();
        //Loop over all maps with the data type and show them
        window.mapTypes[id].maps.forEach(function (mapId) {
            $("[data-js=map][data-id=" + mapId + "]").show();
        });
    }

    function showMapsSection() {
        //If not small size
        if (overwatch.util.isSizeAtLeast("md") || mobileMapsShown) {
            return false;
        }
        //If on IOS, add back the nav animation
        if (navigator.userAgent.match(/(iPod|iPhone|iPad)/)) {
            $(".mobile-maps-section").removeClass("no-transition-maps");
            $("#role-section,#maps-section,#abilities-section").removeClass("no-transition-maps");
        }
        storedScrollPosition = $(window).scrollTop();
        $(".mobile-maps-section").show(function () {
            $(this).addClass("mobile-maps-section-moveFromLeft");
            $("#role-section,#maps-section,#abilities-section").addClass("mobile-maps-section-moveToRight");
            //When the CSS transition ends, freeze body scrolling
            $("#maps-section").on('transitionend webkitTransitionEnd oTransitionEnd', function () {
                $("body").addClass("freeze-scroll-sm");
            });
            history.pushState({ page: 1 }, "Maps", "#maps");
            mobileMapsShown = true;
        });
    }
    function hideMapsSection() {
        //If not small size
        if (overwatch.util.isSizeAtLeast("md") || !mobileMapsShown) {
            //Navigate back.  This undoes the history manipulation that is caused by showing the maps
            history.back();
        }
        //Remove the css transition end event listener that would otherwise add the freeze-scroll-sm class to the body (see above)
        $("#maps-section").off('transitionend webkitTransitionEnd oTransitionEnd');
        $(".mobile-maps-section").removeClass("mobile-maps-section-moveFromLeft");
        $("#role-section,#maps-section,#abilities-section").removeClass("mobile-maps-section-moveToRight");
        $("body").removeClass("freeze-scroll-sm");
        mobileMapsShown = false;
        mobileBackPressed = false;
        $(window).scrollTop(storedScrollPosition);
    }

    app.extend({ game: { init: init } });
});

(function (window, overwatch, MainMenu) {

    document.exitFullscreen = document.exitFullscreen || document.mozCancelFullscreen || document.webkitExitFullscreen || _.noop;


    window.Login = {
        open: function () {
            window.location = '?login';
        }
    };

    $(document).ready(function () {
        // TODO: Remove this hack
        // Override login link per page to allow for proper redirect after login.
        // This is a temporary workaround until https://jira.blizzard.com/browse/WMBLZ-1408
        $('.Navbar-accountDropdownButtonLink')
            .attr('href', '/login?redirect=' + window.location.href);
    });

    MainMenu.init({
        $menuMainWrap: $(".menu-main-wrap"),
        $menuMain: $(".menu-main"),
        $socialMenuMain: $(".menu-social.desktop-only"),
        $menuMainPin: $(".menu-main-wrap .menu-main-pin"),
        $buyButtonWrap: $(".erebos-button-container"),
        menuMainThreshold: 100,
        hiddenClass: "menu-hidden",
        fixedClass: "is-fixed"
    });

    $(document).on('webkitfullscreenchange mozfullscreenchange fullscreenchange', function () {
        var isFullScreen = document.fullScreen || document.mozFullScreen || document.webkitIsFullScreen || null;
        $(document.body).toggleClass('is-fullscreen', isFullScreen);
    });

    //PROMO Video
    $('.promo-video-link').on('click', function (event) {
        var id = $(this).attr('data-yt-id');
        if (!overwatch.util.mobile() && !overwatch.util.touch()) {
            event.preventDefault();
            window.app.helpers.loadVideoIntoFrame(id);
        }
    });

    var navbarPrefix = 'Navbar';

    window.svg4everybody({
        polyfill: true,
    });

    $('input').placeholder();

    app.videoCustomLoop.init();
    app.videoPlayInView.init();
    app.youtubePlayer.init();

}(window, window.overwatch, window.MainMenu));

(function(window, app, overwatch, $, _){
	var hero_details = {};

	//Needed for iOS to show first frame of video.
	hero_details.loadBackgroundVideo = function loadBackgroundVideo() {
		$('.video-background-wrapper .video-background-vid').load();
	};

	hero_details.setupMediaEvents = function setupMediaEvents() {
		$(".media-thumbnail").on("click",function() {
			var mediaType = $(this).data('media-type');

			switch (mediaType) {
				case 'youtube':
					var videoId = $(this).data("yt-id");
					app.helpers.loadVideoIntoFrame(videoId);
					break;
				case 'img':
					app.helpers.loadImageIntoFrame($(this).attr('href'));
					break;
				default:
					return true;
					break;
			}
			return false;
		});
	};

	hero_details.loadTabs = function() {
		var currentUrlHash = window.location.hash.substr(1),
			$details = $('#details'),
			heroVideo = $details.find(".hero-detail-video"),
			heroIdleThumbnail = $details.find(".hero-detail-overview"),
			heroBg = $details.find(".hero-detail-background"),
			tabs = $("#details-tabs");
		var hasLinkTab = function() {
			switch(currentUrlHash) {
				case "overview":
				case "story" :
					return true;
				default :
					return false;
			}
		}();
		var hero = this.hero;
		this.tabs = new Foundation.Tabs(tabs);

		// change story background when story tab selected
		tabs.on('change.zf.tabs', function toggleStoryBackground() {
			var $tab = $(this).find('[aria-selected="true"]');
			var tabName = $tab.attr('aria-controls');
			if (tabName === 'story') {
				heroVideo.removeClass("is-active");
				heroIdleThumbnail.removeClass("is-active");
				heroBg.addClass("is-active");

				//analytics tracking on story tab
				if(window.dataLayer) {
					window.dataLayer.push({
						"event": "heroStoryTab",
						"tab":{
							"name": hero
						}
					});
				}
			} else {
				heroVideo.addClass("is-active");
				heroIdleThumbnail.addClass("is-active");
				heroBg.removeClass("is-active");
			}
		});

		if(hasLinkTab){
			this.tabs.selectTab('#'+currentUrlHash);
		}
	};

	hero_details.loadShowcase = function loadShowcase() {
		var $showcase = $('.ability-showcase');
		var abilityShowcase = new overwatch.AbilityShowcase('.ability-showcase');
		var init = false;
		var playing = false;

		var resizeFn = _.debounce(function toggleShowcaseByVisibility() {
			var visible = $showcase.is(':visible');
			if (visible && !init) {
				// visible, needs initialization
				abilityShowcase.init();
				init = true;
				playing = true;
			} else if (visible && !playing) {
				// visible, but stopped and needs to play
				abilityShowcase.play();
				playing = true;
			} else if (!visible) {
				// not visible, just stop
				abilityShowcase.stop();
				playing = false;
			}
		}, 250);

		$(window).on('resize', resizeFn);

		// kick off init script
		resizeFn();
	};

	hero_details.init = function init(heroId, media) {
		this.hero = heroId;
		this.setupMediaEvents();
		this.loadTabs();
		this.loadShowcase();
		this.initHeroesGallery(media);
		this.loadBackgroundVideo();
	};

	hero_details.initHeroesGallery = function initHeroesGallery(media) {
		var $gallery = $('[data-js-media-gallery=hero]');
		var mediaItems = $gallery.find("[data-media-id]");
		var loadMoreButton = $('[data-load-more-media]');

		var showAllMediaItems = function() {
			$gallery.removeClass("is-partial");
			loadMoreButton.remove();
		};

		if (mediaItems.length > 4) {
			loadMoreButton.on('click', function (e) {
				showAllMediaItems();
			});
		} else {
			showAllMediaItems();
		}

		var gallery = overwatch.gallery.get('hero');
		_.each(media, function(media, key){
			gallery.add(media);
		});
	};

	app.extend({ hero_details: hero_details });

}(window, window.app, window.overwatch, window.jQuery, window._));

(function(window, app, overwatch){
	var heroes = {};
	heroes.init = function init() {
		overwatch.HeroSelector.init({
			$container: $('#heroes-selector-container'),
			$sizer: false,
			$navigationLinks: $('#hero-selector-navigation-selector .navigation-link'),
			itemSelector: '#heroes-selector-container .hero-portrait-detailed-container'
		});

		var hash = location.href.substr(location.href.indexOf('#')+1).toUpperCase();
		if(['DAMAGE', 'TANK', 'SUPPORT'].indexOf(hash) !== -1) {
			overwatch.HeroSelector.filter(hash);
		}

	};
	app.extend({ heroes: heroes });
}(window, window.app, window.overwatch));

(function(window, app, overwatch, $, _) {
    var home = {};
    var util = overwatch.util;

    home.trailerSetup = function trailerSetup() {
        var headerVideo = $('[data-js="header-video"]').get(0);
        $('[data-js="video-lightbox"]').on('click', function(event){
            var videoId = $(this).data('yt-id');
            if(!util.mobile() && !util.touch()){
                event.preventDefault();

                // pause bg video
                headerVideo.pause();

                // play video in lightbox
                app.helpers.loadVideoIntoFrame(videoId, {
                    closeCallback: function closeCallback() {
                        // resume bg video when lightbox closed
                        headerVideo.play();
                    }
                });
            }
        });
    };

    home.registerSpotlight = function registerSpotlight(element) {
        new overwatch.Spotlight(element);
    };

    home.init = function init() {
        // register all spotlight components on this page
        Array.prototype.forEach.call(document.querySelectorAll('[data-js=spotlight]'), this.registerSpotlight);
        document.querySelector('[data-bgControl]').addEventListener('click', function(e) {
            e.preventDefault();
            var el = this;
            var vidSelector = el.getAttribute('data-bgControl');
            var vids = document.querySelectorAll(vidSelector);
            var pausedClass = 'js-paused';
            var isPaused = el.classList.contains(pausedClass);
            vids.forEach(function(vid) {
                if (isPaused) {
                    vid.play();
                    el.classList.remove(pausedClass);
                } else {
                    vid.pause();
                    el.classList.add(pausedClass);
                }
            });
        });
        this.trailerSetup();
    };

    app.extend({ home: home });

}(window, window.app, window.overwatch, window.jQuery, window._));

(function(window, app, overwatch, _){
	var media = {};
	media.init = function init(mediaByCategory, id) {
		overwatch.menuScroll.init({
			menuSelector: "#sub-nav-menu",
			timeToHideMs: 5000,
		});
		this.setupGallery(mediaByCategory);
		this.setupHistoryStates();
		if(typeof id === "string" && id.length !== 0) {
			this.loadMedia(id);
		}
	};

    media.addGallery = function(context) {
        context = context || $(document.body);
        $('[data-js-media-gallery]', context).each(function(){
            overwatch.gallery.create({ elem: this, id: $(this).data('js-media-gallery') });
        });
    };

	media.setupGallery = function(mediaByCategory) {
		_.each(mediaByCategory, function(collection, category){
			var gallery = overwatch.gallery.get(category);
			_.each(collection, function(media){
				gallery.add(media);
			})
		});
	};

	media.setupHistoryStates = function() {
		$(document.body).on("ow.mediagallery.open", function(e, data) {
			var currentId = window.history.state ? window.history.state.media_id : "";
			if(data.id !== currentId) {
				window.history.replaceState({media_id: data.id}, null, data.id);
			}
		});
	};

	media.loadMedia = function(id) {
		var container = $("[data-media-id="+id+"]");
		var item = container.find("[data-js=media-gallery-content]");
		if(item.length > 0){
			item[0].scrollIntoView();
			item.trigger('open');
		}
	};
	app.extend({ media: media });
}(window, window.app, window.overwatch, window._));

(function(window, app, overwatch, $, _) {
    var mercyBCRFCharitySkin = {};

    var util = overwatch.util;

    mercyBCRFCharitySkin.trailerSetup = function trailerSetup() {
        $('[data-js="video-lightbox"]').on('click', function(event){
            var videoId = $(this).data('yt-id');
            if(!util.mobile() && !util.touch()){
                event.preventDefault();

                // play video in lightbox
                app.helpers.loadVideoIntoFrame(videoId);
            }
        });
    };

    mercyBCRFCharitySkin.init = function init() {
        this.trailerSetup();
    };

    app.extend({ mercyBCRFCharitySkin: mercyBCRFCharitySkin });

}(window, window.app, window.overwatch, window.jQuery, window._));

(function (window, app, overwatch) {
    var patchNotes = {
        init: function() {
            window.overwatch.slideout.init();
            window.overwatch.tooltip.init();
            this.setupAnalytics();
        },
        setupAnalytics: function() {
            $(document.body).on("slideout:open", function(event, id) {
                if(window.dataLayer) {
					window.dataLayer.push({
						"event": "drawerOpen",
						"drawer": id
					});
				}
            });
        }
    };
    app.extend({
        patchNotes: patchNotes
    });
}(window, window.app, window.overwatch));

(function(window, app, overwatch, $, _) {

    var search = {
        searchResults: [],
        cacheElements: function cacheElements() {
            this.$searchResultsArea = $('.search-results');
            this.$searchResultsItemsArea = $('#search-result-items');
            this.$searchUserMessages = $('#search-user-messages');
            this.$searchResultsCountWrapper = $('#search-results-count-wrapper');
            this.$searchResultsCount = $('#search-results-count');
            this.$searchInitialMessage = $('#search-initial-message');
        },
        cacheTemplates: function cacheTemplates() {
            this.searchResultItemTemplate = _.template(document.getElementById('search-result-item-template').innerHTML);
            this.generalErrorMessage = _.template(document.getElementById('search-result-fail-template').innerHTML)();
            this.notFoundErrorMessage = _.template(document.getElementById('search-result-zero-template').innerHTML)();
            this.platformNotFoundErrorMessage = _.template(document.getElementById('search-result-zero-platform-template').innerHTML)();
        },
        loadResults: function loadResults(accountName) {
            var self = this,
                url = '';
            //bnet account names can't contain any symbols, so this is safe. https://us.battle.net/support/en/article/26963
            accountName = accountName.replace(/-/g, '#');
            url = '/'+clientVars.urlLocale+'/search/account-by-name/'+encodeURIComponent(accountName);

            self.searchResults = [];
            self.$searchUserMessages.hide();
            self.$searchResultsItemsArea.hide();
            $.ajax(url).done(function(results) {
                results = results.map(self.transformResult.bind(self));
                self.$searchResultsCountWrapper.show();
                self.$searchResultsCount.text(results.length);
                self.searchResults = results;

                if(self.searchResults.length !== 0) {
                    self.generateResultHtml(self.searchResults);
                    self.$searchResultsItemsArea.show();
                    self.$searchUserMessages.hide();
                } else {
                    self.updateErrorMessage(self.notFoundErrorMessage);
                    self.$searchResultsItemsArea.hide();
                }
            }).fail(function(err, results) {
                self.updateErrorMessage(self.generalErrorMessage);
            }).always(function() {
                self.$searchResultsArea.removeClass('is-loading');
                self.$searchInitialMessage.hide();
            });
        },
        transformResult: function(result) {
            result['svg_id'] = result.platform + '-icon';
            result.avatar = this.avatars[result.portrait] ? this.avatars[result.portrait].icon : '';
            return result;
        },
        generateResultHtml: function generateResultHtml(results) {
            var searchResultHtml = "";
            for(i=0, len=results.length; i<len; i++) {
                searchResultHtml += this.searchResultItemTemplate(results[i]);
            }
            this.$searchResultsItemsArea.html(searchResultHtml);
        },
        updateErrorMessage: function updateErrorMessage(html) {
            if(html) {
                this.$searchUserMessages.html(html);
                this.$searchUserMessages.show();
            }
        },
        applyPlatformFilter: function applyPlatformFilter() {
            var $filterOptions = $('input[name=filter]:checked');
            var filteredResults = 0;

            //show all the results if no filter is selected
            if($filterOptions.length === 0) {
                $('.player-badge-wrapper', this.$searchResultsItemsArea).show();
                this.$searchUserMessages.hide();
            } else {
                this.$searchResultsItemsArea.children().hide();
                $filterOptions.each(function() {
                    var filterValue = $(this).val();
                    var badgesForThisPlatform = $('.player-badge-wrapper[data-platform='+filterValue+']', this.$searchResultsItemsArea);
                    filteredResults += badgesForThisPlatform.length;
                    badgesForThisPlatform.show();
                });

                if(filteredResults === 0) {
                    this.updateErrorMessage(this.platformNotFoundErrorMessage);
                } else {
                    this.$searchUserMessages.hide();
                }
            }
        },
        sort: function sort(options) {
            sortedResults = _.orderBy(this.searchResults, [options.field], [options.order]);
            this.generateResultHtml(sortedResults);
        },
        setupEvents: function setupEvents() {
            var self = this;
            self.$searchInitialMessage.show();
            self.$searchResultsCountWrapper.hide();

            $('[data-js=player_search]').on("submit", function(event) {
                event.preventDefault();
                var playerName = $(this).find("input[name=q]").val();
                self.$searchResultsArea.addClass('is-loading');
                self.$searchInitialMessage.hide();
                history.pushState(null, null, "/search?q="+playerName);
                self.loadResults(playerName);
            });

            $('input[name=filter]').on("change", function() {
                //don't bother filtering if there are no players to filter.
                if(self.searchResults.length !== 0) {
                    self.applyPlatformFilter();
                }
            });

            $('[data-js="sort-option"]').on("click", function(event) {
                var sortOption, sortOrder;
                event.preventDefault();
                $(this).siblings('[data-js="sort-option"]').removeClass('is-selected');
                $(this).addClass('is-selected');

                //don't bother sorting if there are no players to sort.
                if(self.searchResults.length !== 0) {
                    sortOption = $(this).data('sortOption');
                    sortOrder = (sortOption === 'level') ? 'desc' : 'asc';

                    self.sort({field: sortOption, order: sortOrder});
                    self.applyPlatformFilter();
                }
            });
        },
        init: function init(avatars) {
            this.avatars = avatars;
            this.cacheElements();
            this.cacheTemplates();
            this.setupEvents();
        }
    };
    app.extend({ search: search });

}(window, window.app, window.overwatch, window.jQuery, window._));
