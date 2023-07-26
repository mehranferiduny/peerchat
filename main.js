let localstream;
let remotstrim;

let Servers={
  iceServers:[
    {
      urls:['stun:stun1.l.google.com:19302','stun:stun2.l.google.com:19302']
    }
  ]
}

let init =async()=>{

  localstream=await navigator.mediaDevices.getUserMedia({video:true,audio:false})
  document.getElementById('user-1').srcObject=localstream;

   creatOffer();
}

let creatOffer=async()=>{


  let peerconnection=new RTCPeerConnection(Servers);

  remotstrim=new MediaStream();
  document.getElementById('user-2').srcObject=remotstrim;


  localstream.getTracks().forEach((trak)=>{
    peerconnection.addTrack(trak,localstream);
  });

  peerconnection.ontrack=(event)=>{
    event.streams[0].getTracks().forEach(trak =>{
      remotstrim.addTrack(trak);
    })
  }

  peerconnection.onicecandidate=async(event)=>{
    if(event.candidate){
      console.log('new ice canedate:',event.candidate);
    }
  }

 
  let offer= await peerconnection.createOffer();
  await peerconnection.setLocalDescription(offer);

  console.log('offer:',offer);




}
init();