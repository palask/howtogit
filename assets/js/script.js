function wrapWithCardsInsideArea(workingArea, level, endLevel) {
	// Get all headings of level that are direct children of the workingArea element
	const headingsNodeList = workingArea.querySelectorAll(":scope > h" + level.toString());
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
		cardDiv.appendChild(fragment);
		cardDiv = workingArea.insertBefore(cardDiv, nextUnrelatedElement);

		// Recursively continue for other levels
		for (let l = level + 1; l <= endLevel; l++) {
			wrapWithCardsInsideArea(cardDiv, l, endLevel);
		}
	}
}

wrapWithCardsInsideArea(document.querySelector("#content"), 2, 4);
