// #####################################   BACKLOG   ###################################
// - Criar um backend em node para o front
// - Criar um backend em Java/Golang para conectar ao watson
// - Criar skill no watson para responder no front

(function() {
    var Message;
    Message = function(arg) {
        this.text = arg.text, this.origin = arg.origin;
        this.draw = function(_this) {
            return function() {
                var $message;
                $message = $($('.message_template').clone().html());
                $message.addClass(_this.origin).find('.text').html(_this.text);
                $('.messages').append($message);
                return setTimeout(function() {
                    return $message.addClass('appeared');
                }, 0);
            };
        }(this);
        return this;
    };
    $(function() {
        var getMessageText, submitToBot, postMessage;
        getMessageText = function() {
            var $message_input;
            $message_input = $('.message_input');
            return $message_input.val();
        };
        submitToBot = function(text) {
            axios({
                    method: 'POST',
                    url: 'https://nunobot.free.beeceptor.com/ok',
                    data: {}
                })
                .then(response => {
                    return postMessage("BOT", response.data.message)
                })
                .catch(error => {
                    console.log(error)
                    return postMessage("BOT", "Tive um problema nos meus circuitos aqui, vamos recomeçar?")
                })
        };
        postMessage = function(origin, text) {
            var $messages, message;
            if (text.trim() === '') {
                return;
            }
            $('.message_input').val('');
            $messages = $('.messages');
            origin = origin.toLowerCase();
            message = new Message({
                text: text,
                origin: origin
            });
            message.draw();
            return $messages.animate({ scrollTop: $messages.prop('scrollHeight') }, 300);
        };
        $('.send_message').click(function(e) {
            inputText = getMessageText()
            postMessage("USER", inputText);
            return submitToBot(inputText)
        });
        $('.message_input').keyup(function(e) {
            if (e.which === 13) {
                inputText = getMessageText()
                postMessage("USER", inputText);
                return submitToBot(inputText)
            }
        });
        submitToBot("")
    });
}.call(this));