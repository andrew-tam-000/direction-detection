# direction-detection
Detect whether or not a "stream's" value is increasing or decreasing.

## Usage

var directionDetection = require('direction-detection');


```
// Initialize your object
var scrollDirection = directionDetection({
    onDirectionChange: function(value, direction) {
        console.log('Execute me when the tracked value is changed.')
    }
    , onIncrease: function(value) {
        console.log('Execute me when the tracked value is incremented.')
    }
    , onDecrease: function(value) {
        console.log('Execute me when the tracked value is decremented.')
    }
});

$(window).on('scroll', function() {
    var scrollTop = container.scrollTop();
    scrollDirection.update(scrollTop);
});
```

## Coming Soon

AMD support
