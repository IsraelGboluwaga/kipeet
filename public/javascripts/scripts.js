setTimeout(function () {
    $(".error-div").hide(500).empty();
}, 3500);

const options = {
    strings: ['"kipeet"'],
    typeSpeed: 60,
    // time before typing starts
    startDelay: 3000,
    // backspacing speed
    backSpeed: 200,
    // time before backspacing
    backDelay: 5000,
    // loop
    loop: true,
    // false = infinite
    loopCount: 5,
    // show cursor
    showCursor: false,
    // character for cursor
    cursorChar: "|",
    // attribute to type (null == text)
    attr: null,
    // either html or text
    contentType: 'html',
};

let typed = new Typed("#typedJS", options);
