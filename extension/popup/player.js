var data = JSON.parse(new URLSearchParams(location.search).get('data'));

document.getElementById('name').textContent += data.name;
document.getElementById('team').textContent += data.team;
document.getElementById('points').textContent += data.points;
document.getElementById('assists').textContent += data.assists;
document.getElementById('blocks').textContent += data.blocks;
document.getElementById('FGP').textContent += data.FPG;
document.getElementById('FTP').textContent += data.FTP;
document.getElementById('TPP').textContent += data.TPP;
document.getElementById('NPM').textContent += data.NPM;
document.getElementById('url').textContent += data.url;