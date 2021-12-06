const field_height = document.getElementById(`field_height`); // fetch from document
const field_width = document.getElementById(`field_width`);
const field_character_size = document.getElementById(`field_character_size`);
const field_to_cipher = document.getElementById(`field_to_cipher`);
const html_canvas = document.getElementById(`canvas`);
const ctx = html_canvas.getContext(`2d`); //

ctx.translate(0.5, 0.5); // setup canvas //

character_size = (factor) => {return field_character_size.value * factor}; // create variables
pen = {x: character_size(1), y: character_size(1), black: 19, white: 8};
top_rails = false; bottom_rails = false; //

adjust_canvas = () => { // create functions
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
    if(type === `hill` || type === `e`) {
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
        }
        space = 1;
    } else if(type === `waterfall` || type === `t`) {
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
        }
        space = 1;
    } else if(type === `crescent` || type === `a`) {
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
        }
        space = 0.5;
    } else if(type === `moon` || type === `o`) {
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
        }
        space = 0.75;
    } else if(type === `conjunction_northwest` || type === `i`) {
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
        }
        space = 1;
    } else if(type === `conjunction_southwest` || type === `n`) {
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
        }
        space = 1;
    } else if(type === `conjunction_northeast` || type === `s`) {
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
        }
        space = 1;
    } else if(type === `conjunction_southeast` || type === `h`) {
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
        }
        space = 1;
    } else if(type === `erosion` || type === `r`) {
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
        }
        space = 1;
    } else if(type === `flood` || type === `d`) {
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
        }
        space = 1;
    } else if(type === `hourglass` || type === `l`) {
        if(mode === `write`) {
            stroke(`#000`, pen.black, `conjunction`, 1, 0);
            stroke(`#fff`, pen.white, `conjunction`, 1, 0);
            stroke(`#000`, pen.black, `conjunction`, 2, 0);
            stroke(`#fff`, pen.white, `conjunction`, 2, 0);
        } else if(mode === `rails`) {
            top_rails = true;
            bottom_rails = true;
        }
        space = 1;
    } else if(type === `sun` || type === `u`) {
        if(mode === `write`) {
            stroke(`#000`, pen.black, `circle`, 1, 0.25);
            stroke(`#fff`, pen.white, `circle`, 1, 0.25);
        } else if(mode === `rails`) {
            rails(0.75 * direction);
            top_rails = false;
            bottom_rails = false;
        }
        space = 1.5;
    } else if(type === `sunrise` || type === `c`) {
        if(mode === `write`) {
            stroke(`#000`, pen.black, `circle`, 2, 0);
            stroke(`#fff`, pen.white, `circle`, 2, 0);
        } else if(mode === `rails`) {
            rails(0.5 * direction);
        }
        space = 0.5;
    } else if(type === `sunset` || type === `m`) {
        if(mode === `write`) {
            stroke(`#000`, pen.black, `circle`, 3, 0);
            stroke(`#fff`, pen.white, `circle`, 3, 0);
        } else if(mode === `rails`) {
            rails(0.5 * direction);
        }
        space = 0.5;
    } else if(type === `spiral_northeast` || type === `f`) {
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
        }
        space = 1.5;
    } else if(type === `spiral_southeast` || type === `y`) {
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
        }
        space = 1.5;
    } else if(type === `spiral_northwest` || type === `w`) {
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
        }
        space = 1.5;
    } else if(type === `spiral_southwest` || type === `g`) {
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
        }
        space = 1.5;
    } else if(type === `wheel_northeast` || type === `p`) {
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
        }
        space = 1.5;
    } else if(type === `wheel_southeast` || type === `b`) {
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
        }
        space = 1.5;
    } else if(type === `wheel_northwest` || type === `v`) {
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
        }
        space = 1.5;
    } else if(type === `wheel_southwest` || type === `k`) {
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
        }
        space = 1.5;
    } else if(type === `sun_northeast` || type === `x`) {
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
        }
        space = 1.5;
    } else if(type === `sun_southeast` || type === `q`) {
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
        }
        space = 1.5;
    } else if(type === `sun_northwest` || type === `j`) {
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
        }
        space = 1.5;
    } else if(type === `sun_southwest` || type === `z`) {
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
        }
        space = 1.5;
    }
    pen.x += character_size(space) * direction;
    return space;
}

word_marcus = () => {
    // rails
    character(`crescent`, `rails`, 1);
    character(`m`, `rails`, 1);
    character(`a`, `rails`, 1);
    character(`r`, `rails`, 1);
    character(`c`, `rails`, 1);
    character(`u`, `rails`, 1);
    character(`s`, `rails`, 1);
    // backward rails
    character(`s`, `rails`, -1);
    character(`u`, `rails`, -1);
    character(`c`, `rails`, -1);
    character(`r`, `rails`, -1);
    character(`a`, `rails`, -1);
    character(`m`, `rails`, -1);
    
    pen.x = character_size(1);
    // write
    character(`crescent`, `write`, 1);
    character(`m`, `write`, 1);
    character(`a`, `write`, 1);
    character(`r`, `write`, 1);
    character(`c`, `write`, 1);
    character(`u`, `write`, 1);
    character(`s`, `write`, 1);
    character(`moon`, `write`, 1);
}

