
class Utils {
    static calc_dit_len(wpm,freq) {
        let dit = 60 / (wpm * 50);      // PARIS
        // Always end sine @ 0 for better sound.
        return Math.round(dit * freq) / freq;
    }
}

export default Utils;