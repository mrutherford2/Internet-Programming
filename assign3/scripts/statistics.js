$(document).ready(function () {
    $('#calculate').click(function () {
            var numberArray = [];
            var numberInput = $("#numberinput").val().split(',');

            for (var i = 0; i < numberInput.length; i++) {
                if (numberInput.length > 0 && !isNaN(numberInput[i])) {
			numberArray.push(parseFloat(numberInput[i]));	
                }
            }

            var totalSize = findN(numberArray);
            var sum = findSum(numberArray);
            var mean = findMean(numberArray);
            var median = findMedian(numberArray);
            var mode = findMode(numberArray);
            var variance = findVariance(numberArray);
            var standardDev = findStandardDev(numberArray);
	    
            if($("#numberinput").val() != "" && numberArray.length > 0) {
	    	displayResults(totalSize, sum, mean, median, mode, variance, standardDev);
	    }
	    

            function findN(array) {
                return array.length;
            }

            function findSum(array) {
                var total = 0;
                for (var i = 0; i < array.length; i++) {
                    total += parseFloat(array[i]);
                }
                return total.toFixed(2);
            }

            function findMean(array) {
		 var mean = 0;
                 mean = findSum(array) / findN(array);
		 return mean.toFixed(2);
            }
            
            function findMedian(array) {
                array.sort(function (a, b) { return a - b; });
                var mid = Math.floor(array.length / 2);
		var median = 0;
                if (array.length % 2) {
                    median = array[mid];
		    return median.toFixed(2);
                }
                else {
                    median = (array[mid - 1] + array[mid]) / 2.0;
		    return median.toFixed(2);
                }
            }
            
             function findMode(array) {		
			var numberFrequency = {0:0};
			array.forEach(function(val) {
				numberFrequency[val] = typeof numberFrequency[val] === "undefined" ? 1 : numberFrequency[val] + 1;
			});
				
			var mode = 0;
			Object.keys(numberFrequency).forEach(function(key) {
				mode = numberFrequency[key] > numberFrequency[mode] && numberFrequency[key] > 1 ? key : mode;
			});
				
			if(mode == 0)
				return "N/A";
					
			return parseFloat(mode).toFixed(2);
            }


            function findVariance(array) {
                var variance = 0;
                var mean = findMean(array);
                var n = findN(array);
                for (var i = 0; i < n; i++) {
                    var diff = array[i] - mean;
                    variance += Math.pow(diff, 2);
                }
                variance *= (1 / (n - 1));
		if(isNaN(variance)) {
		return "N/A";
		}
		else {
		return variance.toFixed(2);
		}
		
                
            }

            function findStandardDev(array) {
		var stDev = 0;
                stDev = Math.sqrt(findVariance(array));
		if(isNaN(stDev)) {
		return "N/A";
		}
		else {
		return stDev.toFixed(2);
		}
            }

            function displayResults(totalSize, sum, mean, median, mode, variance, standardDev) {
		$('#resultsTable thead tr th').remove();
		$('#resultsTable tbody tr td').remove();
		$('#resultsTable caption').remove();
		
		$('#resultsTable').append("<caption><h2>Results</h2></caption>");
                $('#resultsTable thead tr').append("<th>Size</th>");
                $('#resultsTable thead tr').append("<th>Sum</th>");
                $('#resultsTable thead tr').append("<th>Mean</th>");
                $('#resultsTable thead tr').append("<th>Median</th>");
                $('#resultsTable thead tr').append("<th>Mode</th>");
                $('#resultsTable thead tr').append("<th>Variance</th>");
                $('#resultsTable thead tr').append("<th>Standard Deviation</th>");
		
		$('#resultsTable tbody tr').append("<td>" + totalSize + "</td><td>" + sum + "</td>" + "</td><td>" + mean + "</td>" 
		+ "</td><td>" + median + "</td>" + "</td><td>" + mode + "</td>" + "</td><td>" + variance + "</td>" + "</td><td>" + standardDev + "</td>");
		$('#resultsTable tbody tr td').addClass("col-sm-1");
		$('#resultsTable caption').addClass("caption-dark");   
            }

    });
	
	$('#reset').click(function () {
		$('#numberinput').val('');
		$('#resultsTable caption').remove();
		$('#resultsTable thead tr th').remove();
		$('#resultsTable tbody tr td').remove();
	});
	
	$('#showtests').click(function () {
		$('#testsection').slideToggle();
	});
});
