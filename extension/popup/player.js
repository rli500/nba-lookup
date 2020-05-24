var data = JSON.parse(new URLSearchParams(location.search).get('data'));

document.getElementById('name').textContent += data.name;
document.getElementById('team').textContent += data.team;
document.getElementById('points').textContent += data.points;
document.getElementById('position').textContent += data.position;
document.getElementById('assists').textContent += data.assists;
document.getElementById('blocks').textContent += data.blocks;
document.getElementById('FTP').textContent += data.FTP;
document.getElementById('TPP').textContent += data.TPP;
document.getElementById('UP').textContent += data.UP;
document.getElementById('url').setAttribute("href", data.url);