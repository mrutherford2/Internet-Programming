'use strict';

app.controller('homeCtrl', ['$scope','loginService', '$http', 'sessionService', function($scope,loginService, $http, sessionService) {
	var funds = 10000.00;
	$scope.accountBalance = funds;
	$scope.username = sessionService.get('username');
	$scope.totalOwnedStocks = 0;
	$scope.sortOrder = 'symbol';

	$scope.buy=function(stock){
		if($scope.accountBalance > stock.price) {
			stock.owned +=1;
			stock.quantity -=1;
			$scope.totalStocks -=1;
			$scope.accountBalance -= parseFloat(stock.price);
			$scope.totalOwnedStocks +=1;
		}
		else {
			$('#nofundsalert').slideToggle();
		}
	}

	$scope.sell=function(stock){
		stock.quantity +=1;
		stock.owned -=1;
		$scope.totalStocks +=1;
		$scope.accountBalance += parseFloat(stock.price);
		$scope.totalOwnedStocks -=1;
	}

	function generateStockUrlFromList() {
		var stockUrl = 'http://query.yahooapis.com/v1/public/yql?q=select * from yahoo.finance.quote where symbol in (';
		getStockList().forEach(function (val, i) {
			stockUrl += "'" + val + "',";
		});
		return stockUrl.substring(stockUrl, stockUrl.length - 1) + ')&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys&callback=';
	}

	$scope.myStocks = []; 
	$scope.totalStocks = 0;
	$http.get(generateStockUrlFromList())
	.success(function(data, status, headers, config) {
		data.query.results.quote.forEach(function(val, i) {
			$scope.myStocks[i] = {
				name: val.Name,
				symbol: val.Symbol,
				price: parseFloat(val.LastTradePriceOnly).toFixed(2),
				quantity: 50,
				owned: 0
			}
			$scope.totalStocks += $scope.myStocks[i].quantity;
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
		'GOOG',
		'MSFT',
		'CSCO',
		'SIRI',
		'EBAY',
		'XIV',
		'AMAT',
		'CSCO',
		'WBA',
		'INTC',
		'CMCSA',
		'GILD',
		'QCOM',
	];
}
