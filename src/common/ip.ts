/*async function getLocalIP() {
    try {
      const peerConnection = new RTCPeerConnection({ iceServers: [] });
      const offer = await peerConnection.createOffer();
      await peerConnection.setLocalDescription(offer);
  
      if (offer && offer.sdp) {
        const match = offer.sdp.match(/(?<=\n)candidate:.+?typ host/g) || [];
        const ip = match.map((m) => m.match(/(?<=candidate:).+?(?= \d+)/)[0]);
        return ip[0] || "Not found";
      } else {
        return "Not found";
      }
    } catch (e) {
      return "Not found";
    }
  }

export const localIP = await getLocalIP();*/