'use strict';

app.controller('homeCtrl', ['$scope','loginService', '$http', 'sessionService', function($scope,loginService, $http, sessionService) {
	var funds = 1000.00;
	$scope.accountBalance = funds;
	$scope.username = sessionService.get('username');
	$scope.buy=function(stock){
		if($scope.accountBalance > stock.price) {
			stock.owned +=1;
			stock.quantity -=1;
			$scope.accountBalance -= parseFloat(stock.price);
			$('#nofundsalert').hide(); 
		}
		else {
			$('#nofundsalert').show();
		}
	}

	$scope.sell=function(stock){
		stock.quantity +=1;
		stock.owned -=1;
		$scope.accountBalance += parseFloat(stock.price);
	}

	function generateStockUrlFromList() {
		var stockUrl = 'http://query.yahooapis.com/v1/public/yql?q=select * from yahoo.finance.quote where symbol in (';
		getStockList().forEach(function (val, i) {
			stockUrl += "'" + val + "',";
		});
		return stockUrl.substring(stockUrl, stockUrl.length - 1) + ')&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys&callback=';
	}

	$scope.myStocks = []; 

	$http.get(generateStockUrlFromList())
	.success(function(data, status, headers, config) {
		data.query.results.quote.forEach(function(val, i) {
			$scope.myStocks[i] = {
				name: val.Name,
				symbol: val.Symbol,
				price: parseFloat(val.LastTradePriceOnly).toFixed(2),
				quantity: 10,
				owned: 0
			}
		});
	})
	.error(function(data, status, headers, config) {

	});

	$scope.logout=function(){
		loginService.logout();
	}
}])


function getStockList()  {
	return [
		'AAL',
		'AAPL',
		'ADBE',
		'AMZN',
		'FB',
		'FISV',
		'FOX',
		'GOOG'
	];
}