module.exports = function( callbacks ) {

    if ( typeof callbacks !== 'object' ) {
        console.error("Must specify an object with any of the following keys: onDirectionChange, onIncrease, onDecrease");
        return;
    }

    var value
        , prevValue = 0
        , direction
        , prevDirection
        , _callbacks = {}
    ;

    var onDirectionChange = callbacks.onDirectionChange
        , onIncrease = callbacks.onIncrease
        , onDecrease = callbacks.onDecrease
    ;

    delete callbacks.onDirectionChange;
    delete callbacks.onIncrease;
    delete callbacks.onDecrease;


    if ( Object.keys(callbacks).length > 0 ) {
        console.error("Too many params suppied:", callbacks);
        return;
    }

    _callbacks.onDirectionChange = onDirectionChange;
    _callbacks.onIncrease = onIncrease;
    _callbacks.onDecrease = onDecrease;

    return {
        update: update
    }

    function update( value ) {

        if ( value > prevValue ) {
            direction = 'increase';
        }
        else if ( value < prevValue ) {
            direction = 'decrease';
        }
        else if ( value === prevValue ) {
            return;
        }

        if ( direction != prevDirection ) {
            _callbacks.onDirectionChange && _callbacks.onDirectionChange(value, direction);
        }
        else if ( direction === 'increase' ) {
            _callbacks.onIncrease && _callbacks.onIncrease(value);
        }
        else if ( direction === 'decrease' ) {
            _callbacks.onDecrease && _callbacks.onDecrease(value);
        }

        prevValue = value;
        prevDirection = direction;
    }


}
