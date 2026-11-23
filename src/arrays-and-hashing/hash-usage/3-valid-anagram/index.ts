const isAnagram = (s: string, t: string): boolean => {
	if (s.length !== t.length) return false;
	const charCodeLetterStart = 97;

	let lettersCount: number[] = Array.from({ length: 26 }, () => 0);

	for (let i = 0; i < s.length; i++) {
		const sLetterCode = s[i].charCodeAt(0) - charCodeLetterStart;
		const tLetterCode = t[i].charCodeAt(0) - charCodeLetterStart;

		lettersCount[sLetterCode]++;
		lettersCount[tLetterCode]--;
	}

	return lettersCount.every((val) => val === 0);
};

/*
const isAnagram = (s: string, t: string):boolean => {
    // Approach: Hash Table / Counting
    type WordCount = Record<string, number>;

    if(s.length !== t.length) return false;
    
    let word1count: WordCount = {};
    let word2count: WordCount = {};

    for(let i = 0; i < s.length; i++) {
        word1count[s[i]] = (word1count[s[i]] ?? 0) + 1;
        word2count[t[i]] = (word2count[t[i]] ?? 0) + 1;
    }

    for(const key in word1count) {
        if(word1count[key] !== word2count[key]) return false;
    }

    return true;  
};
*/

export { isAnagram };
