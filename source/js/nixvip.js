function disableselect(e) {
    if (omitformtags.indexOf(e.target.tagName.toLowerCase()) == -1)
      return false;
  }
  function reEnable() {
    return true;
  }
  if (typeof document.onselectstart != "undefined") {
    document.onselectstart = new Function("return false");
  } else {
    document.onmousedown = disableselect;
    document.onmouseup = reEnable;
  }

  
  function initServerData(serverIp){
    const serverIpElement = document.getElementById('server-ip');
    serverIpElement.innerHTML = `<span class="loader"></span>`;
    fetch('https://api.mcstatus.io/v2/status/bedrock/'+serverIp)
    .then(response => response.json())
    .then(data => handleServerStatus(data));

    function handleServerStatus(data){
        if(data.online=='false'){
            console.log(data.online);
            return false;
        }
      const versionServer = document.getElementById("version-server");
      versionServer.innerHTML = `Minecraft Bedrock เวอร์ชัน `+(data.version.name);

      const serverIpElement = document.getElementById('server-ip');
      serverIpElement.innerHTML = (data.host);
  
      const playerCounter = document.getElementById("player-count");
      playerCounter.innerHTML = `( ออนไลน์ `+(data.players.online)+` คน )`;
  
      const addServer = document.getElementById("add-server");
      addServer.innerHTML = `<a href="minecraft:?addExternalServer=Nixvip|server.nixvip.top:19132" ><button class="button"><i class="fa fa-plus-circle" aria-hidden="true"></i> เพิ่มเซิฟเวอร์</button></a>`;
    } 
}
  

