
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
        console.log(text);
        let chars = text.split("");
        let result = "";
        for(let ch of chars) {
            console.log(ch);
            if(cw_map[ch] !== undefined) {
                result += cw_map[ch] + "@";
            }
        }
        return result;
    }

    static morse2events(morse,wpm) {
        console.log(morse);
        let dit_len = Utils.calc_dit_len(wpm,10000);
        dit_len = 1;
        console.log("Ditlen: " + dit_len);
        let codes = morse.split("");
        let events = [];
        let id = 0;
        for(let code of codes) {
            if(code == '-') {
                events.push({
                    id: id++,
                    space: false,
                    text: "-",
                    len: dit_len*3,
                });
                events.push({
                    id: id++,
                    space: true,
                    len: dit_len,
                });
            }
            if(code == '.') {
                events.push({
                    id: id++,
                    space: false,
                    text: ".",
                    len: dit_len,
                });
                events.push({
                    id: id++,
                    space: true,
                    len: dit_len,
                });
            }
            if(code == '@') {
                events.pop();
                events.push({
                    id: id++,
                    space: true,
                    len: dit_len*3,
                });
            }
            if(code == ' ') {
                events.pop();
                events.push({
                    id: id++,
                    space: true,
                    len: dit_len*7,
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
                });
                continue;    
            }
            if(Math.abs(m1[i].len-m2[i].len) < 0.3) {
                result.push({
                    id: m1[i].id,
                    space: m1[i].space,
                    color: 'green',
                    len: m2[i].len,
                });
                continue;
            }
            if(Math.abs(m1[i].len-m2[i].len) < 0.7) {
                result.push({
                    id: m1[i].id,
                    space: m1[i].space,
                    color: 'orange',
                    len: m2[i].len,
                });
                continue;
            }
            result.push({
                id: m1[i].id,
                space: m1[i].space,
                color: 'red',
                len: m2[i].len,
            });
        }
        return result;
    }
}

export default Morse;