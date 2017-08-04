/**
 *	@author Shibin
**/
(function () {

	$.fn.launcher = function(config){
		var template = $("#tut-tpl").html() || tpl,
			_settings = $.extend(true,{},config),
			_flags = {},
			_that = this,
			$findByDataName = findByDataName;

		var IMAGE = 'image',
			TITLE = 'title',
			SUBTITLE = 'subtitle',
			DESCRIPTION = 'description',
			CALLBACKS = 'callbacks';

		_settings.data = formatData(_settings.data);
		$(this).html(template);

		_setCurrentStep(0);
		setPreview();
		_attachListeners();
		
		/**/

		function findByDataName(selector){
			/**
			 *	@desc find element by attibute data-name=selecter
			 *	@param selector {string} element data-name attribute value
			 *	@return {object} selected dom element
			 
			*/
			try {					
				return $(_that).find('[data-name="'+selector+'"]');
			} catch(e) {					
				console.error("Not able to find the dom object secified by dataname"+selector);
			}
		};

		function _setCurrentStep(stepnum){
			/**
			 *	@desc select and store current step as index specified via step number
			 *	@param stepnum {int} index value of current step			 
			*/
			stepnum = stepnum || 0;
			_settings.currentStepIndex = stepnum;
			_settings.currentStep = _settings.data[stepnum];
			setNavigateButton();
		}

		function _getSettings(){
			return settings;
		}

		function setId(){
			if(_settings.id){
				$findByDataName("tut-container").attr("id",_settings.id);
				_flags.isSetId = true;
			}
		}

		function showPreview(){
			/**
			 *	@desc show and hide appropriate UI based on initial step or not.			 
			*/
			var fadeInSpeed = 500;
			if(_settings.currentStepIndex === 0){
				findByDataName('actual').hide();
				$findByDataName('initial').fadeIn(fadeInSpeed);
				/*$findByDataName('actual').fadeOut(function(){
					$findByDataName('initial').fadeIn();					
				});*/
			}else{
				if(_settings.currentStepIndex === 1){
					$findByDataName('initial').hide();
					$findByDataName('actual').hide();
					$findByDataName('actual').fadeIn(fadeInSpeed);	
				}else{
					$findByDataName('actual').hide();
					$findByDataName('actual').fadeIn(fadeInSpeed);
				}
				/*$findByDataName('initial').fadeOut(function(){
					$findByDataName('actual').fadeIn();					
				});*/
			} 
		}

		function setNavigateButton(){
			if(_settings.currentStepIndex == _settings.data.length-1){
				$findByDataName('next').attr("disabled","true").addClass("disabled");
			}else{
				$findByDataName('next').removeAttr("disabled").removeClass("disabled");
			}
		}

		function setTextData(){
			/**
			 *	@desc Set step values on step change
			*/
			$findByDataName('title').text(_settings.currentStep["title"]);
			$findByDataName('subtitle').text(_settings.currentStep["subtitle"]);
			$findByDataName('description').html(_settings.currentStep["desc"]);
		}

		function setImage(){
			$findByDataName('stepImage').attr("src",_settings.currentStep["img"]);
		}

		function setPreview(){
			var data = _settings.data || {};
			setImage();
			setTextData();
			if(!_flags.isSetId) setId();
			if(!_flags.stepIndicatorLoaded) 
				loadStepIndicator();
			else 
				updatestepIndicator();

			showPreview();
		}

		function loadStepIndicator(){
			/**
			 *	@desc Show the step indicator dot in each step footer
			*/
			var stepIndicatorTpl = '<i class="material-icons tut-step-indicator">lens</i>';
			var indicatorTpls = $("<span>");
			for (var i = 0; i < _settings.data.length; i++) {
				var thisTpl = $(stepIndicatorTpl.slice(0));
				if(_settings.currentStepIndex === i){
					thisTpl.addClass("active");
				}
				indicatorTpls.append(thisTpl);
			}
			$findByDataName("step-indicator-holder").html(indicatorTpls);
			_flags.stepIndicatorLoaded = true;
		}

		function updatestepIndicator(){
			var indicators = $(".tut-step-indicator");
			indicators.removeClass("active");
			try{
				$(indicators.get(_settings.currentStepIndex)).addClass("active");
			}catch(e){
				console.error(e)
				_flags.stepIndicatorLoaded = false;
				loadStepIndicator();
			}
		}

		function _attachListeners(){
			/**
			 *	@desc attach event listers to buttons in the ui
			*/
			$findByDataName('start').click(function(e){
				loadNextStep();
			});

			$findByDataName('skip').click(function(e){
				skipPreview();
			});

			$findByDataName('next').click(function(e){
				loadNextStep();
			});

			$findByDataName('previous').click(function(e){
				loadPreviousStep()
			});

			$findByDataName('close').click(function(e){
				closePreview();
			});
		}

		function closePreview(){
			console.warn("close not implemented")
		}

		function skipPreview(){
			console.warn("Skip not implemented")
		}

		function loadNextStep(){
			if(_settings.currentStepIndex == _settings.data.length-1){
				console.log('last step reached')
			}else{				
				_setCurrentStep(_settings.currentStepIndex+1);
				setPreview();
			}
		}
		function loadPreviousStep(){
			if(_settings.currentStepIndex == 0){
				console.log('first  step reached')
			}else{
				_setCurrentStep(_settings.currentStepIndex-1);				
				setPreview();
			}
		}

		function formatData(data){
			var formatedData = [];
			if(typeof data !== "undefined"){
				for (var i = 0; i < data.length; i++) {
					var currentData = data[i];
					var tempData = {
						index : i,
						isStartStep : (i===0),
						img : currentData[IMAGE],
						title : currentData[TITLE],
						subtitle : currentData[SUBTITLE],
						desc : currentData[DESCRIPTION],
						callbacks : currentData[CALLBACKS]
					}
					formatedData.push(tempData);			
				}
			}
			return formatedData;
		}

	}

	
})(); 

