'use strict';

(function () {
	let shortestPath = [];
	let stations = [];
	let bfs_nodes = []
	let url = ''
	let stationCodes = {
		"Admiralty": ["ns10"],
		"Aljunied": ["ew9"],
		"Ang Mo Kio": ["ns16"],
		"Bakau": ["se3"],
		"Bangkit": ["bp9"],
		"Bartley": ["cc12"],
		"Bayfront": ["ce1"],
		"Bayshore": ["te29"],
		"Beauty World": ["dt5"],
		"Bedok North": ["dt29"],
		"Bedok Reservoir": ["dt30"],
		"Bedok south": ["te30"],
		"Bedok": ["ew5"],
		"Bencoolen": ["dt21"],
		"Bendeemer": ["dt23"],
		"Bishan": ["cc15"],
		"Boon Keng": ["ne9"],
		"Boon Lay": ["ew27"],
		"Botanic Gardens": ["cc19"],
		"Braddell": ["ns18"],
		"Bras Basah": ["cc2"],
		"Brickland": ["ns3x"],
		"Bright Hill": ["te7"],
		"Buangkok": ["ne15"],
		"Bugis": ["ew12"],
		"Bukit Batok": ["ns2"],
		"Bukit Brown": ["cc18"],
		"Bukit Gombak": ["ns3"],
		"Bukit Panjang": ["dt1"],
		"Buona Vista": ["cc22"],
		"Caldecott": ["cc17"],
		"Canberra": ["ns12"],
		"Cantonment": ["cc31"],
		"Cashew": ["dt2"],
		"Changi Airport": ["cg2"],
		"Cheng Lim": ["sw1"],
		"Chinatown": ["ne4"],
		"Chinese Garden": ["ew25"],
		"Choa Chu Kang": ["ns4"],
		"City Hall": ["ew13"],
		"Clarke Quay": ["ne5"],
		"Clementi": ["ew23"],
		"Commonwealth": ["ew20"],
		"Compassvale": ["se1"],
		"Coral Edge": ["pe3"],
		"Cove": ["pe1"],
		"Dakota": ["cc8"],
		"Damai": ["pe7"],
		"Dhoby Ghaut": ["cc1"],
		"Dover": ["ew22"],
		"Downtown": ["dt17"],
		"Esplanade": ["cc3"],
		"Eunos": ["ew7"],
		"Expo": ["cg1"],
		"Fajar": ["bp10"],
		"Farmway": ["sw2"],
		"Farrer Park": ["ne8"],
		"Farrer Road": ["cc20"],
		"Fernvale": ["sw5"],
		"Fort Canning": ["dt20"],
		"Founders'Memorial": ["te22a"],
		"Gardens by the Bay": ["te22"],
		"Geylang Bahru": ["dt24"],
		"Great World": ["te15"],
		"Gul Circle": ["ew30"],
		"HarbourFront": ["cc29"],
		"Havelock": ["te16"],
		"Haw Par Villa": ["cc25"],
		"Hillview": ["dt3"],
		"Holland Village": ["cc21"],
		"Hougang": ["ne14"],
		"Hume": ["dt4"],
		"Jalan Besar": ["dt22"],
		"Jelapang": ["bp12"],
		"Joo Koon": ["ew29"],
		"Jurong East": ["ew24"],
		"Kadaloor": ["pe5"],
		"Kaki Buki": ["dt28"],
		"Kallang": ["ew10"],
		"Kangkar": ["se4"],
		"Katong Park": ["te24"],
		"Keat Hong": ["bp3"],
		"Kembangan": ["ew6"],
		"Kent Ridge": ["cc24"],
		"Keppel": ["cc30"],
		"Khatib": ["ns14"],
		"King Albert Park": ["dt6"],
		"Kovan": ["ne13"],
		"Kranji": ["ns7"],
		"Kupang": ["sw3"],
		"Labrador Park": ["cc27"],
		"Lakeside": ["ew26"],
		"Lavender": ["ew11"],
		"Layar": ["sw6"],
		"Lentor": ["te5"],
		"Little India": ["ne7"],
		"Lorong Chuan": ["cc14"],
		"MacPherson": ["cc10"],
		"Marina Bay": ["ce2"],
		"Marina South Pier": ["ns28"],
		"Marina South": ["te21"],
		"Marine Parade": ["te26"],
		"Marine Terrace": ["te27"],
		"Marsiling": ["ns8"],
		"Marymount": ["cc16"],
		"Mattar": ["dt25"],
		"Maxwell": ["te18"],
		"Mayflower": ["te6"],
		"Meridian": ["pe2"],
		"Mount Pleasant": ["te10"],
		"Mountbatten": ["cc7"],
		"Napier": ["te12"],
		"Newton": ["ns21"],
		"Nibong": ["pw5"],
		"Nicoll Highway": ["cc5"],
		"Novena": ["ns20"],
		"Oasis": ["pe6"],
		"Orchard Boulevard": ["te13"],
		"Orchard": ["ns22"],
		"Outram Park": ["ew16"],
		"Pasir Panjang": ["cc26"],
		"Pasir Ris": ["ew1"],
		"Paya Lebar": ["cc9"],
		"Pending": ["bp8"],
		"Petir</ts": ["bp7"],
		"Phoenix": ["bp5"],
		"Pioneer": ["ew28"],
		"Potong Pasir": ["ne10"],
		"Prince Edward Road": ["cc23"],
		"Promenade": ["cc4"],
		"Punggol Coast": ["ne18"],
		"Punggol Point": ["pw3"],
		"Punggol": ["ne17"],
		"Queenstown": ["ew19"],
		"Raffles Place": ["ew14"],
		"Ranggung": ["se5"],
		"Redhill": ["ew18"],
		"Renjong": ["sw8"],
		"Riviera": ["pe4"],
		"Rochor": ["dt13"],
		"Rumbia": ["se2"],
		"Sam Kee": ["pw1"],
		"Samudera": ["pw4"],
		"Segar": ["bp11"],
		"Sembawang": ["ns11"],
		"Sengkang": ["ne16"],
		"Senja": ["bp13"],
		"Serangoon": ["cc13"],
		"Shenton Way": ["te19"],
		"Siglap": ["te28"],
		"Simei": ["ew3"],
		"Sixth Avenue": ["dt7"],
		"Somerset": ["ns23"],
		"Soo Teck": ["pw7"],
		"South View": ["bp2"],
		"Springleaf": ["te4"],
		"Stadium": ["cc6"],
		"Stevens": ["dt10"],
		"Sumang": ["pw6"],
		"Sungei Bedok": ["dt37"],
		"Sungei Kadut": ["ns5"],
		"Tai Seng": ["cc11"],
		"Tampines East": ["dt33"],
		"Tampines West": ["dt31"],
		"Tampines": ["ew2"],
		"Tan Kah Kee": ["dt8"],
		"Tanah Merah": ["ew4"],
		"Tanjong Katong": ["te25"],
		"Tanjong Pagar": ["ew15"],
		"Tanjong Rhu": ["te23"],
		"Teck Lee": ["pw2"],
		"Teck Whye": ["bp4"],
		"Telok Ayer": ["dt18"],
		"Telok Blangah": ["cc28"],
		"Thanggam": ["sw4"],
		"Tiong Bahru": ["ew17"],
		"Toa Payoh": ["ns19"],
		"Tongkang": ["sw7"],
		"Tuas Crescent": ["ew31"],
		"Tuas Link": ["ew33"],
		"Tuas West Road": ["ew32"],
		"Ubi": ["dt27"],
		"Upper Changi": ["dt34"],
		"Upper Thomson": ["te8"],
		"Woodlands North": ["te1"],
		"Woodlands South": ["te3"],
		"Woodlands": ["ns9"],
		"Woodleigh": ["ne11"],
		"Xilin": ["dt36"],
		"Yew Tee": ["ns6"],
		"Yio Chu Kang": ["ns15"],
		"Yishun": ["ns13"],
		"one-north": ["cc23"]
	}
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
	const form = document.getElementById("searchForm");

	// ...and take over its submit event.
	form.addEventListener("submit", function (event) {
		event.preventDefault();
		const formData = new FormData(form)
		
		var url = "/api/v1/?start=" + getStation(formData.get('start')) + "&end=" + getStation(formData.get('end'));
		getRequest(url);

	})

	function getStation(key) {
		return stationCodes[key]
	}


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
	let clickFn = function (event) {

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
	}
	links.addEventListener('click', clickFn);
	links.addEventListener('touchstart', clickFn);


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