var test = require('tape')
    , directionDetector = require('../index')
;


test('Update yeilds proper callback', function(t) {
    t.plan(1);

    var newValue = '';
    var ev;

    var eventQueue = [];
    var eventUpdate = [];

    var scrollDetectOne = directionDetector({
        onDirectionChange: function(value, direction) {
            eventQueue.push({
                event: 'onDirectionChange'
                , value
                , direction
            });
        }
        , onIncrease: function(value, direction) {
            eventQueue.push({
                event: 'onIncrease'
                , value
            });
        }
        , onDecrease: function(value, direction) {
            eventQueue.push({
                event: 'onDecrease'
                , value
            });
        }
    });

    scrollDetectOne.update(5);
    scrollDetectOne.update(10);
    scrollDetectOne.update(8);
    scrollDetectOne.update(7);
    scrollDetectOne.update(7);
    scrollDetectOne.update(7);
    scrollDetectOne.update(7);
    scrollDetectOne.update(7);
    scrollDetectOne.update(1);
    scrollDetectOne.update(10);
    scrollDetectOne.update(11);

    t.deepEqual(eventQueue, [
        {
            event: 'onDirectionChange'
            , value: 5
            , direction: 'increase'
        }
        , {
            event: 'onIncrease'
            , value: 10
        }
        , {
            event: 'onDirectionChange'
            , value: 8
            , direction: 'decrease'
        }
        , {
            event: 'onDecrease'
            , value: 7
        }
        , {
            event: 'onDecrease'
            , value: 1
        }
        , {
            event: 'onDirectionChange'
            , value: 10
            , direction: 'increase'
        }
        , {
            event: 'onIncrease'
            , value: 11
        }
    ]);

    t.end();
});
