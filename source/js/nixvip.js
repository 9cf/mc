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
    serverIpElement.innerHTML = (serverIp);
  
    console.log('https://api.mcstatus.io/v2/status/bedrock/'+serverIp);
    fetch('https://api.mcstatus.io/v2/status/bedrock/'+serverIp)
    .then(response => response.json())
    .then(data => handleServerStatus(data));
  
    function handleServerStatus(data){
        if(data.status=='error'){
            console.log(data.error);
            return false;
        }
  
        const version = document.getElementById("version");
        version.innerHTML = `Minecraft Bedrock เวอร์ชัน `+(data.version.name);
  
        const playerCounter = document.getElementById("player-count");
        playerCounter.innerHTML = `ออนไลน์ `+(data.players.online)+` คน`;
  
        const addServer = document.getElementById("add-server");
        addServer.innerHTML = `<a href="minecraft:?addExternalServer=Nixvip|server.nixvip.top:19132" ><button class="button">เพิ่มเซิฟเวอร์</button></a>`;
  
        const logo = document.getElementById("server-icon");
        logo.src = (data.favicon);
    } 
  
  }