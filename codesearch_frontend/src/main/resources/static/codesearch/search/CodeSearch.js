define(function(require, exports) {
	var DivElement = require("divElement");
	var TextElement = require("textElement");
	var ButtonElement = require("buttonElement");
	var AlertElement = require("alertElement");
	var PaginationElement = require("paginationElement");
	var SpinkitElement = require("spinkitElement");

	require("style");

	exports.createCodeSearchView = function(options) {

		var url = "search/0?keyWord=";
		var size = 10;

		var searchDiv = new DivElement();
		searchDiv.init(options.searchBar);

		var keyWordText = new TextElement("400px", "32px", "KeyWord");
		keyWordText.init(searchDiv.getElement());
		var searchButton = new ButtonElement("120px", "32px", null);
		searchButton.init(searchDiv.getElement())
		searchButton.setText("CodeSearch").css("margin-bottom", "3px");

		var alertElement = new AlertElement(null, null, "Error!", "You must input a keyWord for code search!", StyleType.warning);
		
		var codeBarDiv = new DivElement();
		
		var codeViewDiv = new DivElement();
	
		searchButton.click(function() {
			if(alertElement.getElement()){
				alertElement.destroy();
			}
			
			options.codeBar.empty();
			options.codeView.empty();
			
			var spinkit = new SpinkitElement();
			spinkit.init(options.codeView);
			if(trim(keyWordText.getValue()) !== ""){
				
				codeBarDiv.init(options.codeBar)
				spinkit.getFoldingCube();
				search(keyWordText.getValue()).then(function(data) {
					
					spinkit.destroy();
					var result = $.parseJSON(data);
					searchButton.setEnabled().setText("CodeSearch");
					var count = result.count;
					var codeResults = result.codeResults;
					var start = 1;
					var end = count % size === 0 ? count/size : count/size + 1;
					
					if(count > 0){
						codeBarDiv.getElement().text("Result Count:" + count);
						codeViewDiv.init(options.codeView);
						renderCodeView(codeResults);
						
						var pagination = new PaginationElement(null, null, start, end, callback);
						pagination.init(options.codeView);
					} else {
						codeBarDiv.getElement().text("No result or search timeout, please try againt!");
					}
					
					

				}, function(data) {
					searchButton.setEnabled().setText("CodeSearch");

				});
			} else {
				alertElement.init(searchDiv.getElement());
			}

			
		});
		
		
		function callback(type, page){
			codeViewDiv.getElement().empty();
			var spinkit = new SpinkitElement();
			spinkit.init(options.codeView, "head");
			spinkit.getFoldingCube();
			pagination("search/" + (page - 1) + "?keyWord=" + keyWordText.getValue()).then(function(data) {
				
				spinkit.destroy();
				var result = $.parseJSON(data);
				var codeResults = result.codeResults;
				renderCodeView(codeResults);

			}, function(data) {

			});
            
        }
		
		function renderCodeView(codeResults){
			for(var codeResult of codeResults){
				codeViewDiv.getElement().append("<a href='#'>"+ codeResult.file +"</a><br>");
				var codeFragment = $("<table class='table scrolltable'><tbody></tbody></table>");
				var fragment = codeResult.fragment.fragment;
				for(var row of fragment){
					if(row.isKeyWord){
						codeFragment.append($("<tr class='success'><td>" + row.rowNum + "</td><td>" + row.row + "</td></tr>"));
					} else {
						codeFragment.append($("<tr><td>" + row.rowNum + "</td><td>" + row.row + "</td></tr>"));
					}
				}
				
				codeViewDiv.getElement().append(codeFragment);
			}
		}
		
		function pagination(url){
			return new Promise(function(resolve, reject) {
				$.ajax({
					url : url,
					type : "GET",
					success : resolve,
					error : reject
				});
			});
		}
		
		
		function search(keyWord) {
			searchButton.setDisabled().setText("Search...");
			return new Promise(function(resolve, reject) {
				$.ajax({
					url : url + keyWord,
					type : "GET",
					success : resolve,
					error : reject
				});
			});
		}
		
		function trim(str){return str.replace(/(^\s*)|(\s*$)/g, "");
		
		}

	};

});