cipher = () => {
    adjust_canvas();
    pen.x = character_size(1);
    let message_letters_array = [];
    let message_size = 0;
    let to_cipher = `a` + field_to_cipher.textContent + `o`;
    for(message_letter = 0; message_letter < to_cipher.length; message_letter++) {
        character_string = `${to_cipher.charAt(message_letter)}`;
        character_size_variable = character_size(character(character_string));
        message_size += character_size_variable;
        message_letters_array[message_letter] = [character_string, character_size_variable, message_size];
    }
    // Rails
    for(message_letter = 0; message_letter < message_letters_array.length; message_letter++) {
        console.log(`${message_letters_array[message_letter][0]}`);
        pen.x = character_size(1) + message_letters_array[message_letter][2] - message_letters_array[message_letter][1];
        character(message_letters_array[message_letter][0], `rails`, 1);
    }
    for(message_letter = message_letters_array.length - 1; message_letter >= 0; message_letter--) {
        console.log(`${message_letters_array[message_letter][0]}`);
        pen.x = character_size(1) + message_letters_array[message_letter][2];
        character(message_letters_array[message_letter][0], `rails`, -1);
    }
    // Lines and conjunctions
    for(message_letter = 0; message_letter < message_letters_array.length; message_letter++) {
        if(message_letters_array[message_letter][0] === `i`
        || message_letters_array[message_letter][0] === `n`
        || message_letters_array[message_letter][0] === `s`
        || message_letters_array[message_letter][0] === `h`) {
            pen.x = character_size(1) + message_letters_array[message_letter][2] - message_letters_array[message_letter][1];
            character(message_letters_array[message_letter][0], `write`, 1);
        }
    }
    // Arcs and big circles
    for(message_letter = 0; message_letter < message_letters_array.length; message_letter++) {
        if(message_letters_array[message_letter][0] === `e`
        || message_letters_array[message_letter][0] === `t`
        || message_letters_array[message_letter][0] === `a`
        || message_letters_array[message_letter][0] === `o`
        || message_letters_array[message_letter][0] === `r`
        || message_letters_array[message_letter][0] === `d`
        || message_letters_array[message_letter][0] === `l`
        || message_letters_array[message_letter][0] === `u`
        || message_letters_array[message_letter][0] === `f`
        || message_letters_array[message_letter][0] === `y`
        || message_letters_array[message_letter][0] === `w`
        || message_letters_array[message_letter][0] === `g`
        || message_letters_array[message_letter][0] === `p`
        || message_letters_array[message_letter][0] === `b`
        || message_letters_array[message_letter][0] === `v`
        || message_letters_array[message_letter][0] === `k`
        || message_letters_array[message_letter][0] === `x`
        || message_letters_array[message_letter][0] === `q`
        || message_letters_array[message_letter][0] === `j`
        || message_letters_array[message_letter][0] === `z`) {
            pen.x = character_size(1) + message_letters_array[message_letter][2] - message_letters_array[message_letter][1];
            character(message_letters_array[message_letter][0], `write`, 1);
        }
    }
    // Small circles
    for(message_letter = 0; message_letter < message_letters_array.length; message_letter++) {
        if(message_letters_array[message_letter][0] === `c`
        || message_letters_array[message_letter][0] === `m`) {
            pen.x = character_size(1) + message_letters_array[message_letter][2] - message_letters_array[message_letter][1];
            character(message_letters_array[message_letter][0], `write`, 1);
        }
    }
} //

field_height.addEventListener(`input`, () => {adjust_canvas()}); // add event listeners
field_width.addEventListener(`input`, () => {adjust_canvas()});
field_to_cipher.addEventListener(`input`, () => {cipher()}); //

adjust_canvas(); // initialize //

// Overlapping:
    // Instead of printing the segments of the character directly, make a queue for printing instructions
    // The queue will remember where each thing needs to be printed, but it will automatically print Lines and conjunctions > Small circles > Arcs and big circles

// Starting & ending rails:
    // 1. Make a function for turning bottom rails on, a function for turning bottom rails off, and the same for top rails
    // 2. Every time an arc of variation 2 or 3 is made,
            // If bottom rails are off,
                // If it was variation 2, turn bottom rails on
            // Else if bottom rails are on, turn bottom rails off
    // 3. Every time an arc of variation 1 or 4 is made,
            // If top rails are off,
                // If it was variation 4, turn top rails on
            // Else if top rails are on, turn top rails off