var fs = require('fs');

function readCmudictFile(file) {
	return fs.readFileSync(file).toString();
}

function formatData(data) {
	var lines = data.toString().split("\n");
	var wordsObject = {};

	lines.forEach(function(line) {
		var lineSplit = line.split("  ");
		var word = lineSplit[0];
		var phoneme = lineSplit[1];

		if (word != null && phoneme != null) {
			var syllablesCount = countSyllables(phoneme);
			
			if (syllablesCount > 0 && syllablesCount < 8) {

				if (wordsObject[syllablesCount] == null) {
					wordsObject[syllablesCount] = [word];
				} else {
					wordsObject[syllablesCount].push(word);
				}
			}
		}
	});

	return wordsObject;
}

function countSyllables(phoneme) {
	var phonemeArr = phoneme.split(" ");
	var syllablesCount = 0;

	for (var i in phonemeArr) {
		if (/\d/.test(phonemeArr[i]) === true) {
			syllablesCount += 1
		}
	}

	return syllablesCount;
}

// arrayOfNums example: [2, 3]
function generateLine(arrayOfNums, wordsObject) {
	var line = [];

	for (var i = 0; i < arrayOfNums.length; i++) {
		var arrayOfWords = wordsObject[arrayOfNums[i]];
		line.push(arrayOfWords[Math.floor(Math.random() * arrayOfWords.length)]);
	}

	return line.join(" ");
}

function generateSubArray(max) {
	var subArray = [];

	while (max > 0) {
		var num = Math.floor(Math.random() * (max - 1) + 1);
		subArray.push(num);
		max -= num;
	}

	return subArray;
}

function generateStructure() {
	var container = [];

	container.push(generateSubArray(5));
	container.push(generateSubArray(7));
	container.push(generateSubArray(5));

	return container;
}

// structure = [ [], [], [] ] (three nested arrays within an array)
function createHaiku(structure) {
	var data = readCmudictFile('./cmudict.txt');
	var wordsObject = formatData(data);
	var haiku = [];

	if (structure == null) {
		structure = generateStructure();
	}

	for (var i = 0; i < structure.length; i++) {
		haiku.push(generateLine(structure[i], wordsObject));
	}

	return haiku.join("\n");
}

module.exports = {
	createHaiku: createHaiku,
};
