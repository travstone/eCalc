
window.calc = (function(){

	return {

		getValue : function(input){
			var output = NaN,
				numberRaw,
				inputRegex = /((?:\-|\+)?\.?\d+\.?\d*(?:e|E)?(?:\-|\+)?\d*)/gi;
			if(input){
				numberRaw = input.match(inputRegex);
				if(numberRaw){
					output = parseFloat(numberRaw[0]);
				}
			}
			return output;
		},

		showExponential : function(input){
			var output = null;
			if(isNaN(input)){
				output = 'Error';
			}
			//console.log(input.toString().length);
			else if(input.toString().length > 12){
				output = input.toExponential();
			} else {
				output = input;
			}
			return output;
		},

		switchFocus : function(focus,$calcForm){
			// switch the input that gets replaced with the results 
			$calcForm.find('.action-input').removeAttr('disabled').removeClass('results');
			$calcForm.find('.action-input').parent().removeClass('result-row');
			$calcForm.find('.messages').find('.result-indicator').text(focus);
			var $targetInput = $calcForm.find('#i-' + focus);
			$targetInput.attr('disabled','disabled').addClass('results');
			$targetInput.parent().addClass('result-row');
			return focus;
		},

		calculatorOhmsLaw : (function(){
			var isInitialized = false,
				$calcForm = $('#ohms-law'),
				currentFocus = 'Voltage';

			var calcObject = {

				getVoltage : function(current,resistance){
					var output = current * resistance;
					return calc.showExponential(output);
				},
				getCurrent : function(voltage,resistance){
					var output = voltage / resistance;
					return calc.showExponential(output);
				},
				getResistance : function(current,voltage){
					var output = voltage / current;
					return calc.showExponential(output);
				},
			};

			$calcForm.on('change keyup','.action-input',function(){
				//console.log($(this).attr('id'));
				var results,
					voltage = calc.getValue($('#i-Voltage').val()),
					resistance = calc.getValue($('#i-Resistance').val()),
					current = calc.getValue($('#i-Current').val());
				//console.log(calc.getValue($('#i-current').val()));

				if(currentFocus === 'Current'){
					results = calcObject.getCurrent(voltage,resistance);
				}
				else if(currentFocus === 'Resistance'){
					results = calcObject.getResistance(current,voltage);
				}
				else if(currentFocus === 'Voltage'){
					results = calcObject.getVoltage(current,resistance);
				}
				$calcForm.find('.results').val(results);
			});
			$calcForm.on('change','.action-focus',function(){
				//console.log('focus result!',$(this).attr('data-result-focus'));
				currentFocus = calc.switchFocus($(this).attr('data-result-focus'),$calcForm);
			});

			(function init (){
				$calcForm.find('.messages').html(
					'Calculating: <span class="result-indicator">Voltage</span>'
				);
				$calcForm.find('input[data-result-focus="Voltage"]').attr('checked','checked');
				$calcForm.find('#i-Voltage').attr('disabled','disabled').addClass('results');
				$calcForm.find('#i-Voltage').parent().addClass('result-row');
				isInitialized = true;
			}()); // SELF-EXECUTING

			//return calcObject;

		}()), // SELF-EXECUTING

		calculatorCapImp : (function(){
			var isInitialized = false,
				$calcForm = $('#cap-impedance'),
				currentFocus = 'Capacitance';

			var calcObject = {

				getCapacitance : function(frequency){
					var output = 1 / (2 * Math.PI) * frequency;
					return calc.showExponential(output);
				},
				getFrequency : function(capacitance){
					var output = ((2 * Math.PI) * capacitance) * 2;
					return calc.showExponential(output);
				}

			};

			$calcForm.on('change keyup','.action-input',function(){
				//console.log($(this).attr('id'));
				var results,
					frequency = calc.getValue($('#i-Frequency').val()),
					capacitance = calc.getValue($('#i-Capacitance').val());
				//console.log(calc.getValue($('#i-current').val()));

				if(currentFocus === 'Capacitance'){
					results = calcObject.getCapacitance(frequency);
				}
				else if(currentFocus === 'Frequency'){
					results = calcObject.getFrequency(capacitance);
				}
				$calcForm.find('.results').val(results);
			});
			$calcForm.on('change','.action-focus',function(){
				//console.log('focus result!',$(this).attr('data-result-focus'));
				currentFocus = calc.switchFocus($(this).attr('data-result-focus'),$calcForm);
			});

			(function init (){
				$calcForm.find('.messages').html(
					'Calculating: <span class="result-indicator">Capacitance</span>'
				);
				$calcForm.find('input[data-result-focus="Capacitance"]').attr('checked','checked');
				$calcForm.find('#i-Capacitance').attr('disabled','disabled').addClass('results');
				$calcForm.find('#i-Capacitance').parent().addClass('result-row');
				isInitialized = true;
			}()); // SELF-EXECUTING

			//return calcObject;

		}()) // SELF-EXECUTING


	};



}());
















