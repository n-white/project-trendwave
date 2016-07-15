var watson = require('watson-developer-cloud');
var api_key = '8b2fff3df62c098999daf886ee2d7f5aeccb9689';
var Promise = require('bluebird');


var alchemy_language = watson.alchemy_language({
  api_key: api_key
});
 
var tweets = [ { text: 'What s Next for Nintendo? SNES Classic Mini Console?   via  YouTube' },
  { text: 'Nintendo’s new mini NES will never get more games or conne    ' },
  { text: ' jeflump  DrWaleeed20  Capten31 that s Me the killer from Miami I did that for real to show the world the true Violence I have :smiling_imp::smiling_imp::smiling_imp:' },
  { text: 'RT  BillyVegasMMA  The NES with 30 built in games is trending on Twitter!  Nintendo is helping to keep  retrogaming alive!  gamersunite htt…' },
  { text: 'RT  dallasnews  Nintendo will fuel nostalgia with a new mini NES that includes 30 classic games    GuideLive  https …' },
  { text: 'Super Nintendo  Sega Genesis \nI m a Twitter twerp whose gonna tackle ISIS' },
  { text: 'Nintendo’s new mini NES will never get more games or connect to the internet   TechnologyNews' },
  { text: 'RT  FirstpostSports   PokemonGO at  RioOlympics  Mayor  eduardopaes  invites Nintendo to Brazil\n\n ' },
  { text: 'RT  verge  Nintendo s new NES Classic is an excellent deal  ' },
  { text: 'RT  TechCrunch  Nest has new outdoor cameras  Nintendo is relaunching the Nes and more on  CrunchReport ' },
  { text: 'Nintendo won t offer additional games for the Classic Mini Bad news  Nintendo fans  The Classic Mini that was    ' },
  { text: 'RT  SasakiTime  I need this NES plug and play system that comes with 30 games and hits stores in the Fall  nintendo  videogames ' },
  { text: 'RT  levie  Nintendo s mobile strategy \n2008  what s an iPhone \n2010  what s an Android \n2012  nope\n2014  still no\n2016  change how society…' },
  { text: 'I SO want the new Nintendo system coming out! Childhood replay!  BTN11' },
  { text: 'Nintendo to Sell Tiny Nintendos This November ' },
  { text: 'RT  jeffgerstmann  I wrote up something real quick about that tiny Nintendo that Nintendo s going to sell  ' },
  { text: 'RT  TechCrunch  Nest has new outdoor cameras  Nintendo is relaunching the Nes and more on  CrunchReport ' },
  { text: 'Oh no way! New Nintendo is gonna release a day after my birthday? Who s got me???  BirthdayWish' },
  { text: 'RT  guardiantech  Party like it s 1983  Nintendo Classic Mini aims to pique gamers  nostalgia  ' },
  { text: 'Nintendo NX Supplemental Computing Device PATENT DETAILS!! ' },
  { text: 'RT  techradar  Don t expect any mini Nintendo NES games beyond its 30 pre loaded titles  ' },
  { text: 'RT  gamesyouloved  Hey Nintendo   you know that new mini NES with 30 games \n\nIt ain t enough   release the whole damn lot of them\n\nNOW! htt…' },
  { text: '  Nintendo s NES Classic comes with 30 games  and that s all it ll ever get   games' },
  { text: 'RT  techradar  Don t expect any mini Nintendo NES games beyond its 30 pre loaded titles  ' },
  { text: 'RT  verge  Pokémon Go story theory  we re just a simulation being played by future humans  ' },
  { text: 'RT TechCrunch  Nest has new outdoor cameras  Nintendo is relaunching the Nes and more on  CrunchReport ' },
  { text: 'Nintendo won t offer additional games for the Classic Mini ' },
  { text: 'RT  OfficialJoelF  Nintendo announces mini NES coming to stores 11 11  30 games included  ' },
  { text: 'RT  NintendoAmerica  Check out  MyNintendo rewards! Redeem points for Super Mario Kart and more at  ' },
  { text: 'Couldn t you just tape a Nintendo on it or something? they have a camera on it ' },
  { text: 'RT  levie  Nintendo s mobile strategy \n2008  what s an iPhone \n2010  what s an Android \n2012  nope\n2014  still no\n2016  change how society…' },
  { text: 'RT  gamesyouloved  Hey Nintendo   you know that new mini NES with 30 games \n\nIt ain t enough   release the whole damn lot of them\n\nNOW! htt…' },
  { text: 'Nest has new outdoor cameras  Nintendo is relaunching the Nes and more on  CrunchReport ' },
  { text: 'Nintendo won t offer additional games for the Classic Mini ' },
  { text: 'RT  mrblack77  Nintendo s Classic Mini is a tiny NES with 30 games  via  engadget' },
  { text: 'Nintendo’s new mini NES will never get more games or connect to the internet   ' },
  { text: 'My son s already asked for the Nintendo Classic for Christmas  He s 36   BTN11' },
  { text: 'RT  jeffgerstmann  I wrote up something real quick about that tiny Nintendo that Nintendo s going to sell  ' },
  { text: 'RT  NintendoUK  Nintendo Classic Mini  Nintendo Entertainment System arrives on 11 11 w  30 games included!  https  …' },
  { text: 'Top of my shopping list when it s available   This is nostalgia at its best  ' } ]
 
var positiveCount = 0;
var negativecount = 0;
var neutralCount = 0;

var getSentiment = function(item) {
	return new Promise(function(resolve, reject) {
		alchemy_language.sentiment(item, function (err, response) {
		  if (err) {
		    reject(err);
		  } else {
		  	resolve(response.docSentiment.type);
		  }
		});
	})
};

var countSentiment = function(sentimentType) {
	if (sentimentType === 'neutral') {
	  neutralCount++;
	} else if (sentimentType === 'positive') {
		positiveCount++
	} else if (sentimentType === 'negative') {
		negativecount++
	}
}


tweets.forEach(function(tweet) {
	getSentiment(tweet).then(function(item) {
		countSentiment(item);
	}).then(function() {
		if (tweets.length === positiveCount + negativecount + neutralCount) {
			console.log('positive: ', positiveCount, ' negative: ', negativecount, ' neutral: ', neutralCount);
			var total = positiveCount + negativecount + neutralCount;
			console.log('positive: ', positiveCount / total, ' negative: ', negativecount / total, ' neutral: ', neutralCount / total);
		}
	})
})


