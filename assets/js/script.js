"use strict";

const synonyms = [
	["remove", "delete", "clear"],
	["reset", "undo", "revert", "reverse", "abort"],
	["remote", "origin", "upstream"],
	["add", "append"],
	["search", "find"]
];

function wrapWithCardsInsideArea(workingArea, level, endLevel) {
	// Get all headings of level that are direct children of the workingArea element
	const headingsNodeList = workingArea.querySelectorAll(`:scope > h${level}`);
	// Convert NodeList to Array
	const headings = [...headingsNodeList];

	while (headings.length > 0) {
		const heading = headings.shift();

		// Get the next heading of the same level
		let nextUnrelatedElement = null;
		for (const element of headings) {
			if (element.tagName === heading.tagName) {
				nextUnrelatedElement = element;
				break;
			}
		}

		if (nextUnrelatedElement == null) {
			// There is no next same-level heading
			// Include all elements following the heading before the cards and footer
			// Loop through the children in reverse order
			for (let i = workingArea.children.length - 1; i >= 0; i--) {
				const child = workingArea.children[i];

				// Check if the child is not a card div or the footer
				const isCardDiv = child.tagName == "DIV" && child.classList.contains("card");
				const isFooter = child.tagName == "FOOTER";
				if (!isCardDiv && !isFooter) {
					break; // Exit the loop after finding the last non-card element
				}
				nextUnrelatedElement = child;
			}
		}

		// Create a range to select elements between heading and nextUnrelatedElement
		const range = document.createRange();
		range.setStartBefore(heading);
		if (nextUnrelatedElement == null) {
			range.setEndAfter(workingArea.lastChild);
		}
		else {
			range.setEndBefore(nextUnrelatedElement);
		}
		// Extract the selected elements as a DocumentFragment
		const fragment = range.extractContents();

		// Create a card div with the DocumentFragment inside and insert it
		let cardDiv = document.createElement("div");
		cardDiv.classList.add("card");
		if (heading.tagName == `H${endLevel}`) {
			cardDiv.classList.add("entry-card");
		}
		cardDiv.appendChild(fragment);
		cardDiv = workingArea.insertBefore(cardDiv, nextUnrelatedElement);

		// Recursively continue for other levels
		for (let l = level + 1; l <= endLevel; l++) {
			wrapWithCardsInsideArea(cardDiv, l, endLevel);
		}
	}
}

function replaceSynonyms(searchterms) {
	return searchterms.map(searchterm => {
		// Find the synonym group that contains the first value matching the searchterm
		const synonymGroup = synonyms.find(group => group.includes(searchterm));

		// If a synonym group is found and the first value is not already the searchterm, replace synonyms
		if (synonymGroup && synonymGroup[0] !== searchterm) {
			// Replace the synonym if found in searchterm
			for (const synonym of synonymGroup) {
				searchterm = searchterm.replace(new RegExp(`\\b${synonym}\\b`, 'gi'), synonymGroup[0]);
			}
		}

		return searchterm;
	});
}

function liveSearch() {
	// Locate the card elements
	const entryCards = document.querySelectorAll(".entry-card");
	// Locate the search input
	const searchInput = document.querySelector("#searchbox");
	if (!searchInput) {
		throw Error("Searchbox does not exist");
	}
	const searchQuery = searchInput.value;
	// Get individual search terms separated by a space and replace the synonyms
	const searchTerms = replaceSynonyms(searchQuery.toLowerCase().split(" "));

	const visibleParents = [];
	for (const card of entryCards) {
		// Case insensitive check if all required search terms are in card and adverse search terms are not in card
		const cardText = card.innerText.toLowerCase();
		let validSearchTerms = 0;

		for (const term of searchTerms) {
			const requiredTerm = !term.startsWith("-");
			const requiredTermExists = requiredTerm && cardText.includes(term);
			const adverseTermMissing = !requiredTerm && !cardText.includes(term.substr(1));

			if (requiredTermExists || adverseTermMissing) {
				validSearchTerms++;
			}
		}

		if (validSearchTerms == searchTerms.length) {
			card.classList.remove("is-hidden");

			let parent = card.parentElement;
			// Also make parent cards visible
			while (parent?.classList.contains("card")) {
				visibleParents.push(parent);
				parent.classList.remove("is-hidden");
				parent = parent.parentElement;
			}
		} else {
			card.classList.add("is-hidden");

			let parent = card.parentElement;
			// Also hide parent cards if they were not set to visible already
			while (parent?.classList.contains("card") && !visibleParents.includes(parent)) {
				parent.classList.add("is-hidden");
				parent = parent.parentElement;
			}
		}
	}
}

function addSearchBox() {
	const header = document.querySelector("header");
	if (!header) {
		throw Error("Header does not exist");
	}
	header.innerHTML += '<div id="search-container"><input type="search" id="searchbox" placeholder="Search"></input></div>';
	let typingTimer;
	const typeInterval = 500; // Half a second

	const searchInput = document.querySelector("#searchbox");
	if (!searchInput) {
		throw Error("Searchbox does not exist");
	}
	searchInput.addEventListener("keyup", () => {
		clearTimeout(typingTimer);
		typingTimer = setTimeout(liveSearch, typeInterval);
	});
}

wrapWithCardsInsideArea(document.querySelector("#content"), 2, 4);
addSearchBox();
