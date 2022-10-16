window.onload = function () {
	addButtonForTime();
};

window.addEventListener(
	"resize",
	function (event) {
		clearTimeout(buttonForTimeSet);

		buttonForTimeSet = setTimeout(function () {
			resetButtonForTime();
			addButtonForTime();
		}, 20);
	},
	true
);

let buttonForTimeSet;

function addButtonForTime() {
	let cardContents = document.getElementsByClassName("card__content");

	for (let i = 0; i < cardContents.length; i++) {
		let timeLineEl = cardContents[i].getElementsByClassName("time");
		let timeTextEl = cardContents[i].getElementsByClassName("time__text");
		let timeItemEl = cardContents[i].getElementsByClassName("time__item");

		let timeLineWidth = parseFloat(window.getComputedStyle(cardContents[i]).width) - parseFloat(window.getComputedStyle(timeLineEl[0]).paddingLeft);
		let timeTextWidth = parseFloat(window.getComputedStyle(timeTextEl[0]).width);
		let timeItemWidth =
			parseFloat(window.getComputedStyle(timeItemEl[0]).width) +
			parseFloat(window.getComputedStyle(timeItemEl[0]).paddingLeft) +
			parseFloat(window.getComputedStyle(timeItemEl[0]).paddingRight) +
			parseFloat(window.getComputedStyle(timeItemEl[0]).marginRight);

		let oldTimeLineHeight = parseFloat(window.getComputedStyle(timeLineEl[0]).height);

		let howManyCanFit = Math.floor((timeLineWidth - timeTextWidth) / timeItemWidth);

		if (howManyCanFit < timeItemEl.length) {
			if (howManyCanFit <= 0) {
				howManyCanFit = Math.floor(timeLineWidth / timeItemWidth);

				if (howManyCanFit >= timeItemEl.length) {
					continue;
				}
			}

			let transitionDelay = 0;

			for (let i = howManyCanFit - 1; i < timeItemEl.length; i++) {
				timeItemEl[i].classList.add("time__item_hidden");
				timeItemEl[i].style.display = "none";
				timeItemEl[i].style.transitionDelay = transitionDelay + "s";
				transitionDelay += 0.1;
			}

			let moreEl = document.createElement("button");
			moreEl.classList.add("time__item", "time__item_btn");
			timeLineEl[0].appendChild(moreEl);
			moreEl.textContent = "ещё...";

			let newTimeLineHeight = parseFloat(window.getComputedStyle(timeLineEl[0]).height);
			timeLineEl[0].style.height = newTimeLineHeight + "px";

			let hiddenEl = timeLineEl[0].querySelectorAll(".time__item_hidden");

			moreEl.onclick = function () {
				moreEl.style.display = "none";

				timeLineEl[0].style.height = oldTimeLineHeight + "px";

				for (let y = 0; y < hiddenEl.length; y++) {
					hiddenEl[y].style.removeProperty("display");
					setTimeout(() => hiddenEl[y].classList.remove("time__item_hidden"), 10);
				}
			};
		}
	}
}

function resetButtonForTime() {
	let moreEl = document.querySelectorAll(".time__item_btn");

	for (let i = 0; i < moreEl.length; i++) {
		moreEl[i].parentNode.removeChild(moreEl[i]);
	}

	let timeItemEl = document.querySelectorAll(".time__item_hidden");

	for (let i = 0; i < timeItemEl.length; i++) {
		if (timeItemEl[i].hasAttribute("style")) {
			timeItemEl[i].removeAttribute("style");
		}

		if (timeItemEl[i].classList.remove("time__item_hidden"));
	}

	let timeLineEl = document.getElementsByClassName("time");

	for (let i = 0; i < timeLineEl.length; i++) {
		if (timeLineEl[i].hasAttribute("style")) {
			timeLineEl[i].removeAttribute("style");
		}
	}
}
