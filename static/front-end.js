'use strict';
(function () {
	let shortestPath = [];
	let stations = [];
	let bfs_nodes = []
	let url = ''
	
// 	const charactersList = document.getElementById('charactersList');
// 	const searchBar = document.getElementById('searchBarF');
// 	let stnList = [];
// 	searchBar.addEventListener('keyup', (e) => {
//     const searchString = e.target.value.toLowerCase();
//     const filteredStns = stnList.filter((keys) => {
//         return (
//             stn.toLowerCase().includes(searchString)
//         );
//     });
// });
const form = document.getElementById( "searchForm" );

// ...and take over its submit event.
form.addEventListener( "submit", function ( event ) {
  event.preventDefault();
  const formData = new FormData(form)
  var url = "/api/v1/?start=" + formData.get('start') + "&end=" + formData.get('end');
  getRequest(url);

  })

	function getStation(key){
		var json_data = "stnName.json";
		const stn = JSON.parse(json_data);
		return stn.key
	}
	
	//document.getElementById("searchBarF").addEventListener("change", fromFunction);
	function fromFunction(e) {
		
		// var json_data = $.getJSON("stnName.json"); 
		// var fromST = Object.keys(JSON.parse("json_data").find(x=>x===e.target.value))
		console.log(e.target.value)
	}

	// document.getElementById("to").addEventListener("change", toFunction);
	// function toFunction(e) {
	// 	var x = document.getElementById("to");
	// 	return toFunction.key
	// }

	function reset(e) {
		unMarkBfs(bfs_nodes)
		for (let i = 0; i < stations.length; i++) {
			document.getElementById(stations[i]).setAttribute('fill', "#FFFFFF");
		}
		stations = [];
		if (shortestPath != []) {
			for (let i = 0; i < shortestPath.length; i++) {
				let station = document.getElementById(shortestPath[i].toLowerCase());
				let radius = parseFloat(station.getAttribute('r')) - 2;
				station.setAttribute('r', radius);
				station.setAttribute('fill', "#FFFFFF");
			}
			shortestPath = [];
		}
		e.preventDefault();
	}

	function markShortestPath(path) {
		for (let i = 0; i < path.length; i++) {
			let station = document.getElementById(path[i]);
			let radius = parseFloat(station.getAttribute('r')) + 2;
			station.setAttribute('r', radius);
			station.setAttribute('fill', "#00FFFF");
		}
	}

	function getRequest(url) {
		let request = new XMLHttpRequest();
		request.open('GET', url, true);
		request.send()
		request.onload = function () {
			if (this.status >= 200 && this.status < 400) {
				shortestPath = JSON.parse(this.response)['route']
				markShortestPath(shortestPath)
				showPath(shortestPath)
			}
			else if (this.status == 400) {
				let str = "No path Found!"
				document.getElementById("path_id").innerHTML = str
			}
		}
	}

	function bfs(url) {
		url = "/api/v1/bfs?node=" + stations[0]
		let request = new XMLHttpRequest();
		request.open("GET", url, true);
		request.send()
		request.onload = function () {
			if (this.status >= 200 && this.status < 400) {
				bfs_nodes = JSON.parse(this.response)['bfs']
				markBfs(bfs_nodes)
			}
		}
	}
	function markBfs(nodes) {
		let str = 'BFS - '
		nodes.forEach((node, index) => {
			setTimeout(() => {
				let station = document.getElementById(nodes[index]);
				let radius = parseFloat(station.getAttribute('r')) + 2;
				station.setAttribute('r', radius);
				station.setAttribute('fill', '#ff00cc')
				str += node + ' '
				document.getElementById('bfs').innerHTML = str
			}, 150 * index)
		})
	}

	function unMarkBfs(nodes) {
		bfs_nodes = []
		for (let i = 0; i < nodes.length; i++) {
			let station = document.getElementById(nodes[i]);
			let radius = parseFloat(station.getAttribute('r')) - 2;
			station.setAttribute('r', radius);
			station.setAttribute('fill', '#ffffff')
		}
		document.getElementById('bfs').innerHTML = ''
	}

	let links = document.getElementById("stns_icons");
	links.addEventListener('click', function (event) {
		if (stations.length == 0) {
			event.target.setAttribute('fill', "#FF0000");
			stations.push(event.target.id);
		}
		else if (stations.length == 1) {
			event.target.setAttribute('fill', "#00FF00");
			stations.push(event.target.id);

			url = "/api/v1/?start=" + stations[0] + "&end=" + stations[1];
			getRequest(url);

			shortestPath = calShortestPath(stationSG, stations[0], stations[1]);
			markShortestPath(shortestPath);

		}
		event.preventDefault();
	});

	document.addEventListener('dblclick', reset);
	let tapped = false;
	document.addEventListener('touchstart', function (e) {
		if (!tapped) {
			tapped = setTimeout(function () { tapped = false; }, 300);
		}
		else {
			clearTimeout(tapped);
			tapped = false;
			reset(e);
		}
	});
}())