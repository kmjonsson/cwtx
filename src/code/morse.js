
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

// import Utils from '@/code/utils.js'

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

    static morse2text(morse) {
        for(const [ch,mc] of Object.entries(cw_map)) {
            //console.log(mc);
            if(morse == mc) {
                return ch;
            }
        }
        return "#";
    }

    static morse2events(morse) {
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
        return events;
    }

    // TODO: Calc score
    static compare(m1,m2) {
        let result = [];
        for(let i in m1) {
            if(m2[i] === undefined) {
                break;
            }
            let rdiff = m1[i].len-m2[i].len;
            let rdiff2 = Math.abs((m1[i].len-m2[i].len)*100)/m1[i].len;
            let diff = Math.round(Math.abs(m1[i].len-m2[i].len)/m1[i].len*100);
            // You can't be more then 100% off ;-)
            if(diff > 100) {
                diff = 100;                
            }
            // Less the 1% is nothing
            if(diff < 3) {
                diff = 0;
            }
            let pm = "-";
            if(rdiff < 0) {
                pm = "+";
            }
            let desc = "";
            if(diff >= 3) {
                desc = "off by " + pm + diff + "%";
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
                rdiff,
                rdiff2,
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