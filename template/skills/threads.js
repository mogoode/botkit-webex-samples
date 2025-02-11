module.exports = function (controller) {

     controller.hears(["threads"], "direct_message,direct_mention", function (bot, message) {

         bot.startConversation(message, function (err, convo) {

             convo.ask("What is your favorite color?", [
                 {
                     pattern: "^blue|green|pink|red|yellow$",
                     callback: function (response, convo) {
                         convo.gotoThread("success");
                     },
                 },
                 {
                     default: true,
                     callback: function (response, convo) {
                         convo.gotoThread('bad_response');
                     }
                 }
             ], { key: "answer" });

             // Success thread
             convo.addMessage(
                 "Cool, I love '{{responses.answer}}' too",
                 "success");

             // Bad response
             convo.addMessage({
                 text: "Sorry, I don't know this color.<br/>_Tip: try blue, green, pink, red or yellow!_",
                 action: 'default',
             }, 'bad_response');
         });
     });
 };
