
let cw_map = {
                // Letters
                "A": ".-",
                "B": "-...",
                "C": "-.-.",
                "D": "-..",
                "E": ".",
                "F": "..-.",
                "G": "--.",
                "H": "....",
                "I": "..",
                "J": ".---",
                "K": "-.-",
                "L": ".-..",
                "M": "--",
                "N": "-.",
                "O": "---",
                "P": ".--.",
                "Q": "--.-",
                "R": ".-.",
                "S": "...",
                "T": "-",
                "U": "..-",
                "V": "...-",
                "W": ".--",
                "X": "-..-",
                "Y": "-.--",
                "Z": "--..",
                // Numbers
                "0": "-----",
                "1": ".----",
                "2": "..---",
                "3": "...--",
                "4": "....-",
                "5": ".....",
                "6": "-....",
                "7": "--...",
                "8": "---..",
                "9": "----.",
                // Special
                " ": " ",
                "?": "..--..",
                "/": "-..-.",
                ",": "--..--",
                "-": "-....-",
                ".": ".-.-.-",
                "@": "...-.-",
                "+": ".-.-.",
                "~": "-.-.-",
                "=": "-...-",
                "#": ".-...",
                // Swedish
                "Å": ".--.-",
                "Ä": ".-.-",
                "Ö": "---.",    
}

import Utils from '@/code/utils.js'

class Morse {
    static text2morse(text) {
        let chars = text.split("");
        let result = "";
        for(let ch of chars) {
            if(cw_map[ch] !== undefined) {
                result += cw_map[ch] + "@";
            }
        }
        return result;
    }

    static morse2events(morse,wpm) {
        let codes = morse.split("");
        let events = [];
        let id = 0;
        for(let code of codes) {
            if(code == '-') {
                events.push({
                    id: id++,
                    space: false,
                    text: "-",
                    len: 3
                });
                events.push({
                    id: id++,
                    space: true,
                    len: 1
                });
            }
            if(code == '.') {
                events.push({
                    id: id++,
                    space: false,
                    text: ".",
                    len: 1
                });
                events.push({
                    id: id++,
                    space: true,
                    len: 1
                });
            }
            if(code == '@') {
                events.pop();
                events.push({
                    id: id++,
                    space: true,
                    len: 3
                });
            }
            if(code == ' ') {
                events.pop();
                events.push({
                    id: id++,
                    space: true,
                    len: 7
                });
            }
        }
        events.pop();
        console.log(events);
        return events;
    }

    // TODO: Calc score
    static compare(m1,m2) {
        let result = [];
        for(let i in m1) {
            if(m2[i] === undefined) {
                break;
                result.push({
                    id: m1[i].id,
                    space: m1[i].space,
                    color: 'red',
                    len: m1[i].len,
                    diff: 100,
                });
                continue;
            }
            let diff = parseInt(Math.abs(m1[i].len-m2[i].len)/m1[i].len*100);
            // You can't be more then 100% off ;-)
            if(diff > 100) {
                diff = 100;                
            }
            // Less the 10% is nothing
            if(diff < 10) {
                diff = 0;
            }
            let desc = "";
            if(diff >= 10) {
                desc = "off by " + diff + "%";
            }
            if(diff == 100) {
                desc = "off by >" + diff + "%";
            }
            result.push({
                id: m1[i].id,
                space: m1[i].space,
                color: this.p2hsl(diff),
                len: m2[i].len,
                flen: m1[i].len,
                diff,
                desc,
            });
        }
        return result;
    }

    static p2hsl(n) {
        let hue = (100-n) * 1.2;
        return "hsl(" + hue + ",100%,50%)"
    }
}

export default Morse;