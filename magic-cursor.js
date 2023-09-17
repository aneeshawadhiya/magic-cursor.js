class MagicCursor {
  constructor(options = {}) {
    // Default cursor styles
    this.styles = {
      backgroundColor: "black",
      width: "1rem",
      height: "1rem",
      borderColor: "black",
      outlineWidth: "3rem",
      outlineHeight: "3rem",
      invert: false,
    };

    // Merge user-defined options with defaults
    Object.assign(this.styles, options);

    // Create cursor elements
    this.cursorDot = document.createElement("div");
    this.cursorOutline = document.createElement("div");

    // Apply CSS styles
    this.applyStyles();

    // Add cursor elements to the body
    document.body.insertBefore(this.cursorOutline, document.body.firstChild);
    document.body.insertBefore(this.cursorDot, document.body.firstChild);

    // Handle mousemove event
    window.addEventListener("mousemove", this.moveCursor.bind(this));

    // Hide the default cursor
    document.documentElement.style.cursor = "none";
  }

  applyStyles() {


    const {
      invert,
      backgroundColor,
      width,
      height,
      borderColor,
      outlineWidth,
      outlineHeight,
      outerBorderType = 'solid',
      outerBorderWidth = '1px',
      playButton = false,
    } = this.styles;

    // Invert the background color and border color
    const invertedBackgroundColor = invert ? "black" : backgroundColor;
    const invertedBorderColor = invert ? "black" : borderColor;

    // Apply CSS styles to cursorDot
    this.cursorDot.style.mixBlendMode = "difference";
    this.cursorDot.style.backgroundColor = playButton ? 'transparent' : invertedBackgroundColor;
    this.cursorDot.style.width = playButton ? "0" : width;
    this.cursorDot.style.height = playButton ? "0" : height;
    this.cursorDot.style.top = 0;
    this.cursorDot.style.left = 0;
    if (playButton) {
      this.cursorDot.style.borderTop = `15px solid transparent`;
      this.cursorDot.style.borderLeft = `20px solid ${invertedBackgroundColor}`;
      this.cursorDot.style.borderBottom = `15px solid transparent`;
    } else {
      this.cursorDot.style.borderRadius = "50%";
    }
    this.cursorDot.style.zIndex = "10";
    this.cursorDot.style.pointerEvents = "none";
    this.cursorDot.style.position = "absolute";
    this.cursorDot.style.transform = "translate(-50%,-50%)";

    // Apply CSS styles to cursorOutline
    this.cursorOutline.style.mixBlendMode = "difference";
    this.cursorOutline.style.border = `${outerBorderWidth} ${outerBorderType} ${invertedBorderColor}`; // Use the inverted border color
    // this.cursorOutline.style.backgroundColor = invertedBackgroundColor; // Use the inverted background color
    this.cursorOutline.style.width = outlineWidth;
    this.cursorOutline.style.height = outlineHeight;
    this.cursorOutline.style.borderRadius = "50%";
    this.cursorOutline.style.top = 0;
    this.cursorOutline.style.left = 0;
    this.cursorOutline.style.zIndex = "10";
    this.cursorOutline.style.pointerEvents = "none";
    this.cursorOutline.style.position = "absolute";
    this.cursorOutline.style.transform = "translate(-50%,-50%)";
  }

  moveCursor(e) {
    const scrollY = window.scrollY; // Get vertical scroll position
    const posX = e.clientX;
    const posY = e.clientY + scrollY; // Adjust Y position based on scroll

    this.cursorDot.style.left = `${posX}px`;
    this.cursorDot.style.top = `${posY}px`;

    this.cursorOutline.style.left = `${posX}px`;
    this.cursorOutline.style.top = `${posY}px`;

    this.cursorOutline.animate(
      {
        left: `${posX}px`,
        top: `${posY}px`,
      },
      { duration: 500, fill: "forwards" }
    );
  }
}

// Use CommonJS module.exports to make the function accessible
if (typeof module !== "undefined" && typeof module.exports !== "undefined") {
  module.exports = MagicCursor;
}
