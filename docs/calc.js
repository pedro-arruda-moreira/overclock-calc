$(document).ready(function() {
	models.push(new Model(-1, null, null, '--CUSTOM--'));
	$('.bef').attr('readonly', true);
	$('.stHidden').hide();
	var cpuInfo = $('#cpuInfo');
	function calc() {
		function v(id) {
			return parseFloat($('#' + id).val().replace(',', '.'));
		}
		var voltageBef = v('vBef');
		var clkBef = v('clkBef');
		var tdpBef = v('tdpBef');
		var impendance = tdpBef / (voltageBef * voltageBef * clkBef)
		var effBef = clkBef / tdpBef;
		$('#effBef').val('' + effBef);
		var voltageAft = v('vAft');
		var clkAft = v('clkAft');
		var tdpAft = impendance * voltageAft * voltageAft * clkAft;
		$('#tdpAft').val('' + tdpAft);
		var effAft = clkAft / tdpAft;
		$('#effAft').val('' + effAft);
		$('#result').show();
	}
	$('#btnCalc').on('click', calc);
	function selectCpu(i) {
		$('#ocOptions').hide();
		$('#result').hide();
		if(i == -1) {
			return;
		}
		$('#ocOptions').show();
		if(i == -2) {
			cpuInfo.find('h3')[0].innerHTML = 'Custom CPU options:';
			$('.bef').attr('readonly', false);
		} else {
			cpuInfo.find('h3')[0].innerHTML = 'CPU info:';
			$('.bef').attr('readonly', true);
			$('#clkBef').val(models[i].clock);
			$('#vBef').val('' + models[i].voltage);
			$('#tdpBef').val('' + models[i].tdp);
		}
		cpuInfo.show();
	}
	
	var cpu = $('#cpu');
	cpu.on('change', function() {
		selectCpu(parseInt(cpu.val()));
	});
	var i = 0;
	for(; i < models.length; i++) {
		var model = models[i];
		var selector = i;
		if(model.tdp == -1) {
			selector = -2;
		} else if(model.tdp == null
		|| model.voltage == null
		|| model.clock == null) {
			selector = -1;
		}
		var opt = $('<option value="' + selector + '"></option>');
		opt[0].innerHTML = model.description.replace(/\s/g, '&nbsp;'
			+ '</option>');
		cpu.append(opt);
	}
});