var tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

function onYouTubeIframeAPIReady() {
  ytPlayer = new YT.Player(
    'gamen-pokemon', // 埋め込む場所の指定
  {
    width: 560, // プレーヤーの幅
    height: 315, // プレーヤーの高さ
    videoId: '4mj0ty1QVJc' // YouTubeのID
  }
  );
}

function pokemon(){
  $("#gamen").css("display","none");
  $("#gamen-pokemon").css("display","block");
  ytPlayer.playVideo();
};

  var number=0;



$("#off").on("click",function(){
  number+=1;

  $("#off").css("display","none");
  $("#on").css("display","block");

  var random=Math.floor(Math.random()*5);
  // console.log(random);
  if(random==0){
   $("#gameboy").addClass("bag");
    $("#Nintendo").addClass("bag");
   // var random=Math.floor(Math.random()*5);
  }else{
    $("#gameboy").addClass("active");
    $("#Nintendo").addClass("active");

      window.setTimeout(function(){pokemon()},4000);
   // var random=Math.floor(Math.random()*5);
  }
});

$("#on").on("click",function(){

  $("#on").css("display","none");
  $("#off").css("display","block");

  $("#gameboy").removeClass("active");
  $("#Nintendo").removeClass("active");

  $("#gameboy").removeClass("bag");
  $("#Nintendo").removeClass("bag");
  $("#Nintendo").removeClass("bag");

  $("#gamen-pokemon").css("display","none");
  $("#gamen").css("display","block");
  $("#gamenSelectA").css("display","none");
  $("#gamenSelectB").css("display","none");

  ytPlayer.pauseVideo();
  var currentTime = ytPlayer.getCurrentTime();//YouTubeの時間
 ytPlayer.seekTo(currentTime - 160);
});


  var btnA=0;
  var blockGame=false;
  var pokeGame=false;

$("#BtnA").on("click",function(){
    btnA+=1;
    var currentTime = ytPlayer.getCurrentTime();//YouTubeの時間

  if(btnA==1){
    ytPlayer.seekTo(currentTime + 19);
  }else if(btnA==2){
    ytPlayer.pauseVideo();
    $("#gamen-pokemon").css("display","none");
    $("#gamen").css("display","none");
    $("#gamenSelectA").css("display","block");
    blockGame=true;
  }else if(btnA>2){
    ytPlayer.pauseVideo();
    $("#gamen-pokemon").css("display","none");
    $("#gamen").css("display","none");
    $("#gamenSelectA").css("display","block");
    $("#gamenSelectB").css("display","none");
    if(blockGame==true&&pokeGame==false){
      location.href="block/blockGame.html";
    }else if(blockGame==false&&pokeGame==true){
      alert("すみません。ポケモン赤はまだ実装されていません。");
    };
  };

});

$("#keyDown").on("click",function(){
      $("#gamenSelectB").css("display","block");
      $("#gamenSelectA").css("display","none");
      blockGame=false;
      pokeGame=true;
});

$("#keyUp").on("click",function(){
      $("#gamenSelectB").css("display","none");
      $("#gamenSelectA").css("display","block");
      blockGame=true;
      pokeGame=false;
});