var tpl = '<div class="tut-launch-container tut-full-size">'+
            
            '<div class="tut-start-page tut-full-size display-none">'+
                '<img src="{{backgroundImage}}" class="tut-background tut-full-size">'+
                '<div class="tut-header tut-content-container">'+
                    '<div class="tut-title">{{title}}</div>'+
                    '<div class="tut-subtitle">{{subtitle}}</div>'+
                '</div>'+
                '<div class="tut-des tut-content-container">'+
                   '{{tutorialDescription}}'+
                '</div>'+
                '<div class="tut-btn-container">                    '+
                    '<button class="btn tut-btn tut-btn-default">SKIP</button>'+
                    '<button class="btn tut-btn tut-btn-primary">LET\'S START</button>'+
                '</div>'+
            '</div>'+
            '<div class="tut-steps tut-full-size">'+
                '<div class="tut-step-info">'+
                    '<div class="tut-step-header">'+
                        '<div class="tut-close-btn pull-right"><i class="material-icons">close</i></div>'+
                        '<div class="clearfix"></div>'+
                        '<div class="tut-step-title">{{stepTitle}}</div>'+
                    '</div>'+
                    '<div class="tut-step-image">'+
                        '<div class="tut-img-holder">'+
                            '<img src="{{stepImage}}">'+
                        '</div>'+
                    '</div>'+
                    '<div class="tut-step-des">'+
                        '<p>'+
                           '{{stepDescription}}'+
                        '</p>'+
                    '</div>'+
                '</div>'+
                '<div class="tut-btn-container"> '+
                    '<button class="btn tut-nav-link disabled pull-left" data-action="previous"><i class="material-icons">arrow_backward</i></button>'+
                    '<button class="btn tut-nav-link pull-right" data-action="next"><i class="material-icons">arrow_forward</i></button>'+
                '</div>'+
            '</div>'+
        '</div>'