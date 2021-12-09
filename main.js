const field_height = document.getElementById(`field_height`); // fetch from document
const field_width = document.getElementById(`field_width`);
const field_character_size = document.getElementById(`field_character_size`);
const field_to_cipher = document.getElementById(`field_to_cipher`);
const html_canvas = document.getElementById(`canvas`);
const ctx = html_canvas.getContext(`2d`); //

ctx.translate(0.5, 0.5); // setup canvas //

saved_character_size_value = field_character_size.value; // create functions and variables
character_size = (factor) => {return Math.round(Number(field_character_size.value) * 2 * factor)};
pen = {x: character_size(1), y: character_size(1), black: 20, white: 8};
top_rails = false; bottom_rails = false;
adjust_canvas = () => {
    html_canvas.width = field_width.value;
    html_canvas.height = field_height.value;
    ctx.fillStyle = (`#555`);
    ctx.fillRect(0, 0, html_canvas.width, html_canvas.height);
}
stroke = (colour, thickness, type, variation, offset, length) => {
    ctx.beginPath();
    ctx.strokeStyle = colour;
    ctx.lineWidth = thickness;
    if(type === `arc`) {
        if(variation === 1) {
            ctx.arc(pen.x + character_size(offset), pen.y + character_size(0.5), character_size(0.5), Math.PI * 1.5, 0, false);
        } else if(variation === 2) {
            ctx.arc(pen.x + character_size(offset), pen.y + character_size(0.5), character_size(0.5), 0, Math.PI * 0.5, false);
        } else if(variation === 3) {
            ctx.arc(pen.x + character_size(offset), pen.y + character_size(0.5), character_size(0.5), Math.PI * 0.5, Math.PI, false);
        } else if(variation === 4) {
            ctx.arc(pen.x + character_size(offset), pen.y + character_size(0.5), character_size(0.5), Math.PI, Math.PI * 1.5, false);
        }
    } else if(type === `line`) {
        if(variation === 1) {
            ctx.moveTo(pen.x + character_size(offset), pen.y);
            ctx.lineTo(pen.x + character_size(offset + length), pen.y);
        } else if(variation === 2) {
            ctx.moveTo(pen.x + character_size(offset), pen.y + character_size(1));
            ctx.lineTo(pen.x + character_size(offset + length), pen.y + character_size(1));
        }
    } else if(type === `circle`) {
        if(variation === 1) {ctx.arc(pen.x + character_size(0.5) + character_size(offset), pen.y + character_size(0.5), character_size(0.5), 0, Math.PI * 2, false)}
        else if(variation === 2) {ctx.arc(pen.x + character_size(0.25), pen.y + character_size(0.25), character_size(0.25), 0, Math.PI * 2, false)}
        else if(variation === 3) {ctx.arc(pen.x + character_size(0.25), pen.y + character_size(0.75), character_size(0.25), 0, Math.PI * 2, false)};
        ctx.fillStyle = (`#fff`);
        ctx.fill();
    } else if(type === `conjunction`) {
        if(variation === 1) {
            ctx.arc(pen.x + character_size(offset + 1), pen.y + character_size(0.5), character_size(0.5), Math.PI, Math.PI * 1.5, false);
            ctx.arc(pen.x + character_size(offset), pen.y + character_size(0.5), character_size(0.5), Math.PI * 1.5, 0, false);
            ctx.moveTo(pen.x + character_size(offset), pen.y);
            ctx.lineTo(pen.x + character_size(offset + 1), pen.y);
        } else if(variation === 2) {
            ctx.arc(pen.x + character_size(offset), pen.y + character_size(0.5), character_size(0.5), 0, Math.PI * 0.5, false);
            ctx.arc(pen.x + character_size(offset + 1), pen.y + character_size(0.5), character_size(0.5), Math.PI * 0.5, Math.PI, false);
            ctx.moveTo(pen.x + character_size(offset), pen.y + character_size(1));
            ctx.lineTo(pen.x + character_size(offset + 1), pen.y + character_size(1));
        }
        ctx.fillStyle = (`#fff`);
        ctx.fill();
    }
    ctx.stroke();
}
rails = (length) => {
    if(top_rails) {
        stroke(`#000`, pen.black, `line`, 1, 0, length);
        stroke(`#fff`, pen.white, `line`, 1, 0, length);
    }
    if(bottom_rails) {
        stroke(`#000`, pen.black, `line`, 2, 0, length);
        stroke(`#fff`, pen.white, `line`, 2, 0, length);
    }
}
character = (type, mode, direction) => {
    let space = 0;
    if(type === `space`) {
        if(mode === `write`) {
            stroke(`#000`, pen.black, `arc`, 3, 1.75);
            stroke(`#fff`, pen.white, `arc`, 3, 1.75);
            stroke(`#000`, pen.black, `arc`, 4, 1.75);
            stroke(`#fff`, pen.white, `arc`, 4, 1.75);
            stroke(`#000`, pen.black, `arc`, 1, 0);
            stroke(`#fff`, pen.white, `arc`, 1, 0);
            stroke(`#000`, pen.black, `arc`, 2, 0);
            stroke(`#fff`, pen.white, `arc`, 2, 0);
        } else if(mode === `rails`) {
            top_rails = true;
            bottom_rails = true;
            // strandedness
            //     top    = 2
            //     bottom = 2
            //     total  = 4
        }
        space = 1.75;
    } else if(type === `hill`) {
        if(mode === `write`) {
            stroke(`#000`, pen.black, `arc`, 2, 0);
            stroke(`#fff`, pen.white, `arc`, 2, 0);
            stroke(`#000`, pen.black, `arc`, 4, 1);
            stroke(`#fff`, pen.white, `arc`, 4, 1);
        } else if(mode === `rails`) {
            if(direction === 1) {
                bottom_rails = false;
                rails(1 * direction);
                top_rails = true;
            } else {
                top_rails = false;
                rails(1 * direction);
                bottom_rails = true;
            }
            // strandedness
                // top    = 0
                // bottom = 0
                // total  = 0
        }
        space = 1;
    } else if(type === `waterfall`) {
        if(mode === `write`) {
            stroke(`#000`, pen.black, `arc`, 1, 0);
            stroke(`#fff`, pen.white, `arc`, 1, 0);
            stroke(`#000`, pen.black, `arc`, 3, 1);
            stroke(`#fff`, pen.white, `arc`, 3, 1);
        } else if(mode === `rails`) {
            if(direction === 1) {
                top_rails = false;
                rails(1 * direction);
                bottom_rails = true;
            } else {
                bottom_rails = false;
                rails(1 * direction);
                top_rails = true;
            }
            // strandedness
                // top    = 0
                // bottom = 0
                // total  = 0
        }
        space = 1;
    } else if(type === `crescent`) {
        if(mode === `write`) {
            stroke(`#000`, pen.black, `arc`, 3, 0.5);
            stroke(`#fff`, pen.white, `arc`, 3, 0.5);
            stroke(`#000`, pen.black, `arc`, 4, 0.5);
            stroke(`#fff`, pen.white, `arc`, 4, 0.5);
        } else if(mode === `rails`) {
            if(direction === 1) {
                rails(0.5 * direction);
                top_rails = true;
                bottom_rails = true;
            } else {
                top_rails = false;
                bottom_rails = false;
            }
            // strandedness
                // top    = 0
                // bottom = 0
                // total  = 0
        }
        space = 0.5;
    } else if(type === `moon`) {
        if(mode === `write`) {
            stroke(`#000`, pen.black, `arc`, 1, 0);
            stroke(`#fff`, pen.white, `arc`, 1, 0);
            stroke(`#000`, pen.black, `arc`, 2, 0);
            stroke(`#fff`, pen.white, `arc`, 2, 0);
        } else if(mode === `rails`) {
            if(direction === 1) {
                top_rails = false;
                bottom_rails = false;
            } else {
                rails(0.75 * direction);
                top_rails = true;
                bottom_rails = true;
            }
            // strandedness
                // top    = 0
                // bottom = 0
                // total  = 0
        }
        space = 0.75;
    } else if(type === `conjunction_northwest`) {
        if(mode === `write`) {
            stroke(`#000`, pen.black, `conjunction`, 1, 0);
            stroke(`#fff`, pen.white, `conjunction`, 1, 0);
            stroke(`#000`, pen.black, `arc`, 2, 0);
            stroke(`#fff`, pen.white, `arc`, 2, 0);
        } else if(mode === `rails`) {
            if(direction === 1) {
                top_rails = true;
                bottom_rails = false;
            } else {
                top_rails = false;
                rails(1 * direction);
                top_rails = true;
                bottom_rails = true;
            }
            // strandedness
                // top    = 2
                // bottom = 0
                // total  = 2
        }
        space = 1;
    } else if(type === `conjunction_southwest`) {
        if(mode === `write`) {
            stroke(`#000`, pen.black, `conjunction`, 2, 0);
            stroke(`#fff`, pen.white, `conjunction`, 2, 0);
            stroke(`#000`, pen.black, `arc`, 1, 0);
            stroke(`#fff`, pen.white, `arc`, 1, 0);
        } else if(mode === `rails`) {
            if(direction === 1) {
                top_rails = false;
                bottom_rails = true;
            } else {
                bottom_rails = false;
                rails(1 * direction);
                top_rails = true;
                bottom_rails = true;
            }
            // strandedness
                // top    = 0
                // bottom = 2
                // total  = 2
        }
        space = 1;
    } else if(type === `conjunction_northeast`) {
        if(mode === `write`) {
            stroke(`#000`, pen.black, `conjunction`, 1, 0);
            stroke(`#fff`, pen.white, `conjunction`, 1, 0);
            stroke(`#000`, pen.black, `arc`, 3, 1);
            stroke(`#fff`, pen.white, `arc`, 3, 1);
        } else if(mode === `rails`) {
            if(direction === 1) {
                top_rails = false;
                rails(1 * direction);
                top_rails = true;
                bottom_rails = true;
            } else {
                top_rails = true;
                bottom_rails = false;
            }
            // strandedness
                // top    = 2
                // bottom = 0
                // total  = 2
        }
        space = 1;
    } else if(type === `conjunction_southeast`) {
        if(mode === `write`) {
            stroke(`#000`, pen.black, `conjunction`, 2, 0);
            stroke(`#fff`, pen.white, `conjunction`, 2, 0);
            stroke(`#000`, pen.black, `arc`, 4, 1);
            stroke(`#fff`, pen.white, `arc`, 4, 1);
        } else if(mode === `rails`) {
            if(direction === 1) {
                bottom_rails = false;
                rails(1 * direction);
                top_rails = true;
                bottom_rails = true;
            } else {
                top_rails = false;
                bottom_rails = true;
            }
            // strandedness
                // top    = 0
                // bottom = 2
                // total  = 2
        }
        space = 1;
    } else if(type === `erosion`) {
        if(mode === `write`) {
            stroke(`#000`, pen.black, `arc`, 1, 0);
            stroke(`#fff`, pen.white, `arc`, 1, 0);
            stroke(`#000`, pen.black, `arc`, 3, 1);
            stroke(`#fff`, pen.white, `arc`, 3, 1);
            stroke(`#000`, pen.black, `arc`, 2, 0);
            stroke(`#fff`, pen.white, `arc`, 2, 0);
            stroke(`#000`, pen.black, `arc`, 4, 1);
            stroke(`#fff`, pen.white, `arc`, 4, 1);
        } else if(mode === `rails`) {
            top_rails = true;
            bottom_rails = true;
            // strandedness
                // top    = 2
                // bottom = 2
                // total  = 4
        }
        space = 1;
    } else if(type === `flood`) {
        if(mode === `write`) {
            stroke(`#000`, pen.black, `arc`, 2, 0);
            stroke(`#fff`, pen.white, `arc`, 2, 0);
            stroke(`#000`, pen.black, `arc`, 4, 1);
            stroke(`#fff`, pen.white, `arc`, 4, 1);
            stroke(`#000`, pen.black, `arc`, 1, 0);
            stroke(`#fff`, pen.white, `arc`, 1, 0);
            stroke(`#000`, pen.black, `arc`, 3, 1);
            stroke(`#fff`, pen.white, `arc`, 3, 1);
        } else if(mode === `rails`) {
            top_rails = true;
            bottom_rails = true;
            // strandedness
                // top    = 2
                // bottom = 2
                // total  = 4
        }
        space = 1;
    } else if(type === `hourglass`) {
        if(mode === `write`) {
            stroke(`#000`, pen.black, `conjunction`, 1, 0);
            stroke(`#fff`, pen.white, `conjunction`, 1, 0);
            stroke(`#000`, pen.black, `conjunction`, 2, 0);
            stroke(`#fff`, pen.white, `conjunction`, 2, 0);
        } else if(mode === `rails`) {
            top_rails = true;
            bottom_rails = true;
            // strandedness
                // top    = 2
                // bottom = 2
                // total  = 4
        }
        space = 1;
    } else if(type === `sun`) {
        if(mode === `write`) {
            stroke(`#000`, pen.black, `circle`, 1, 0.25);
            stroke(`#fff`, pen.white, `circle`, 1, 0.25);
        } else if(mode === `rails`) {
            rails(0.75 * direction);
            top_rails = false;
            bottom_rails = false;
            // strandedness
                // top    = -2
                // bottom = -2
                // total  = -4
        }
        space = 1.5;
    } else if(type === `sunrise`) {
        if(mode === `write`) {
            stroke(`#000`, pen.black, `circle`, 2, 0);
            stroke(`#fff`, pen.white, `circle`, 2, 0);
        } else if(mode === `rails`) {
            rails(0.5 * direction);
            // strandedness
                // top    = 0
                // bottom = 0
                // total  = 0
        }
        space = 0.5;
    } else if(type === `sunset`) {
        if(mode === `write`) {
            stroke(`#000`, pen.black, `circle`, 3, 0);
            stroke(`#fff`, pen.white, `circle`, 3, 0);
        } else if(mode === `rails`) {
            rails(0.5 * direction);
            // strandedness
                // top    = 0
                // bottom = 0
                // total  = 0
        }
        space = 0.5;
    } else if(type === `spiral_northeast`) {
        if(mode === `write`) {
            stroke(`#000`, pen.black, `line`, 1, 0, 0.75);
            stroke(`#fff`, pen.white, `line`, 1, 0, 0.75);
            stroke(`#000`, pen.black, `arc`, 1, 0.75);
            stroke(`#fff`, pen.white, `arc`, 1, 0.75);
            stroke(`#000`, pen.black, `arc`, 2, 0.75);
            stroke(`#fff`, pen.white, `arc`, 2, 0.75);
            stroke(`#000`, pen.black, `line`, 1, 0.75, 0.75);
            stroke(`#fff`, pen.white, `line`, 1, 0.75, 0.75);
            stroke(`#000`, pen.black, `arc`, 3, 0.75);
            stroke(`#fff`, pen.white, `arc`, 3, 0.75);
            stroke(`#000`, pen.black, `arc`, 4, 0.75);
            stroke(`#fff`, pen.white, `arc`, 4, 0.75);
        } else if(mode === `rails`) {
            top_rails = false;
            rails(0.75 * direction);
            top_rails = true;
            bottom_rails = false;
            // strandedness
                // top    = 2
                // bottom = -2
                // total  = 0
        }
        space = 1.5;
    } else if(type === `spiral_southeast`) {
        if(mode === `write`) {
            stroke(`#000`, pen.black, `line`, 2, 0, 0.75);
            stroke(`#fff`, pen.white, `line`, 2, 0, 0.75);
            stroke(`#000`, pen.black, `arc`, 1, 0.75);
            stroke(`#fff`, pen.white, `arc`, 1, 0.75);
            stroke(`#000`, pen.black, `arc`, 2, 0.75);
            stroke(`#fff`, pen.white, `arc`, 2, 0.75);
            stroke(`#000`, pen.black, `line`, 2, 0.75, 0.75);
            stroke(`#fff`, pen.white, `line`, 2, 0.75, 0.75);
            stroke(`#000`, pen.black, `arc`, 3, 0.75);
            stroke(`#fff`, pen.white, `arc`, 3, 0.75);
            stroke(`#000`, pen.black, `arc`, 4, 0.75);
            stroke(`#fff`, pen.white, `arc`, 4, 0.75);
        } else if(mode === `rails`) {
            bottom_rails = false;
            rails(0.75 * direction);
            top_rails = false;
            bottom_rails = true;
            // strandedness
                // top    = -2
                // bottom = 2
                // total  = 0
        }
        space = 1.5;
    } else if(type === `spiral_northwest`) {
        if(mode === `write`) {
            stroke(`#000`, pen.black, `line`, 1, 0.75, 0.75);
            stroke(`#fff`, pen.white, `line`, 1, 0.75, 0.75);
            stroke(`#000`, pen.black, `arc`, 1, 0.75);
            stroke(`#fff`, pen.white, `arc`, 1, 0.75);
            stroke(`#000`, pen.black, `arc`, 2, 0.75);
            stroke(`#fff`, pen.white, `arc`, 2, 0.75);
            stroke(`#000`, pen.black, `arc`, 3, 0.75);
            stroke(`#fff`, pen.white, `arc`, 3, 0.75);
            stroke(`#000`, pen.black, `arc`, 4, 0.75);
            stroke(`#fff`, pen.white, `arc`, 4, 0.75);
            stroke(`#000`, pen.black, `line`, 1, 0, 0.75);
            stroke(`#fff`, pen.white, `line`, 1, 0, 0.75);
        } else if(mode === `rails`) {
            top_rails = false;
            rails(0.75 * direction);
            top_rails = true;
            bottom_rails = false;
            // strandedness
                // top    = 2
                // bottom = -2
                // total  = 0
        }
        space = 1.5;
    } else if(type === `spiral_southwest`) {
        if(mode === `write`) {
            stroke(`#000`, pen.black, `line`, 2, 0.75, 0.75);
            stroke(`#fff`, pen.white, `line`, 2, 0.75, 0.75);
            stroke(`#000`, pen.black, `arc`, 1, 0.75);
            stroke(`#fff`, pen.white, `arc`, 1, 0.75);
            stroke(`#000`, pen.black, `arc`, 2, 0.75);
            stroke(`#fff`, pen.white, `arc`, 2, 0.75);
            stroke(`#000`, pen.black, `arc`, 3, 0.75);
            stroke(`#fff`, pen.white, `arc`, 3, 0.75);
            stroke(`#000`, pen.black, `arc`, 4, 0.75);
            stroke(`#fff`, pen.white, `arc`, 4, 0.75);
            stroke(`#000`, pen.black, `line`, 2, 0, 0.75);
            stroke(`#fff`, pen.white, `line`, 2, 0, 0.75);
        } else if(mode === `rails`) {
            bottom_rails = false;
            rails(0.75 * direction);
            top_rails = false;
            bottom_rails = true;
            // strandedness
                // top    = -2
                // bottom = 2
                // total  = 0
        }
        space = 1.5;
    } else if(type === `wheel_northeast`) {
        if(mode === `write`) {
            stroke(`#000`, pen.black, `line`, 1, 0.75, 0.75);
            stroke(`#000`, pen.black, `arc`, 1, 0.75);
            stroke(`#fff`, pen.white, `arc`, 1, 0.75);
            stroke(`#000`, pen.black, `arc`, 2, 0.75);
            stroke(`#fff`, pen.white, `arc`, 2, 0.75);
            stroke(`#000`, pen.black, `arc`, 3, 0.75);
            stroke(`#fff`, pen.white, `arc`, 3, 0.75);
            stroke(`#000`, pen.black, `arc`, 4, 0.75);
            stroke(`#fff`, pen.white, `arc`, 4, 0.75);
            stroke(`#fff`, pen.white, `line`, 1, 0.75, 0.75);
        } else if(mode === `rails`) {
            if(direction === 1) {
                rails(0.75 * direction);
                top_rails = true;
                bottom_rails = false;
            } else {
                top_rails = false;
                rails(0.75 * direction);
                bottom_rails = false;
            }
            // strandedness
                // top    = 0
                // bottom = -2
                // total  = -2
        }
        space = 1.5;
    } else if(type === `wheel_southeast`) {
        if(mode === `write`) {
            stroke(`#000`, pen.black, `line`, 2, 0.75, 0.75);
            stroke(`#000`, pen.black, `arc`, 1, 0.75);
            stroke(`#fff`, pen.white, `arc`, 1, 0.75);
            stroke(`#000`, pen.black, `arc`, 2, 0.75);
            stroke(`#fff`, pen.white, `arc`, 2, 0.75);
            stroke(`#000`, pen.black, `arc`, 3, 0.75);
            stroke(`#fff`, pen.white, `arc`, 3, 0.75);
            stroke(`#000`, pen.black, `arc`, 4, 0.75);
            stroke(`#fff`, pen.white, `arc`, 4, 0.75);
            stroke(`#fff`, pen.white, `line`, 2, 0.75, 0.75);
        } else if(mode === `rails`) {
            if(direction === 1) {
                rails(0.75 * direction);
                top_rails = false;
                bottom_rails = true;
            } else {
                bottom_rails = false;
                rails(0.75 * direction);
                top_rails = false;
            }
            // strandedness
                // top    = -2
                // bottom = 0
                // total  = -2
        }
        space = 1.5;
    } else if(type === `wheel_northwest`) {
        if(mode === `write`) {
            stroke(`#000`, pen.black, `line`, 1, 0, 0.75);
            stroke(`#000`, pen.black, `arc`, 1, 0.75);
            stroke(`#fff`, pen.white, `arc`, 1, 0.75);
            stroke(`#000`, pen.black, `arc`, 2, 0.75);
            stroke(`#fff`, pen.white, `arc`, 2, 0.75);
            stroke(`#000`, pen.black, `arc`, 3, 0.75);
            stroke(`#fff`, pen.white, `arc`, 3, 0.75);
            stroke(`#000`, pen.black, `arc`, 4, 0.75);
            stroke(`#fff`, pen.white, `arc`, 4, 0.75);
            stroke(`#fff`, pen.white, `line`, 1, 0, 0.75);
        } else if(mode === `rails`) {
            if(direction === 1) {
                top_rails = false;
                rails(0.75 * direction);
                bottom_rails = false;
            } else {
                rails(0.75 * direction);
                top_rails = true;
                bottom_rails = false;
            }
            // strandedness
                // top    = 0
                // bottom = -2
                // total  = -2
        }
        space = 1.5;
    } else if(type === `wheel_southwest`) {
        if(mode === `write`) {
            stroke(`#000`, pen.black, `line`, 2, 0, 0.75);
            stroke(`#000`, pen.black, `arc`, 1, 0.75);
            stroke(`#fff`, pen.white, `arc`, 1, 0.75);
            stroke(`#000`, pen.black, `arc`, 2, 0.75);
            stroke(`#fff`, pen.white, `arc`, 2, 0.75);
            stroke(`#000`, pen.black, `arc`, 3, 0.75);
            stroke(`#fff`, pen.white, `arc`, 3, 0.75);
            stroke(`#000`, pen.black, `arc`, 4, 0.75);
            stroke(`#fff`, pen.white, `arc`, 4, 0.75);
            stroke(`#fff`, pen.white, `line`, 2, 0, 0.75);
        } else if(mode === `rails`) {
            if(direction === 1) {
                bottom_rails = false;
                rails(0.75 * direction);
                top_rails = false;
            } else {
                rails(0.75 * direction);
                top_rails = false;
                bottom_rails = true;
            }
            // strandedness
                // top    = 0
                // bottom = -2
                // total  = -2
        }
        space = 1.5;
    } else if(type === `sun_northeast`) {
        if(mode === `write`) {
            stroke(`#000`, pen.black, `line`, 1, 0.5, 1);
            stroke(`#000`, pen.black, `circle`, 1, 0);
            stroke(`#fff`, pen.white, `line`, 1, 0.5, 1);
            stroke(`#fff`, pen.white, `circle`, 1, 0);
        } else if(mode === `rails`) {
            if(direction === 1) {
                rails(0.5 * direction);
                top_rails = true;
                bottom_rails = false;
            } else {
                top_rails = false;
                rails(1 * direction);
                bottom_rails = false;
            }
            // strandedness
                // top    = -2
                // bottom = 0
                // total  = -2
        }
        space = 1.5;
    } else if(type === `sun_southeast`) {
        if(mode === `write`) {
            stroke(`#000`, pen.black, `line`, 2, 0.5, 1);
            stroke(`#000`, pen.black, `circle`, 1, 0);
            stroke(`#fff`, pen.white, `line`, 2, 0.5, 1);
            stroke(`#fff`, pen.white, `circle`, 1, 0);
        } else if(mode === `rails`) {
            if(direction === 1) {
                rails(0.5 * direction);
                top_rails = false;
                bottom_rails = true;
            } else {
                bottom_rails = false;
                rails(1 * direction);
                top_rails = false;
            }
            // strandedness
                // top    = -2
                // bottom = 0
                // total  = -2
        }
        space = 1.5;
    } else if(type === `sun_northwest`) {
        if(mode === `write`) {
            stroke(`#000`, pen.black, `line`, 1, 0, 0.75);
            stroke(`#000`, pen.black, `circle`, 1, 0.25);
            stroke(`#fff`, pen.white, `line`, 1, 0, 0.75);
            stroke(`#fff`, pen.white, `circle`, 1, 0.25);
        } else if(mode === `rails`) {
            if(direction === 1) {
                top_rails = false;
                rails(0.75 * direction);
                bottom_rails = false;
            } else {
                rails(0.75 * direction);
                top_rails = true;
                bottom_rails = false;
            }
            // strandedness
                // top    = 0
                // bottom = -2
                // total  = -2
        }
        space = 1.5;
    } else if(type === `sun_southwest`) {
        if(mode === `write`) {
            stroke(`#000`, pen.black, `line`, 2, 0, 0.75);
            stroke(`#000`, pen.black, `circle`, 1, 0.25);
            stroke(`#fff`, pen.white, `line`, 2, 0, 0.75);
            stroke(`#fff`, pen.white, `circle`, 1, 0.25);
        } else if(mode === `rails`) {
            if(direction === 1) {
                bottom_rails = false;
                rails(0.75 * direction);
                top_rails = false;
            } else {
                rails(0.75 * direction);
                top_rails = false;
                bottom_rails = true;
            }
            // strandedness
                // top    = -2
                // bottom = 0
                // total  = -2
        }
        space = 1.5;
    }
    pen.x += character_size(space) * direction;
    return space;
}
cipher = () => {
    adjust_canvas();
    pen.x = character_size(1);
    let message_letters_array = [];
    let message_size = 0;
    let to_cipher = `a` + field_to_cipher.textContent.toLowerCase() + `o`;
    for(message_letter = 0; message_letter < to_cipher.length; message_letter++) {
        character_string = `${to_cipher.charAt(message_letter)}`;
        character_size_variable = character_size(character(encoded_character(character_string)));
        message_size += character_size_variable;
        message_letters_array[message_letter] = [character_string, character_size_variable, message_size];
    }
    // Rails
    for(message_letter = 0; message_letter < message_letters_array.length; message_letter++) {
        console.log(`${message_letters_array[message_letter][0]}`);
        pen.x = character_size(1) + message_letters_array[message_letter][2] - message_letters_array[message_letter][1];
        character(encoded_character(message_letters_array[message_letter][0]), `rails`, 1);
    }
    for(message_letter = message_letters_array.length - 1; message_letter >= 0; message_letter--) {
        console.log(`${message_letters_array[message_letter][0]}`);
        pen.x = character_size(1) + message_letters_array[message_letter][2];
        character(encoded_character(message_letters_array[message_letter][0]), `rails`, -1);
    }
    // Lines and conjunctions
    for(message_letter = 0; message_letter < message_letters_array.length; message_letter++) {
        if(encoded_character(message_letters_array[message_letter][0]) === `conjunction_northwest`
        || encoded_character(message_letters_array[message_letter][0]) === `conjunction_southwest`
        || encoded_character(message_letters_array[message_letter][0]) === `conjunction_northeast`
        || encoded_character(message_letters_array[message_letter][0]) === `conjunction_southeast`) {
            pen.x = character_size(1) + message_letters_array[message_letter][2] - message_letters_array[message_letter][1];
            character(encoded_character(message_letters_array[message_letter][0]), `write`, 1);
        }
    }
    // Arcs and big circles
    for(message_letter = 0; message_letter < message_letters_array.length; message_letter++) {
        if(encoded_character(message_letters_array[message_letter][0]) === `space`
        || encoded_character(message_letters_array[message_letter][0]) === `hill`
        || encoded_character(message_letters_array[message_letter][0]) === `waterfall`
        || encoded_character(message_letters_array[message_letter][0]) === `crescent`
        || encoded_character(message_letters_array[message_letter][0]) === `moon`
        || encoded_character(message_letters_array[message_letter][0]) === `erosion`
        || encoded_character(message_letters_array[message_letter][0]) === `flood`
        || encoded_character(message_letters_array[message_letter][0]) === `hourglass`
        || encoded_character(message_letters_array[message_letter][0]) === `sun`
        || encoded_character(message_letters_array[message_letter][0]) === `spiral_northeast`
        || encoded_character(message_letters_array[message_letter][0]) === `spiral_northwest`
        || encoded_character(message_letters_array[message_letter][0]) === `spiral_southeast`
        || encoded_character(message_letters_array[message_letter][0]) === `spiral_southwest`
        || encoded_character(message_letters_array[message_letter][0]) === `wheel_northeast`
        || encoded_character(message_letters_array[message_letter][0]) === `wheel_southeast`
        || encoded_character(message_letters_array[message_letter][0]) === `wheel_northwest`
        || encoded_character(message_letters_array[message_letter][0]) === `wheel_southwest`
        || encoded_character(message_letters_array[message_letter][0]) === `sun_northeast`
        || encoded_character(message_letters_array[message_letter][0]) === `sun_southeast`
        || encoded_character(message_letters_array[message_letter][0]) === `sun_northwest`
        || encoded_character(message_letters_array[message_letter][0]) === `sun_southwest`
        ) {
            pen.x = character_size(1) + message_letters_array[message_letter][2] - message_letters_array[message_letter][1];
            character(encoded_character(message_letters_array[message_letter][0]), `write`, 1);
        }
    }
    // Small circles
    for(message_letter = 0; message_letter < message_letters_array.length; message_letter++) {
        if(encoded_character(message_letters_array[message_letter][0]) === `sunrise`
        || encoded_character(message_letters_array[message_letter][0]) === `sunset`) {
            pen.x = character_size(1) + message_letters_array[message_letter][2] - message_letters_array[message_letter][1];
            character(encoded_character(message_letters_array[message_letter][0]), `write`, 1);
        }
    }
}
character_map = {};
program_character = (character, code) => {character_map[character] = code};
encoded_character = (character) => {return character_map[character]}; //

