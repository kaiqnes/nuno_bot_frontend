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
        var getMessageText, sendMessage;
        getMessageText = function() {
            var $message_input;
            $message_input = $('.message_input');
            return $message_input.val();
        };
        sendMessage = function(origin, text) {
            var $messages, message;
            if (text.trim() === '') {
                return;
            }
            $('.message_input').val('');
            $messages = $('.messages');
            message = new Message({
                text: text,
                origin: origin.toLowerCase()
            });
            message.draw();
            return $messages.animate({ scrollTop: $messages.prop('scrollHeight') }, 300);
        };
        $('.send_message').click(function(e) {
            return sendMessage('USER', getMessageText());
        });
        $('.message_input').keyup(function(e) {
            if (e.which === 13) {
                return sendMessage('USER', getMessageText());
            }
        });
        sendMessage('BOT', 'Hello Philip! :)');
        setTimeout(function() {
            return sendMessage('USER', 'Hi Sandy! How are you?');
        }, 1000);
        return setTimeout(function() {
            return sendMessage('BOT', 'I\'m fine, thank you!');
        }, 2000);
    });
}.call(this));