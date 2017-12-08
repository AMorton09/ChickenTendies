const tinderbot = require('tinderbot');
const bot = new tinderbot();
const _ = require('underscore');
const config = require('./config.js');

bot.FBClientId = config.id ;
bot.FBClientSecret = config.secret;


bot.mainLoop = function() {
    bot.client.getRecommendations(10, function(error, data){
        _.chain(data.results)
            .pluck('_id')
            .each(function(id) {
                bot.client.like(id, function(error, data) {
                    if (data.matched) {
                        bot.client.sendMessage(
                            id,
                            "Hey, hun how are you"
                        );
                    }
                });
            });
    });
};

bot.live();