program_character(` `, `space`); // "space"
program_character(` `, `space`); // "no-break space"
program_character(`e`, `hill`);
program_character(`t`, `waterfall`);
program_character(`a`, `crescent`);
program_character(`o`, `moon`);
program_character(`i`, `conjunction_northwest`);
program_character(`n`, `conjunction_southwest`);
program_character(`s`, `conjunction_northeast`);
program_character(`h`, `conjunction_southeast`);
program_character(`r`, `erosion`);
program_character(`d`, `flood`);
program_character(`l`, `hourglass`);
program_character(`u`, `sun`);
program_character(`c`, `sunrise`);
program_character(`m`, `sunset`);
program_character(`f`, `spiral_northeast`);
program_character(`y`, `spiral_southeast`);
program_character(`w`, `spiral_northwest`);
program_character(`g`, `spiral_southwest`);
program_character(`p`, `wheel_northeast`);
program_character(`b`, `wheel_southeast`);
program_character(`v`, `wheel_northwest`);
program_character(`k`, `wheel_southwest`);
program_character(`x`, `sun_northeast`);
program_character(`q`, `sun_southeast`);
program_character(`j`, `sun_northwest`);
program_character(`z`, `sun_southwest`);

field_height.addEventListener(`input`, () => {  // add event listeners
    adjust_canvas();
    cipher();
})
field_width.addEventListener(`input`, () => {
    adjust_canvas();
    cipher();
})
field_character_size.addEventListener(`input`, () => {
    adjust_canvas();
    cipher();
})
field_to_cipher.addEventListener(`input`, () => {cipher()}); //

adjust_canvas();
cipher(); // initialize //

// Create a function where the parameters visually show what the character will look like
